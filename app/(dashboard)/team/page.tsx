import ComingSoon from "@/components/dashboard/ComingSoon";
import { Users } from "lucide-react";

/**
 * Multi-user team support is on the roadmap, not a live feature.
 * There is no multi-user account system in the schema, so the fake
 * John/Emily/Michael team has been removed — it must not appear real.
 */
export default function TeamPage() {
  return (
    <ComingSoon
      title="Team Collaboration"
      description="Multi-user team, roles, and activity tracking is on the roadmap."
      note="There is no multi-user account system yet, so the demo team members were removed."
      icon={<Users className="w-10 h-10 text-purple-600" />}
    />
  );
}
