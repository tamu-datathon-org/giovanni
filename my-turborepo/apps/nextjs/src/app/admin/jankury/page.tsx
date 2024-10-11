"use client";

import { useMutation, useQuery } from "@tanstack/react-query";

import { Button } from "@vanni/ui/button";
import Confirmation from "./components/Confirmation";
import Content from "./components/Content";
import EmailLists from "./components/EmailLists";
import { Form } from "@vanni/ui/form";
import Preview from "./components/Preview";
import Subject from "./components/Subject";
import { Suspense } from "react";
import { toast } from "~/hooks/use-toast";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export const runtime = "edge";

const FormSchema = z.object({
  mailing_list: z.string(),
  subject: z.string(),
  content: z.string(),
  confirmation: z
    .boolean()
    .refine((value) => value, "Please test the email and check the box."),
});

export default function HomePage() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const {mutate} = useMutation({
    mutationFn: (data: z.infer<typeof FormSchema>) =>
      fetch("/api/email", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      }),
  });
  
  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <>
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">{JSON.stringify(data, null, 2)}</code>
          </pre>
          <h1>Please wait while the emails are sent.</h1>
        </>
      ),
    });



    mutate(data, {
      onSuccess: () => {
        toast({
          title: "Emails sent!",
          description: "The emails have been sent successfully.",
        });
      },
      onError: (error) => {
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
      <div className="absolute top-0 h-screen w-screen overflow-auto bg-black bg-opacity-70">
        <div className="font-XPfont flex justify-center">
          <div className="flex h-full w-full justify-center lg:w-3/5">
            <Suspense fallback={<h1>Loading... please wait</h1>}>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="overflow-x-hidden rounded-lg bg-slate-50 p-5 lg:px-16"
                >
                  <EmailLists />
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
