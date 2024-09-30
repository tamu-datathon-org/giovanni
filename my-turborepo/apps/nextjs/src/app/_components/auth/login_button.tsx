import { signIn } from "@vanni/auth";
import { Button } from "@vanni/ui/button";

function LoginButton({
  connectionId,
  redirectUri,
  buttonText,
}: {
  connectionId: string;
  redirectUri?: string;
  buttonText: string;
}) {
  return (
    <Button
      className="compStyling2 border border-black bg-[#f5f5f5] text-black hover:bg-[#e4e3e4] hover:text-black"
      size="lg"
      formAction={async () => {
        "use server";
        await signIn("auth0", redirectUri ? { redirectTo: redirectUri } : {}, {
          connection: connectionId,
        });
      }}
    >
      {buttonText}
    </Button>
  );
}
