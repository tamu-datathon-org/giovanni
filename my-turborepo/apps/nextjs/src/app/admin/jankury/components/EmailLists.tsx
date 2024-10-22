"use client";

import { type } from "os";
import Link from "next/link";
import { list } from "@vercel/blob";
import { useFormContext } from "react-hook-form";
import { z } from "zod";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@vanni/ui/form";

import { FormSchema } from "~/app/admin/jankury/formSchema";
import { Checkbox } from "~/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { api } from "~/trpc/react";

export default function EmailLists() {
  const lists = api.email.getAllLabels.useQuery().data;
  const form = useFormContext<z.infer<typeof FormSchema>>();

  return (
    <FormField
      control={form.control}
      name="mailing_lists"
      defaultValue={[]}
      render={() => (
        <FormItem>
          <FormLabel>Mailing List</FormLabel>
          {lists?.map((listName) => (
            <FormField
              key={listName}
              control={form.control}
              name="mailing_lists"
              render={({ field }) => {
                return (
                  <FormItem
                    key={listName}
                    className="flex flex-row items-start space-x-3 space-y-0"
                  >
                    <FormControl>
                      <Checkbox
                        checked={field.value?.includes(listName)}
                        onCheckedChange={(checked) => {
                          console.log(field.value);
                          return checked
                            ? field.onChange([...field.value, listName])
                            : field.onChange(
                                field.value?.filter(
                                  (value: any) => value !== listName,
                                ),
                              );
                        }}
                      />
                    </FormControl>
                    <FormLabel className="font-normal">{listName}</FormLabel>
                  </FormItem>
                );
              }}
            />
          ))}
          <FormMessage />
        </FormItem>
      )}
    />

    // <FormField
    //   control={form.control}
    //   name="mailing_list"
    //   render={({ field }) => (
    //     <FormItem>
    //       <FormLabel>Mailing List</FormLabel>
    //       <Select onValueChange={field.onChange} defaultValue={field.value}>
    //         <FormControl>
    //           <SelectTrigger>
    //             <SelectValue placeholder="Select a mailing list" />
    //           </SelectTrigger>
    //         </FormControl>
    //         <SelectContent>
    //             {lists?.map((list) => {
    //                 return <SelectItem value={list}>{list}</SelectItem>
    //             })}
    //         </SelectContent>
    //       </Select>
    //       <FormMessage />
    //     </FormItem>
    //   )}
    // />
  );
}
