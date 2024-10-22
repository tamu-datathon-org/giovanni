"use client";

import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@vanni/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";

import { Checkbox } from "~/components/ui/checkbox";
import { Input } from "~/components/ui/input";
import Link from "next/link";
import { api } from "~/trpc/react";
import { type } from "os";
import { useFormContext } from "react-hook-form";

export default function Confirmation() {
    const form = useFormContext();
    return (
      <FormField
          control={form.control}
          name="confirmation"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>
                  This email was already tested using a testing mailing list, or it's being tested right now.
                </FormLabel>
              </div>
            </FormItem>
          )}
        />
    );
}