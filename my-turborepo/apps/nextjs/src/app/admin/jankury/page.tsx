"use client";

import type { z } from "zod";
import { Suspense } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@vanni/ui/button";
import { Form } from "@vanni/ui/form";

import { FormSchema } from "~/app/admin/jankury/formSchema";
import { toast } from "~/hooks/use-toast";
import { api } from "~/trpc/react";
import BatchSize from "./components/BatchSize";
import Confirmation from "./components/Confirmation";
import Content from "./components/Content";
import EmailLists from "./components/EmailLists";
import Preview from "./components/Preview";
import Subject from "./components/Subject";
import InputEmails from "./components/InputEmails";

export const runtime = "edge";

export default function JankuryPage() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const sendBulk = api.emailSending.sendBulkEmails.useMutation();
  const sendStatus = api.emailSending.sendStatusEmails.useMutation();

  function handleSendStatus() {
    sendStatus.mutate(
      {},
      {
        onSuccess: () => {
          toast({
            variant: "success",
            title: "Emails have finished sending",
            description:
              "The emails have finished sending. You can now exit this page.",
          });
        },
        onError: (error: { message: any }) => {
          toast({
            title: "Error sending emails",
            description: error.message,
            variant: "destructive",
          });
        },
      },
    );
  }

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <>
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">{JSON.stringify(data, null, 2)}</code>
          </pre>
          <h1>Please wait while the emails are queued.</h1>
        </>
      ),
    });

    sendBulk.mutate(data, {
      onSuccess: () => {
        toast({
          title: "Emails queued!",
          description:
            "The emails have been added to the sending queue. You can now exit this page.",
        });
      },
      onError: (error: { message: any }) => {
        toast({
          title: "Error sending emails",
          description: error.message,
          variant: "destructive",
        });
      },
    });
  }
  return (
    <>
      <div className="overflow-auto mt-40 mb-20">
        <div className="font-XPfont flex justify-center">
          <div className="flex h-full w-full justify-center">
            <Button onClick={handleSendStatus}>Send Email Status</Button>
            <Suspense fallback={<h1>Loading... please wait</h1>}>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="w-3/5 bg-gray-700 overflow-x-hidden rounded-lg p-5 lg:px-16"
                >
                  <EmailLists />
                  <InputEmails />
                  <BatchSize />
                  <Subject />
                  <Content />
                  <Preview />
                  <Confirmation />
                  <Button type="submit">Submit</Button>
                </form>
              </Form>
            </Suspense>
          </div>
        </div>
      </div>
    </>
  );
}
