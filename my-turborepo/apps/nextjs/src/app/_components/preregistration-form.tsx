"use client"

import { SubmitHandler, useForm } from "react-hook-form"
import { preregistrationSchema, PreregistrationData } from "../preregistration/validation"
import { zodResolver } from "@hookform/resolvers/zod"

export const PreregistrationForm = () => {
    const { handleSubmit, register } = useForm<PreregistrationData>({
        resolver: zodResolver(preregistrationSchema)
    })

    const onSubmit: SubmitHandler<PreregistrationData> = data => console.log(data)

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input {...register("email", { required: true, maxLength: 256 })} />
            <input {...register("confirmation", { required: true, })} />
            <input type="submit" />
        </form>
    )
}