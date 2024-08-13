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
        <form onSubmit={handleSubmit(onSubmit)}>
            <input {...register("email", { required: true, maxLength: 256 })} />
            {errors?.email?.message}
            <input type="checkbox" value={"on"} {...register("confirmation", { required: true, })} />
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