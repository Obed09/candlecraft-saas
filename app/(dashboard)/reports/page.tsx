"use client";

import { useEffect, useState } from "react";
import { BarChart3, TrendingUp, DollarSign, ShoppingCart, Users, Package, Download, HelpCircle } from "lucide-react";
import * as Tooltip from '@radix-ui/react-tooltip';

interface AnalyticsData {
  overview: {
    totalRevenue: number;
    totalOrders: number;
    paidOrders: number;
    pendingOrders: number;
    totalExpenses: number;
    netProfit: number;
    totalCustomers: number;
    newCustomersThisMonth: number;
    avgOrderValue: number;
    profitMargin: number;
  };
  topProducts: Array<{
    name: string;
    quantity: number;
    revenue: number;
  }>;
  monthlyRevenue: Array<{
    month: string;
    revenue: number;
    orders: number;
  }>;
  recentOrders: Array<{
    id: string;
    orderNumber: string;
    customer: string;
    total: number;
    status: string;
    paymentStatus: string;
    date: Date;
  }>;
}

export default function ReportsPage() {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [seeding, setSeeding] = useState(false);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/analytics");
      if (response.ok) {
        const data = await response.json();
        setAnalytics(data);
      }
    } catch (error) {
      console.error("Failed to fetch analytics:", error);
    } finally {
      setLoading(false);
    }
  };

  const seedSampleData = async () => {
    if (!confirm("This will create sample customers, products, and orders for demo purposes. Continue?")) {
      return;
    }

    try {
      setSeeding(true);
      const response = await fetch("/api/seed-data", { method: "POST" });
      if (response.ok) {
        alert("Sample data created successfully! Refreshing analytics...");
        await fetchAnalytics();
      } else {
        alert("Failed to create sample data. Please try again.");
      }
    } catch (error) {
      console.error("Seed error:", error);
      alert("An error occurred while creating sample data.");
    } finally {
      setSeeding(false);
    }
  };

  const exportToPDF = () => {
    alert("PDF export coming soon! This will generate a comprehensive report.");
  };

  const exportToExcel = () => {
    alert("Excel export coming soon! This will export all analytics data.");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
          <p className="text-gray-600">Loading analytics...</p>
        </div>
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className="max-w-7xl mx-auto p-8">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-8 text-center">
          <BarChart3 className="w-16 h-16 text-yellow-600 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">No Data Available</h2>
          <p className="text-gray-600 mb-6">
            Start creating orders and tracking expenses to see your analytics here, or try sample data to see how it works.
          </p>
          <button
            onClick={seedSampleData}
            disabled={seeding}
            className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {seeding ? "Creating Sample Data..." : "Load Sample Data"}
          </button>
        </div>
      </div>
    );
  }

  const { overview, topProducts, monthlyRevenue, recentOrders } = analytics;

  return (
    <Tooltip.Provider delayDuration={200}>
    <div className="max-w-7xl mx-auto p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-2">
            Analytics & Reports
            <Tooltip.Root>
              <Tooltip.Trigger asChild>
                <HelpCircle className="w-6 h-6 text-purple-500 hover:text-purple-600 cursor-help" />
              </Tooltip.Trigger>
              <Tooltip.Portal>
                <Tooltip.Content 
                  side="right" 
                  className="bg-white text-gray-900 px-4 py-3 rounded-lg shadow-xl text-sm max-w-xs z-[9999]"
                  sideOffset={5}
                >
                  Track business performance with comprehensive analytics. View revenue metrics, best-selling products, customer trends, and profit margins. Export reports to PDF.
                  <Tooltip.Arrow className="fill-white" />
                </Tooltip.Content>
              </Tooltip.Portal>
            </Tooltip.Root>
          </h1>
          <p className="text-gray-600">Track your business performance and insights</p>
        </div>
        
        <div className="flex gap-3 mt-4 md:mt-0">
          <button
            onClick={exportToPDF}
            className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
          >
            <Download className="w-4 h-4" />
            Export PDF
          </button>
          <button
            onClick={exportToExcel}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            <Download className="w-4 h-4" />
            Export Excel
          </button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-br from-purple-500 to-purple-700 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <DollarSign className="w-8 h-8 opacity-80" />
            <span className="text-sm opacity-80">Total Revenue</span>
          </div>
          <div className="text-3xl font-bold mb-1">
            ${overview.totalRevenue.toFixed(2)}
          </div>
          <div className="text-sm opacity-80">
            {overview.paidOrders} paid orders
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <ShoppingCart className="w-8 h-8 opacity-80" />
            <span className="text-sm opacity-80">Total Orders</span>
          </div>
          <div className="text-3xl font-bold mb-1">
            {overview.totalOrders}
          </div>
          <div className="text-sm opacity-80">
            {overview.pendingOrders} pending
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-700 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <TrendingUp className="w-8 h-8 opacity-80" />
            <span className="text-sm opacity-80">Net Profit</span>
          </div>
          <div className="text-3xl font-bold mb-1">
            ${overview.netProfit.toFixed(2)}
          </div>
          <div className="text-sm opacity-80">
            {overview.profitMargin.toFixed(1)}% margin
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-orange-700 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <Users className="w-8 h-8 opacity-80" />
            <span className="text-sm opacity-80">Customers</span>
          </div>
          <div className="text-3xl font-bold mb-1">
            {overview.totalCustomers}
          </div>
          <div className="text-sm opacity-80">
            +{overview.newCustomersThisMonth} this month
          </div>
        </div>
      </div>

      {/* Additional Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-purple-600" />
            </div>
            <span className="text-gray-600 font-medium">Avg Order Value</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">
            ${overview.avgOrderValue.toFixed(2)}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-red-600" />
            </div>
            <span className="text-gray-600 font-medium">Total Expenses</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">
            ${overview.totalExpenses.toFixed(2)}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-green-600" />
            </div>
            <span className="text-gray-600 font-medium">Profit Margin</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">
            {overview.profitMargin.toFixed(1)}%
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Revenue Trend */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-purple-600" />
            Revenue Trend (Last 6 Months)
          </h3>
          <div className="space-y-4">
            {monthlyRevenue.map((month, index) => (
              <div key={index} className="relative">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">{month.month}</span>
                  <span className="text-sm font-bold text-gray-900">${month.revenue.toFixed(0)}</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-purple-500 to-purple-600 h-full rounded-full transition-all"
                    style={{
                      width: `${Math.min(100, (month.revenue / Math.max(...monthlyRevenue.map(m => m.revenue))) * 100)}%`
                    }}
                  ></div>
                </div>
                <div className="text-xs text-gray-500 mt-1">{month.orders} orders</div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Package className="w-5 h-5 text-purple-600" />
            Top 5 Products
          </h3>
          {topProducts.length > 0 ? (
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">{product.name}</div>
                    <div className="text-sm text-gray-600">{product.quantity} units sold</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-gray-900">${product.revenue.toFixed(2)}</div>
                    <div className="text-xs text-gray-500">revenue</div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <Package className="w-12 h-12 mx-auto mb-2 opacity-30" />
              <p>No product sales yet</p>
            </div>
          )}
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <ShoppingCart className="w-5 h-5 text-purple-600" />
          Recent Orders
        </h3>
        {recentOrders.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Order #</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Customer</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Date</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Total</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Status</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Payment</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm font-medium text-gray-900">{order.orderNumber}</td>
                    <td className="py-3 px-4 text-sm text-gray-700">{order.customer}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">
                      {new Date(order.date).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4 text-sm font-semibold text-gray-900">
                      ${order.total.toFixed(2)}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                        order.status === 'completed' ? 'bg-green-100 text-green-700' :
                        order.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                        order.status === 'processing' ? 'bg-blue-100 text-blue-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                        order.paymentStatus === 'paid' ? 'bg-green-100 text-green-700' :
                        order.paymentStatus === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {order.paymentStatus}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500">
            <ShoppingCart className="w-16 h-16 mx-auto mb-3 opacity-30" />
            <p className="text-lg font-medium mb-1">No orders yet</p>
            <p className="text-sm">Orders will appear here once you start selling</p>
          </div>
        )}
      </div>
    </div>
    </Tooltip.Provider>
  );
}
