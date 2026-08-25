import { prisma } from "@/lib/prisma";

const OPEN_ACCESS_EMAIL = "open-access@candlepilots.com";

export type OpenAccessUser = {
  id: string;
  email: string;
  name: string;
  role: string;
  businessId: string;
  subscriptionPlan: string;
  subscriptionStatus: string;
};

export const FALLBACK_OPEN_ACCESS_USER: OpenAccessUser = {
  id: "open-access",
  email: OPEN_ACCESS_EMAIL,
  name: "CandlePilots",
  role: "ADMIN",
  businessId: "",
  subscriptionPlan: "pro",
  subscriptionStatus: "active",
};

function toOpenAccessUser(user: {
  id: string;
  email: string | null;
  name: string | null;
  role: string;
  business?: {
    id: string;
    subscription?: { plan: string; status: string } | null;
  } | null;
}): OpenAccessUser {
  return {
    id: user.id,
    email: user.email || OPEN_ACCESS_EMAIL,
    name: user.name || "CandlePilots",
    role: user.role || "ADMIN",
    businessId: user.business?.id || "",
    subscriptionPlan: user.business?.subscription?.plan || "pro",
    subscriptionStatus: user.business?.subscription?.status || "active",
  };
}

export async function getOrCreateOpenAccessUser(): Promise<OpenAccessUser> {
  try {
    const include = {
      business: {
        include: {
          subscription: true,
        },
      },
    } as const;

    const admin = await prisma.user.findFirst({
      where: { role: "ADMIN" },
      include,
      orderBy: { createdAt: "asc" },
    });
    if (admin) return toOpenAccessUser(admin);

    const existing = await prisma.user.findFirst({
      include,
      orderBy: { createdAt: "asc" },
    });
    if (existing) return toOpenAccessUser(existing);

    const created = await prisma.user.create({
      data: {
        email: OPEN_ACCESS_EMAIL,
        name: "CandlePilots",
        role: "ADMIN",
        emailVerified: new Date(),
        business: {
          create: {
            name: "CandlePilots",
            subscription: {
              create: {
                plan: "pro",
                status: "active",
              },
            },
          },
        },
      },
      include,
    });

    return toOpenAccessUser(created);
  } catch (error) {
    console.error("Open access user lookup failed, using fallback workspace", error);
    return FALLBACK_OPEN_ACCESS_USER;
  }
}
