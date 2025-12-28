"use client";

import { useState } from "react";
import { Users, Plus, Search, Mail, Phone, Star, X, Edit, HelpCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import * as Tooltip from '@radix-ui/react-tooltip';

interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  totalOrders: number;
  totalSpent: number;
  loyaltyTier: "Bronze" | "Silver" | "Gold" | "Platinum";
  favoriteScents: string[];
  lastOrderDate: string;
}

const initialCustomers: Customer[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah.j@email.com",
    phone: "(561) 555-0123",
    totalOrders: 12,
    totalSpent: 850.00,
    loyaltyTier: "Gold",
    favoriteScents: ["Lavender", "Ocean Breeze"],
    lastOrderDate: "2025-12-10",
  },
  {
    id: 2,
    name: "Michael Chen",
    email: "mchen@business.com",
    phone: "(561) 555-0456",
    totalOrders: 25,
    totalSpent: 1850.00,
    loyaltyTier: "Platinum",
    favoriteScents: ["Vanilla", "Autumn Spice"],
    lastOrderDate: "2025-12-15",
  },
  {
    id: 3,
    name: "Emma Davis",
    email: "emma.d@gmail.com",
    phone: "(561) 555-0789",
    totalOrders: 5,
    totalSpent: 320.00,
    loyaltyTier: "Silver",
    favoriteScents: ["Fresh Linen"],
    lastOrderDate: "2025-11-28",
  },
];

export default function CustomerManager() {
  const [customers, setCustomers] = useState<Customer[]>(initialCustomers);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [newCustomer, setNewCustomer] = useState({
    name: "",
    email: "",
    phone: "",
    favoriteScents: [""],
  });

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addCustomer = () => {
    if (!newCustomer.name || !newCustomer.email) {
      alert("Please enter name and email");
      return;
    }

    const customer: Customer = {
      id: Date.now(),
      name: newCustomer.name,
      email: newCustomer.email,
      phone: newCustomer.phone,
      totalOrders: 0,
      totalSpent: 0,
      loyaltyTier: "Bronze",
      favoriteScents: newCustomer.favoriteScents.filter(s => s.trim() !== ""),
      lastOrderDate: new Date().toISOString().split('T')[0],
    };

    setCustomers([...customers, customer]);
    setNewCustomer({ name: "", email: "", phone: "", favoriteScents: [""] });
    setShowAddModal(false);
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case "Platinum": return "bg-purple-100 text-purple-700";
      case "Gold": return "bg-yellow-100 text-yellow-700";
      case "Silver": return "bg-gray-200 text-gray-700";
      default: return "bg-orange-100 text-orange-700";
    }
  };

  const getTierIcon = (tier: string) => {
    switch (tier) {
      case "Platinum": return "💎";
      case "Gold": return "🥇";
      case "Silver": return "🥈";
      default: return "🥉";
    }
  };

  return (
    <Tooltip.Provider delayDuration={200}>
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
              <Users className="w-6 h-6 text-white" />
            </div>
            Customer Manager
            <Tooltip.Root>
              <Tooltip.Trigger asChild>
                <HelpCircle className="w-6 h-6 text-green-500 hover:text-green-600 cursor-help" />
              </Tooltip.Trigger>
              <Tooltip.Portal>
                <Tooltip.Content 
                  side="right" 
                  className="bg-white text-gray-900 px-4 py-3 rounded-lg shadow-xl text-sm max-w-xs z-[9999]"
                  sideOffset={5}
                >
                  Manage customer relationships and build loyalty. Track customer orders, spending history, favorite scents, and assign loyalty tiers (Bronze, Silver, Gold, Platinum).
                  <Tooltip.Arrow className="fill-white" />
                </Tooltip.Content>
              </Tooltip.Portal>
            </Tooltip.Root>
          </h1>
          <p className="text-gray-600 mt-2">Manage your customer relationships and loyalty</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5 flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add Customer
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        <Input
          type="text"
          placeholder="Search customers by name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-12 py-6 text-lg border-2"
        />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-emerald-50">
          <CardContent className="p-6">
            <div className="text-sm text-green-700 mb-1">Total Customers</div>
            <div className="text-3xl font-bold text-green-900">{customers.length}</div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-indigo-50">
          <CardContent className="p-6">
            <div className="text-sm text-purple-700 mb-1">Total Revenue</div>
            <div className="text-3xl font-bold text-purple-900">
              ${customers.reduce((sum, c) => sum + c.totalSpent, 0).toFixed(0)}
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-cyan-50">
          <CardContent className="p-6">
            <div className="text-sm text-blue-700 mb-1">Avg Order Value</div>
            <div className="text-3xl font-bold text-blue-900">
              ${(customers.reduce((sum, c) => sum + c.totalSpent, 0) / 
                 customers.reduce((sum, c) => sum + c.totalOrders, 0)).toFixed(0)}
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-lg bg-gradient-to-br from-yellow-50 to-amber-50">
          <CardContent className="p-6">
            <div className="text-sm text-yellow-700 mb-1">VIP Customers</div>
            <div className="text-3xl font-bold text-yellow-900">
              {customers.filter(c => c.loyaltyTier === "Gold" || c.loyaltyTier === "Platinum").length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Customer List */}
      <div className="space-y-4">
        {filteredCustomers.map((customer) => (
          <Card key={customer.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 flex-1">
                  <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                    {customer.name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-lg font-bold text-gray-900">{customer.name}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getTierColor(customer.loyaltyTier)}`}>
                        {getTierIcon(customer.loyaltyTier)} {customer.loyaltyTier}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Mail className="w-4 h-4" />
                        {customer.email}
                      </div>
                      <div className="flex items-center gap-1">
                        <Phone className="w-4 h-4" />
                        {customer.phone}
                      </div>
                    </div>
                    <div className="flex items-center gap-4 mt-2 text-sm">
                      <span className="text-gray-600">
                        <strong>{customer.totalOrders}</strong> orders
                      </span>
                      <span className="text-green-600 font-semibold">
                        ${customer.totalSpent.toFixed(2)} spent
                      </span>
                      <span className="text-gray-500">
                        Last order: {new Date(customer.lastOrderDate).toLocaleDateString()}
                      </span>
                    </div>
                    {customer.favoriteScents.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        <span className="text-xs text-gray-500">Favorites:</span>
                        {customer.favoriteScents.map((scent, idx) => (
                          <span key={idx} className="px-2 py-1 bg-pink-50 text-pink-700 rounded-lg text-xs">
                            {scent}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium flex items-center gap-2">
                    <Edit className="w-4 h-4" />
                    Edit
                  </button>
                  <button className="px-4 py-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors text-sm font-medium">
                    📧 Email
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add Customer Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" onClick={() => setShowAddModal(false)}>
          <div className="bg-white rounded-2xl max-w-2xl w-full" onClick={(e) => e.stopPropagation()}>
            <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-6 rounded-t-2xl relative">
              <h2 className="text-2xl font-bold mb-2">Add New Customer</h2>
              <p className="text-green-100">Create a new customer profile</p>
              <button
                onClick={() => setShowAddModal(false)}
                className="absolute top-4 right-4 w-8 h-8 bg-white/20 hover:bg-white/30 rounded-lg flex items-center justify-center"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <Label>Customer Name *</Label>
                <Input
                  value={newCustomer.name}
                  onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
                  placeholder="John Doe"
                  className="mt-2"
                />
              </div>
              <div>
                <Label>Email *</Label>
                <Input
                  type="email"
                  value={newCustomer.email}
                  onChange={(e) => setNewCustomer({ ...newCustomer, email: e.target.value })}
                  placeholder="john@example.com"
                  className="mt-2"
                />
              </div>
              <div>
                <Label>Phone</Label>
                <Input
                  value={newCustomer.phone}
                  onChange={(e) => setNewCustomer({ ...newCustomer, phone: e.target.value })}
                  placeholder="(555) 123-4567"
                  className="mt-2"
                />
              </div>
              <div className="grid grid-cols-2 gap-4 pt-4">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="px-6 py-3 bg-gray-500 text-white rounded-xl font-semibold hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  onClick={addCustomer}
                  className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-semibold hover:shadow-lg"
                >
                  Add Customer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
    </Tooltip.Provider>
  );
}
