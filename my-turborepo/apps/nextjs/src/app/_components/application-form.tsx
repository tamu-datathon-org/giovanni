"use client";

import type { SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, UseFormRegister, FieldErrors } from "react-hook-form";
import React, { useState } from 'react';

import type { ApplicationSchema } from "../apply/validation";
import schools from "./application-data/schools.json";


import { ReloadIcon } from "@radix-ui/react-icons";
import { Checkbox } from "~/components/ui/checkbox";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Button } from "@vanni/ui/button";
import Image from "next/image";
import { toast } from "~/hooks/use-toast";
import { TRPCClientError } from "@trpc/client";
import { api } from "~/trpc/react";
import { applicationSchema } from "../apply/validation";
import { upload } from '@vercel/blob/client';
import "./customCss.scss";
import {
  AGE,
  COUNTRIES,
  EDUCATION_LEVELS,
  GENDER_OPTIONS,
  GRADUATION_YEARS,
  HACKATHON_EXPERIENCE,
  HEARD_ABOUT_OPTIONS,
  MAJOR,
  PROGRAMMING_SKILL_LEVELS,
  RACE_OPTIONS,
  SHIRT_SIZES,
} from "~/lib/dropdownOptions";
import GenericDropdown from "./genericDropdown";
import SchoolDropdown from "./schoolDropdown";
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

const Loading = () => {
  return (<div>
    Hello, Loading
  </div>);
}

export function ApplicationForm() {
  const { data: importedValues, isLoading } = api.application.getApplicationByEventName.useQuery(
    { eventName: process.env.NEXT_PUBLIC_EVENT_NAME || "" },
    {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      retry: 1, // Retry failed requests once
    }
  );


  const { register, handleSubmit, setValue, formState: { errors, isDirty, isSubmitting } } = useForm<ApplicationSchema>({
    mode: "onSubmit",
    defaultValues: {
      resumeFile: null,
      liabilityWaiver: false,
    },
    ...importedValues?.app,
    resetOptions: {
      keepDirtyValues: true, // user-interacted input will not be retained
      keepErrors: true,
    },
    resolver: zodResolver(applicationSchema),
  });

  const createApplication = api.application.create.useMutation();
  const updateApplication = api.application.update.useMutation();

  const onSubmit: SubmitHandler<ApplicationSchema> = async (data) => {
    let blob_name = undefined;
    let blob_url = undefined;

    if (data.resumeFile) {
      await upload(data.resumeFile.name, data.resumeFile, {
        access: 'public',
        contentType: 'application/pdf',
        handleUploadUrl: '/api/resume'
      }).then((blob) => {
        blob_name = data.resumeFile?.name;
        blob_url = blob.url;
        return blob;
      }).catch((error) => {
        toast({
          variant: "destructive",
          title: "Resume Failed to Upload",
          description: error.message,
        });
      });
    } else {
      blob_name = importedValues?.resume?.resumeName;
      blob_url = importedValues?.resume?.resumeUrl;
    }

    if (!blob_name || !blob_url) {
      toast({
        variant: "destructive",
        title: "Submission failed",
        description: "Resume file is required.",
      });
      return;
    }

    if (!importedValues) {
      const createApplicationData = {
        eventName: process.env.NEXT_PUBLIC_EVENT_NAME || "",
        resumeUrl: blob_url as string,
        resumeName: blob_name as string,
        applicationData: {
          ...data,
          gradYear: Number(data.gradYear),
        },
      };

      await createApplication.mutateAsync(createApplicationData, {
        onSuccess: () => {
          toast({
            variant: "success",
            title: "Application submitted successfully!",
            description: "Your application has been received.",
          });
        },
        onError: (error) => {
          if (error instanceof TRPCClientError) {
            toast({
              variant: "destructive",
              title: "Submission failed",
              description: error.message,
            });
          }
        },
      });
    } else {
      const updateApplicationData = {
        id: importedValues.app.id,
        userId: importedValues.app.userId,
        resumeUrl: blob_url as string,
        resumeName: blob_name as string,
        eventName: process.env.NEXT_PUBLIC_EVENT_NAME || "",
        application: {
          ...data,
          gradYear: Number(data.gradYear),
        },
      };

      await updateApplication.mutateAsync(updateApplicationData, {
        onSuccess: () => {
          toast({
            variant: "success",
            title: "Application updated successfully!",
            description: "Your application has been received.",
          });
        },
        onError: (error) => {
          if (error instanceof TRPCClientError) {
            toast({
              variant: "destructive",
              title: "Update failed",
              description: error.message,
            });
          }
        },
      });
    }
  }

  if (isLoading) {
    return (<Loading />)
  }

  return (
    <div className="flex w-3/5 justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="rounded-lg bg-white p-5 px-16"
      >
        <h1 className="p-10 pb-3 text-center text-6xl font-bold">
          <span className="odd:text-teal-400">H</span>
          <span className="even:text-cyan-700">A</span>
          <span className="odd:text-teal-400 ">C</span>
          <span className="even:text-cyan-700">K</span>
          <span className="odd:text-teal-400 ">E</span>
          <span className="even:text-cyan-700">R</span> APPLICATION
        </h1>
        <div className="pb-4 text-center text-xl text-gray-500">
          Please complete the following sections. Filling out this form should
          take about 10-15 minutes.
        </div>

        <div className="flex w-full flex-row">
          {/* First Name */}
          <div className="flex w-1/2 flex-col pr-2">
            <Label htmlFor="firstName" className="text-xl">
              First Name
            </Label>
            <Input
              id="firstName"
              type="text"
              {...register("firstName")}
              placeholder="John"
              defaultValue={importedValues?.app?.firstName}
            />
            {errors.firstName?.message && <div>AJHBDA</div>}
          </div>

          {/* Last Name */}
          <div className="flex w-1/2 flex-col ">
            <Label htmlFor="lastName" className="text-xl">
              Last Name
            </Label>
            <Input
              id="lastName"
              type="text"
              {...register("lastName")}
              placeholder="Doe"
              defaultValue={importedValues?.app?.lastName}
            />
          </div>
        </div>

        {/* Email */}
        <div className="pt-4">
          <Label htmlFor="email" className="text-xl">
            Email:
          </Label>
          <Input
            id="email"
            type="text"
            {...register("email")}
            placeholder="abc123@gmail.com"
            defaultValue={importedValues?.app?.email}
          />
        </div>

        {/* Phone Number */}
        <div className="pt-4">
          <Label htmlFor="phoneNumber" className="text-xl">
            Phone Number
          </Label>
          <Input
            id="phoneNumber"
            type="text"
            {...register("phoneNumber")}
            defaultValue={importedValues?.app?.phoneNumber}
          />
        </div>

        {/* Age */}
        <GenericDropdown
          register={register}
          name={"age"}
          label={"Age"}
          options={AGE}
          defaultOption={AGE.find(option => option.value === importedValues?.app?.age)}
        />

        {/* Country */}
        <GenericDropdown
          register={register}
          name={"country"}
          label={"Country of Residence"}
          options={COUNTRIES}
          defaultOption={COUNTRIES.find(option => option.value === importedValues?.app?.country)}
        />

        {/* Gender */}
        <GenericDropdown
          register={register}
          name={"gender"}
          label={"What's your gender"}
          options={GENDER_OPTIONS}
          defaultOption={GENDER_OPTIONS.find(option => option.value === importedValues?.app?.gender)}
        />

        {/* Race */}
        <GenericDropdown
          register={register}
          name={"race"}
          label={"What ethnicity do you identify with?"}
          options={RACE_OPTIONS}
          defaultOption={RACE_OPTIONS.find(option => option.value === importedValues?.app?.race)}
        />

        {/* School */}
        <Title text="School Info" className="m-1" />
        <SchoolDropdown
          register={register}
          name={"school"}
          label={"What school do you go to?"}
          options={schools}
          defaultOption={schools.find(option => option.schoolName === importedValues?.app?.school)}
        />

        {/* Major */}
        <GenericDropdown
          register={register}
          name={"major"}
          label={"What's your major?"}
          options={MAJOR}
          defaultOption={MAJOR.find(option => option.value === importedValues?.app?.major)}
        />

        {/* Classification */}
        <GenericDropdown
          register={register}
          name={"classification"}
          label={"What classification are you?"}
          options={EDUCATION_LEVELS}
          defaultOption={EDUCATION_LEVELS.find(option => option.value === importedValues?.app?.classification)}
        />

        {/* Graduation Year */}
        <GenericDropdown
          register={register}
          name={"gradYear"}
          label={"What is your anticipated graduation year?"}
          options={GRADUATION_YEARS}
          defaultOption={GRADUATION_YEARS.find(option => Number(option.value) === importedValues?.app?.gradYear)}
        />

        {/* Hackathons Attended */}
        <Title text="Experience" className="m-1" />
        <GenericDropdown
          register={register}
          name={"hackathonsAttended"}
          label={"How many hackathons have you attended?"}
          options={HACKATHON_EXPERIENCE}
          defaultOption={HACKATHON_EXPERIENCE.find(option => option.value === importedValues?.app?.hackathonsAttended)}
        />

        {/* Experience Level */}
        <GenericDropdown
          register={register}
          name={"experience"}
          label={"What is your experience level in Data Science?"}
          options={PROGRAMMING_SKILL_LEVELS}
          defaultOption={PROGRAMMING_SKILL_LEVELS.find(option => option.value === importedValues?.app?.experience)}
        />

        {/* Team */}
        <GenericDropdown
          register={register}
          name={"hasTeam"}
          label={"Do you have a team?"}
          options={[
            { value: "No", label: "I do have a team" },
            { value: "Yes", label: "I do not have a team" },
          ]}
          defaultOption={importedValues?.app?.hasTeam ? { value: importedValues.app.hasTeam, label: importedValues.app.hasTeam } : undefined}
        />

        {/* Team Members */}
        <GenericDropdown
          register={register}
          name={"teamMembers"}
          label={"How many team members do you have?"}
          options={HEARD_ABOUT_OPTIONS}
        />

        {/* Shirt Size */}
        <GenericDropdown
          register={register}
          name={"shirtSize"}
          label={"What's your shirt size?"}
          options={SHIRT_SIZES}
          defaultOption={SHIRT_SIZES.find(option => option.value === importedValues?.app?.shirtSize)}
        />

        {/* Resume */}
        <div className="pt-4">
          <Label htmlFor="resume" className="text-xl">
            Current Resume: {importedValues?.resume?.resumeName || 'None'} <br />
            Upload Resume (PDF only):
          </Label>
          <Input
            id="resume"
            type="file"
            accept="application/pdf"
            className="border"
            onChange={(event) => {
              setValue(
                "resumeFile",
                event.target.files ? (event.target.files[0] as File) : null
              )
            }}
          />
        </div>

        {/* Address */}
        {/* <div className="pt-4">
            <Label htmlFor="address" className="text-xl">Address:</Label>
            <Input id="address" type="text" {...register("address")} />
          </div> */}

        <Title text="General Info" className="m-1" />
        {/* References */}
        <div className="pt-4">
          <Label htmlFor="references" className="text-xl">
            Point us to anything you'd like us to look at while considering your
            application:
          </Label>
          <Input id="references" type="text" {...register("references")} defaultValue={importedValues?.app?.references} />
        </div>

        {/* Tell us your best programming joke. */}
        {/* What is the one thing you'd build if you had unlimited resources? */}
        {/* What drives your interest in being a part of TAMU Datathon?  */}

        {/* Tell us your best programming joke. */}
        <div className="pt-4">
          <Label htmlFor="joke" className="text-xl">
            Tell us your best programming joke.
          </Label>
          <Input
            id="joke"
            type="text"
            {...register("interestOne")}
            defaultValue={importedValues?.app?.interestOne}
          />
        </div>

        {/* What is the one thing you'd build if you had unlimited resources? */}
        <div className="pt-4">
          <Label htmlFor="unlimitedResources" className="text-xl">
            What is the one thing you'd build if you had unlimited resources?
          </Label>
          <Input
            id="unlimitedResources"
            type="text"
            {...register("interestTwo")}
            defaultValue={importedValues?.app?.interestTwo}
          />
        </div>

        {/* What drives your interest in being a part of TAMU Datathon? */}
        <div className="pt-4">
          <Label htmlFor="interest" className="text-xl">
            What drives your interest in being a part of TAMU Datathon?
          </Label>
          <Input
            id="interest"
            type="text"
            {...register("interestThree")}
            defaultValue={importedValues?.app?.interestThree}
          />
        </div>



        {/* Dietry Restrictions */}
        <div className="pt-4">
          <Label htmlFor="dietaryRestriction" className="text-xl">
            Do you require any special accommodations at the event? Please list
            all dietary restrictions here.
          </Label>
          <Input
            id="dietaryRestriction"
            type="text"
            {...register("dietaryRestriction")}
            defaultValue={importedValues?.app?.dietaryRestriction ?? ''}
          />
        </div>

        {/* Extra Info */}
        <div className="pt-4">
          <Label htmlFor="extraInfo" className="text-xl">
            Anything else you would like us to know?
          </Label>
          <Input id="extraInfo" type="text" {...register("extraInfo")} defaultValue={importedValues?.app?.extraInfo ?? ''} />
        </div>

        {/* Liability Waiver */}
        <div className="flex items-center space-x-2 pt-4">
          <Checkbox id="liabilityWaiver" {...register("liabilityWaiver")} />
          <Label htmlFor="liabilityWaiver" className="text-xl">
            Liability Waiver
          </Label>
        </div>

        {/* Submit */}
        <div className="pt-4 text-4xl">
          {!isSubmitting && <Button type="submit">Submit</Button>}
          {isSubmitting && (
            <Button type="submit" disabled>
              {" "}
              <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
              Please wait ...
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
