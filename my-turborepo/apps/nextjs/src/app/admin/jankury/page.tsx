"use client";

import { Button } from "@vanni/ui/button";
import Content from "./components/Content";
import EmailLists from "./components/EmailLists";
import { Form } from "@vanni/ui/form";
import Subject from "./components/Subject";
import { Suspense } from "react";
import { toast } from "~/hooks/use-toast";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export const runtime = "edge";

const FormSchema = z.object({
  email: z
    .string({
      required_error: "Please select an email to display.",
    })
    .email(),
});

export default function HomePage() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }
  return (
    <>
      <div className="absolute top-0 h-screen w-screen overflow-auto bg-black bg-opacity-70">
        <div className="font-XPfont flex justify-center">
          <div className="flex w-full justify-center lg:w-3/5 ">
            <Suspense fallback={<h1>Loading... please wait</h1>}>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  
          className="overflow-x-hidden rounded-lg bg-slate-50 p-5 lg:px-16"
                >
                  <EmailLists />
                    <Subject/>
                    <Content/>
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
