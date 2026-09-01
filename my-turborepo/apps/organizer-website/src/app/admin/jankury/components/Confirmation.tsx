"use client";

import { useFormContext } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@vanni/ui/form";

import { Checkbox } from "~/components/ui/checkbox";

export default function Confirmation() {
  const form = useFormContext();
  return (
    <FormField
      control={form.control}
      name="confirmation"
      render={({ field, fieldState }) => (
        <FormItem>
          <div
            className={`flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 transition-colors ${
              fieldState.invalid
                ? "border-red-500 bg-red-950/30"
                : "border-gray-500/60"
            }`}
          >
            <FormControl>
              <Checkbox
                className={`data-[state=checked]:border-gray-100 ${
                  fieldState.invalid ? "border-red-400" : "border-gray-200"
                }`}
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <div className="space-y-1 leading-none">
              <FormLabel className="font-semibold text-white">
                I confirm this email has already been tested with a test mailing list
                (or is currently being tested).
              </FormLabel>
            </div>
          </div>
          <FormMessage className="pt-1 text-red-400" />
        </FormItem>
      )}
    />
  );
}
