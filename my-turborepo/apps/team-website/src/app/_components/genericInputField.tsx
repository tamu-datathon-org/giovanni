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
import {
  FIELD,
  FIELD_CONTROL,
  FIELD_ITEM,
  FIELD_LABEL,
  FIELD_MESSAGE,
  FIELD_NOTE,
} from "./applicationFieldStyles";

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
        <FormItem className={FIELD_ITEM}>
          <div className={FIELD}>
            <FormLabel className={FIELD_LABEL}>
              {label}
              {required ? <Asterisk /> : ""}
            </FormLabel>
            <FormControl>
              <Input
                className={FIELD_CONTROL}
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
          <FormMessage className={FIELD_MESSAGE} />
          {description && (
            <FormDescription
              className={`${FIELD_NOTE} !mt-[0.65rem] w-full max-w-none whitespace-normal break-words leading-[1.6] text-[#526777]`}
            >
              {description}
            </FormDescription>
          )}
        </FormItem>
      )}
    />
  );
};

export default GenericInputField;
