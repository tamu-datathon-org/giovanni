import { createAuthClient } from 'better-auth/client'
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export const client = createAuthClient();

// Configurable list of protected routes (can be regex or string match)
const protectedRoutes: (string | RegExp)[] = [
    '/test',
    /^\/admin/,
];

function isProtectedRoute(pathname: string) {
    return protectedRoutes.some(route =>
        typeof route === 'string' ? pathname.startsWith(route) : route.test(pathname)
    );
}

export async function authMiddleware(request: NextRequest) {
    const { data: session } = await client.getSession({
        fetchOptions: {
            headers: {
                cookie: request.headers.get('cookie') ?? ""
            }
        }
    });
    const { pathname } = new URL(request.url);
    if (!session && isProtectedRoute(pathname)) {
        return NextResponse.redirect(new URL(`login?callbackUrl=${encodeURIComponent(request.url)}`, request.url));
    }
    return NextResponse.next();
}