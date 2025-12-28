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
      <div className="flex flex-row items-center space-x-2 p-4">
        <h1>Preview</h1>
        <Dialog>
          <DialogTrigger className="border-2 border-black p-2 rounded-md bg-black text-white">
            Open
          </DialogTrigger>
          <DialogContent className="max-w-[90vw] max-h-[80vh] overflow-auto bg-black">
            <iframe className="h-[800px] w-full" srcDoc={content}></iframe>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}
