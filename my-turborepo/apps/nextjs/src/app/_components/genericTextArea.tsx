import React, { useState } from "react";
import { useFormContext } from "react-hook-form";

import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@vanni/ui/form";

import type { ApplicationSchema } from "~/app/apply/validation";
import { Asterisk } from "../apply/application/application-form";

interface GenericTextAreaProps {
    name: keyof ApplicationSchema;
    label?: string;
    defaultValue?: string | undefined;
    required?: boolean;
    placeholder: string;
}

const GenericTextArea: React.FC<GenericTextAreaProps> = ({
    name,
    label,
    defaultValue,
    required,
    placeholder
}) => {
    const form = useFormContext<ApplicationSchema>();
    const [charCounter, setCharCounter] = useState(0);

    return (
        <FormField
            control={form.control}
            name={name}
            defaultValue={defaultValue}
            render={({ field }) => (
                <FormItem>
                    <FormLabel className="text-xl">
                        {label}
                        {required ? <Asterisk /> : ""}
                    </FormLabel>
                    <FormControl>
                        <textarea
                            className="bg-white w-full p-2 border rounded text-sm text-black"
                            placeholder={placeholder}
                            {...field}
                            maxLength={155}
                            onChange={(e) => {
                                field.onChange(e);
                                setCharCounter(e.target.value.length);
                            }}
                            value={typeof field.value === "string" ? field.value : ""}
                        />
                    </FormControl>
                    <FormMessage />
                    <p className="mt-1 text-sm text-gray-500">
                        {charCounter}/150 characters
                    </p>
                </FormItem>
            )}
        />
    );
};

export default GenericTextArea;
