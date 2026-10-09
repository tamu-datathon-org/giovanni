import React from "react";
import { useFormContext } from "react-hook-form";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@vanni/ui/form";

import type { ApplicationSchema } from "~/app/apply/validation";
import { Input } from "~/components/ui/input";
import { Asterisk } from "../apply/application/application-form";

interface GenericInputProps {
  name: keyof ApplicationSchema;
  label?: string;
  description?: React.ReactNode;
  defaultValue?: string;
  required?: boolean;
  placeholder: string;
  disabled?: boolean;
}

const GenericInputField: React.FC<GenericInputProps> = ({
  name,
  label,
  description,
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
        <FormItem className="flex flex-col" data-application-item>
          <div
            className="flex flex-col space-y-2"
            data-application-field="input"
          >
            <FormLabel>
              {label}
              {required ? <Asterisk /> : ""}
            </FormLabel>
            <FormControl>
              <Input
                placeholder={placeholder}
                value={
                  typeof field.value === "string" ||
                  typeof field.value === "number"
                    ? field.value
                    : ""
                }
                onChange={field.onChange}
                onBlur={field.onBlur}
                name={field.name}
                disabled={disabled}
              />
            </FormControl>
          </div>
          <FormMessage />
          {description && (
            <FormDescription className="text-sm text-gray-400">
              {description}
            </FormDescription>
          )}
        </FormItem>
      )}
    />
  );
};

export default GenericInputField;
