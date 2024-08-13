import { SubmitHandler } from "react-hook-form";
import { PreregistrationForm } from "../_components/preregistration-form";
import { PreregistrationData } from "./validation";
import { api } from "~/trpc/react";

// `app/dashboard/page.tsx` is the UI for the `/dashboard` URL
export default function Page() {
    return (
        < PreregistrationForm />
    )
}