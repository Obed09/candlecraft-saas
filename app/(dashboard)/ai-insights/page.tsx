"use client";

import { Sparkles } from "lucide-react";

/**
 * AI Insights — honest placeholder.
 *
 * The previous version of this screen displayed hardcoded revenue figures
 * ($12,450, +23.5%, confidence scores, etc.) that were NOT derived from the
 * user's real data. Fabricated financial numbers must not ship, so this screen
 * is now an honest "coming soon" until real AI/reporting is wired to the DB.
 */
export default function AIInsightsPage() {
  return (
    <div className="p-8 max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
          <Sparkles className="w-8 h-8 text-purple-600" />
          AI Insights &amp; Recommendations
        </h1>
        <p className="text-gray-600 mt-2">
          Intelligent analytics on your own business data — coming soon.
        </p>
      </div>

      <div className="bg-white border-2 border-dashed border-purple-200 rounded-xl p-10 text-center">
        <Sparkles className="w-16 h-16 text-purple-300 mx-auto mb-4" />
        <h2 className="text-2xl font-semibold text-gray-900 mb-3">
          Coming soon
        </h2>
        <p className="text-gray-600 max-w-md mx-auto">
          AI-generated recommendations, insights and forecasts are being built.
          When available, they will be computed from <em>your</em> recipes,
          orders, inventory and costs — never from placeholder data.
        </p>
      </div>
    </div>
  );
}
