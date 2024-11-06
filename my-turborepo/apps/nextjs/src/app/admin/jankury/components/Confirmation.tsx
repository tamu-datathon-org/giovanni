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
        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
          <FormControl>
            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
          </FormControl>
          <div className="space-y-1 leading-none">
            <FormLabel>
              This email was already tested using a testing mailing list, or
              it's being tested right now.
            </FormLabel>
          </div>
        </FormItem>
      )}
    />
  );
}
