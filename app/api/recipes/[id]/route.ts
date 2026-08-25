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

const recipeInclude = {
  ingredients: {
    include: {
      product: true,
    },
  },
};

// Get a single recipe by id (scoped to the user's business)
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

    const recipe = await prisma.recipe.findFirst({
      where: { id, businessId: business!.id },
      include: recipeInclude,
    });

    if (!recipe) {
      return NextResponse.json({ error: "Recipe not found" }, { status: 404 });
    }

    return NextResponse.json({ recipe });
  } catch (error) {
    console.error("Get recipe error:", error);
    return NextResponse.json({ error: "Failed to fetch recipe" }, { status: 500 });
  }
}

// Update a recipe by id (scoped to the user's business)
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

    // Verify ownership before updating
    const existing = await prisma.recipe.findFirst({
      where: { id, businessId: business!.id },
    });

    if (!existing) {
      return NextResponse.json({ error: "Recipe not found" }, { status: 404 });
    }

    const body = await request.json();
    const {
      name,
      description,
      batchSize,
      unit,
      candleCount,
      containerSize,
      estimatedCost,
      suggestedPrice,
      notes,
      isActive,
      ingredients,
    } = body;

    const data: Record<string, unknown> = {};

    if (name !== undefined) data.name = name;
    if (description !== undefined) data.description = description;
    if (batchSize !== undefined) data.batchSize = parseFloat(batchSize);
    if (unit !== undefined) data.unit = unit;
    if (candleCount !== undefined)
      data.candleCount = candleCount ? parseInt(candleCount) : null;
    if (containerSize !== undefined)
      data.containerSize = containerSize ? parseFloat(containerSize) : null;
    if (estimatedCost !== undefined)
      data.estimatedCost = estimatedCost ? parseFloat(estimatedCost) : null;
    if (suggestedPrice !== undefined)
      data.suggestedPrice = suggestedPrice ? parseFloat(suggestedPrice) : null;
    if (notes !== undefined) data.notes = notes;
    if (isActive !== undefined) data.isActive = Boolean(isActive);

    // If ingredients are provided, replace the whole set (keeps the recipe's
    // blend/percentages authoritative rather than merging stale rows).
    if (ingredients !== undefined) {
      await prisma.recipeIngredient.deleteMany({ where: { recipeId: id } });

      if (Array.isArray(ingredients) && ingredients.length > 0) {
        await prisma.recipeIngredient.createMany({
          data: ingredients.map((ing: any) => ({
            recipeId: id,
            productId: ing.productId || null,
            name: ing.name,
            quantity: parseFloat(ing.quantity),
            unit: ing.unit || "oz",
            percentage: ing.percentage ? parseFloat(ing.percentage) : null,
            notes: ing.notes,
          })),
        });
      }
    }

    const recipe = await prisma.recipe.update({
      where: { id },
      data,
      include: recipeInclude,
    });

    return NextResponse.json({ recipe });
  } catch (error) {
    console.error("Update recipe error:", error);
    return NextResponse.json({ error: "Failed to update recipe" }, { status: 500 });
  }
}

// Delete a recipe by id (scoped to the user's business)
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

    const existing = await prisma.recipe.findFirst({
      where: { id, businessId: business!.id },
    });

    if (!existing) {
      return NextResponse.json({ error: "Recipe not found" }, { status: 404 });
    }

    await prisma.recipe.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete recipe error:", error);
    return NextResponse.json({ error: "Failed to delete recipe" }, { status: 500 });
  }
}
