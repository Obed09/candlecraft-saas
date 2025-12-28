"use client";

import { useState } from "react";
import { User, Package, FileText, MapPin, CreditCard, Mail, Phone, Calendar, Download, Eye, HelpCircle } from "lucide-react";
import * as Tooltip from '@radix-ui/react-tooltip';

interface CustomerOrder {
  id: string;
  orderNumber: string;
  date: Date;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  total: number;
  items: number;
  tracking?: string;
}

interface CustomerInvoice {
  id: string;
  invoiceNumber: string;
  date: Date;
  dueDate: Date;
  amount: number;
  status: 'paid' | 'pending' | 'overdue';
}

export default function CustomerPortalPage() {
  const [activeTab, setActiveTab] = useState<'orders' | 'invoices' | 'profile'>('orders');
  
  // Sample customer data
  const customer = {
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    phone: "+1 (555) 123-4567",
    address: "123 Lavender Lane, Austin, TX 78701",
    memberSince: new Date(2024, 0, 15)
  };

  const orders: CustomerOrder[] = [
    {
      id: '1',
      orderNumber: 'ORD-001',
      date: new Date(2025, 11, 15),
      status: 'delivered',
      total: 156.99,
      items: 5,
      tracking: 'USPS-1234567890'
    },
    {
      id: '2',
      orderNumber: 'ORD-002',
      date: new Date(2025, 11, 18),
      status: 'shipped',
      total: 89.99,
      items: 3,
      tracking: 'USPS-0987654321'
    },
    {
      id: '3',
      orderNumber: 'ORD-003',
      date: new Date(2025, 11, 19),
      status: 'processing',
      total: 234.50,
      items: 8
    }
  ];

  const invoices: CustomerInvoice[] = [
    {
      id: '1',
      invoiceNumber: 'INV-001',
      date: new Date(2025, 11, 15),
      dueDate: new Date(2025, 11, 29),
      amount: 156.99,
      status: 'paid'
    },
    {
      id: '2',
      invoiceNumber: 'INV-002',
      date: new Date(2025, 11, 18),
      dueDate: new Date(2026, 0, 1),
      amount: 89.99,
      status: 'pending'
    }
  ];

  const getStatusColor = (status: string) => {
    const colors = {
      'delivered': 'bg-green-100 text-green-700 border-green-200',
      'shipped': 'bg-blue-100 text-blue-700 border-blue-200',
      'processing': 'bg-yellow-100 text-yellow-700 border-yellow-200',
      'pending': 'bg-orange-100 text-orange-700 border-orange-200',
      'paid': 'bg-green-100 text-green-700 border-green-200',
      'overdue': 'bg-red-100 text-red-700 border-red-200'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-700 border-gray-200';
  };

  return (
    <Tooltip.Provider delayDuration={200}>
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      {/* Header */}
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                Customer Portal
                <Tooltip.Root>
                  <Tooltip.Trigger asChild>
                    <HelpCircle className="w-5 h-5 text-purple-500 hover:text-purple-600 cursor-help" />
                  </Tooltip.Trigger>
                  <Tooltip.Portal>
                    <Tooltip.Content 
                      side="right" 
                      className="bg-white text-gray-900 px-4 py-3 rounded-lg shadow-xl text-sm max-w-xs z-[9999]"
                      sideOffset={5}
                    >
                      Customer-facing portal for order tracking and account management. View order history, download invoices, update profile information, and track shipments.
                      <Tooltip.Arrow className="fill-white" />
                    </Tooltip.Content>
                  </Tooltip.Portal>
                </Tooltip.Root>
              </h1>
              <p className="text-gray-600 mt-1">Welcome back, {customer.name.split(' ')[0]}!</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{customer.name}</p>
                <p className="text-xs text-gray-500">{customer.email}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-semibold text-lg shadow-lg">
                {customer.name.split(' ').map(n => n[0]).join('')}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-8">
        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm border mb-6">
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab('orders')}
              className={`flex-1 px-6 py-4 font-medium text-sm transition ${
                activeTab === 'orders'
                  ? 'text-purple-600 border-b-2 border-purple-600 bg-purple-50'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <Package className="w-4 h-4 inline-block mr-2" />
              My Orders
            </button>
            <button
              onClick={() => setActiveTab('invoices')}
              className={`flex-1 px-6 py-4 font-medium text-sm transition ${
                activeTab === 'invoices'
                  ? 'text-purple-600 border-b-2 border-purple-600 bg-purple-50'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <FileText className="w-4 h-4 inline-block mr-2" />
              Invoices
            </button>
            <button
              onClick={() => setActiveTab('profile')}
              className={`flex-1 px-6 py-4 font-medium text-sm transition ${
                activeTab === 'profile'
                  ? 'text-purple-600 border-b-2 border-purple-600 bg-purple-50'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <User className="w-4 h-4 inline-block mr-2" />
              Profile
            </button>
          </div>

          {/* Orders Tab */}
          {activeTab === 'orders' && (
            <div className="p-6">
              <div className="space-y-4">
                {orders.map((order) => (
                  <div key={order.id} className="border-2 border-gray-200 rounded-xl p-6 hover:border-purple-300 transition">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">{order.orderNumber}</h3>
                          <span className={`px-3 py-1 text-xs font-medium rounded-full border ${getStatusColor(order.status)}`}>
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {order.date.toLocaleDateString()}
                          </span>
                          <span className="flex items-center gap-1">
                            <Package className="w-4 h-4" />
                            {order.items} items
                          </span>
                          {order.tracking && (
                            <span className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              {order.tracking}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-gray-900">${order.total.toFixed(2)}</p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <button className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition text-sm font-medium">
                        <Eye className="w-4 h-4" />
                        View Details
                      </button>
                      {order.tracking && (
                        <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition text-sm font-medium">
                          <MapPin className="w-4 h-4" />
                          Track Order
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Invoices Tab */}
          {activeTab === 'invoices' && (
            <div className="p-6">
              <div className="space-y-4">
                {invoices.map((invoice) => (
                  <div key={invoice.id} className="border-2 border-gray-200 rounded-xl p-6 hover:border-purple-300 transition">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">{invoice.invoiceNumber}</h3>
                          <span className={`px-3 py-1 text-xs font-medium rounded-full border ${getStatusColor(invoice.status)}`}>
                            {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <span>Issued: {invoice.date.toLocaleDateString()}</span>
                          <span>Due: {invoice.dueDate.toLocaleDateString()}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-gray-900">${invoice.amount.toFixed(2)}</p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <button className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition text-sm font-medium">
                        <Download className="w-4 h-4" />
                        Download PDF
                      </button>
                      {invoice.status !== 'paid' && (
                        <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-sm font-medium">
                          <CreditCard className="w-4 h-4" />
                          Pay Now
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="border-2 border-gray-200 rounded-xl p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <User className="w-5 h-5 text-purple-600" />
                      <h3 className="font-semibold text-gray-900">Personal Information</h3>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Full Name:</span>
                        <span className="font-medium text-gray-900">{customer.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Member Since:</span>
                        <span className="font-medium text-gray-900">{customer.memberSince.toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>

                  <div className="border-2 border-gray-200 rounded-xl p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <Mail className="w-5 h-5 text-purple-600" />
                      <h3 className="font-semibold text-gray-900">Contact Information</h3>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Email:</span>
                        <span className="font-medium text-gray-900">{customer.email}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Phone:</span>
                        <span className="font-medium text-gray-900">{customer.phone}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="border-2 border-gray-200 rounded-xl p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <MapPin className="w-5 h-5 text-purple-600" />
                      <h3 className="font-semibold text-gray-900">Shipping Address</h3>
                    </div>
                    <p className="text-sm text-gray-700">{customer.address}</p>
                    <button className="mt-3 text-sm text-purple-600 hover:text-purple-700 font-medium">
                      Edit Address
                    </button>
                  </div>

                  <div className="border-2 border-gray-200 rounded-xl p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <CreditCard className="w-5 h-5 text-purple-600" />
                      <h3 className="font-semibold text-gray-900">Payment Methods</h3>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">No payment methods saved</p>
                    <button className="text-sm text-purple-600 hover:text-purple-700 font-medium">
                      Add Payment Method
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <button className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-medium">
                  Save Changes
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
    </Tooltip.Provider>
  );
}
