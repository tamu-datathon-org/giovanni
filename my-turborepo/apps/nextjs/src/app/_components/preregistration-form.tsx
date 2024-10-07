"use client";

import "./customCss.scss";

import type {
  FieldErrors,
  SubmitHandler,
  UseFormRegister,
} from "react-hook-form";
import type { MouseEventHandler, TouchEventHandler } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { TRPCClientError } from "@trpc/client";
import { useForm } from "react-hook-form";
import { AiOutlineClose } from "react-icons/ai";

import type { PreregistrationData } from "../preregistration/validation";
import { Button } from "~/components/ui/button";
import { useToast } from "~/hooks/use-toast";
import { api } from "~/trpc/react";
import { preregistrationSchema } from "../preregistration/validation";
import FormContainer from "./FormContainer";

// import IconList from "./IconList";

export function Lines() {
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

export function ExitButton(props: {
  onClick: MouseEventHandler<HTMLButtonElement>;
  onTouchEnd: TouchEventHandler<HTMLButtonElement>;
}) {
  // This button is only there for visual purposes
  return (
    <Button
      className="compStyling"
      onClick={props.onClick}
      onTouchEnd={props.onTouchEnd}
    >
      <AiOutlineClose className="close" color="black" />
    </Button>
  );
}

export function TAMUy2k() {
  return (
    <h1 className="p-10 pb-5 text-5xl md:text-6xl">
      <span className="odd:text-teal-400">T</span>
      <span className="even:text-cyan-700">A</span>
      <span className="odd:text-teal-400 ">M</span>
      <span className="even:text-cyan-700">U</span> Datathon
    </h1>
  );
}

export function TitleText() {
  return (
    <h1 className="p-10 pb-5 text-5xl md:text-6xl">
      <span className="odd:text-teal-400">T</span>
      <span className="even:text-cyan-700">A</span>
      <span className="odd:text-teal-400 ">M</span>
      <span className="even:text-cyan-700">U</span> Datathon Preregistration
    </h1>
  );
}

function EmailBox(props: {
  register: UseFormRegister<PreregistrationData>;
  errors: FieldErrors<PreregistrationData>;
}) {
  return (
    <>
      <label className="flex flex-row justify-center ">
        <h1 className="pr-4">Enter Email: </h1>
        <div className="flex rounded-sm bg-black p-0.5">
          <input
            {...props.register("email", { required: true, maxLength: 256 })}
            className=" border-cyan-600 px-1"
          />
        </div>
      </label>
      {props.errors.email?.message != undefined && (
        <div className="text-sm text-red-600">Invalid Email</div>
      )}
    </>
  );
}

function TermsAndConditions(props: {
  register: UseFormRegister<PreregistrationData>;
  errors: FieldErrors<PreregistrationData>;
}) {
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
        if (error.data.code === "INTERNAL_SERVER_ERROR") {
          toast({
            variant: "destructive",
            title: "Submission Error",
            description: "Email already exists",
          });
        } else {
          toast({
            variant: "destructive",
            title: error.data.code,
            description: error.message,
          });
        }
      }
    }
  };

  return (
    <FormContainer
      onSubmit={handleSubmit(onSubmit)}
      isSubmitting={isSubmitting}
      isDirty={isDirty}
    >
      <TitleText />
      <div className="w-full px-4">
        <EmailBox register={register} errors={errors} />
        <TermsAndConditions register={register} errors={errors} />
      </div>
    </FormContainer>
  );
};
