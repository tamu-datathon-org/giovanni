"use client";

import { useFormContext } from "react-hook-form";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@vanni/ui/form";

import { Input } from "~/components/ui/input";

export default function BatchSize() {
  const form = useFormContext();
  return (
    <FormField
      control={form.control}
      name="maxBatchSize"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-base font-semibold text-white">Maximum Email Batch Size</FormLabel>
          <FormControl>
            <Input placeholder="10" {...field} />
          </FormControl>
          <FormMessage />
          <FormDescription className="text-gray-200">
            Start with 10 for faster sending. If delivery fails, lower this value and try again.
          </FormDescription>
        </FormItem>
      )}
    />
  );
}
