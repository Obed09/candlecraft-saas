"use client";

import { useState, useEffect } from "react";
import { Package, Plus, AlertTriangle, TrendingDown, TrendingUp, X, RotateCcw, Trash2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import InventoryManager from "@/components/dashboard/InventoryManager";
import * as Tooltip from "@radix-ui/react-tooltip";
import { HelpCircle } from "lucide-react";

export default function InventoryPage() {
  const [showBanner, setShowBanner] = useState(true);

  // Check localStorage on mount
  useEffect(() => {
    const bannerDismissed = localStorage.getItem('inventory-banner-dismissed');
    if (bannerDismissed === 'true') {
      setShowBanner(false);
    }
  }, []);

  const handleDismissBanner = () => {
    setShowBanner(false);
    localStorage.setItem('inventory-banner-dismissed', 'true');
  };

  const handleReset = () => {
    // This page displays static data, so reset would reload example values
    window.location.reload();
  };

  const handleClearAll = () => {
    // Clear all inventory would typically reset to empty state
    // Since this is display-only, we'll just provide feedback
    alert("To clear inventory, use the Inventory Manager component below.");
  };

  const inventoryItems = [
    { name: "Soy Wax", quantity: 45, unit: "lbs", lowStock: false, value: 382.50, trend: "up" },
    { name: "Coconut Wax", quantity: 12, unit: "lbs", lowStock: true, value: 156.00, trend: "down" },
    { name: "Fragrance Oils", quantity: 8, unit: "lbs", lowStock: true, value: 320.00, trend: "down" },
    { name: "Cement", quantity: 25, unit: "lbs", lowStock: false, value: 12.50, trend: "stable" },
    { name: "Wicks (CD-12)", quantity: 150, unit: "pcs", lowStock: false, value: 37.50, trend: "up" },
    { name: "Paint/Color", quantity: 35, unit: "units", lowStock: false, value: 26.25, trend: "stable" },
  ];

  const totalValue = inventoryItems.reduce((sum, item) => sum + item.value, 0);
  const lowStockCount = inventoryItems.filter(item => item.lowStock).length;

  return (
    <Tooltip.Provider delayDuration={200}>
      <div className="space-y-6">
        {/* Info Banner */}
        {showBanner && (
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border-2 border-blue-200 rounded-xl p-4 flex items-start justify-between gap-4 shadow-sm">
            <div className="flex items-start gap-3 flex-1">
              <div className="text-2xl">📝</div>
              <div className="flex-1">
                <p className="text-gray-800 font-medium">
                  These are example inventory values to get you started! Edit any field to track your actual stock levels and see real-time calculations for your business.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleReset}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors flex items-center gap-2 text-sm font-medium whitespace-nowrap shadow-sm"
              >
                <RotateCcw className="w-4 h-4" />
                Reset
              </button>
              <button
                onClick={handleClearAll}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg transition-colors flex items-center gap-2 text-sm font-medium whitespace-nowrap"
              >
                <Trash2 className="w-4 h-4" />
                Clear All
              </button>
              <button
                onClick={handleDismissBanner}
                className="p-2 hover:bg-blue-100 rounded-lg transition-colors"
                aria-label="Dismiss banner"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg">
                <Package className="w-6 h-6 text-white" />
              </div>
              Inventory Management
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
                    Track and manage raw materials, supplies, and finished products. Monitor stock levels, get low-stock alerts, and view inventory value in real-time.
                    <Tooltip.Arrow className="fill-white" />
                  </Tooltip.Content>
                </Tooltip.Portal>
              </Tooltip.Root>
            </h1>
            <p className="text-gray-600 mt-2">Track and manage your candle-making materials</p>
          </div>
        </div>

      {/* Inventory Manager Component */}
      <InventoryManager />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Inventory Value</p>
                <p className="text-2xl font-bold text-gray-900">${totalValue.toFixed(2)}</p>
              </div>
              <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Items</p>
                <p className="text-2xl font-bold text-gray-900">{inventoryItems.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                <Package className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-r from-orange-50 to-red-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-orange-700 mb-1">Low Stock Alerts</p>
                <p className="text-2xl font-bold text-orange-900">{lowStockCount}</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Inventory List */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle>Current Stock</CardTitle>
          <CardDescription>Monitor your material levels and reorder when needed</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {inventoryItems.map((item, index) => (
              <div
                key={index}
                className={`flex items-center justify-between p-4 rounded-xl transition-all duration-200 ${
                  item.lowStock
                    ? "bg-gradient-to-r from-orange-50 to-red-50 border-2 border-orange-200"
                    : "bg-gray-50 hover:bg-gray-100"
                }`}
              >
                <div className="flex items-center gap-4 flex-1">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    item.lowStock ? "bg-orange-100" : "bg-blue-50"
                  }`}>
                    <Package className={`w-5 h-5 ${item.lowStock ? "text-orange-600" : "text-blue-600"}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-gray-900">{item.name}</p>
                      {item.lowStock && (
                        <span className="px-2 py-0.5 bg-orange-100 text-orange-700 text-xs font-semibold rounded-full">
                          Low Stock
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">
                      {item.quantity} {item.unit} • ${item.value.toFixed(2)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  {item.trend === "up" && <TrendingUp className="w-5 h-5 text-green-600" />}
                  {item.trend === "down" && <TrendingDown className="w-5 h-5 text-red-600" />}
                  <button className="px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
                    Edit
                  </button>
                  {item.lowStock && (
                    <button className="px-4 py-2 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-lg hover:shadow-md transition-all text-sm font-semibold">
                      Reorder
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
    </Tooltip.Provider>
  );
}
