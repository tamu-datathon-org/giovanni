"use client";

import { useFormContext, useWatch } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "~/components/ui/dialog";


export default function Preview() {
  const form = useFormContext();
  const content = useWatch({ control: form.control, name: "content" }) ?? "";
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <button
            type="button"
            className="rounded-md border border-gray-500 bg-gray-700 px-3 py-1.5 text-sm text-white hover:border-gray-400 hover:bg-gray-600"
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
    </>
  );
}
