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
  Share2,
  User
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

/**
 * Nav is deliberately honest: what actually works is listed first under
 * "Core Tools", and everything that is still a plan lives under "Coming Soon"
 * (the roadmap). No demo feature is presented as a finished, working one.
 */
const navigationSections: NavigationSection[] = [
  {
    name: "Core Tools",
    items: [
      { name: "Vessel Calculator", href: "/calculator", icon: Calculator, tooltip: "Calculate wax, fragrance, and material requirements for different vessels — saved to your account" },
      { name: "Recipe Library", href: "/recipes-database", icon: Flame, tooltip: "Store and manage candle recipes — save your own and keep them in your account" },
      { name: "Testing Log", href: "/testing-log", icon: FlaskConical, tooltip: "Document burn tests, fragrance trials, and product experiments" },
      { name: "Cost Analysis", href: "/cost-analysis", icon: DollarSign, tooltip: "Analyze profitability, break-even, and margin for your candles" },
      { name: "Pricing Wizard", href: "/pricing-wizard", icon: TrendingUp, tooltip: "Determine pricing based on your costs and target margin" },
      { name: "Reports", href: "/reports", icon: BarChart3, tooltip: "Sales, revenue, and performance reports" },
    ]
  },
  {
    name: "Account",
    items: [
      { name: "Dashboard", href: "/analytics", icon: LayoutDashboard, tooltip: "CandlePilots overview and quick links" },
      { name: "Settings", href: "/settings", icon: Settings, tooltip: "Configure account settings and preferences" },
      { name: "Profile", href: "/profile", icon: User, tooltip: "Your profile information" },
    ]
  },
  {
    name: "Coming Soon",
    items: [
      { name: "AI Scent Blender", href: "/ai-blender", icon: Sparkles, tooltip: "On the roadmap — AI-powered blend guidance" },
      { name: "AI Insights", href: "/ai-insights", icon: Sparkles, tooltip: "On the roadmap — AI recommendations" },
      { name: "Inventory", href: "/inventory", icon: Package, tooltip: "On the roadmap — raw material tracking" },
      { name: "Suppliers", href: "/supplier-manager", icon: Truck, tooltip: "On the roadmap — supplier management" },
      { name: "Production", href: "/production", icon: CalendarDays, tooltip: "On the roadmap — production batches" },
      { name: "Automation", href: "/automation", icon: Zap, tooltip: "On the roadmap — automated rules" },
      { name: "Quality Control", href: "/quality-control", icon: ClipboardCheck, tooltip: "On the roadmap — QC workflows" },
      { name: "Barcodes & Labels", href: "/barcodes", icon: ScanBarcode, tooltip: "On the roadmap — label generation" },
      { name: "Customers", href: "/customers", icon: Users, tooltip: "On the roadmap — customer database" },
      { name: "Customer Portal", href: "/customer-portal", icon: Users, tooltip: "On the roadmap — customer-facing portal" },
      { name: "Orders", href: "/orders", icon: FileText, tooltip: "On the roadmap — order processing" },
      { name: "Invoices", href: "/invoices", icon: Receipt, tooltip: "On the roadmap — invoicing" },
      { name: "E-commerce", href: "/ecommerce", icon: ShoppingBag, tooltip: "On the roadmap — Shopify/Etsy sync" },
      { name: "Team", href: "/team", icon: Users, tooltip: "On the roadmap — multi-user team support" },
      { name: "Social Media", href: "/social-media", icon: Share2, tooltip: "On the roadmap — social media tools" },
    ]
  },
];

export default function DashboardSidebar() {
  const pathname = usePathname();
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    "Core Tools": true,
    "Account": true,
    "Coming Soon": false,
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
                className={cn(
                  "flex items-center justify-between w-full px-3 py-2 text-xs font-semibold uppercase tracking-wider transition-colors",
                  section.name === "Coming Soon"
                    ? "text-amber-400 hover:text-amber-200"
                    : "text-purple-300 hover:text-white"
                )}
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
          <Link
            href="/subscription-plans"
            className="block bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 hover:border-white/20 transition-all"
          >
            <span className="text-xs font-medium text-purple-200">Subscription</span>
            <p className="text-xs text-purple-300 mt-1">
              View plans and manage your subscription
            </p>
          </Link>
        </div>
      </div>
    </div>
    </Tooltip.Provider>
  );
}
