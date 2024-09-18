"use client";

import type { MouseEventHandler } from "react";
import type { SubmitHandler } from "react-hook-form";
import { useCallback, useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import type { PreregistrationData } from "../preregistration/validation";
import { api } from "~/trpc/react";
import { preregistrationSchema } from "../preregistration/validation";

import "./customCss.scss";

import { setTimeout } from "timers";
import { routeModule } from "next/dist/build/templates/app-page";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { TRPCClientError } from "@trpc/client";
import { Button } from "node_modules/@vanni/ui/src/button";
import { AiOutlineClose } from "react-icons/ai";

import { useToast } from "~/hooks/use-toast";
import React from "react";
import { register } from "module";

// import IconList from "./IconList";

function Lines() {
  return (
    <div className="w-full pr-3">
      {" "}
      {/**Random Lines */}
      <div className="horizontal-line"></div>
      <div className="horizontal-line"></div>
      <div className="horizontal-line"></div>
      <div className="horizontal-line"></div>
      <div className="horizontal-line"></div>
      <div className="horizontal-line"></div>
      <div className="horizontal-line"></div>
      <div className="horizontal-line"></div>
    </div>
  );
}

function ExitButton() {
  // Toast to say the site is under construction
  const { toast } = useToast();

  const handleClick = () => {
    toast({
      variant: "success",
      title: "The site is under construction. Check back soon!",
      description: "Thanks for showing interest in the Fall 2024 Datathon.",
    });
  };

  return (
    <Button className="compStyling" onClick={handleClick}>
      <AiOutlineClose className="close" />
    </Button>
  );
}

function TitleText() {
  return (
    <h1 className="p-10 pb-5 text-5xl md:text-6xl">
      <span className="odd:text-teal-400">T</span>
      <span className="even:text-cyan-700">A</span>
      <span className="odd:text-teal-400 ">M</span>
      <span className="even:text-cyan-700">U</span> Datathon Preregistration
    </h1>
  );
}

const EmailBox = React.memo(({ value, onChange, error }: { value: string; onChange: (value: string) => void; error?: string }) => {
  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onChange(localValue);
    }, 10); // Small delay to batch updates
    return () => clearTimeout(timeoutId);
  }, [localValue, onChange]);

  return (
    <>
      <label className="flex flex-row justify-center">
        <h1 className="pr-4">Enter Email: </h1>
        <div className="flex rounded-sm bg-black p-0.5">
          <input
            type="email"
            value={localValue}
            onChange={(e) => setLocalValue(e.target.value)}
            className="border-cyan-600 pl-1"
            inputMode="email"
          />
        </div>
      </label>
      {error && <div className="pt-2 text-sm text-red-600">{error}</div>}
    </>
  );
});

const TermsAndConditions = React.memo(({ value, onChange, error }: { value: boolean; onChange: (value: boolean) => void; error?: string }) => {
  return (
    <>
      <label className="text-black">
        <input
          type="checkbox"
          checked={value}
          onChange={(e) => onChange(e.target.checked)}
          className="m-1"
        />
        <span>I agree to the terms and conditions.</span>
      </label>
      {error && <div className="text-sm text-red-600">{error}</div>}
    </>
  );
});

export const CreatePreregistrationForm = () => {
  const { toast } = useToast();
  const routes = useRouter();
  const [email, setEmail] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);

  const {
    handleSubmit,
    formState: { errors, isSubmitting, isDirty },
    trigger,
    setError,
    clearErrors,
  } = useForm<PreregistrationData>({
    resolver: zodResolver(preregistrationSchema),
    mode: "onChange",
  });

  const createPreregistration = api.preregistration.create.useMutation();

  const validateEmail = useCallback(async (email: string) => {
    const result = await trigger("email");
    if (!result) {
      setError("email", { type: "manual", message: "Invalid email" });
    } else {
      clearErrors("email");
    }
  }, [trigger, setError, clearErrors]);

  useEffect(() => {
    validateEmail(email);
  }, [email, validateEmail]);


  const onSubmit = useCallback(async (data: PreregistrationData) => {
    try {
      await createPreregistration.mutateAsync({ email: data.email });
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
    }
  }, [createPreregistration, toast, routes]);


  return (
    <div className="font-XPfont font-bold">
      <div className="flex h-screen flex-col items-center justify-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="xpBorder m-5 flex w-11/12 flex-col items-center text-center text-lg lg:w-2/5"
        >
          <div className="flex w-full flex-row items-center justify-center">
            <Lines />
            <ExitButton />
          </div>
          <div className="relative mt-3 flex w-full flex-col items-center overflow-hidden border-0 border-[#585958] bg-[#e4e3e4] lg:border-[1px]">
            <TitleText />
            <EmailBox
              value={email}
              onChange={setEmail}
              error={errors.email?.message}
            />
            <TermsAndConditions
              value={termsAccepted}
              onChange={setTermsAccepted}
              error={errors.confirmation?.message}
            />
            <Button
              className="xpBorder submitBtn my-4 w-fit bg-cyan-700 text-xl font-extrabold"
              type="submit"
              disabled={!isDirty || isSubmitting || !email || !termsAccepted}
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
            <Image
              src="/Pixel_PolarBear.png"
              className="absolute -bottom-5 -right-5 size-32 md:size-56 lg:size-28 xl:size-44"
              width={100}
              height={100}
              alt="polar bear"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export const DeletePreregistrationForm = () => {
  interface FormData {
    email: string;
  }

  const [formData, setFormData] = useState<FormData>({
    email: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const deletePreregistration = api.preregistration.delete.useMutation();
  const handleDelete: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
    deletePreregistration.mutate(formData.email);
  };

  const cancelPreregistration = api.preregistration.cancel.useMutation();
  const handleCancel: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
    cancelPreregistration.mutate(formData);
  };

  return (
    <>
      <form className="bg-grey-700 flex w-1/2 flex-col items-center justify-center rounded text-center text-lg">
        <label>
          <span>Enter Email:</span>
          <input type="text" name="email" onChange={handleChange} />
        </label>
        <button onClick={handleDelete}>Delete User</button>
        <button onClick={handleCancel}>Cancel User</button>
      </form>
    </>
  );
};
