import { redirect } from "next/navigation";
import { appsOpen } from "../page";

export default async function ApplicationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!appsOpen) {
    redirect("/apply");
  }

  return <>{children}</>;
}
