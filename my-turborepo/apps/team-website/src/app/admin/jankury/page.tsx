"use client";

import type { z } from "zod";
import { Suspense, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";

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
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";

function splitRecipients(value: string) {
  return value
    .split(",")
    .map((email) => email.trim())
    .filter(Boolean);
}

export const runtime = "edge";

export default function JankuryPage() {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    // Start every field in a known-safe state so the form can send only
    // additional recipients when no mailing list is selected.
    defaultValues: {
      mailing_lists: [],
      subject: "",
      content: "",
      maxBatchSize: 10,
      additionalEmails: "",
      confirmation: false,
    },
  });

  const sendBulk = api.emailSending.sendBulkEmails.useMutation();
  const sendStatus = api.emailSending.sendStatusEmails.useMutation();
  const mailingLists = useWatch({ control: form.control, name: "mailing_lists" }) ?? [];
  const subject = useWatch({ control: form.control, name: "subject" }) ?? "";
  const content = useWatch({ control: form.control, name: "content" }) ?? "";
  const additionalEmails = useWatch({ control: form.control, name: "additionalEmails" }) ?? "";
  const parsedAdditionalEmails = splitRecipients(additionalEmails);

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
    setIsConfirmOpen(false);

    const payload = {
      ...data,
      additionalEmails: splitRecipients(data.additionalEmails),
    };

    sendBulk.mutate(payload, {
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

  function handleOpenCustomEmailConfirm() {
    const selectedMailingLists = form.getValues("mailing_lists") ?? [];
    const additionalRecipientInput = form.getValues("additionalEmails") ?? "";
    const enteredAdditionalRecipients = splitRecipients(additionalRecipientInput);
    const subjectValue = (form.getValues("subject") ?? "").trim();
    const contentValue = (form.getValues("content") ?? "").trim();
    const batchSizeValue = Number(form.getValues("maxBatchSize"));
    const isConfirmationChecked = form.getValues("confirmation");
    let hasError = false;

    if (
      selectedMailingLists.length === 0
      && enteredAdditionalRecipients.length === 0
    ) {
      const recipientMessage =
        "Select at least one mailing list or enter additional recipient emails.";
      form.setError("additionalEmails", {
        type: "manual",
        message: recipientMessage,
      });
      hasError = true;
    } else {
      form.clearErrors("additionalEmails");
    }

    if (!subjectValue) {
      form.setError("subject", {
        type: "manual",
        message: "Please enter an email subject line.",
      });
      hasError = true;
    } else {
      form.clearErrors("subject");
    }

    if (!contentValue) {
      form.setError("content", {
        type: "manual",
        message: "Please enter an HTML email body.",
      });
      hasError = true;
    } else {
      form.clearErrors("content");
    }

    if (!Number.isFinite(batchSizeValue) || batchSizeValue < 1 || batchSizeValue > 10) {
      form.setError("maxBatchSize", {
        type: "manual",
        message: "Please enter a maximum batch size from 1 to 10.",
      });
      hasError = true;
    } else {
      form.clearErrors("maxBatchSize");
    }

    if (!isConfirmationChecked) {
      form.setError("confirmation", {
        type: "manual",
        message: "Please test the email and check the box.",
      });
      hasError = true;
    } else {
      form.clearErrors("confirmation");
    }

    if (hasError) {
      return;
    }

    setIsConfirmOpen(true);
  }

  return (
    <>
      <div className="mt-40 mb-20 overflow-auto">
        <div className="font-XPfont flex justify-center px-4">
          <div className="w-full max-w-7xl">
            <Suspense fallback={<h1>Loading... please wait</h1>}>
              <Form {...form}>
                <form
                  onSubmit={(event) => event.preventDefault()}
                  className="overflow-x-hidden rounded-lg bg-gray-700 p-3 lg:px-6"
                >
                  <div className="grid gap-4 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.4fr)_minmax(0,0.45fr)]">
                    <div className="space-y-2 rounded-md bg-gray-800/40 p-3">
                      <h2 className="text-lg font-semibold text-blue-400">Recipient Settings</h2>
                      <p className="mt-0 text-[12px] font-medium leading-none text-purple-500">
                        NOTE: PLEASE SEND TO A <strong>TEST EMAIL/LIST</strong> FIRST
                      </p>
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
                      <Button
                        type="button"
                        onClick={handleOpenCustomEmailConfirm}
                        className="w-full bg-blue-600 text-white hover:bg-blue-700"
                      >
                        Confirm Custom Email
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

                      <Dialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
                        <DialogContent className="max-h-[85vh] w-[92vw] max-w-5xl overflow-auto bg-gray-900 text-white">
                          <DialogHeader>
                            <DialogTitle>Confirm Custom Email Send</DialogTitle>
                          </DialogHeader>

                          {/* 30 70 split for confirmation */}
                          <div className="grid gap-4 lg:grid-cols-[0.3fr_0.7fr]"> 
                            <div className="space-y-4 rounded-md bg-gray-800/60 p-4">
                              <div>
                                <h3 className="text-sm font-semibold text-blue-300">Mailing Lists</h3>
                                {mailingLists.length > 0 ? (
                                  <div className="mt-2 flex flex-wrap gap-2">
                                    {mailingLists.map((listName) => (
                                      <span
                                        key={listName}
                                        className="rounded-full border border-gray-500 bg-gray-900 px-3 py-1 text-xs text-gray-100"
                                      >
                                        {listName}
                                      </span>
                                    ))}
                                  </div>
                                ) : (
                                  <p className="mt-2 text-sm text-gray-300">
                                    No mailing lists selected.
                                  </p>
                                )}
                              </div>

                              <div>
                                <h3 className="text-sm font-semibold text-blue-300">Additional Recipients</h3>
                                {parsedAdditionalEmails.length > 0 ? (
                                  <div className="mt-2 flex flex-wrap gap-2">
                                    {parsedAdditionalEmails.map((email) => (
                                      <span
                                        key={email}
                                        className="rounded-full border border-gray-500 bg-gray-900 px-3 py-1 text-xs text-gray-100"
                                      >
                                        {email}
                                      </span>
                                    ))}
                                  </div>
                                ) : (
                                  <p className="mt-2 text-sm text-gray-300">
                                    No additional recipients entered.
                                  </p>
                                )}
                              </div>

                              <div>
                                <h3 className="text-sm font-semibold text-blue-300">Subject Line</h3>
                                <p className="mt-2 break-words rounded-md border border-gray-600 bg-gray-950 px-3 py-2 text-sm text-gray-100">
                                  {subject || "No subject entered."}
                                </p>
                              </div>
                            </div>

                            <div className="space-y-3 rounded-md bg-gray-800/60 p-4">
                              <iframe
                                title="Confirmation preview"
                                className="h-[60vh] w-full rounded-md bg-white"
                                srcDoc={content}
                              />
                            </div>
                          </div>

                          <p className="text-sm font-semibold leading-snug text-red-500">
                            THIS EMAIL WILL BE SENT TO THE ABOVE RECIPIENTS IMMEDIATELY UPON CONFIRMATION.
                          </p>

                          <DialogFooter className="sm:justify-start">
                            <Button
                              type="button"
                              onClick={() => {
                                void form.handleSubmit(onSubmit)();
                              }}
                              className="bg-red-600 text-white hover:bg-red-700"
                            >
                              SEND
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
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
