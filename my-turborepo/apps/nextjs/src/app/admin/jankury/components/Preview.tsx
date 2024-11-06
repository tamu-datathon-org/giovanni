"use client";

import { useFormContext } from "react-hook-form";

export default function Preview() {
  const form = useFormContext();

  const content = form.getValues("content");
  return (
    <>
      <h1>Preview</h1>
      <iframe className="h-auto w-full" srcDoc={content}></iframe>
    </>
  );
}
