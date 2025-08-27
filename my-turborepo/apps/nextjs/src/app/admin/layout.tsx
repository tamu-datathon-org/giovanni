import { authClient } from "@vanni/auth/client";
import { redirect } from "next/navigation";
import { api } from "~/trpc/server";

export default async function AdminLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  const { data } = await authClient.getSession();

  if (!data) {
    ("use server");
    const signIn = authClient.signIn.social({
      provider: "google",
    });

    console.log("signIn", signIn);
    // if (!signIn) {
    //   throw new Error("No sign-in URL found");
    // }
    // redirect("/");
  }

  if (data) {
    console.log(data)

    // try {
    // await api.auth.validateOrganizerAuth();
    // } catch (e) {
    //   redirect("/");
    // }
  }

  console.log("hello");
  console.log(data);
  return <section>{children}</section>;
}
