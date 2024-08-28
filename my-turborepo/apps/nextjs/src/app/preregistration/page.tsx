import { CreatePreregistrationForm, DeletePreregistrationForm } from "../_components/preregistration-form";
import { PreregistrationData } from "./validation";
import { api } from "~/trpc/react";

// `app/dashboard/page.tsx` is the UI for the `/dashboard` URL
export default function Page() {
    return (
        <div className="overflow-hidden h-screen w-screen">
            < CreatePreregistrationForm />
            {/* < DeletePreregistrationForm /> */}
        </div>
    )
}