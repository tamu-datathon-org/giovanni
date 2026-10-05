import { Sekuya } from "next/font/google";
import Image from "next/image";

const sekuya = Sekuya({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export default function EventInformation() {
  return (
    <section
      id="event-information"
      aria-labelledby="event-information-heading"
      className="scroll-mt-24 bg-[#142009] px-4 pb-20 pt-32 sm:px-8 lg:pb-24 lg:pt-40"
    >
      <h2
        id="event-information-heading"
        className={`${sekuya.className} text-center text-[clamp(24px,6.5vw,96px)] font-normal not-italic leading-none tracking-normal text-[#FFB24C]`}
        style={{ textShadow: "0px 0px 10px #FFB24C" }}
      >
        EVENT
        <br />
        INFORMATION
      </h2>

      {/* Initial placement until the pool artwork layout is defined. */}
      <div
        aria-hidden="true"
        className="mx-auto mt-16 flex max-w-5xl flex-col items-center gap-8"
      >
        <Image
          src="/event_assets/poolstick.svg"
          alt=""
          width={935}
          height={40}
          className="h-auto w-full max-w-[935px]"
        />
        <Image
          src="/event_assets/eightball.svg"
          alt=""
          width={194}
          height={229}
          className="h-auto w-[140px] sm:w-[194px]"
        />
      </div>
    </section>
  );
}
