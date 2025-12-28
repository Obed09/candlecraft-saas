"use client";

import { useState } from "react";
import { BarChart3, TrendingUp, DollarSign, ShoppingCart, Download } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface SalesData {
  month: string;
  revenue: number;
  orders: number;
  newCustomers: number;
}

const salesData: SalesData[] = [
  { month: "Jan", revenue: 2450, orders: 35, newCustomers: 8 },
  { month: "Feb", revenue: 2890, orders: 41, newCustomers: 12 },
  { month: "Mar", revenue: 3120, orders: 44, newCustomers: 10 },
  { month: "Apr", revenue: 3580, orders: 51, newCustomers: 15 },
  { month: "May", revenue: 4200, orders: 60, newCustomers: 18 },
  { month: "Jun", revenue: 4850, orders: 69, newCustomers: 22 },
  { month: "Jul", revenue: 5320, orders: 76, newCustomers: 20 },
  { month: "Aug", revenue: 5100, orders: 73, newCustomers: 16 },
  { month: "Sep", revenue: 4680, orders: 67, newCustomers: 14 },
  { month: "Oct", revenue: 5890, orders: 84, newCustomers: 25 },
  { month: "Nov", revenue: 6420, orders: 92, newCustomers: 28 },
  { month: "Dec", revenue: 7200, orders: 103, newCustomers: 32 },
];

export default function AnalyticsManager() {
  const [timeframe, setTimeframe] = useState<"week" | "month" | "quarter" | "year">("month");

  const totalRevenue = salesData.reduce((sum, d) => sum + d.revenue, 0);
  const totalOrders = salesData.reduce((sum, d) => sum + d.orders, 0);
  const totalCustomers = salesData.reduce((sum, d) => sum + d.newCustomers, 0);
  const avgOrderValue = totalRevenue / totalOrders;
  
  const recentMonths = salesData.slice(-6);
  const growthRate = ((salesData[salesData.length - 1].revenue - salesData[salesData.length - 2].revenue) / salesData[salesData.length - 2].revenue * 100);

  const topProducts = [
    { name: "Lavender Dreams", units: 145, revenue: 2900 },
    { name: "Vanilla Bliss", units: 128, revenue: 2560 },
    { name: "Ocean Breeze", units: 112, revenue: 2240 },
    { name: "Autumn Spice", units: 98, revenue: 1960 },
    { name: "Fresh Linen", units: 87, revenue: 1740 },
  ];

  const exportReport = () => {
    try {
      const report = {
        generatedAt: new Date().toISOString(),
        timeframe,
        summary: {
          totalRevenue,
          totalOrders,
          totalCustomers,
          avgOrderValue,
          growthRate,
        },
        monthlyData: salesData,
        topProducts,
      };

      const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `analytics-report-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      alert('Report exported successfully! Check your downloads folder.');
    } catch (error) {
      console.error('Export failed:', error);
      alert('Failed to export report. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center shadow-lg">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            Analytics & Reports
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Detailed analytics and business insights</p>
        </div>
        <button
          onClick={exportReport}
          className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5 flex items-center gap-2"
        >
          <Download className="w-5 h-5" />
          Export Report
        </button>
      </div>

      {/* Timeframe Selector */}
      <div className="flex gap-2">
        {(["week", "month", "quarter", "year"] as const).map((tf) => (
          <button
            key={tf}
            onClick={() => setTimeframe(tf)}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              timeframe === tf
                ? "bg-purple-600 text-white shadow-lg"
                : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700"
            }`}
          >
            {tf.charAt(0).toUpperCase() + tf.slice(1)}
          </button>
        ))}
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/50 rounded-xl flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <span className="text-green-600 dark:text-green-400 font-semibold text-sm">+{growthRate.toFixed(1)}%</span>
            </div>
            <div className="text-sm text-green-700 dark:text-green-300 mb-1">Total Revenue</div>
            <div className="text-3xl font-bold text-green-900 dark:text-green-100">${totalRevenue.toLocaleString()}</div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/50 rounded-xl flex items-center justify-center">
                <ShoppingCart className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <TrendingUp className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="text-sm text-blue-700 dark:text-blue-300 mb-1">Total Orders</div>
            <div className="text-3xl font-bold text-blue-900 dark:text-blue-100">{totalOrders}</div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/50 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <span className="text-purple-600 dark:text-purple-400 font-semibold text-sm">Avg</span>
            </div>
            <div className="text-sm text-purple-700 dark:text-purple-300 mb-1">Order Value</div>
            <div className="text-3xl font-bold text-purple-900 dark:text-purple-100">${avgOrderValue.toFixed(0)}</div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/50 rounded-xl flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              </div>
              <TrendingUp className="w-5 h-5 text-orange-600 dark:text-orange-400" />
            </div>
            <div className="text-sm text-orange-700 dark:text-orange-300 mb-1">New Customers</div>
            <div className="text-3xl font-bold text-orange-900 dark:text-orange-100">{totalCustomers}</div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <Card className="border-0 shadow-lg bg-white dark:bg-gray-900">
          <CardHeader>
            <CardTitle className="text-gray-900 dark:text-white">Revenue Trend</CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400">Monthly revenue over the past 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-end justify-between gap-2">
              {recentMonths.map((data, idx) => {
                const maxRevenue = Math.max(...recentMonths.map(d => d.revenue));
                const height = (data.revenue / maxRevenue) * 100;
                return (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                    <div className="w-full bg-gradient-to-t from-purple-600 to-indigo-600 rounded-t-lg hover:from-purple-700 hover:to-indigo-700 transition-all relative group" style={{ height: `${height}%` }}>
                      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        ${data.revenue.toLocaleString()}
                      </div>
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400 font-medium">{data.month}</div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Top Products */}
        <Card className="border-0 shadow-lg bg-white dark:bg-gray-900">
          <CardHeader>
            <CardTitle className="text-gray-900 dark:text-white">Top Products</CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400">Best selling products this period</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProducts.map((product, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-purple-600 text-white rounded-lg flex items-center justify-center font-bold">
                      #{idx + 1}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 dark:text-white">{product.name}</div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">{product.units} units sold</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-green-600 dark:text-green-400">${product.revenue.toLocaleString()}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Performance Table */}
      <Card className="border-0 shadow-lg bg-white dark:bg-gray-900">
        <CardHeader>
          <CardTitle className="text-gray-900 dark:text-white">Monthly Performance</CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-400">Detailed breakdown by month</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Month</th>
                  <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900 dark:text-white">Revenue</th>
                  <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900 dark:text-white">Orders</th>
                  <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900 dark:text-white">New Customers</th>
                  <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900 dark:text-white">Avg Order</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {salesData.slice(-6).map((data, idx) => (
                  <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">{data.month} 2025</td>
                    <td className="px-6 py-4 text-sm text-right font-semibold text-green-600 dark:text-green-400">${data.revenue.toLocaleString()}</td>
                    <td className="px-6 py-4 text-sm text-right text-gray-900 dark:text-gray-300">{data.orders}</td>
                    <td className="px-6 py-4 text-sm text-right text-gray-900 dark:text-gray-300">{data.newCustomers}</td>
                    <td className="px-6 py-4 text-sm text-right text-purple-600 dark:text-purple-400 font-semibold">${(data.revenue / data.orders).toFixed(0)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
      </div>
    </div>
  );
}
