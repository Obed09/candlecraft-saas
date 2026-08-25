import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/apiMiddleware";
import { prisma } from "@/lib/prisma";

/**
 * Resolve the authenticated user's Business. Returns the business or an error
 * response. Everything is scoped to the user's own Business.
 */
async function resolveBusiness(userId: string) {
  const business = await prisma.business.findUnique({ where: { userId } });
  if (!business) {
    return {
      error: NextResponse.json({ error: "Business not found" }, { status: 404 }),
      business: null,
    };
  }
  return { error: null, business };
}

// Get all testing-log entries for the user's business
export async function GET() {
  const auth = await requireAuth();
  if (auth.error) return auth.error;

  const userId = auth.userId!;

  try {
    const { business, error } = await resolveBusiness(userId);
    if (error) return error;

    const tests = await prisma.testLog.findMany({
      where: { businessId: business!.id },
      orderBy: { testDate: "desc" },
    });

    return NextResponse.json({ tests });
  } catch (error) {
    console.error("Get testing log error:", error);
    return NextResponse.json({ error: "Failed to fetch testing log" }, { status: 500 });
  }
}

// Create a new testing-log entry
export async function POST(request: NextRequest) {
  const auth = await requireAuth();
  if (auth.error) return auth.error;

  const userId = auth.userId!;

  try {
    const { business, error } = await resolveBusiness(userId);
    if (error) return error;

    const body = await request.json();
    const {
      name,
      description,
      candleId,
      candleName,
      wickType,
      coldThrow,
      hotThrow,
      burnTime,
      tunnel,
      soot,
      mushroom,
      notes,
      result,
      testDate,
    } = body;

    if (!name) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    const test = await prisma.testLog.create({
      data: {
        businessId: business!.id,
        name,
        description: description || null,
        candleId: candleId || null,
        candleName: candleName || null,
        wickType: wickType || null,
        coldThrow: coldThrow !== undefined && coldThrow !== null ? parseInt(coldThrow) : null,
        hotThrow: hotThrow !== undefined && hotThrow !== null ? parseInt(hotThrow) : null,
        burnTime: burnTime !== undefined && burnTime !== null ? parseInt(burnTime) : null,
        tunnel: tunnel !== undefined ? Boolean(tunnel) : false,
        soot: soot !== undefined ? Boolean(soot) : false,
        mushroom: mushroom !== undefined ? Boolean(mushroom) : false,
        notes: notes || null,
        result: result || null,
        testDate: testDate ? new Date(testDate) : undefined,
      },
    });

    return NextResponse.json({ test }, { status: 201 });
  } catch (error) {
    console.error("Create testing log error:", error);
    return NextResponse.json({ error: "Failed to create testing log entry" }, { status: 500 });
  }
}
