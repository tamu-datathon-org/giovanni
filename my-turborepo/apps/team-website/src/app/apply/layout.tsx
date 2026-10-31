import { auth } from "@vanni/auth";
import { isAllowedApplicantEmail } from "@vanni/validators";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function ApplyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/login?callbackUrl=/apply");
  }

  if (!isAllowedApplicantEmail(session.user.email)) {
    redirect("/wrong-account");
  }

  return (
    <section className="">
      {children}
    </section>
  );
}
