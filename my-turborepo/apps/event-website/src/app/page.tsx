"use client";

import Footer from "@/components/Footer";
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter()

  const handleApplyClick = () => {
    // Redirect to team website application page
    window.open('https://tamudatathon.org/apply', '_blank')
    // Or use Next.js router for internal navigation:
    // router.push('/apply')
  }

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
            <button
                onClick={handleApplyClick}
                className="appbutton"
                style={{
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                zIndex: 10,
                }}
            >
                Apply Now
            </button>
        </div>

        <footer className="mt-auto">
            <Footer />
        </footer>
    </div>


  )
}