"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Copy, ExternalLink, Users, TrendingUp, DollarSign } from "lucide-react";

export default function PartnerLinksPage() {
  const [partnerName, setPartnerName] = useState("");
  const [generatedSlug, setGeneratedSlug] = useState("");
  const [copied, setCopied] = useState(false);

  const generateSlug = () => {
    const slug = partnerName
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
    setGeneratedSlug(slug);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000';
  const fullUrl = generatedSlug ? `${baseUrl}/join/${generatedSlug}` : '';

  // Example partners for demonstration
  const examplePartners = [
    { name: "Sarah's Candle Community", slug: "sarah-candle-community", members: 8500, conversions: 47 },
    { name: "Pro Candle Makers", slug: "pro-candle-makers", members: 12000, conversions: 68 },
    { name: "Candle Business Academy", slug: "candle-business-academy", members: 5200, conversions: 31 },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Partner Landing Page Generator</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Create custom landing pages for your community partners with automatic tracking
        </p>
      </div>

      {/* Link Generator */}
      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Generate New Partner Link</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Partner/Community Name
                </label>
                <input
                  type="text"
                  placeholder="e.g., Sarah's Candle Community"
                  value={partnerName}
                  onChange={(e) => setPartnerName(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <button
                onClick={generateSlug}
                disabled={!partnerName}
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-2 px-4 rounded-lg font-semibold hover:from-purple-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                Generate Link
              </button>

              {generatedSlug && (
                <div className="mt-4 space-y-3">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      URL Slug
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={generatedSlug}
                        onChange={(e) => setGeneratedSlug(e.target.value)}
                        className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
                      />
                      <button
                        onClick={() => copyToClipboard(generatedSlug)}
                        className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Full Landing Page URL
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={fullUrl}
                        readOnly
                        className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800"
                      />
                      <button
                        onClick={() => copyToClipboard(fullUrl)}
                        className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                      >
                        {copied ? "Copied!" : <Copy className="w-4 h-4" />}
                      </button>
                      <a
                        href={fullUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>

                  <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border border-green-200 dark:border-green-800">
                    <p className="text-sm text-green-800 dark:text-green-200 font-semibold mb-2">
                      ✓ Link Generated Successfully!
                    </p>
                    <p className="text-xs text-green-700 dark:text-green-300">
                      Share this link with your partner. The landing page will automatically display their community name and track all conversions.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Partner Commission Calculator</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Expected Conversions
                </label>
                <input
                  type="number"
                  placeholder="e.g., 50"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
                  onChange={(e) => {
                    const conversions = parseInt(e.target.value) || 0;
                    const monthlyCommission = conversions * 4.75;
                    const annualCommission = monthlyCommission * 12;
                    (e.target as HTMLInputElement).dataset.monthly = monthlyCommission.toFixed(2);
                    (e.target as HTMLInputElement).dataset.annual = annualCommission.toFixed(2);
                  }}
                />
              </div>

              <div className="space-y-3">
                <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Monthly Commission (25%)</p>
                  <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                    Calculate above
                  </p>
                </div>

                <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-lg p-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Annual Commission</p>
                  <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                    Calculate above
                  </p>
                </div>

                <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Your Monthly Revenue (75%)</p>
                  <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                    Calculate above
                  </p>
                </div>
              </div>

              <div className="border-t pt-4">
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Commission Structure:</p>
                <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                  <li>• Professional Plan: $19/mo × 25% = <span className="font-semibold">$4.75/user</span></li>
                  <li>• Business Plan: $49/mo × 25% = <span className="font-semibold">$12.25/user</span></li>
                  <li>• Paid monthly, tracked automatically</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Example Partners */}
      <Card>
        <CardHeader>
          <CardTitle>Example Partner Links</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {examplePartners.map((partner, idx) => (
              <div key={idx} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-lg">{partner.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">/{partner.slug}</p>
                  </div>
                  <Badge className="bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300">
                    Active
                  </Badge>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-3">
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-1">
                      <Users className="w-4 h-4" />
                      <span className="text-xs">Community</span>
                    </div>
                    <p className="font-bold">{partner.members.toLocaleString()}</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-1">
                      <TrendingUp className="w-4 h-4" />
                      <span className="text-xs">Conversions</span>
                    </div>
                    <p className="font-bold">{partner.conversions}</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-1">
                      <DollarSign className="w-4 h-4" />
                      <span className="text-xs">Commission</span>
                    </div>
                    <p className="font-bold">${(partner.conversions * 4.75).toFixed(2)}/mo</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => copyToClipboard(`${baseUrl}/join/${partner.slug}`)}
                    className="flex-1 px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 text-sm font-medium flex items-center justify-center gap-2"
                  >
                    <Copy className="w-4 h-4" />
                    Copy Link
                  </button>
                  <a
                    href={`/join/${partner.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-sm font-medium flex items-center justify-center gap-2"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Preview
                  </a>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Instructions */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>How to Use Partner Links</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 text-sm text-gray-600 dark:text-gray-400">
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">1. Generate a Link</h4>
              <p>Enter the partner's community name and click "Generate Link". The system will create a unique URL slug.</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">2. Share with Partner</h4>
              <p>Copy the full URL and send it to your partner. They can use this link in emails, social posts, and their website.</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">3. Track Conversions</h4>
              <p>The landing page automatically displays their community name and tracks all signups from their link.</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">4. Pay Commissions</h4>
              <p>Partners earn 25% recurring commission ($4.75/user for Professional, $12.25/user for Business).</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
