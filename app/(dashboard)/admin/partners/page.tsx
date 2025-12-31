"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Users, TrendingUp, DollarSign, Eye, Link as LinkIcon, 
  CheckCircle, Clock, AlertCircle, Search, Filter,
  Download, BarChart3, Calendar
} from "lucide-react";

// Mock data - Replace with real data from your database
const partnersData = [
  {
    id: 1,
    name: "Sarah's Candle Community",
    slug: "sarah-candle-community",
    email: "sarah@candlecommunity.com",
    joinDate: "2025-12-01",
    status: "active",
    communitySize: 8500,
    stats: {
      pageViews: 324,
      clicks: 156,
      signups: 47,
      conversions: 38,
      conversionRate: 24.4,
      monthlyRevenue: 722, // \$29 * 38
      totalCommission: 180.50, // 25% of revenue
    },
    plans: {
      professional: 35,
      business: 3,
      enterprise: 0
    }
  },
  {
    id: 2,
    name: "Pro Candle Makers",
    slug: "pro-candle-makers",
    email: "admin@procandlemakers.com",
    joinDate: "2025-12-05",
    status: "active",
    communitySize: 12000,
    stats: {
      pageViews: 578,
      clicks: 289,
      signups: 68,
      conversions: 52,
      conversionRate: 18.0,
      monthlyRevenue: 988,
      totalCommission: 247.00,
    },
    plans: {
      professional: 45,
      business: 7,
      enterprise: 0
    }
  },
  {
    id: 3,
    name: "Candle Business Academy",
    slug: "candle-business-academy",
    email: "contact@candlebizacademy.com",
    joinDate: "2025-12-10",
    status: "active",
    communitySize: 5200,
    stats: {
      pageViews: 189,
      clicks: 92,
      signups: 31,
      conversions: 24,
      conversionRate: 26.1,
      monthlyRevenue: 456,
      totalCommission: 114.00,
    },
    plans: {
      professional: 22,
      business: 2,
      enterprise: 0
    }
  },
  {
    id: 4,
    name: "Artisan Candle Collective",
    slug: "artisan-candle-collective",
    email: "hello@artisancollective.com",
    joinDate: "2025-12-15",
    status: "pending",
    communitySize: 3400,
    stats: {
      pageViews: 45,
      clicks: 18,
      signups: 5,
      conversions: 2,
      conversionRate: 11.1,
      monthlyRevenue: 38,
      totalCommission: 9.50,
    },
    plans: {
      professional: 2,
      business: 0,
      enterprise: 0
    }
  },
];

// Calculate totals
const totalStats = {
  partners: partnersData.length,
  activePartners: partnersData.filter(p => p.status === "active").length,
  totalPageViews: partnersData.reduce((sum, p) => sum + p.stats.pageViews, 0),
  totalClicks: partnersData.reduce((sum, p) => sum + p.stats.clicks, 0),
  totalSignups: partnersData.reduce((sum, p) => sum + p.stats.signups, 0),
  totalConversions: partnersData.reduce((sum, p) => sum + p.stats.conversions, 0),
  totalMonthlyRevenue: partnersData.reduce((sum, p) => sum + p.stats.monthlyRevenue, 0),
  totalCommissions: partnersData.reduce((sum, p) => sum + p.stats.totalCommission, 0),
  yourRevenue: partnersData.reduce((sum, p) => sum + (p.stats.monthlyRevenue - p.stats.totalCommission), 0),
  avgConversionRate: (partnersData.reduce((sum, p) => sum + p.stats.conversionRate, 0) / partnersData.length).toFixed(1),
};

export default function AdminPartnersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("conversions");

  const filteredPartners = partnersData
    .filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           p.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === "all" || p.status === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "conversions":
          return b.stats.conversions - a.stats.conversions;
        case "revenue":
          return b.stats.monthlyRevenue - a.stats.monthlyRevenue;
        case "rate":
          return b.stats.conversionRate - a.stats.conversionRate;
        default:
          return 0;
      }
    });

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-3xl font-bold">Partner Analytics Dashboard</h1>
          <button className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all">
            <Download className="w-4 h-4" />
            Export Report
          </button>
        </div>
        <p className="text-gray-600 dark:text-gray-400">
          Complete overview of all partner performance and revenue
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Partners</p>
              <Users className="w-5 h-5 text-purple-600" />
            </div>
            <p className="text-3xl font-bold">{totalStats.activePartners}</p>
            <p className="text-xs text-gray-500 mt-1">
              {totalStats.partners - totalStats.activePartners} pending
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Conversions</p>
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <p className="text-3xl font-bold">{totalStats.totalConversions}</p>
            <p className="text-xs text-gray-500 mt-1">
              {totalStats.avgConversionRate}% avg conversion rate
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-600 dark:text-gray-400">Partner Commissions</p>
              <DollarSign className="w-5 h-5 text-orange-600" />
            </div>
            <p className="text-3xl font-bold">${totalStats.totalCommissions.toFixed(2)}</p>
            <p className="text-xs text-gray-500 mt-1">25% commission rate</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-600 dark:text-gray-400">Your Revenue (75%)</p>
              <TrendingUp className="w-5 h-5 text-indigo-600" />
            </div>
            <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
              ${totalStats.yourRevenue.toFixed(2)}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              ${totalStats.totalMonthlyRevenue.toFixed(2)} total MRR
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Performance Overview */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Traffic & Conversion Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <Eye className="w-6 h-6 mx-auto mb-2 text-gray-600 dark:text-gray-400" />
              <p className="text-2xl font-bold">{totalStats.totalPageViews}</p>
              <p className="text-xs text-gray-500">Page Views</p>
            </div>
            <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <LinkIcon className="w-6 h-6 mx-auto mb-2 text-blue-600" />
              <p className="text-2xl font-bold">{totalStats.totalClicks}</p>
              <p className="text-xs text-gray-500">Link Clicks</p>
            </div>
            <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <Users className="w-6 h-6 mx-auto mb-2 text-purple-600" />
              <p className="text-2xl font-bold">{totalStats.totalSignups}</p>
              <p className="text-xs text-gray-500">Free Signups</p>
            </div>
            <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <CheckCircle className="w-6 h-6 mx-auto mb-2 text-green-600" />
              <p className="text-2xl font-bold">{totalStats.totalConversions}</p>
              <p className="text-xs text-gray-500">Paid Conversions</p>
            </div>
            <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <BarChart3 className="w-6 h-6 mx-auto mb-2 text-indigo-600" />
              <p className="text-2xl font-bold">{totalStats.avgConversionRate}%</p>
              <p className="text-xs text-gray-500">Avg Conv. Rate</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="pending">Pending</option>
                <option value="paused">Paused</option>
              </select>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800"
              >
                <option value="conversions">Sort by Conversions</option>
                <option value="revenue">Sort by Revenue</option>
                <option value="rate">Sort by Conv. Rate</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Partners List */}
      <div className="space-y-4">
        {filteredPartners.map((partner) => (
          <Card key={partner.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="grid lg:grid-cols-12 gap-6">
                
                {/* Partner Info */}
                <div className="lg:col-span-3">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-bold text-lg">{partner.name}</h3>
                      <p className="text-sm text-gray-500">/{partner.slug}</p>
                    </div>
                    <Badge className={
                      partner.status === "active" 
                        ? "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300"
                        : "bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300"
                    }>
                      {partner.status}
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">{partner.email}</p>
                  <p className="text-xs text-gray-500">
                    <Calendar className="w-3 h-3 inline mr-1" />
                    Joined {partner.joinDate}
                  </p>
                  <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Community Size</p>
                    <p className="font-semibold">{partner.communitySize.toLocaleString()} members</p>
                  </div>
                </div>

                {/* Stats */}
                <div className="lg:col-span-5">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
                      <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Page Views</p>
                      <p className="text-xl font-bold">{partner.stats.pageViews}</p>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
                      <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Clicks</p>
                      <p className="text-xl font-bold">{partner.stats.clicks}</p>
                    </div>
                    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3">
                      <p className="text-xs text-blue-600 dark:text-blue-400 mb-1">Free Signups</p>
                      <p className="text-xl font-bold text-blue-600 dark:text-blue-400">{partner.stats.signups}</p>
                    </div>
                    <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3">
                      <p className="text-xs text-green-600 dark:text-green-400 mb-1">Paid Conversions</p>
                      <p className="text-xl font-bold text-green-600 dark:text-green-400">{partner.stats.conversions}</p>
                    </div>
                  </div>
                  <div className="mt-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg p-3">
                    <p className="text-xs text-purple-600 dark:text-purple-400 mb-1">Conversion Rate</p>
                    <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                      {partner.stats.conversionRate}%
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {partner.stats.conversions} of {partner.stats.clicks} clicks converted
                    </p>
                  </div>
                </div>

                {/* Revenue */}
                <div className="lg:col-span-4">
                  <div className="space-y-3">
                    <div className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-lg p-4 border border-purple-200 dark:border-purple-800">
                      <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Monthly Revenue</p>
                      <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                        ${partner.stats.monthlyRevenue}
                      </p>
                      <div className="mt-3 pt-3 border-t border-purple-200 dark:border-purple-700">
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-gray-600 dark:text-gray-400">Their Commission (25%)</span>
                          <span className="font-semibold">${partner.stats.totalCommission}</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-600 dark:text-gray-400">Your Share (75%)</span>
                          <span className="font-semibold text-indigo-600 dark:text-indigo-400">
                            ${(partner.stats.monthlyRevenue - partner.stats.totalCommission).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
                      <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">Plan Distribution</p>
                      <div className="space-y-1 text-xs">
                        <div className="flex justify-between">
                          <span>Professional (\$29)</span>
                          <span className="font-semibold">{partner.plans.professional}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Business ($49)</span>
                          <span className="font-semibold">{partner.plans.business}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Enterprise</span>
                          <span className="font-semibold">{partner.plans.enterprise}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Actions */}
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 flex gap-2">
                <button className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-sm font-medium">
                  View Details
                </button>
                <button className="flex-1 px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 text-sm font-medium">
                  Contact Partner
                </button>
                <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 text-sm font-medium">
                  Export Data
                </button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredPartners.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-400">No partners found matching your filters</p>
          </CardContent>
        </Card>
      )}

    </div>
  );
}
