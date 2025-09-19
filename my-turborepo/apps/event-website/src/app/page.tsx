import { ThemedButton } from "@/components/ui/themed-button";


export default function Home() {

  return (
    <div className="flex flex-col min-h-screen w-full items-center justify-center">
      <div
        className="absolute inset-0 bg-no-repeat bg-center bg-cover
                   bg-[url('/images/landing-page/LandingPage-phone.png')]
                   sm:bg-[url('/images/landing-page/LandingPage.png')]
                   sm:bg-center block"
      />
      <div className="flex-1 absolute w-full top-[50vh] left-[50%] translate-y-[-50%] translate-x-[-50%] sm:top-[65vh]">
        <p className="text-xl sm:text-4xl font-semi text-foreground text-center mb-2 sm:mb-6 font-['KoPub_Batang']">APPLICATIONS CLOSE OCT. 24</p>
        <div className="flex flex-row justify-center items-center w-full">
          <a
            href="https://tamudatathon.org/apply"
            target="_blank"
            rel="noopener noreferrer"
          >
            <ThemedButton
              className="w-[50vw] h-12 sm:h-16 text-xl sm:text-4xl px-8 sm:px-16"
            >
              Apply Now!
            </ThemedButton>
          </a>
        </div>
      </div>
    </div>
  );
};