"use client";

import type { MouseEventHandler } from "react";
import type { SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import type { PreregistrationData } from "../preregistration/validation";
import { api } from "~/trpc/react";
import { preregistrationSchema } from "../preregistration/validation";

import "./customCss.scss";

import Image from "next/image";
import { TRPCClientError } from "@trpc/client";
import { TRPCError } from "@trpc/server";
import { Button } from "node_modules/@vanni/ui/src/button";
import { AiOutlineClose } from "react-icons/ai";

import { useToast } from "~/hooks/use-toast";

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
      const resp = await createPreregistration.mutateAsync({
        email: data.email,
      });
      toast({
        title: "Thank you for preregistering",
        description: "Redirecting to home",
      });
    } catch (error) {
      if (error instanceof TRPCClientError) {
        toast({
          title: error.data.code,
          description: error.message,
        });
      }
    }
  };

  return (
    <div className="font-XPfont bg-large-device bg-cover bg-center bg-no-repeat font-bold ">
      <div className="flex h-screen items-center justify-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="xpBorder flex w-11/12 flex-col items-center text-center text-lg lg:w-2/5 "
        >
          <div className="flex w-full flex-row items-center justify-center">
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
            <Button className="compStyling">
              <AiOutlineClose className="close" />
            </Button>
          </div>
          <div className="relative mt-3 flex w-full flex-col items-center overflow-hidden border-0 border-[#585958] bg-[#e4e3e4] lg:border-[1px]">
            <h1 className="p-10 pb-5 text-6xl">
              <span className="odd:text-teal-400">T</span>
              <span className="even:text-cyan-700">A</span>
              <span className="odd:text-teal-400 ">M</span>
              <span className="even:text-cyan-700">U</span> Datathon
              Preregistration
            </h1>
            <label className="flex flex-row justify-center ">
              <h1 className="pr-4">Enter Email: </h1>
              <div className="flex rounded-sm bg-black p-0.5">
                <input
                  {...register("email", { required: true, maxLength: 256 })}
                  className=" border-cyan-600"
                />
              </div>
            </label>
            {errors.email?.message != undefined && (
              <div className="text-sm text-red-600">Invalid Email</div>
            )}
            <label className="text-blac">
              <input
                className="m-1"
                type="checkbox"
                value={"on"}
                {...register("confirmation", { required: true })}
              />
              <span>I agree to the terms and conditions.</span>
            </label>
            {errors.confirmation?.message != undefined && (
              <div className="text-sm text-red-600">Missing Field</div>
            )}
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
              className="absolute -bottom-5 -right-5 size-32 md:size-56"
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
    <form className="bg-grey-700 flex w-1/2 flex-col items-center justify-center rounded text-center text-lg">
      <label>
        <span>Enter Email:</span>
        <input type="text" name="email" onChange={handleChange} />
      </label>
      <button onClick={handleDelete}>Delete User</button>
      <button onClick={handleCancel}>Cancel User</button>
    </form>
  );
};
