"use client";

import type { SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, UseFormRegister, FieldErrors } from "react-hook-form";

import type { ApplicationSchema } from "../apply/validation";
import { applicationSchema } from "../apply/validation";
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
// import teamStatus from "./application-data/teamStatus.json";
import eventSource from "./application-data/eventSource.json";
import classification from "./application-data/classification.json";

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

interface FormSelectProps {
    id: string;
    label: string;
    register: UseFormRegister<ApplicationSchema>;
    errors: FieldErrors;
    name: keyof ApplicationSchema;
    options: { value: string; label: string }[];
}

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
    const onSubmit: SubmitHandler<ApplicationSchema> = (data) =>
        console.log(data);

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
                options={age.options.map((ageOption) => ({ value: ageOption.value, label: ageOption.label }))}
            />

            <FormSelect
                id="country"
                label="Country of Residence:"
                register={register}
                errors={errors}
                name="country"
                options={countries.map((country) => ({ value: country.name, label: country.name }))}
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

            <FormSelect
                id="school"
                label="What school do you go to?"
                register={register}
                errors={errors}
                name="school"
                options={schools.map((school) => ({ value: school.schoolName, label: school.schoolName }))}
            />

            <FormSelect
                id="major"
                label="What's your major?"
                register={register}
                errors={errors}
                name="major"
                options={major.options.map((major) => ({ value: major.value, label: major.label }))}
            />

            <FormSelect
                id="classification"
                label="What classification are you?"
                register={register}
                errors={errors}
                name="classification"
                options={classification.options.map((classificationOption) => ({ value: classificationOption.value, label: classificationOption.label }))}
            />

            <FormSelect
                id="gradYear"
                label="What is your anticipated graduation year?"
                register={register}
                errors={errors}
                name="gradYear"
                options={gradYear.options.map((gradYearOption) => ({ value: gradYearOption.value, label: gradYearOption.label }))}
            />

            <FormSelect
                id="gender"
                label="What's your gender"
                register={register}
                errors={errors}
                name="gender"
                options={gender.options.map((genderOption) => ({ value: genderOption.value, label: genderOption.label }))}
            />

            <FormSelect
                id="race"
                label="What race(s) do you identify with?"
                register={register}
                errors={errors}
                name="race"
                options={race.options.map((raceOption) => ({ value: raceOption.value, label: raceOption.label }))}
            />

            <FormSelect
                id="hackathonsAttended"
                label="How many hackathons have you attended?"
                register={register}
                errors={errors}
                name="hackathonsAttended"
                options={hackathonAttended.options.map((hackathonOption) => ({ value: hackathonOption.value, label: hackathonOption.label }))}
            />

            <FormSelect
                id="experience"
                label="What is your experience level in Data Science?"
                register={register}
                errors={errors}
                name="experience"
                options={experience.options.map((experienceOption) => ({ value: experienceOption.value, label: experienceOption.label }))}
            />

            <FormSelect
                id="hasTeam"
                label="Do you have a team?"
                register={register}
                errors={errors}
                name="hasTeam"
                options={[
                    { value: 'No', label: 'I do not have a team' },
                    { value: 'Yes', label: 'I do have a team' }
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

            <div>
                <label htmlFor="resume">Upload Resume (PDF only):</label>
                <input id="resume" type="file" accept="application/pdf" {...register("resume")} />
            </div>

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

            {/* Tell us your best programming joke. */}
            {/* What is the one thing you'd build if you had unlimited resources? */}
            {/* What drives your interest in being a part of TAMU Datathon?  */}

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

            <button type="submit">Submit</button>
        </form>
    );
}
