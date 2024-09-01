"use client";

import type { SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import type { ApplicationSchema } from "../apply/validation";
import { applicationSchema } from "../apply/validation";

// import * as z from "zod";

/*
    First Name
    Last Name
    Age (select 16<, 17...23, 24+)
    Country (autocomplete)
    Phone number
    School (autocomplete)
    Major (select)
    Classification (select)
    Anticipated Grady Year (select)
    Gender (NA, M, F, NB, X)
    Race (select)
    Hackathons Attended (select 0, 1-3, 4-7, 8-10, 10+)
    Experience Level (select Beginner, Intermediate, Advanced)
    Event Source (select)
    Shirt Size (select S, M, L, XL, XXL)
    Address
    References (textarea)
    Joke (textarea)
    Dietary Restrictions (textarea)
    Extra Information (textarea)
    Liability Waiver (checkbox)
*/
export function ApplicationForm() {
  const { register, handleSubmit } = useForm<ApplicationSchema>({
    mode: "onSubmit",
    defaultValues: {
      firstName: "",
      lastName: "",
      age: 18,
    },
    // values
    resetOptions: {
      keepDirtyValues: false, // user-interacted input will not be retained
      keepErrors: true,
    },
    resolver: zodResolver(applicationSchema),
    // match it to an endpoint because it allows async or use values
  });
  const onSubmit: SubmitHandler<ApplicationSchema> = (data) =>
    console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("firstName", { required: true, maxLength: 20 })} />
      <input {...register("lastName", { pattern: /^[A-Za-z]+$/i })} />
      <input type="number" {...register("age", { min: 18, max: 99 })} />
      <input type="submit" />
    </form>
  );
}
