import { redirect } from "next/navigation";

// import { auth, signIn } from "@vanni/auth";

import { api } from "~/trpc/server";
// import OrganizerNavBar from "../_components/organizer/navigation-bar";
import { authClient } from "@vanni/auth/client";

export default async function OrganizerLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  console.log("how are you");
  const { data } = await authClient.getSession();

  if (!data) {
    ("use server");
    console.log("no data");
    const signIn = await authClient.signIn.social({
      provider: "google",
    });

      console.log("no data");

    if (!signIn) {
      throw new Error("No sign-in URL found");
    }
    // redirect("/");
  }

  if (data) {
    console.log("Data: " + JSON.stringify(data));

    // try {
    // await api.auth.validateOrganizerAuth();
    // } catch (e) {
    //   redirect("/");
    // }
  }

  console.log("hello");
  // console.log(data);

  return (
    <>
      <div className="min-h-screen bg-slate-400 font-mono pt-24 pb-24">
        {/* <OrganizerNavBar></OrganizerNavBar> */}
        {children}
      </div>
    </>
  );
}
