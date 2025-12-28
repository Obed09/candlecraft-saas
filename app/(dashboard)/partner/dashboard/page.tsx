"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, DollarSign, Eye, Link as LinkIcon, 
  CheckCircle, Copy, ExternalLink, Users, Calendar,
  Download, Share2, Award, Target
} from "lucide-react";

// Mock partner data - In production, fetch based on authenticated partner
const partnerData = {
  name: "Sarah's Candle Community",
  slug: "sarah-candle-community",
  email: "sarah@candlecommunity.com",
  joinDate: "2025-12-01",
  commissionRate: 25,
  payoutDay: "1st of each month",
  stats: {
    thisMonth: {
      pageViews: 324,
      clicks: 156,
      freeSignups: 47,
      paidConversions: 38,
      conversionRate: 24.4,
      earnings: 180.50,
      projectedMonthly: 180.50,
    },
    allTime: {
      totalReferrals: 38,
      totalEarnings: 541.50,
      activeSubscribers: 38,
      churnedSubscribers: 0,
    },
    byPlan: {
      professional: 35,
      business: 3,
      enterprise: 0,
    }
  },
  recentConversions: [
    { id: 1, date: "2025-12-24", plan: "Professional", amount: 4.75, status: "active" },
    { id: 2, date: "2025-12-23", plan: "Business", amount: 12.25, status: "active" },
    { id: 3, date: "2025-12-22", plan: "Professional", amount: 4.75, status: "active" },
    { id: 4, date: "2025-12-21", plan: "Professional", amount: 4.75, status: "active" },
    { id: 5, date: "2025-12-20", plan: "Professional", amount: 4.75, status: "active" },
  ],
  topPerformingContent: [
    { source: "Email Blast", clicks: 89, conversions: 18, rate: 20.2 },
    { source: "Facebook Post", clicks: 45, conversions: 12, rate: 26.7 },
    { source: "Instagram Stories", clicks: 22, conversions: 8, rate: 36.4 },
  ]
};

export default function PartnerDashboard() {
  const [copied, setCopied] = useState(false);
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000';
  const partnerUrl = `${baseUrl}/join/${partnerData.slug}`;

  const copyLink = () => {
    navigator.clipboard.writeText(partnerUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      
      {/* Welcome Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between flex-wrap gap-4 mb-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Welcome back, {partnerData.name}! 👋</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Here's how your partnership is performing
            </p>
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all">
              <Share2 className="w-4 h-4" />
              Get Marketing Kit
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-all">
              <Download className="w-4 h-4" />
              Export Report
            </button>
          </div>
        </div>

        {/* Partner Link */}
        <Card className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex-1">
                <p className="text-sm text-white/80 mb-2">Your Exclusive Partner Link</p>
                <p className="text-xl font-mono bg-white/10 px-4 py-2 rounded-lg inline-block">
                  {partnerUrl}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={copyLink}
                  className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-all"
                >
                  {copied ? (
                    <>
                      <CheckCircle className="w-4 h-4" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      Copy Link
                    </>
                  )}
                </button>
                <a
                  href={partnerUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-all"
                >
                  <ExternalLink className="w-4 h-4" />
                  Preview
                </a>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Key Metrics - This Month */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-600 dark:text-gray-400">This Month's Earnings</p>
              <DollarSign className="w-5 h-5 text-green-600" />
            </div>
            <p className="text-3xl font-bold text-green-600 dark:text-green-400">
              ${partnerData.stats.thisMonth.earnings.toFixed(2)}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              {partnerData.commissionRate}% commission rate
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-600 dark:text-gray-400">Paid Conversions</p>
              <CheckCircle className="w-5 h-5 text-purple-600" />
            </div>
            <p className="text-3xl font-bold">{partnerData.stats.thisMonth.paidConversions}</p>
            <p className="text-xs text-gray-500 mt-1">
              {partnerData.stats.thisMonth.conversionRate}% conversion rate
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-600 dark:text-gray-400">Link Clicks</p>
              <LinkIcon className="w-5 h-5 text-blue-600" />
            </div>
            <p className="text-3xl font-bold">{partnerData.stats.thisMonth.clicks}</p>
            <p className="text-xs text-gray-500 mt-1">
              {partnerData.stats.thisMonth.pageViews} page views
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-600 dark:text-gray-400">Active Subscribers</p>
              <Users className="w-5 h-5 text-indigo-600" />
            </div>
            <p className="text-3xl font-bold">{partnerData.stats.allTime.activeSubscribers}</p>
            <p className="text-xs text-gray-500 mt-1">
              0 churned this month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* All-Time Stats */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Lifetime Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center p-4 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg border border-green-200 dark:border-green-800">
              <DollarSign className="w-8 h-8 mx-auto mb-2 text-green-600" />
              <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                ${partnerData.stats.allTime.totalEarnings.toFixed(2)}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Total Earned</p>
            </div>

            <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
              <Users className="w-8 h-8 mx-auto mb-2 text-purple-600" />
              <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                {partnerData.stats.allTime.totalReferrals}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Total Referrals</p>
            </div>

            <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <Target className="w-8 h-8 mx-auto mb-2 text-blue-600" />
              <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                {partnerData.stats.thisMonth.conversionRate}%
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Avg Conv. Rate</p>
            </div>

            <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 rounded-lg border border-orange-200 dark:border-orange-800">
              <Award className="w-8 h-8 mx-auto mb-2 text-orange-600" />
              <p className="text-3xl font-bold text-orange-600 dark:text-orange-400">
                ${(partnerData.stats.allTime.totalEarnings / partnerData.stats.allTime.totalReferrals).toFixed(2)}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Avg Per Referral</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Plan Distribution & Performance */}
      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        
        {/* Plan Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Referrals by Plan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Professional ($19/mo)</span>
                  <span className="text-sm font-bold text-purple-600 dark:text-purple-400">
                    {partnerData.stats.byPlan.professional} referrals
                  </span>
                </div>
                <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-purple-600 h-2 rounded-full"
                    style={{ width: `${(partnerData.stats.byPlan.professional / partnerData.stats.allTime.totalReferrals) * 100}%` }}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  ${(partnerData.stats.byPlan.professional * 4.75).toFixed(2)}/month
                </p>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Business ($49/mo)</span>
                  <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400">
                    {partnerData.stats.byPlan.business} referrals
                  </span>
                </div>
                <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-indigo-600 h-2 rounded-full"
                    style={{ width: `${(partnerData.stats.byPlan.business / partnerData.stats.allTime.totalReferrals) * 100}%` }}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  ${(partnerData.stats.byPlan.business * 12.25).toFixed(2)}/month
                </p>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Enterprise (Custom)</span>
                  <span className="text-sm font-bold text-pink-600 dark:text-pink-400">
                    {partnerData.stats.byPlan.enterprise} referrals
                  </span>
                </div>
                <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-pink-600 h-2 rounded-full"
                    style={{ width: `${(partnerData.stats.byPlan.enterprise / partnerData.stats.allTime.totalReferrals) * 100}%` }}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Custom commission
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Top Performing Content */}
        <Card>
          <CardHeader>
            <CardTitle>Top Performing Sources</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {partnerData.topPerformingContent.map((content, idx) => (
                <div key={idx} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold">{content.source}</h4>
                    <Badge className="bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300">
                      {content.rate}% conv.
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600 dark:text-gray-400">Clicks</p>
                      <p className="font-bold">{content.clicks}</p>
                    </div>
                    <div>
                      <p className="text-gray-600 dark:text-gray-400">Conversions</p>
                      <p className="font-bold text-purple-600 dark:text-purple-400">{content.conversions}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Conversions */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Recent Conversions</CardTitle>
            <Badge className="bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300">
              Last 5
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600 dark:text-gray-400">Date</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600 dark:text-gray-400">Plan</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600 dark:text-gray-400">Your Earnings</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600 dark:text-gray-400">Status</th>
                </tr>
              </thead>
              <tbody>
                {partnerData.recentConversions.map((conversion) => (
                  <tr key={conversion.id} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                    <td className="py-3 px-4 text-sm">
                      <Calendar className="w-3 h-3 inline mr-2 text-gray-400" />
                      {conversion.date}
                    </td>
                    <td className="py-3 px-4">
                      <Badge className="bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 text-xs">
                        {conversion.plan}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-sm font-semibold text-green-600 dark:text-green-400">
                      ${conversion.amount}/mo
                    </td>
                    <td className="py-3 px-4">
                      <Badge className="bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 text-xs">
                        {conversion.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Payout Info */}
      <Card className="mt-8 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200 dark:border-green-800">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h3 className="font-bold text-lg mb-1">Next Payout</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Scheduled for <span className="font-semibold">{partnerData.payoutDay}</span>
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Expected Amount</p>
              <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                ${partnerData.stats.thisMonth.earnings.toFixed(2)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

    </div>
  );
}
