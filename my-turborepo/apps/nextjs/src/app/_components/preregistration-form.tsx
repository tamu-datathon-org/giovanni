"use client";

import React, { useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { TRPCClientError } from "@trpc/client";
import { Button } from "node_modules/@vanni/ui/src/button";
import { AiOutlineClose } from "react-icons/ai";
import { useToast } from "~/hooks/use-toast";
import { api } from "~/trpc/react";
import type { PreregistrationData } from "../preregistration/validation";
import { preregistrationSchema } from "../preregistration/validation";

import "./customCss.scss";

function Lines() {
  return (
    <div className="w-full pr-3">
      {[...Array(8)].map((_, i) => (
        <div key={i} className="horizontal-line"></div>
      ))}
    </div>
  );
}

function ExitButton() {
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

function NativeEmailBox({ register, errors }) {
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      const { ref, ...rest } = register("email", { required: true, maxLength: 256 });
      Object.assign(inputRef.current, rest);
      ref(inputRef.current);
    }
  }, [register]);

  return (
    <>
      <label className="flex flex-row justify-center ">
        <h1 className="pr-4">Enter Email: </h1>
        <div className="flex rounded-sm bg-black p-0.5">
          <input ref={inputRef} className="border-cyan-600 pl-1" />
        </div>
      </label>
      {errors.email?.message && (
        <div className="pt-2 text-sm text-red-600">Invalid Email</div>
      )}
    </>
  );
}

function TermsAndConditions({ register, errors }) {
  return (
    <>
      <label className="text-black">
        <input
          className="m-1"
          type="checkbox"
          {...register("confirmation", { required: true })}
        />
        <span>I agree to the terms and conditions.</span>
      </label>
      {errors.confirmation?.message && (
        <div className="text-sm text-red-600">Missing Field</div>
      )}
    </>
  );
}

export const CreatePreregistrationForm = () => {
  const { toast } = useToast();
  const routes = useRouter();

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<PreregistrationData>({
    resolver: zodResolver(preregistrationSchema),
  });

  const createPreregistration = api.preregistration.create.useMutation();

  const onSubmit = async (data: PreregistrationData) => {
    try {
      await createPreregistration.mutateAsync({
        email: data.email,
      });
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
  };

  return (
    <div className="font-XPfont font-bold">
      <div className="flex h-screen flex-col items-center justify-center ">
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
            <NativeEmailBox register={register} errors={errors} />
            <TermsAndConditions register={register} errors={errors} />
            <Button
              className="xpBorder submitBtn my-4 w-fit bg-cyan-700 text-xl font-extrabold"
              type="submit"
              disabled={!isDirty || isSubmitting}
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

export default CreatePreregistrationForm;