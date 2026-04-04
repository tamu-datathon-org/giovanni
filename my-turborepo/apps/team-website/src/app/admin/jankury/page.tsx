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
      {
        statusBatchSize: 100,
        emailBatchSize: 4,
      },
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
      <div className="mt-40 mb-20 overflow-auto">
        <div className="font-XPfont flex justify-center px-4">
          <div className="w-full max-w-7xl">
            <Suspense fallback={<h1>Loading... please wait</h1>}>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="overflow-x-hidden rounded-lg bg-gray-700 p-3 lg:px-6"
                >
                  <div className="grid gap-4 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.4fr)_minmax(0,0.45fr)]">
                    <div className="space-y-6 rounded-md bg-gray-800/40 p-3">
                      <h2 className="text-lg font-semibold text-blue-400">Recipient Settings</h2>
                      <EmailLists />
                      <InputEmails />
                      <BatchSize />
                    </div>

                    <div className="space-y-6 rounded-md bg-gray-800/40 p-3">
                      <h2 className="text-lg font-semibold text-blue-400">Custom Email</h2>
                      <Subject />
                      <Content />
                      <Preview />
                    </div>

                    <div className="space-y-4 rounded-md bg-gray-800/40 p-3">
                      <h2 className="text-lg font-semibold text-blue-400">Actions</h2>
                      <Confirmation />
                      <Button type="submit" className="w-full">
                        Submit Custom Email
                      </Button>
                      <div className="my-2 border-t border-gray-500/60" />
                      <p className="text-sm text-gray-200">
                        Send application status emails: accepted, rejected, waitlisted
                      </p>
                      <Button
                        type="button"
                        onClick={handleSendStatus}
                        className="w-full min-h-12 whitespace-normal px-4 py-3 text-sm leading-tight bg-purple-600 text-white hover:bg-purple-700"
                      >
                        Send Application Status Emails
                      </Button>
                    </div>
                  </div>
                </form>
              </Form>
            </Suspense>
          </div>
        </div>
      </div>
    </>
  );
}
