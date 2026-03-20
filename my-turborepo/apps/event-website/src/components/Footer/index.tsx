"use client";

import Image from "next/image";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { LuClipboard } from "react-icons/lu";

const Footer = () => {
  const { toast } = useToast();
  //F0CF91
  return (
    <footer className="relative z-50 overflow-x-clip overflow-y-visible bg-[#FAE19D] pb-4 pt-6 md:pb-6 md:pt-12 lg:pt-28">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 top-0 bg-[#4C321B] md:-top-40 md:bg-transparent md:bg-[url(/images/footer_background.svg)] md:bg-[length:100%_180%] md:bg-top md:bg-no-repeat" />
      <Image
        src="/images/bearfooter.gif"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute -right-4 -top-[4.75rem] z-20 w-[12rem] md:-right-6 md:-top-36 md:w-[18rem] lg:-right-8 lg:-top-44 lg:w-[28rem]"
        width={448}
        height={448}
        unoptimized
      />
      <div className="relative z-10 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 ">
          <div className="font-chilanka grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 md:grid-cols-2 md:gap-6 lg:grid-cols-4 lg:gap-8">
            <div className="flex flex-col items-center md:items-start border-t border-white/20 pt-4 first:border-t-0 first:pt-0 sm:border-t-0 sm:pt-0">
              <Link href="/" className="mb-3 inline-block md:mb-6">
                <Image
                  src="/images/td-logos/logo/logoTD.png"
                  alt="logo"
                  className="mx-auto w-[80px] dark:hidden"
                  width={100}
                  height={100}
                />
                <Image
                  src="/images/td-logos/logo/logoTD.png"
                  alt="logo"
                  className="mx-auto hidden w-[120px] dark:block md:w-[100px] lg:w-[100px]"
                  width={100}
                  height={100}
                />
              </Link>
              <h3 className="text-base text-white md:text-lg">TAMU Datathon</h3>
              <p className="mb-3 text-center text-sm text-gray-400 md:mb-6 md:text-left md:text-base">
                change learning with data
              </p>
            </div>

            <div className="flex flex-col items-center space-y-3 md:items-start md:space-y-4 border-t border-white/20 pt-4 first:border-t-0 first:pt-0 sm:border-t-0 sm:pt-0">
              <h3 className="text-base font-semibold md:text-lg">Contacts</h3>
              {/* Contact for sponsors */}
              <div className="text-sm md:text-base">
                Looking to sponsor? <br />
                <span className="flex items-center space-x-2">
                  <a
                    href="mailto:sponsor@tamudatathon.com"
                    className="mt-0 text-gray-400 hover:text-white text-sm md:text-base"
                  >
                    sponsor@tamudatathon.com
                  </a>
                  <button
                    className="w-full hover:opacity-50 md:w-auto text-sm md:text-base"
                    onClick={() => {
                      void navigator.clipboard.writeText(
                        "sponsor@tamudatathon.com",
                      );
                      toast({
                        title: "Copied to clipboard",
                        variant: "default",
                        description: "sponsor@tamudatathon.com",
                      });
                    }}
                  >
                    <LuClipboard className="mr-2" />
                  </button>
                </span>
              </div>
              {/* Contact for questions */}
              <div className="text-sm md:text-base">
                Any questions? <br />
                <span className="flex items-center space-x-2">
                  <a
                    href="mailto:connect@tamudatathon.com"
                    className="mt-0 text-gray-400 hover:text-white text-sm md:text-base"
                  >
                    connect@tamudatathon.com
                  </a>
                  <button
                    className="w-full hover:opacity-50 md:w-auto"
                    onClick={() => {
                      void navigator.clipboard.writeText(
                        "connect@tamudatathon.com",
                      );
                      toast({
                        title: "Copied to clipboard",
                        variant: "default",
                        description: "connect@tamudatathon.com",
                      });
                    }}
                  >
                    <LuClipboard className="mr-2" />
                  </button>
                </span>
              </div>
              <div className="text-sm md:text-base">
                Review the{" "}
                <a
                  href="http://mlh.io/code-of-conduct"
                  className="mt-0 text-gray-400 hover:text-white"
                >
                  MLH Code of Conduct
                </a>
              </div>
            </div>

            <div className="flex flex-col items-center space-y-3 md:items-start md:space-y-4 border-t border-white/20 pt-4 first:border-t-0 first:pt-0 sm:border-t-0 sm:pt-0">
              <h3 className="text-base font-semibold md:text-lg">Quick Links</h3>
              <Link
                href="/#about"
                className="text-sm text-gray-400 hover:text-white md:text-base"
              >
                About Us
              </Link>
              <Link
                href="/#contact"
                className="text-sm text-gray-400 hover:text-white md:text-base"
              >
                Contact
              </Link>
            </div>

            <div className="flex flex-col items-center space-y-3 md:items-start md:space-y-4 border-t border-white/20 pt-4 first:border-t-0 first:pt-0 sm:border-t-0 sm:pt-0">
              <h3 className="text-base font-semibold md:text-lg">Follow Us</h3>

              <div className="flex space-x-4">
                <a
                  href="https://discord.com/invite/pHsNmjuWSc"
                  aria-label="Discord"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white"
                >
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                  </svg>
                </a>
                <a
                  href="https://www.instagram.com/tamudatathon/"
                  aria-label="Instagram"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white"
                >
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                <a
                  href="https://www.youtube.com/@tamu-datathon/featured"
                  aria-label="YouTube"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white"
                >
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>
                <a
                  href="https://www.linkedin.com/company/tamudatathon/posts/?feedView=all"
                  aria-label="LinkedIn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white"
                >
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <div className="mt-4 border-t border-white/40 pb-2 pt-4 md:mt-6 md:pb-4 md:pt-6">
            <p className="text-center text-[10px] text-gray-400 md:text-xs">
              © {new Date().getFullYear()} TAMU Datathon. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
