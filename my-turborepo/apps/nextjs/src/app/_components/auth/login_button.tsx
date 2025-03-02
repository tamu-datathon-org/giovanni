import { redirect } from "next/navigation";
import { AuthError } from "next-auth";

import { signIn } from "@vanni/auth";
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
        try {
          await signIn(
            "auth0",
            {
              redirectTo: searchParams?.callbackUrl ?? "",
            },
            {
              connection: connectionId,
            },
          );
        } catch (error) {
          if (error instanceof AuthError) {
            const SIGNIN_ERROR_URL = "/api/auth/error";
            return redirect(`${SIGNIN_ERROR_URL}?error=${error.type}`);
          }
          throw error;
        }
      }}
    >
      {buttonText}
    </Button>
  );
}
