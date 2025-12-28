"use client";

import { useState, useEffect } from "react";
import { ShoppingBag, RefreshCw, Package, TrendingUp, ExternalLink, AlertCircle, CheckCircle, Upload, HelpCircle } from "lucide-react";
import { getBusinessSettings, type BusinessSettings } from "@/lib/businessSettings";
import * as Tooltip from '@radix-ui/react-tooltip';

interface Product {
  id: string;
  name: string;
  sku: string;
  price: number;
  inventory: number;
  platform: 'shopify' | 'etsy' | 'local';
  status: 'active' | 'synced' | 'error';
  lastSync?: Date;
}

export default function EcommercePage() {
  const [settings, setSettings] = useState<BusinessSettings>(getBusinessSettings());
  const [products, setProducts] = useState<Product[]>([
    {
      id: "1",
      name: "Lavender Bliss Candle",
      sku: "LAV-001",
      price: 24.99,
      inventory: 45,
      platform: 'shopify',
      status: 'synced',
      lastSync: new Date()
    },
    {
      id: "2",
      name: "Vanilla Dream Candle",
      sku: "VAN-001",
      price: 22.99,
      inventory: 32,
      platform: 'etsy',
      status: 'synced',
      lastSync: new Date()
    },
    {
      id: "3",
      name: "Citrus Burst Candle",
      sku: "CIT-001",
      price: 26.99,
      inventory: 28,
      platform: 'local',
      status: 'active'
    }
  ]);
  const [syncing, setSyncing] = useState(false);

  useEffect(() => {
    setSettings(getBusinessSettings());
  }, []);

  const handleSync = (platform: 'shopify' | 'etsy' | 'all') => {
    setSyncing(true);
    // Simulate sync
    setTimeout(() => {
      setSyncing(false);
      alert(`Synced ${platform === 'all' ? 'all platforms' : platform} successfully!`);
    }, 2000);
  };

  const getPlatformBadge = (platform: string) => {
    const badges = {
      shopify: 'bg-green-100 text-green-700 border-green-200',
      etsy: 'bg-orange-100 text-orange-700 border-orange-200',
      local: 'bg-purple-100 text-purple-700 border-purple-200'
    };
    return badges[platform as keyof typeof badges] || badges.local;
  };

  const getStatusBadge = (status: string) => {
    const badges = {
      active: 'bg-blue-100 text-blue-700 border-blue-200',
      synced: 'bg-green-100 text-green-700 border-green-200',
      error: 'bg-red-100 text-red-700 border-red-200'
    };
    return badges[status as keyof typeof badges] || badges.active;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'synced':
        return <CheckCircle className="w-4 h-4" />;
      case 'error':
        return <AlertCircle className="w-4 h-4" />;
      default:
        return <Package className="w-4 h-4" />;
    }
  };

  const connectedPlatforms = [
    settings.shopifyEnabled && { name: 'Shopify', key: 'shopify', storeName: settings.shopifyStoreName },
    settings.etsyEnabled && { name: 'Etsy', key: 'etsy', storeName: settings.etsyShopName },
    settings.onlineStoreEnabled && { name: 'Online Store', key: 'store', storeName: settings.onlineStoreUrl }
  ].filter(Boolean);

  return (
    <Tooltip.Provider delayDuration={200}>
    <div className="max-w-7xl mx-auto p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
            <ShoppingBag className="w-6 h-6 text-white" />
          </div>
          E-commerce Integration
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
                Connect and sync with online marketplaces like Shopify and Etsy. Manage product listings, sync inventory levels, and automate order fulfillment across platforms.
                <Tooltip.Arrow className="fill-white" />
              </Tooltip.Content>
            </Tooltip.Portal>
          </Tooltip.Root>
        </h1>
        <p className="text-gray-600">Manage your online store connections and sync products</p>
      </div>

      {/* Connected Platforms */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {connectedPlatforms.length === 0 ? (
          <div className="col-span-3 bg-yellow-50 border-2 border-yellow-200 rounded-xl p-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
              <div>
                <h3 className="font-semibold text-yellow-900 mb-1">No platforms connected</h3>
                <p className="text-sm text-yellow-700 mb-3">
                  Connect your Shopify, Etsy, or custom online store in Settings to start syncing products and orders.
                </p>
                <a
                  href="/settings"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition text-sm font-medium"
                >
                  Go to Settings
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        ) : (
          connectedPlatforms.map((platform: any) => (
            <div key={platform.key} className="bg-white rounded-xl border-2 border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    platform.key === 'shopify' ? 'bg-green-100' :
                    platform.key === 'etsy' ? 'bg-orange-100' :
                    'bg-purple-100'
                  }`}>
                    <ShoppingBag className={`w-5 h-5 ${
                      platform.key === 'shopify' ? 'text-green-600' :
                      platform.key === 'etsy' ? 'text-orange-600' :
                      'text-purple-600'
                    }`} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{platform.name}</h3>
                    <p className="text-xs text-gray-500">{platform.storeName}</p>
                  </div>
                </div>
                <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                  Connected
                </span>
              </div>
              <button
                onClick={() => handleSync(platform.key)}
                disabled={syncing}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition font-medium text-sm disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 ${syncing ? 'animate-spin' : ''}`} />
                Sync Now
              </button>
            </div>
          ))
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-2">
            <Package className="w-5 h-5 text-blue-600" />
            <span className="text-sm font-medium text-gray-600">Total Products</span>
          </div>
          <p className="text-3xl font-bold text-gray-900">{products.length}</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span className="text-sm font-medium text-gray-600">Synced</span>
          </div>
          <p className="text-3xl font-bold text-gray-900">
            {products.filter(p => p.status === 'synced').length}
          </p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="w-5 h-5 text-purple-600" />
            <span className="text-sm font-medium text-gray-600">Active</span>
          </div>
          <p className="text-3xl font-bold text-gray-900">
            {products.filter(p => p.status === 'active').length}
          </p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-2">
            <AlertCircle className="w-5 h-5 text-red-600" />
            <span className="text-sm font-medium text-gray-600">Errors</span>
          </div>
          <p className="text-3xl font-bold text-gray-900">
            {products.filter(p => p.status === 'error').length}
          </p>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Products</h2>
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleSync('all')}
              disabled={syncing}
              className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-medium text-sm disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${syncing ? 'animate-spin' : ''}`} />
              Sync All
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition font-medium text-sm">
              <Upload className="w-4 h-4" />
              Import Products
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  SKU
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Inventory
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Platform
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Sync
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">{product.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="font-mono text-sm text-gray-600">{product.sku}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="font-semibold text-gray-900">${product.price.toFixed(2)}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`font-medium ${product.inventory < 20 ? 'text-red-600' : 'text-gray-900'}`}>
                      {product.inventory}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getPlatformBadge(product.platform)}`}>
                      {product.platform.charAt(0).toUpperCase() + product.platform.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full border ${getStatusBadge(product.status)}`}>
                      {getStatusIcon(product.status)}
                      {product.status.charAt(0).toUpperCase() + product.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {product.lastSync ? new Date(product.lastSync).toLocaleDateString() : 'Never'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </Tooltip.Provider>
  );
}
