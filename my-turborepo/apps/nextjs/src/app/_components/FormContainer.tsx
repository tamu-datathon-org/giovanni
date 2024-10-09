import React from "react";
import Image from "next/image";

import { Button } from "@vanni/ui/button";

import { ExitButton, Lines } from "~/app/_components/preregistration-form";

interface FormContainerProps {
  onSubmit?: React.FormEventHandler<HTMLFormElement>;
  isSubmitting?: boolean;
  isDirty?: boolean;
  children: React.ReactNode;
}

const FormContainer: React.FC<FormContainerProps> = ({
  onSubmit,
  isSubmitting,
  isDirty,
  children,
}) => {
  return (
    <div className="font-XPfont font-bold">
      <div className="flex h-screen flex-col items-center justify-center">
        <form
          onSubmit={onSubmit}
          className="xpBorder m-5 flex w-11/12 flex-col items-center text-center text-lg lg:w-2/5"
        >
          {/* <div className = "border-[#585958]"> */}
          <div className="flex w-full flex-row items-center justify-center">
            <Lines />
            <ExitButton />
          </div>
          <div className="relative mt-3 flex w-full flex-col items-center overflow-hidden border-0 border-[#585958] bg-[#e4e3e4] lg:border-[1px]">
            {children}
            {/* <div className="relative mt-3 flex w-full h-full flex-col items-center overflow-hidden border-0 border-[#585958] bg-[#e4e3e4] lg:border-[1px]"> */}
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
            {/* </div> */}
            {/* </div> */}
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormContainer;
