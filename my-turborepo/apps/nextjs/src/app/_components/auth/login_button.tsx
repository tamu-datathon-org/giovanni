"use client";
import { authClient } from "@vanni/auth/client";
import { Button } from "@vanni/ui/button";

interface LoginButtonProps {
  title: string;
  connectionId: string;
  callbackUrl?: string;
  className?: string;
  logo?: React.ReactNode;
}

const LoginButton = ({ connectionId, callbackUrl, title, className, logo }: LoginButtonProps) => {
  async function signInHandler() {
    try {
      const result = await authClient.signIn.oauth2({
        providerId: `auth0-${connectionId}`,
        callbackURL: callbackUrl ?? "/",
        disableRedirect: false,
      });
      console.log('Sign-in successful:', result);
    } catch (error) {
      console.error('Sign-in failed:', error);
    }
  }

  return (
    <Button size="lg" type="button" onClick={signInHandler} className={className}>
      {logo && <span className="mr-2">{logo}</span>}
      {`Continue with ${title}`}
    </Button>
  )
}

export default LoginButton;