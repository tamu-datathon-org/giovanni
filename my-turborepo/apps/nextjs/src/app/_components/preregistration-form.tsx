"use client";

import type { FieldErrors, SubmitHandler, UseFormRegister} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import type { PreregistrationData } from "../preregistration/validation";
import { api } from "~/trpc/react";
import { preregistrationSchema } from "../preregistration/validation";

import "./customCss.scss";

import Image from "next/image";
import { TRPCClientError } from "@trpc/client";
import { Button } from "node_modules/@vanni/ui/src/button";
import { AiOutlineClose } from "react-icons/ai";

import { useToast } from "~/hooks/use-toast";

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
  // This button is only there for visual purposes
  return (
    <Button className="compStyling">
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

function EmailBox(props: { register: UseFormRegister<PreregistrationData>; errors: FieldErrors<PreregistrationData> }) {
  return (
    <>
      <label className="flex flex-row justify-center ">
        <h1 className="pr-4">Enter Email: </h1>
        <div className="flex rounded-sm bg-black p-0.5">
          <input {...props.register("email")} className=" border-cyan-600 px-1" />
        </div>
      </label>
      {props.errors.email?.message != undefined && (
        <div className="text-sm text-red-600">Invalid Email</div>
      )}
    </>
  );
}

function TermsAndConditions(props: { register: UseFormRegister<PreregistrationData>; errors: FieldErrors<PreregistrationData> }) {
  return (
    <>
      <label className="text-blac">
        <input
          className="m-1"
          type="checkbox"
          value={"on"}
          {...props.register("confirmation", { required: true })}
        />
        <span>I agree to the terms and conditions.</span>
      </label>
      {props.errors.confirmation?.message != undefined && (
        <div className="text-sm text-red-600">Missing Field</div>
      )}
    </>
  );
}

export const CreatePreregistrationForm = () => {
  const { toast } = useToast();

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<PreregistrationData>({
    resolver: zodResolver(preregistrationSchema),
  });

  const createPreregistration = api.preregistration.create.useMutation();

  const onSubmit: SubmitHandler<PreregistrationData> = async (data) => {
    try {
      await createPreregistration.mutateAsync({
        email: data.email,
      });
      toast({
        variant: "success",
        title: "You're on the list!",
        description: "Thanks for showing interest in the Fall 2024 Datathon.",
      });
    } catch (error) {
      if (error instanceof TRPCClientError) {
        const code = (error.data as { code: string }).code
        if (code === "INTERNAL_SERVER_ERROR") {
          toast({
            variant: "destructive",
            title: "Submission Error",
            description: "Email already exists",
          });
        } else {
          toast({
            variant: "destructive",
            title: code,
            description: error.message,
          });
        }
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
            <EmailBox
              register={register}
              errors={errors}
            />
            <TermsAndConditions
              register={register}
              errors={errors}
            />
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
        {/* <IconList /> */}
      </div>
    </div>
  );
};
