import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/apiMiddleware";
import { prisma } from "@/lib/prisma";

// Sensible defaults for the vessel calculator so the UI always has values to
// render before a Business ever saves its own configuration. These are defaults
// supplied to the client — nothing is persisted until the user saves (PUT).
const DEFAULT_CONFIG = {
  waxPrice: null,
  fragrancePrice: null,
  cementPrice: null,
  wickPrice: null,
  paintPrice: null,
  defaultFillPercent: 90,
  defaultFragranceLoad: 6,
  currency: "USD",
};

export async function GET() {
  const auth = await requireAuth();
  if (auth.error) return auth.error;

  const userId = auth.userId!;

  try {
    const business = await prisma.business.findUnique({ where: { userId } });

    if (!business) {
      return NextResponse.json({ error: "Business not found" }, { status: 404 });
    }

    const config = await prisma.businessConfig.findUnique({
      where: { businessId: business.id },
    });

    return NextResponse.json({
      config: config
        ? config
        : { id: null, businessId: business.id, ...DEFAULT_CONFIG },
      persisted: Boolean(config),
    });
  } catch (error) {
    console.error("Get calculator config error:", error);
    return NextResponse.json({ error: "Failed to fetch calculator config" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  const auth = await requireAuth();
  if (auth.error) return auth.error;

  const userId = auth.userId!;

  try {
    const business = await prisma.business.findUnique({ where: { userId } });

    if (!business) {
      return NextResponse.json({ error: "Business not found" }, { status: 404 });
    }

    const body = await request.json();
    const {
      waxPrice,
      fragrancePrice,
      cementPrice,
      wickPrice,
      paintPrice,
      defaultFillPercent,
      defaultFragranceLoad,
      currency,
    } = body;

    const data: Record<string, unknown> = {};
    if (waxPrice !== undefined) data.waxPrice = waxPrice !== null ? parseFloat(waxPrice) : null;
    if (fragrancePrice !== undefined)
      data.fragrancePrice = fragrancePrice !== null ? parseFloat(fragrancePrice) : null;
    if (cementPrice !== undefined)
      data.cementPrice = cementPrice !== null ? parseFloat(cementPrice) : null;
    if (wickPrice !== undefined)
      data.wickPrice = wickPrice !== null ? parseFloat(wickPrice) : null;
    if (paintPrice !== undefined)
      data.paintPrice = paintPrice !== null ? parseFloat(paintPrice) : null;
    if (defaultFillPercent !== undefined)
      data.defaultFillPercent =
        defaultFillPercent !== null ? parseFloat(defaultFillPercent) : null;
    if (defaultFragranceLoad !== undefined)
      data.defaultFragranceLoad =
        defaultFragranceLoad !== null ? parseFloat(defaultFragranceLoad) : null;
    if (currency !== undefined) data.currency = currency;

    // Upsert so the first save creates the row and later saves update it,
    // always scoped to this Business.
    const config = await prisma.businessConfig.upsert({
      where: { businessId: business.id },
      update: data,
      create: {
        businessId: business.id,
        ...data,
      },
    });

    return NextResponse.json({ config });
  } catch (error) {
    console.error("Save calculator config error:", error);
    return NextResponse.json({ error: "Failed to save calculator config" }, { status: 500 });
  }
}
