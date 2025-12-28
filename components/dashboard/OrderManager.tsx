"use client";

import { useState } from "react";
import { FileText, Plus, Search, Clock, CheckCircle, XCircle, HelpCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import * as Tooltip from '@radix-ui/react-tooltip';

interface Order {
  id: string;
  customerName: string;
  product: string;
  quantity: number;
  total: number;
  status: "pending" | "processing" | "completed" | "cancelled";
  date: string;
  dueDate: string;
}

const initialOrders: Order[] = [
  {
    id: "ORD-001",
    customerName: "Sarah Johnson",
    product: "Lavender Dreams",
    quantity: 12,
    total: 240.00,
    status: "completed",
    date: "2025-12-10",
    dueDate: "2025-12-15",
  },
  {
    id: "ORD-002",
    customerName: "Michael Chen",
    product: "Vanilla Bliss",
    quantity: 25,
    total: 500.00,
    status: "processing",
    date: "2025-12-15",
    dueDate: "2025-12-20",
  },
  {
    id: "ORD-003",
    customerName: "Emma Davis",
    product: "Ocean Breeze",
    quantity: 8,
    total: 160.00,
    status: "pending",
    date: "2025-12-17",
    dueDate: "2025-12-22",
  },
];

export default function OrderManager() {
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredOrders = orders.filter(order =>
    order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.product.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-green-100 text-green-700";
      case "processing": return "bg-blue-100 text-blue-700";
      case "pending": return "bg-yellow-100 text-yellow-700";
      case "cancelled": return "bg-red-100 text-red-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed": return <CheckCircle className="w-4 h-4" />;
      case "processing": return <Clock className="w-4 h-4" />;
      case "pending": return <Clock className="w-4 h-4" />;
      case "cancelled": return <XCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <Tooltip.Provider delayDuration={200}>
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
              <FileText className="w-6 h-6 text-white" />
            </div>
            Order Manager
            <Tooltip.Root>
              <Tooltip.Trigger asChild>
                <HelpCircle className="w-6 h-6 text-blue-500 hover:text-blue-600 cursor-help" />
              </Tooltip.Trigger>
              <Tooltip.Portal>
                <Tooltip.Content 
                  side="right" 
                  className="bg-white text-gray-900 px-4 py-3 rounded-lg shadow-xl text-sm max-w-xs z-[9999]"
                  sideOffset={5}
                >
                  Track and manage customer orders from start to finish. Monitor order status, update fulfillment progress, and search orders by customer or product.
                  <Tooltip.Arrow className="fill-white" />
                </Tooltip.Content>
              </Tooltip.Portal>
            </Tooltip.Root>
          </h1>
          <p className="text-gray-600 mt-2">Track and manage customer orders</p>
        </div>
        <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5 flex items-center gap-2">
          <Plus className="w-5 h-5" />
          New Order
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        <Input
          type="text"
          placeholder="Search orders by customer, order ID, or product..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-12 py-6 text-lg border-2"
        />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-indigo-50">
          <CardContent className="p-6">
            <div className="text-sm text-blue-700 mb-1">Total Orders</div>
            <div className="text-3xl font-bold text-blue-900">{orders.length}</div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-emerald-50">
          <CardContent className="p-6">
            <div className="text-sm text-green-700 mb-1">Completed</div>
            <div className="text-3xl font-bold text-green-900">
              {orders.filter(o => o.status === "completed").length}
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-lg bg-gradient-to-br from-yellow-50 to-amber-50">
          <CardContent className="p-6">
            <div className="text-sm text-yellow-700 mb-1">Pending</div>
            <div className="text-3xl font-bold text-yellow-900">
              {orders.filter(o => o.status === "pending" || o.status === "processing").length}
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-pink-50">
          <CardContent className="p-6">
            <div className="text-sm text-purple-700 mb-1">Total Revenue</div>
            <div className="text-3xl font-bold text-purple-900">
              ${orders.reduce((sum, o) => sum + o.total, 0).toFixed(0)}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Orders Table */}
      <Card className="border-0 shadow-lg">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Order ID</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Customer</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Product</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Quantity</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Total</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Due Date</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-semibold text-gray-900">{order.id}</div>
                      <div className="text-xs text-gray-500">{new Date(order.date).toLocaleDateString()}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">{order.customerName}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-gray-900">{order.product}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-gray-900">{order.quantity} units</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-semibold text-green-600">${order.total.toFixed(2)}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}>
                        {getStatusIcon(order.status)}
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-gray-900">{new Date(order.dueDate).toLocaleDateString()}</div>
                    </td>
                    <td className="px-6 py-4">
                      <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
    </Tooltip.Provider>
  );
}
