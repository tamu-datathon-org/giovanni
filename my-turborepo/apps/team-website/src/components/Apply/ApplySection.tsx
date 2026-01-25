import Image from "next/image";
import Link from "next/link";

import { SectionTitle } from "@vanni/ui/section-title";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";

const ApplySection = () => {
  return (
    <section id="apply" className="pt-14 md:pt-18 lg:pt-22">
      <SectionTitle
        title="Apply To Be An Organizer"
        // paragraph="Apply to be a part of the TAMU Datathon team now!"
        paragraph="Application closes on Jan 30th, 2026!"
        center
      />
      <div className="container mb-10">
        <div className="flex items-center justify-center sm:flex-row sm:space-x-4 sm:space-y-0 pb-6">
          <Link
            href="https://docs.google.com/forms/d/e/1FAIpQLScIO-brtOtLcgDnQnsqn1_wQ7j2GS81H8K3CHy254A1BzLtrQ/viewform"
            className="rounded-sm bg-primary px-8 py-4 text-base font-semibold text-white duration-300 ease-in-out hover:bg-primary/80"
          >
            Apply Here
          </Link>
        </div>
        <div
          className="relative mx-auto mb-8  max-w-[900px] text-center"
          data-wow-delay=".15s"
        >
          <Image
            src="/OrganizerRecruiting.png"
            alt="Organizer recruiting banner"
            width={900}
            height={1000}
            className="drop-shadow-three"
          />
        </div>
      </div>
      
      {/* logistic info */}
      <div className="text-center">
        <h2 className="mb-4 text-white text-3xl font-bold sm:text-4xl lg:text-5xl">
          Recruitment Informational
        </h2>
        <p className="mx-auto mb-12 text-body-color-dark max-w-2xl text-lg font-medium leading-relaxed sm:text-xl sm:leading-relaxed">
          To learn more about each role and its responsibilities, come to the informational on Jan. 27th, Tuesday 6-7PM at PETR120!
        </p>
      </div>

      <div className="container">
        <div className="mx-auto max-w-3xl">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="logistics">
              <AccordionTrigger className="text-xl font-bold text-white sm:text-2xl lg:text-xl xl:text-2xl">
                Logistics
              </AccordionTrigger>
              <AccordionContent className="text-body-color text-body-color-dark text-base font-medium leading-relaxed sm:text-lg sm:leading-relaxed">
                Manage finances, Order t-shirts, food,etc. Plan & schedule
                day-of activities. Gather judges, mentors, & more!
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="web-development">
              <AccordionTrigger className="text-xl font-bold text-white sm:text-2xl lg:text-xl xl:text-2xl">
                Web Development
              </AccordionTrigger>
              <AccordionContent className="text-body-color text-body-color-dark text-base font-medium leading-relaxed sm:text-lg sm:leading-relaxed">
                Create & maintain software. Support the team with technical
                solutions. Track & analyze statistics regarding the event.
                Using/building open source software!
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="design">
              <AccordionTrigger className="text-xl font-bold text-white sm:text-2xl lg:text-xl xl:text-2xl">
                Design
              </AccordionTrigger>
              <AccordionContent className="text-body-color text-body-color-dark text-base font-medium leading-relaxed sm:text-lg sm:leading-relaxed">
                Set the design direction of the organization & event. Create
                marketing materials, merchandise, & campaign plans. Maintain &
                manage social media!
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="challenges">
              <AccordionTrigger className="text-xl font-bold text-white sm:text-2xl lg:text-xl xl:text-2xl">
                Challenges
              </AccordionTrigger>
              <AccordionContent className="text-body-color text-body-color-dark text-base font-medium leading-relaxed sm:text-lg sm:leading-relaxed">
                Create Datathon-specific challenges. Work with sponsors to
                elevate sponsor-specific challenges. Serve as a main point of
                contact & liaison for day-of troubleshooting!
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="outreach">
              <AccordionTrigger className="text-xl font-bold text-white sm:text-2xl lg:text-xl xl:text-2xl">
                Outreach
              </AccordionTrigger>
              <AccordionContent className="text-body-color text-body-color-dark text-base font-medium leading-relaxed sm:text-lg sm:leading-relaxed">
                Assist current sponsers with various tasks. Day-of point of
                contact for company representatives. Secure sponserships!
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default ApplySection;
