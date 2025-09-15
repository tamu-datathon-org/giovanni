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
import useDebounce from "~/components/ui/debounce";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { Input } from "~/components/ui/input";
import { Asterisk } from "../apply/application/application-form";

interface DropdownOption {
  value: string;
  label: string;
}

interface GenericDropdownProps {
  name: keyof ApplicationSchema;
  label?: string;
  options: DropdownOption[];
  defaultOption?: DropdownOption;
  filter?: boolean;
  required?: boolean;
}

const GenericCombobox: React.FC<GenericDropdownProps> = ({
  name,
  label,
  options,
  filter,
  defaultOption,
  required,
}) => {
  const form = useFormContext<ApplicationSchema>();
  const [searchValue, setSearchValue] = useState("");
  const { debouncedValue, isDebouncing } = useDebounce(searchValue, 250);
  const [open, setOpen] = React.useState(false);
  const [otherOption, setOtherOption] = useState(false);
  // Remove local selectedOption and otherValue state

  const filter20Items = useMemo(() => {
    if (isDebouncing) {
      return [{ label: "Loading...", value: "Loading..." }];
    }

    const query = debouncedValue;

    if (filter) {
      return options
        .filter(({ value }) =>
          value.toLowerCase().includes(query ? query.toLowerCase() : ""),
        )
        .slice(0, 20);
    }
    return options;
  }, [debouncedValue, options]);

  return (
    <FormField
      control={form.control}
      name={name}
      defaultValue={defaultOption?.value}
      render={({ field }) => {
        // Derive selectedOption from field.value
        const selectedOption = options.find((option) => option.value === field.value) ||
          (field.value && !options.find((option) => option.value === field.value)
            ? { value: field.value, label: "Other (please specify)" }
            : null);

        if (field.value && !options.find((option) => option.value === field.value)) {
          setOtherOption(true);
        }

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
                    className="justify-between"
                  >
                    {otherOption
                      ? "Other (please specify)"
                      : selectedOption
                      ? selectedOption.label
                      : "Select ..."}
                    <BsChevronExpand className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-fit max-w-full p-0">
                <Command>
                  <CommandInput
                    placeholder={`Search ${String(name)}...`}
                    onValueChange={(value) => {
                      setSearchValue(value);
                    }}
                  />
                  <CommandList>
                    <CommandEmpty>No results.</CommandEmpty>
                    <CommandGroup>
                      {filter20Items.map((option) => (
                        <CommandItem
                          key={(option as DropdownOption).value}
                          value={(option as DropdownOption).value}
                          onSelect={(currentValue) => {
                            if (currentValue === "Other (please specify)") {
                              setOtherOption(true);
                              form.setValue(name, "");
                            } else {
                              setOtherOption(false);
                              form.setValue(name, currentValue);
                            }
                            setOpen(false);
                          }}
                        >
                          <AiOutlineCheck
                            className={cn(
                              "mr-2 h-4 w-4",
                              field.value === (option as DropdownOption).value
                                ? "opacity-100"
                                : "opacity-0",
                            )}
                          />
                          {(option as DropdownOption).label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
            {otherOption && (
              <div className="mt-2 flex flex-col">
                <FormControl>
                  <Input
                    value={typeof field.value === "string" ? field.value : ""}
                    onChange={(e) => {
                      form.setValue(name, e.target.value);
                    }}
                    className="border p-2 bg-white text-black"
                    placeholder="Please specify..."
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

export default GenericCombobox;
