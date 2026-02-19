import { redirect } from "next/navigation";
import { appsOpen } from "../page";

export default function ApplicationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (!appsOpen) {
    redirect("/apply");
  }

  return <>{children}</>;
}
