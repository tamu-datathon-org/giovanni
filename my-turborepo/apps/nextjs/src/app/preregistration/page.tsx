import { redirect } from "next/navigation";

import { CreatePreregistrationForm } from "../_components/preregistration-form";

export default function Page() {
  redirect("/");
  return (
    <div className="lg:bg-large-device bg-mobile-device h-screen w-screen overflow-hidden bg-cover bg-center bg-no-repeat ">
      <div className="relative z-30">
        <CreatePreregistrationForm />
      </div>
      <div className="absolute left-0 top-0 h-screen w-screen bg-black opacity-40"></div>
    </div>
  );
}
