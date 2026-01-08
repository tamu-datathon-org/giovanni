import FloatingStats from "./ScrollStats";

const AboutSectionTwo = () => {
  return (
    <section className="bg-white py-8 dark:bg-transparent md:py-12 lg:py-16">
      <div className="container">
        <div className="-mx-4 flex flex-wrap items-center">
          <FloatingStats />
          <div className="w-full p-4 text-center lg:w-1/2">
            <div className="max-w-[700px]">
              <div className="mb-9">
                <h3 className="mb-4 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
                  Innovate Through Challenge
                </h3>
                <p className="text-body-color dark:text-body-color-dark text-base font-medium leading-relaxed sm:text-lg sm:leading-relaxed">
                  We believe in challenge-based problem solving instead of
                  traditional themes. Participants gain industry-relevant skills
                  by working on real-world challenges. Designed for both
                  beginners and experienced individuals.
                </p>

                <p className="text-body-color dark:text-body-color-dark pt-6 text-base font-medium leading-relaxed sm:text-lg sm:leading-relaxed">
                  TAMU Datathon offers workshops, mentorship, and resources to
                  help participants enhance their data science and machine
                  learning skills.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSectionTwo;
