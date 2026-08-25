import ComingSoon from "@/components/dashboard/ComingSoon";
import { Sparkles } from "lucide-react";

/**
 * AI scent blending is on the roadmap, not a live feature.
 * The page previously POSTed to /api/recipes/analyze, which does not exist.
 * That dead call has been removed — a real backend will be built before any
 * blend analysis is offered.
 */
export default function AIBlenderPage() {
  return (
    <ComingSoon
      title="AI Scent Blender"
      description="AI-powered scent blend guidance is on the roadmap."
      note="The page no longer calls an unavailable analysis endpoint — blend analysis will be built on a real backend before launch."
      icon={<Sparkles className="w-10 h-10 text-purple-600" />}
    />
  );
}
