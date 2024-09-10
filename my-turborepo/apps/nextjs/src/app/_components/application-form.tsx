"use client";

import type { SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import type { ApplicationSchema } from "../apply/validation";
import { applicationSchema } from "../apply/validation";
import countries from "./application-data/countries.json";
import schools from "./application-data/schools.json";

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
  const onSubmit: SubmitHandler<ApplicationSchema> = (data) =>
    console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="firstName">First Name:</label>
        <input id="firstName" type="text" {...register("firstName")} />
        {errors.firstName?.message &&
          (<div>
            AJHBDA
          </div>)
        }
      </div>

      <div>
        <label htmlFor="lastName">Last Name:</label>
        <input id="lastName" type="text" {...register("lastName")} />
      </div>

      <div>
        <label htmlFor="age">Age:</label>
        <select id="age" {...register("age")}>
          <option value=''>---------</option>
          <option value="16-">16 or younger</option>
          <option value="17">17</option>
          <option value="18">18</option>
          <option value="19">19</option>
          <option value="20">20</option>
          <option value="21">21</option>
          <option value="22">22</option>
          <option value="23">23</option>
          <option value="24+">24 or older</option>
        </select>
      </div>

      <div>
        <label htmlFor="country">Country of Residence:</label>
        <select id="country" {...register("country")}>
          {
            countries.map((country) => {
              return (
                <option value={country.name}>{country.name}</option>
              )
            })
          }
        </select>
      </div>

      <div>
        <label htmlFor="email">Email:</label>
        <input id="email" type="text" {...register("email")} />
      </div>

      <div>
        <label htmlFor="phoneNumber">Phone Number</label>
        <input id="phoneNumber" type="text" {...register("phoneNumber")} />
      </div>

      <div>
        <label htmlFor="school">What school do you go to?</label>
        <select id="school" {...register("school")}>
          {
            schools.map((school) => {
              return (
                <option value={school.schoolName}>{school.schoolName}</option>
              )
            })
          }
        </select>
      </div>

      <div>
        <label htmlFor="major">What's your major?</label>
        <select id="major" {...register("major")}>
          <option value=''>---------</option>
          <option value='Computer science, computer engineering, or software engineering'>
            Computer science, computer engineering, or software engineering
          </option>
          <option value='Another engineering discipline'>
            Another engineering discipline (such as civil, electrical, mechanical, etc.)
          </option>
          <option value='Information systems, information technology, or system administration'>
            Information systems, information technology, or system administration
          </option>
          <option value='A natural science (such as biology, chemistry, physics, etc.)'>
            A natural science (such as biology, chemistry, physics, etc.)
          </option>
          <option value='Mathematics or statistics'>
            Mathematics or statistics
          </option>
          <option value='Web development or web design'>
            Web development or web design
          </option>
          <option value='Business discipline (such as accounting, finance, marketing, etc.)'>
            Business discipline (such as accounting, finance, marketing, etc.)
          </option>
          <option value='Humanities discipline (such as literature, history, philosophy, etc.)'>
            Humanities discipline (such as literature, history, philosophy, etc.)
          </option>
          <option value='Social science (such as anthropology, psychology, political science, etc.)'>
            Social science (such as anthropology, psychology, political science, etc.)
          </option>
          <option value='Fine arts or performing arts (such as graphic design, music, studio art, etc.)'>
            Fine arts or performing arts (such as graphic design, music, studio art, etc.)
          </option>
          <option value='Health science (such as nursing, pharmacy, radiology, etc.)'>
            Health science (such as nursing, pharmacy, radiology, etc.)
          </option>
          <option value='Other (please specify)'>Other (please specify)</option>
          <option value='Undecided / No Declared Major'>Undecided / No Declared Major</option>
          <option value='My school does not offer majors / primary areas of study'>My school does not offer majors / primary areas of study</option>
          <option value='Prefer not to answer'>Prefer not to answer</option>
        </select>
      </div>

      <div>
        <label htmlFor="classification">What classification are you?</label>
        <select id="classification" {...register("classification")}>
          <option value='LessThanSecondary'>Less than Secondary / High School</option>
          <option value='Secondary'>Secondary / High School</option>
          <option value='Undergrad2Year'>Undergraduate University (2 year - community college or similar)</option>
          <option value='Undergrad3PlusYear'>Undergraduate University (3+ year)</option>
          <option value='Graduate'>Graduate University (Masters, Professional, Doctoral, etc)</option>
          <option value='CodeSchool'>Code School / Bootcamp</option>
          <option value='Vocational'>Other Vocational / Trade Program or Apprenticeship</option>
          <option value='PostDoc'>Post Doctorate</option>
          <option value='Other'>Other</option>
          <option value='NotStudent'>I’m not currently a student</option>
          <option value='PreferNotToAnswer'>Prefer not to answer</option>
        </select>
      </div>

      <div>
        <label htmlFor="gradYear">What is your anticipated graduation year?</label>
        <select id="gradYear" {...register("gradYear")}>
          <option value=''>---------</option>
          <option value='2023'>2023</option>
          <option value='2024'>2024</option>
          <option value='2025'>2025</option>
          <option value='2026'>2026</option>
          <option value='2027'>2027</option>
          <option value='Other'>Other</option>
        </select>
      </div>

      <div>
        <label htmlFor="gender">What's your gender</label>
        <select id="gender" {...register("gender")}>
          <option value=''>---------</option>
          <option value='NA'>Prefer not to answer</option>
          <option value='M'>Male</option>
          <option value='F'>Female</option>
          <option value='NB'>Non-binary</option>
          <option value='X'>Prefer to self-describe</option>
        </select>

        {/* Figure out how to do X */}
      </div>

      <div>
        <label htmlFor="race">What race(s) do you identify with?</label>
        <select id="race" {...register("race")}>
          <option value=''>---------</option>
          <option value='Asian Indian'>Asian Indian</option>
          <option value='Black or African'>Black or African</option>
          <option value='Chinese'>Chinese</option>
          <option value='Filipino'>Filipino</option>
          <option value='Guamanian or Chamorro'>Guamanian or Chamorro</option>
          <option value='Hispanic / Latino / Spanish Origin'>Hispanic / Latino / Spanish Origin</option>
          <option value='Japanese'>Japanese</option>
          <option value='Korean'>Korean</option>
          <option value='Middle Eastern'>Middle Eastern</option>
          <option value='Native American or Alaskan Native'>Native American or Alaskan Native</option>
          <option value='Native Hawaiian'>Native Hawaiian</option>
          <option value='Samoan'>Samoan</option>
          <option value='Vietnamese'>Vietnamese</option>
          <option value='White'>White</option>
          <option value='Other Asian (Thai, Cambodian, etc)'>Other Asian (Thai, Cambodian, etc)</option>
          <option value='Other Pacific Islander'>Other Pacific Islander</option>
          <option value='Other (Please Specify)'>Other (Please Specify)</option>
          <option value='Prefer Not to Answer'>Prefer Not to Answer</option>
        </select>

        {/* Figure out how to do other */}
      </div>

      <div>
        <label htmlFor="hackathonsAttended">How many hackathons have you attended?</label>
        <select id="hackathonsAttended" {...register("hackathonsAttended")}>
          <option value=''>---------</option>
          <option value='0'>This will be my first!</option>
          <option value='1-3'>1-3</option>
          <option value='4-7'>4-7</option>
          <option value='8-10'>8-10</option>
          <option value='10+'>10+</option>
        </select>
      </div>

      <div>
        <label htmlFor="experience">What is your experience level in Data Science?</label>
        <select id="experience" {...register("experience")}>
          <option value=''>---------</option>
          <option value='Beginner'>Beginner</option>
          <option value='Intermediate'>Intermediate</option>
          <option value='Advanced'>Advanced</option>
        </select>
      </div>

      <div>
        <label htmlFor="hasTeam">Do you have a team?</label>
        <select id="hasTeam" {...register("hasTeam")}>
          <option value=''>---------</option>
          <option value='No'>I do have a team</option>
          <option value='Yes'>I do not have a team</option>
        </select>
      </div>

      <div>
        <label htmlFor="eventSource">How did you hear about the event?</label>
        <select id="eventSource" {...register("eventSource")}>
          <option value=''>---------</option>
          <option value='Friend'>From a friend</option>
          <option value='Social Media'>Social media</option>
          <option value='Student Orgs'>Through another student org</option>
          <option value='TD Organizer'>From a TAMU Datathon organizer</option>
          <option value='ENGR Newsletter'>From the TAMU Engineering Newsletter</option>
          <option value='MLH'>Major League Hacking (MLH)</option>
          <option value='Attended Before'>I've attended TAMU Datathon before</option>
          <option value='Other'>Other</option>
        </select>
      </div>

      <div>
        <label htmlFor="shirtSize">Shirt Size:</label>
        <select id="shirtSize" {...register("shirtSize")}>
          <option value=''>---------</option>
          <option value='S'>Unisex S</option>
          <option value='M'>Unisex M</option>
          <option value='L'>Unisex L</option>
          <option value='XL'>Unisex XL</option>
          <option value='XXL'>Unisex XXL</option>
        </select>
      </div>

      <div>
        <label htmlFor="resume">Upload Resume (PDF only):</label>
        <input id="resume" type="file" accept="application/pdf" {...register("resume")} />
      </div>

      <div>
        <label htmlFor="address">Address:</label>
        <input id="address" type="text" {...register("address")} />
      </div>

      <div>
        <label htmlFor="references">Point us to anything you'd like us to look at while considering your application:</label>
        <input id="references" type="text" {...register("references")} />
      </div>

      {/* Tell us your best programming joke. */}
      {/* What is the one thing you'd build if you had unlimited resources? */}
      {/* What drives your interest in being a part of TAMU Datathon?  */}

      <div>
        <label htmlFor="dietaryRestriction">Do you require any special accommodations at the event? Please list all dietary restrictions here.</label>
        <input id="dietaryRestriction" type="text" {...register("dietaryRestriction")} />
      </div>

      <div>
        <label htmlFor="extraInfo">Anything else you would like us to know?</label>
        <input id="extraInfo" type="text" {...register("extraInfo")} />
      </div>

      <div>
        <label htmlFor="liabilityWaiver">Liability Waiver:</label>
        <input id="liabilityWaiver" type="checkbox" value={"on"} {...register("liabilityWaiver")} />
      </div>

      <button type="submit">Submit</button>
    </form>
  );
}
