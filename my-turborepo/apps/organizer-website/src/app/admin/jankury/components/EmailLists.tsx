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
          <div className="flex items-center justify-between">
            <FormLabel className="text-base font-semibold text-white">Mailing Lists</FormLabel>
            <Dialog>
              <DialogTrigger asChild>
                <button
                  type="button"
                  className="flex h-6 w-6 items-center justify-center rounded-full border border-gray-500 bg-gray-700 text-white hover:border-gray-400 hover:bg-gray-600"
                  title="Add mailing list"
                >
                  <span className="text-base leading-none">+</span>
                </button>
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
          </div>

          <div className="mt-3 min-h-[56px] rounded-md border border-gray-600/50 bg-gray-900/50 p-2">
            {field.value.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {field.value.map((selectedList: string) => (
                  <span
                    key={selectedList}
                    className="flex items-center gap-1 rounded-full border border-gray-400 bg-gray-800 pl-3 pr-1.5 py-1 text-xs text-gray-50"
                  >
                    {selectedList}
                    <button
                      type="button"
                      onClick={() => field.onChange(field.value.filter((v: string) => v !== selectedList))}
                      className="ml-0.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-gray-600 text-gray-300 hover:bg-gray-500 hover:text-white"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-xs text-gray-500 italic">No mailing lists selected yet. Click + button to add.</p>
            )}
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
