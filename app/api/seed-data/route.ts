import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = (session.user as any).id;

    // Get or create business
    let business = await prisma.business.findUnique({
      where: { userId },
    });

    if (!business) {
      business = await prisma.business.create({
        data: {
          name: "Limen Lakay",
          userId,
        },
      });
    }

    // Create sample customers
    const customers = await Promise.all([
      prisma.customer.create({
        data: {
          businessId: business.id,
          name: "Sarah Johnson",
          email: "sarah.johnson@email.com",
          phone: "(555) 123-4567",
          address: "123 Main St, New York, NY 10001",
        },
      }),
      prisma.customer.create({
        data: {
          businessId: business.id,
          name: "Michael Chen",
          email: "michael.chen@email.com",
          phone: "(555) 234-5678",
          address: "456 Oak Ave, Los Angeles, CA 90001",
        },
      }),
      prisma.customer.create({
        data: {
          businessId: business.id,
          name: "Emily Rodriguez",
          email: "emily.r@email.com",
          phone: "(555) 345-6789",
          address: "789 Pine Rd, Chicago, IL 60601",
        },
      }),
    ]);

    // Create sample products
    const products = await Promise.all([
      prisma.product.create({
        data: {
          businessId: business.id,
          name: "Lavender Bliss Candle",
          sku: "LAV-001",
          type: "finished_good",
          quantity: 50,
          unit: "units",
          costPerUnit: 8.50,
          retailPrice: 24.99,
        },
      }),
      prisma.product.create({
        data: {
          businessId: business.id,
          name: "Vanilla Dream Candle",
          sku: "VAN-001",
          type: "finished_good",
          quantity: 45,
          unit: "units",
          costPerUnit: 7.75,
          retailPrice: 22.99,
        },
      }),
      prisma.product.create({
        data: {
          businessId: business.id,
          name: "Citrus Burst Candle",
          sku: "CIT-001",
          type: "finished_good",
          quantity: 30,
          unit: "units",
          costPerUnit: 9.25,
          retailPrice: 26.99,
        },
      }),
    ]);

    // Create sample orders (last 3 months)
    const now = new Date();
    const orders = [];

    // Month 1 (3 months ago) - 5 orders
    for (let i = 0; i < 5; i++) {
      const orderDate = new Date(now.getFullYear(), now.getMonth() - 3, Math.floor(Math.random() * 28) + 1);
      const customer = customers[Math.floor(Math.random() * customers.length)];
      const product = products[Math.floor(Math.random() * products.length)];
      const quantity = Math.floor(Math.random() * 3) + 1;
      
      const subtotal = (product.retailPrice || 0) * quantity;
      const tax = subtotal * 0.08;
      const shipping = 8.99;
      const total = subtotal + tax + shipping;

      const order = await prisma.order.create({
        data: {
          businessId: business.id,
          customerId: customer.id,
          orderNumber: `ORD-${1000 + i}`,
          orderDate,
          status: "completed",
          paymentStatus: "paid",
          subtotal,
          tax,
          shipping,
          total,
          items: {
            create: {
              productName: product.name,
              quantity,
              unitPrice: product.retailPrice || 0,
              total: (product.retailPrice || 0) * quantity,
            },
          },
        },
      });
      orders.push(order);
    }

    // Month 2 (2 months ago) - 8 orders
    for (let i = 0; i < 8; i++) {
      const orderDate = new Date(now.getFullYear(), now.getMonth() - 2, Math.floor(Math.random() * 28) + 1);
      const customer = customers[Math.floor(Math.random() * customers.length)];
      const product = products[Math.floor(Math.random() * products.length)];
      const quantity = Math.floor(Math.random() * 4) + 1;
      
      const subtotal = (product.retailPrice || 0) * quantity;
      const tax = subtotal * 0.08;
      const shipping = 8.99;
      const total = subtotal + tax + shipping;

      const order = await prisma.order.create({
        data: {
          businessId: business.id,
          customerId: customer.id,
          orderNumber: `ORD-${1005 + i}`,
          orderDate,
          status: "completed",
          paymentStatus: "paid",
          subtotal,
          tax,
          shipping,
          total,
          items: {
            create: {
              productName: product.name,
              quantity,
              unitPrice: product.retailPrice || 0,
              total: (product.retailPrice || 0) * quantity,
            },
          },
        },
      });
      orders.push(order);
    }

    // Month 3 (last month) - 12 orders
    for (let i = 0; i < 12; i++) {
      const orderDate = new Date(now.getFullYear(), now.getMonth() - 1, Math.floor(Math.random() * 28) + 1);
      const customer = customers[Math.floor(Math.random() * customers.length)];
      const product = products[Math.floor(Math.random() * products.length)];
      const quantity = Math.floor(Math.random() * 5) + 1;
      
      const subtotal = (product.retailPrice || 0) * quantity;
      const tax = subtotal * 0.08;
      const shipping = 8.99;
      const total = subtotal + tax + shipping;

      const order = await prisma.order.create({
        data: {
          businessId: business.id,
          customerId: customer.id,
          orderNumber: `ORD-${1013 + i}`,
          orderDate,
          status: Math.random() > 0.1 ? "completed" : "pending",
          paymentStatus: Math.random() > 0.1 ? "paid" : "pending",
          subtotal,
          tax,
          shipping,
          total,
          items: {
            create: {
              productName: product.name,
              quantity,
              unitPrice: product.retailPrice || 0,
              total: (product.retailPrice || 0) * quantity,
            },
          },
        },
      });
      orders.push(order);
    }

    // Create sample expenses
    await Promise.all([
      prisma.expense.create({
        data: {
          businessId: business.id,
          category: "supplies",
          description: "Soy wax bulk purchase",
          amount: 350.00,
          date: new Date(now.getFullYear(), now.getMonth() - 2, 15),
        },
      }),
      prisma.expense.create({
        data: {
          businessId: business.id,
          category: "supplies",
          description: "Essential oils and fragrances",
          amount: 280.00,
          date: new Date(now.getFullYear(), now.getMonth() - 1, 10),
        },
      }),
      prisma.expense.create({
        data: {
          businessId: business.id,
          category: "packaging",
          description: "Candle jars and labels",
          amount: 185.00,
          date: new Date(now.getFullYear(), now.getMonth() - 1, 20),
        },
      }),
      prisma.expense.create({
        data: {
          businessId: business.id,
          category: "marketing",
          description: "Social media ads",
          amount: 150.00,
          date: new Date(now.getFullYear(), now.getMonth(), 5),
        },
      }),
    ]);

    return NextResponse.json({
      success: true,
      data: {
        customers: customers.length,
        products: products.length,
        orders: orders.length,
        message: "Sample data created successfully!",
      },
    });
  } catch (error) {
    console.error("Seed data error:", error);
    return NextResponse.json(
      { error: "Failed to create sample data" },
      { status: 500 }
    );
  }
}
