"use client";

import type { SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import type { ApplicationSchema } from "../apply/validation";
import { applicationSchema } from "../apply/validation";
import schoolsJson from "./application-data/schools.json";
import './customCss.scss';
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import GenericDropdown from "./genericDropdown";
import { AGE, COUNTRIES, EDUCATION_LEVELS, GENDER_OPTIONS, GRADUATION_YEARS, HACKATHON_EXPERIENCE, HEARD_ABOUT_OPTIONS, MAJOR, PROGRAMMING_SKILL_LEVELS, RACE_OPTIONS, SHIRT_SIZES } from "~/lib/dropdownOptions";
import { Button } from "~/components/ui/button";
import { useState } from "react";
import { ReloadIcon } from "@radix-ui/react-icons";
import SchoolDropdown from "./schoolDropdown";
import { Checkbox } from "~/components/ui/checkbox";
import Title from "./title";
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
  const { register, handleSubmit, formState: { errors } } = useForm<ApplicationSchema>({
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
  const onSubmit: SubmitHandler<ApplicationSchema> = (data) => {
    setSubmitting(true);
    console.log(data);
  };
  const [submitting, setSubmitting] = useState(false);

  const schools = schoolsJson.map((entry, index) => (entry?.schoolName))
  return (
    <div className="flex justify-center w-3/5">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-lg p-5 px-16">
        <h1 className="text-6xl p-10 pb-3 font-bold text-center">
          <span className="odd:text-teal-400">H</span>
          <span className="even:text-cyan-700">A</span>
          <span className="odd:text-teal-400 ">C</span>
          <span className="even:text-cyan-700">K</span>
          <span className="odd:text-teal-400 ">E</span>
          <span className="even:text-cyan-700">R</span> APPLICATION</h1>
        <div className="text-gray-500 text-xl pb-4 text-center">Please complete the following sections. Filling out this form should take about 10-15 minutes.</div>

        <div className="flex flex-row w-full">
          {/* First Name */}
          <div className="flex flex-col w-1/2 pr-2">
            <Label htmlFor="firstName" className="text-xl">First Name</Label>
            <Input id="firstName" type="text" {...register("firstName")} placeholder="John" />
            {errors.firstName?.message &&
              (<div>
                AJHBDA
              </div>)
            }
          </div>

          {/* Last Name */}
          <div className="flex flex-col w-1/2 ">
            <Label htmlFor="lastName" className="text-xl">Last Name</Label>
            <Input id="lastName" type="text" {...register("lastName")} placeholder="Doe" />
          </div>
        </div>

        {/* Email */}
        <div className="pt-4">
          <Label htmlFor="email" className="text-xl">Email:</Label>
          <Input id="email" type="text" {...register("email")} placeholder="abc123@gmail.com" />
        </div>

        {/* Phone Number */}
        <div className="pt-4">
          <Label htmlFor="phoneNumber" className="text-xl">Phone Number</Label>
          <Input id="phoneNumber" type="text" {...register("phoneNumber")} />
        </div>

        {/* Age */}
        <GenericDropdown register={register} name={"age"} label={"Age"} options={AGE} />

        {/* Country */}
        <GenericDropdown register={register} name={"country"} label={"Country of Residence"} options={COUNTRIES} />

        {/* Gender */}
        <GenericDropdown register={register} name={"gender"} label={"What's your gender"} options={GENDER_OPTIONS} />

        {/* Race */}
        <GenericDropdown register={register} name={"race"} label={"What ethnicity do you identify with?"} options={RACE_OPTIONS} />

        {/* School */}
        <Title text="School Info" className="m-1" />
        <SchoolDropdown register={register} name={"school"} label={"What school do you go to?"} options={schools} />

        {/* Major */}
        <GenericDropdown register={register} name={"major"} label={"What's your major?"} options={MAJOR} />

        {/* Classification */}
        <GenericDropdown register={register} name={"classification"} label={"What classification are you?"} options={EDUCATION_LEVELS} />

        {/* Graduation Year */}
        <GenericDropdown register={register} name={"gradYear"} label={"What is your anticipated graduation year?"} options={GRADUATION_YEARS} />

        {/* Figure out how to do other */}
        {/* Hackathons Attended */}
        <Title text="Experience" className="m-1" />
        <GenericDropdown register={register} name={"hackathonsAttended"} label={"How many hackathons have you attended?"} options={HACKATHON_EXPERIENCE} />

        {/* Experience Level */}
        <GenericDropdown register={register} name={"experience"} label={"What is your experience level in Data Science?"} options={PROGRAMMING_SKILL_LEVELS} />

        {/* Team */}
        <GenericDropdown register={register} name={"hasTeam"} label={"Do you have a team?"} options={[{ value: 'No', label: 'I do have a team' }, { value: 'Yes', label: 'I do not have a team' }]} />

        {/* Team Members */}
        <GenericDropdown register={register} name={"teamMembers"} label={"How many team members do you have?"} options={HEARD_ABOUT_OPTIONS} />

        {/* Shirt Size */}
        <GenericDropdown register={register} name={"shirtSize"} label={"What's your shirt size?"} options={SHIRT_SIZES} />

        {/* Resume */}
        <div className="pt-4">
          <Label htmlFor="resume" className="text-xl">Upload Resume (PDF only):</Label>
          <Input id="resume" type="file" accept="application/pdf" className="border" {...register("resume")} />
        </div>

        {/* Address */}
        {/* <div className="pt-4">
          <Label htmlFor="address" className="text-xl">Address:</Label>
          <Input id="address" type="text" {...register("address")} />
        </div> */}

        <Title text="General Info" className="m-1" />
        {/* References */}
        <div className="pt-4">
          <Label htmlFor="references" className="text-xl">Point us to anything you'd like us to look at while considering your application:</Label>
          <Input id="references" type="text" {...register("references")} />
        </div>

        {/* Tell us your best programming joke. */}
        <div className="pt-4">
          <Label htmlFor="joke" className="text-xl">Tell us your best programming joke.</Label>
          <Input id="joke" type="text" {...register("joke")} />
        </div>
        {/* What is the one thing you'd build if you had unlimited resources? */}
        {/* What drives your interest in being a part of TAMU Datathon?  */}

        {/* Dietry Restrictions */}
        <div className="pt-4">
          <Label htmlFor="dietaryRestriction" className="text-xl">Do you require any special accommodations at the event? Please list all dietary restrictions here.</Label>
          <Input id="dietaryRestriction" type="text" {...register("dietaryRestriction")} />
        </div>

        {/* Extra Info */}
        <div className="pt-4">
          <Label htmlFor="extraInfo" className="text-xl">Anything else you would like us to know?</Label>
          <Input id="extraInfo" type="text" {...register("extraInfo")} />
        </div>

        {/* Liability Waiver */}
        <div className="pt-4 flex items-center space-x-2">
          <Checkbox id="liabilityWaiver" {...register("liabilityWaiver")} />
          <Label htmlFor="liabilityWaiver" className="text-xl">Liability Waiver</Label>
        </div>

        {/* Submit */}
        <div className="pt-4 text-4xl">
          {!submitting && <Button type="submit">Submit</Button>}
          {submitting &&
            <Button type="submit" disabled> <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
              Please wait ...
            </Button>
          }
        </div>
      </form >
    </div >
  );
}
