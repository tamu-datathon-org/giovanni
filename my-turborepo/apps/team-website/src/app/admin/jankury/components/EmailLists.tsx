"use client";

import type { z } from "zod";
import { useFormContext } from "react-hook-form";
import { env } from "~/env";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@vanni/ui/form";

import type { FormSchema } from "~/app/admin/jankury/formSchema";
import { Checkbox } from "~/components/ui/checkbox";
import { api } from "~/trpc/react";
import { Button } from "@vanni/ui/button";

export default function EmailLists() {
  const lists = api.email.getAllLabels.useQuery().data;
  const form = useFormContext<z.infer<typeof FormSchema>>();

  const hardcodedLists = [
    `Current ${env.NEXT_PUBLIC_EVENT_NAME} accepted`,
    `Current ${env.NEXT_PUBLIC_EVENT_NAME} pending`,
    `Current ${env.NEXT_PUBLIC_EVENT_NAME} rejected`,
    `Current ${env.NEXT_PUBLIC_EVENT_NAME} waitlisted`,
    `Current ${env.NEXT_PUBLIC_EVENT_NAME} all`,
  ];

  const mergedLists = [...(lists ?? []), ...hardcodedLists];
  const isTestList = (listName: string) =>
    /(test|qa|dev|staging|sandbox|mock|dummy|sample)/i.test(listName);
  const testLists = mergedLists.filter((listName) => isTestList(listName));
  const realLists = mergedLists.filter((listName) => !isTestList(listName));

  return (
    <FormField
      control={form.control}
      name="mailing_lists"
      defaultValue={[]}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-base font-semibold text-white">Mailing Lists</FormLabel>
          <Dialog>
            <DialogTrigger asChild>
              <Button
                type="button"
                className="ml-2 rounded-md border-2 border-black bg-black p-2 text-white hover:border-gray-700 hover:bg-gray-800"
              >
                Select Email Lists
              </Button>
            </DialogTrigger>
            <DialogContent className="w-[92vw] max-w-4xl max-h-[80vh] overflow-auto bg-gray-800 text-white">
              <DialogHeader>
                <div className="flex items-center gap-3">
                  <DialogTitle>Select Email Lists</DialogTitle>
                  <div className="flex items-center gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      className="h-8 px-2 text-xs"
                      onClick={() => field.onChange([])}
                    >
                      Unselect All
                    </Button>
                  </div>
                </div>
              </DialogHeader>
              <div className="grid gap-6 pt-2 md:grid-cols-[0.3fr_0.7fr]">
                <div className="space-y-3">
                  <h3 className="text-sm font-semibold text-blue-300">Test Emails</h3>
                  {testLists.length > 0 ? (
                    testLists.map((listName) => (
                      <FormItem
                        key={listName}
                        className="flex flex-row items-start space-x-3 space-y-0"
                      >
                        <FormControl>
                          <Checkbox
                            className="border-gray-200 data-[state=checked]:border-gray-100"
                            checked={field.value.includes(listName)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, listName])
                                : field.onChange(
                                  field.value.filter(
                                    (value: string) => value !== listName,
                                  ),
                                );
                            }}
                          />
                        </FormControl>
                        <FormLabel className="font-normal text-white text-md">
                          {listName}
                        </FormLabel>
                      </FormItem>
                    ))
                  ) : (
                    <p className="text-xs text-gray-300">No test email lists detected.</p>
                  )}
                </div>

                <div className="space-y-3">
                  <h3 className="text-sm font-semibold text-blue-300">Real Emails</h3>
                  {realLists.length > 0 ? (
                    realLists.map((listName) => (
                      <FormItem
                        key={listName}
                        className="flex flex-row items-start space-x-3 space-y-0"
                      >
                        <FormControl>
                          <Checkbox
                            className="border-gray-200 data-[state=checked]:border-gray-100"
                            checked={field.value.includes(listName)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, listName])
                                : field.onChange(
                                  field.value.filter(
                                    (value: string) => value !== listName,
                                  ),
                                );
                            }}
                          />
                        </FormControl>
                        <FormLabel className="font-normal text-white text-md">
                          {listName}
                        </FormLabel>
                      </FormItem>
                    ))
                  ) : (
                    <p className="text-xs text-gray-300">No real email lists detected.</p>
                  )}
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <div className="mt-3">
            {field.value.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {field.value.map((selectedList: string) => (
                  <span
                    key={selectedList}
                    className="rounded-full border border-gray-400 bg-gray-800 px-3 py-1 text-xs text-gray-50"
                  >
                    {selectedList}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-300">No mailing lists selected yet.</p>
            )}
          </div>
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
