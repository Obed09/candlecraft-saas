"use client";

import { useState } from "react";
import Link from "next/link";
import ContactSupportModal from "@/components/ContactSupportModal";

export default function DashboardFooter() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <footer className="border-t bg-white/80 backdrop-blur-sm mt-auto">
        <div className="container mx-auto px-6 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex flex-col md:flex-row items-center gap-2">
              <div className="flex items-center gap-2">
                <span className="text-purple-600 font-semibold">🕯️ CandlePilots</span>
                <span className="hidden md:inline">•</span>
              </div>
              <span className="text-xs md:text-sm">
                A division of <span className="font-semibold text-gray-700 dark:text-gray-300">Limen Lakay</span>
              </span>
              <span className="hidden md:inline">•</span>
              <span className="text-xs md:text-sm">© {new Date().getFullYear()} All rights reserved.</span>
            </div>
            <div className="flex items-center gap-6">
              <Link 
                href="/privacy-policy" 
                className="hover:text-purple-600 transition-colors underline-offset-4 hover:underline"
              >
                Privacy Policy
              </Link>
              <Link 
                href="/terms-conditions" 
                className="hover:text-purple-600 transition-colors underline-offset-4 hover:underline"
              >
                Terms & Conditions
              </Link>
              <button
                onClick={() => setIsModalOpen(true)}
                className="hover:text-purple-600 transition-colors underline-offset-4 hover:underline"
              >
                Contact Support
              </button>
            </div>
          </div>
        </div>
      </footer>

      <ContactSupportModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  );
}
