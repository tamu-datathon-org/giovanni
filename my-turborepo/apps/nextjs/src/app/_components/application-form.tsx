"use client";

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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@vanni/ui/form";

import type { ApplicationSchema } from "../apply/validation";
import { Button } from "~/components/ui/button";
import { Checkbox } from "~/components/ui/checkbox";
import GenericCombobox from "./genericCombobox";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import React from "react";
import { ReloadIcon } from "@radix-ui/react-icons";
import type { SubmitHandler } from "react-hook-form";
import { TRPCClientError } from "@trpc/client";
import Title from "./title";
import { api } from "~/trpc/react";
import { applicationSchema } from "../apply/validation";
import schools from "./application-data/schools.json";
import schoolsJson from "./application-data/schools.json";
import { toast } from "~/hooks/use-toast";
import { upload } from "@vercel/blob/client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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
  return <div>Hello, Loading</div>;
};

export function ApplicationForm() {
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
      liabilityWaiver: false,
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
      blob_name = importedValues?.resume.resumeName;
      blob_url = importedValues?.resume.resumeUrl;
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
        resumeUrl: blob_url,
        resumeName: blob_name,
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
        resumeUrl: blob_url,
        resumeName: blob_name,
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
    <div className="flex w-3/5 justify-center">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
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
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xl">First Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="John"
                        {...field}
                        defaultValue={importedValues?.app.firstName}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />{" "}
            </div>

            {/* Last Name */}
            <div className="flex w-1/2 flex-col pr-2">
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xl">Last Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Doe"
                        {...field}
                        defaultValue={importedValues?.app.lastName}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Email */}
          <div className="pt-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xl">Email:</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="abc123@gmail.com"
                      {...field}
                      defaultValue={importedValues?.app.email}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Phone Number */}
          <div className="pt-4">
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xl">Phone Number</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="1234567890"
                      {...field}
                      defaultValue={importedValues?.app.phoneNumber}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Age */}
          <GenericCombobox
            name={"age"}
            label={"Age"}
            options={AGE}
            defaultOption={AGE.find(
              (option) => option.value === importedValues?.app.age,
            )}
          />

          {/* Country */}
          <GenericCombobox
            name={"country"}
            label={"Country of Residence"}
            options={COUNTRIES}
            defaultOption={COUNTRIES.find(
              (option) => option.value === importedValues?.app.country,
            )}
          />

          {/* Gender */}
          <GenericCombobox
            name={"gender"}
            label={"Gender"}
            options={GENDER_OPTIONS}
            defaultOption={GENDER_OPTIONS.find(
              (option) => option.value === importedValues?.app.gender,
            )}
          />

          {/* Race */}
          <GenericCombobox
            name={"race"}
            label={"What ethnicity do you identify with?"}
            options={RACE_OPTIONS}
            defaultOption={RACE_OPTIONS.find(
              (option) => option.value === importedValues?.app.race,
            )}
          />

          {/* School */}
          <Title text="School Info" className="m-1" />
          <GenericCombobox
            name={"school"}
            label={"What school do you go to?"}
            options={SCHOOL_OPTIONS}
            filter
            defaultOption={schools.find(
              (option) => option.schoolName === importedValues?.app.school,
            )}
          />

          {/* Major */}
          <GenericCombobox
            name={"major"}
            label={"What's your major?"}
            options={MAJOR}
            defaultOption={MAJOR.find(
              (option) => option.value === importedValues?.app.major,
            )}
          />

          {/* Classification */}
          <GenericCombobox
            name={"classification"}
            label={"What classification are you?"}
            options={EDUCATION_LEVELS}
            defaultOption={EDUCATION_LEVELS.find(
              (option) => option.value === importedValues?.app.classification,
            )}
          />

          {/* Graduation Year */}
          <GenericCombobox
            name={"gradYear"}
            label={"What is your anticipated graduation year?"}
            options={GRADUATION_YEARS}
            defaultOption={GRADUATION_YEARS.find(
              (option) => Number(option.value) === importedValues?.app.gradYear,
            )}
          />

          {/* Figure out how to do other */}
          {/* Hackathons Attended */}
          <Title text="Experience" className="m-1" />
          <GenericCombobox
            name={"hackathonsAttended"}
            label={"How many hackathons have you attended?"}
            options={HACKATHON_EXPERIENCE}
            defaultOption={HACKATHON_EXPERIENCE.find(
              (option) =>
                option.value === importedValues?.app.hackathonsAttended,
            )}
          />

          {/* Experience Level */}
          <GenericCombobox
            name={"experience"}
            label={"What is your experience level in Data Science?"}
            options={PROGRAMMING_SKILL_LEVELS}
            defaultOption={PROGRAMMING_SKILL_LEVELS.find(
              (option) => option.value === importedValues?.app.experience,
            )}
          />

          {/* Team */}
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
              importedValues?.app.hasTeam
                ? {
                    value: importedValues.app.hasTeam,
                    label: importedValues.app.hasTeam,
                  }
                : undefined
            }
          />

          {/* How'd you hear */}
          <GenericCombobox
            name={"eventSource"}
            label={"How did you hear about TAMU Datathon?"}
            options={HEARD_ABOUT_OPTIONS}
          />

          {/* Shirt Size */}
          <GenericCombobox
            name={"shirtSize"}
            label={"What's your shirt size?"}
            options={SHIRT_SIZES}
            defaultOption={SHIRT_SIZES.find(
              (option) => option.value === importedValues?.app.shirtSize,
            )}
          />

          {/* Resume */}
          <div className="pt-4">
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field: { value, onChange, ...fieldProps } }) => (
                <FormItem>
                  <FormLabel className="text-xl">
                    Current Resume:{" "}
                    {importedValues?.resume.resumeName || "None"} <br />
                    Upload Resume (PDF only):
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...fieldProps}
                      type="file"
                      accept="application/pdf"
                      className="border"
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
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xl">Address:</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="308 Negra Arroyo Lane, Albuquerque, New Mexico 87104"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Title text="General Info" className="m-1" />
          {/* References */}
          <div className="pt-4">
            <FormField
              control={form.control}
              name="references"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xl">
                    Point us to anything you'd like us to look at while
                    considering your application:
                  </FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
              defaultValue={importedValues?.app.references}
            />
          </div>

          {/* Tell us your best programming joke. */}
          <div className="pt-4">
            <FormField
              control={form.control}
              name="joke"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xl">
                    Tell us your best programming joke.
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Is your code running? Well, you better go catch it."
                      {...field}
                      defaultValue={importedValues?.app.interestOne}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {/* What is the one thing you'd build if you had unlimited resources? */}
          <div className="pt-4">

          <FormField
              control={form.control}
              name="unlimitedResources"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xl">
                  What is the one thing you'd build if you had unlimited resources?
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="More resources."
                      {...field}
                      defaultValue={importedValues?.app.interestOne}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* What drives your interest in being a part of TAMU Datathon? */}
          <div className="pt-4">
            <FormField
              control={form.control}
              name="interest"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xl">
                  What drives your interest in being a part of TAMU Datathon?
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Big Data. Machine Learning. Blockchain. Artificial Intelligence."
                      {...field}
                      defaultValue={importedValues?.app.interestOne}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {/* Dietry Restrictions */}
          <div className="pt-4">
            <FormField
              control={form.control}
              name="dietaryRestriction"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xl">
                    Do you require any special accommodations at the event?
                    Please list all dietary restrictions here.
                  </FormLabel>
                  <FormControl>
                    <Input
                      defaultValue={
                        importedValues?.app.dietaryRestriction ?? ""
                      }
                      placeholder="Rock only diet."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Extra Info */}
          <div className="pt-4">
            <FormField
              control={form.control}
              name="extraInfo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xl">
                    Anything else you would like us to know?
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="I love drywall!"
                      defaultValue={importedValues?.app.extraInfo ?? ""}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* TODO: Add the waiver */}
          {/* Liability Waiver */}
          <div className="flex items-center space-x-2 pt-4">
            <FormField
              control={form.control}
              name="liabilityWaiver"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xl">
                    I have read and accept the Liability Waiver:{" "}
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
            {!form.formState.isSubmitting && <Button type="submit">Submit</Button>}
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
