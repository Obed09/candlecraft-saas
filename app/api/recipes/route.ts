import { NextResponse } from "next/server";
import { requireAuth, requireResourceLimit } from "@/lib/apiMiddleware";
import { prisma } from "@/lib/prisma";

// Get all recipes for the user's business
export async function GET() {
  const auth = await requireAuth();
  if (auth.error) return auth.error;

  const userId = auth.userId!;

  try {
    // Get user's business
    const business = await prisma.business.findUnique({
      where: { userId },
    });

    if (!business) {
      return NextResponse.json(
        { error: "Business not found" },
        { status: 404 }
      );
    }

    // Get recipes
    const recipes = await prisma.recipe.findMany({
      where: {
        businessId: business.id,
      },
      include: {
        ingredients: {
          include: {
            product: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({ recipes });
  } catch (error) {
    console.error("Get recipes error:", error);
    return NextResponse.json(
      { error: "Failed to fetch recipes" },
      { status: 500 }
    );
  }
}

// Create a new recipe
export async function POST(request: Request) {
  const auth = await requireAuth();
  if (auth.error) return auth.error;

  const userId = auth.userId!;

  // Check recipe limit
  const limitCheck = await requireResourceLimit(userId, "recipes");
  if (limitCheck.error) return limitCheck.error;

  try {
    const body = await request.json();
    const {
      name,
      description,
      batchSize,
      unit,
      candleCount,
      containerSize,
      ingredients,
      notes,
    } = body;

    if (!name || !batchSize) {
      return NextResponse.json(
        { error: "Name and batch size are required" },
        { status: 400 }
      );
    }

    // Get user's business
    const business = await prisma.business.findUnique({
      where: { userId },
    });

    if (!business) {
      return NextResponse.json(
        { error: "Business not found" },
        { status: 404 }
      );
    }

    // Create recipe with ingredients
    const recipe = await prisma.recipe.create({
      data: {
        name,
        description,
        batchSize: parseFloat(batchSize),
        unit: unit || "oz",
        candleCount: candleCount ? parseInt(candleCount) : null,
        containerSize: containerSize ? parseFloat(containerSize) : null,
        notes,
        businessId: business.id,
        ingredients: {
          create: ingredients?.map((ing: any) => ({
            productId: ing.productId,
            quantity: parseFloat(ing.quantity),
            unit: ing.unit || "oz",
            percentage: ing.percentage ? parseFloat(ing.percentage) : null,
            notes: ing.notes,
          })) || [],
        },
      },
      include: {
        ingredients: {
          include: {
            product: true,
          },
        },
      },
    });

    return NextResponse.json(
      {
        recipe,
        message: "Recipe created successfully",
        usage: {
          current: limitCheck.current + 1,
          limit: limitCheck.limit,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Create recipe error:", error);
    return NextResponse.json(
      { error: "Failed to create recipe" },
      { status: 500 }
    );
  }
}
