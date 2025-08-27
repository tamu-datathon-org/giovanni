import { redirect } from "next/navigation";
import { authClient } from "@vanni/auth/client";
import { Button } from "@vanni/ui/button";

export function LoginButton({
  connectionId,
  searchParams,
  buttonText,
}: {
  connectionId: string;
  searchParams?: { callbackUrl: string | undefined };
  buttonText: string;
}) {
  return (
    <Button
      className="compStyling border border-black bg-[#f5f5f5] text-black hover:bg-[#e4e3e4] hover:text-black"
      size="lg"
      formAction={async (formData) => {
        "use server";
        await authClient.signIn.social({
          provider: "google"
        });
      }}
    >
      {buttonText}
    </Button>
  );
}
