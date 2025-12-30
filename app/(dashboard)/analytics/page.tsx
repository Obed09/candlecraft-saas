'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  Calculator, 
  Package, 
  Flame, 
  TrendingUp, 
  Users, 
  Sparkles,
  DollarSign,
  BarChart3,
  FlaskConical,
  Truck,
  ArrowRight,
  Check,
  Zap,
  Shield,
  Award,
  Rocket
} from "lucide-react"
import Link from "next/link"

export default function DashboardOverview() {
  const features = [
    {
      icon: Calculator,
      title: "Vessel Calculator",
      description: "Precise wax calculations for any vessel size with real-time measurements",
      color: "from-blue-500 to-indigo-600",
      href: "/calculator"
    },
    {
      icon: Flame,
      title: "Recipe Database",
      description: "79 professional scent recipes with batch production & label generation",
      color: "from-orange-500 to-red-600",
      href: "/recipes-database"
    },
    {
      icon: DollarSign,
      title: "Pricing Wizard",
      description: "Calculate profitable pricing with material costs and market analysis",
      color: "from-green-500 to-emerald-600",
      href: "/pricing-wizard"
    },
    {
      icon: Package,
      title: "Inventory Management",
      description: "Track supplies, monitor stock levels, and automate reorder alerts",
      color: "from-purple-500 to-pink-600",
      href: "/inventory"
    },
    {
      icon: Sparkles,
      title: "AI Scent Blender",
      description: "AI-powered fragrance combinations and custom scent profiles",
      color: "from-cyan-500 to-blue-600",
      href: "/ai-blender"
    },
    {
      icon: TrendingUp,
      title: "Cost Analysis",
      description: "Detailed profitability analysis and cost breakdown per product",
      color: "from-yellow-500 to-orange-600",
      href: "/cost-analysis"
    }
  ]

  const benefits = [
    {
      icon: Zap,
      title: "Save Time",
      description: "Automate calculations and reduce production planning from hours to minutes"
    },
    {
      icon: DollarSign,
      title: "Increase Profits",
      description: "Optimize pricing, reduce waste, and maximize profit margins"
    },
    {
      icon: Shield,
      title: "Professional Tools",
      description: "Enterprise-grade features built specifically for candle makers"
    },
    {
      icon: Award,
      title: "Scale Your Business",
      description: "Grow from hobby to full-time business with professional systems"
    }
  ]

  const stats = [
    { label: "Scent Recipes", value: "79+", icon: Flame, color: "text-orange-600" },
    { label: "Calculators", value: "3", icon: Calculator, color: "text-blue-600" },
    { label: "Business Tools", value: "10+", icon: BarChart3, color: "text-purple-600" },
    { label: "Time Saved", value: "75%", icon: Zap, color: "text-green-600" }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-3">
      <div className="max-w-7xl mx-auto space-y-3">
        
        {/* Hero Section */}
        <div className="text-center space-y-2 py-2">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-3 py-1.5 rounded-full shadow-lg text-xs">
            <Rocket className="w-3 h-3" />
            <span className="font-semibold">Welcome to CandlePilots Pro</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 bg-clip-text text-transparent leading-tight">
            Everything You Need to Run Your Candle Business
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Professional tools, calculators, and automation to help you create, price, and sell candles like a pro
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {stats.map((stat, idx) => (
            <Card key={idx} className="border hover:shadow-lg transition-all duration-300">
              <CardContent className="p-3 text-center">
                <stat.icon className={`w-5 h-5 mx-auto mb-1.5 ${stat.color}`} />
                <div className="text-xl font-bold text-gray-900 dark:text-gray-100">
                  {stat.value}
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400">
                  {stat.label}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Features */}
        <div>
          <div className="mb-2">
            <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">
              🚀 Platform Features
            </h2>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              Powerful tools designed specifically for candle makers
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {features.map((feature, idx) => (
              <Link key={idx} href={feature.href}>
                <Card className="border hover:shadow-xl transition-all duration-300 cursor-pointer h-full group">
                  <CardContent className="p-3">
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${feature.color} flex items-center justify-center mb-2 group-hover:scale-110 transition-transform`}>
                      <feature.icon className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100 mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                      {feature.description}
                    </p>
                    <div className="flex items-center text-indigo-600 dark:text-indigo-400 font-semibold group-hover:gap-2 gap-1 transition-all text-xs">
                      <span>Explore</span>
                      <ArrowRight className="w-3 h-3" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Benefits Section */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-4 text-white">
          <div className="text-center mb-3">
            <h2 className="text-xl font-bold mb-1">
              Why Choose CandlePilots?
            </h2>
            <p className="text-blue-100 text-xs">
              Join hundreds of candle makers who transformed their businesses
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {benefits.map((benefit, idx) => (
              <div key={idx} className="bg-white/10 backdrop-blur-lg rounded-lg p-3 hover:bg-white/20 transition-all">
                <benefit.icon className="w-6 h-6 mb-2 text-yellow-300" />
                <h3 className="text-sm font-bold mb-1">{benefit.title}</h3>
                <p className="text-blue-100 text-xs">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Tools */}
        <Card className="border">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <Package className="w-4 h-4 text-indigo-600" />
              Additional Business Tools
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-2">
              <Link href="/supplier-manager" className="flex items-center gap-2 p-2 rounded-lg hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-all group">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Truck className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-gray-900 dark:text-gray-100 text-xs truncate">Supplier Manager</h3>
                </div>
                <ArrowRight className="w-3 h-3 text-gray-400 group-hover:text-indigo-600" />
              </Link>

              <Link href="/testing-log" className="flex items-center gap-2 p-2 rounded-lg hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-all group">
                <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-rose-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FlaskConical className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-gray-900 dark:text-gray-100 text-xs truncate">Testing Log</h3>
                </div>
                <ArrowRight className="w-3 h-3 text-gray-400 group-hover:text-indigo-600" />
              </Link>

              <Link href="/production" className="flex items-center gap-2 p-2 rounded-lg hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-all group">
                <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-amber-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Package className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-gray-900 dark:text-gray-100 text-xs truncate">Production Schedule</h3>
                </div>
                <ArrowRight className="w-3 h-3 text-gray-400 group-hover:text-indigo-600" />
              </Link>

              <Link href="/customers" className="flex items-center gap-2 p-2 rounded-lg hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-all group">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Users className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-gray-900 dark:text-gray-100 text-xs truncate">Customer Management</h3>
                </div>
                <ArrowRight className="w-3 h-3 text-gray-400 group-hover:text-indigo-600" />
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Quick Start */}
        <Card className="border bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <Rocket className="w-4 h-4 text-purple-600" />
              Quick Start Guide
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-3">
              <div className="flex gap-2 items-start">
                <div className="w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0 text-xs">
                  1
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-gray-100 text-xs mb-0.5">Explore Recipes</h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Browse 79+ recipes</p>
                </div>
              </div>
              <div className="flex gap-2 items-start">
                <div className="w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0 text-xs">
                  2
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-gray-100 text-xs mb-0.5">Calculate Batches</h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Get precise measurements</p>
                </div>
              </div>
              <div className="flex gap-2 items-start">
                <div className="w-6 h-6 bg-pink-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0 text-xs">
                  3
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-gray-100 text-xs mb-0.5">Price & Sell</h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Set profitable prices</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA */}
        <div className="text-center pb-2">
          <Link href="/guide">
            <button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-5 py-2 rounded-lg font-bold text-sm shadow-lg hover:shadow-xl transition-all flex items-center gap-2 mx-auto">
              <span>View Complete Guide</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
        </div>

      </div>
    </div>
  )
}
