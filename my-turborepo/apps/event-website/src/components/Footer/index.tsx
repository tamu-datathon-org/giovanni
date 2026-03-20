"use client";
import Image from "next/image";
import Link from "next/link";
import { LuClipboard } from "react-icons/lu";
import { useToast } from "@/hooks/use-toast";

const Footer = () => {
  const { toast } = useToast();

  return (
    <footer className="relative z-10 pb-8 pt-12 md:pt-16 lg:pt-20 bg-[#F0CF91] overflow-hidden">

      {/* Background image overlay */}
      <div className="absolute inset-0 bg-[url(/images/footer_background.svg)] bg-cover bg-center pointer-events-none"></div>

      {/* Content */}
      <div className="relative z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 ">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">

            <div className="flex flex-col items-center md:items-start">
              <Link href="/" className="mb-6 inline-block">
                <Image
                  src="/images/logo/logoTD.png"
                  alt="logo"
                  className="w-[128px] mx-auto dark:hidden"
                  width={100}
                  height={100}
                />
                <Image
                  src="/images/logo/logoTD.png"
                  alt="logo"
                  className="hidden w-[200px] md:w-[150px] lg:w-[128px] mx-auto dark:block"
                  width={100}
                  height={100}
                />
              </Link>
              <h3>TAMU Datathon</h3>
              <p className="mb-6 text-center text-sm text-gray-600 dark:text-gray-400 md:text-left">
                change learning with data
              </p>
            </div>

            <div className="flex flex-col items-center space-y-4 md:items-start">
              <h3 className="text-lg font-semibold">Contacts</h3>

              <div>
                Looking to sponsor? <br />
                <span className="flex items-center space-x-2">
                  <a
                    href="mailto:sponsor@tamudatathon.com"
                    className="text-blue-600 hover:text-blue-900 dark:text-blue-400"
                  >
                    sponsor@tamudatathon.com
                  </a>
                  <button
                    className="hover:opacity-50"
                    onClick={() => {
                      void navigator.clipboard.writeText('sponsor@tamudatathon.com');
                      toast({
                        title: "Copied to clipboard",
                        description: "sponsor@tamudatathon.com"
                      });
                    }}
                  >
                    <LuClipboard />
                  </button>
                </span>
              </div>

              <div>
                Any questions? <br />
                <span className="flex items-center space-x-2">
                  <a
                    href="mailto:connect@tamudatathon.com"
                    className="text-blue-600 hover:text-blue-900 dark:text-blue-400"
                  >
                    connect@tamudatathon.com
                  </a>
                  <button
                    className="hover:opacity-50"
                    onClick={() => {
                      void navigator.clipboard.writeText('connect@tamudatathon.com');
                      toast({
                        title: "Copied to clipboard",
                        description: "connect@tamudatathon.com"
                      });
                    }}
                  >
                    <LuClipboard />
                  </button>
                </span>
              </div>

              <div>
                Review the{" "}
                <a
                  href="http://mlh.io/code-of-conduct"
                  className="text-blue-600 hover:text-blue-900 dark:text-blue-400"
                >
                  MLH Code of Conduct
                </a>
              </div>
            </div>

            <div className="flex flex-col items-center space-y-4 md:items-start">
              <h3 className="text-lg font-semibold">Quick Links</h3>
              <Link href="/#about" className="text-gray-600 hover:text-gray-900 dark:text-gray-400">
                About Us
              </Link>
              <Link href="/#contact" className="text-gray-600 hover:text-gray-900 dark:text-gray-400">
                Contact
              </Link>
            </div>

            <div className="flex flex-col items-center space-y-4 md:items-start">
              <h3 className="text-lg font-semibold">Follow Us</h3>

              <div className="flex space-x-4">
                {/* icons unchanged */}
              </div>
            </div>

          </div>

          <div className="mt-8 border-t border-gray-200 pt-8 dark:border-gray-700">
            <p className="text-center text-xs text-gray-500 dark:text-gray-400">
              © {new Date().getFullYear()} TAMU Datathon. All rights reserved.
            </p>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;