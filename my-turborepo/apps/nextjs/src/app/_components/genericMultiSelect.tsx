"use client";

import React, { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { Button } from "@vanni/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@vanni/ui/dropdown-menu";
import { Input } from "@vanni/ui/input";
import { ChevronDown } from "lucide-react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@vanni/ui/form";
import type { ApplicationSchema } from "../apply/validation";

type Option = { label: string; value: string };

interface ISelectProps {
  name: keyof ApplicationSchema;
  label?: string;
  required?: boolean;
  placeholder: string;
  options: Option[];
  defaultOption?: string | undefined;
}

const GenericMultiSelect = ({
  name,
  label,
  required,
  placeholder,
  options: values,
  defaultOption,
}: ISelectProps) => {
  const form = useFormContext<ApplicationSchema>();
  const OTHER_VALUE = "Other";

  useEffect(() => {
    if (defaultOption && (!form.getValues(name))) {
      form.setValue(name, defaultOption);
    }
  }, [form, defaultOption, name]);

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => {
        let selectedItems = field.value
          ? String(field.value)
            .split(",")
            .filter(
              (item, idx, arr) =>
                item &&
                (item !== OTHER_VALUE && !item.startsWith("Other(") ||
                  arr.findIndex(
                    (i) =>
                      i === OTHER_VALUE ||
                      i.startsWith("Other(")
                  ) === idx)
            )
          : [];
        // Extract Other value if present

        const otherRaw = (() => {
          const match = selectedItems.find(item => item.startsWith("Other("));
          return match ? match.slice(6, -1) : "";
        })();

        const hasOther =
          selectedItems.includes(OTHER_VALUE) ||
          selectedItems.some((item) => item.startsWith("Other("));

        // Replace "Other" with "Other(<text>)" if text is present
        if (hasOther) {
          selectedItems = selectedItems.filter(
            (item) => item !== OTHER_VALUE && !item.startsWith("Other(")
          );
          if (otherRaw) {
            selectedItems.push(`Other(${otherRaw})`);
          } else {
            selectedItems.push(OTHER_VALUE);
          }
        }

        const handleSelectChange = (value: string) => {
          let updated = field.value
            ? String(field.value).split(",").filter(Boolean)
            : [];
          if (!updated.includes(value)) {
            updated.push(value);
          } else {
            updated = updated.filter((item) => item !== value);
          }
          field.onChange(updated.join(","));
        };

        const isOptionSelected = (value: string): boolean => {
          if (value === OTHER_VALUE) {
            return hasOther;
          }
          return selectedItems.includes(value);
        };

        return (
          <FormItem className="flex flex-col">
            {label && (
              <FormLabel className="text-xl">
                {label}
                {required ? <span className="text-red-500">*</span> : ""}
              </FormLabel>
            )}
            <FormControl>
              <DropdownMenu>
                <DropdownMenuTrigger asChild className="w-full">
                  <Button
                    variant="outline"
                    className="w-full flex items-center justify-between bg-white text-black"
                  >
                    <div>
                      {selectedItems.length > 0
                        ? selectedItems.join(", ")
                        : placeholder}
                    </div>
                    <ChevronDown className="h-4 w-4 opacity-50" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-56 bg-white text-black hover:cursor-pointer"
                  onCloseAutoFocus={(e) => e.preventDefault()}
                >
                  {values.map((option, index) => (
                    <DropdownMenuCheckboxItem
                      className="hover:cursor-pointer"
                      onSelect={(e) => e.preventDefault()}
                      key={index}
                      checked={isOptionSelected(option.value)}
                      onCheckedChange={() => handleSelectChange(option.value)}
                    >
                      {option.label}
                    </DropdownMenuCheckboxItem>
                  ))}
                  {/* Add Other option */}
                  <DropdownMenuCheckboxItem
                    className="hover:cursor-pointer"
                    onSelect={(e) => e.preventDefault()}
                    checked={hasOther}
                    onCheckedChange={() => handleSelectChange(OTHER_VALUE)}
                  >
                    Other (please specify)
                  </DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </FormControl>
            {/* Show textbox if Other is selected */}
            {hasOther && (
              <Input
                type="text"
                className="mt-2 bg-white text-black"
                placeholder="Please specify your restriction"
                value={otherRaw}
                onChange={(e) => {
                  const val = e.target.value;
                  // Remove any Other or Other(...) before adding new
                  let updated = field.value
                    ? String(field.value).split(",").filter(
                      (item) => item !== OTHER_VALUE && !item.startsWith("Other(")
                    )
                    : [];
                  if (val) {
                    updated.push(`Other(${val})`);
                  } else {
                    updated.push(OTHER_VALUE);
                  }
                  field.onChange(updated.join(","));
                }}
              />
            )}
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};

export default GenericMultiSelect;