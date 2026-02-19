"use client";

import type { SubmitHandler } from "react-hook-form";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReloadIcon } from "@radix-ui/react-icons";
import { TRPCClientError } from "@trpc/client";
import { upload } from "@vercel/blob/client";
import { LucideArrowBigLeft } from "lucide-react";
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
import { useAuthRedirect } from "~/app/_components/auth/useAuthRedirect";
import GenericInputField from "~/app/_components/genericInputField";
import GenericTextArea from "~/app/_components/genericTextArea";
import schoolsJson from "~/app/apply/application/application-data/schools.json";
import { Button } from "~/components/ui/button";
import { Checkbox } from "~/components/ui/checkbox";
import { Input } from "~/components/ui/input";
import { env } from "~/env";
import { toast } from "~/hooks/use-toast";
import {
  AGE,
  COUNTRIES,
  DIETARY_RESTRICTIONS,
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
import GenericMultiSelect from "../../_components/genericMultiSelect";
import Title from "../../_components/title";
import { applicationSchema } from "../validation";

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

export const EVENT_NAME = env.NEXT_PUBLIC_EVENT_NAME;

const ADDRESS_DELIMITER = "|";

export function Asterisk() {
  return <span className="text-red-500">*</span>;
}

// Section Card Component
function SectionCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="group mb-6 overflow-hidden rounded-xl border border-gray-300 bg-white shadow-md transition-all duration-300 hover:shadow-xl dark:border-gray-600 dark:bg-gray-800">
      <div className="border-b border-gray-200 bg-gray-50 px-6 py-4 dark:border-gray-700 dark:bg-gray-900">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
          {title}
        </h2>
      </div>
      <div className="p-6">{children}</div>
    </div>
  );
}

export function ApplicationForm() {
  const [disableSubmit, setDisableSubmit] = useState(false);
  const { session } = useAuthRedirect();
  const router = useRouter();

  const {
    data: importedValues,
    isLoading,
    refetch: refetchApplication,
  } = api.application.getApplicationByEventName.useQuery(
    { eventName: EVENT_NAME },
    {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    },
  );

  const createApplication = api.application.create.useMutation();
  const updateApplication = api.application.update.useMutation();

  const form = useForm<ApplicationSchema>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      age: "",
      country: "",
      phoneNumber: "",
      school: "",
      major: "",
      classification: "",
      gradYear: "",
      gender: "",
      race: "",
      hackathonsAttended: "",
      experience: "",
      eventSource: "",
      shirtSize: "",
      address: "",
      city: "",
      region: "",
      zipCode: "",
      dietaryRestriction: "",
      references: "",
      questions: "",
      extraInfo: "",
      liabilityWaiver: false,
      mlhPrivacyPolicy: false,
      mlhEmailConsent: false,
    },
  });

  useEffect(() => {
    console.log("importedValues", importedValues);
    if (importedValues?.app) {
      const addressParts = importedValues.app.address.split(ADDRESS_DELIMITER);
      form.reset({
        ...importedValues.app,
        age: importedValues.app.age || "",
        country: importedValues.app.country || "",
        phoneNumber: importedValues.app.phoneNumber || "",
        school: importedValues.app.school || "",
        major: importedValues.app.major || "",
        classification: importedValues.app.classification || "",
        gradYear: importedValues.app.gradYear.toString() || "",
        gender: importedValues.app.gender || "",
        race: importedValues.app.race || "",
        hackathonsAttended: importedValues.app.hackathonsAttended || "",
        experience: importedValues.app.experience || "",
        eventSource: importedValues.app.eventSource || "",
        shirtSize: importedValues.app.shirtSize || "",
        address: addressParts[0] ?? "",
        city: addressParts[1] ?? "",
        region: addressParts[2] ?? "",
        zipCode: addressParts[3] ?? "",
        dietaryRestriction: importedValues.app.dietaryRestriction || "",
        references: importedValues.app.references || "",
        questions: importedValues.app.questions || "",
        extraInfo: importedValues.app.extraInfo || "",
        liabilityWaiver: importedValues.app.liabilityWaiver,
        mlhPrivacyPolicy: importedValues.app.mlhPrivacyPolicy,
        mlhEmailConsent: importedValues.app.mlhEmailConsent || false,
      });

      form.setValue("email", importedValues.app.email);
    } else if (session) {
      form.setValue("email", session.user.email);
    }
  }, [importedValues, session]);

  const onSubmit: SubmitHandler<ApplicationSchema> = async (data) => {
    const files = form.getValues("resume");
    let blob_url = importedValues?.resume?.url;
    let blob_name = importedValues?.resume?.name;

    if (files && files?.length > 0) {
      const file = files[0];

      if (!file) {
        toast({
          variant: "destructive",
          title: "File Upload Error",
          description: "Please select a valid file.",
        });
        return;
      }

      const newBlob = await upload(file.name, file, {
        access: "public",
        handleUploadUrl: "/api/upload",
      });

      blob_url = newBlob.url;
      blob_name = file.name;
    } else if (!importedValues?.resume?.resumeUrl) {
      toast({
        variant: "destructive",
        title: "Resume Required",
        description: "Please upload your resume.",
      });
      return;
    }

    if (!importedValues?.app) {
      const createApplicationData = {
        resumeUrl: blob_url ?? "",
        resumeName: blob_name ?? "",
        eventName: EVENT_NAME,
        applicationData: {
          ...data,
          address: `${data.address}|${data.city}|${data.region}|${data.zipCode}`,
          gradYear: Number(data.gradYear),
        },
      };

      await createApplication.mutateAsync(createApplicationData, {
        onSuccess: async () => {
          toast({
            variant: "success",
            title: "Application submitted successfully!",
            description:
              "Your application has been received. You can now update and resubmit.",
          });

          localStorage.removeItem("applicationData");

          setTimeout(() => {
            router.replace("/apply");
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
      const combinedAddress = [
        data.address,
        data.city,
        data.region,
        data.zipCode,
      ]
        .filter(Boolean)
        .join(ADDRESS_DELIMITER);
      const updateApplicationData = {
        id: importedValues.app.id,
        userId: importedValues.app.userId,
        resumeUrl: blob_url ?? "",
        resumeName: blob_name ?? "",
        eventName: EVENT_NAME,
        application: {
          ...data,
          address: combinedAddress,
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

  const SCHOOL_OPTIONS = schoolsJson.map((entry) => ({
    value: entry.schoolName,
    label: entry.schoolName,
  }));

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-lg text-gray-600">Loading...</p>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen w-full bg-gray-100 py-12 dark:bg-gray-900">
      <div className="container mx-auto max-w-4xl px-4">
        {/* Back Button */}
        <a href="/apply">
          <button className="mb-6 flex items-center gap-2 rounded-lg bg-white px-6 py-3 font-medium text-gray-700 shadow-md transition-all hover:shadow-lg dark:bg-gray-800 dark:text-gray-200">
            <LucideArrowBigLeft className="h-5 w-5" />
            Back to Dashboard
          </button>
        </a>

        {/* Decorative mascot stickers */}
        <div className="pointer-events-none fixed left-4 top-20 z-10 opacity-20 dark:opacity-10">
          <Image
            src="/mascot/Pixel_PolarBear.png"
            alt=""
            width={80}
            height={80}
            className="rotate-12"
          />
        </div>
        <div className="pointer-events-none fixed right-8 top-32 z-10 opacity-20 dark:opacity-10">
          <Image
            src="/mascot/DETECTIVE BEARTHOLOMEW.png"
            alt=""
            width={100}
            height={100}
            className="-rotate-12"
          />
        </div>
        <div className="pointer-events-none fixed bottom-24 left-12 z-10 opacity-20 dark:opacity-10">
          <Image
            src="/mascot/floatbear.png"
            alt=""
            width={90}
            height={90}
            className="rotate-6"
          />
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* Header */}
            <div className="mb-8 text-center">
              <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-200 md:text-5xl">
                Hacker Application
              </h1>
              <p className="mt-3 text-base text-gray-600 dark:text-gray-400">
                Please complete the following sections. This should take about
                5-8 minutes.
              </p>
            </div>

            {/* Personal Information Section */}
            <SectionCard title="Personal Information">
              <div className="grid gap-6 md:grid-cols-2">
                <GenericInputField
                  name="firstName"
                  label="First Name"
                  required={true}
                  defaultValue={importedValues?.app?.firstName ?? ""}
                  placeholder="John"
                />
                <GenericInputField
                  name="lastName"
                  label="Last Name"
                  required={true}
                  defaultValue={importedValues?.app?.lastName ?? ""}
                  placeholder="Doe"
                />
              </div>

              <div className="mt-6">
                <GenericInputField
                  name="email"
                  label="Primary Email"
                  required={true}
                  disabled={true}
                  defaultValue={importedValues?.app?.email ?? ""}
                  placeholder="abc123@gmail.com"
                />
              </div>

              <div className="mt-6 grid gap-6 md:grid-cols-2">
                <GenericInputField
                  name="phoneNumber"
                  label="Phone Number"
                  required={true}
                  defaultValue={importedValues?.app?.phoneNumber ?? ""}
                  placeholder="1234567890"
                />
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

              <div className="mt-6 grid gap-6 md:grid-cols-2">
                <GenericCombobox
                  name={"country"}
                  label={"Country of Residence"}
                  options={COUNTRIES}
                  defaultOption={COUNTRIES.find(
                    (option) => option.value === importedValues?.app?.country,
                  )}
                  required={true}
                />
                <GenericCombobox
                  name={"gender"}
                  label={"Gender"}
                  options={GENDER_OPTIONS}
                  defaultOption={
                    importedValues?.app?.gender
                      ? (GENDER_OPTIONS.find(
                          (option) =>
                            option.value === importedValues.app.gender,
                        ) ?? {
                          label: "Other (please specify)",
                          value: importedValues.app.gender || "",
                        })
                      : undefined
                  }
                  required={true}
                />
              </div>

              <div className="mt-6">
                <GenericCombobox
                  name={"race"}
                  label={"What ethnicity do you identify with?"}
                  options={RACE_OPTIONS}
                  defaultOption={
                    importedValues?.app?.race
                      ? (RACE_OPTIONS.find(
                          (option) => option.value === importedValues.app.race,
                        ) ?? {
                          label: "Other (please specify)",
                          value: importedValues.app.race || "",
                        })
                      : undefined
                  }
                  required={true}
                />
              </div>
            </SectionCard>

            {/* Education Section */}
            <SectionCard title="Education">
              <div className="mb-6">
                <GenericCombobox
                  name={"school"}
                  label={"School"}
                  options={SCHOOL_OPTIONS}
                  defaultOption={SCHOOL_OPTIONS.find(
                    (option) => option.value === importedValues?.app?.school,
                  )}
                  required={true}
                />
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <GenericCombobox
                  name={"major"}
                  label={"Major"}
                  options={MAJOR}
                  defaultOption={
                    importedValues?.app?.major
                      ? (MAJOR.find(
                          (option) => option.value === importedValues.app.major,
                        ) ?? {
                          label: "Other (please specify)",
                          value: importedValues.app.major || "",
                        })
                      : undefined
                  }
                  required={true}
                />
                <GenericCombobox
                  name={"classification"}
                  label={"Level of Study"}
                  options={EDUCATION_LEVELS}
                  defaultOption={EDUCATION_LEVELS.find(
                    (option) =>
                      option.value === importedValues?.app?.classification,
                  )}
                  required={true}
                />
              </div>

              <div className="mt-6">
                <GenericCombobox
                  name={"gradYear"}
                  label={"Anticipated Graduation Year"}
                  options={GRADUATION_YEARS}
                  defaultOption={GRADUATION_YEARS.find(
                    (option) =>
                      option.value === importedValues?.app?.gradYear.toString(),
                  )}
                  required={true}
                />
              </div>
            </SectionCard>

            {/* Experience Section */}
            <SectionCard title="Experience">
              <div className="grid gap-6 md:grid-cols-2">
                <GenericCombobox
                  name={"hackathonsAttended"}
                  label={"Hackathons Attended"}
                  options={HACKATHON_EXPERIENCE}
                  defaultOption={HACKATHON_EXPERIENCE.find(
                    (option) =>
                      option.value === importedValues?.app?.hackathonsAttended,
                  )}
                  required={true}
                />
                <GenericCombobox
                  name={"experience"}
                  label={"Programming Experience Level"}
                  options={PROGRAMMING_SKILL_LEVELS}
                  defaultOption={
                    importedValues?.app?.experience
                      ? PROGRAMMING_SKILL_LEVELS.find(
                          (option) =>
                            option.value === importedValues.app.experience,
                        )
                      : undefined
                  }
                  required={true}
                />
              </div>

              <div className="mt-6">
                <GenericMultiSelect
                  name={"eventSource"}
                  label={"How did you hear about us?"}
                  options={HEARD_ABOUT_OPTIONS}
                  defaultOption={importedValues?.app?.eventSource ?? undefined}
                  required={true}
                  placeholder={""}
                />
              </div>

              <div className="mt-6">
                <FormField
                  control={form.control}
                  name="resume"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                        Resume/CV <Asterisk />
                      </FormLabel>
                      {importedValues?.resume && (
                        <div className="my-2 rounded-lg bg-green-50 p-3 dark:bg-green-900/20">
                          <p className="text-sm text-green-700 dark:text-green-400">
                            ✓ Current resume: {importedValues.resume.name}
                          </p>
                        </div>
                      )}
                      <FormControl>
                        <Input
                          type="file"
                          accept=".pdf,.doc,.docx"
                          onChange={(e) => field.onChange(e.target.files)}
                          className="cursor-pointer transition-all hover:border-cyan-500"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </SectionCard>

            {/* Additional Details Section */}
            <SectionCard title="Additional Details">
              <div className="mb-6">
                <GenericCombobox
                  name={"shirtSize"}
                  label={"T-Shirt Size"}
                  options={SHIRT_SIZES}
                  defaultOption={SHIRT_SIZES.find(
                    (option) => option.value === importedValues?.app?.shirtSize,
                  )}
                  required={true}
                />
              </div>

              <div className="mb-6">
                <GenericInputField
                  name="address"
                  label="Street Address"
                  required={true}
                  defaultValue={importedValues?.app?.address ?? ""}
                  placeholder="123 Main St"
                />
              </div>

              <div className="grid gap-6 md:grid-cols-3">
                <GenericInputField
                  name="city"
                  label="City"
                  required={true}
                  defaultValue={importedValues?.app?.city ?? ""}
                  placeholder="College Station"
                />
                <GenericInputField
                  name="region"
                  label="State/Region"
                  required={true}
                  defaultValue={importedValues?.app?.region ?? ""}
                  placeholder="TX"
                />
                <GenericInputField
                  name="zipCode"
                  label="Zip Code"
                  required={true}
                  defaultValue={importedValues?.app?.zipCode ?? ""}
                  placeholder="77840"
                />
              </div>

              <div className="mt-6">
                <GenericMultiSelect
                  name={"dietaryRestriction"}
                  label={"Dietary Restrictions"}
                  placeholder="Select dietary restrictions"
                  options={DIETARY_RESTRICTIONS}
                  defaultOption={importedValues?.app?.dietaryRestriction ?? ""}
                  required={false}
                />
              </div>

              <div className="mt-6">
                <GenericTextArea
                  name={"references"}
                  label="Tell us about your interest in this event"
                  required={false}
                  defaultValue={importedValues?.app?.references ?? ""}
                  placeholder="What excites you about this datathon?"
                />
              </div>

              <div className="mt-6">
                <GenericTextArea
                  name="questions"
                  label="Any questions for us?"
                  required={false}
                  defaultValue={importedValues?.app?.questions ?? ""}
                  placeholder="Let us know if you have any questions..."
                />
              </div>

              <div className="mt-6">
                <GenericTextArea
                  name="extraInfo"
                  label="Anything else you'd like us to know?"
                  required={false}
                  defaultValue={importedValues?.app?.extraInfo ?? ""}
                  placeholder="Share anything else that might be relevant..."
                />
              </div>
            </SectionCard>

            {/* Legal Section */}
            <SectionCard title="Legal & Consent">
              <div className="space-y-6">
                <FormField
                  control={form.control}
                  name="liabilityWaiver"
                  render={({ field }) => (
                    <FormItem className="flex items-start space-x-3 rounded-lg border-2 border-gray-200 p-4 transition-all hover:border-[#01c0cc] dark:border-gray-700">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="mt-1 border-2"
                        />
                      </FormControl>
                      <div className="space-y-1">
                        <FormLabel className="text-base font-medium leading-relaxed text-gray-700 dark:text-gray-200">
                          I have read and agree to the{" "}
                          <a
                            className="text-[#01c0cc] underline hover:text-[#28979b]"
                            href="https://static.mlh.io/docs/mlh-code-of-conduct.pdf"
                            target="_blank"
                          >
                            MLH Code of Conduct
                          </a>
                          <Asterisk />
                        </FormLabel>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="mlhPrivacyPolicy"
                  render={({ field }) => (
                    <FormItem className="flex items-start space-x-3 rounded-lg border-2 border-gray-200 p-4 transition-all hover:border-[#01c0cc] dark:border-gray-700">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="mt-1 border-2"
                        />
                      </FormControl>
                      <div className="space-y-1">
                        <FormLabel className="text-base font-medium leading-relaxed text-gray-700 dark:text-gray-200">
                          I authorize you to share my application/registration
                          information with Major League Hacking for event
                          administration, ranking, and MLH administration
                          in-line with the{" "}
                          <a
                            className="text-[#01c0cc] underline hover:text-[#28979b]"
                            href="https://mlh.io/privacy"
                            target="_blank"
                          >
                            MLH Privacy Policy
                          </a>
                          . I further agree to the terms of both the{" "}
                          <a
                            className="text-[#01c0cc] underline hover:text-[#28979b]"
                            href="https://github.com/MLH/mlh-policies/blob/main/contest-terms.md"
                            target="_blank"
                          >
                            MLH Contest Terms and Conditions
                          </a>{" "}
                          and the{" "}
                          <a
                            className="text-[#01c0cc] underline hover:text-[#28979b]"
                            href="https://mlh.io/privacy"
                            target="_blank"
                          >
                            MLH Privacy Policy
                          </a>
                          <Asterisk />
                        </FormLabel>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="mlhEmailConsent"
                  render={({ field }) => (
                    <FormItem className="flex items-start space-x-3 rounded-lg border-2 border-gray-200 p-4 transition-all hover:border-[#01c0cc] dark:border-gray-700">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="mt-1 border-2"
                        />
                      </FormControl>
                      <div className="space-y-1">
                        <FormLabel className="text-base font-medium leading-relaxed text-gray-700 dark:text-gray-200">
                          <span className="text-gray-500">(Optional) </span>I
                          authorize MLH to send me occasional emails about
                          relevant events, career opportunities, and community
                          announcements
                        </FormLabel>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
              </div>
            </SectionCard>

            {/* Submit Button */}
            <div className="flex justify-center pb-12">
              {!form.formState.isSubmitting && (
                <Button
                  type="submit"
                  disabled={disableSubmit}
                  className="h-14 w-full max-w-md transform rounded-xl bg-[#01c0cc] px-12 text-lg font-bold text-white shadow-lg transition-all hover:bg-[#28979b] hover:shadow-xl disabled:opacity-50 md:w-auto"
                >
                  Submit Application
                </Button>
              )}
              {form.formState.isSubmitting && (
                <Button
                  type="submit"
                  disabled
                  className="h-14 w-full max-w-md rounded-xl bg-[#01c0cc] px-12 text-lg font-bold text-white shadow-lg md:w-auto"
                >
                  <ReloadIcon className="mr-2 h-5 w-5 animate-spin" />
                  Submitting...
                </Button>
              )}
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
