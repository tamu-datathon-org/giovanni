import Image from "next/image";
import Link from "next/link";

const LandingPage = () => {
  return (
    <div className="flex flex-col w-full justify-center align-center relative">
      <div className="w-full h-[100px] relative aspect-[16/9]">
        <Image src="/images/landing-page/TAMU.png" alt="TAMU Logo" fill className="object-contain" />
      </div>
      <div className="w-full h-[100px] relative aspect-[16/9]">
        <Image src="/images/landing-page/datathon.png" alt="" fill className="object-contain" />
      </div>
      <Image
        src="/images/landing-page/bearicon.png"
        alt="Bear Icon"
        width={400}
        height={400}
        className="h-[300px] w-[300px]"
      />
      <Image
        src="/images/landing-page/ellipse.png"
        alt="Bear Icon"
        width={400}
        height={400}
        className="h-[450px] w-[450px] absolute z-[-1] bottom-[0px]"
      />
      <div className="flex gap-56">
        <Link href="/apply">
          <button className="w-56 aspect-[3/1] text-white text-xl bg-[#d43b81] hover:bg-[#ff469b] hover:opacity-80 rounded-3xl">
            Apply
          </button>
        </Link>
        <Link href="/">
          <button className="w-56 aspect-[3/1] text-white text-xl bg-[#4ed6cd] hover:bg-[#5bfcf1] hover:opacity-80 rounded-3xl">
            Discord
          </button>
        </Link>
      </div>
    </div>
  );
}

export default LandingPage;