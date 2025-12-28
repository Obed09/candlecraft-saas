"use client";

import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Sparkles, Crown, X, Star, TrendingUp, Users, Award } from "lucide-react";

export default function PartnerLandingPage() {
  const params = useParams();
  const partnerSlug = params.partner as string;
  
  // Convert slug to display name (e.g., "sarah-candles" -> "Sarah Candles")
  const partnerName = partnerSlug
    ?.split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ') || 'Your Community';

  // Track page view (in production, send to analytics)
  // useEffect(() => {
  //   trackPartnerLandingView(partnerSlug);
  // }, [partnerSlug]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-6xl mx-auto px-4 py-12">
        
        {/* Header - Partner Exclusive */}
        <div className="text-center mb-8">
          <Badge className="mb-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 text-sm animate-pulse">
            🎯 EXCLUSIVE FOR {partnerName.toUpperCase()} MEMBERS
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 bg-clip-text text-transparent">
              Lock In $19/mo Forever
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-2">
            Join the first 1,000 candle makers to get lifetime founder pricing
          </p>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            <span className="font-semibold text-purple-600 dark:text-purple-400">{partnerName}</span> has secured exclusive access for their community
          </p>
        </div>

        {/* Urgency Bar */}
        <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl p-4 mb-8 text-center shadow-lg">
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
              <span className="font-bold text-lg">647 Founder Spots Remaining</span>
            </div>
            <div className="hidden md:block">•</div>
            <div>⏰ Offer Ends in 72 Hours</div>
            <div className="hidden md:block">•</div>
            <div>🔒 Price Locked Forever</div>
          </div>
        </div>

        {/* Social Proof Bar */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 mb-12 shadow-md border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-center gap-8 flex-wrap text-center">
            <div>
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">353</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Candle Makers Joined</div>
            </div>
            <div className="hidden md:block h-12 w-px bg-gray-300 dark:bg-gray-600"></div>
            <div>
              <div className="text-3xl font-bold text-green-600 dark:text-green-400">4.9/5</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Average Rating</div>
            </div>
            <div className="hidden md:block h-12 w-px bg-gray-300 dark:bg-gray-600"></div>
            <div>
              <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">$8,500</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Avg. Annual Savings</div>
            </div>
          </div>
        </div>

        {/* Main Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          
          {/* FREE Plan */}
          <Card className="border-2 border-gray-300 dark:border-gray-700">
            <CardHeader className="bg-gradient-to-r from-gray-500 to-gray-600 text-white">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-6 h-6" />
                </div>
                <CardTitle className="text-2xl">Starter</CardTitle>
              </div>
              <p className="text-white/90 text-sm">Try it free - Perfect for getting started</p>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="mb-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-bold text-gray-900 dark:text-white">Free</span>
                  <span className="text-gray-500 dark:text-gray-400">forever</span>
                </div>
              </div>

              <button className="w-full py-3 px-6 rounded-lg font-bold transition-all mb-6 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-white">
                Get Started Free
              </button>

              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Up to 25 recipes</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Up to 50 products in inventory</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Full cost calculator access</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Up to 20 customer orders/month</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Basic analytics & reporting</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Email support (72h response)</span>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-2 font-semibold">Not Included:</p>
                <div className="space-y-2 text-xs text-gray-400">
                  <div className="flex items-start gap-2">
                    <X className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    <span>Barcode generation</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <X className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    <span>AI features</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <X className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    <span>Masterclass access</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* FOUNDER PRICING - Professional */}
          <Card className="border-4 border-purple-500 shadow-2xl shadow-purple-200 dark:shadow-purple-900/50 relative transform scale-105">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
              <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-2 text-sm font-bold animate-bounce">
                ⚡ FOUNDER SPECIAL
              </Badge>
            </div>
            
            <CardHeader className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                  <Crown className="w-6 h-6" />
                </div>
                <CardTitle className="text-2xl">Professional</CardTitle>
              </div>
              <p className="text-white/90 text-sm">Everything unlimited - Lock in this rate forever</p>
            </CardHeader>
            
            <CardContent className="pt-6">
              <div className="mb-6">
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-3xl font-bold text-gray-400 line-through">$39</span>
                  <span className="text-5xl font-bold text-purple-600 dark:text-purple-400">$19</span>
                  <span className="text-gray-500 dark:text-gray-400">per month</span>
                </div>
                <p className="text-xs font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wide mb-2">
                  Founder Pricing - Locked Forever
                </p>
                <Badge className="bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300">
                  Save $240/year
                </Badge>
                <p className="text-xs text-orange-600 dark:text-orange-400 mt-2 font-semibold">
                  ⚡ Only 647 spots remaining at this price
                </p>
              </div>

              <button className="w-full py-4 px-6 rounded-lg font-bold text-lg transition-all mb-6 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105">
                🔒 Lock In $19/mo Forever
              </button>

              <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 mb-4">
                <p className="text-sm font-semibold text-purple-900 dark:text-purple-100 mb-2">
                  🎁 Exclusive {partnerName} Member Bonuses:
                </p>
                <div className="space-y-2 text-sm text-purple-800 dark:text-purple-200">
                  <div className="flex items-start gap-2">
                    <Star className="w-4 h-4 fill-purple-600 text-purple-600 flex-shrink-0 mt-0.5" />
                    <span>FREE Beginner's Masterclass ($297 value)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Star className="w-4 h-4 fill-purple-600 text-purple-600 flex-shrink-0 mt-0.5" />
                    <span>50 Pro Recipe Templates ($147 value)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Star className="w-4 h-4 fill-purple-600 text-purple-600 flex-shrink-0 mt-0.5" />
                    <span>Verified Supplier Database ($99 value)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Star className="w-4 h-4 fill-purple-600 text-purple-600 flex-shrink-0 mt-0.5" />
                    <span>Founder Member Badge & Exclusive Group</span>
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t border-purple-200 dark:border-purple-700">
                  <p className="text-sm font-bold text-purple-900 dark:text-purple-100">
                    Total Value: $543 FREE 🎉
                  </p>
                </div>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="font-semibold">✨ EVERYTHING UNLIMITED - No restrictions</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Unlimited recipes & products</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Full inventory management</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Advanced cost calculator & pricing wizard</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Unlimited orders & customers</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Production planning & scheduling</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Barcode & QR code generation</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Professional invoice generation</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Advanced analytics & reporting</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Priority email support (24h response)</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="font-semibold">🔒 Price locked forever - Never increases</span>
                </div>
              </div>
            </CardContent>
          </Card>

        </div>

        {/* Risk Elimination Section */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 mb-12 shadow-lg border border-gray-200 dark:border-gray-700">
          <h2 className="text-3xl font-bold text-center mb-8">Zero Risk. All Reward.</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">✓</span>
              </div>
              <h3 className="font-bold text-lg mb-2">60-Day Money Back</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Not happy? Full refund, no questions asked. You have 2 full months to decide.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🔄</span>
              </div>
              <h3 className="font-bold text-lg mb-2">Free Data Migration</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                We'll import all your spreadsheets for you. White-glove onboarding included.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🤝</span>
              </div>
              <h3 className="font-bold text-lg mb-2">Live Onboarding Support</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Personal help during your first 30 days. We're here for you.
              </p>
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">What Candle Makers Are Saying</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="border-2 border-gray-200 dark:border-gray-700">
              <CardContent className="pt-6">
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-4 italic">
                  "This saved me 10 hours this week alone. I finally understand my true costs and I'm making more profit than ever."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                    <span className="font-bold text-purple-600 dark:text-purple-400">SM</span>
                  </div>
                  <div>
                    <p className="font-semibold text-sm">Sarah M.</p>
                    <p className="text-xs text-gray-500">Professional Plan</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-gray-200 dark:border-gray-700">
              <CardContent className="pt-6">
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-4 italic">
                  "Best $19 I spend every month. The production planner alone has saved me countless hours of stress."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                    <span className="font-bold text-purple-600 dark:text-purple-400">JR</span>
                  </div>
                  <div>
                    <p className="font-semibold text-sm">Jessica R.</p>
                    <p className="text-xs text-gray-500">Professional Plan</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-gray-200 dark:border-gray-700">
              <CardContent className="pt-6">
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-4 italic">
                  "I was underpricing by $8 per candle! This tool helped me fix my pricing and I've increased profits by $640/month."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                    <span className="font-bold text-purple-600 dark:text-purple-400">AK</span>
                  </div>
                  <div>
                    <p className="font-semibold text-sm">Amanda K.</p>
                    <p className="text-xs text-gray-500">Professional Plan</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Feature Highlights */}
        <div className="bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 rounded-2xl p-8 md:p-12 mb-12 text-white">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
            Everything You Need to Run Your Candle Business
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <TrendingUp className="w-10 h-10 mb-3" />
              <h3 className="font-bold text-lg mb-2">Instant Cost Calculator</h3>
              <p className="text-sm text-white/90">
                Calculate exact product costs in 30 seconds. Know your profit margin on every candle.
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <Users className="w-10 h-10 mb-3" />
              <h3 className="font-bold text-lg mb-2">Production Planning</h3>
              <p className="text-sm text-white/90">
                Schedule production runs, manage orders, and never miss a deadline again.
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <Award className="w-10 h-10 mb-3" />
              <h3 className="font-bold text-lg mb-2">Professional Invoices</h3>
              <p className="text-sm text-white/90">
                Generate branded invoices with barcodes. Look professional, get paid faster.
              </p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
          <div className="space-y-4 max-w-3xl mx-auto">
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold text-lg mb-2">Is the $19 Founder price really locked forever?</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Absolutely! Once you lock in founder pricing at $19/mo, that rate never changes - even as we raise prices for new customers. It's our way of rewarding early supporters. You'll pay $19/mo for as long as you're a customer.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold text-lg mb-2">What happens after the 647 spots are filled?</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  The price increases to $39/mo for all new customers. Founder members keep their $19/mo rate forever. This is a limited-time opportunity to lock in lifetime savings of $240/year.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold text-lg mb-2">Do I really get the Masterclass for free?</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Yes! The Beginner's Masterclass ($297 value) is included FREE with your Professional plan. You get instant access to 10+ hours of expert candle-making training, plus 50 recipe templates and the verified supplier database.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold text-lg mb-2">What if I'm not satisfied?</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  We offer a 60-day money-back guarantee. If CandleFlow isn't right for you, we'll refund every penny - no questions asked. You have a full 2 months to test everything risk-free.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold text-lg mb-2">Can I cancel anytime?</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Yes, you can cancel anytime with one click. No contracts, no commitments. If you ever decide to come back, your founder pricing will still be there waiting for you.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Final CTA */}
        <div className="bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 rounded-2xl p-8 md:p-12 text-center text-white shadow-2xl">
          <Badge className="bg-white/20 text-white px-4 py-2 text-sm mb-4">
            ⚡ Limited Time Offer
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Join {partnerName} Members?
          </h2>
          <p className="text-xl mb-2">
            Don't miss your chance to lock in $19/mo forever
          </p>
          <p className="text-lg mb-6 text-purple-100">
            Only 647 spots remaining • Offer ends in 72 hours
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
            <button className="bg-white text-purple-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all shadow-lg transform hover:scale-105">
              🔒 Lock In $19/mo Forever
            </button>
            <button className="bg-purple-800/50 backdrop-blur-sm text-white px-8 py-4 rounded-lg font-bold hover:bg-purple-800/70 transition-all border-2 border-white/20">
              Try Free First
            </button>
          </div>

          <div className="space-y-2 text-sm text-white">
            <p>✓ 60-day money-back guarantee • ✓ No credit card for free plan • ✓ Cancel anytime</p>
            <p className="text-purple-100">
              💰 Total value with bonuses: <span className="font-bold text-white">$543 FREE</span> when you join today
            </p>
          </div>

          <div className="mt-8 pt-8 border-t border-white/20">
            <p className="text-sm text-purple-100">
              You were invited by <span className="font-bold text-white">{partnerName}</span> • 
              This exclusive offer is only available through this link
            </p>
          </div>
        </div>

        {/* Trust Footer */}
        <div className="mt-12 text-center">
          <div className="flex items-center justify-center gap-8 flex-wrap text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-600" />
              <span>Secure Payment</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-600" />
              <span>No Credit Card Required (Free Plan)</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-600" />
              <span>Join 353 Candle Makers</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
