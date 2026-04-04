"use client";

import { useFormContext } from "react-hook-form";

import { FormControl, FormField, FormItem, FormLabel } from "@vanni/ui/form";

import { Checkbox } from "~/components/ui/checkbox";

export default function Confirmation() {
  const form = useFormContext();
  return (
    <FormField
      control={form.control}
      name="confirmation"
      render={({ field }) => (
        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border border-gray-500/60 p-4">
          <FormControl>
            <Checkbox
              className="border-gray-200 data-[state=checked]:border-gray-100"
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
        </FormItem>
      )}
    />
  );
}
