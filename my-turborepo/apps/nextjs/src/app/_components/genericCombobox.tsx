import type { UseFormRegister } from "react-hook-form";
import React, { ElementRef, useMemo, useRef } from "react";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
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
import { Label } from "~/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

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
}

const GenericCombobox: React.FC<GenericDropdownProps> = ({
  name,
  label,
  options,
  filter,
}) => {
  const form = useFormContext<ApplicationSchema>();
  const commandInputRef = useRef<ElementRef<typeof CommandInput>>(null);

  function filter20Items() {
    const query = commandInputRef.current?.value;
    console.log("thing: ", query);

    if (filter) {
      return options
        .filter(({ value }) =>
          value.toLowerCase().includes(query ? query.toLowerCase() : ""),
        )
        .slice(0, 20);
    }
    return options;
  }

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
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>{label}</FormLabel>

          <Popover>
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
            <PopoverContent className=" w-fit p-0">
              <Command>
                <CommandInput
                  placeholder={`Search ${name}...`}
                  ref={commandInputRef}
                />
                <CommandList>
                  {/*TODO: Change the line below*/}
                  <CommandEmpty>No framework found.</CommandEmpty>
                  <CommandGroup>
                    {filter20Items().map((option) => (
                      <CommandItem
                        key={option.value}
                        value={option.value}
                        onSelect={(currentValue) => {
                          form.setValue(
                            name,
                            currentValue === field.value ? "" : currentValue,
                          );
                          // setOpen(false);
                        }}
                      >
                        <AiOutlineCheck
                          className={cn(
                            "mr-2 h-4 w-4",
                            field.value === option.value
                              ? "opacity-100"
                              : "opacity-0",
                          )}
                        />
                        {option.label}
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