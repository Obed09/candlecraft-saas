import ComingSoon from "@/components/dashboard/ComingSoon";
import { ShoppingBag } from "lucide-react";

/**
 * E-commerce sync is on the roadmap, not a live feature.
 * The fake product table and the simulated setTimeout+alert "sync" have been
 * removed so this page never pretends to be connected to real stores.
 */
export default function EcommercePage() {
  return (
    <ComingSoon
      title="E-commerce Sync"
      description="Syncing with Shopify, Etsy, and other online stores is on the roadmap."
      note="The demo product list and simulated 'sync' were removed — nothing here pretends to be connected to a real store."
      icon={<ShoppingBag className="w-10 h-10 text-purple-600" />}
    />
  );
}
