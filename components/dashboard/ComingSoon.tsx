import Link from "next/link";
import type { ReactNode } from "react";

interface ComingSoonProps {
  title: string;
  description: string;
  icon?: ReactNode;
  note?: string;
}

/**
 * Honest "on the roadmap" placeholder.
 * Used for modules that are not yet a real, working feature. We never show
 * fabricated data or simulated actions on these pages — the module is either
 * a working core feature or an honest "Coming soon".
 */
export default function ComingSoon({ title, description, icon, note }: ComingSoonProps) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center p-8">
      <div className="max-w-xl w-full text-center">
        {icon && (
          <div className="mx-auto w-16 h-16 mb-4 flex items-center justify-center">{icon}</div>
        )}
        <span className="inline-block px-3 py-1 text-xs font-medium uppercase tracking-wider text-amber-800 bg-amber-100 rounded-full mb-4">
          Coming soon
        </span>
        <h1 className="text-3xl font-bold text-gray-900 mb-3">{title}</h1>
        <p className="text-gray-600 mb-2">{description}</p>
        {note && <p className="text-sm text-gray-500 mb-6">{note}</p>}
        <Link
          href="/analytics"
          className="inline-flex items-center px-5 py-2.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-medium text-sm"
        >
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
}
