"use client";

import { useState } from "react";
import { Package, Plus, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface InventoryState {
  waxLbs: number;
  fragranceOilLbs: number;
  cementLbs: number;
  wicks: number;
  paint: number;
}

interface InventoryManagerProps {
  onClose?: () => void;
}

export default function InventoryManager({ onClose }: InventoryManagerProps) {
  const [inventory, setInventory] = useState<InventoryState>({
    waxLbs: 50,
    fragranceOilLbs: 10,
    cementLbs: 25,
    wicks: 500,
    paint: 100,
  });

  const handleInventoryChange = (field: keyof InventoryState, value: string) => {
    setInventory(prev => ({
      ...prev,
      [field]: parseFloat(value) || 0
    }));
  };

  const resetToDefault = () => {
    setInventory({
      waxLbs: 50,
      fragranceOilLbs: 10,
      cementLbs: 25,
      wicks: 500,
      paint: 100,
    });
  };

  const fillStock = () => {
    setInventory({
      waxLbs: 100,
      fragranceOilLbs: 25,
      cementLbs: 50,
      wicks: 1000,
      paint: 200,
    });
  };

  const clearAll = () => {
    setInventory({
      waxLbs: 0,
      fragranceOilLbs: 0,
      cementLbs: 0,
      wicks: 0,
      paint: 0,
    });
  };

  const exportData = () => {
    const data = {
      exportDate: new Date().toISOString(),
      inventory,
      totalItems: Object.values(inventory).reduce((a, b) => a + b, 0)
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `inventory-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-teal-900/20 dark:to-cyan-900/20 border-2 border-teal-300 dark:border-teal-700 rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-600 to-cyan-600 p-6 relative">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
            <Package className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">📦 Inventory Manager</h2>
            <p className="text-teal-100 text-sm">
              Track materials • Get low stock alerts • See what you can make
            </p>
          </div>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg flex items-center justify-center text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Body */}
      <div className="p-6">
        {/* Current Stock Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
          <div className="bg-gradient-to-br from-yellow-100 to-yellow-200 dark:from-yellow-900/40 dark:to-yellow-800/40 p-4 rounded-xl border-2 border-yellow-300 dark:border-yellow-700">
            <div className="text-center">
              <div className="text-3xl mb-2">🕯️</div>
              <div className="text-sm font-semibold text-yellow-900 dark:text-yellow-100 mb-1">Wax</div>
              <div className="text-2xl font-bold text-yellow-700 dark:text-yellow-300">
                {inventory.waxLbs} <span className="text-sm">lbs</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-pink-100 to-pink-200 dark:from-pink-900/40 dark:to-pink-800/40 p-4 rounded-xl border-2 border-pink-300 dark:border-pink-700">
            <div className="text-center">
              <div className="text-3xl mb-2">🌸</div>
              <div className="text-sm font-semibold text-pink-900 dark:text-pink-100 mb-1">Fragrance</div>
              <div className="text-2xl font-bold text-pink-700 dark:text-pink-300">
                {inventory.fragranceOilLbs} <span className="text-sm">lbs</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 p-4 rounded-xl border-2 border-gray-300 dark:border-gray-600">
            <div className="text-center">
              <div className="text-3xl mb-2">🏗️</div>
              <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-1">Cement</div>
              <div className="text-2xl font-bold text-gray-700 dark:text-gray-300">
                {inventory.cementLbs} <span className="text-sm">lbs</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-orange-100 to-orange-200 dark:from-orange-900/40 dark:to-orange-800/40 p-4 rounded-xl border-2 border-orange-300 dark:border-orange-700">
            <div className="text-center">
              <div className="text-3xl mb-2">🧵</div>
              <div className="text-sm font-semibold text-orange-900 dark:text-orange-100 mb-1">Wicks</div>
              <div className="text-2xl font-bold text-orange-700 dark:text-orange-300">
                {inventory.wicks}
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-cyan-100 to-cyan-200 dark:from-cyan-900/40 dark:to-cyan-800/40 p-4 rounded-xl border-2 border-cyan-300 dark:border-cyan-700">
            <div className="text-center">
              <div className="text-3xl mb-2">🎨</div>
              <div className="text-sm font-semibold text-cyan-900 dark:text-cyan-100 mb-1">Paint</div>
              <div className="text-2xl font-bold text-cyan-700 dark:text-cyan-300">
                {inventory.paint}
              </div>
            </div>
          </div>
        </div>

        {/* Update Stock Levels */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 mb-6 shadow-sm">
          <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Update Stock Levels
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="wax" className="text-gray-900 dark:text-gray-100 font-semibold mb-2 flex items-center gap-2">
                🕯️ Wax (lbs)
              </Label>
              <Input
                id="wax"
                type="number"
                step="0.1"
                value={inventory.waxLbs}
                onChange={(e) => handleInventoryChange('waxLbs', e.target.value)}
                className="text-lg font-bold border-yellow-200 focus:ring-yellow-500"
              />
            </div>

            <div>
              <Label htmlFor="fragrance" className="text-gray-900 dark:text-gray-100 font-semibold mb-2 flex items-center gap-2">
                🌸 Fragrance Oil (lbs)
              </Label>
              <Input
                id="fragrance"
                type="number"
                step="0.1"
                value={inventory.fragranceOilLbs}
                onChange={(e) => handleInventoryChange('fragranceOilLbs', e.target.value)}
                className="text-lg font-bold border-pink-200 focus:ring-pink-500"
              />
            </div>

            <div>
              <Label htmlFor="cement" className="text-gray-900 dark:text-gray-100 font-semibold mb-2 flex items-center gap-2">
                🏗️ Cement (lbs)
              </Label>
              <Input
                id="cement"
                type="number"
                step="0.1"
                value={inventory.cementLbs}
                onChange={(e) => handleInventoryChange('cementLbs', e.target.value)}
                className="text-lg font-bold border-gray-200 focus:ring-gray-500"
              />
            </div>

            <div>
              <Label htmlFor="wicks" className="text-gray-900 dark:text-gray-100 font-semibold mb-2 flex items-center gap-2">
                🧵 Wicks (count)
              </Label>
              <Input
                id="wicks"
                type="number"
                value={inventory.wicks}
                onChange={(e) => handleInventoryChange('wicks', e.target.value)}
                className="text-lg font-bold border-orange-200 focus:ring-orange-500"
              />
            </div>

            <div>
              <Label htmlFor="paint" className="text-gray-900 dark:text-gray-100 font-semibold mb-2 flex items-center gap-2">
                🎨 Paint/Finishing (units)
              </Label>
              <Input
                id="paint"
                type="number"
                value={inventory.paint}
                onChange={(e) => handleInventoryChange('paint', e.target.value)}
                className="text-lg font-bold border-cyan-200 focus:ring-cyan-500"
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <button
            onClick={resetToDefault}
            className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-4 py-3 rounded-xl font-bold transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex items-center justify-center gap-2"
          >
            <span>🔄</span>
            Reset to Default
          </button>
          
          <button
            onClick={fillStock}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-4 py-3 rounded-xl font-bold transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex items-center justify-center gap-2"
          >
            <span>📦</span>
            Full Stock
          </button>
          
          <button
            onClick={clearAll}
            className="bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white px-4 py-3 rounded-xl font-bold transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex items-center justify-center gap-2"
          >
            <span>🗑️</span>
            Clear All
          </button>
          
          <button
            onClick={exportData}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-4 py-3 rounded-xl font-bold transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex items-center justify-center gap-2"
          >
            <span>📊</span>
            Export Data
          </button>
        </div>
      </div>
    </div>
  );
}
