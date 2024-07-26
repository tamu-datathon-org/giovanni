"use client"
import { useForm } from "react-hook-form"

export interface FormValues {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
}

export default function ApplicationForm() {
    const { register } = useForm();

    return (
        <form>
            <input {...register("firstName")} type="text" placeholder="First name" />
        </form>
    );
}