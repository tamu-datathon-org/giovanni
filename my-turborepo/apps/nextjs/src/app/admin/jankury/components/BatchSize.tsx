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
          <FormLabel>Maximum Batch Size: {field.value}</FormLabel>
          <FormControl>
            <Slider
              className="black"
              defaultValue={[10]}
              max={10}
              step={1}
              min={1}
	      onChange={field.onChange}
            />
          </FormControl>
          <FormMessage />
          <FormDescription>
            Keep this at the highest number possible. If the test fails, lower
            the number and try again.
          </FormDescription>
        </FormItem>
      )}
    />
  );
}
