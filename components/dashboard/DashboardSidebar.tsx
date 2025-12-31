"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import * as Tooltip from "@radix-ui/react-tooltip";
import { 
  LayoutDashboard, 
  Calculator, 
  Package, 
  BarChart3, 
  Settings,
  Flame,
  Users,
  DollarSign,
  FileText,
  ChevronDown,
  ChevronRight,
  DollarSignIcon,
  Truck,
  CalendarDays,
  TrendingUp,
  FlaskConical,
  Sparkles,
  BookOpen,
  ScanBarcode,
  Receipt,
  Zap,
  ClipboardCheck,
  ShoppingBag,
  Share2
} from "lucide-react";
import { cn } from "@/lib/utils";

interface NavigationSection {
  name: string;
  items: NavigationItem[];
}

interface NavigationItem {
  name: string;
  href: string;
  icon: any;
  tooltip: string;
}

const navigationSections: NavigationSection[] = [
  {
    name: "Overview",
    items: [
      { name: "Dashboard", href: "/analytics", icon: LayoutDashboard, tooltip: "View comprehensive business analytics and performance metrics" },
    ]
  },
  {
    name: "Calculators",
    items: [
      { name: "Vessel Calculator", href: "/calculator", icon: Calculator, tooltip: "Calculate wax, fragrance, and material requirements for different vessel sizes" },
      { name: "Pricing Wizard", href: "/pricing-wizard", icon: DollarSign, tooltip: "Determine optimal pricing strategy based on costs and profit margins" },
      { name: "Cost Analysis", href: "/cost-analysis", icon: TrendingUp, tooltip: "Analyze profitability, break-even points, and ROI for your candle business" },
    ]
  },
  {
    name: "Management",
    items: [
      { name: "Inventory", href: "/inventory", icon: Package, tooltip: "Track and manage raw materials, supplies, and finished products" },
      { name: "Suppliers", href: "/supplier-manager", icon: Truck, tooltip: "Manage supplier contacts, pricing, and purchase orders" },
      { name: "Production", href: "/production", icon: CalendarDays, tooltip: "Schedule and track candle production batches and workflows" },
      { name: "Automation", href: "/automation", icon: Zap, tooltip: "Set up automated production rules and inventory reordering" },
      { name: "Team", href: "/team", icon: Users, tooltip: "Manage team members, roles, permissions, and activity tracking" },
      { name: "Quality Control", href: "/quality-control", icon: ClipboardCheck, tooltip: "Perform batch testing, quality checks, and compliance verification" },
    ]
  },
  {
    name: "Recipes & Development",
    items: [
      { name: "Recipe Database", href: "/recipes-database", icon: Flame, tooltip: "Store and manage candle recipes with ingredients and instructions" },
      { name: "Barcodes & Labels", href: "/barcodes", icon: ScanBarcode, tooltip: "Generate barcodes, QR codes, and product labels for your candles" },
      { name: "Testing Log", href: "/testing-log", icon: FlaskConical, tooltip: "Document burn tests, fragrance trials, and product experiments" },
      { name: "AI Scent Blender", href: "/ai-blender", icon: Sparkles, tooltip: "Create custom fragrance blends with AI-powered scent recommendations" },
      { name: "AI Insights", href: "/ai-insights", icon: Sparkles, tooltip: "Get AI-driven recommendations for inventory, pricing, and production" },
    ]
  },
  {
    name: "Business",
    items: [
      { name: "Customers", href: "/customers", icon: Users, tooltip: "Manage customer database, contacts, and purchase history" },
      { name: "Customer Portal", href: "/customer-portal", icon: Users, tooltip: "Customer-facing portal for order tracking and invoice management" },
      { name: "Orders", href: "/orders", icon: FileText, tooltip: "Process and track customer orders from placement to delivery" },
      { name: "Invoices", href: "/invoices", icon: Receipt, tooltip: "Create, send, and manage invoices with payment tracking" },
      { name: "E-commerce", href: "/ecommerce", icon: ShoppingBag, tooltip: "Integrate with Shopify, Etsy, and other online sales platforms" },
      { name: "Analytics", href: "/reports", icon: BarChart3, tooltip: "Generate detailed reports on sales, revenue, and business performance" },
    ]
  },
  {
    name: "Marketing",
    items: [
      { name: "Social Media", href: "/social-media", icon: Share2, tooltip: "AI-powered social media automation - posts that sound exactly like you" },
    ]
  },
];

export default function DashboardSidebar() {
  const pathname = usePathname();
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    "Overview": true,
    "Calculators": true,
    "Management": true,
    "Recipes & Development": true,
    "Business": true,
  });

  const toggleSection = (sectionName: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionName]: !prev[sectionName]
    }));
  };

  return (
    <Tooltip.Provider delayDuration={200}>
      <div className="hidden md:flex md:w-64 md:flex-col">
        <div className="flex flex-col flex-grow bg-gradient-to-b from-purple-900 to-indigo-900 overflow-y-auto shadow-2xl">
          {/* Logo */}
          <div className="flex items-center flex-shrink-0 px-6 py-6 border-b border-purple-800/50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 flex items-center justify-center">
                <Image 
                  src="/candlepilots-logo.png" 
                  alt="CandlePilots Logo" 
                  width={40} 
                  height={40}
                  priority
                />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">CandlePilots</h1>
                <p className="text-xs text-purple-300">Business Platform</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-4">
          {navigationSections.map((section) => (
            <div key={section.name}>
              {/* Section Header */}
              <button
                onClick={() => toggleSection(section.name)}
                className="flex items-center justify-between w-full px-3 py-2 text-xs font-semibold text-purple-300 uppercase tracking-wider hover:text-white transition-colors"
              >
                <span>{section.name}</span>
                {expandedSections[section.name] ? (
                  <ChevronDown className="w-4 h-4" />
                ) : (
                  <ChevronRight className="w-4 h-4" />
                )}
              </button>

              {/* Section Items */}
              {expandedSections[section.name] && (
                <div className="mt-2 space-y-1">
                  {section.items.map((item) => {
                    const isActive = pathname === item.href;
                    
                    return (
                      <Tooltip.Root key={item.name}>
                        <Tooltip.Trigger asChild>
                          <Link
                            href={item.href}
                            className={cn(
                              "flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                              isActive
                                ? "bg-white/10 text-white shadow-lg backdrop-blur-sm border border-white/20"
                                : "text-purple-200 hover:bg-white/5 hover:text-white"
                            )}
                          >
                            <item.icon className={cn("w-4 h-4", isActive ? "text-amber-400" : "")} />
                            <span className="text-xs">{item.name}</span>
                          </Link>
                        </Tooltip.Trigger>
                        <Tooltip.Portal>
                          <Tooltip.Content 
                            side="right" 
                            className="bg-white text-gray-900 px-3 py-2 rounded-lg shadow-lg text-sm max-w-xs z-[9999]"
                            sideOffset={5}
                          >
                            {item.tooltip}
                            <Tooltip.Arrow className="fill-white" />
                          </Tooltip.Content>
                        </Tooltip.Portal>
                      </Tooltip.Root>
                    );
                  })}
                </div>
              )}
            </div>
          ))}

          {/* Settings */}
          <div className="pt-4 border-t border-purple-800/30">
            <Tooltip.Root>
              <Tooltip.Trigger asChild>
                <Link
                  href="/settings"
                  className={cn(
                    "flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                    pathname === "/settings"
                      ? "bg-white/10 text-white shadow-lg backdrop-blur-sm border border-white/20"
                      : "text-purple-200 hover:bg-white/5 hover:text-white"
                  )}
                >
                  <Settings className={cn("w-4 h-4", pathname === "/settings" ? "text-amber-400" : "")} />
                  <span className="text-xs">Settings</span>
                </Link>
              </Tooltip.Trigger>
              <Tooltip.Portal>
                <Tooltip.Content 
                  side="right" 
                  className="bg-white text-gray-900 px-3 py-2 rounded-lg shadow-lg text-sm max-w-xs z-[9999]"
                  sideOffset={5}
                >
                  Configure account settings, payment gateways, and automation preferences
                  <Tooltip.Arrow className="fill-white" />
                </Tooltip.Content>
              </Tooltip.Portal>
            </Tooltip.Root>
          </div>

          {/* Guide */}
          <div className="pt-2">
            <Tooltip.Root>
              <Tooltip.Trigger asChild>
                <Link
                  href="/guide"
                  className={cn(
                    "flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                    pathname === "/guide"
                      ? "bg-white/10 text-white shadow-lg backdrop-blur-sm border border-white/20"
                      : "text-purple-200 hover:bg-white/5 hover:text-white"
                  )}
                >
                  <BookOpen className={cn("w-4 h-4", pathname === "/guide" ? "text-amber-400" : "")} />
                  <span className="text-xs">Guide</span>
                </Link>
              </Tooltip.Trigger>
              <Tooltip.Portal>
                <Tooltip.Content 
                  side="right" 
                  className="bg-white text-gray-900 px-3 py-2 rounded-lg shadow-lg text-sm max-w-xs z-[9999]"
                  sideOffset={5}
                >
                  Learn how to use CandlePilots with step-by-step tutorials and guides
                  <Tooltip.Arrow className="fill-white" />
                </Tooltip.Content>
              </Tooltip.Portal>
            </Tooltip.Root>
          </div>
        </nav>

        {/* Bottom Section */}
        <div className="flex-shrink-0 px-4 py-4 border-t border-purple-800/50">
          <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-xs font-medium text-purple-200">Pro Plan</span>
            </div>
            <p className="text-xs text-purple-300">
              Unlimited calculations & recipes
            </p>
          </div>
        </div>
      </div>
    </div>
    </Tooltip.Provider>
  );
}
