import { auth, getSession } from "~/auth/server";
import { redirect } from "next/navigation";
import { api } from "~/trpc/server";

export default async function AdminLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  if (!session) {
    ("use server");
    const signIn = auth.api.getSignInUrl({
      redirectTo: "/admin/jankury",
      provider: "google",
    });
    if (!signIn) {
      throw new Error("No sign-in URL found");
    }
    redirect("/");
  }

  if (session) {
    try {
      await api.auth.validateOrganizerAuth();
    } catch (e) {
      redirect("/");
    }
  }

  console.log("hello");
  console.log(session);
  return <section>{children}</section>;
}
