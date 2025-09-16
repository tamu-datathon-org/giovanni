import { redirect } from "next/navigation";

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  redirect("https://tamudatathon.org/apply");
}
