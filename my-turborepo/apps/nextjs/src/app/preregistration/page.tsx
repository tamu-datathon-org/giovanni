import { CreatePreregistrationForm } from "../_components/preregistration-form";
import IconList from "../_components/IconList"; // Import the 'IconList' component and its props type

// `app/dashboard/page.tsx` is the UI for the `/dashboard` URL
export default function Page() {
    return (
        <div className="overflow-hidden h-screen w-screen bg-large-device bg-cover bg-no-repeat bg-center ">
            <CreatePreregistrationForm />
            <IconList /> {/* Pass the 'icons' prop to the 'IconList' component */}
        </div>
    )
}