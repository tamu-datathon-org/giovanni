import React from "react";
import Image from "next/image";

function Sponsors() {
  return (
    <div className="w-full bg-[#322C29] pt-12 md:pt-20" id="sponsors">
      <div className="flex w-full flex-col items-center justify-center gap-y-4 md:gap-y-8">
        <span className="font-kopub bold text-3xl text-white md:text-[80px]">
          Thanks To Our
        </span>
        <Image
          src="/images/sponsor-logo/sponsor_title.svg"
          width={800}
          height={200}
          alt="sponsor title"
          className="h-auto w-[80vw] max-w-[800px]"
          priority
        />
      </div>

      <div className="relative grid w-full grid-cols-12 grid-rows-12">
        <Image
          src="/images/sponsor_bg.svg"
          alt="Background"
          width={1920}
          height={800}
          quality={100}
          className="col-span-12 col-start-1 row-span-12 row-start-1 h-auto w-auto" // Ensures it covers the container
        />

        <div className="relative z-10 col-span-10 col-start-1 row-span-1 row-start-7 translate-y-[-10vw] scale-[0.7] transform md:translate-y-[-10vw]">
          <Image
            src="/images/sponsor-logo/textured/hitachi_textured.svg"
            alt="hitachi"
            fill
            quality={75}
          />
        </div>

        <div className="relative z-10 col-span-2 col-start-2 row-span-1 row-start-7 translate-y-4 scale-[1.2] transform md:translate-y-10">
          <Image
            src="/images/sponsor-logo/textured/sec_textured.svg"
            alt="hitachi"
            fill
            quality={75}
          />
        </div>

        <div className="relative z-10 col-span-4 col-start-2 row-span-1 row-start-9 translate-y-4 scale-[0.8] transform md:translate-y-10">
          <Image
            src="/images/sponsor-logo/textured/msy_textured.svg"
            alt="msy"
            fill
            quality={75}
          />
        </div>

        <div className="relative z-10 col-span-5 col-start-2 row-span-2 row-start-10 scale-y-[0.8] transform">
          <Image
            src="/images/sponsor-logo/textured/databricks_textured.svg"
            alt="databricks"
            fill
            quality={75}
          />
        </div>
        {/* Right side */}

        <div className="relative z-10 col-span-4 col-start-6 row-span-1 row-start-5">
          <Image
            src="/images/sponsor-logo/textured/heb_textured.svg"
            alt="hitachi"
            fill
            quality={75}
          />
        </div>

        <div className="relative z-10 col-span-6 col-start-7 row-span-1 row-start-7 translate-x-4 scale-[0.8] transform">
          <Image
            src="/images/sponsor-logo/textured/qualcomm_textured.svg"
            alt="hitachi"
            fill
            quality={75}
          />
        </div>

        <div className="relative z-10 col-span-3 col-start-5 row-span-2 row-start-8 translate-x-4 scale-[0.8] transform">
          <Image
            src="/images/sponsor-logo/textured/p66_textured.svg"
            alt="p66"
            fill
            quality={75}
          />
        </div>

        <div className="relative z-10 col-span-3 col-start-7 row-span-1 row-start-10 scale-[0.5] transform">
          <Image
            src="/images/sponsor-logo/textured/tamid_textured.svg"
            alt="tamu"
            fill
            quality={75}
          />
        </div>

        <div className="relative z-10 col-span-4 col-start-8 row-span-1 row-start-9 scale-[0.4] transform transition-transform hover:scale-[0.5]">
          <a href="http://mlh.link/MLH-PureButtons-hackathons">
            <Image
              src="/images/sponsor-logo/textured/pure_textured.svg"
              alt="pure buttons"
              fill
              quality={75}
            />
          </a>
        </div>

        <div className="relative z-10 col-span-3 col-start-10 row-span-2 row-start-5 scale-[0.5] transform">
          <Image
            src="/images/sponsor-logo/textured/tamu_statistics.svg"
            alt="tamu statistics"
            fill
            quality={75}
          />
        </div>
      </div>
    </div>
  );
}

export default Sponsors;
