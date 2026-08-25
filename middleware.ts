import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

/**
 * Route guard: unauthenticated users are redirected to /sign-in instead of
 * silently being served the shared-admin dashboard.
 */
export async function middleware(req: NextRequest) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET || process.env.AUTH_SECRET,
  });

  const { pathname } = req.nextUrl;

  if (!token) {
    const url = req.nextUrl.clone();
    url.pathname = "/sign-in";
    // Preserve where the user was headed so we can return them after login.
    if (pathname !== "/") {
      url.searchParams.set("callbackUrl", pathname);
    }
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

/**
 * Only guard application routes. Everything below is left alone:
 *  - /api/*        (API routes return their own 401s)
 *  - /_next/* and static assets
 *  - the public auth pages (sign-in/sign-up/forgot/reset) and Stripe
 *    verification so unauthenticated visitors can reach them.
 */
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sign-in|sign-up|forgot-password|reset-password|stripe-verification).*)",
  ],
};
