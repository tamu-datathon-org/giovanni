import type { UseFormRegister } from "react-hook-form";
import React from "react";
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

function filter20Items(arr, query: string) {
  console.log(query);
  return arr
    .filter((el) => el.toLowerCase().includes(query.toLowerCase()))
    .slice(0, 20);
  // return arr;
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
  watch,
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

    <div className="flex flex-col">
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
            {value ? options.find((option) => option === value) : "Select ..."}
            <BsChevronExpand className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className=" w-fit p-0">
          <Command>
            <CommandInput
              placeholder={`Search ${name}...`}
              {...register(name)}
            />
            <CommandList>
              <CommandEmpty>School not found.</CommandEmpty>
              <CommandGroup>
                {filter20Items(options, watch(name)).map((option, index) => (
                  <CommandItem
                    key={option}
                    value={option}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? "" : currentValue);
                      setOpen(false);
                    }}
                  >
                    <AiOutlineCheck
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === option ? "opacity-100" : "opacity-0",
                      )}
                    />
                    {option}
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