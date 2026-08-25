import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/apiMiddleware";
import { prisma } from "@/lib/prisma";

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

// Get a single testing-log entry by id (scoped to the user's business)
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAuth();
  if (auth.error) return auth.error;

  const userId = auth.userId!;

  try {
    const { business, error } = await resolveBusiness(userId);
    if (error) return error;

    const { id } = await params;

    const test = await prisma.testLog.findFirst({
      where: { id, businessId: business!.id },
    });

    if (!test) {
      return NextResponse.json({ error: "Test entry not found" }, { status: 404 });
    }

    return NextResponse.json({ test });
  } catch (error) {
    console.error("Get testing log error:", error);
    return NextResponse.json({ error: "Failed to fetch testing log entry" }, { status: 500 });
  }
}

// Update a testing-log entry by id (scoped to the user's business)
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAuth();
  if (auth.error) return auth.error;

  const userId = auth.userId!;

  try {
    const { business, error } = await resolveBusiness(userId);
    if (error) return error;

    const { id } = await params;

    const existing = await prisma.testLog.findFirst({
      where: { id, businessId: business!.id },
    });

    if (!existing) {
      return NextResponse.json({ error: "Test entry not found" }, { status: 404 });
    }

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

    const data: Record<string, unknown> = {};

    if (name !== undefined) data.name = name;
    if (description !== undefined) data.description = description;
    if (candleId !== undefined) data.candleId = candleId;
    if (candleName !== undefined) data.candleName = candleName;
    if (wickType !== undefined) data.wickType = wickType;
    if (coldThrow !== undefined) data.coldThrow = coldThrow !== null ? parseInt(coldThrow) : null;
    if (hotThrow !== undefined) data.hotThrow = hotThrow !== null ? parseInt(hotThrow) : null;
    if (burnTime !== undefined) data.burnTime = burnTime !== null ? parseInt(burnTime) : null;
    if (tunnel !== undefined) data.tunnel = Boolean(tunnel);
    if (soot !== undefined) data.soot = Boolean(soot);
    if (mushroom !== undefined) data.mushroom = Boolean(mushroom);
    if (notes !== undefined) data.notes = notes;
    if (result !== undefined) data.result = result;
    if (testDate !== undefined) data.testDate = testDate ? new Date(testDate) : null;

    const test = await prisma.testLog.update({
      where: { id },
      data,
    });

    return NextResponse.json({ test });
  } catch (error) {
    console.error("Update testing log error:", error);
    return NextResponse.json({ error: "Failed to update testing log entry" }, { status: 500 });
  }
}

// Delete a testing-log entry by id (scoped to the user's business)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAuth();
  if (auth.error) return auth.error;

  const userId = auth.userId!;

  try {
    const { business, error } = await resolveBusiness(userId);
    if (error) return error;

    const { id } = await params;

    const existing = await prisma.testLog.findFirst({
      where: { id, businessId: business!.id },
    });

    if (!existing) {
      return NextResponse.json({ error: "Test entry not found" }, { status: 404 });
    }

    await prisma.testLog.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete testing log error:", error);
    return NextResponse.json({ error: "Failed to delete testing log entry" }, { status: 500 });
  }
}
