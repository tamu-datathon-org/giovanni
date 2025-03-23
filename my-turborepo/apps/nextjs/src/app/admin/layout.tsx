import { auth, signIn } from "@vanni/auth";
import { redirect } from "next/navigation";
import { api } from "~/trpc/server";

export default async function AdminLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session) {
    ("use server");
    await signIn(undefined, { redirectTo: "/admin/jankury" });
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
