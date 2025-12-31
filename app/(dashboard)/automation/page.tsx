"use client";

import { useState, useEffect } from "react";
import { Zap, Plus, Settings, Calendar, Package, Bell, ChevronRight, Trash2, CheckCircle, HelpCircle, X, RotateCcw } from "lucide-react";
import * as Tooltip from '@radix-ui/react-tooltip';

interface AutomationRule {
  id: string;
  name: string;
  type: 'low-stock' | 'scheduled' | 'order-based' | 'custom';
  enabled: boolean;
  trigger: string;
  action: string;
  conditions: {
    stockLevel?: number;
    product?: string;
    schedule?: string;
    minOrderQuantity?: number;
  };
  lastTriggered?: Date;
  timesTriggered: number;
}

export default function AutomationPage() {
  const [showBanner, setShowBanner] = useState(true);

  // Check localStorage on mount
  useEffect(() => {
    const bannerDismissed = localStorage.getItem('automation-banner-dismissed');
    if (bannerDismissed === 'true') {
      setShowBanner(false);
    }
  }, []);

  const handleDismissBanner = () => {
    setShowBanner(false);
    localStorage.setItem('automation-banner-dismissed', 'true');
  };

  const handleReset = () => {
    // Reset to example automation rules
    window.location.reload();
  };

  const handleClearAll = () => {
    if (confirm('Are you sure you want to remove all automation rules? This will disable all automated workflows.')) {
      setRules([]);
    }
  };

  const [rules, setRules] = useState<AutomationRule[]>([
    {
      id: '1',
      name: 'Auto-produce Lavender candles when stock low',
      type: 'low-stock',
      enabled: true,
      trigger: 'Inventory drops below threshold',
      action: 'Create production batch of 50 units',
      conditions: {
        stockLevel: 20,
        product: 'Lavender Bliss Candle'
      },
      lastTriggered: new Date(2025, 11, 15),
      timesTriggered: 8
    },
    {
      id: '2',
      name: 'Weekly Monday production schedule',
      type: 'scheduled',
      enabled: true,
      trigger: 'Every Monday at 8:00 AM',
      action: 'Generate production plan for best sellers',
      conditions: {
        schedule: 'Weekly - Monday 8:00 AM'
      },
      lastTriggered: new Date(2025, 11, 16),
      timesTriggered: 24
    },
    {
      id: '3',
      name: 'Bulk order auto-batch creation',
      type: 'order-based',
      enabled: true,
      trigger: 'Order quantity exceeds 30 units',
      action: 'Automatically schedule production batch',
      conditions: {
        minOrderQuantity: 30
      },
      lastTriggered: new Date(2025, 11, 18),
      timesTriggered: 5
    }
  ]);

  const [showCreateModal, setShowCreateModal] = useState(false);

  const toggleRule = (id: string) => {
    setRules(rules.map(rule => 
      rule.id === id ? { ...rule, enabled: !rule.enabled } : rule
    ));
  };

  const deleteRule = (id: string) => {
    if (confirm('Are you sure you want to delete this automation rule?')) {
      setRules(rules.filter(rule => rule.id !== id));
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'low-stock':
        return <Package className="w-5 h-5 text-orange-600" />;
      case 'scheduled':
        return <Calendar className="w-5 h-5 text-blue-600" />;
      case 'order-based':
        return <Bell className="w-5 h-5 text-purple-600" />;
      default:
        return <Settings className="w-5 h-5 text-gray-600" />;
    }
  };

  const getTypeBadge = (type: string) => {
    const badges = {
      'low-stock': 'bg-orange-100 text-orange-700 border-orange-200',
      'scheduled': 'bg-blue-100 text-blue-700 border-blue-200',
      'order-based': 'bg-purple-100 text-purple-700 border-purple-200',
      'custom': 'bg-gray-100 text-gray-700 border-gray-200'
    };
    return badges[type as keyof typeof badges] || badges.custom;
  };

  return (
    <Tooltip.Provider delayDuration={200}>
    <div className="max-w-7xl mx-auto p-8">
      {/* Info Banner */}
      {showBanner && (
        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border-2 border-blue-200 rounded-xl p-4 flex items-start justify-between gap-4 shadow-sm mb-6">
          <div className="flex items-start gap-3 flex-1">
            <div className="text-2xl">📝</div>
            <div className="flex-1">
              <p className="text-gray-800 font-medium">
                These are example automation rules to get you started! Create your own rules with custom thresholds, schedules, and triggers to automate your candle production workflow.
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
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
            <Zap className="w-6 h-6 text-white" />
          </div>
          Production Automation
          <Tooltip.Root>
            <Tooltip.Trigger asChild>
              <HelpCircle className="w-6 h-6 text-orange-500 hover:text-orange-600 cursor-help" />
            </Tooltip.Trigger>
            <Tooltip.Portal>
              <Tooltip.Content 
                side="right" 
                className="bg-white text-gray-900 px-4 py-3 rounded-lg shadow-xl text-sm max-w-xs z-[9999]"
                sideOffset={5}
              >
                Set up automated workflows to streamline production. Create rules for low-stock reorders, scheduled batch production, and order-based manufacturing triggers.
                <Tooltip.Arrow className="fill-white" />
              </Tooltip.Content>
            </Tooltip.Portal>
          </Tooltip.Root>
        </h1>
        <p className="text-gray-600">Set up automated rules to streamline your production workflow</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-2">
            <Zap className="w-5 h-5 text-yellow-600" />
            <span className="text-sm font-medium text-gray-600">Active Rules</span>
          </div>
          <p className="text-3xl font-bold text-gray-900">
            {rules.filter(r => r.enabled).length}
          </p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span className="text-sm font-medium text-gray-600">Total Triggers</span>
          </div>
          <p className="text-3xl font-bold text-gray-900">
            {rules.reduce((sum, r) => sum + r.timesTriggered, 0)}
          </p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-2">
            <Package className="w-5 h-5 text-orange-600" />
            <span className="text-sm font-medium text-gray-600">Stock Rules</span>
          </div>
          <p className="text-3xl font-bold text-gray-900">
            {rules.filter(r => r.type === 'low-stock').length}
          </p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-2">
            <Calendar className="w-5 h-5 text-blue-600" />
            <span className="text-sm font-medium text-gray-600">Scheduled Rules</span>
          </div>
          <p className="text-3xl font-bold text-gray-900">
            {rules.filter(r => r.type === 'scheduled').length}
          </p>
        </div>
      </div>

      {/* Create New Rule Button */}
      <div className="mb-6">
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-medium shadow-lg"
        >
          <Plus className="w-5 h-5" />
          Create Automation Rule
        </button>
      </div>

      {/* Automation Rules List */}
      <div className="space-y-4">
        {rules.map((rule) => (
          <div
            key={rule.id}
            className={`bg-white rounded-xl border-2 p-6 transition-all ${
              rule.enabled ? 'border-purple-200 shadow-sm' : 'border-gray-200 opacity-60'
            }`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-4 flex-1">
                <div className="mt-1">
                  {getTypeIcon(rule.type)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{rule.name}</h3>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getTypeBadge(rule.type)}`}>
                      {rule.type.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                    </span>
                  </div>

                  {/* Trigger and Action */}
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex-1 bg-blue-50 border border-blue-200 rounded-lg p-3">
                      <p className="text-xs font-medium text-blue-900 mb-1">WHEN</p>
                      <p className="text-sm text-blue-700">{rule.trigger}</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
                    <div className="flex-1 bg-green-50 border border-green-200 rounded-lg p-3">
                      <p className="text-xs font-medium text-green-900 mb-1">THEN</p>
                      <p className="text-sm text-green-700">{rule.action}</p>
                    </div>
                  </div>

                  {/* Conditions */}
                  <div className="flex flex-wrap gap-2">
                    {rule.conditions.stockLevel && (
                      <span className="px-2 py-1 bg-orange-50 text-orange-700 text-xs rounded border border-orange-200">
                        Stock ≤ {rule.conditions.stockLevel}
                      </span>
                    )}
                    {rule.conditions.product && (
                      <span className="px-2 py-1 bg-purple-50 text-purple-700 text-xs rounded border border-purple-200">
                        Product: {rule.conditions.product}
                      </span>
                    )}
                    {rule.conditions.schedule && (
                      <span className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded border border-blue-200">
                        {rule.conditions.schedule}
                      </span>
                    )}
                    {rule.conditions.minOrderQuantity && (
                      <span className="px-2 py-1 bg-indigo-50 text-indigo-700 text-xs rounded border border-indigo-200">
                        Order ≥ {rule.conditions.minOrderQuantity} units
                      </span>
                    )}
                  </div>

                  {/* Stats */}
                  <div className="flex items-center gap-4 mt-3 text-xs text-gray-500">
                    <span>Triggered {rule.timesTriggered} times</span>
                    {rule.lastTriggered && (
                      <span>Last: {rule.lastTriggered.toLocaleDateString()}</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3 ml-4">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rule.enabled}
                    onChange={() => toggleRule(rule.id)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                </label>
                <button
                  onClick={() => deleteRule(rule.id)}
                  className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {rules.length === 0 && (
        <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl p-12 text-center">
          <Zap className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No automation rules yet</h3>
          <p className="text-gray-600 mb-4">Create your first automation rule to streamline production</p>
          <button
            onClick={() => setShowCreateModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-medium"
          >
            <Plus className="w-5 h-5" />
            Create Automation Rule
          </button>
        </div>
      )}

      {/* Create Modal Placeholder */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Create Automation Rule</h2>
            
            <div className="space-y-4 mb-6">
              <div className="grid grid-cols-2 gap-4">
                <button className="p-6 border-2 border-gray-200 rounded-xl hover:border-purple-500 hover:bg-purple-50 transition text-left">
                  <Package className="w-8 h-8 text-orange-600 mb-3" />
                  <h3 className="font-semibold text-gray-900 mb-1">Low Stock Alert</h3>
                  <p className="text-xs text-gray-600">Auto-produce when inventory is low</p>
                </button>

                <button className="p-6 border-2 border-gray-200 rounded-xl hover:border-purple-500 hover:bg-purple-50 transition text-left">
                  <Calendar className="w-8 h-8 text-blue-600 mb-3" />
                  <h3 className="font-semibold text-gray-900 mb-1">Scheduled Production</h3>
                  <p className="text-xs text-gray-600">Set recurring production schedules</p>
                </button>

                <button className="p-6 border-2 border-gray-200 rounded-xl hover:border-purple-500 hover:bg-purple-50 transition text-left">
                  <Bell className="w-8 h-8 text-purple-600 mb-3" />
                  <h3 className="font-semibold text-gray-900 mb-1">Order-Based</h3>
                  <p className="text-xs text-gray-600">Trigger based on order quantities</p>
                </button>

                <button className="p-6 border-2 border-gray-200 rounded-xl hover:border-purple-500 hover:bg-purple-50 transition text-left">
                  <Settings className="w-8 h-8 text-gray-600 mb-3" />
                  <h3 className="font-semibold text-gray-900 mb-1">Custom Rule</h3>
                  <p className="text-xs text-gray-600">Build your own automation</p>
                </button>
              </div>
            </div>

            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowCreateModal(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    </Tooltip.Provider>
  );
}
