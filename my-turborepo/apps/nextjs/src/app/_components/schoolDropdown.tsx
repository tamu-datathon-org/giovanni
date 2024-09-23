import React from 'react';
import { UseFormRegister } from 'react-hook-form';
import { Label } from '~/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '~/components/ui/select';

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
    return (
        <div className='flex flex-col'>
            {label && <Label htmlFor={name} className='text-xl pt-4'>{label}</Label>}
            <Select {...register(name)}>
                <SelectTrigger className="hover:border-cyan-500 focus:border-sky-700">
                    <SelectValue placeholder="---------" />
                </SelectTrigger>
                <SelectContent>
                    {options.map((option, index) => (
                        <SelectItem key={index} value={option.schoolName}>{option.schoolName}</SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
};

export default SchoolDropdown;
