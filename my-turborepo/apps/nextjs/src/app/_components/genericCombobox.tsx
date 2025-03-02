import type { ElementRef } from "react";
import React, { useMemo, useRef, useState } from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
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

  // form.setValue(name, defaultOption);

  const filter20Items = useMemo(() => {
    if (isDebouncing) {
      return ["Loading..."];
    }

    const query = debouncedValue;
    // console.log("thing: ", query);

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
    //Basic Dropdown
    // <div className='flex flex-col'>
    //     {label && <Label htmlFor={name} className='text-xl pt-4'>{label}</Label>}
    //     <Select {...register(name)}>
    //         <SelectTrigger className="hover:border-cyan-500 focus:border-sky-700">
    //             <SelectValue placeholder="---------" />
    //         </SelectTrigger>
    //         <SelectContent>
    //             {options.map((option, index) => (
    //                 <SelectItem key={index} value={option.value}>{option.label}</SelectItem>
    //             ))}
    //         </SelectContent>
    //     </Select>
    // </div>

    // ComboBox
    <FormField
      control={form.control}
      name={name}
      defaultValue={defaultOption?.value}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel className="text-xl">
            {label}
            {required ? <Asterisk /> : ""}
          </FormLabel>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  role="combobox"
                  className="justify-between"
                >
                  {field.value
                    ? options.find((option) => option.value === field.value)
                        ?.label
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
                          form.setValue(
                            name,
                            currentValue === field.value ? "" : currentValue,
                          );
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
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default GenericCombobox;
