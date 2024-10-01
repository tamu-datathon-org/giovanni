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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Asterisk } from "./application-form";

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
  defaultOption,
  required,
}) => {
  const form = useFormContext<ApplicationSchema>();

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
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger variant="outline" className="justify-between">
                <SelectValue placeholder="Select..." />
              </SelectTrigger>
              {/*<BsChevronExpand className="ml-2 h-4 w-4 shrink-0 opacity-50" />*/}
            </FormControl>
            <SelectContent className="w-fit max-w-full p-0">
              {options.map((option) => (
                <>
                  {/*<AiOutlineCheck*/}
                  {/*  className={cn(*/}
                  {/*    "mr-2 h-4 w-4",*/}
                  {/*    field.value === option.value*/}
                  {/*      ? "opacity-100"*/}
                  {/*      : "opacity-0",*/}
                  {/*  )}*/}
                  {/*/>*/}
                  <SelectItem value={option.value}>{option.label}</SelectItem>
                </>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default GenericCombobox;
