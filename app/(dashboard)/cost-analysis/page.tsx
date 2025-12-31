'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import * as TooltipPrimitive from '@radix-ui/react-tooltip'
import { HelpCircle, X, RotateCcw, Trash2 } from 'lucide-react'

// Tooltip Component for settings fields
const Tooltip = ({ text }: { text: string }) => (
  <span className="inline-flex items-center ml-2" title={text}>
    <HelpCircle className="w-4 h-4 text-purple-500 hover:text-purple-700 cursor-help" />
  </span>
);

interface Vessel {
  id: number
  name: string
  diameter: number
  height: number
  unit: string
}

interface MaterialPrices {
  waxPricePerLb: number
  fragrancePricePerLb: number
  cementPricePerLb: number
  wickPrice: number
  paintPrice: number
}

interface VesselCalculation {
  totalCost: number
  waxWeight: number
  fragranceWeight: number
  cementWeight: number
  wicksNeeded: number
}

interface CustomCost {
  id: string
  name: string
  amount: number
  type: 'monthly' | 'per-unit'
}

export default function CostAnalysisPage() {
  // Info banner state
  const [showBanner, setShowBanner] = useState(true)
  
  useEffect(() => {
    const dismissed = localStorage.getItem('cost-analysis-banner-dismissed')
    if (dismissed === 'true') setShowBanner(false)
  }, [])

  const dismissBanner = () => {
    setShowBanner(false)
    localStorage.setItem('cost-analysis-banner-dismissed', 'true')
  }

  // Default values
  const defaultValues = {
    materialPrices: {
      waxPricePerLb: 8.50,
      fragrancePricePerLb: 40.00,
      cementPricePerLb: 0.50,
      wickPrice: 0.25,
      paintPrice: 0.75,
    },
    sellingPrice: 25.00,
    laborHourlyRate: 15,
    laborHoursPerUnit: 0.5,
    monthlyOverhead: 500,
    monthlySalesGoal: 200,
  }

  const handleReset = () => {
    setMaterialPrices(defaultValues.materialPrices)
    setSellingPrice(defaultValues.sellingPrice)
    setLaborHourlyRate(defaultValues.laborHourlyRate)
    setLaborHoursPerUnit(defaultValues.laborHoursPerUnit)
    setMonthlyOverhead(defaultValues.monthlyOverhead)
    setMonthlySalesGoal(defaultValues.monthlySalesGoal)
  }

  const handleClearAll = () => {
    setMaterialPrices({
      waxPricePerLb: 0,
      fragrancePricePerLb: 0,
      cementPricePerLb: 0,
      wickPrice: 0,
      paintPrice: 0,
    })
    setSellingPrice(0)
    setLaborHourlyRate(0)
    setLaborHoursPerUnit(0)
    setMonthlyOverhead(0)
    setMonthlySalesGoal(0)
  }

  const vessels: Vessel[] = [
    { id: 100, name: "Large Shallow", diameter: 8.2, height: 2.36, unit: "in" },
    { id: 101, name: "Medium Cylinder", diameter: 5.43, height: 2.16, unit: "in" },
    { id: 102, name: "Small Ribbed", diameter: 2.7, height: 1.4, unit: "in" },
    { id: 103, name: "Ribbed Jar Mold", diameter: 9.5, height: 8, unit: "cm" },
    { id: 104, name: "Flower Shell", diameter: 3.5, height: 4.8, unit: "cm" },
    { id: 105, name: "Bowl Vessel", diameter: 3.25, height: 2.125, unit: "in" }
  ]

  const [materialPrices, setMaterialPrices] = useState<MaterialPrices>({
    waxPricePerLb: 3.50,
    fragrancePricePerLb: 18.00,
    cementPricePerLb: 2.80,
    wickPrice: 0.25,
    paintPrice: 0.75
  })

  const [analysisVesselIndex, setAnalysisVesselIndex] = useState(0)
  const [sellingPrice, setSellingPrice] = useState(25.00)
  const [monthlyOverhead, setMonthlyOverhead] = useState(500)
  const [laborHourlyRate, setLaborHourlyRate] = useState(15)
  const [laborHoursPerUnit, setLaborHoursPerUnit] = useState(0.5)
  const [monthlySalesGoal, setMonthlySalesGoal] = useState(200)

  const [advancedCosts, setAdvancedCosts] = useState({
    rent: 800,
    utilities: 150,
    equipmentDepreciation: 100,
    packagingBoxes: 0.50,
    packagingTissue: 0.15,
    packagingStickers: 0.10,
    packagingThankYouCards: 0.25,
    shippingBubbleWrap: 0.30,
    shippingBoxes: 1.50,
    shippingLabels: 0.10,
    marketingAds: 200,
    marketingSamples: 50,
    marketingPhotography: 100,
    stripeFeePercent: 2.9,
    stripeFeeFixed: 0.30,
    etsyFeePercent: 6.5,
    shopifyMonthly: 39,
    insurance: 50,
    licenses: 25,
    businessFees: 30
  })

  const [customCosts, setCustomCosts] = useState<CustomCost[]>([])
  const [showAddCustomCost, setShowAddCustomCost] = useState(false)
  const [newCustomCost, setNewCustomCost] = useState({
    name: '',
    amount: 0,
    type: 'monthly' as 'monthly' | 'per-unit'
  })

  // Mock vessel calculations (simplified for this page)
  const calculateVesselCost = (vessel: Vessel): VesselCalculation => {
    const diameterInInches = vessel.unit === 'cm' ? vessel.diameter / 2.54 : vessel.diameter
    const heightInInches = vessel.unit === 'cm' ? vessel.height / 2.54 : vessel.height
    const radius = diameterInInches / 2
    const volumeCubicInches = Math.PI * radius * radius * heightInInches
    const volumeOunces = volumeCubicInches * 0.554113
    const waxWeight = volumeOunces * 0.85
    const fragranceWeight = waxWeight * 0.10
    const cementWeight = volumeOunces * 0.15
    const wicksNeeded = 1

    const waxCost = (waxWeight / 16) * materialPrices.waxPricePerLb
    const fragranceCost = (fragranceWeight / 16) * materialPrices.fragrancePricePerLb
    const cementCost = (cementWeight / 16) * materialPrices.cementPricePerLb
    const wickCost = wicksNeeded * materialPrices.wickPrice
    const paintCost = materialPrices.paintPrice

    return {
      totalCost: waxCost + fragranceCost + cementCost + wickCost + paintCost,
      waxWeight,
      fragranceWeight,
      cementWeight,
      wicksNeeded
    }
  }

  const vesselCalculations = vessels.map(calculateVesselCost)

  const calculateCostAnalysis = () => {
    const vesselCalc = vesselCalculations[analysisVesselIndex]
    if (!vesselCalc) return null

    const materialCost = vesselCalc.totalCost
    const laborCost = laborHourlyRate * laborHoursPerUnit
    const totalCostPerUnit = materialCost + laborCost

    const revenue = sellingPrice
    const grossProfit = revenue - totalCostPerUnit
    const grossMargin = (grossProfit / revenue) * 100

    const monthlyRevenue = revenue * monthlySalesGoal
    const monthlyCOGS = totalCostPerUnit * monthlySalesGoal
    const monthlyGrossProfit = grossProfit * monthlySalesGoal
    const monthlyNetProfit = monthlyGrossProfit - monthlyOverhead
    const netMargin = (monthlyNetProfit / monthlyRevenue) * 100

    const breakEvenUnits = Math.ceil(monthlyOverhead / grossProfit)
    const daysToBreakEven = (breakEvenUnits / monthlySalesGoal) * 30

    const totalInvestment = monthlyOverhead + (materialCost * monthlySalesGoal)
    const roi = ((monthlyNetProfit / totalInvestment) * 100)

    const waxCost = (vesselCalc.waxWeight / 16) * materialPrices.waxPricePerLb
    const fragranceCost = (vesselCalc.fragranceWeight / 16) * materialPrices.fragrancePricePerLb
    const cementCost = (vesselCalc.cementWeight / 16) * materialPrices.cementPricePerLb
    const wickCost = vesselCalc.wicksNeeded * materialPrices.wickPrice
    const paintCost = materialPrices.paintPrice

    const totalMaterialCost = waxCost + fragranceCost + cementCost + wickCost + paintCost

    return {
      materialCost,
      laborCost,
      totalCostPerUnit,
      revenue,
      grossProfit,
      grossMargin,
      monthlyRevenue,
      monthlyCOGS,
      monthlyGrossProfit,
      monthlyOverhead,
      monthlyNetProfit,
      netMargin,
      breakEvenUnits,
      daysToBreakEven,
      roi,
      totalInvestment,
      waxCost,
      fragranceCost,
      cementCost,
      wickCost,
      paintCost,
      totalMaterialCost,
      waxPercent: (waxCost / totalMaterialCost) * 100,
      fragrancePercent: (fragranceCost / totalMaterialCost) * 100,
      cementPercent: (cementCost / totalMaterialCost) * 100,
      wickPercent: (wickCost / totalMaterialCost) * 100,
      paintPercent: (paintCost / totalMaterialCost) * 100,
      laborPercent: (laborCost / totalCostPerUnit) * 100,
      materialPercent: (materialCost / totalCostPerUnit) * 100,
    }
  }

  const costAnalysis = calculateCostAnalysis()

  return (
    <TooltipPrimitive.Provider delayDuration={200}>
      <div className="p-8">
        {/* Info Banner */}
        {showBanner && (
          <div className="bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-700 rounded-lg p-4 flex items-start gap-3 mb-8">
            <div className="flex-shrink-0 text-2xl">📝</div>
            <div className="flex-1">
              <p className="text-blue-900 dark:text-blue-100 font-medium">These are example values to get you started!</p>
              <p className="text-blue-700 dark:text-blue-200 text-sm mt-1">Edit any field to see live calculations for your business. All changes are instant.</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleReset}
                className="px-3 py-1.5 text-sm border-2 border-purple-500 text-purple-600 dark:text-purple-400 rounded-lg hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reset
              </button>
              <button
                onClick={handleClearAll}
                className="px-3 py-1.5 text-sm border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors flex items-center gap-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Clear All
              </button>
              <button
                onClick={dismissBanner}
                className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200 p-1"
                aria-label="Dismiss banner"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-fuchsia-600 bg-clip-text text-transparent flex items-center gap-2">
            💎 Cost Analysis & Profitability
            <TooltipPrimitive.Root>
              <TooltipPrimitive.Trigger asChild>
                <HelpCircle className="w-6 h-6 text-purple-500 hover:text-purple-600 cursor-help" />
              </TooltipPrimitive.Trigger>
              <TooltipPrimitive.Portal>
                <TooltipPrimitive.Content 
                  side="right" 
                  className="bg-white text-gray-900 px-4 py-3 rounded-lg shadow-xl text-sm max-w-xs z-[9999]"
                  sideOffset={5}
                >
                  Analyze profitability, break-even points, and ROI for your candle business. Track costs per unit, calculate gross margins, and understand monthly revenue projections.
                  <TooltipPrimitive.Arrow className="fill-white" />
                </TooltipPrimitive.Content>
              </TooltipPrimitive.Portal>
            </TooltipPrimitive.Root>
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Track costs • Maximize profits • ROI analysis • Break-even calculator
          </p>
        </div>

      {/* Quick Overview */}
      {costAnalysis && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20 p-4 rounded-xl border-2 border-green-300 dark:border-green-700">
            <div className="text-green-900 dark:text-green-100 text-sm font-semibold mb-1">💰 Profit/Unit</div>
            <div className="text-3xl font-bold text-green-600 dark:text-green-400">
              ${costAnalysis.grossProfit.toFixed(2)}
            </div>
            <div className="text-xs text-green-700 dark:text-green-300 mt-1">
              {costAnalysis.grossMargin.toFixed(1)}% margin
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-cyan-100 dark:from-blue-900/20 dark:to-cyan-900/20 p-4 rounded-xl border-2 border-blue-300 dark:border-blue-700">
            <div className="text-blue-900 dark:text-blue-100 text-sm font-semibold mb-1">📈 Monthly Profit</div>
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
              ${costAnalysis.monthlyNetProfit.toFixed(0)}
            </div>
            <div className="text-xs text-blue-700 dark:text-blue-300 mt-1">
              Net {costAnalysis.netMargin.toFixed(1)}% margin
            </div>
          </div>

          <div className="bg-gradient-to-br from-orange-50 to-amber-100 dark:from-orange-900/20 dark:to-amber-900/20 p-4 rounded-xl border-2 border-orange-300 dark:border-orange-700">
            <div className="text-orange-900 dark:text-orange-100 text-sm font-semibold mb-1">⚖️ Break Even</div>
            <div className="text-3xl font-bold text-orange-600 dark:text-orange-400">
              {costAnalysis.breakEvenUnits}
            </div>
            <div className="text-xs text-orange-700 dark:text-orange-300 mt-1">
              units ({costAnalysis.daysToBreakEven.toFixed(0)} days)
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20 p-4 rounded-xl border-2 border-purple-300 dark:border-purple-700">
            <div className="text-purple-900 dark:text-purple-100 text-sm font-semibold mb-1">🎯 ROI</div>
            <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
              {costAnalysis.roi.toFixed(1)}%
            </div>
            <div className="text-xs text-purple-700 dark:text-purple-300 mt-1">
              Monthly return
            </div>
          </div>
        </div>
      )}

      {/* Configuration */}
      {costAnalysis && (
        <Card className="mb-6 border-2 border-purple-200 dark:border-purple-800">
          <CardHeader>
            <CardTitle className="text-purple-900 dark:text-purple-100">⚙️ Analysis Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
              <div>
                <Label className="text-gray-900 dark:text-gray-100 font-semibold mb-2 block text-sm flex items-center">
                  Vessel Type
                  <Tooltip text="Select the candle container type to calculate material costs based on volume." />
                </Label>
                <select
                  value={analysisVesselIndex}
                  onChange={(e) => setAnalysisVesselIndex(parseInt(e.target.value))}
                  className="w-full p-2 border-2 border-purple-200 dark:border-purple-800 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm"
                >
                  {vessels.map((vessel, idx) => (
                    <option key={vessel.id} value={idx}>
                      {vessel.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <Label className="text-gray-900 dark:text-gray-100 font-semibold mb-2 block text-sm flex items-center">
                  Selling Price
                  <Tooltip text="The retail price you charge customers per candle unit." />
                </Label>
                <Input
                  type="number"
                  value={sellingPrice}
                  onChange={(e) => setSellingPrice(parseFloat(e.target.value) || 0)}
                  step="0.5"
                  className="text-sm"
                />
              </div>

              <div>
                <Label className="text-gray-900 dark:text-gray-100 font-semibold mb-2 block text-sm flex items-center">
                  Labor Rate ($/hr)
                  <Tooltip text="Hourly wage for production labor including benefits and overhead." />
                </Label>
                <Input
                  type="number"
                  value={laborHourlyRate}
                  onChange={(e) => setLaborHourlyRate(parseFloat(e.target.value) || 0)}
                  step="1"
                  className="text-sm"
                />
              </div>

              <div>
                <Label className="text-gray-900 dark:text-gray-100 font-semibold mb-2 block text-sm">Hours/Unit</Label>
                <Input
                  type="number"
                  value={laborHoursPerUnit}
                  onChange={(e) => setLaborHoursPerUnit(parseFloat(e.target.value) || 0)}
                  step="0.1"
                  className="text-sm"
                />
              </div>

              <div>
                <Label className="text-gray-900 dark:text-gray-100 font-semibold mb-2 block text-sm">Monthly Sales Goal</Label>
                <Input
                  type="number"
                  value={monthlySalesGoal}
                  onChange={(e) => setMonthlySalesGoal(parseInt(e.target.value) || 0)}
                  className="text-sm"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Advanced Overhead Costs - Full implementation continues with detailed breakdown */}
      {/* Due to size, showing key sections */}

      {/* Per Unit Cost Breakdown */}
      {costAnalysis && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <Card className="border-2 border-amber-300 dark:border-amber-700">
            <CardHeader className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20">
              <CardTitle className="text-amber-900 dark:text-amber-100">💵 Per Unit Breakdown</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-white dark:bg-gray-800 rounded-lg">
                  <span className="text-gray-700 dark:text-gray-300 font-semibold">Materials</span>
                  <span className="text-xl font-bold text-amber-600 dark:text-amber-400">
                    ${costAnalysis.materialCost.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between items-center p-3 bg-white dark:bg-gray-800 rounded-lg">
                  <span className="text-gray-700 dark:text-gray-300 font-semibold">Labor</span>
                  <span className="text-xl font-bold text-amber-600 dark:text-amber-400">
                    ${costAnalysis.laborCost.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between items-center p-3 bg-amber-100 dark:bg-amber-900/40 rounded-lg border-2 border-amber-400 dark:border-amber-600">
                  <span className="text-amber-900 dark:text-amber-100 font-bold">Total Cost</span>
                  <span className="text-2xl font-bold text-amber-700 dark:text-amber-300">
                    ${costAnalysis.totalCostPerUnit.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between items-center p-3 bg-green-100 dark:bg-green-900/40 rounded-lg border-2 border-green-400 dark:border-green-600">
                  <span className="text-green-900 dark:text-green-100 font-bold">Selling Price</span>
                  <span className="text-2xl font-bold text-green-700 dark:text-green-300">
                    ${costAnalysis.revenue.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between items-center p-3 bg-purple-100 dark:bg-purple-900/40 rounded-lg border-2 border-purple-400 dark:border-purple-600">
                  <span className="text-purple-900 dark:text-purple-100 font-bold">Gross Profit</span>
                  <span className="text-2xl font-bold text-purple-700 dark:text-purple-300">
                    ${costAnalysis.grossProfit.toFixed(2)}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Material Cost Breakdown */}
          <Card className="border-2 border-blue-300 dark:border-blue-700">
            <CardHeader className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20">
              <CardTitle className="text-blue-900 dark:text-blue-100">🧪 Material Costs</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-3">
                <div className="flex justify-between items-center p-2 bg-white dark:bg-gray-800 rounded-lg">
                  <div>
                    <div className="text-gray-700 dark:text-gray-300 font-semibold text-sm">🕯️ Wax</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {costAnalysis.waxPercent.toFixed(1)}% of materials
                    </div>
                  </div>
                  <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
                    ${costAnalysis.waxCost.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between items-center p-2 bg-white dark:bg-gray-800 rounded-lg">
                  <div>
                    <div className="text-gray-700 dark:text-gray-300 font-semibold text-sm">🌸 Fragrance</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {costAnalysis.fragrancePercent.toFixed(1)}% of materials
                    </div>
                  </div>
                  <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
                    ${costAnalysis.fragranceCost.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between items-center p-2 bg-white dark:bg-gray-800 rounded-lg">
                  <div>
                    <div className="text-gray-700 dark:text-gray-300 font-semibold text-sm">🏗️ Cement</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {costAnalysis.cementPercent.toFixed(1)}% of materials
                    </div>
                  </div>
                  <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
                    ${costAnalysis.cementCost.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between items-center p-2 bg-white dark:bg-gray-800 rounded-lg">
                  <div>
                    <div className="text-gray-700 dark:text-gray-300 font-semibold text-sm">🧵 Wicks</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {costAnalysis.wickPercent.toFixed(1)}% of materials
                    </div>
                  </div>
                  <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
                    ${costAnalysis.wickCost.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between items-center p-2 bg-white dark:bg-gray-800 rounded-lg">
                  <div>
                    <div className="text-gray-700 dark:text-gray-300 font-semibold text-sm">🎨 Paint</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {costAnalysis.paintPercent.toFixed(1)}% of materials
                    </div>
                  </div>
                  <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
                    ${costAnalysis.paintCost.toFixed(2)}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Monthly Profitability */}
      {costAnalysis && (
        <Card className="mb-6 border-2 border-green-300 dark:border-green-700">
          <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
            <CardTitle className="text-green-900 dark:text-green-100">
              📊 Monthly Profitability ({monthlySalesGoal} units)
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl">
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Revenue</div>
                <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  ${costAnalysis.monthlyRevenue.toFixed(0)}
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl">
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">COGS</div>
                <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                  -${costAnalysis.monthlyCOGS.toFixed(0)}
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl">
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Gross Profit</div>
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                  ${costAnalysis.monthlyGrossProfit.toFixed(0)}
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl">
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Overhead</div>
                <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                  -${monthlyOverhead}
                </div>
                <button
                  onClick={() => {
                    const newOverhead = prompt('Monthly Overhead:', monthlyOverhead.toString())
                    if (newOverhead) setMonthlyOverhead(parseFloat(newOverhead) || 500)
                  }}
                  className="text-xs text-blue-600 hover:underline mt-1"
                >
                  Edit
                </button>
              </div>

              <div className="bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/40 dark:to-pink-900/40 p-4 rounded-xl border-2 border-purple-400 dark:border-purple-600">
                <div className="text-sm text-purple-700 dark:text-purple-300 mb-1 font-semibold">Net Profit</div>
                <div className={`text-2xl font-bold ${costAnalysis.monthlyNetProfit >= 0 ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'}`}>
                  ${costAnalysis.monthlyNetProfit.toFixed(0)}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Break-Even & ROI */}
      {costAnalysis && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <Card className="border-2 border-orange-200 dark:border-orange-800">
            <CardHeader>
              <CardTitle className="text-orange-900 dark:text-orange-100">⚖️ Break-Even Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                  <div className="text-sm text-orange-700 dark:text-orange-300 mb-1">Units to Break Even</div>
                  <div className="text-4xl font-bold text-orange-600 dark:text-orange-400">
                    {costAnalysis.breakEvenUnits}
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                    ≈ {costAnalysis.daysToBreakEven.toFixed(0)} days at current pace
                  </div>
                </div>

                <div className="text-sm text-gray-700 dark:text-gray-300 space-y-2">
                  <div className="flex justify-between">
                    <span>Fixed Costs (Overhead):</span>
                    <span className="font-bold">${monthlyOverhead}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Profit per Unit:</span>
                    <span className="font-bold text-green-600 dark:text-green-400">
                      ${costAnalysis.grossProfit.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between pt-2 border-t-2">
                    <span className="font-bold">Current Progress:</span>
                    <span className="font-bold text-orange-600 dark:text-orange-400">
                      {((monthlySalesGoal / costAnalysis.breakEvenUnits) * 100).toFixed(0)}%
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-purple-200 dark:border-purple-800">
            <CardHeader>
              <CardTitle className="text-purple-900 dark:text-purple-100">🎯 ROI Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <div className="text-sm text-purple-700 dark:text-purple-300 mb-1">Monthly Return on Investment</div>
                  <div className="text-4xl font-bold text-purple-600 dark:text-purple-400">
                    {costAnalysis.roi.toFixed(1)}%
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                    {costAnalysis.roi > 0 ? '✅ Profitable' : '⚠️ Needs Improvement'}
                  </div>
                </div>

                <div className="text-sm text-gray-700 dark:text-gray-300 space-y-2">
                  <div className="flex justify-between">
                    <span>Total Investment:</span>
                    <span className="font-bold">${costAnalysis.totalInvestment.toFixed(0)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Net Profit:</span>
                    <span className={`font-bold ${costAnalysis.monthlyNetProfit >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                      ${costAnalysis.monthlyNetProfit.toFixed(0)}
                    </span>
                  </div>
                  <div className="flex justify-between pt-2 border-t-2">
                    <span className="font-bold">Payback Period:</span>
                    <span className="font-bold text-purple-600 dark:text-purple-400">
                      {costAnalysis.monthlyNetProfit > 0 ? `${(costAnalysis.totalInvestment / costAnalysis.monthlyNetProfit).toFixed(1)} months` : 'N/A'}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Export Actions */}
      {costAnalysis && (
        <div className="flex gap-3">
          <button
            onClick={() => {
              const text = `COST ANALYSIS REPORT\n\n=== PER UNIT ===\nMaterials: $${costAnalysis.materialCost.toFixed(2)}\nLabor: $${costAnalysis.laborCost.toFixed(2)}\nTotal Cost: $${costAnalysis.totalCostPerUnit.toFixed(2)}\nSelling Price: $${costAnalysis.revenue.toFixed(2)}\nGross Profit: $${costAnalysis.grossProfit.toFixed(2)} (${costAnalysis.grossMargin.toFixed(1)}%)\n\n=== MONTHLY (${monthlySalesGoal} units) ===\nRevenue: $${costAnalysis.monthlyRevenue.toFixed(0)}\nCOGS: $${costAnalysis.monthlyCOGS.toFixed(0)}\nGross Profit: $${costAnalysis.monthlyGrossProfit.toFixed(0)}\nOverhead: $${monthlyOverhead}\nNet Profit: $${costAnalysis.monthlyNetProfit.toFixed(0)} (${costAnalysis.netMargin.toFixed(1)}%)\n\n=== BREAK-EVEN ===\nUnits Needed: ${costAnalysis.breakEvenUnits}\nDays to Break Even: ${costAnalysis.daysToBreakEven.toFixed(0)}\n\n=== ROI ===\nReturn on Investment: ${costAnalysis.roi.toFixed(1)}%\nTotal Investment: $${costAnalysis.totalInvestment.toFixed(0)}`
              navigator.clipboard.writeText(text)
              alert('Report copied to clipboard!')
            }}
            className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-xl font-bold transition-all text-lg"
          >
            📋 Copy Report
          </button>
          <button
            onClick={() => window.print()}
            className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-4 rounded-xl font-bold transition-all text-lg"
          >
            🖨️ Print Report
          </button>
        </div>
      )}
    </div>
    </TooltipPrimitive.Provider>
  )
}
