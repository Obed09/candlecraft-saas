"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Calculator,
  Flame,
  FlaskConical,
  Settings,
} from "lucide-react";

interface DashboardNavProps {
  user: any;
}

export default function DashboardNav({ user }: DashboardNavProps) {
  const pathname = usePathname();

  // Core (working) features only — this mirrors the sidebar's truthful nav.
  const navItems = [
    {
      name: "Vessel Calculator",
      href: "/calculator",
      icon: Calculator,
    },
    {
      name: "Recipe Library",
      href: "/recipes-database",
      icon: Flame,
    },
    {
      name: "Testing Log",
      href: "/testing-log",
      icon: FlaskConical,
    },
    {
      name: "Settings",
      href: "/settings",
      icon: Settings,
    },
  ];

  return (
    <nav className="bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <h1 className="text-xl font-bold text-zinc-900 dark:text-white">
                🕯️ CandlePilots
              </h1>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                      isActive
                        ? "border-zinc-900 dark:border-white text-zinc-900 dark:text-white"
                        : "border-transparent text-zinc-500 dark:text-zinc-400 hover:border-zinc-300 dark:hover:border-zinc-700 hover:text-zinc-700 dark:hover:text-zinc-300"
                    }`}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className="text-sm text-zinc-700 dark:text-zinc-300 mr-4">
                {user?.name || user?.email}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className="sm:hidden">
        <div className="pt-2 pb-3 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                  isActive
                    ? "bg-zinc-50 dark:bg-zinc-800 border-zinc-900 dark:border-white text-zinc-900 dark:text-white"
                    : "border-transparent text-zinc-500 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 hover:text-zinc-700 dark:hover:text-zinc-300"
                }`}
              >
                <div className="flex items-center">
                  <Icon className="w-4 h-4 mr-3" />
                  {item.name}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
