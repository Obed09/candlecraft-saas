"use client";

import { useState } from "react";
import { BarcodeGenerator, generateSKU, generateEAN13 } from "@/components/BarcodeGenerator";
import { Package, QrCode, Barcode as BarcodeIcon, Download, Plus, RefreshCw, HelpCircle } from "lucide-react";
import * as Tooltip from '@radix-ui/react-tooltip';

interface Product {
  id: string;
  name: string;
  sku: string;
  barcode?: string;
  qrData?: string;
}

export default function BarcodeSystemPage() {
  const [products, setProducts] = useState<Product[]>([
    {
      id: "1",
      name: "Lavender Bliss Candle",
      sku: "LAV-001",
      barcode: "1234567890123",
      qrData: "https://candleflow.com/products/lavender-bliss",
    },
  ]);

  const [newProduct, setNewProduct] = useState({
    name: "",
    sku: "",
  });

  const [showAddForm, setShowAddForm] = useState(false);

  const handleGenerateSKU = () => {
    if (newProduct.name) {
      const existingSKUs = products.map((p) => p.sku);
      const generatedSKU = generateSKU(newProduct.name, existingSKUs);
      setNewProduct({ ...newProduct, sku: generatedSKU });
    }
  };

  const handleAddProduct = () => {
    if (newProduct.name && newProduct.sku) {
      const product: Product = {
        id: Date.now().toString(),
        name: newProduct.name,
        sku: newProduct.sku,
        barcode: generateEAN13(),
        qrData: `https://candleflow.com/products/${newProduct.sku.toLowerCase()}`,
      };
      setProducts([...products, product]);
      setNewProduct({ name: "", sku: "" });
      setShowAddForm(false);
    }
  };

  const handleDownload = (productName: string, type: "barcode" | "qr") => {
    // This will be implemented with canvas export
    alert(`Downloading ${type} for ${productName}...`);
  };

  const handlePrintAll = () => {
    window.print();
  };

  return (
    <Tooltip.Provider delayDuration={200}>
    <div className="max-w-7xl mx-auto p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
            <BarcodeIcon className="w-8 h-8 text-purple-600" />
            Barcode & QR Code System
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
                  Generate and manage product barcodes and QR codes. Create EAN-13 barcodes for retail, SKU labels for inventory, and QR codes for product information.
                  <Tooltip.Arrow className="fill-white" />
                </Tooltip.Content>
              </Tooltip.Portal>
            </Tooltip.Root>
          </h1>
          <p className="text-gray-600">Generate and manage product barcodes and QR codes</p>
        </div>

        <div className="flex gap-3 mt-4 md:mt-0">
          <button
            onClick={() => setShowAddForm(true)}
            className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
          >
            <Plus className="w-4 h-4" />
            Add Product
          </button>
          <button
            onClick={handlePrintAll}
            className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
          >
            <Download className="w-4 h-4" />
            Print All
          </button>
        </div>
      </div>

      {/* Add Product Form */}
      {showAddForm && (
        <div className="bg-white rounded-xl border-2 border-purple-200 p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Product</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Name
              </label>
              <input
                type="text"
                value={newProduct.name}
                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="e.g., Vanilla Dream Candle"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                SKU (Stock Keeping Unit)
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newProduct.sku}
                  onChange={(e) => setNewProduct({ ...newProduct, sku: e.target.value })}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="e.g., VAN-001"
                />
                <button
                  onClick={handleGenerateSKU}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition flex items-center gap-2"
                  title="Auto-generate SKU"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
          <div className="flex gap-3 justify-end">
            <button
              onClick={() => setShowAddForm(false)}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button
              onClick={handleAddProduct}
              disabled={!newProduct.name || !newProduct.sku}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Add Product
            </button>
          </div>
        </div>
      )}

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center">
              <Package className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{products.length}</div>
              <div className="text-sm text-gray-600">Total Products</div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
              <BarcodeIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">
                {products.filter((p) => p.barcode).length}
              </div>
              <div className="text-sm text-gray-600">Barcodes Generated</div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
              <QrCode className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">
                {products.filter((p) => p.qrData).length}
              </div>
              <div className="text-sm text-gray-600">QR Codes Generated</div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition print:break-inside-avoid"
          >
            {/* Product Info */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-1">{product.name}</h3>
              <p className="text-sm text-gray-600">SKU: {product.sku}</p>
            </div>

            {/* Barcode & QR Code */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Barcode */}
              <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
                <div className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                  <BarcodeIcon className="w-4 h-4" />
                  Barcode (EAN-13)
                </div>
                {product.barcode ? (
                  <BarcodeGenerator value={product.barcode} type="barcode" format="EAN13" />
                ) : (
                  <div className="text-sm text-gray-500">No barcode</div>
                )}
              </div>

              {/* QR Code */}
              <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
                <div className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                  <QrCode className="w-4 h-4" />
                  QR Code
                </div>
                {product.qrData ? (
                  <BarcodeGenerator value={product.qrData} type="qr" size={120} displayValue={false} />
                ) : (
                  <div className="text-sm text-gray-500">No QR code</div>
                )}
              </div>
            </div>

            {/* SKU Barcode */}
            <div className="flex flex-col items-center p-4 bg-purple-50 rounded-lg mb-4">
              <div className="text-sm font-medium text-gray-700 mb-3">SKU Barcode</div>
              <BarcodeGenerator value={product.sku} type="barcode" />
            </div>

            {/* Actions */}
            <div className="flex gap-2 print:hidden">
              <button
                onClick={() => handleDownload(product.name, "barcode")}
                className="flex-1 px-3 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition text-sm font-medium"
              >
                Download Barcode
              </button>
              <button
                onClick={() => handleDownload(product.name, "qr")}
                className="flex-1 px-3 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition text-sm font-medium"
              >
                Download QR
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {products.length === 0 && (
        <div className="text-center py-16">
          <BarcodeIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Products Yet</h3>
          <p className="text-gray-600 mb-6">
            Add your first product to generate barcodes and QR codes
          </p>
          <button
            onClick={() => setShowAddForm(true)}
            className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
          >
            Add First Product
          </button>
        </div>
      )}

      {/* Print Styles */}
      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden;
          }
          .print\\:break-inside-avoid,
          .print\\:break-inside-avoid * {
            visibility: visible;
          }
          .print\\:break-inside-avoid {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
          .print\\:hidden {
            display: none !important;
          }
        }
      `}</style>
    </div>
    </Tooltip.Provider>
  );
}
