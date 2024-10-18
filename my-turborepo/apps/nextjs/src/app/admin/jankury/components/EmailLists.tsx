"use client";

import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@vanni/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";

import { Checkbox } from "~/components/ui/checkbox";
import Link from "next/link";
import { api } from "~/trpc/react";
import { type } from "os";
import { useFormContext } from "react-hook-form";

export default function EmailLists() {
    const lists = api.email.getAllLabels.useQuery().data;
    const form = useFormContext();

    return (
        <FormField
          control={form.control}
          name="mailing_list"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mailing List</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a mailing list" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                    {lists?.map((list) => {
                        return <SelectItem value={list.name}>{list.name}</SelectItem>
                    })}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
    );
}