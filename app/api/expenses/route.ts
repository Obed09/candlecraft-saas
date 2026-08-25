import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/apiMiddleware";
import { prisma } from "@/lib/prisma";

// Get all expenses for the user's business
export async function GET() {
  const auth = await requireAuth();
  if (auth.error) return auth.error;

  const userId = auth.userId!;

  try {
    const business = await prisma.business.findUnique({ where: { userId } });

    if (!business) {
      return NextResponse.json({ error: "Business not found" }, { status: 404 });
    }

    const expenses = await prisma.expense.findMany({
      where: { businessId: business.id },
      orderBy: { date: "desc" },
    });

    return NextResponse.json({ expenses });
  } catch (error) {
    console.error("Get expenses error:", error);
    return NextResponse.json({ error: "Failed to fetch expenses" }, { status: 500 });
  }
}

// Create a new expense
export async function POST(request: NextRequest) {
  const auth = await requireAuth();
  if (auth.error) return auth.error;

  const userId = auth.userId!;

  try {
    const business = await prisma.business.findUnique({ where: { userId } });

    if (!business) {
      return NextResponse.json({ error: "Business not found" }, { status: 404 });
    }

    const body = await request.json();
    const { category, description, amount, date, receiptUrl, notes } = body;

    if (!category || !description || amount === undefined) {
      return NextResponse.json(
        { error: "Category, description, and amount are required" },
        { status: 400 }
      );
    }

    const expense = await prisma.expense.create({
      data: {
        businessId: business.id,
        category,
        description,
        amount: parseFloat(amount),
        date: date ? new Date(date) : undefined,
        receiptUrl: receiptUrl || null,
        notes: notes || null,
      },
    });

    return NextResponse.json({ expense }, { status: 201 });
  } catch (error) {
    console.error("Create expense error:", error);
    return NextResponse.json({ error: "Failed to create expense" }, { status: 500 });
  }
}
