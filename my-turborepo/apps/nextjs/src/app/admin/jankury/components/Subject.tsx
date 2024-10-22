"use client";

import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@vanni/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";

import { Checkbox } from "~/components/ui/checkbox";
import { Input } from "~/components/ui/input";
import Link from "next/link";
import { api } from "~/trpc/react";
import { type } from "os";
import { useFormContext } from "react-hook-form";

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