import { signIn } from "@vanni/auth";
import { Button } from "@vanni/ui/button";

export default function LoginButton({
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