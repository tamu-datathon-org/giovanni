import Footer from "~/components/Footer";
import Header from "~/components/Header";
import { auth, signIn } from "@vanni/auth";
import { SessionProvider } from "next-auth/react";

export default async function ApplyLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session) {
    ("use server");
    await signIn(undefined, { redirectTo: "/apply" });
  }

  console.log("hello");
  console.log(session);
  return (
    <SessionProvider session={session}>
      <section className="bg-black bg-opacity-70 dark:bg-black">
        <Header />
        {children}
        <Footer />
      </section>
    </SessionProvider>
  );
}
