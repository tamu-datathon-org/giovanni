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
import { upload } from '@vercel/blob/client';
import { CodeSandboxLogoIcon } from "@radix-ui/react-icons";


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
    defaultValue?: string;
}

interface FormSelectProps {
    id: string;
    label: string;
    register: UseFormRegister<ApplicationSchema>;
    errors: FieldErrors;
    name: keyof ApplicationSchema;
    options: { value: string | number; label: string }[];
    defaultValue?: string;
}

interface AutocompleteInputProps {
    id: string;
    label: string;
    name: keyof ApplicationSchema;
    register: UseFormRegister<ApplicationSchema>;
    errors: FieldErrors;
    options: { name: string }[];
    placeholder?: string;
    initQuery: string | undefined;
}

const FormInput: React.FC<FormInputProps> = ({ id, label, register, errors, name, defaultValue }) => {
    return (
        <div>
            <label htmlFor={id}>{label}</label>
            <input defaultValue={defaultValue} id={id} type="text" {...register(name)} />
            {errors[name]?.message && typeof errors[name].message === 'string' && (
                <div>
                    {errors[name].message}
                </div>
            )}
        </div>
    );
};


const FormSelect: React.FC<FormSelectProps> = ({ id, label, register, errors, name, options, defaultValue }) => {
    return (
        <div>
            <label htmlFor={id}>{label}</label>
            <select id={id} {...register(name)} defaultValue={defaultValue}>
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

const AutocompleteInput: React.FC<AutocompleteInputProps> = ({ id, label, name, register, errors, options, placeholder = 'Search...', initQuery = '' }) => {
    const [searchQuery, setSearchQuery] = useState(initQuery);
    const [showResults, setShowResults] = useState(false);
    const [selectedValue, setSelectedValue] = useState(initQuery);

    const visibleOptions = options.filter(option =>
        option.name.toLowerCase().includes(searchQuery.toLowerCase())
    ).slice(0, 5);

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
                        event.target.setAttribute('autocomplete', 'on');
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


    const { register, handleSubmit, formState: { errors, isDirty, isSubmitting } } = useForm<ApplicationSchema>({
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
            // console.log("Updating")
            const updateApplicationData = {
                id: importedValues.app.id,
                userId: importedValues.app.userId,
                resumeUrl: blob_url as string,
                resumeName: blob_name as string,
                eventName: process.env.NEXT_PUBLIC_EVENT_NAME || "",
                application: {
                    ...data,
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
        <form onSubmit={handleSubmit(onSubmit)}>
            <FormInput
                id="firstName"
                label="First Name:"
                register={register}
                errors={errors}
                defaultValue={importedValues?.app?.firstName}
                name="firstName"
            />

            <FormInput
                id="lastName"
                label="Last Name:"
                register={register}
                errors={errors}
                defaultValue={importedValues?.app?.lastName}
                name="lastName"
            />

            <FormSelect
                id="age"
                label="Age:"
                register={register}
                errors={errors}
                name="age"
                defaultValue={importedValues?.app?.age}
                options={age.options}
            />

            <AutocompleteInput
                id="country"
                label="Country of Residence:"
                register={register}
                errors={errors}
                name="country"
                options={countries}
                initQuery={importedValues?.app?.country}
            />

            <FormInput
                id="email"
                label="Email:"
                register={register}
                errors={errors}
                defaultValue={importedValues?.app?.email}
                name="email"
            />

            <FormInput
                id="phoneNumber"
                label="Phone Number:"
                register={register}
                errors={errors}
                defaultValue={importedValues?.app?.phoneNumber}
                name="phoneNumber"
            />

            <AutocompleteInput
                id="school"
                label="What school do you go to?"
                register={register}
                errors={errors}
                name="school"
                options={schools}
                initQuery={importedValues?.app?.school}
            />

            <FormSelect
                id="major"
                label="What's your major?"
                register={register}
                errors={errors}
                name="major"
                defaultValue={importedValues?.app?.major}
                options={major.options}
            />

            <FormSelect
                id="classification"
                label="What classification are you?"
                register={register}
                errors={errors}
                name="classification"
                defaultValue={importedValues?.app?.classification}
                options={classification.options}
            />

            <FormSelect
                id="gradYear"
                label="What is your anticipated graduation year?"
                register={register}
                errors={errors}
                name="gradYear"
                defaultValue={importedValues?.app?.gradYear as unknown as string}
                options={gradYear.options}
            />

            <FormSelect
                id="gender"
                label="What's your gender"
                register={register}
                errors={errors}
                name="gender"
                defaultValue={importedValues?.app?.gender}
                options={gender.options}
            />

            <FormSelect
                id="race"
                label="What race(s) do you identify with?"
                register={register}
                errors={errors}
                name="race"
                defaultValue={importedValues?.app?.race}
                options={race.options}
            />

            <FormSelect
                id="hackathonsAttended"
                label="How many hackathons have you attended?"
                register={register}
                errors={errors}
                name="hackathonsAttended"
                defaultValue={importedValues?.app?.hackathonsAttended}
                options={hackathonAttended.options}
            />

            <FormSelect
                id="experience"
                label="What is your experience level in Data Science?"
                register={register}
                errors={errors}
                name="experience"
                defaultValue={importedValues?.app?.experience}
                options={experience.options}
            />

            <FormSelect
                id="hasTeam"
                label="Do you have a team?"
                register={register}
                errors={errors}
                name="hasTeam"
                defaultValue={importedValues?.app?.hasTeam}
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
                defaultValue={importedValues?.app?.eventSource}
                options={eventSource.options.map((eventSourceOption) => ({ value: eventSourceOption.value, label: eventSourceOption.label }))}
            />

            <FormSelect
                id="shirtSize"
                label="Shirt Size:"
                register={register}
                errors={errors}
                name="shirtSize"
                defaultValue={importedValues?.app?.shirtSize}
                options={shirtSize.options.map((shirtSizeOption) => ({ value: shirtSizeOption.value, label: shirtSizeOption.label }))}
            />

            <FormInput
                id="address"
                label="Address:"
                register={register}
                errors={errors}
                defaultValue={importedValues?.app?.address}
                name="address"
            />

            <div>
                <label>
                    Current Resume: {importedValues?.resume?.resumeName || 'None'}
                </label>
                <input
                    type="file"
                    {...register("resumeFile")}
                />

                {errors.resumeFile?.message && typeof errors.resumeFile.message === 'string' && (
                    <div>
                        {errors.resumeFile.message}
                    </div>
                )}
            </div>

            <FormInput
                id="references"
                label="Point us to anything you'd like us to look at while considering your application:"
                register={register}
                errors={errors}
                defaultValue={importedValues?.app?.references}
                name="references"
            />

            <FormInput
                id="joke"
                label="Tell us your best programming joke:"
                register={register}
                errors={errors}
                defaultValue={importedValues?.app?.interestOne}
                name="interestOne"
            />

            <FormInput
                id="unlimitedResources"
                label="What is the one thing you'd build if you had unlimited resources?"
                register={register}
                errors={errors}
                defaultValue={importedValues?.app?.interestTwo}
                name="interestTwo"
            />

            <FormInput
                id="interest"
                label="What drives your interest in being a part of TAMU Datathon?"
                register={register}
                errors={errors}
                defaultValue={importedValues?.app?.interestThree}
                name="interestThree"
            />

            <FormInput
                id="dietaryRestriction"
                label="Do you require any special accommodations at the event? Please list all dietary restrictions here."
                register={register}
                errors={errors}
                defaultValue={importedValues?.app?.dietaryRestriction ?? undefined}
                name="dietaryRestriction"
            />

            <FormInput
                id="extraInfo"
                label="Anything else you would like us to know?"
                register={register}
                errors={errors}
                defaultValue={importedValues?.app?.extraInfo ?? undefined}
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
