import React, { useMemo, useState } from "react";
import { useFormContext } from "react-hook-form";

import { cn } from "@vanni/ui";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@vanni/ui/form";

import type { ApplicationSchema } from "~/app/apply/validation";
import { Asterisk } from "../apply/application/application-form";
import { Input } from "~/components/ui/input";

interface GenericInputProps {
  name: keyof ApplicationSchema;
  label?: string;
  defaultValue?: string;
  required?: boolean;
  placeholder: string;
}

const GenericInputField: React.FC<GenericInputProps> = ({
  name,
  label,
  defaultValue,
  required,
  placeholder
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
            className="bg-white placeholder-gray-500 text-black"
            placeholder={placeholder}
            value={typeof field.value === "string" || typeof field.value === "number" ? field.value : ""}
            onChange={field.onChange}
            onBlur={field.onBlur}
            name={field.name}
          />
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default GenericInputField;
