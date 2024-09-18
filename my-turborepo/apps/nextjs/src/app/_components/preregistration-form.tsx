"use client";

import React, { useState, useCallback } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { TRPCClientError } from "@trpc/client";
import Image from "next/image";
import { Button } from "node_modules/@vanni/ui/src/button";
import { AiOutlineClose } from "react-icons/ai";

import { api } from "~/trpc/react";
import { useToast } from "~/hooks/use-toast";
import { preregistrationSchema, PreregistrationData } from "../preregistration/validation";

const Lines = React.memo(() => (
  <div className="w-full pr-3">
    {[...Array(8)].map((_, i) => (
      <div key={i} className="horizontal-line"></div>
    ))}
  </div>
));

const ExitButton = React.memo(() => {
  const { toast } = useToast();

  const handleClick = useCallback(() => {
    toast({
      variant: "success",
      title: "The site is under construction. Check back soon!",
      description: "Thanks for showing interest in the Fall 2024 Datathon.",
    });
  }, [toast]);

  return (
    <Button className="compStyling" onClick={handleClick}>
      <AiOutlineClose className="close" />
    </Button>
  );
});

const TitleText = React.memo(() => (
  <h1 className="p-10 pb-5 text-5xl md:text-6xl">
    <span className="odd:text-teal-400">T</span>
    <span className="even:text-cyan-700">A</span>
    <span className="odd:text-teal-400 ">M</span>
    <span className="even:text-cyan-700">U</span> Datathon Preregistration
  </h1>
));

const EmailInput = React.memo(({ value, onChange, error }: { value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; error: string }) => (
  <label className="flex flex-col items-center">
    <div className="flex flex-row justify-center">
      <h1 className="pr-4">Enter Email: </h1>
      <div className="flex rounded-sm bg-black p-0.5">
        <input
          value={value}
          onChange={onChange}
          className="border-cyan-600 pl-1"
        />
      </div>
    </div>
    {error && <div className="pt-2 text-sm text-red-600">{error}</div>}
  </label>
));

const TermsCheckbox = React.memo(({ checked, onChange, error }: { checked: boolean; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; error: string }) => (
  <label className="flex flex-col items-center">
    <div className="flex items-center">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="m-1"
      />
      <span>I agree to the terms and conditions.</span>
    </div>
    {error && <div className="text-sm text-red-600">{error}</div>}
  </label>
));

export const CreatePreregistrationForm = () => {
  const { toast } = useToast();
  const routes = useRouter();
  const [email, setEmail] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [errors, setErrors] = useState({ email: "", terms: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const createPreregistration = api.preregistration.create.useMutation();

  const handleEmailChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setErrors(prev => ({ ...prev, email: "" }));
  }, []);

  const handleTermsChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setTermsAccepted(e.target.checked);
    setErrors(prev => ({ ...prev, terms: "" }));
  }, []);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const result = preregistrationSchema.safeParse({ email, confirmation: termsAccepted });

    if (!result.success) {
      setErrors({
        email: result.error.formErrors.fieldErrors.email?.[0] || "",
        terms: result.error.formErrors.fieldErrors.confirmation?.[0] || "",
      });
      setIsSubmitting(false);
      return;
    }

    try {
      await createPreregistration.mutateAsync({ email });
      toast({
        variant: "success",
        title: "You're on the list!",
        description: "Thanks for showing interest in the Fall 2024 Datathon.",
      });
      setTimeout(() => routes.push("/countdown"), 500);
    } catch (error) {
      if (error instanceof TRPCClientError) {
        toast({
          variant: "destructive",
          title: error.data.code === "INTERNAL_SERVER_ERROR" ? "Submission Error" : error.data.code,
          description: error.data.code === "INTERNAL_SERVER_ERROR" ? "Email already exists" : error.message,
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  }, [email, termsAccepted, createPreregistration, toast, routes]);

  return (
    <div className="font-XPfont font-bold">
      <div className="flex h-screen flex-col items-center justify-center">
        <form onSubmit={handleSubmit} className="xpBorder m-5 flex w-11/12 flex-col items-center text-center text-lg lg:w-2/5">
          <div className="flex w-full flex-row items-center justify-center">
            <Lines />
            <ExitButton />
          </div>
          <div className="relative mt-3 flex w-full flex-col items-center overflow-hidden border-0 border-[#585958] bg-[#e4e3e4] lg:border-[1px]">
            <TitleText />
            <EmailInput value={email} onChange={handleEmailChange} error={errors.email} />
            <TermsCheckbox checked={termsAccepted} onChange={handleTermsChange} error={errors.terms} />
            <Button
              className="xpBorder submitBtn my-4 w-fit bg-cyan-700 text-xl font-extrabold"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <Image
                  src="loading.svg"
                  className="animate-spin"
                  width={24}
                  height={24}
                  aria-hidden="true"
                  alt="loading..."
                />
              ) : (
                "Submit"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};