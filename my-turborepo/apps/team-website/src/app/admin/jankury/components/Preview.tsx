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
            Open Email Preview
          </button>
        </DialogTrigger>
        <DialogContent className="max-w-[90vw] overflow-hidden bg-black p-0">
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
