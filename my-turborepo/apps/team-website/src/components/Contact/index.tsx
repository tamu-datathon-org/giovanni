"use client";

import { LuClipboard } from "react-icons/lu";
import { useToast } from "~/hooks/use-toast";
import SponsorTicker from "../Ticker";
const Contact = () => {
  const { toast } = useToast();

  return (
    <section id="contact" className="overflow-hidden py-8 md:py-20 lg:py-20 bg-gray-300 dark:bg-bg-color-dark">
      <div className="container">
        <div className="-mx-4 flex justify-center items-center">
          <div className="px-4 sm:w-full lg:w-3/5">
            <div
              className=" rounded-sm bg-white px-8 py-20 shadow-2xl dark:bg-dark"
              data-wow-delay=".15s
              "
            >
              <h2 className="mb-3 text-2xl text-center font-bold text-black dark:text-white sm:text-3xl lg:text-2xl xl:text-3xl">
                Interested in working with us?
              </h2>
              <p className="mb-12 font-medium text-body-color dark:text-body-color-dark text-center text-base">
                Get in touch with us for more information
              </p>
              <p className="mb-4 font-medium text-body-color dark:text-body-color-dark text-center text-lg">
                Start sponsoring with an email to
                <span className="ml-1 inline-flex items-center space-x-2">
                  <a
                    href="mailto:sponsor@tamudatathon.com"
                    className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-900 mt-0">
                    sponsor@tamudatathon.com
                  </a>
                  <button
                    className="w-full md:w-auto hover:opacity-50"
                    title="Copy to clipboard"
                    onClick={() => {
                      void navigator.clipboard.writeText('sponsor@tamudatathon.com')
                      toast({
                        title: "Copied to clipboard",
                        variant: "default",
                        description: "sponsor@tamudatathon.com"
                      })
                    }}
                  >
                    <LuClipboard className="mr-2" />
                  </button>
                </span>
              </p>



              <p className="font-medium text-body-color dark:text-body-color-dark text-center text-lg">
                For general inqueries email us at
                <span className="ml-1 inline-flex items-center space-x-2">
                  <a
                    href="mailto:connect@tamudatathon.com"
                    className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-900 mt-0">
                    connect@tamudatathon.com
                  </a>
                  <button
                    className="w-full md:w-auto hover:opacity-50"
                    onClick={() => {
                      void navigator.clipboard.writeText('connect@tamudatathon.com')
                      toast({
                        title: "Copied to clipboard",
                        variant: "default",
                        description: "connect@tamudatathon.com"
                      })
                    }}
                    title="Copy to clipboard"
                  >
                    <LuClipboard className="mr-2" />
                  </button>
                </span>
              </p>



              {/* <h2 className="mb-3 text-2xl text-center font-bold text-black dark:text-white sm:text-3xl lg:text-2xl xl:text-3xl">
              Join Our Community
              </h2>
              <p className="mb-12 font-medium text-body-color dark:text-body-color-dark text-center text-base">
              Keeping you updated with the latest blogs and events
              </p>
              <form>
              <div className="-mx-4 flex flex-col justify-center items-center">
                <div className="w-full px-4">
                <div className="mb-8">
                  <input
                  type="email"
                  placeholder="Enter your email here..."
                  className="border-stroke w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color dark:text-body-color-dark outline-none focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
                  />
                </div>
                </div>
                <div className="w-full px-4 flex justify-center">
                <button className="rounded-sm bg-primary px-9 py-4 text-base font-medium text-white shadow-submit duration-300 hover:bg-primary/90 dark:shadow-submit-dark">
                  Join
                </button>
                </div>
              </div>
              </form> */}
            </div>
          </div>
          {/* <div className="w-full px-4 lg:w-5/12 xl:w-4/12"> */}
          {/* <NewsLatterBox /> */}
          {/* </div> */}
        </div>
      </div>
      <SponsorTicker/>
    </section>
  );
};

export default Contact;
