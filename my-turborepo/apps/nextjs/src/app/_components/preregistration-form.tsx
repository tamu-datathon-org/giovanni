"use client"

import { SubmitHandler, useForm } from "react-hook-form"
import { preregistrationSchema, PreregistrationData } from "../preregistration/validation"
import { zodResolver } from "@hookform/resolvers/zod"
import { api } from "~/trpc/react"

export const PreregistrationForm = () => {
    const { handleSubmit, register, formState: { errors, isSubmitting, isDirty, isValid } } = useForm<PreregistrationData>({
        resolver: zodResolver(preregistrationSchema)
    })

    const createPreregistration = api.preregistration.create.useMutation();

    const onSubmit: SubmitHandler<PreregistrationData> = async data => {
        await createPreregistration.mutateAsync({ email: data.email })
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="bg-gray-700 rounded flex flex-col justify-center items-center text-center w-1/2 text-lg">
            <label>
                <span>Enter Email:</span>
                <input {...register("email", { required: true, maxLength: 256 })} />
            </label>
            {errors?.email?.message}
            <label>
                <input type="checkbox" value={"on"} {...register("confirmation", { required: true, })} />
                <span>I agree to the terms and conditions.</span>
            </label>
            {errors?.confirmation?.message}
            <button
                type="submit"
                disabled={!isDirty || isSubmitting}
            >
                {
                    isSubmitting ?
                        <img src="loading.svg" className="animate-spin w-6 h-6" aria-hidden="true" alt="loading..." />
                        : "Submit"
                }
            </button>
        </form>
    )
}