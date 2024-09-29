"use client";

import type { SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import type { ApplicationSchema } from "../apply/validation";
import { applicationSchema } from "../apply/validation";
import schoolsJson from "./application-data/schools.json";

import "./customCss.scss";

import { useState } from "react";
import { ReloadIcon } from "@radix-ui/react-icons";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@vanni/ui/form";

import { Button } from "~/components/ui/button";
import { Checkbox } from "~/components/ui/checkbox";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
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
import GenericCombobox from "./genericCombobox";
import SchoolCombobox from "./schoolDropdown";
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
  const form = useForm<ApplicationSchema>({
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
                      <Input placeholder="John" {...field} />
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
                      <Input placeholder="Doe" {...field} />
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
                    <Input placeholder="abc123@gmail.com" {...field} />
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
                    <Input placeholder="1234567890" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Age */}
          <GenericCombobox name={"age"} label={"Age"} options={AGE} />

          {/* Country */}
          <GenericCombobox
            name={"country"}
            label={"Country of Residence"}
            options={COUNTRIES}
          />

          {/* Gender */}
          <GenericCombobox
            name={"gender"}
            label={"What's your gender"}
            options={GENDER_OPTIONS}
          />

          {/* Race */}
          <GenericCombobox
            name={"race"}
            label={"What ethnicity do you identify with?"}
            options={RACE_OPTIONS}
          />

          {/* School */}
          <Title text="School Info" className="m-1" />
          <GenericCombobox
            name={"school"}
            label={"What school do you go to?"}
            options={SCHOOL_OPTIONS}
            filter
          />

          {/* Major */}
          <GenericCombobox
            name={"major"}
            label={"What's your major?"}
            options={MAJOR}
          />

          {/* Classification */}
          <GenericCombobox
            name={"classification"}
            label={"What classification are you?"}
            options={EDUCATION_LEVELS}
          />

          {/* Graduation Year */}
          <GenericCombobox
            name={"gradYear"}
            label={"What is your anticipated graduation year?"}
            options={GRADUATION_YEARS}
          />

          {/* Figure out how to do other */}
          {/* Hackathons Attended */}
          <Title text="Experience" className="m-1" />
          <GenericCombobox
            name={"hackathonsAttended"}
            label={"How many hackathons have you attended?"}
            options={HACKATHON_EXPERIENCE}
          />

          {/* Experience Level */}
          <GenericCombobox
            name={"experience"}
            label={"What is your experience level in Data Science?"}
            options={PROGRAMMING_SKILL_LEVELS}
          />

          {/* Team */}
          <GenericCombobox
            name={"hasTeam"}
            label={"Do you have a team?"}
            options={[
              { value: "No", label: "I do have a team" },
              { value: "Yes", label: "I do not have a team" },
            ]}
          />

          {/* Team Members */}
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
          />

          {/*  /!* Resume *!/*/}
          {/*  <div className="pt-4">*/}
          {/*    <Label htmlFor="resume" className="text-xl">*/}
          {/*      Upload Resume (PDF only):*/}
          {/*    </Label>*/}
          {/*    <Input*/}
          {/*      id="resume"*/}
          {/*      type="file"*/}
          {/*      accept="application/pdf"*/}
          {/*      className="border"*/}
          {/*      {...register("resume")}*/}
          {/*    />*/}
          {/*  </div>*/}

          {/*  /!* Address *!/*/}
          {/*  /!* <div className="pt-4">*/}
          {/*  <Label htmlFor="address" className="text-xl">Address:</Label>*/}
          {/*  <Input id="address" type="text" {...register("address")} />*/}
          {/*</div> *!/*/}

          {/*  <Title text="General Info" className="m-1" />*/}
          {/*  /!* References *!/*/}
          {/*  <div className="pt-4">*/}
          {/*    <Label htmlFor="references" className="text-xl">*/}
          {/*      Point us to anything you'd like us to look at while considering*/}
          {/*      your application:*/}
          {/*    </Label>*/}
          {/*    <Input id="references" type="text" {...register("references")} />*/}
          {/*  </div>*/}

          {/*  /!* Tell us your best programming joke. *!/*/}
          {/*  <div className="pt-4">*/}
          {/*    <Label htmlFor="joke" className="text-xl">*/}
          {/*      Tell us your best programming joke.*/}
          {/*    </Label>*/}
          {/*    <Input id="joke" type="text" {...register("joke")} />*/}
          {/*  </div>*/}
          {/*  /!* What is the one thing you'd build if you had unlimited resources? *!/*/}
          {/*  /!* What drives your interest in being a part of TAMU Datathon?  *!/*/}

          {/*  /!* Dietry Restrictions *!/*/}
          {/*  <div className="pt-4">*/}
          {/*    <Label htmlFor="dietaryRestriction" className="text-xl">*/}
          {/*      Do you require any special accommodations at the event? Please*/}
          {/*      list all dietary restrictions here.*/}
          {/*    </Label>*/}
          {/*    <Input*/}
          {/*      id="dietaryRestriction"*/}
          {/*      type="text"*/}
          {/*      {...register("dietaryRestriction")}*/}
          {/*    />*/}
          {/*  </div>*/}

          {/*  /!* Extra Info *!/*/}
          {/*  <div className="pt-4">*/}
          {/*    <Label htmlFor="extraInfo" className="text-xl">*/}
          {/*      Anything else you would like us to know?*/}
          {/*    </Label>*/}
          {/*    <Input id="extraInfo" type="text" {...register("extraInfo")} />*/}
          {/*  </div>*/}

          {/*  /!* Liability Waiver *!/*/}
          {/*  <div className="flex items-center space-x-2 pt-4">*/}
          {/*    <Checkbox id="liabilityWaiver" {...register("liabilityWaiver")} />*/}
          {/*    <Label htmlFor="liabilityWaiver" className="text-xl">*/}
          {/*      Liability Waiver*/}
          {/*    </Label>*/}
          {/*  </div>*/}

          {/*  /!* Submit *!/*/}
          {/*  <div className="pt-4 text-4xl">*/}
          {/*    {!submitting && <Button type="submit">Submit</Button>}*/}
          {/*    {submitting && (*/}
          {/*      <Button type="submit" disabled>*/}
          {/*        {" "}*/}
          {/*        <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />*/}
          {/*        Please wait ...*/}
          {/*      </Button>*/}
          {/*    )}*/}
          {/*  </div>*/}
        </form>
      </Form>
    </div>
  );
}
