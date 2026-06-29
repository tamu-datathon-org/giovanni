import "~/app/organizer/email-generator/email-generator.css";

import EmailGeneratorProviders from "~/app/organizer/email-generator/_components/EmailGeneratorProviders";

export default function OrganizerEmailGeneratorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <EmailGeneratorProviders>{children}</EmailGeneratorProviders>;
}
