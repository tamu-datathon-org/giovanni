import NewsLatterBox from "./NewsLatterBox";

const Contact = () => {
  return (
    <section id="contact" className="overflow-hidden py-8 md:py-20 lg:py-28">
      <div className="container">
        <div className="-mx-4 flex justify-center items-center">
          <div className="px-4 sm:w-full lg:w-3/5">
            <div
              className="mb-12 rounded-sm bg-white px-8 py-11 shadow-three dark:bg-gray-dark sm:p-[55px] lg:mb-5 lg:px-8 xl:p-[55px]"
              data-wow-delay=".15s
              "
            >
              <h2 className="mb-3 text-2xl text-center font-bold text-black dark:text-white sm:text-3xl lg:text-2xl xl:text-3xl">
                Join Our Community
              </h2>
              <p className="mb-12 font-medium text-body-color text-center text-base">
                Keeping you updated with the latest blogs and events
              </p>
              <form>
                <div className="-mx-4 flex flex-col justify-center items-center">
                  <div className="w-full px-4">
                    <div className="mb-8">
                      <input
                        type="email"
                        placeholder="Enter your email here..."
                        className="border-stroke w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
                      />
                    </div>
                  </div>
                  <div className="w-full px-4 flex justify-center">
                    <button className="rounded-sm bg-primary px-9 py-4 text-base font-medium text-white shadow-submit duration-300 hover:bg-primary/90 dark:shadow-submit-dark">
                      Join
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          {/* <div className="w-full px-4 lg:w-5/12 xl:w-4/12"> */}
            {/* <NewsLatterBox /> */}
          {/* </div> */}
        </div>
      </div>
    </section>
  );
};

export default Contact;
