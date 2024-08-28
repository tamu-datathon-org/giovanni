"use client"

import { SubmitHandler, useForm } from "react-hook-form"
import { preregistrationSchema, PreregistrationData } from "../preregistration/validation"
import { zodResolver } from "@hookform/resolvers/zod"
import { api } from "~/trpc/react"
import { FormEvent, FormEventHandler, MouseEventHandler, useState } from "react"
import { z } from "zod"
import './customCss.scss';
import CustomSVG from "./customSVG"


export const CreatePreregistrationForm = () => {
    const { handleSubmit, register, formState: { errors, isSubmitting, isDirty } } = useForm<PreregistrationData>({
        resolver: zodResolver(preregistrationSchema)
    })

    const createPreregistration = api.preregistration.create.useMutation();

    const onSubmit: SubmitHandler<PreregistrationData> = async data => {
        await createPreregistration.mutateAsync({ email: data.email })
    }

    return (
        <div className="overflow-hidden">
            <div className="flex h-screen items-center justify-center">
                <form onSubmit={handleSubmit(onSubmit)} className="rounded flex flex-col items-center text-center w-1/2 text-lg">
                    <h1 className="text-5xl p-10 font-extrabold">
                        <span className="odd:text-teal-400 ">T</span>
                        <span className="even:text-cyan-700">A</span>
                        <span className="odd:text-teal-400 ">M</span>
                        <span className="even:text-cyan-700">U</span> Datathon Preregistration</h1>
                    <label className="flex flex-row">
                        <h1 className="pr-4">Enter Email:  </h1>
                        <div className="flex rounded-sm bg-black p-0.5">
                            <input {...register("email", { required: true, maxLength: 256 })} className=" border-cyan-600" />
                        </div>
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
            </div>
            <div className="wrap">
                <CustomSVG />
                <CustomSVG />
                <CustomSVG />
                <CustomSVG />
                <CustomSVG />
                <CustomSVG />
            </div>
        </div>
    )
}

export const DeletePreregistrationForm = () => {
    interface FormData {
        email: string;
    }

    const [formData, setFormData] = useState<FormData>({
        email: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const deletePreregistration = api.preregistration.delete.useMutation();
    const handleDelete: MouseEventHandler<HTMLButtonElement> = (event) => {
        event.preventDefault();
        deletePreregistration.mutate(formData.email);
    }

    const cancelPreregistration = api.preregistration.cancel.useMutation();
    const handleCancel: MouseEventHandler<HTMLButtonElement> = (event) => {
        event.preventDefault();
        cancelPreregistration.mutate(formData)
    }

    return (
        <form className="bg-grey-700 rounded flex flex-col justify-center items-center text-center w-1/2 text-lg">
            <label>
                <span>Enter Email:</span>
                <input type="text" name="email" onChange={handleChange} />
            </label>
            <button
                onClick={handleDelete}
            >
                Delete User
            </button>
            <button
                onClick={handleCancel}
            >
                Cancel User
            </button>
        </form>
    )
}