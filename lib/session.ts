import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getOrCreateOpenAccessUser, OpenAccessUser } from "@/lib/openAccess";

export type AppSession = {
  user: OpenAccessUser;
  expires: string;
};

export async function getAppSession(): Promise<AppSession> {
  try {
    const session = await getServerSession(authOptions);

    if (session?.user?.id && session.user.email) {
      return {
        user: {
          id: session.user.id,
          email: session.user.email,
          name: session.user.name || "CandlePilots",
          role: session.user.role || "ADMIN",
          businessId: session.user.businessId || "",
          subscriptionPlan: session.user.subscriptionPlan || "pro",
          subscriptionStatus: session.user.subscriptionStatus || "active",
        },
        expires:
          session.expires ||
          new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
      };
    }
  } catch (error) {
    console.error("Session lookup failed, using open access", error);
  }

  const user = await getOrCreateOpenAccessUser();

  return {
    user,
    expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
  };
}
