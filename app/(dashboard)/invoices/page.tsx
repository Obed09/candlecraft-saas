"use client";

import { useState } from "react";
import { FileText, Download, Printer, Plus, DollarSign, Clock, CheckCircle, XCircle, Search, HelpCircle } from "lucide-react";
import { downloadInvoice, printInvoice, InvoiceData, InvoiceItem } from "@/lib/invoiceGenerator";
import InvoiceForm from "@/components/dashboard/InvoiceForm";
import * as Tooltip from '@radix-ui/react-tooltip';

interface Invoice {
  id: string;
  invoiceNumber: string;
  customerName: string;
  customerEmail: string;
  date: Date;
  dueDate: Date;
  total: number;
  status: "paid" | "pending" | "overdue";
  items: InvoiceItem[];
}

export default function InvoicesPage() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [invoices, setInvoices] = useState<Invoice[]>([
    {
      id: "1",
      invoiceNumber: "INV-001",
      customerName: "Sarah Johnson",
      customerEmail: "sarah.johnson@email.com",
      date: new Date(2025, 11, 10),
      dueDate: new Date(2025, 11, 24),
      total: 156.99,
      status: "paid",
      items: [
        { description: "Lavender Bliss Candle", quantity: 3, unitPrice: 24.99, total: 74.97 },
        { description: "Vanilla Dream Candle", quantity: 2, unitPrice: 22.99, total: 45.98 }
      ]
    },
    {
      id: "2",
      invoiceNumber: "INV-002",
      customerName: "Michael Chen",
      customerEmail: "michael.chen@email.com",
      date: new Date(2025, 11, 15),
      dueDate: new Date(2025, 11, 29),
      total: 233.45,
      status: "pending",
      items: [
        { description: "Citrus Burst Candle", quantity: 5, unitPrice: 26.99, total: 134.95 },
        { description: "Lavender Bliss Candle", quantity: 2, unitPrice: 24.99, total: 49.98 }
      ]
    },
    {
      id: "3",
      invoiceNumber: "INV-003",
      customerName: "Emily Rodriguez",
      customerEmail: "emily.r@email.com",
      date: new Date(2025, 11, 5),
      dueDate: new Date(2025, 11, 19),
      total: 89.97,
      status: "overdue",
      items: [
        { description: "Vanilla Dream Candle", quantity: 3, unitPrice: 22.99, total: 68.97 }
      ]
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "paid" | "pending" | "overdue">("all");

  // Get business settings from localStorage
  const getBusinessSettings = () => {
    if (typeof window !== "undefined") {
      const settings = localStorage.getItem("businessSettings");
      return settings ? JSON.parse(settings) : {
        businessName: "CandleFlow",
        email: "contact@candleflow.com",
        phone: "+1-555-555-5555",
        city: "New York",
        state: "NY",
        website: "www.candleflow.com"
      };
    }
    return {
      businessName: "CandleFlow",
      email: "contact@candleflow.com",
      phone: "+1-555-555-5555",
      city: "New York",
      state: "NY",
      website: "www.candleflow.com"
    };
  };

  const handleDownloadInvoice = (invoice: Invoice) => {
    const businessSettings = getBusinessSettings();
    
    const invoiceData: InvoiceData = {
      invoiceNumber: invoice.invoiceNumber,
      invoiceDate: invoice.date,
      dueDate: invoice.dueDate,
      businessName: businessSettings.businessName,
      businessAddress: `${businessSettings.city}, ${businessSettings.state}`,
      businessEmail: businessSettings.email,
      businessPhone: businessSettings.phone,
      customerName: invoice.customerName,
      customerEmail: invoice.customerEmail,
      customerAddress: "",
      items: invoice.items,
      subtotal: invoice.items.reduce((sum, item) => sum + item.total, 0),
      tax: invoice.items.reduce((sum, item) => sum + item.total, 0) * 0.08,
      shipping: 8.99,
      total: invoice.total,
      notes: "Payment is due within 14 days. Thank you for your business!"
    };
    
    downloadInvoice(invoiceData);
  };

  const handlePrintInvoice = (invoice: Invoice) => {
    const businessSettings = getBusinessSettings();
    
    const invoiceData: InvoiceData = {
      invoiceNumber: invoice.invoiceNumber,
      invoiceDate: invoice.date,
      dueDate: invoice.dueDate,
      businessName: businessSettings.businessName,
      businessAddress: `${businessSettings.city}, ${businessSettings.state}`,
      businessEmail: businessSettings.email,
      businessPhone: businessSettings.phone,
      customerName: invoice.customerName,
      customerEmail: invoice.customerEmail,
      customerAddress: "",
      items: invoice.items,
      subtotal: invoice.items.reduce((sum, item) => sum + item.total, 0),
      tax: invoice.items.reduce((sum, item) => sum + item.total, 0) * 0.08,
      shipping: 8.99,
      total: invoice.total,
      notes: "Payment is due within 14 days. Thank you for your business!"
    };
    
    printInvoice(invoiceData);
  };

  const handleSaveInvoice = (newInvoice: any) => {
    const invoice: Invoice = {
      id: String(invoices.length + 1),
      invoiceNumber: newInvoice.invoiceNumber,
      customerName: newInvoice.customer,
      customerEmail: newInvoice.customerEmail,
      date: new Date(newInvoice.date),
      dueDate: new Date(newInvoice.dueDate),
      total: newInvoice.amount,
      status: newInvoice.status,
      items: newInvoice.items
    };
    
    setInvoices([invoice, ...invoices]);
  };

  const filteredInvoices = invoices.filter(invoice => {
    const matchesSearch = invoice.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         invoice.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || invoice.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalRevenue = invoices.filter(inv => inv.status === "paid").reduce((sum, inv) => sum + inv.total, 0);
  const pendingAmount = invoices.filter(inv => inv.status === "pending").reduce((sum, inv) => sum + inv.total, 0);
  const overdueAmount = invoices.filter(inv => inv.status === "overdue").reduce((sum, inv) => sum + inv.total, 0);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-700 border-green-200";
      case "pending":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "overdue":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "paid":
        return <CheckCircle className="w-4 h-4" />;
      case "pending":
        return <Clock className="w-4 h-4" />;
      case "overdue":
        return <XCircle className="w-4 h-4" />;
      default:
        return null;
    }
  };

  return (
    <Tooltip.Provider delayDuration={200}>
    <div className="max-w-7xl mx-auto p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
            <FileText className="w-8 h-8 text-purple-600" />
            Invoices & Payments
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
                  Create, manage, and track professional invoices. Generate PDF invoices with your branding, monitor payment status, and send payment reminders to customers.
                  <Tooltip.Arrow className="fill-white" />
                </Tooltip.Content>
              </Tooltip.Portal>
            </Tooltip.Root>
          </h1>
          <p className="text-gray-600">Manage invoices and track payments</p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition mt-4 md:mt-0"
        >
          <Plus className="w-4 h-4" />
          Create Invoice
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-purple-600" />
            </div>
            <span className="text-gray-600 font-medium">Total Invoices</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">{invoices.length}</div>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl border border-green-200 p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-white" />
            </div>
            <span className="text-gray-700 font-medium">Paid</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">${totalRevenue.toFixed(2)}</div>
        </div>

        <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl border border-yellow-200 p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-yellow-600 rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 text-white" />
            </div>
            <span className="text-gray-700 font-medium">Pending</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">${pendingAmount.toFixed(2)}</div>
        </div>

        <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl border border-red-200 p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
              <XCircle className="w-5 h-5 text-white" />
            </div>
            <span className="text-gray-700 font-medium">Overdue</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">${overdueAmount.toFixed(2)}</div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search invoices..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          {/* Status Filter */}
          <div className="flex gap-2">
            {["all", "paid", "pending", "overdue"].map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status as any)}
                className={`px-4 py-2 rounded-lg font-medium capitalize transition ${
                  statusFilter === status
                    ? "bg-purple-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Invoices Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Invoice</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Customer</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Date</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Due Date</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Amount</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Status</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredInvoices.map((invoice) => (
                <tr key={invoice.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-6">
                    <div className="font-semibold text-gray-900">{invoice.invoiceNumber}</div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-gray-900">{invoice.customerName}</div>
                    <div className="text-sm text-gray-500">{invoice.customerEmail}</div>
                  </td>
                  <td className="py-4 px-6 text-gray-600">
                    {invoice.date.toLocaleDateString()}
                  </td>
                  <td className="py-4 px-6 text-gray-600">
                    {invoice.dueDate.toLocaleDateString()}
                  </td>
                  <td className="py-4 px-6">
                    <span className="font-semibold text-gray-900">${invoice.total.toFixed(2)}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border ${getStatusBadge(invoice.status)}`}>
                      {getStatusIcon(invoice.status)}
                      {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleDownloadInvoice(invoice)}
                        className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition"
                        title="Download PDF"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handlePrintInvoice(invoice)}
                        className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition"
                        title="Print Invoice"
                      >
                        <Printer className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredInvoices.length === 0 && (
          <div className="text-center py-12">
            <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No invoices found</h3>
            <p className="text-gray-600">
              {searchTerm || statusFilter !== "all"
                ? "Try adjusting your filters"
                : "Create your first invoice to get started"}
            </p>
          </div>
        )}
      </div>

      {/* Invoice Form Modal */}
      {showCreateModal && (
        <InvoiceForm
          onClose={() => setShowCreateModal(false)}
          onSave={handleSaveInvoice}
        />
      )}
    </div>
    </Tooltip.Provider>
  );
}
