"use client";

import "../../_components/customCss.scss";

import type { SubmitHandler } from "react-hook-form";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReloadIcon } from "@radix-ui/react-icons";
import { TRPCClientError } from "@trpc/client";
import { upload } from "@vercel/blob/client";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@vanni/ui/form";

import type { ApplicationSchema } from "../validation";
import schools from "~/app/apply/application/application-data/schools.json";
import schoolsJson from "~/app/apply/application/application-data/schools.json";
import { Button } from "~/components/ui/button";
import { Checkbox } from "~/components/ui/checkbox";
import { Input } from "~/components/ui/input";
import { toast } from "~/hooks/use-toast";
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
import { api } from "~/trpc/react";
import GenericCombobox from "../../_components/genericCombobox";
import LoadingAnimation from "../../_components/loadingAnimation";
import Title from "../../_components/title";
import { applicationSchema } from "../validation";
import GenericInputField from "~/app/_components/genericInputField";
import GenericTextArea from "~/app/_components/genericTextArea";

// Map schools to DropdownOption type
const SCHOOL_OPTIONS = schools.map((school) => ({
  value: school.schoolName,
  label: school.schoolName,
}));

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
  return <LoadingAnimation />;
};

export function Asterisk() {
  return <span className="text-red-500">*</span>;
}

export function ApplicationForm() {
  const [interestOneCount, setInterestOneCount] = useState(0);
  const [interestTwoCount, setInterestTwoCount] = useState(0);
  const [interestThreeCount, setInterestThreeCount] = useState(0);
  const [dietaryRestrictionCount, setDietaryRestrictionCount] = useState(0);
  const [referencesCount, setReferencesCount] = useState(0);
  const [extraCount, setExtraCount] = useState(0);

  const [disableSubmit, setDisableSubmit] = useState(false);

  const { data: importedValues, isLoading } =
    api.application.getApplicationByEventName.useQuery(
      { eventName: process.env.NEXT_PUBLIC_EVENT_NAME || "" },
      {
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        retry: 1, // Retry failed requests once
      },
    );

  const form = useForm<ApplicationSchema>({
    mode: "onSubmit",
    defaultValues: {
      resumeFile: null,
      mlhCodeConduct: false,
      mlhPrivacyPolicy: false,
      mlhEmailConsent: false,
    },
    ...importedValues?.app,
    resetOptions: {
      keepDirtyValues: true, // user-interacted input will not be retained
      keepErrors: true,
    },
    resolver: zodResolver(applicationSchema), // match it to an endpoint because it allows async or use values
  });

  const createApplication = api.application.create.useMutation();
  const updateApplication = api.application.update.useMutation();

  const onSubmit: SubmitHandler<ApplicationSchema> = async (data) => {
    let blob_name = undefined;
    let blob_url = undefined;

    if (data.resumeFile) {
      await upload(data.resumeFile.name, data.resumeFile, {
        access: "public",
        contentType: "application/pdf",
        handleUploadUrl: "/api/resume",
      })
        .then((blob) => {
          blob_name = data.resumeFile?.name;
          blob_url = blob.url;
          return blob;
        })
        .catch((error) => {
          toast({
            variant: "destructive",
            title: "Resume Failed to Upload",
            description: error.message,
          });
        });
    } else {
      blob_name = importedValues?.resume?.resumeName ?? undefined;
      blob_url = importedValues?.resume?.resumeUrl ?? undefined;
    }

    if (!importedValues?.app) {
      const createApplicationData = {
        eventName: process.env.NEXT_PUBLIC_EVENT_NAME || "",
        resumeUrl: blob_url ?? "",
        resumeName: blob_name ?? "",
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
            description:
              "Your application has been received. Reloading page...",
          });

          setDisableSubmit(true);
          setTimeout(() => {
            window.location.reload();
          }, 5000);
        },
        onError: (error: { message: any }) => {
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
        resumeUrl: blob_url ?? "",
        resumeName: blob_name ?? "",
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
        onError: (error: any) => {
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
  };

  if (isLoading) {
    return <Loading />;
  }

  const SCHOOL_OPTIONS = schoolsJson.map((entry, index) => ({
    value: entry.schoolName,
    label: entry.schoolName,
  }));

  return (
    <div className="flex w-full justify-center lg:w-3/5 ">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="overflow-x-hidden rounded-lg bg-slate-50 p-5 lg:px-16"
        >
          <h1 className="p-10 pb-3 text-center text-5xl font-bold lg:text-6xl">
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
              <GenericInputField
                name="firstName"
                label="First Name"
                required={true}
                defaultValue={importedValues?.app?.firstName}
                placeholder="John"
              />
            </div>

            {/* Last Name */}
            <div className="flex w-1/2 flex-col pr-2">
              <GenericInputField
                name="lastName"
                label="Last Name"
                required={true}
                defaultValue={importedValues?.app?.lastName}
                placeholder="Doe"
              />
            </div>
          </div>

          {/* Email */}
          <div className="pt-4">

            <GenericInputField
              name="email"
              label="Primary Email"
              required={true}
              defaultValue={importedValues?.app?.email}
              placeholder="abc123@gmail.com"
            />
          </div>

          {/* Phone Number */}
          <div className="pt-4">
            <GenericInputField
              name="phoneNumber"
              label="Phone Number"
              required={true}
              defaultValue={importedValues?.app?.phoneNumber}
              placeholder="1234567890"
            />
          </div>

          {/* Age */}
          <div className="pt-4">
            <GenericCombobox
              name={"age"}
              label={"Age"}
              options={AGE}
              defaultOption={AGE.find(
                (option) => option.value === importedValues?.app?.age,
              )}
              required={true}
            />
          </div>

          {/* Country */}
          <div className="pt-4">
            <GenericCombobox
              name={"country"}
              label={"Country of Residence?"}
              options={COUNTRIES}
              defaultOption={COUNTRIES.find(
                (option) => option.value === importedValues?.app?.country,
              )}
              required={true}
            />
          </div>

          {/* Gender */}
          <div className="pt-4">
            <GenericCombobox
              name={"gender"}
              label={"Gender?"}
              options={GENDER_OPTIONS}
              defaultOption={GENDER_OPTIONS.find(
                (option) => option.value === importedValues?.app?.gender,
              )}
              required={true}
            />
          </div>

          {/* Race */}
          <div className="pt-4">
            <GenericCombobox
              name={"race"}
              label={"What ethnicity do you identify with?"}
              options={RACE_OPTIONS}
              defaultOption={RACE_OPTIONS.find(
                (option) => option.value === importedValues?.app?.race,
              )}
              required={true}
            />
          </div>

          {/* School */}
          <div className="pt-4">
            <GenericCombobox
              name={"school"}
              label={"What school do you go to?"}
              options={SCHOOL_OPTIONS}
              defaultOption={SCHOOL_OPTIONS.find(
                (option) => option.value === importedValues?.app?.school,
              )}
              filter
              required={true}
            />
          </div>

          {/* Major */}
          <div className="pt-4">
            <GenericCombobox
              name={"major"}
              label={"What's your major?"}
              options={MAJOR}
              defaultOption={MAJOR.find(
                (option) => option.value === importedValues?.app?.major,
              )}
              required={true}
              otherField={true}
            />
          </div>

          {/* Classification */}
          <div className="pt-4">
            <GenericCombobox
              name={"classification"}
              label={"What classification are you?"}
              options={EDUCATION_LEVELS}
              defaultOption={EDUCATION_LEVELS.find(
                (option) =>
                  option.value === importedValues?.app?.classification,
              )}
              required={true}
            />
          </div>

          {/* Graduation Year */}
          <div className="pt-4">
            <GenericCombobox
              name={"gradYear"}
              label={"What is your anticipated graduation year?"}
              options={GRADUATION_YEARS}
              defaultOption={GRADUATION_YEARS.find(
                (option) =>
                  Number(option.value) === importedValues?.app?.gradYear,
              )}
              required={true}
            />
          </div>

          {/* Figure out how to do other */}
          {/* Hackathons Attended */}
          <div className="pt-4">
            <Title text="Experience" className="m-1" />
            <GenericCombobox
              name={"hackathonsAttended"}
              label={"How many hackathons have you attended?"}
              options={HACKATHON_EXPERIENCE}
              defaultOption={HACKATHON_EXPERIENCE.find(
                (option) =>
                  option.value === importedValues?.app?.hackathonsAttended,
              )}
              required={true}
            />
          </div>

          {/* Experience Level */}
          <div className="pt-4">
            <GenericCombobox
              name={"experience"}
              label={"What is your experience level in Data Science?"}
              options={PROGRAMMING_SKILL_LEVELS}
              defaultOption={PROGRAMMING_SKILL_LEVELS.find(
                (option) => option.value === importedValues?.app?.experience,
              )}
              required={true}
            />
          </div>

          {/* Team */}
          <div className="pt-4">
            <GenericCombobox
              name={"hasTeam"}
              label={"Do you have a team?"}
              options={[
                { value: "No", label: "I do have a team" },
                {
                  value: "Yes",
                  label: "I do not have a team",
                },
              ]}
              defaultOption={
                importedValues?.app?.hasTeam
                  ? {
                    value: importedValues.app.hasTeam,
                    label: importedValues.app.hasTeam,
                  }
                  : undefined
              }
              required={true}
            />
          </div>

          {/* How'd you hear */}
          <div className="pt-4">
            <GenericCombobox
              name={"eventSource"}
              label={"How did you hear about TAMU Datathon?"}
              options={HEARD_ABOUT_OPTIONS}
              defaultOption={HEARD_ABOUT_OPTIONS.find(
                (option) => option.value === importedValues?.app?.eventSource,
              )}
              required={true}
            />
          </div>

          {/* Shirt Size */}
          <div className="pt-4">
            <GenericCombobox
              name={"shirtSize"}
              label={"What's your shirt size?"}
              options={SHIRT_SIZES}
              defaultOption={SHIRT_SIZES.find(
                (option) => option.value === importedValues?.app?.shirtSize,
              )}
              required={true}
            />
          </div>

          {/* Resume */}
          <div className="pt-4">
            <FormField
              control={form.control}
              name="resumeFile"
              render={({ field: { value, onChange, ...fieldProps } }) => (
                <FormItem>
                  <FormLabel className="text-xl">
                    <span className="text-gray-500">(Optional) </span>
                    Upload Resume (PDF Only):
                    <br />
                    Current Resume:{" "}
                    <span className="text-cyan-700">
                      {importedValues?.resume?.resumeName || "None"}
                    </span>
                  </FormLabel>
                  <FormControl className="hover:cursor-pointer">
                    <Input
                      {...fieldProps}
                      type="file"
                      accept="application/pdf"
                      className="border bg-gray-200"
                      onChange={(event) => {
                        form.setValue(
                          "resumeFile",
                          event.target.files ? event.target.files[0]! : null,
                        );
                      }}
                    />
                  </FormControl>
                  {/* I removed this because there is already a toast */}
                  {/* <FormMessage /> */}
                </FormItem>
              )}
            />
          </div>

          {/* Address */}
          <div className="pt-4">
            <GenericInputField
              name="address"
              label="Address"
              required={true}
              defaultValue={importedValues?.app?.address}
              placeholder="308 Negra Arroyo Lane, Albuquerque, New Mexico 87104"
            />
          </div>

          <Title text="General Info" className="m-1" />
          {/* References */}
          <div className="pt-4">
            <GenericTextArea
              name="references"
              defaultValue={importedValues?.app?.references ?? ""}
              label="Point us to anything you'd like us to look at while considering your application."
              placeholder="Provide links or references here."
              required={true}
            />
          </div>

          {/* Tell us your best programming joke. */}
          <div className="pt-4">
            <GenericTextArea
              name="interestOne"
              defaultValue={importedValues?.app?.interestOne ?? ""}
              label="Tell us your best programming joke."
              placeholder="Is your code running? Well, you better go catch it."
              required={true}
            />
          </div>

          {/* What is the one thing you'd build if you had unlimited resources? */}
          <div className="pt-4">
            <GenericTextArea
              name="interestTwo"
              defaultValue={importedValues?.app?.interestTwo ?? ""}
              label="What is the one thing you'd build if you had unlimited resources?"
              placeholder="More resources."
              required={true}
            />
          </div>

          {/* What drives your interest in being a part of TAMU Datathon? */}
          <div className="pt-4">
            <GenericTextArea
              name="interestThree"
              defaultValue={importedValues?.app?.interestThree ?? ""}
              label="Why do you want to participate in TAMU Datathon?"
              placeholder="Big Data. Machine Learning. Blockchain. Artificial Intelligence."
              required={true}
            />
          </div>
          {/* Dietry Restrictions */}
          <div className="pt-4">
            <GenericTextArea
              name="dietaryRestriction"
              defaultValue={importedValues?.app?.dietaryRestriction ?? ""}
              label="Do you require any special accommodations at the event?
                Please list all dietary restrictions here."
              placeholder="Rock only diet."
            />
          </div>

          {/* Extra Info */}
          <div className="pt-4">
            <GenericTextArea
              name="extraInfo"
              defaultValue={importedValues?.app?.extraInfo ?? ""}
              label="Anything else you would like us to know?"
              placeholder="I love drywall!"
            />
          </div>

          {/* MLH REQUIRED */}
          {/* Liability Waiver */}
          <div className="flex items-center space-x-2 pt-4">
            <FormField
              control={form.control}
              name="mlhCodeConduct"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="pr-2 text-xl">
                    I have read and agree to the{" "}
                    <a
                      className="text-blue-500 underline"
                      href="https://static.mlh.io/docs/mlh-code-of-conduct.pdf"
                      target="_blank"
                    >
                      MLH Code of Conduct
                    </a>
                    :
                    <Asterisk />
                  </FormLabel>
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex items-center space-x-2 pt-4">
            <FormField
              control={form.control}
              name="mlhPrivacyPolicy"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="pr-2 text-xl">
                    I authorize you to share my application/registration
                    information with Major League Hacking for event
                    administration, ranking, and MLH administration in-line with
                    the{" "}
                    <a
                      className="text-blue-500 underline"
                      href="https://mlh.io/privacy"
                      target="_blank"
                    >
                      MLH Privacy Policy
                    </a>
                    . I further agree to the terms of both the{" "}
                    <a
                      className="text-blue-500 underline"
                      href="https://github.com/MLH/mlh-policies/blob/main/contest-terms.md"
                      target="_blank"
                    >
                      MLH Contest Terms and Conditions
                    </a>{" "}
                    and the{" "}
                    <a
                      className="text-blue-500 underline"
                      href="https://mlh.io/privacy"
                      target="_blank"
                    >
                      MLH Privacy Policy
                    </a>
                    :
                    <Asterisk />
                  </FormLabel>
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex items-center space-x-2 pt-4">
            <FormField
              control={form.control}
              name="mlhEmailConsent"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="pr-2 text-xl">
                    <span className="text-gray-500">(Optional) </span>I
                    authorize MLH to send me occasional emails about relevant
                    events, career opportunities, and community announcements:
                  </FormLabel>
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Submit */}
          <div className="pt-4 text-4xl">
            {!form.formState.isSubmitting && (
              <Button type="submit" disabled={disableSubmit}>
                Submit
              </Button>
            )}
            {form.formState.isSubmitting && (
              <Button type="submit" disabled>
                {" "}
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                Please wait ...
              </Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
}
