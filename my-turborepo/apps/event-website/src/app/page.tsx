import { Button } from '@vanni/ui/button';

export default function Home() {

  return (
    <div
      className="flex flex-col min-h-screen w-full"
      style={{
        backgroundImage: "url('/images/landing-page/LandingPage.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="flex-1 relative">
        <a
          href="https://tamudatathon.org/apply"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
            Apply Now
          </Button>
        </a>
      </div>
    </div>
  );
};