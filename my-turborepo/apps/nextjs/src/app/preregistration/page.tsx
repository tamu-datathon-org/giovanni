import IconList from "../_components/IconList"; // Import the 'IconList' component and its props type
import { CreatePreregistrationForm } from "../_components/preregistration-form";

// `app/dashboard/page.tsx` is the UI for the `/dashboard` URL
export default function Page() {
  return (
    <div className="lg:bg-large-device bg-mobile-device h-screen w-screen overflow-hidden bg-cover bg-center bg-no-repeat ">
      <div className="relative z-30">
        <CreatePreregistrationForm />
      </div>
      <div className="absolute left-0 top-0 h-screen w-screen bg-black opacity-40"></div>
    </div>
  );
}
