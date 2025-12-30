import { NextResponse } from "next/server";
import { requireAuth, requireResourceLimit } from "@/lib/apiMiddleware";
import { prisma } from "@/lib/prisma";

// Get all orders for the user's business
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

    // Get orders
    const orders = await prisma.order.findMany({
      where: {
        businessId: business.id,
      },
      include: {
        customer: true,
        items: {
          include: {
            product: true,
          },
        },
      },
      orderBy: {
        orderDate: "desc",
      },
    });

    return NextResponse.json({ orders });
  } catch (error) {
    console.error("Get orders error:", error);
    return NextResponse.json(
      { error: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}

// Create a new order
export async function POST(request: Request) {
  const auth = await requireAuth();
  if (auth.error) return auth.error;

  const userId = auth.userId!;

  // Check order limit
  const limitCheck = await requireResourceLimit(userId, "orders");
  if (limitCheck.error) return limitCheck.error;

  try {
    const body = await request.json();
    const {
      customerId,
      items,
      subtotal,
      tax,
      shipping,
      total,
      paymentMethod,
      notes,
    } = body;

    if (!items || items.length === 0 || !total) {
      return NextResponse.json(
        { error: "Items and total are required" },
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

    // Generate order number
    const orderCount = await prisma.order.count({
      where: { businessId: business.id },
    });
    const orderNumber = `ORD-${Date.now()}-${orderCount + 1}`;

    // Create order with items
    const order = await prisma.order.create({
      data: {
        orderNumber,
        businessId: business.id,
        customerId: customerId || null,
        subtotal: parseFloat(subtotal || total),
        tax: parseFloat(tax || "0"),
        shipping: parseFloat(shipping || "0"),
        total: parseFloat(total),
        paymentMethod,
        notes,
        items: {
          create: items.map((item: any) => ({
            productId: item.productId || null,
            productName: item.productName,
            quantity: parseInt(item.quantity),
            unitPrice: parseFloat(item.unitPrice),
            total: parseFloat(item.total),
          })),
        },
      },
      include: {
        customer: true,
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    return NextResponse.json(
      {
        order,
        message: "Order created successfully",
        usage: {
          current: limitCheck.current + 1,
          limit: limitCheck.limit,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Create order error:", error);
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    );
  }
}
