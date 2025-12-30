"use client";

import { useState, useEffect } from "react";
import { X, Plus, Trash2, Calendar } from "lucide-react";
import { generateInvoicePDF, downloadInvoice, printInvoice } from "@/lib/invoiceGenerator";

interface InvoiceItem {
  id: string;
  description: string;
  unitPrice: number;
  quantity: number;
  amount: number;
}

interface InvoiceFormProps {
  onClose: () => void;
  onSave: (invoice: any) => void;
  editInvoice?: any;
}

export default function InvoiceForm({ onClose, onSave, editInvoice }: InvoiceFormProps) {
  const [showLogo, setShowLogo] = useState(true);
  const [showPO, setShowPO] = useState(true);
  const [showSalesTax, setShowSalesTax] = useState(false);
  
  // Business Info (From)
  const [businessName, setBusinessName] = useState("");
  const [businessAddress, setBusinessAddress] = useState("");
  const [businessEmail, setBusinessEmail] = useState("");
  const [businessPhone, setBusinessPhone] = useState("");
  const [businessLogo, setBusinessLogo] = useState("");
  
  // Customer Info (To)
  const [customerName, setCustomerName] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  
  // Invoice Details
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [invoiceDate, setInvoiceDate] = useState(new Date().toISOString().split('T')[0]);
  const [dueDate, setDueDate] = useState(new Date().toISOString().split('T')[0]);
  const [poNumber, setPONumber] = useState("");
  
  // Items
  const [items, setItems] = useState<InvoiceItem[]>([
    { id: "1", description: "", unitPrice: 0, quantity: 0, amount: 0 }
  ]);
  
  // Notes and Totals
  const [notes, setNotes] = useState("");
  const [taxRate, setTaxRate] = useState(0);
  const [amountPaid, setAmountPaid] = useState(0);

  // Load business settings
  useEffect(() => {
    const settings = localStorage.getItem("candlepilots_business_settings");
    if (settings) {
      const parsed = JSON.parse(settings);
      setBusinessName(parsed.businessName || "");
      setBusinessAddress(parsed.address || "");
      setBusinessEmail(parsed.email || "");
      setBusinessPhone(parsed.phone || "");
      setBusinessLogo(parsed.logoUrl || "");
    }
    
    // Generate invoice number
    if (!editInvoice) {
      const invoiceCount = parseInt(localStorage.getItem("invoiceCount") || "0");
      setInvoiceNumber(`INV-${String(invoiceCount + 1).padStart(6, "0")}`);
    }
  }, [editInvoice]);

  // Load edit invoice data
  useEffect(() => {
    if (editInvoice) {
      setCustomerName(editInvoice.customer);
      setCustomerAddress(editInvoice.customerEmail || "");
      setInvoiceNumber(editInvoice.invoiceNumber);
      setInvoiceDate(editInvoice.date);
      setDueDate(editInvoice.dueDate);
      setItems(editInvoice.items || []);
      setNotes(editInvoice.notes || "");
    }
  }, [editInvoice]);

  const addNewLine = () => {
    const newItem: InvoiceItem = {
      id: String(Date.now()),
      description: "",
      unitPrice: 0,
      quantity: 0,
      amount: 0
    };
    setItems([...items, newItem]);
  };

  const removeItem = (id: string) => {
    if (items.length > 1) {
      setItems(items.filter(item => item.id !== id));
    }
  };

  const updateItem = (id: string, field: keyof InvoiceItem, value: string | number) => {
    setItems(items.map(item => {
      if (item.id === id) {
        const updated = { ...item, [field]: value };
        if (field === "unitPrice" || field === "quantity") {
          updated.amount = updated.unitPrice * updated.quantity;
        }
        return updated;
      }
      return item;
    }));
  };

  const calculateSubtotal = () => {
    return items.reduce((sum, item) => sum + item.amount, 0);
  };

  const calculateTax = () => {
    return showSalesTax ? calculateSubtotal() * (taxRate / 100) : 0;
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax();
  };

  const calculateBalanceDue = () => {
    return calculateTotal() - amountPaid;
  };

  const handlePreview = () => {
    const invoiceData = {
      invoiceNumber,
      invoiceDate: new Date(invoiceDate),
      dueDate: new Date(dueDate),
      customerName,
      customerEmail: customerAddress,
      customerAddress,
      items: items.map(item => ({
        description: item.description,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        total: item.amount
      })),
      subtotal: calculateSubtotal(),
      tax: calculateTax(),
      shipping: 0,
      total: calculateTotal(),
      notes,
      businessName,
      businessAddress,
      businessEmail,
      businessPhone,
      logoUrl: showLogo ? businessLogo : undefined
    };

    const pdf = generateInvoicePDF(invoiceData);
    pdf.output('dataurlnewwindow');
  };

  const handlePrint = () => {
    const invoiceData = {
      invoiceNumber,
      invoiceDate: new Date(invoiceDate),
      dueDate: new Date(dueDate),
      customerName,
      customerEmail: customerAddress,
      customerAddress,
      items: items.map(item => ({
        description: item.description,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        total: item.amount
      })),
      subtotal: calculateSubtotal(),
      tax: calculateTax(),
      shipping: 0,
      total: calculateTotal(),
      notes,
      businessName,
      businessAddress,
      businessEmail,
      businessPhone,
      logoUrl: showLogo ? businessLogo : undefined
    };

    printInvoice(invoiceData);
  };

  const handleDownloadPDF = () => {
    const invoiceData = {
      invoiceNumber,
      invoiceDate: new Date(invoiceDate),
      dueDate: new Date(dueDate),
      customerName,
      customerEmail: customerAddress,
      customerAddress,
      items: items.map(item => ({
        description: item.description,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        total: item.amount
      })),
      subtotal: calculateSubtotal(),
      tax: calculateTax(),
      shipping: 0,
      total: calculateTotal(),
      notes,
      businessName,
      businessAddress,
      businessEmail,
      businessPhone,
      logoUrl: showLogo ? businessLogo : undefined
    };

    downloadInvoice(invoiceData);
  };

  const handleSave = () => {
    const invoice = {
      invoiceNumber,
      customer: customerName,
      customerEmail: customerAddress,
      date: invoiceDate,
      dueDate,
      amount: calculateTotal(),
      status: amountPaid >= calculateTotal() ? "paid" : amountPaid > 0 ? "partial" : "pending",
      items,
      notes,
      subtotal: calculateSubtotal(),
      tax: calculateTax(),
      amountPaid,
      balanceDue: calculateBalanceDue()
    };

    // Save to localStorage
    const invoiceCount = parseInt(localStorage.getItem("invoiceCount") || "0");
    localStorage.setItem("invoiceCount", String(invoiceCount + 1));

    onSave(invoice);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full my-8">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-800">
            {editInvoice ? "Edit Invoice" : "Create New Invoice"}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form */}
        <div className="p-8">
          {/* Top Options */}
          <div className="flex items-center gap-8 mb-6 pb-4 border-b">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={showLogo}
                onChange={(e) => setShowLogo(e.target.checked)}
                className="w-4 h-4 text-purple-600 rounded"
              />
              <span className="text-sm font-medium text-gray-700">Logo</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={showPO}
                onChange={(e) => setShowPO(e.target.checked)}
                className="w-4 h-4 text-purple-600 rounded"
              />
              <span className="text-sm font-medium text-gray-700">P.O. #</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={showSalesTax}
                onChange={(e) => setShowSalesTax(e.target.checked)}
                className="w-4 h-4 text-purple-600 rounded"
              />
              <span className="text-sm font-medium text-gray-700">Sales Tax</span>
            </label>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 mb-6 pb-4 border-b">
            <button
              onClick={handlePreview}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              Preview
            </button>
            <button
              onClick={handlePrint}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              Print
            </button>
            <button
              onClick={handleDownloadPDF}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              PDF
            </button>
            <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
              Send
            </button>
            <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
              Mark as Paid
            </button>
            <button
              onClick={handleSave}
              className="ml-auto px-6 py-2 text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors"
            >
              Save
            </button>
          </div>

          {/* Invoice Content */}
          <div className="grid grid-cols-2 gap-8">
            {/* Left Side */}
            <div>
              {/* From Section */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">From</h3>
                
                {/* Logo Display */}
                {showLogo && businessLogo && (
                  <div className="mb-4">
                    <img
                      src={businessLogo}
                      alt="Business Logo"
                      className="h-20 w-auto object-contain"
                    />
                  </div>
                )}
                
                <div className="space-y-2">
                  <input
                    type="text"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    placeholder="Business Name"
                    className="w-full px-3 py-2 text-base font-semibold text-gray-900 bg-transparent border-0 border-b-2 border-gray-200 focus:border-purple-500 focus:ring-0 outline-none transition-colors"
                  />
                  <textarea
                    value={businessAddress}
                    onChange={(e) => setBusinessAddress(e.target.value)}
                    placeholder="Street Address, City, State ZIP"
                    rows={2}
                    className="w-full px-3 py-2 text-sm text-gray-600 bg-transparent border-0 border-b-2 border-gray-200 focus:border-purple-500 focus:ring-0 outline-none resize-none transition-colors"
                  />
                </div>
              </div>

              {/* To Section */}
              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">To</h3>
                <div className="space-y-2">
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Customer Name"
                    className="w-full px-3 py-2 text-base font-semibold text-gray-900 bg-transparent border-0 border-b-2 border-gray-200 focus:border-purple-500 focus:ring-0 outline-none transition-colors"
                  />
                  <textarea
                    value={customerAddress}
                    onChange={(e) => setCustomerAddress(e.target.value)}
                    placeholder="Street Address, City, State ZIP"
                    rows={2}
                    className="w-full px-3 py-2 text-sm text-gray-600 bg-transparent border-0 border-b-2 border-gray-200 focus:border-purple-500 focus:ring-0 outline-none resize-none transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Right Side */}
            <div>
              <div className="text-right mb-8">
                <h1 className="text-5xl font-bold text-gray-300 tracking-wide">INVOICE</h1>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-end gap-3">
                  <label className="text-sm font-medium text-gray-600 min-w-[100px] text-right">Invoice #</label>
                  <input
                    type="text"
                    value={invoiceNumber}
                    onChange={(e) => setInvoiceNumber(e.target.value)}
                    className="w-48 px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent focus:bg-white transition-colors"
                  />
                </div>

                {showPO && (
                  <div className="flex items-center justify-end gap-3">
                    <label className="text-sm font-medium text-gray-600 min-w-[100px] text-right">P.O. #</label>
                    <input
                      type="text"
                      value={poNumber}
                      onChange={(e) => setPONumber(e.target.value)}
                      placeholder="Optional"
                      className="w-48 px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent focus:bg-white transition-colors"
                    />
                  </div>
                )}

                <div className="flex items-center justify-end gap-3">
                  <label className="text-sm font-medium text-gray-600 min-w-[100px] text-right">Invoice Date</label>
                  <input
                    type="date"
                    value={invoiceDate}
                    onChange={(e) => setInvoiceDate(e.target.value)}
                    className="w-48 px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent focus:bg-white transition-colors"
                  />
                </div>

                <div className="flex items-center justify-end gap-3">
                  <label className="text-sm font-medium text-gray-600 min-w-[100px] text-right">Due Date</label>
                  <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="w-48 px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent focus:bg-white transition-colors"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Items Table */}
          <div className="mt-8">
            <div className="bg-blue-500 text-white px-4 py-2 rounded-t-lg grid grid-cols-12 gap-2 font-semibold text-sm">
              <div className="col-span-1">Item</div>
              <div className="col-span-5">Description</div>
              <div className="col-span-2 text-right">Unit Price</div>
              <div className="col-span-2 text-right">Quantity</div>
              <div className="col-span-2 text-right">Amount</div>
            </div>

            <div className="border border-t-0 rounded-b-lg">
              {items.map((item, index) => (
                <div key={item.id} className="grid grid-cols-12 gap-2 p-2 border-b last:border-b-0 items-center">
                  <div className="col-span-1 flex items-center gap-2">
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-red-500 hover:text-red-700"
                      disabled={items.length === 1}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="col-span-5">
                    <textarea
                      value={item.description}
                      onChange={(e) => updateItem(item.id, "description", e.target.value)}
                      placeholder="Description"
                      rows={2}
                      className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                  <div className="col-span-2">
                    <input
                      type="number"
                      value={item.unitPrice || ""}
                      onChange={(e) => updateItem(item.id, "unitPrice", parseFloat(e.target.value) || 0)}
                      placeholder="0.00"
                      step="0.01"
                      className="w-full px-2 py-1 border border-gray-300 rounded text-sm text-right focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                  <div className="col-span-2">
                    <input
                      type="number"
                      value={item.quantity || ""}
                      onChange={(e) => updateItem(item.id, "quantity", parseFloat(e.target.value) || 0)}
                      placeholder="0.00"
                      step="0.01"
                      className="w-full px-2 py-1 border border-gray-300 rounded text-sm text-right focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                  <div className="col-span-2 text-right font-medium">
                    ${item.amount.toFixed(2)}
                  </div>
                </div>
              ))}

              <button
                onClick={addNewLine}
                className="flex items-center gap-2 px-4 py-2 text-sm text-blue-600 hover:text-blue-700 hover:bg-blue-50 transition-colors m-2 rounded"
              >
                <Plus className="w-4 h-4" />
                New Line
              </button>
            </div>
          </div>

          {/* Notes and Totals */}
          <div className="grid grid-cols-2 gap-8 mt-8">
            {/* Notes */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Notes</h3>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={6}
                placeholder="Add any additional notes or payment instructions..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            {/* Totals */}
            <div>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-gray-700">Subtotal</span>
                  <span className="font-semibold">${calculateSubtotal().toFixed(2)}</span>
                </div>

                {showSalesTax && (
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-gray-700">Sales Tax</span>
                      <input
                        type="number"
                        value={taxRate}
                        onChange={(e) => setTaxRate(parseFloat(e.target.value) || 0)}
                        placeholder="0"
                        step="0.1"
                        className="w-16 px-2 py-1 border border-gray-300 rounded text-sm text-right"
                      />
                      <span className="text-gray-600">%</span>
                    </div>
                    <span className="font-semibold">${calculateTax().toFixed(2)}</span>
                  </div>
                )}

                <div className="flex items-center justify-between text-base border-t pt-3">
                  <span className="font-bold text-gray-800">Total</span>
                  <span className="font-bold text-gray-800">${calculateTotal().toFixed(2)}</span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-gray-700">Amount Paid</span>
                  <input
                    type="number"
                    value={amountPaid || ""}
                    onChange={(e) => setAmountPaid(parseFloat(e.target.value) || 0)}
                    placeholder="0.00"
                    step="0.01"
                    className="w-32 px-2 py-1 border border-gray-300 rounded text-sm text-right"
                  />
                </div>

                <div className="flex items-center justify-between text-lg bg-yellow-100 border-2 border-yellow-300 rounded-lg px-4 py-3">
                  <span className="font-bold text-gray-800">Balance Due</span>
                  <span className="font-bold text-purple-600">${calculateBalanceDue().toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
