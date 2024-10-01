import { auth, signIn } from "@vanni/auth";

export default async function ApplicationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
