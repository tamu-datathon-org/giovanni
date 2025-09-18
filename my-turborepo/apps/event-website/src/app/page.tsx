import Footer from "@/components/Footer";
import { useRouter } from 'next/navigation'
import ApplyPage from "@/components/apply/page";

export default function Home() {
  /*const handleApplyClick = () => {
    // Redirect to team website application page (counterproductive idk where the apply page is linked) actually
    window.open('https://tamudatathon.org/apply', '_blank') // erm idk how to link that tbh
    // Or use Next.js router for internal navigation:
    // router.push('/apply') ??
    //router.push('/apply) ??
  }
    */

  return (
    <div className="min-h-screen flex flex-col">
      {/* Main content with background image */}
      <div
        className="flex-1 flex items-center justify-center"
        style={{
          backgroundImage: "url('/LandingPage.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "100vh",
        }}
      >
        {/* Content overlay */}
        <div className="text-center text-white p-8">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            bababababab
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
            bababababab
          </p>

          {/* Apply button */}
          <button

            onClick={ApplyPage}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-lg text-lg transition-colors shadow-lg"
          >

          </button>
        </div>
      </div>

      {/* Footer at bottom */}
      <Footer />
    </div>
  )
}