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
          <FormLabel>Subject</FormLabel>
          <FormControl>
            <Input placeholder="Marriage Proposal" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
