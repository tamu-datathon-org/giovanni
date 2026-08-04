import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { normalizeCallbackPath } from '@vanni/auth/callback-url';
import { authClient } from '@vanni/auth/client';

export type AuthRedirectSession = {
  user: {
    id: string;
    name: string;
    email: string;
    emailVerified: boolean;
    createdAt: Date;
    updatedAt: Date;
    image?: string | null;
  };
  session: {
    id: string;
    createdAt: Date;
    userAgent?: string | null;
  };
};

export function useAuthRedirect() {
  const [session, setSession] = useState<AuthRedirectSession | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    async function fetchSession() {
      const { data } = await authClient.getSession();
      if (!data) {
        router.push(
          `/login?callbackUrl=${encodeURIComponent(normalizeCallbackPath(pathname))}`,
        );
      }
      setSession(data);
    }
    void fetchSession();
  }, [router, pathname]);

  return { session, setSession };
}
