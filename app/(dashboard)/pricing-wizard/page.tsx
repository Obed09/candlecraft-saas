'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import * as Tooltip from '@radix-ui/react-tooltip'
import { HelpCircle } from 'lucide-react'

interface Vessel {
  id: number
  name: string
  diameter: number
  height: number
  unit: string
  imageName?: string
  actualCapacity?: number
}

interface VesselCalculation {
  fullVolume: number
  waxVolume: number
  volumeOz: number
  waxWeight: number
  fragranceWeight: number
  cementWeight: number
  wicksNeeded: number
  waxCost: number
  fragranceCost: number
  cementCost: number
  wickCost: number
  paintCost: number
  totalCost: number
}

export default function PricingWizardPage() {
  // Material prices (editable)
  const [materialPrices] = useState({
    waxType: 'soy' as 'soy' | 'coconut',
    waxPricePerLb: 8.50,
    fragrancePricePerLb: 40.00,
    cementPricePerLb: 0.50,
    wickPrice: 0.25,
    paintPrice: 0.75,
    fillPercent: 80,
    fragranceLoad: 10,
  })

  // Vessels data
  const vessels: Vessel[] = [
    { id: 100, name: "Large Shallow", diameter: 8.2, height: 2.36, unit: "in" },
    { id: 101, name: "Medium Cylinder", diameter: 5.43, height: 2.16, unit: "in", actualCapacity: 10.1 },
    { id: 102, name: "Small Ribbed", diameter: 2.7, height: 1.4, unit: "in" },
    { id: 103, name: "Ribbed Jar Mold", diameter: 9.5, height: 8, unit: "cm" },
    { id: 104, name: "Flower Shell", diameter: 3.5, height: 4.8, unit: "cm" },
    { id: 105, name: "Bowl Vessel", diameter: 3.25, height: 2.125, unit: "in" }
  ]

  // Pricing Wizard State
  const [pricingVesselIndex, setPricingVesselIndex] = useState(0)
  const [targetMargin, setTargetMargin] = useState(60)
  const [marketPosition, setMarketPosition] = useState<'budget' | 'mid-range' | 'premium' | 'luxury'>('mid-range')

  // Calculate volume using cylindrical formula
  const calculateVolume = (diameter: number, height: number, unit: string): number => {
    const d = unit === 'in' ? diameter * 2.54 : diameter
    const h = unit === 'in' ? height * 2.54 : height
    const radius = d / 2
    const volumeCm3 = Math.PI * radius * radius * h
    return volumeCm3
  }

  // Calculate materials for a vessel
  const calculateMaterials = (vessel: Vessel): VesselCalculation => {
    const fillPercent = materialPrices.fillPercent / 100
    const fragranceLoad = materialPrices.fragranceLoad / 100
    const waxDensity = materialPrices.waxType === 'soy' ? 0.9 : 0.92
    const cementDensity = 2.4
    
    const fullVolume = calculateVolume(vessel.diameter, vessel.height, vessel.unit)
    const waxVolume = fullVolume * fillPercent
    
    const waxWeight = waxVolume * waxDensity
    const fragranceWeight = waxWeight * fragranceLoad
    const cementWeight = fullVolume * cementDensity
    
    const waxCost = (waxWeight / 453.6) * materialPrices.waxPricePerLb
    const fragranceCost = (fragranceWeight / 453.6) * materialPrices.fragrancePricePerLb
    const cementCost = (cementWeight / 453.6) * materialPrices.cementPricePerLb
    
    const diameterInInches = vessel.unit === 'cm' ? vessel.diameter / 2.54 : vessel.diameter
    const wicksNeeded = diameterInInches > 4 ? 2 : 1
    const wickCost = wicksNeeded * materialPrices.wickPrice
    
    const totalCost = waxCost + fragranceCost + cementCost + wickCost + materialPrices.paintPrice
    const volumeOz = waxVolume / 29.5735
    
    return {
      fullVolume,
      waxVolume,
      volumeOz,
      waxWeight,
      fragranceWeight,
      cementWeight,
      wicksNeeded,
      waxCost,
      fragranceCost,
      cementCost,
      wickCost,
      paintCost: materialPrices.paintPrice,
      totalCost
    }
  }

  // Calculate all vessels
  const vesselCalculations = vessels.map(vessel => ({
    vessel,
    calc: calculateMaterials(vessel)
  }))

  // Pricing Wizard Calculations
  const calculatePricingRecommendations = () => {
    const vesselCalc = vesselCalculations[pricingVesselIndex]
    if (!vesselCalc) return null

    const costPerUnit = vesselCalc.calc.totalCost
    const volumeOz = vesselCalc.calc.volumeOz

    const marketMultipliers = {
      'budget': { min: 2.0, target: 2.5, max: 3.0 },
      'mid-range': { min: 2.5, target: 3.5, max: 4.5 },
      'premium': { min: 4.0, target: 5.0, max: 6.0 },
      'luxury': { min: 6.0, target: 8.0, max: 10.0 }
    }

    const multipliers = marketMultipliers[marketPosition]
    const recommendedMin = costPerUnit * multipliers.min
    const recommendedTarget = costPerUnit * multipliers.target
    const recommendedMax = costPerUnit * multipliers.max

    const priceFromMargin = costPerUnit / (1 - targetMargin / 100)

    const pricePerOzMin = recommendedMin / volumeOz
    const pricePerOzTarget = recommendedTarget / volumeOz
    const pricePerOzMax = recommendedMax / volumeOz

    const wholesalePrice = costPerUnit * 1.5
    const retailPrice = recommendedTarget
    const premiumPrice = recommendedMax

    const fixedCosts = 500
    const breakEvenUnits = Math.ceil(fixedCosts / (retailPrice - costPerUnit))

    return {
      costPerUnit,
      volumeOz,
      recommendedMin,
      recommendedTarget,
      recommendedMax,
      priceFromMargin,
      pricePerOzMin,
      pricePerOzTarget,
      pricePerOzMax,
      wholesalePrice,
      retailPrice,
      premiumPrice,
      breakEvenUnits,
      marginAtMin: ((recommendedMin - costPerUnit) / recommendedMin * 100),
      marginAtTarget: ((recommendedTarget - costPerUnit) / recommendedTarget * 100),
      marginAtMax: ((recommendedMax - costPerUnit) / recommendedMax * 100),
    }
  }

  const pricingData = calculatePricingRecommendations()

  return (
    <Tooltip.Provider delayDuration={200}>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent flex items-center gap-2">
            💰 Pricing Wizard
            <Tooltip.Root>
              <Tooltip.Trigger asChild>
                <HelpCircle className="w-6 h-6 text-orange-500 hover:text-orange-600 cursor-help" />
              </Tooltip.Trigger>
              <Tooltip.Portal>
                <Tooltip.Content 
                  side="right" 
                  className="bg-white text-gray-900 px-4 py-3 rounded-lg shadow-xl text-sm max-w-xs z-[9999]"
                  sideOffset={5}
                >
                  Determine optimal pricing strategy based on costs and profit margins. Get smart recommendations, calculate break-even points, and analyze different pricing tiers.
                  <Tooltip.Arrow className="fill-white" />
                </Tooltip.Content>
              </Tooltip.Portal>
            </Tooltip.Root>
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Smart pricing recommendations • Profit margin calculator • Break-even analysis
          </p>
        </div>

      {/* Quick Pricing Preview */}
      {pricingData && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20 p-4 rounded-xl border-2 border-green-300 dark:border-green-700">
            <div className="text-green-900 dark:text-green-100 text-sm font-semibold mb-1">💵 Cost</div>
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              ${pricingData.costPerUnit.toFixed(2)}
            </div>
            <div className="text-xs text-green-700 dark:text-green-300 mt-1">Per unit</div>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-cyan-100 dark:from-blue-900/20 dark:to-cyan-900/20 p-4 rounded-xl border-2 border-blue-300 dark:border-blue-700">
            <div className="text-blue-900 dark:text-blue-100 text-sm font-semibold mb-1">🎯 Recommended</div>
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              ${pricingData.recommendedTarget.toFixed(2)}
            </div>
            <div className="text-xs text-blue-700 dark:text-blue-300 mt-1">{marketPosition} tier</div>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20 p-4 rounded-xl border-2 border-purple-300 dark:border-purple-700">
            <div className="text-purple-900 dark:text-purple-100 text-sm font-semibold mb-1">📈 Profit</div>
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
              ${(pricingData.recommendedTarget - pricingData.costPerUnit).toFixed(2)}
            </div>
            <div className="text-xs text-purple-700 dark:text-purple-300 mt-1">
              {pricingData.marginAtTarget.toFixed(0)}% margin
            </div>
          </div>

          <div className="bg-gradient-to-br from-orange-50 to-amber-100 dark:from-orange-900/20 dark:to-amber-900/20 p-4 rounded-xl border-2 border-orange-300 dark:border-orange-700">
            <div className="text-orange-900 dark:text-orange-100 text-sm font-semibold mb-1">⚖️ Break Even</div>
            <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
              {pricingData.breakEvenUnits}
            </div>
            <div className="text-xs text-orange-700 dark:text-orange-300 mt-1">Units/month</div>
          </div>
        </div>
      )}

      {/* Configuration */}
      <Card className="mb-6 border-2 border-amber-200 dark:border-amber-800">
        <CardHeader>
          <CardTitle>⚙️ Pricing Configuration</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <Label className="text-gray-900 dark:text-gray-100 font-semibold mb-2 block">
                Vessel Type
              </Label>
              <select
                value={pricingVesselIndex}
                onChange={(e) => setPricingVesselIndex(parseInt(e.target.value))}
                className="w-full p-3 border-2 border-amber-200 dark:border-amber-800 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-base font-semibold"
              >
                {vessels.map((vessel, idx) => (
                  <option key={vessel.id} value={idx}>
                    {vessel.name} ({vesselCalculations[idx].calc.volumeOz.toFixed(1)} oz)
                  </option>
                ))}
              </select>
            </div>

            <div>
              <Label className="text-gray-900 dark:text-gray-100 font-semibold mb-2 block">
                Market Position
              </Label>
              <select
                value={marketPosition}
                onChange={(e) => setMarketPosition(e.target.value as any)}
                className="w-full p-3 border-2 border-amber-200 dark:border-amber-800 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-base font-semibold"
              >
                <option value="budget">Budget (100-150% markup)</option>
                <option value="mid-range">Mid-Range (150-300% markup)</option>
                <option value="premium">Premium (300-500% markup)</option>
                <option value="luxury">Luxury (500-900% markup)</option>
              </select>
            </div>

            <div>
              <Label className="text-gray-900 dark:text-gray-100 font-semibold mb-2 block">
                Target Profit Margin (%)
              </Label>
              <Input
                type="number"
                value={targetMargin}
                onChange={(e) => setTargetMargin(parseInt(e.target.value) || 0)}
                min="0"
                max="90"
                className="text-base"
              />
              {pricingData && (
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Price: ${pricingData.priceFromMargin.toFixed(2)}
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Pricing Tiers */}
      {pricingData && (
        <>
          <Card className="mb-6 bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20 border-2 border-amber-300 dark:border-amber-700">
            <CardHeader>
              <CardTitle className="text-amber-900 dark:text-amber-100">💎 Pricing Tiers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Minimum Price */}
                <div className="bg-white dark:bg-gray-800 p-5 rounded-xl border-2 border-green-300 dark:border-green-700">
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="font-bold text-lg text-green-700 dark:text-green-300">Minimum</h4>
                    <span className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-2 py-1 rounded-full text-xs font-bold">
                      {pricingData.marginAtMin.toFixed(0)}% margin
                    </span>
                  </div>
                  <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
                    ${pricingData.recommendedMin.toFixed(2)}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    <div>💰 Profit: ${(pricingData.recommendedMin - pricingData.costPerUnit).toFixed(2)}</div>
                    <div>📏 Per oz: ${pricingData.pricePerOzMin.toFixed(2)}</div>
                  </div>
                </div>

                {/* Target Price */}
                <div className="bg-white dark:bg-gray-800 p-5 rounded-xl border-2 border-blue-300 dark:border-blue-700 transform scale-105">
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="font-bold text-lg text-blue-700 dark:text-blue-300">Target ⭐</h4>
                    <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-1 rounded-full text-xs font-bold">
                      {pricingData.marginAtTarget.toFixed(0)}% margin
                    </span>
                  </div>
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                    ${pricingData.recommendedTarget.toFixed(2)}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    <div>💰 Profit: ${(pricingData.recommendedTarget - pricingData.costPerUnit).toFixed(2)}</div>
                    <div>📏 Per oz: ${pricingData.pricePerOzTarget.toFixed(2)}</div>
                  </div>
                </div>

                {/* Maximum Price */}
                <div className="bg-white dark:bg-gray-800 p-5 rounded-xl border-2 border-purple-300 dark:border-purple-700">
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="font-bold text-lg text-purple-700 dark:text-purple-300">Maximum</h4>
                    <span className="bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 px-2 py-1 rounded-full text-xs font-bold">
                      {pricingData.marginAtMax.toFixed(0)}% margin
                    </span>
                  </div>
                  <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                    ${pricingData.recommendedMax.toFixed(2)}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    <div>💰 Profit: ${(pricingData.recommendedMax - pricingData.costPerUnit).toFixed(2)}</div>
                    <div>📏 Per oz: ${pricingData.pricePerOzMax.toFixed(2)}</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Bulk Pricing */}
            <Card className="border-2 border-indigo-200 dark:border-indigo-800">
              <CardHeader>
                <CardTitle className="text-indigo-900 dark:text-indigo-100">📦 Bulk Pricing Strategy</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
                    <div>
                      <div className="font-semibold text-gray-900 dark:text-gray-100">🏪 Wholesale</div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">Bulk orders (50+ units)</div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                        ${pricingData.wholesalePrice.toFixed(2)}
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">50% markup</div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <div>
                      <div className="font-semibold text-gray-900 dark:text-gray-100">🛍️ Retail</div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">Standard pricing</div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                        ${pricingData.retailPrice.toFixed(2)}
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">Recommended</div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                    <div>
                      <div className="font-semibold text-gray-900 dark:text-gray-100">💎 Premium</div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">Limited editions, custom</div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                        ${pricingData.premiumPrice.toFixed(2)}
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">Maximum value</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Break-Even Analysis */}
            <Card className="border-2 border-orange-200 dark:border-orange-800">
              <CardHeader>
                <CardTitle className="text-orange-900 dark:text-orange-100">⚖️ Break-Even Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg">
                    <div className="text-sm text-orange-700 dark:text-orange-300 mb-1">Monthly Fixed Costs</div>
                    <div className="text-3xl font-bold text-orange-600 dark:text-orange-400">$500</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">Rent, utilities, insurance</div>
                  </div>

                  <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                    <div className="text-sm text-green-700 dark:text-green-300 mb-1">Break-Even Point</div>
                    <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                      {pricingData.breakEvenUnits} units
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                      At ${pricingData.retailPrice.toFixed(2)} per unit
                    </div>
                  </div>

                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                    <div className="text-sm text-blue-700 dark:text-blue-300 mb-1">Revenue Goal (100 units)</div>
                    <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                      ${(pricingData.retailPrice * 100).toFixed(0)}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                      Profit: ${((pricingData.retailPrice - pricingData.costPerUnit) * 100 - 500).toFixed(0)}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Market Comparison */}
          <Card className="mb-6 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-2 border-purple-300 dark:border-purple-700">
            <CardHeader>
              <CardTitle className="text-purple-900 dark:text-purple-100">🎯 Market Positioning</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className={`p-4 rounded-lg border-2 ${marketPosition === 'budget' ? 'bg-white dark:bg-gray-800 border-amber-500 ring-4 ring-amber-200 dark:ring-amber-800' : 'bg-gray-50 dark:bg-gray-900 border-gray-300 dark:border-gray-700'}`}>
                  <div className="font-bold text-gray-900 dark:text-gray-100 mb-2">💵 Budget</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    <div>Walmart, Dollar stores</div>
                    <div className="mt-2 font-semibold">$8-15 range</div>
                    <div className="text-xs">Mass market appeal</div>
                  </div>
                </div>

                <div className={`p-4 rounded-lg border-2 ${marketPosition === 'mid-range' ? 'bg-white dark:bg-gray-800 border-blue-500 ring-4 ring-blue-200 dark:ring-blue-800' : 'bg-gray-50 dark:bg-gray-900 border-gray-300 dark:border-gray-700'}`}>
                  <div className="font-bold text-gray-900 dark:text-gray-100 mb-2">🛍️ Mid-Range</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    <div>Target, boutiques</div>
                    <div className="mt-2 font-semibold">$20-35 range</div>
                    <div className="text-xs">Quality-conscious buyers</div>
                  </div>
                </div>

                <div className={`p-4 rounded-lg border-2 ${marketPosition === 'premium' ? 'bg-white dark:bg-gray-800 border-purple-500 ring-4 ring-purple-200 dark:ring-purple-800' : 'bg-gray-50 dark:bg-gray-900 border-gray-300 dark:border-gray-700'}`}>
                  <div className="font-bold text-gray-900 dark:text-gray-100 mb-2">💎 Premium</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    <div>Anthropologie, specialty</div>
                    <div className="mt-2 font-semibold">$40-65 range</div>
                    <div className="text-xs">Design & craftsmanship</div>
                  </div>
                </div>

                <div className={`p-4 rounded-lg border-2 ${marketPosition === 'luxury' ? 'bg-white dark:bg-gray-800 border-pink-500 ring-4 ring-pink-200 dark:ring-pink-800' : 'bg-gray-50 dark:bg-gray-900 border-gray-300 dark:border-gray-700'}`}>
                  <div className="font-bold text-gray-900 dark:text-gray-100 mb-2">✨ Luxury</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    <div>Diptyque, Jo Malone</div>
                    <div className="mt-2 font-semibold">$70-150+ range</div>
                    <div className="text-xs">Ultra-premium brand</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Export Actions */}
          <div className="flex gap-3">
            <button
              onClick={() => {
                const text = `PRICING STRATEGY - ${vessels[pricingVesselIndex].name}\n\nCost per unit: $${pricingData.costPerUnit.toFixed(2)}\nMarket Position: ${marketPosition}\n\nPRICING TIERS:\n💵 Minimum: $${pricingData.recommendedMin.toFixed(2)} (${pricingData.marginAtMin.toFixed(0)}% margin)\n🎯 Target: $${pricingData.recommendedTarget.toFixed(2)} (${pricingData.marginAtTarget.toFixed(0)}% margin)\n💎 Maximum: $${pricingData.recommendedMax.toFixed(2)} (${pricingData.marginAtMax.toFixed(0)}% margin)\n\nBULK PRICING:\n🏪 Wholesale: $${pricingData.wholesalePrice.toFixed(2)}\n🛍️ Retail: $${pricingData.retailPrice.toFixed(2)}\n💎 Premium: $${pricingData.premiumPrice.toFixed(2)}\n\nBREAK-EVEN: ${pricingData.breakEvenUnits} units/month`
                navigator.clipboard.writeText(text)
              }}
              className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-xl font-bold transition-all text-lg"
            >
              📋 Copy Pricing Strategy
            </button>
            <button
              onClick={() => window.print()}
              className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-4 rounded-xl font-bold transition-all text-lg"
            >
              🖨️ Print Report
            </button>
          </div>
        </>
      )}
    </div>
    </Tooltip.Provider>
  )
}
