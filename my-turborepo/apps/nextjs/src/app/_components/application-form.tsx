"use client";

import type { SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, UseFormRegister, FieldErrors } from "react-hook-form";
import React, { useState } from 'react';

import type { ApplicationSchema } from "../apply/validation";
import countries from "./application-data/countries.json";
import schools from "./application-data/schools.json";
import age from "./application-data/age.json";
import experience from "./application-data/experience.json";
import gender from "./application-data/gender.json";
import gradYear from "./application-data/gradYear.json";
import hackathonAttended from "./application-data/hackathonAttended.json";
import major from "./application-data/major.json";
import race from "./application-data/race.json";
import shirtSize from "./application-data/shirtSize.json";
import eventSource from "./application-data/eventSource.json";
import classification from "./application-data/classification.json";
import { Button } from "@vanni/ui/button";
import Image from "next/image";
import { toast } from "~/hooks/use-toast";
import { TRPCClientError } from "@trpc/client";
import { api } from "~/trpc/react";
import { applicationSchema } from "../apply/validation";
import { CreateApplicationSchema } from "@vanni/db/schema";

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

interface FormInputProps {
    id: string;
    label: string;
    register: UseFormRegister<ApplicationSchema>;
    errors: FieldErrors;
    name: keyof ApplicationSchema;
}

interface FormSelectProps {
    id: string;
    label: string;
    register: UseFormRegister<ApplicationSchema>;
    errors: FieldErrors;
    name: keyof ApplicationSchema;
    options: { value: string | number; label: string }[];
}

interface AutocompleteInputProps {
    id: string;
    label: string;
    name: keyof ApplicationSchema;
    register: UseFormRegister<ApplicationSchema>;
    errors: FieldErrors;
    options: { name: string }[];
    placeholder?: string;
}

const FormInput: React.FC<FormInputProps> = ({ id, label, register, errors, name }) => {
    return (
        <div>
            <label htmlFor={id}>{label}</label>
            <input id={id} type="text" {...register(name)} />
            {errors[name]?.message && typeof errors[name].message === 'string' && (
                <div>
                    {errors[name].message}
                </div>
            )}
        </div>
    );
};

const FormSelect: React.FC<FormSelectProps> = ({ id, label, register, errors, name, options }) => {
    return (
        <div>
            <label htmlFor={id}>{label}</label>
            <select id={id} {...register(name)}>
                <option value=''>---------</option>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            {errors[name]?.message && typeof errors[name].message === 'string' && (
                <div>
                    {errors[name].message}
                </div>
            )}
        </div>
    );
};

const AutocompleteInput: React.FC<AutocompleteInputProps> = ({ id, label, name, register, errors, options, placeholder = 'Search...' }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [showResults, setShowResults] = useState(false);
    const [selectedValue, setSelectedValue] = useState('');

    const visibleOptions = options.filter(option =>
        option.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className='input-wrapper'>
            <label htmlFor={id} className='requiredField'>{label}</label>
            <div className='helperText'>Currently selected: {selectedValue}</div>
            <input
                type='text'
                id={id}
                value={searchQuery}
                onFocus={() => setShowResults(true)}
                placeholder={placeholder}
                {...register(name, {
                    onChange: event => {
                        event.target.setAttribute('autocomplete', 'off');
                        setSearchQuery(event.target.value);
                        setShowResults(true);
                    },
                    onBlur: () => setShowResults(false),
                })}
            />
            {showResults && (
                <ul className="m-0 absolute bg-white w-60 overflow-y-auto max-h-40">
                    {visibleOptions.map((option, index) => (
                        <li
                            key={index}
                            onMouseDown={() => {
                                setSelectedValue(option.name);
                                setSearchQuery(option.name);
                                setShowResults(false);
                            }}
                        >
                            {option.name}
                        </li>
                    ))}
                </ul>
            )}
            {errors[name]?.message && typeof errors[name].message === 'string' && (
                <div>
                    {errors[name].message}
                </div>
            )}
        </div>
    );
};

export function ApplicationForm() {
    const { register, handleSubmit, formState: { errors, isDirty, isSubmitting } } = useForm<ApplicationSchema>({
        mode: "onSubmit",
        // defaultValues: {
        //     firstName: "",
        //     lastName: "",
        //     age: undefined,
        //     country: "",
        //     email: "",
        //     school: "",
        //     major: "",
        //     classification: undefined,
        //     gradYear: undefined,
        //     gender: "",
        //     race: "",
        //     hackathonsAttended: "",
        //     experience: undefined,
        //     hasTeam: undefined,
        //     eventSource: "",
        //     shirtSize: undefined,
        //     resume: undefined,
        //     address: "",
        //     references: "",
        //     interest_one: "",
        //     interest_two: "",
        //     interest_three: "",
        //     dietaryRestriction: "",
        //     extraInfo: "",
        //     liabilityWaiver: false
        // },
        // values
        resetOptions: {
            keepDirtyValues: true, // user-interacted input will not be retained
            keepErrors: true,
        },
        resolver: zodResolver(applicationSchema),
        // match it to an endpoint because it allows async or use values
    });

    const createApplication = api.application.create.useMutation();

    const onSubmit: SubmitHandler<ApplicationSchema> = (data) => {
        console.log("submitted");
        console.log(data);
        try {
            // const createApplicationData = {
            //     eventName: "Datathon",
            //     ...data,
            // };
            const createApplicationData = {
                eventName: "Datathon",
                applicationData: {
                    firstName: data.firstName,
                    lastName: data.lastName,
                    age: data.age,
                    country: data.country,
                    email: data.email,
                    phoneNumber: data.phoneNumber,
                    school: data.school,
                    major: data.major,
                    classification: data.classification,
                    gradYear: data.gradYear,
                    gender: data.gender,
                    race: data.race,
                    resume: "resume",
                    hackathonsAttended: data.hackathonsAttended,
                    experience: data.experience,
                    hasTeam: data.hasTeam,
                    eventSource: data.eventSource,
                    shirtSize: data.shirtSize,
                    address: data.address,
                    references: data.references || "",
                    interestOne: data.interestOne,
                    interestTwo: data.interestTwo,
                    interestThree: data.interestThree,
                    dietaryRestriction: data.dietaryRestriction,
                    extraInfo: data.extraInfo,
                }
            };

            createApplication.mutate(createApplicationData, {
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

            toast({
                variant: "success",
                title: "You're on the list!",
                description: "Thanks for showing interest in the Fall 2024 Datathon.",
            });
        } catch (error) {
            if (error instanceof TRPCClientError) {
                toast({
                    variant: "destructive",
                    title: error.data.code,
                    description: error.message,
                });
            }
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <FormInput
                id="firstName"
                label="First Name:"
                register={register}
                errors={errors}
                name="firstName"
            />

            <FormInput
                id="lastName"
                label="Last Name:"
                register={register}
                errors={errors}
                name="lastName"
            />

            <FormSelect
                id="age"
                label="Age:"
                register={register}
                errors={errors}
                name="age"
                options={age.options}
            />

            <AutocompleteInput
                id="country"
                label="Country of Residence:"
                register={register}
                errors={errors}
                name="country"
                options={countries}
            />

            <FormInput
                id="email"
                label="Email:"
                register={register}
                errors={errors}
                name="email"
            />

            <FormInput
                id="phoneNumber"
                label="Phone Number:"
                register={register}
                errors={errors}
                name="phoneNumber"
            />

            <AutocompleteInput
                id="school"
                label="What school do you go to?"
                register={register}
                errors={errors}
                name="school"
                options={schools}
            />

            <FormSelect
                id="major"
                label="What's your major?"
                register={register}
                errors={errors}
                name="major"
                options={major.options}
            />

            <FormSelect
                id="classification"
                label="What classification are you?"
                register={register}
                errors={errors}
                name="classification"
                options={classification.options}
            />

            <FormSelect
                id="gradYear"
                label="What is your anticipated graduation year?"
                register={register}
                errors={errors}
                name="gradYear"
                options={gradYear.options}
            />

            <FormSelect
                id="gender"
                label="What's your gender"
                register={register}
                errors={errors}
                name="gender"
                options={gender.options}
            />

            <FormSelect
                id="race"
                label="What race(s) do you identify with?"
                register={register}
                errors={errors}
                name="race"
                options={race.options}
            />

            <FormSelect
                id="hackathonsAttended"
                label="How many hackathons have you attended?"
                register={register}
                errors={errors}
                name="hackathonsAttended"
                options={hackathonAttended.options}
            />

            <FormSelect
                id="experience"
                label="What is your experience level in Data Science?"
                register={register}
                errors={errors}
                name="experience"
                options={experience.options}
            />

            <FormSelect
                id="hasTeam"
                label="Do you have a team?"
                register={register}
                errors={errors}
                name="hasTeam"
                options={[
                    { value: "No", label: 'I do not have a team' },
                    { value: "Yes", label: 'I do have a team' }
                ]}
            />

            <FormSelect
                id="eventSource"
                label="How did you hear about the event?"
                register={register}
                errors={errors}
                name="eventSource"
                options={eventSource.options.map((eventSourceOption) => ({ value: eventSourceOption.value, label: eventSourceOption.label }))}
            />

            <FormSelect
                id="shirtSize"
                label="Shirt Size:"
                register={register}
                errors={errors}
                name="shirtSize"
                options={shirtSize.options.map((shirtSizeOption) => ({ value: shirtSizeOption.value, label: shirtSizeOption.label }))}
            />

            <FormInput
                id="address"
                label="Address:"
                register={register}
                errors={errors}
                name="address"
            />

            <FormInput
                id="references"
                label="Point us to anything you'd like us to look at while considering your application:"
                register={register}
                errors={errors}
                name="references"
            />

            <FormInput
                id="joke"
                label="Tell us your best programming joke:"
                register={register}
                errors={errors}
                name="interestOne"
            />

            <FormInput
                id="unlimitedResources"
                label="What is the one thing you'd build if you had unlimited resources?"
                register={register}
                errors={errors}
                name="interestTwo"
            />

            <FormInput
                id="interest"
                label="What drives your interest in being a part of TAMU Datathon?"
                register={register}
                errors={errors}
                name="interestThree"
            />

            <FormInput
                id="dietaryRestriction"
                label="Do you require any special accommodations at the event? Please list all dietary restrictions here."
                register={register}
                errors={errors}
                name="dietaryRestriction"
            />

            <FormInput
                id="extraInfo"
                label="Anything else you would like us to know?"
                register={register}
                errors={errors}
                name="extraInfo"
            />

            <div>
                <label htmlFor="liabilityWaiver">Liability Waiver:</label>
                <input id="liabilityWaiver" type="checkbox" value={"on"} {...register("liabilityWaiver")} />
                {errors.liabilityWaiver?.message && typeof errors.liabilityWaiver.message === 'string' && (
                    <div>
                        {errors.liabilityWaiver.message}
                    </div>
                )}
            </div>

            <Button
                className="xpBorder submitBtn my-4 w-fit bg-cyan-700 text-xl font-extrabold"
                type="submit"
                disabled={!isDirty || isSubmitting}
            >
                {isSubmitting ? (
                    <Image
                        src="loading.svg"
                        className="animate-spin"
                        width={24}
                        height={24}
                        aria-hidden="true"
                        alt="loading..."
                    />
                ) : (
                    "Submit"
                )}
            </Button>
        </form>
    );
}
