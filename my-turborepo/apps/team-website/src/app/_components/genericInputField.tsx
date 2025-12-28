import React from "react";
import { useFormContext } from "react-hook-form";

import { FormField, FormItem, FormLabel, FormMessage } from "@vanni/ui/form";

import type { ApplicationSchema } from "~/app/apply/validation";
import { Input } from "~/components/ui/input";
import { Asterisk } from "../apply/application/application-form";

interface GenericInputProps {
  name: keyof ApplicationSchema;
  label?: string;
  defaultValue?: string;
  required?: boolean;
  placeholder: string;
  disabled?: boolean;
}

const GenericInputField: React.FC<GenericInputProps> = ({
  name,
  label,
  defaultValue,
  required,
  placeholder,
  disabled,
}) => {
  const form = useFormContext<ApplicationSchema>();
  return (
    <FormField
      control={form.control}
      name={name}
      defaultValue={defaultValue}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel className="text-xl">
            {label}
            {required ? <Asterisk /> : ""}
          </FormLabel>
          <Input
            className="bg-white text-black placeholder-gray-500"
            placeholder={placeholder}
            value={
              typeof field.value === "string" || typeof field.value === "number"
                ? field.value
                : ""
            }
            onChange={field.onChange}
            onBlur={field.onBlur}
            name={field.name}
            disabled={disabled}
          />
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default GenericInputField;
