"use client";

import { useEffect, useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";
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
import { Button } from "@vanni/ui/button";
import { Textarea } from "@vanni/ui/textarea";

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


  //IF YOU WANT TO ADD EMAIL TEMPLATES, DO SO HERE ////////////////////////////////////////////////////////////////////////////

const registrationConfirmationTemplate = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><html dir="ltr" lang="en"><head><link rel="preload" as="image" href="/assets/images/logo.png"/><link rel="preload" as="image" href="/assets/images/bear.png"/><meta content="text/html; charset=UTF-8" http-equiv="Content-Type"/><meta name="x-apple-disable-message-reformatting"/></head><body style="background-color:rgb(244,249,255);font-family:ui-sans-serif, system-ui, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;, &quot;Noto Color Emoji&quot;"><!--$--><!--html--><!--head--><!--body--><table border="0" width="100%" cellPadding="0" cellSpacing="0" role="presentation" align="center"><tbody><tr><td style="background-color:rgb(244,249,255);font-family:ui-sans-serif, system-ui, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;, &quot;Noto Color Emoji&quot;"><table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="max-width:36rem;margin-left:auto;margin-right:auto;padding-top:1rem;padding-bottom:1rem"><tbody><tr style="width:100%"><td><table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="background-color:rgb(255,255,255);border-radius:1.5rem;box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), 0 0 #0000;padding-left:2rem;padding-right:2rem;padding-top:2rem;padding-bottom:2rem;border-width:1px;border-color:rgb(183,216,245)"><tbody><tr><td><div style="position:relative;display:flex;align-items:center;justify-content:center;width:100%"><img alt="TAMU Datathon 2026 Logo" src="/assets/images/logo.png" style="position:absolute;left:0px;height:6rem;display:block;outline:none;border:none;text-decoration:none"/><h1 style="font-size:1.875rem;line-height:2.25rem;font-weight:800;color:rgb(127,180,221);letter-spacing:0.025em">TAMU DATATHON</h1></div><h1 style="font-size:1.5rem;line-height:2rem;font-weight:600;color:rgb(127,180,221);text-align:center;margin-top:0.5rem;margin-bottom:1.5rem">You&#x27;re Registered!</h1><p style="font-size:0.875rem;line-height:1.625;color:rgb(79,107,130);margin-bottom:1rem;margin-top:16px">Thanks for applying to the TAMU Datathon-Lite Spring 2026! We&#x27;ll be carefully reviewing your application and will get back to you soon.<br/><br/>Until then, please reach out to<!-- --> <a href="mailto:connect@tamudatathon.com">connect@tamudatathon.com</a> <!-- -->if you have any other questions!</p><table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="margin-bottom:1rem"><tbody><tr><td><div style="height:1px;background-color:rgb(127,180,221)"></div></td></tr></tbody></table><table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation"><tbody><tr><td><div style="display:flex;align-items:flex-end;justify-content:space-between;gap:0.25rem;padding-left:2.5rem"><div><p style="font-size:1.25rem;line-height:1.75rem;font-weight:800;color:rgb(170,205,232);margin-top:16px;margin-bottom:16px">Thanks and Gig&#x27;em,</p><p style="font-size:1.25rem;line-height:1.75rem;font-weight:800;color:rgb(127,180,221);margin-top:16px;margin-bottom:16px">TAMU Datathon</p></div><img alt="TAMU Datathon Detective Bear" src="/assets/images/bear.png" style="height:7rem;width:auto;display:block;outline:none;border:none;text-decoration:none"/></div></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table><!--/$--></body></html>`;

const acceptedTemplate = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><html dir="ltr" lang="en"><head><link rel="preload" as="image" href="/assets/images/logo.png"/><link rel="preload" as="image" href="/assets/images/bear.png"/><meta content="text/html; charset=UTF-8" http-equiv="Content-Type"/><meta name="x-apple-disable-message-reformatting"/></head><body style="background-color:rgb(244,249,255);font-family:ui-sans-serif, system-ui, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;, &quot;Noto Color Emoji&quot;"><!--$--><!--html--><!--head--><!--body--><table border="0" width="100%" cellPadding="0" cellSpacing="0" role="presentation" align="center"><tbody><tr><td style="background-color:rgb(244,249,255);font-family:ui-sans-serif, system-ui, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;, &quot;Noto Color Emoji&quot;"><table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="max-width:36rem;margin-left:auto;margin-right:auto;padding-top:1rem;padding-bottom:1rem"><tbody><tr style="width:100%"><td><table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="background-color:rgb(255,255,255);border-radius:1.5rem;box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), 0 0 #0000;padding-left:2rem;padding-right:2rem;padding-top:2rem;padding-bottom:2rem;border-width:1px;border-color:rgb(183,216,245)"><tbody><tr><td><div style="position:relative;display:flex;align-items:center;justify-content:center;width:100%"><img alt="TAMU Datathon 2026 Logo" src="/assets/images/logo.png" style="position:absolute;left:0px;height:6rem;display:block;outline:none;border:none;text-decoration:none"/><h1 style="font-size:1.875rem;line-height:2.25rem;font-weight:800;color:rgb(127,180,221);letter-spacing:0.025em">TAMU DATATHON</h1></div><h1 style="font-size:1.5rem;line-height:2rem;font-weight:600;color:rgb(127,180,221);text-align:center;margin-top:0.5rem;margin-bottom:1.5rem">Howdy!</h1><p style="font-size:0.875rem;line-height:1.625;color:rgb(79,107,130);margin-bottom:1rem;margin-top:16px"><span style="font-weight:700">Congratulations!</span> We’re excited to inform you that you’ve been <span style="font-weight:700">ACCEPTED</span> to the TAMU Datathon-Lite Spring 2026! Your application truly impressed us, and we can&#x27;t wait to see you at the<!-- --> <span style="font-weight:700">Peterson Building</span> on<!-- --> <span style="font-weight:700">April 11th 2026</span>.</p><table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="background-color:rgb(216,236,255);border-radius:1rem;padding-left:1rem;padding-right:1rem;padding-top:0.75rem;padding-bottom:0.75rem;margin-bottom:1rem;border-width:1px;border-color:rgb(183,216,245)"><tbody><tr><td><p style="font-size:1.125rem;line-height:1.75rem;font-weight:700;color:rgb(79,107,130);margin-bottom:0.25rem;margin-top:16px">You aren&#x27;t done YET!</p><p style="font-size:0.875rem;line-height:1.625;color:rgb(79,107,130);margin-top:16px;margin-bottom:16px">Due to capacity constraints we need you to<!-- --> <span style="font-weight:700">confirm</span> your spot by accepting the invitation at<!-- --> <a href="https://tamudatathon.com/apply" style="color:rgb(127,180,221);text-decoration-line:underline">https://tamudatathon.com/apply</a>. Spots are <span style="font-weight:700">limited!</span> If you fail to confirm your spot before the event date or before we reach capacity, you will be put on the<!-- --> <span style="font-weight:700">WAITLIST</span>.</p></td></tr></tbody></table><h1 style="font-size:1rem;line-height:1.5rem;font-weight:600;color:rgb(79,107,130);margin-bottom:0.25rem">What&#x27;s Next?</h1><p style="font-size:0.875rem;line-height:1.625;color:rgb(79,107,130);margin-bottom:1rem;margin-top:16px">We will provide a QR code, which will appear in your applicant dashboard and be used for check-in, as well as lunch. Be sure to keep an eye on our<!-- --> <a href="https://discord.gg/FzdbaaGw" style="color:rgb(127,180,221);text-decoration-line:underline">Discord</a> <!-- -->and<!-- --> <a href="https://www.instagram.com/tamudatathon/" style="color:rgb(127,180,221);text-decoration-line:underline">Instagram</a> <!-- -->for updates.</p><p style="font-size:0.875rem;line-height:1.625;color:rgb(79,107,130);margin-bottom:1.5rem;margin-top:16px">If you have any questions, please refer to our<!-- --> <a href="https://tamudatathon.com/#faq" style="font-weight:700">FAQ</a> <!-- -->or contact us at<!-- --> <a href="mailto:connect@tamudatathon.com">connect@tamudatathon.com</a>.</p><table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation"><tbody><tr><td><div style="position:relative;display:flex;align-items:center"><div style="flex:1 1 0%;display:flex;justify-content:center"><a href="https://tamudatathon.com" style="background-color:rgb(127,180,221);color:rgb(255,255,255);font-weight:600;border-radius:9999px;padding-left:32px;padding-right:32px;padding-top:12px;padding-bottom:12px;line-height:100%;text-decoration:none;display:inline-block;max-width:100%;mso-padding-alt:0px" target="_blank"><span><!--[if mso]><i style="mso-font-width:400%;mso-text-raise:18" hidden>&#8202;&#8202;&#8202;&#8202;</i><![endif]--></span><span style="max-width:100%;display:inline-block;line-height:120%;mso-padding-alt:0px;mso-text-raise:9px">TD Website</span><span><!--[if mso]><i style="mso-font-width:400%" hidden>&#8202;&#8202;&#8202;&#8202;&#8203;</i><![endif]--></span></a></div><img alt="TAMU Datathon 2026 Bear" src="/assets/images/bear.png" style="position:absolute;right:0px;height:6rem;width:auto;display:block;outline:none;border:none;text-decoration:none"/></div></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table><!--/$--></body></html>`;

const rejectedTemplate = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><html dir="ltr" lang="en"><head><link rel="preload" as="image" href="/assets/images/logo.png"/><link rel="preload" as="image" href="/assets/images/bear.png"/><meta content="text/html; charset=UTF-8" http-equiv="Content-Type"/><meta name="x-apple-disable-message-reformatting"/></head><body style="background-color:rgb(244,249,255);font-family:ui-sans-serif, system-ui, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;, &quot;Noto Color Emoji&quot;"><!--$--><!--html--><!--head--><!--body--><table border="0" width="100%" cellPadding="0" cellSpacing="0" role="presentation" align="center"><tbody><tr><td style="background-color:rgb(244,249,255);font-family:ui-sans-serif, system-ui, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;, &quot;Noto Color Emoji&quot;"><table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="max-width:36rem;margin-left:auto;margin-right:auto;padding-top:1rem;padding-bottom:1rem"><tbody><tr style="width:100%"><td><table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="background-color:rgb(255,255,255);border-radius:1.5rem;box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), 0 0 #0000;padding-left:2rem;padding-right:2rem;padding-top:2rem;padding-bottom:2rem;border-width:1px;border-color:rgb(183,216,245)"><tbody><tr><td><div style="position:relative;display:flex;align-items:center;justify-content:center;width:100%"><img alt="TAMU Datathon 2026 Logo" src="/assets/images/logo.png" style="position:absolute;left:0px;height:6rem;display:block;outline:none;border:none;text-decoration:none"/><h1 style="font-size:1.875rem;line-height:2.25rem;font-weight:800;color:rgb(127,180,221);letter-spacing:0.025em">TAMU DATATHON</h1></div><h1 style="font-size:1.5rem;line-height:2rem;font-weight:600;color:rgb(127,180,221);text-align:center;margin-top:0.5rem;margin-bottom:1.5rem">Howdy!</h1><p style="font-size:0.875rem;line-height:1.625;color:rgb(79,107,130);margin-bottom:1rem;margin-top:16px">Thank you for your application to the TAMU Datathon-Lite Spring 2026 and the effort you put into it. While we were impressed by your submission, we <b>regret</b> to inform you that we are unable to offer an acceptance for this round.</p><table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="margin-bottom:1rem"><tbody><tr><td><div style="height:1px;background-color:rgb(127,180,221)"></div></td></tr></tbody></table><table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation"><tbody><tr><td><div style="display:flex;align-items:flex-end;justify-content:space-between;gap:0.25rem;padding-left:2.5rem"><div><p style="font-size:1.25rem;line-height:1.75rem;font-weight:800;color:rgb(170,205,232);margin-top:16px;margin-bottom:16px">Thanks and Gig&#x27;em,</p><p style="font-size:1.25rem;line-height:1.75rem;font-weight:800;color:rgb(127,180,221);margin-top:16px;margin-bottom:16px">TAMU Datathon</p></div><img alt="TAMU Datathon Detective Bear" src="/assets/images/bear.png" style="height:7rem;width:auto;display:block;outline:none;border:none;text-decoration:none"/></div></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table><!--/$--></body></html>`;

const templates = [
    {
        name: "Registration Confirmation",
        html: registrationConfirmationTemplate,
    },
    {
        name: "Accepted Decision",
        html: acceptedTemplate,
    },
    {
        name: "Rejected Decision",
        html: rejectedTemplate,
    },
];


////////////////////////////////////////////////////////////////////////////////////////////////////

export default function Content() {
  const form = useFormContext();
  const content = useWatch({ control: form.control, name: "content" }) ?? "";
  const [isTemplateDialogOpen, setIsTemplateDialogOpen] = useState(false);

    useEffect(() => {
        if (!form.getValues("content")) {
            form.setValue("content", example, { shouldDirty: false });
        }
    }, [form]);

    function selectTemplate(templateHtml: string) {
        form.setValue("content", templateHtml, {
            shouldDirty: true,
            shouldTouch: true,
            shouldValidate: true,
        });
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
                                        Select Template
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="w-[92vw] max-w-2xl max-h-[80vh] overflow-auto bg-gray-800 text-white">
                                    <DialogHeader>
                                        <DialogTitle>Select Template</DialogTitle>
                                    </DialogHeader>
                                    <div className="grid gap-3 pt-2">
                                        {templates.map((template) => {
                                            const isSelected = content === template.html;
                                            return (
                                                <button
                                                    key={template.name}
                                                    type="button"
                                                    onClick={() => selectTemplate(template.html)}
                                                    className={`flex items-center justify-between rounded-md border px-4 py-3 text-left text-sm text-white transition ${
                                                        isSelected
                                                            ? "border-blue-500 bg-blue-950/40"
                                                            : "border-gray-500 bg-gray-900 hover:border-gray-300 hover:bg-gray-700"
                                                    }`}
                                                >
                                                    <span>{template.name}</span>
                                                    {isSelected && (
                                                        <span className="ml-2 rounded-full bg-blue-500 px-2 py-0.5 text-[10px] font-semibold text-white">
                                                            Selected
                                                        </span>
                                                    )}
                                                </button>
                                            );
                                        })}
                                    </div>
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
