import React from "react";
import type { UseFormRegister } from "react-hook-form";
import { AiOutlineCheck } from "react-icons/ai";
import { BsChevronExpand } from "react-icons/bs";

import { cn } from "@vanni/ui";

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
  schoolName: string;
}

interface SchoolDropdownProps {
  register: UseFormRegister<any>;
  name: string;
  label?: string;
  options: DropdownOption[];
  defaultOption?: DropdownOption;
}

const SchoolDropdown: React.FC<SchoolDropdownProps> = ({
  register,
  name,
  label,
  options,
}) => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  return (
    // <div className='flex flex-col'>
    //     {label && <Label htmlFor={name} className='text-xl pt-4'>{label}</Label>}
    //     <Select {...register(name)}>
    //         <SelectTrigger className="hover:border-cyan-500 focus:border-sky-700">
    //             <SelectValue placeholder="---------" />
    //         </SelectTrigger>
    //         <SelectContent>
    //             {options.map((option, index) => (
    //                 <SelectItem key={index} value={option.schoolName}>{option.schoolName}</SelectItem>
    //             ))}
    //         </SelectContent>
    //     </Select>
    // </div>

    <div className="relative flex flex-col">
      {label && (
        <Label htmlFor={name} className="pt-4 text-xl">
          {label}
        </Label>
      )}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="justify-between"
          >
            {value
              ? options.find((option) => option.schoolName === value)
                  ?.schoolName
              : "Select ..."}
            <BsChevronExpand className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="top-0 w-fit p-0" align="start">
          <Command>
            <CommandInput
              placeholder={`Search ${name}...`}
              {...register(name)}
            />
            <CommandList>
              <CommandEmpty>No framework found.</CommandEmpty>
              <CommandGroup>
                {options.map((option, index) => (
                  <CommandItem
                    key={option.schoolName}
                    value={option.schoolName}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? "" : currentValue);
                      setOpen(false);
                    }}
                  >
                    <AiOutlineCheck
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === option.schoolName
                          ? "opacity-100"
                          : "opacity-0",
                      )}
                    />
                    {option.schoolName}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default SchoolDropdown;
