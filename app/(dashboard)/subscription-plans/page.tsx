"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Sparkles, Zap, Crown, GraduationCap } from "lucide-react";

export default function SubscriptionPlansPage() {
  const plans = [
    {
      name: "Starter",
      icon: Sparkles,
      price: "Free",
      period: "Forever",
      description: "Perfect for hobbyists just getting started",
      color: "from-gray-500 to-gray-600",
      features: [
        "Up to 25 recipes",
        "Up to 50 products in inventory",
        "Full cost calculator access",
        "Up to 20 customer orders/month",
        "Basic analytics & reporting",
        "Recipe templates included",
        "🤖 14 AI social media posts (total)",
        "Facebook auto-posting only",
        "Pre-written templates",
        "Email support (72h response)",
        "Community access"
      ],
      limitations: [
        "No barcode generation",
        "No AI voice training",
        "No Instagram or LinkedIn",
        "No team collaboration",
        "No Masterclass access"
      ],
      cta: "Get Started Free",
      popular: false
    },
    {
      name: "Professional",
      icon: Zap,
      price: "$19",
      originalPrice: "$39",
      period: "per month",
      subtext: "FOUNDER PRICING - LOCKED FOREVER",
      description: "Lock in this rate for life - First 1,000 users only",
      color: "from-purple-600 to-indigo-600",
      features: [
        "✨ EVERYTHING UNLIMITED - No restrictions",
        "Unlimited recipes & products",
        "Full inventory management",
        "Advanced cost calculator & pricing wizard",
        "Unlimited orders & customers",
        "Production planning & scheduling",
        "Supplier management system",
        "Quality control workflows",
        "Barcode & QR code generation",
        "Professional invoice generation",
        "Advanced analytics & reporting",
        "Testing log & recipe database",
        "🤖 30 AI social media posts/month",
        "✨ AI learns YOUR writing style",
        "Facebook + Instagram auto-posting",
        "Sounds human, not robotic",
        "Priority email support (24h response)",
        "🎁 FREE Beginner's Masterclass ($297 value)",
        "🏆 Founder Member badge & exclusive group",
        "🔒 Price locked forever - Never increases"
      ],
      limitations: [
        "Single user account",
        "LinkedIn not included"
      ],
      cta: "Lock In $19/mo Forever",
      popular: true,
      badge: "FOUNDER SPECIAL",
      spotsLeft: "647 spots remaining",
      savings: "Save $240/year"
    },
    {
      name: "Business",
      icon: Crown,
      price: "$49",
      originalPrice: "$99",
      period: "per month",
      subtext: "EARLY ADOPTER PRICING - Year 1",
      description: "For teams & growing businesses",
      color: "from-amber-500 to-orange-600",
      features: [
        "Everything in Professional, plus:",
        "Up to 5 team members included",
        "Team collaboration & role management",
        "Customer portal with order tracking",
        "🚀 120 AI social media posts/month",
        "Facebook + Instagram + LinkedIn",
        "Advanced AI voice matching",
        "Auto-reply to comments (coming soon)",
        "AI-powered scent blending (30 requests/mo)",
        "AI business insights (20 requests/mo)",
        "E-commerce platform integration",
        "Advanced automation workflows",
        "Custom branding on invoices & documents",
        "Dedicated support (4h response)",
        "🎁 FREE Beginner's Masterclass ($297 value)",
        "Priority access to new features",
        "Data export & API access"
      ],
      limitations: [],
      cta: "Start 14-Day Free Trial",
      popular: false,
      badge: "Best for Teams",
      spotsLeft: "289 spots remaining",
      savings: "Save $600 first year"
    },
    {
      name: "Enterprise",
      icon: GraduationCap,
      price: "Custom",
      period: "Contact us",
      description: "For large operations & candle academies",
      color: "from-pink-600 to-rose-600",
      features: [
        "Everything in Business, plus:",
        "Unlimited team members",
        "🚀 UNLIMITED AI social media posts",
        "All platforms (FB, IG, LinkedIn, Twitter)",
        "Multi-brand voice profiles",
        "Priority AI processing",
        "Unlimited AI requests (scent blending, insights)",
        "White-label solution available",
        "Custom integrations & API access",
        "Advanced security & compliance",
        "Dedicated account manager",
        "Phone & video call support (1h response)",
        "On-site training available",
        "🎁 Beginner's Masterclass ($297 value)",
        "🎁 Cement Vessel Workshop ($497 value)",
        "Custom feature development",
        "SLA guarantee (99.9% uptime)",
        "Quarterly business strategy sessions"
      ],
      limitations: [],
      cta: "Contact Sales",
      popular: false,
      badge: "Best Value"
    }
  ];

  const addons = [
    {
      name: "Beginner's Masterclass",
      price: "$297",
      description: "Comprehensive candle-making course for all skill levels",
      features: [
        "10+ hours of video content",
        "Step-by-step tutorials",
        "Safety guidelines & best practices",
        "Material selection guide",
        "Troubleshooting common issues",
        "Fragrance blending techniques",
        "Business startup strategies",
        "Lifetime access to content",
        "Certificate of completion"
      ],
      badge: "New!",
      color: "from-blue-500 to-cyan-500"
    },
    {
      name: "Cement Vessel Workshop",
      price: "$497",
      description: "Master the art of creating custom cement candle vessels",
      features: [
        "5+ hours of hands-on instruction",
        "Mold design & creation",
        "Mixing ratios & techniques",
        "Finishing & sealing methods",
        "Color & texture customization",
        "Safety & workspace setup",
        "Material sourcing guide",
        "Lifetime access to content",
        "Exclusive templates & designs"
      ],
      badge: "Coming Soon",
      color: "from-emerald-500 to-teal-500"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <Badge className="mb-4 bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300">
          🎯 FOUNDER LAUNCH - Limited Time Only
        </Badge>
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 bg-clip-text text-transparent mb-4">
          Lock In Founder Pricing Forever
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-4">
          Join the first 1,000 candle makers to get lifetime founder pricing. Once it's gone, it's gone forever.
        </p>
        <div className="flex items-center justify-center gap-6 text-sm text-gray-600 dark:text-gray-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            <span>647 Founder spots remaining</span>
          </div>
          <div>•</div>
          <div>⏰ Offer ends in 72 hours</div>
        </div>
      </div>

      {/* Subscription Plans */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {plans.map((plan, index) => {
          const Icon = plan.icon;
          return (
            <Card
              key={index}
              className={`relative border-2 ${
                plan.popular
                  ? "border-purple-500 shadow-2xl shadow-purple-200 dark:shadow-purple-900/50 scale-105"
                  : "border-gray-200 dark:border-gray-700"
              } hover:shadow-xl transition-all duration-300`}
            >
              {plan.badge && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-1">
                    {plan.badge}
                  </Badge>
                </div>
              )}

              <CardHeader className={`bg-gradient-to-r ${plan.color} text-white rounded-t-lg`}>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                    <Icon className="w-6 h-6" />
                  </div>
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                </div>
                <p className="text-white/90 text-sm">{plan.description}</p>
              </CardHeader>

              <CardContent className="pt-6">
                {/* Pricing */}
                <div className="mb-6">
                  <div className="flex items-baseline gap-2">
                    {plan.originalPrice && (
                      <span className="text-2xl font-bold text-gray-400 line-through">
                        {plan.originalPrice}
                      </span>
                    )}
                    <span className="text-4xl font-bold text-gray-900 dark:text-white">
                      {plan.price}
                    </span>
                    {plan.period !== "Contact us" && (
                      <span className="text-gray-500 dark:text-gray-400">
                        {plan.period}
                      </span>
                    )}
                  </div>
                  {plan.subtext && (
                    <p className="text-xs font-bold text-purple-600 dark:text-purple-400 mt-1 uppercase tracking-wide">
                      {plan.subtext}
                    </p>
                  )}
                  {plan.savings && (
                    <Badge className="mt-2 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300">
                      {plan.savings}
                    </Badge>
                  )}
                  {plan.spotsLeft && (
                    <p className="text-xs text-orange-600 dark:text-orange-400 mt-2 font-semibold">
                      ⚡ {plan.spotsLeft}
                    </p>
                  )}
                  {plan.period === "Contact us" && (
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      Tailored pricing for your needs
                    </p>
                  )}
                </div>

                {/* CTA Button */}
                <button
                  className={`w-full py-3 px-6 rounded-lg font-bold transition-all mb-6 ${
                    plan.popular
                      ? "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-lg"
                      : "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-white"
                  }`}
                >
                  {plan.cta}
                </button>

                {/* Features */}
                <div className="space-y-3">
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Limitations */}
                {plan.limitations.length > 0 && (
                  <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                    <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-3">
                      Not included:
                    </p>
                    <div className="space-y-2">
                      {plan.limitations.map((limitation, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <span className="text-gray-400 text-xs mt-0.5">✕</span>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {limitation}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Launch Bonuses Section */}
      <div className="mt-16 mb-20">
        <div className="bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 rounded-3xl p-8 md:p-12 text-white text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            🎁 Exclusive Founder Launch Bonuses
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Join in the next 72 hours and get these bonuses absolutely FREE
          </p>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <div className="text-4xl mb-3">📚</div>
              <h3 className="font-bold text-lg mb-2">Beginner's Masterclass</h3>
              <p className="text-sm text-white/80 mb-2">10+ hours of expert training</p>
              <p className="text-2xl font-bold">$297 Value</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <div className="text-4xl mb-3">🗂️</div>
              <h3 className="font-bold text-lg mb-2">50 Pro Recipe Templates</h3>
              <p className="text-sm text-white/80 mb-2">Battle-tested formulas</p>
              <p className="text-2xl font-bold">$147 Value</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <div className="text-4xl mb-3">🏭</div>
              <h3 className="font-bold text-lg mb-2">Verified Supplier Database</h3>
              <p className="text-sm text-white/80 mb-2">500+ trusted vendors</p>
              <p className="text-2xl font-bold">$99 Value</p>
            </div>
          </div>
          <div className="mt-8">
            <p className="text-3xl font-bold mb-2">Total Value: $543</p>
            <p className="text-xl text-white/90">Yours FREE when you join as a Founder Member</p>
          </div>
        </div>
      </div>

      {/* Risk Elimination Section */}
      <div className="mb-20 bg-gray-50 dark:bg-gray-900 rounded-3xl p-8 md:p-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Zero Risk. All Reward.</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            We're so confident you'll love CandleFlow, we've eliminated all the risk
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">✓</span>
            </div>
            <h3 className="font-bold text-lg mb-2">60-Day Money Back</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Not happy? Full refund, no questions asked
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center">
            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">🔄</span>
            </div>
            <h3 className="font-bold text-lg mb-2">Free Data Migration</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              We'll import all your spreadsheets for you
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center">
            <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">🤝</span>
            </div>
            <h3 className="font-bold text-lg mb-2">Live Onboarding Support</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Personal help during your first 30 days
            </p>
          </div>
        </div>
      </div>

      {/* Educational Add-ons Section */}
      <div className="mt-20">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">
            Educational Programs
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 bg-clip-text text-transparent mb-4">
            Master Your Craft
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Take your candle-making skills to the next level with our exclusive masterclasses.
            <br />
            <span className="text-sm font-semibold text-purple-600 dark:text-purple-400 mt-2 inline-block">
              ⭐ Included FREE with Professional, Business & Enterprise plans!
            </span>
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {addons.map((addon, index) => (
            <Card key={index} className="border-2 border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all">
              <CardHeader className={`bg-gradient-to-r ${addon.color} text-white rounded-t-lg`}>
                <div className="flex items-center justify-between mb-2">
                  <CardTitle className="text-2xl">{addon.name}</CardTitle>
                  <Badge className="bg-white/20 text-white">
                    {addon.badge}
                  </Badge>
                </div>
                <p className="text-white/90 text-sm">{addon.description}</p>
              </CardHeader>

              <CardContent className="pt-6">
                {/* Pricing */}
                <div className="mb-6">
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-4xl font-bold text-gray-900 dark:text-white">
                      {addon.price}
                    </span>
                    <span className="text-gray-500 dark:text-gray-400">one-time</span>
                  </div>
                  <p className="text-sm text-purple-600 dark:text-purple-400 font-semibold">
                    ⭐ Or included FREE with Professional, Business & Enterprise plans
                  </p>
                </div>

                {/* Features */}
                <div className="space-y-3 mb-6">
                  {addon.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <button
                  className={`w-full py-3 px-6 rounded-lg font-bold transition-all ${
                    addon.badge === "Coming Soon"
                      ? "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white shadow-lg"
                  }`}
                  disabled={addon.badge === "Coming Soon"}
                >
                  {addon.badge === "Coming Soon" ? "Notify Me When Available" : "Purchase Now"}
                </button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Comparison Table */}
      <div className="mt-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Detailed Feature Comparison
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            See exactly what's included in each plan
          </p>
        </div>

        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">
                    Feature
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900 dark:text-white">
                    Starter
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-purple-600 dark:text-purple-400">
                    Professional
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900 dark:text-white">
                    Business
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900 dark:text-white">
                    Enterprise
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {[
                  { feature: "Recipe Management", starter: "25", pro: "Unlimited", business: "Unlimited", enterprise: "Unlimited" },
                  { feature: "Inventory Tracking", starter: "50 products", pro: "Unlimited", business: "Unlimited", enterprise: "Unlimited" },
                  { feature: "Cost Calculator", starter: "✓", pro: "✓ + Wizard", business: "✓ + Wizard", enterprise: "✓ + Wizard" },
                  { feature: "Orders per Month", starter: "20", pro: "Unlimited", business: "Unlimited", enterprise: "Unlimited" },
                  { feature: "Production Planning", starter: "✗", pro: "✓", business: "✓", enterprise: "✓" },
                  { feature: "Supplier Management", starter: "✗", pro: "✓", business: "✓", enterprise: "✓" },
                  { feature: "Quality Control", starter: "✗", pro: "✓", business: "✓", enterprise: "✓" },
                  { feature: "Barcode Generation", starter: "✗", pro: "✓", business: "✓", enterprise: "✓" },
                  { feature: "Team Members", starter: "1", pro: "1", business: "5", enterprise: "Unlimited" },
                  { feature: "AI Features", starter: "✗", pro: "✗", business: "30/month", enterprise: "Unlimited" },
                  { feature: "Customer Portal", starter: "✗", pro: "✗", business: "✓", enterprise: "✓" },
                  { feature: "E-commerce Integration", starter: "✗", pro: "✗", business: "✓", enterprise: "✓" },
                  { feature: "Beginner's Masterclass", starter: "✗", pro: "✓ FREE", business: "✓ FREE", enterprise: "✓ FREE" },
                  { feature: "Cement Workshop", starter: "✗", pro: "✗", business: "✗", enterprise: "✓ FREE" },
                  { feature: "Support Response", starter: "72h", pro: "24h", business: "4h", enterprise: "1h" },
                  { feature: "White Label", starter: "✗", pro: "✗", business: "✗", enterprise: "✓" },
                ].map((row, idx) => (
                  <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                    <td className="px-6 py-4 text-sm text-gray-900 dark:text-white font-medium">
                      {row.feature}
                    </td>
                    <td className="px-6 py-4 text-sm text-center text-gray-600 dark:text-gray-400">
                      {row.starter}
                    </td>
                    <td className="px-6 py-4 text-sm text-center text-purple-600 dark:text-purple-400 font-semibold">
                      {row.pro}
                    </td>
                    <td className="px-6 py-4 text-sm text-center text-gray-600 dark:text-gray-400">
                      {row.business}
                    </td>
                    <td className="px-6 py-4 text-sm text-center text-gray-600 dark:text-gray-400">
                      {row.enterprise}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      {/* FAQ Section */}
      <div className="mt-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {[
            {
              q: "Can I switch plans later?",
              a: "Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll prorate the difference."
            },
            {
              q: "What happens to my data if I downgrade?",
              a: "You can downgrade anytime. Your data is preserved, but you'll be limited to the features of your new plan. Founder pricing is locked forever regardless of plan changes."
            },
            {
              q: "Are the masterclasses really included?",
              a: "Yes! The Beginner's Masterclass ($297 value) is included FREE with Professional, Business, and Enterprise plans. The Cement Vessel Workshop is exclusive to Enterprise."
            },
            {
              q: "Is the $19 Founder price really locked forever?",
              a: "Absolutely! Once you lock in founder pricing at $19/mo, that rate never changes - even as we raise prices for new customers. It's our way of rewarding early supporters."
            },
            {
              q: "Do you offer discounts for annual billing?",
              a: "Yes! Save 20% when you pay annually ($182/year vs $228 monthly for Founders). Contact us for custom enterprise pricing."
            },
            {
              q: "What if I'm not satisfied?",
              a: "We offer a 60-day money-back guarantee. If CandleFlow isn't right for you, we'll refund every penny - no questions asked."
            }
          ].map((faq, idx) => (
            <Card key={idx} className="p-6">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                {faq.q}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                {faq.a}
              </p>
            </Card>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="mt-20 bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 rounded-2xl p-12 text-center text-white">
        <div className="mb-6">
          <Badge className="bg-white/20 text-white px-4 py-2 text-sm mb-4">
            ⚡ Limited Time Offer
          </Badge>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Don't Miss Your Chance to Lock In $19/mo Forever
        </h2>
        <p className="text-xl mb-2 text-white">
          Join 353 candle makers who've already secured founder pricing
        </p>
        <p className="text-lg mb-8 text-purple-100">
          Only 647 spots remaining • Offer ends in 72 hours
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-white text-purple-600 px-8 py-4 rounded-lg font-bold hover:bg-gray-100 transition-all shadow-lg text-lg">
            🔒 Lock In $19/mo Forever
          </button>
          <button className="bg-purple-800/50 backdrop-blur-sm text-white px-8 py-4 rounded-lg font-bold hover:bg-purple-800/70 transition-all border-2 border-white/20">
            Schedule a Demo
          </button>
        </div>
        <p className="text-sm text-white mt-6">
          ✓ 60-day money-back guarantee • ✓ No credit card for free plan • ✓ Cancel anytime
        </p>
        <div className="mt-6 pt-6 border-t border-white/20">
          <p className="text-sm text-purple-100">
            💰 Total value with bonuses: <span className="font-bold text-white">$543 FREE</span> when you join today
          </p>
        </div>
      </div>
    </div>
  );
}
