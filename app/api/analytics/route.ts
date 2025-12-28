import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = (session.user as any).id;

    // Get user's business
    const business = await prisma.business.findUnique({
      where: { userId },
      include: {
        orders: {
          include: {
            items: true,
            customer: true,
          },
        },
        products: true,
        customers: true,
        expenses: true,
      },
    });

    if (!business) {
      return NextResponse.json({ error: "Business not found" }, { status: 404 });
    }

    // Calculate metrics
    const totalRevenue = business.orders
      .filter(order => order.paymentStatus === 'paid')
      .reduce((sum, order) => sum + order.total, 0);

    const totalOrders = business.orders.length;
    const paidOrders = business.orders.filter(order => order.paymentStatus === 'paid').length;
    const pendingOrders = business.orders.filter(order => order.status === 'pending').length;

    const totalExpenses = business.expenses.reduce((sum, expense) => sum + expense.amount, 0);
    const netProfit = totalRevenue - totalExpenses;

    const totalCustomers = business.customers.length;
    
    // New customers this month
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const newCustomersThisMonth = business.customers.filter(
      customer => new Date(customer.createdAt) >= startOfMonth
    ).length;

    // Average order value
    const avgOrderValue = paidOrders > 0 ? totalRevenue / paidOrders : 0;

    // Top products
    const productSales = new Map<string, { name: string; quantity: number; revenue: number }>();
    
    business.orders
      .filter(order => order.paymentStatus === 'paid')
      .forEach(order => {
        order.items.forEach(item => {
          const existing = productSales.get(item.productName) || { 
            name: item.productName, 
            quantity: 0, 
            revenue: 0 
          };
          existing.quantity += item.quantity;
          existing.revenue += item.total;
          productSales.set(item.productName, existing);
        });
      });

    const topProducts = Array.from(productSales.values())
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 5);

    // Monthly revenue (last 6 months)
    const monthlyRevenue = [];
    for (let i = 5; i >= 0; i--) {
      const monthStart = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthEnd = new Date(now.getFullYear(), now.getMonth() - i + 1, 0);
      
      const monthOrders = business.orders.filter(order => {
        const orderDate = new Date(order.orderDate);
        return order.paymentStatus === 'paid' && 
               orderDate >= monthStart && 
               orderDate <= monthEnd;
      });

      const revenue = monthOrders.reduce((sum, order) => sum + order.total, 0);
      const orderCount = monthOrders.length;
      
      monthlyRevenue.push({
        month: monthStart.toLocaleString('default', { month: 'short', year: 'numeric' }),
        revenue,
        orders: orderCount,
      });
    }

    // Recent orders (last 10)
    const recentOrders = business.orders
      .sort((a, b) => new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime())
      .slice(0, 10)
      .map(order => ({
        id: order.id,
        orderNumber: order.orderNumber,
        customer: order.customer?.name || 'Guest',
        total: order.total,
        status: order.status,
        paymentStatus: order.paymentStatus,
        date: order.orderDate,
      }));

    const analytics = {
      overview: {
        totalRevenue,
        totalOrders,
        paidOrders,
        pendingOrders,
        totalExpenses,
        netProfit,
        totalCustomers,
        newCustomersThisMonth,
        avgOrderValue,
        profitMargin: totalRevenue > 0 ? ((netProfit / totalRevenue) * 100) : 0,
      },
      topProducts,
      monthlyRevenue,
      recentOrders,
    };

    return NextResponse.json(analytics);
  } catch (error) {
    console.error("Analytics error:", error);
    return NextResponse.json(
      { error: "Failed to fetch analytics" },
      { status: 500 }
    );
  }
}
