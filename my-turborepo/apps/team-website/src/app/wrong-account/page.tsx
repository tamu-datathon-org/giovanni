"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { authClient } from "@vanni/auth/client";
import { Button } from "@vanni/ui/button";

export default function WrongAccountPage() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[#121723] px-4 text-center text-white">
      <h1 className="text-2xl font-bold">Account not allowed for applications</h1>
      <p className="max-w-md text-sm text-white/70">
        The apply portal requires a Texas A&amp;M University email (@tamu.edu).
        Sign out and sign in with a TAMU Google account, or return home.
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <Button
          type="button"
          variant="secondary"
          onClick={() => {
            void authClient.signOut({
              fetchOptions: {
                onSuccess: () => {
                  router.push("/login?callbackUrl=/apply");
                },
              },
            });
          }}
        >
          Sign out and try again
        </Button>
        <Button asChild variant="outline">
          <Link href="/">Home</Link>
        </Button>
      </div>
    </div>
  );
}
