"use client";

import { useFormContext } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "~/components/ui/dialog";


export default function Preview() {
  const form = useFormContext();

  const content = form.getValues("content");
  return (
    <>
      <Dialog>
        <DialogTrigger className="rounded-md border-2 border-black bg-black p-2 text-white hover:border-gray-700 hover:bg-gray-800">
          Open Email Preview
        </DialogTrigger>
        <DialogContent className="max-h-[80vh] max-w-[90vw] overflow-auto bg-black">
          <iframe className="h-[800px] w-full" srcDoc={content}></iframe>
        </DialogContent>
      </Dialog>
    </>
  );
}
