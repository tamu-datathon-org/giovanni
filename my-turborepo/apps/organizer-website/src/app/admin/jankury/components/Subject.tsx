"use client";

import { useFormContext } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@vanni/ui/form";

import { Input } from "~/components/ui/input";

export default function Subject() {
  const form = useFormContext();
  return (
    <FormField
      control={form.control}
      name="subject"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-base font-semibold text-white">Email Subject Line</FormLabel>
          <FormControl>
            <Input placeholder="Enter a clear email subject" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
