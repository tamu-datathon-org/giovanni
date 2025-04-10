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
import { Slider } from "@vanni/ui/slider";

import { Input } from "~/components/ui/input";

export default function BatchSize() {
  const form = useFormContext();
  return (
    <FormField
      control={form.control}
      name="maxBatchSize"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Maximum Batch Size</FormLabel>
          <FormControl>
            <Input placeholder="10" {...field} />
          </FormControl>
          <FormMessage />
          <FormDescription>
            Keep this at the highest number possible (10). If the test fails,
            lower the number and try again.
          </FormDescription>
        </FormItem>
      )}
    />
  );
}
