import React, { useEffect, useState } from "react";
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
import {
  FIELD_ITEM_STACKED,
  FIELD_LABEL_STACKED,
  FIELD_MESSAGE,
  FIELD_NOTE,
  FIELD_STACKED,
  FIELD_TEXTAREA,
} from "./applicationFieldStyles";

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
  placeholder,
}) => {
  const form = useFormContext<ApplicationSchema>();
  const [charCounter, setCharCounter] = useState(0);

  return (
    <FormField
      control={form.control}
      name={name}
      defaultValue={defaultValue}
      render={({ field }) => {
        useEffect(() => {
          const currentValue =
            typeof field.value === "string" ? field.value : "";
          setCharCounter(currentValue.length);
        }, [field.value]);

        return (
          <FormItem className={FIELD_ITEM_STACKED}>
            <div className={FIELD_STACKED}>
              <FormLabel className={FIELD_LABEL_STACKED}>
                {label}
                {required ? <Asterisk /> : ""}
              </FormLabel>
              <FormControl>
                <textarea
                  className={FIELD_TEXTAREA}
                  placeholder={placeholder}
                  {...field}
                  maxLength={150}
                  onChange={(e) => {
                    field.onChange(e);
                    setCharCounter(e.target.value.length);
                  }}
                  value={typeof field.value === "string" ? field.value : ""}
                />
              </FormControl>
            </div>
            <FormMessage className={FIELD_MESSAGE} />
            <p className={`${FIELD_NOTE} text-gray-500`}>
              {charCounter}/150 characters
            </p>
          </FormItem>
        );
      }}
    />
  );
};

export default GenericTextArea;
