import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export type AppSession = {
  user: {
    id: string;
    email: string;
    name: string | null;
    role: string;
    businessId?: string;
    subscriptionPlan?: string;
    subscriptionStatus?: string;
  };
  expires: string;
};

/**
 * Resolves the current authenticated session.
 *
 * Returns `null` for any unauthenticated request — there is intentionally NO
 * fallback/backdoor user. Callers must treat `null` as "not signed in" and
 * either redirect to /sign-in (pages) or return a 401 (API routes).
 */
export async function getAppSession(): Promise<AppSession | null> {
  try {
    const session = await getServerSession(authOptions);

    if (session?.user?.id && session.user.email) {
      return {
        user: {
          id: session.user.id,
          email: session.user.email,
          name: session.user.name || null,
          role: session.user.role || "USER",
          businessId: (session.user as any).businessId || undefined,
          subscriptionPlan: (session.user as any).subscriptionPlan || undefined,
          subscriptionStatus:
            (session.user as any).subscriptionStatus || undefined,
        },
        expires: session.expires,
      };
    }
  } catch (error) {
    console.error("Session lookup failed", error);
  }

  return null;
}
