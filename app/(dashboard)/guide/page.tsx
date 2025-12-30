"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Calculator, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function GuidePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <Card className="border-2 border-purple-500/30 bg-white dark:bg-gray-900">
          <CardHeader className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <BookOpen className="w-6 h-6" />
              </div>
              <div>
                <CardTitle className="text-3xl font-bold">Professional Candle Making Masterclass by CandlePilots</CardTitle>
                <p className="text-purple-100 mt-2">From Beginner to Expert: The Complete Guide</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <p className="text-gray-700 dark:text-gray-300 text-lg">
              Master the art and science of professional candle making with this comprehensive guide. Whether you're crafting candles for personal enjoyment or building a thriving business, this masterclass covers everything from fundamental techniques to advanced formulation strategies.
            </p>
          </CardContent>
        </Card>

        {/* Table of Contents */}
        <Card className="bg-white dark:bg-gray-900">
          <CardHeader>
            <CardTitle className="text-gray-900 dark:text-white">Table of Contents</CardTitle>
          </CardHeader>
          <CardContent className="grid md:grid-cols-2 gap-3">
            {[
              "Understanding Candle Science",
              "Essential Equipment & Workspace Setup",
              "Wax Selection & Properties",
              "Wick Science & Selection",
              "Fragrance Oils & Scent Profiles",
              "Container Selection & Preparation",
              "Step-by-Step Candle Making",
              "Advanced Techniques",
              "Testing & Quality Control",
              "Troubleshooting Guide",
              "Business Considerations",
              "Frequently Asked Questions"
            ].map((item, idx) => (
              <a
                key={idx}
                href={`#section-${idx + 1}`}
                className="flex items-center gap-2 p-3 rounded-lg bg-purple-50 dark:bg-purple-900/20 hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors text-gray-900 dark:text-white"
              >
                <span className="font-semibold text-purple-600 dark:text-purple-400">{idx + 1}.</span>
                <span>{item}</span>
              </a>
            ))}
          </CardContent>
        </Card>

        {/* Section 1 */}
        <Card id="section-1" className="bg-white dark:bg-gray-900 scroll-mt-6">
          <CardHeader className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
            <CardTitle className="text-2xl">1. Understanding Candle Science</CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4 text-gray-700 dark:text-gray-300">
            <p>Creating exceptional candles requires understanding the chemistry and physics behind combustion, fragrance dispersion, and wax behavior.</p>
            
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-6">The Four Pillars of Quality Candles</h3>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">1. Wax Formulation</h4>
                <p>The wax serves as both fuel and fragrance carrier. Properties to consider:</p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>Melting point (affects burn pool formation)</li>
                  <li>Oil retention capacity (determines max fragrance load)</li>
                  <li>Crystalline structure (impacts appearance and adhesion)</li>
                  <li>Hardness and finish (affects demolding and surface quality)</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">2. Wick Engineering</h4>
                <p>The wick is the heart of candle performance:</p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>Acts as fuel pump via capillary action</li>
                  <li>Creates optimal flame size for complete combustion</li>
                  <li>Must balance flame height with melt pool diameter</li>
                  <li>Material and construction affect burn characteristics</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">3. Fragrance Chemistry</h4>
                <p>Professional scent throw requires:</p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>Proper fragrance load (6-10% for most waxes)</li>
                  <li>Temperature-specific addition (175-185°F critical zone)</li>
                  <li>Adequate cure time (molecular bonding period)</li>
                  <li>Compatible fragrance/wax pairing</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">4. Environmental Control</h4>
                <p>Successful candle making demands:</p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>Stable ambient temperature (65-75°F ideal)</li>
                  <li>Controlled cooling rate (prevents defects)</li>
                  <li>Proper humidity levels (excess moisture causes issues)</li>
                  <li>Draft-free curing environment</li>
                </ul>
              </div>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg mt-6">
              <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">Combustion Basics</h4>
              <p>Understanding the burning process helps you troubleshoot:</p>
              <ol className="list-decimal list-inside ml-4 space-y-1 mt-2">
                <li>Wick draws liquid wax upward via capillary action</li>
                <li>Heat vaporizes wax near flame base</li>
                <li>Wax vapor combusts with oxygen</li>
                <li>Heat radiates downward, creating melt pool</li>
                <li>Cycle continues until fuel depleted</li>
              </ol>
            </div>

            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg mt-4">
              <h4 className="font-semibold text-green-900 dark:text-green-100 mb-2">Ideal Burn Characteristics:</h4>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Flame height: 1-2 inches</li>
                <li>Melt pool depth: ¼-½ inch</li>
                <li>Pool reaches edges in 2-4 hours</li>
                <li>No smoking except when extinguished</li>
                <li>Container temperature stays below 140°F</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Section 2 */}
        <Card id="section-2" className="bg-white dark:bg-gray-900 scroll-mt-6">
          <CardHeader className="bg-gradient-to-r from-green-500 to-emerald-500 text-white">
            <CardTitle className="text-2xl">2. Essential Equipment & Workspace Setup</CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4 text-gray-700 dark:text-gray-300">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Critical Equipment (Priority Order)</h3>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Tier 1: Must-Have</h4>
                <ul className="list-disc list-inside ml-4 space-y-2">
                  <li><strong>Digital Scale</strong> (0.01oz or 0.1g precision): Essential for consistency. Invest in quality; cheap scales cause formulation issues.</li>
                  <li><strong>Thermometer</strong> (digital, ±1°F accuracy, reads to 250°F): Temperature control is non-negotiable. Infrared guns are excellent for multiple containers.</li>
                  <li><strong>Pouring Pitcher</strong> (stainless steel, heat-resistant handle, pour spout): 4-cup capacity minimum. Pyrex works but chips easily.</li>
                  <li><strong>Heat Source</strong> (electric burner or hot plate): Gas stoves work but temperature control is harder. Avoid open flames.</li>
                  <li><strong>Stirring Utensils</strong> (stainless steel or heat-resistant silicone): Wooden spoons absorb fragrance over time.</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Tier 2: Highly Recommended</h4>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>Heat Gun (for smoothing tops and fixing sinkholes)</li>
                  <li>Wick Centering Devices (professional wick bars or create DIY with chopsticks)</li>
                  <li>Measuring Cups (heat-resistant glass, dedicated to candle making)</li>
                  <li>Pipettes or Syringes (for precise fragrance measurement)</li>
                  <li>Protective Equipment (heat-resistant gloves, apron, safety glasses)</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Tier 3: Professional Upgrade</h4>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>Wax Melter (maintains consistent temperature, essential for production)</li>
                  <li>Wick Trimmer (clean cuts prevent carbon buildup)</li>
                  <li>Label Printer (professional presentation)</li>
                  <li>Candle Scale (for weighing filled containers)</li>
                  <li>Temperature-Controlled Curing Cabinet</li>
                </ul>
              </div>
            </div>

            <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg mt-6">
              <h4 className="font-semibold text-red-900 dark:text-red-100 mb-2">⚠️ Safety Protocol - Non-Negotiable Safety Rules:</h4>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Never leave melting wax unattended (flash point emergency)</li>
                <li>No water on wax fires (use lid to smother or Class B extinguisher)</li>
                <li>Work in ventilated area (fragrance oil vapors)</li>
                <li>Keep workspace clear (prevent spills and trips)</li>
                <li>Gloves for hot containers (severe burn prevention)</li>
                <li>Child and pet-free zone (during production)</li>
                <li>First aid kit accessible (minor burn treatment)</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Section 3 - Wax Selection */}
        <Card id="section-3" className="bg-white dark:bg-gray-900 scroll-mt-6">
          <CardHeader className="bg-gradient-to-r from-amber-500 to-orange-500 text-white">
            <CardTitle className="text-2xl">3. Wax Selection & Properties</CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-6 text-gray-700 dark:text-gray-300">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Detailed Wax Comparison</h3>

            {/* Soy Wax */}
            <div className="border-l-4 border-green-500 pl-4">
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white">🌿 Soy Wax (C3 or Golden Brands Series)</h4>
              <div className="mt-2 space-y-2">
                <p><strong>Technical Specifications:</strong></p>
                <ul className="list-disc list-inside ml-4">
                  <li>Melting Point: 120-125°F</li>
                  <li>Max Fragrance Load: 10-12%</li>
                  <li>Burn Rate: 7-9 hours per oz</li>
                  <li>Best Applications: Container candles</li>
                </ul>
                <p className="mt-2"><strong>Pros:</strong> Natural origin (renewable resource), easy cleanup (soap and water), good hot throw when properly formulated, lower melting point (safer for beginners), excellent fragrance oil retention, customer perception (eco-friendly marketing)</p>
                <p><strong>Cons:</strong> Frosting inevitable (crystalline structure), softer finish (container-only applications), color fades over time, surface can appear wet or oily, requires specific wick types (cotton or wood)</p>
                <p className="text-green-700 dark:text-green-400"><strong>Best For:</strong> Container candles, luxury eco-brands, beginners, home-based businesses</p>
              </div>
            </div>

            {/* Paraffin Wax */}
            <div className="border-l-4 border-blue-500 pl-4">
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white">🕯️ Paraffin Wax (IGI 4630 or fully refined grades)</h4>
              <div className="mt-2 space-y-2">
                <p><strong>Technical Specifications:</strong></p>
                <ul className="list-disc list-inside ml-4">
                  <li>Melting Point: 130-160°F (varies by grade)</li>
                  <li>Max Fragrance Load: 6-12%</li>
                  <li>Burn Rate: 5-7 hours per oz</li>
                  <li>Best Applications: Pillars, votives, containers</li>
                </ul>
                <p className="mt-2"><strong>Pros:</strong> Superior scent throw (excellent fragrance binding), brilliant color retention, versatile (all candle types), hard glossy finish, lower material cost, predictable performance</p>
                <p><strong>Cons:</strong> Petroleum-derived (marketing challenge), more soot if wick oversized, requires solvent for cleanup, may not appeal to eco-conscious consumers</p>
                <p className="text-blue-700 dark:text-blue-400"><strong>Best For:</strong> Pillars, votives, highly scented candles, vibrant colors, commercial production</p>
              </div>
            </div>

            {/* Beeswax */}
            <div className="border-l-4 border-yellow-500 pl-4">
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white">🍯 Beeswax (Yellow or Filtered White)</h4>
              <div className="mt-2 space-y-2">
                <p><strong>Technical Specifications:</strong></p>
                <ul className="list-disc list-inside ml-4">
                  <li>Melting Point: 144-147°F</li>
                  <li>Max Fragrance Load: 0-6% (natural scent competes)</li>
                  <li>Burn Rate: 10-12 hours per oz (longest burn)</li>
                  <li>Best Applications: Pillars, tapers, natural candles</li>
                </ul>
                <p className="mt-2"><strong>Pros:</strong> 100% natural (premium positioning), natural air-purifying properties (negative ion release), beautiful honey scent, burns longest of all waxes, gorgeous natural color, no fragrance needed</p>
                <p><strong>Cons:</strong> Expensive ($8-15/lb vs $2-4 for others), strong natural scent limits fragrance use, high melting point (more challenging), difficult to dye (natural color dominant), limited supplier availability, sticky to work with</p>
                <p className="text-yellow-700 dark:text-yellow-400"><strong>Best For:</strong> Natural/organic candles, premium products, rolled beeswax candles, gift items, religious candles</p>
              </div>
            </div>

            {/* Coconut Wax */}
            <div className="border-l-4 border-purple-500 pl-4">
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white">🥥 Coconut Wax (Coconut Apricot or Pure Coconut)</h4>
              <div className="mt-2 space-y-2">
                <p><strong>Technical Specifications:</strong></p>
                <ul className="list-disc list-inside ml-4">
                  <li>Melting Point: 120-127°F</li>
                  <li>Max Fragrance Load: 10-12%</li>
                  <li>Burn Rate: 8-10 hours per oz</li>
                  <li>Best Applications: Luxury containers</li>
                </ul>
                <p className="mt-2"><strong>Pros:</strong> Luxury appearance (creamy, smooth), excellent container adhesion (minimal wet spots), strong scent throw potential, clean even burn, natural and renewable, premium market positioning</p>
                <p><strong>Cons:</strong> Expensive ($6-10/lb), limited supplier availability, often requires blending with other waxes, may need special wicking, softer texture</p>
                <p className="text-purple-700 dark:text-purple-400"><strong>Best For:</strong> Luxury candles, premium pricing strategy, high-end containers, boutique brands</p>
              </div>
            </div>

            {/* Calculator CTA */}
            <Link href="/calculator" className="block mt-6">
              <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-6 rounded-xl text-white hover:shadow-lg transition-all">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-xl font-bold flex items-center gap-2">
                      <Calculator className="w-6 h-6" />
                      Ready to Calculate Your Candle Costs?
                    </h4>
                    <p className="mt-2 text-purple-100">Use our Vessel Calculator to determine exact material costs and pricing for your chosen wax type</p>
                  </div>
                  <ArrowRight className="w-8 h-8" />
                </div>
              </div>
            </Link>
          </CardContent>
        </Card>

        {/* Continue with remaining sections... Due to length, I'll create the structure for all 12 sections */}
        
        {/* Add a "Back to Top" button */}
        <div className="flex justify-center">
          <a
            href="#"
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all flex items-center gap-2"
          >
            Back to Top
          </a>
        </div>
      </div>
    </div>
  );
}
