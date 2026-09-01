"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useFormContext } from "react-hook-form";
import { AiOutlineCheck } from "react-icons/ai";
import { BsChevronExpand } from "react-icons/bs";

import { cn } from "@vanni/ui";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@vanni/ui/form";

import type { ApplicationSchema } from "~/app/apply/validation";
import { Button } from "~/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "~/components/ui/command";
import { Input } from "~/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { Asterisk } from "../apply/application/application-form";

interface Option { label: string; value: string }

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
  const OTHER_LABEL = "Other (please specify)";
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    if (defaultOption && (!form.getValues(name))) {
      form.setValue(name, defaultOption);
    }
  }, [form, defaultOption, name]);

  const filteredOptions = useMemo(() => {
    const q = searchValue.trim().toLowerCase();
    if (!q) return values;
    return values.filter(
      (o) =>
        o.label.toLowerCase().includes(q) || o.value.toLowerCase().includes(q),
    );
  }, [searchValue, values]);

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => {
        const rawValues = field.value
          ? String(field.value).split(",").map((s) => s.trim()).filter(Boolean)
          : [];

        const otherMatch = rawValues.find((item) => item.startsWith("Other("));
        const otherRaw = otherMatch ? otherMatch.slice(6, -1) : "";
        const hasOther = rawValues.includes(OTHER_VALUE) || Boolean(otherMatch);

        const selectedValues = rawValues.filter(
          (item) => item !== OTHER_VALUE && !item.startsWith("Other("),
        );

        const selectedLabels = selectedValues
          .map((v) => values.find((o) => o.value === v)?.label ?? v)
          .concat(
            hasOther ? [otherRaw ? `Other (${otherRaw})` : OTHER_LABEL] : [],
          );

        const handleSelectChange = (value: string) => {
          const updated = new Set(
            field.value
              ? String(field.value).split(",").map((s) => s.trim()).filter(Boolean)
              : [],
          );

          if (value === OTHER_VALUE) {
            if (hasOther) {
              // remove both Other and Other(...)
              [...updated].forEach((v) => {
                if (v === OTHER_VALUE || v.startsWith("Other(")) updated.delete(v);
              });
            } else {
              updated.add(OTHER_VALUE);
            }
            field.onChange([...updated].join(","));
            return;
          }

          if (!updated.has(value)) updated.add(value);
          else updated.delete(value);

          field.onChange([...updated].join(","));
        };

        const isOptionSelected = (value: string): boolean => {
          if (value === OTHER_VALUE) {
            return hasOther;
          }
          return selectedValues.includes(value);
        };

        return (
          <FormItem className="flex flex-col">
            <FormLabel className="text-xl">
              {label}
              {required ? <Asterisk /> : ""}
            </FormLabel>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant="application"
                    role="combobox"
                    className="w-full justify-between overflow-hidden"
                  >
                    <span className="truncate">
                      {selectedLabels.length > 0
                        ? selectedLabels.join(", ")
                        : placeholder}
                    </span>
                    <BsChevronExpand className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-fit max-w-full p-0">
                <Command>
                  <CommandInput
                    placeholder={`Search ${String(name)}...`}
                    onValueChange={(value) => setSearchValue(value)}
                  />
                  <CommandList>
                    <CommandEmpty>No results.</CommandEmpty>
                    <CommandGroup>
                      {filteredOptions.map((option) => (
                        <CommandItem
                          key={option.value}
                          value={option.value}
                          onSelect={(currentValue) => {
                            handleSelectChange(currentValue);
                          }}
                        >
                          <AiOutlineCheck
                            className={cn(
                              "mr-2 h-4 w-4",
                              isOptionSelected(option.value)
                                ? "opacity-100"
                                : "opacity-0",
                            )}
                          />
                          {option.label}
                        </CommandItem>
                      ))}

                      <CommandItem
                        key={OTHER_VALUE}
                        value={OTHER_LABEL}
                        onSelect={() => {
                          handleSelectChange(OTHER_VALUE);
                        }}
                      >
                        <AiOutlineCheck
                          className={cn(
                            "mr-2 h-4 w-4",
                            hasOther ? "opacity-100" : "opacity-0",
                          )}
                        />
                        {OTHER_LABEL}
                      </CommandItem>
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
            {/* Show textbox if Other is selected */}
            {hasOther && (
              <div className="mt-2 flex flex-col">
                <FormControl>
                  <Input
                    type="text"
                    className="border p-2 bg-white text-black"
                    placeholder="Please specify..."
                    value={otherRaw}
                    onChange={(e) => {
                      const val = e.target.value;
                      const updated = rawValues.filter(
                        (item) => item !== OTHER_VALUE && !item.startsWith("Other("),
                      );
                      if (val) updated.push(`Other(${val})`);
                      else updated.push(OTHER_VALUE);
                      field.onChange(updated.join(","));
                    }}
                  />
                </FormControl>
              </div>
            )}
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};

export default GenericMultiSelect;