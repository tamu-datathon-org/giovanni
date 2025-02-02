import Image from "next/image";
import SectionTitle from "../Common/SectionTitle";
import Link from "next/link";

const ApplySection = () => {
  return (
    <section id="apply" className="py-16 md:py-20 lg:py-28">
      <SectionTitle
          title="Apply To Be An Organizer"
          paragraph="Apply to be a part of the TAMU Datathon team now!"
          center
        />
      <div className="flex flex-row items-center mb-14 justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
        <Link
          href="https://forms.gle/ngbF27FDQuKCTsKR8"
          className="rounded-sm bg-primary px-8 py-4 text-base font-semibold text-white duration-300 ease-in-out hover:bg-primary/80"
        >
          Apply Here
        </Link>
      </div>
      <div className="container">
        <div className="-mx-4 flex flex-wrap items-center">
          <div className="w-full px-4 lg:w-1/2">
            <div
              className="relative mx-auto mb-12 aspect-[25/24] max-w-[500px] text-center lg:m-0"
              data-wow-delay=".15s"
            >
              {/* <Image
                src="/images/about/Organizer Recruitment.png"
                alt="about image"
                width={500}
                height={900}
                className="drop-shadow-three dark:hidden dark:drop-shadow-none"
              /> */}
              <Image
                src="/images/about/Organizer Recruitment.png"
                alt="about image"
                width={500}
                height={500}
                className="hidden drop-shadow-three dark:block dark:drop-shadow-none"
              />
            </div>
          </div>
          <div className="w-full px-4 lg:w-1/2">
            <div className="max-w-[470px]">
              <div className="mb-9">
                <h3 className="mb-4 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
                  Logistics
                </h3>
                <p className="text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed">
                Manage finances, Order t-shirts, food,etc.
                Plan & schedule day-of activities.
                Gather judges, mentors, & more!
                </p>
              </div>
              <div className="mb-9">
                <h3 className="mb-4 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
                  Web Development
                </h3>
                <p className="text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed">
                  Create & maintain software.
                  Support the team with technical solutions.
                  Track & analyze statistics regarding the event.
                  Using/building open source software!
                </p>
              </div>
              <div className="mb-9">
                <h3 className="mb-4 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
                  Design
                </h3>
                <p className="text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed">
                Set the design direction of the organization & event.
                Create marketing materials, merchandise, & campaign plans.
                Maintain & manage social media!
                </p>
              </div>
              <div className="mb-9">
                <h3 className="mb-4 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
                  Challenges
                </h3>
                <p className="text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed">
                  Create Datathon-specific challenges.
                  Work with sponsors to elevate sponsor-specific challenges.
                  Serve as a main point of contact & liaison for day-of troubleshooting!
                </p>
              </div>
              <div className="mb-1">
                <h3 className="mb-4 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
                  Outreach
                </h3>
                <p className="text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed">
                  Assist current sponsers with
                  various tasks. Day-of point of contact for 
                  company representatives.
                  Secure sponserships!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ApplySection;
