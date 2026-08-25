import { NextRequest, NextResponse } from "next/server";
import { requireAuth, requireResourceLimit } from "@/lib/apiMiddleware";
import { prisma } from "@/lib/prisma";

// Get all products for the user's business
export async function GET() {
  const auth = await requireAuth();
  if (auth.error) return auth.error;

  const userId = auth.userId!;

  try {
    const business = await prisma.business.findUnique({ where: { userId } });

    if (!business) {
      return NextResponse.json({ error: "Business not found" }, { status: 404 });
    }

    const products = await prisma.product.findMany({
      where: { businessId: business.id },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ products });
  } catch (error) {
    console.error("Get products error:", error);
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}

// Create a new product
export async function POST(request: NextRequest) {
  const auth = await requireAuth();
  if (auth.error) return auth.error;

  const userId = auth.userId!;

  const limitCheck = await requireResourceLimit(userId, "products");
  if (limitCheck.error) return limitCheck.error;

  try {
    const business = await prisma.business.findUnique({ where: { userId } });

    if (!business) {
      return NextResponse.json({ error: "Business not found" }, { status: 404 });
    }

    const body = await request.json();
    const {
      name,
      sku,
      description,
      type,
      quantity,
      unit,
      reorderPoint,
      costPerUnit,
      retailPrice,
      weightOz,
      burnTimeHours,
      fragrance,
      color,
    } = body;

    if (!name || !type) {
      return NextResponse.json(
        { error: "Name and type are required" },
        { status: 400 }
      );
    }

    const product = await prisma.product.create({
      data: {
        businessId: business.id,
        name,
        sku: sku || null,
        description: description || null,
        type,
        quantity: quantity ? parseFloat(quantity) : 0,
        unit: unit || "units",
        reorderPoint: reorderPoint ? parseFloat(reorderPoint) : null,
        costPerUnit: costPerUnit ? parseFloat(costPerUnit) : 0,
        retailPrice: retailPrice ? parseFloat(retailPrice) : null,
        weightOz: weightOz ? parseFloat(weightOz) : null,
        burnTimeHours: burnTimeHours ? parseInt(burnTimeHours) : null,
        fragrance: fragrance || null,
        color: color || null,
      },
    });

    return NextResponse.json(
      {
        product,
        message: "Product created successfully",
        usage: {
          current: limitCheck.current + 1,
          limit: limitCheck.limit,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Create product error:", error);
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
  }
}
