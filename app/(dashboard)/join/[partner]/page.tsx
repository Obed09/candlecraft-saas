import ComingSoon from "@/components/dashboard/ComingSoon";
import { Users } from "lucide-react";

/**
 * Honest placeholder for the community partnership program.
 * The previous page was demo-ware: fabricated founder-pricing urgency
 * ("647 spots remaining", "offer ends in 72 hours"), invented testimonials,
 * and unverifiable savings claims. None of that ships. The partnership
 * program is not live, so this page says so plainly.
 */
export default function PartnerLandingPage() {
  return (
    <ComingSoon
      title="CandlePilots Partner Program"
      description="The CandlePilots community partnership program is on the roadmap and is not available yet. When it launches, partners and their members will be able to join through dedicated links."
      note="This page will only be updated with honest, verified details before the program opens. Nothing here is a live offer."
      icon={<Users className="w-16 h-16 text-purple-600" />}
    />
  );
}
