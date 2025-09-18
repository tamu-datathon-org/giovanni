import { redirect } from "next/navigation";
import Footer from "@/components/Footer";
import "../styles/index.css";


interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  // redirect("https://tamudatathon.org/apply");
  return (
    <html lang="en">
      <body>
        {children}
        <Footer />
      </body>
    </html>
  );
}
