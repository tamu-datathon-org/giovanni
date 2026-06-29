"use client";

import { Toaster } from "react-hot-toast";
import { ApiProvider } from "~/app/organizer/email-generator/_contexts/ApiContext";
import { GoogleDriveProvider } from "~/app/organizer/email-generator/_contexts/GoogleDriveContext";
import { ThemeProvider } from "~/app/organizer/email-generator/_contexts/ThemeContext";

export default function EmailGeneratorProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider>
      <ApiProvider>
        <GoogleDriveProvider>
          {children}
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: "#363636",
                color: "#fff",
              },
            }}
          />
        </GoogleDriveProvider>
      </ApiProvider>
    </ThemeProvider>
  );
}
