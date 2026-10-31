"use client";

import { useEffect, useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import {
    Dialog,
    DialogContent,
    DialogDescription,
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
import { Button } from "@vanni/ui/button";
import { Textarea } from "@vanni/ui/textarea";

import TemplateBrowser from "./TemplateBrowser";

const example = `<!DOCTYPE html>
  <html>
  <head>
      <meta charset="utf-8">
      <title>PLEASE</title>
  </head>
  <body style="background-color: #ffffff; margin: 0; padding: 20px; font-family: Arial, sans-serif;">
      <div style="max-width: 600px; margin: 0 auto;">
          <p style="font-size: 48px; color: #ff0000; text-align: center; margin: 20px 0;">PLEASE PLEASE PLEASE</p>
          
          <p style="font-size: 36px; color: #000000; font-weight: bold; text-align: left; margin: 15px 0;">PLEASE PLEASE PLEASE PLEASE PLEASE</p>
          
          <p style="font-size: 24px; color: #ff0000; font-style: italic; text-decoration: underline; text-align: right; margin: 15px 0;">PLEASE! PLEASE! PLEASE!</p>
          
          <div style="text-align: center; margin: 20px 0;">
              <span style="font-size: 72px; color: #990000; letter-spacing: 5px;">P L E A S E</span>
          </div>
          
          <div style="background-color: #ffe6e6; padding: 20px; margin: 15px 0;">
              <p style="font-size: 18px; color: #666666; text-align: center; margin: 0; font-family: 'Courier New', monospace;">
                  PLEASE PLEASE PLEASE PLEASE PLEASE PLEASE PLEASE PLEASE PLEASE PLEASE
              </p>
          </div>
          
          <div style="text-align: center; margin: 20px 0;">
              <span style="font-size: 40px; color: #cc0000; text-transform: uppercase; font-weight: bold;">
                  PLEASE PLEASE PLEASE
              </span>
          </div>
          
          <div style="border: 3px solid #ff0000; padding: 15px; margin: 20px 0;">
              <p style="font-size: 28px; color: #cc0000; text-align: center; margin: 0;">
                  PLEASE PLEASE PLEASE PLEASE PLEASE
              </p>
          </div>
          
          <div style="display: flex; justify-content: space-between; margin: 20px 0;">
              <span style="font-size: 24px; color: #ff3333;">PLEASE!</span>
              <span style="font-size: 24px; color: #ff3333;">PLEASE!</span>
              <span style="font-size: 24px; color: #ff3333;">PLEASE!</span>
          </div>
          
          <p style="font-size: 16px; color: #333333; text-align: justify; margin: 15px 0; line-height: 1.8;">
              PLEASE PLEASE PLEASE PLEASE PLEASE PLEASE PLEASE PLEASE PLEASE PLEASE PLEASE PLEASE PLEASE PLEASE PLEASE
          </p>
          
          <div style="background-color: #ffecec; padding: 15px; margin: 20px 0; border-radius: 5px;">
              <p style="font-size: 32px; color: #cc0000; text-align: center; margin: 0; font-weight: bold;">
                  PLEASE PLEASE PLEASE
              </p>
          </div>
          
          <div style="margin: 25px 0; text-align: center;">
              <span style="font-size: 60px; color: #ff0000; letter-spacing: 3px; font-weight: bold;">PLEASE</span>
          </div>
          
          <div style="display: flex; flex-wrap: wrap; justify-content: center; gap: 10px; margin: 20px 0;">
              <span style="font-size: 20px; color: #990000;">PLEASE</span>
              <span style="font-size: 24px; color: #cc0000;">PLEASE</span>
              <span style="font-size: 28px; color: #ff0000;">PLEASE</span>
              <span style="font-size: 24px; color: #cc0000;">PLEASE</span>
              <span style="font-size: 20px; color: #990000;">PLEASE</span>
          </div>
          
          <div style="background: linear-gradient(to right, #ffecec, #ffe6e6); padding: 20px; margin: 20px 0;">
              <p style="font-size: 22px; color: #990000; text-align: center; margin: 0; font-style: italic;">
                  PLEASE PLEASE PLEASE PLEASE PLEASE
              </p>
          </div>
          
          <div style="border-left: 5px solid #ff0000; padding-left: 15px; margin: 20px 0;">
              <p style="font-size: 26px; color: #333333; margin: 0;">
                  PLEASE PLEASE PLEASE PLEASE PLEASE PLEASE PLEASE
              </p>
          </div>
          
          <div style="text-align: center; margin: 30px 0;">
              <span style="font-size: 54px; color: #ff3333; text-shadow: 2px 2px #ffcccc;">PLEASE</span>
          </div>
          
          <div style="background-color: #990000; padding: 20px; margin: 20px 0;">
              <p style="font-size: 36px; color: #ffffff; text-align: center; margin: 0; font-weight: bold;">
                  PLEASE PLEASE PLEASE
              </p>
          </div>
          
          <p style="font-size: 20px; color: #990000; font-weight: bold; text-align: center; margin: 20px 0; font-style: italic;">
              PLEASE PLEASE PLEASE PLEASE PLEASE
          </p>
      </div>
  </body>
  </html>`;



export default function Content() {
  const form = useFormContext();
  const content = useWatch({ control: form.control, name: "content" }) ?? "";
  const [isTemplateDialogOpen, setIsTemplateDialogOpen] = useState(false);

    useEffect(() => {
        if (!form.getValues("content")) {
            form.setValue("content", example, { shouldDirty: false });
        }
    }, [form]);

    function selectTemplate(template: { subject: string; html: string }) {
        // No shouldValidate: @hookform/resolvers 3.x can't read zod 4 errors and
        // rethrows them, so validating the whole form here (with the "tested"
        // box still unchecked) surfaced as an unhandled ZodError.
        const options = { shouldDirty: true, shouldTouch: true };
        form.setValue("content", template.html, options);
        form.setValue("subject", template.subject, options);
        form.clearErrors(["content", "subject"]);
        setIsTemplateDialogOpen(false);
    }

  return (
    <FormField
      control={form.control}
      name="content"
            render={({ field }) => {
                const { value, ...fieldProps } = field;

                return (
                    <FormItem>
                        <FormLabel className="text-base font-semibold text-white">
                            Write Custom Email (HTML Body)
                        </FormLabel>
                        <FormControl>
                            <Textarea
                                className="min-h-[240px] resize-none"
                                value={value ?? ""}
                                {...fieldProps}
                            />
                        </FormControl>
                        <FormMessage />
                        <div className="flex gap-2 pt-1">
                            <Dialog
                                open={isTemplateDialogOpen}
                                onOpenChange={setIsTemplateDialogOpen}
                            >
                                <DialogTrigger asChild>
                                    <Button
                                        type="button"
                                        className="flex-1 rounded-md border border-gray-500 bg-gray-700 px-3 py-1.5 text-sm text-white hover:border-gray-400 hover:bg-gray-600"
                                    >
                                        Browse Templates
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="max-h-[92vh] w-[95vw] max-w-6xl overflow-auto bg-gray-800 text-white">
                                    <DialogHeader>
                                        <DialogTitle>Email templates</DialogTitle>
                                        <DialogDescription className="text-gray-400">
                                            Files in packages/api/src/emails/templates. Pick one to preview it, then load it into the composer.
                                        </DialogDescription>
                                    </DialogHeader>
                                    {isTemplateDialogOpen && (
                                        <TemplateBrowser onUse={selectTemplate} />
                                    )}
                                </DialogContent>
                            </Dialog>
                            <Dialog>
                                <DialogTrigger asChild>
                                    <button
                                        type="button"
                                        className="flex-1 rounded-md border border-gray-500 bg-gray-700 px-3 py-1.5 text-sm text-white hover:border-gray-400 hover:bg-gray-600"
                                    >
                                        Preview Email
                                    </button>
                                </DialogTrigger>
                                <DialogContent className="max-w-[90vw] overflow-hidden bg-black p-0 [&>button]:z-50 [&>button]:rounded-full [&>button]:bg-black/80 [&>button]:p-1 [&>button]:text-white [&>button]:ring-1 [&>button]:ring-white/40">
                                    <iframe
                                        title="Email preview"
                                        className="h-[80vh] w-[90vw] bg-white"
                                        srcDoc={content}
                                    />
                                </DialogContent>
                            </Dialog>
                        </div>
                    </FormItem>
            );
            }}
    />
  );
}
