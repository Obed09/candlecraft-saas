import ComingSoon from "@/components/dashboard/ComingSoon";
import { Users } from "lucide-react";

/**
 * The customer portal is on the roadmap, not a live feature.
 * The mock "Sarah Johnson" portal has been removed — no fake customers, orders,
 * or invoices are presented as real.
 */
export default function CustomerPortalPage() {
  return (
    <ComingSoon
      title="Customer Portal"
      description="A customer-facing portal for order tracking and invoices is on the roadmap."
      note="The demo customer portal was removed — no fabricated customers or orders are shown."
      icon={<Users className="w-10 h-10 text-purple-600" />}
    />
  );
}
