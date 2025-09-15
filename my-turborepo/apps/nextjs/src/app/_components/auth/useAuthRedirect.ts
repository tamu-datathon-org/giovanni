import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { authClient } from '@vanni/auth/client';

export function useAuthRedirect() {
  const [session, setSession] = useState<{
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
  } | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    async function fetchSession() {
      const { data } = await authClient.getSession();
      if (!data) {
        router.push(`/login?callbackUrl=${encodeURIComponent(pathname)}`);
      }
      setSession(data);
    }
    fetchSession();
  }, [router, pathname]);

  return { session, setSession };
}
