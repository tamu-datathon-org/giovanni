import React, { useMemo, useState } from "react";
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

const OTHER_VALUE = "__other__";
const OTHER_PREFIX = "Other (";
const OTHER_LABEL = "Other (please specify)";

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
  }, [debouncedValue, filter, options]);

  return (
    <FormField
      control={form.control}
      name={name}
      defaultValue={defaultOption?.value}
      render={({ field }) => {
        const fieldValue = typeof field.value === "string" ? field.value : "";
        const isOther =
          fieldValue === OTHER_VALUE || fieldValue.startsWith(OTHER_PREFIX);

        const otherRaw = fieldValue.startsWith(OTHER_PREFIX)
          ? fieldValue.slice(OTHER_PREFIX.length, -1)
          : "";

        const selectedOption = isOther
          ? { value: OTHER_VALUE, label: OTHER_LABEL }
          : options.find((option) => option.value === fieldValue) ?? null;

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
                      {isOther
                        ? otherRaw
                          ? `Other(${otherRaw})`
                          : OTHER_LABEL
                        : selectedOption
                        ? selectedOption.label
                        : "Select ..."}
                    </span>
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
                          key={(option).value}
                          value={(option).value}
                          onSelect={(currentValue) => {
                            form.setValue(name, currentValue, {
                              shouldDirty: true,
                              shouldTouch: true,
                            });
                            setOpen(false);
                          }}
                        >
                          <AiOutlineCheck
                            className={cn(
                              "mr-2 h-4 w-4",
                              fieldValue === (option).value
                                ? "opacity-100"
                                : "opacity-0",
                            )}
                          />
                          {(option).label}
                        </CommandItem>
                      ))}
                      <CommandItem
                        key={OTHER_VALUE}
                        value={OTHER_LABEL}
                        onSelect={() => {
                          form.setValue(name, OTHER_VALUE, {
                            shouldDirty: true,
                            shouldTouch: true,
                          });
                          setOpen(false);
                        }}
                      >
                        <AiOutlineCheck
                          className={cn(
                            "mr-2 h-4 w-4",
                            isOther ? "opacity-100" : "opacity-0",
                          )}
                        />
                        {OTHER_LABEL}
                      </CommandItem>
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
            {isOther && (
              <div className="mt-2 flex flex-col">
                <FormControl>
                  <Input
                    autoFocus
                    value={otherRaw}
                    onChange={(e) => {
                      const val = e.target.value;
                      form.setValue(
                        name,
                        val ? `${OTHER_PREFIX}${val})` : OTHER_VALUE,
                        { shouldDirty: true },
                      );
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
