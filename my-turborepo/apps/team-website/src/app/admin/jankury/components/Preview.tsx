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
            className="rounded-md border-2 border-black bg-black p-2 text-white hover:border-gray-700 hover:bg-gray-800"
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
