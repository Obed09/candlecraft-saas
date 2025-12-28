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

export default function VesselCalculator() {
  // Material prices (editable)
  const [materialPrices, setMaterialPrices] = useState({
    waxType: 'soy' as 'soy' | 'paraffin' | 'beeswax' | 'coconut' | 'parasoy' | 'blend',
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
    {
      id: 100,
      name: "Large Shallow",
      diameter: 8.2,
      height: 2.36,
      unit: "in"
    },
    {
      id: 101,
      name: "Medium Cylinder",
      diameter: 5.43,
      height: 2.16,
      unit: "in",
      actualCapacity: 10.1
    },
    {
      id: 102,
      name: "Small Ribbed",
      diameter: 2.7,
      height: 1.4,
      unit: "in"
    },
    {
      id: 103,
      name: "Ribbed Jar Mold",
      diameter: 9.5,
      height: 8,
      unit: "cm"
    },
    {
      id: 104,
      name: "Flower Shell",
      diameter: 3.5,
      height: 4.8,
      unit: "cm"
    },
    {
      id: 105,
      name: "Bowl Vessel",
      diameter: 3.25,
      height: 2.125,
      unit: "in"
    }
  ]

  // Custom Vessel Management
  const [customVessels, setCustomVessels] = useState<Vessel[]>([])
  const [showAddVesselModal, setShowAddVesselModal] = useState(false)
  const [newVessel, setNewVessel] = useState({
    name: '',
    diameter: 0,
    height: 0,
    unit: 'cm' as 'cm' | 'in',
    imageName: ''
  })

  // Combine default vessels with custom vessels
  const allVessels = [...vessels, ...customVessels]

  // Profit calculator
  const [profitCalc, setProfitCalc] = useState({
    selectedVesselIndex: 0,
    sellingPrice: 25.00,
    quantity: 100,
  })

  const handleMaterialChange = (field: string, value: string | number) => {
    if (field === 'waxType') {
      setMaterialPrices(prev => ({
        ...prev,
        waxType: value as 'soy' | 'coconut'
      }))
    } else {
      setMaterialPrices(prev => ({
        ...prev,
        [field]: typeof value === 'string' ? parseFloat(value) || 0 : value
      }))
    }
  }

  const handleProfitChange = (field: string, value: string) => {
    setProfitCalc(prev => ({
      ...prev,
      [field]: field === 'selectedVesselIndex' ? parseInt(value) : parseFloat(value) || 0
    }))
  }

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
    
    const waxDensities: Record<string, number> = {
      soy: 0.9,
      paraffin: 0.9,
      beeswax: 0.96,
      coconut: 0.92,
      parasoy: 0.9,
      blend: 0.91
    }
    const waxDensity = waxDensities[materialPrices.waxType] || 0.9
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
  const vesselCalculations = allVessels.map(vessel => ({
    vessel,
    calc: calculateMaterials(vessel)
  }))

  // Custom Vessel Functions
  const addCustomVessel = () => {
    if (!newVessel.name || newVessel.diameter <= 0 || newVessel.height <= 0) {
      alert('Please fill all vessel details')
      return
    }

    const customVessel: Vessel = {
      id: 200 + customVessels.length,
      name: newVessel.name,
      diameter: newVessel.diameter,
      height: newVessel.height,
      unit: newVessel.unit
    }

    setCustomVessels([...customVessels, customVessel])
    setShowAddVesselModal(false)
    setNewVessel({ name: '', diameter: 0, height: 0, unit: 'cm', imageName: '' })
  }

  const deleteCustomVessel = (id: number) => {
    if (confirm('Delete this custom vessel?')) {
      setCustomVessels(customVessels.filter(v => v.id !== id))
    }
  }

  // Profit calculations
  const selectedVesselCalc = vesselCalculations[profitCalc.selectedVesselIndex]?.calc || vesselCalculations[0].calc
  const profitPerUnit = profitCalc.sellingPrice - selectedVesselCalc.totalCost
  const profitMargin = selectedVesselCalc.totalCost > 0 ? ((profitPerUnit / selectedVesselCalc.totalCost) * 100) : 0
  const totalProfit = profitPerUnit * profitCalc.quantity
  const totalRevenue = profitCalc.sellingPrice * profitCalc.quantity
  const totalCost = selectedVesselCalc.totalCost * profitCalc.quantity

  const getProfitColor = (profit: number) => {
    if (profit < 5) return 'text-red-600'
    if (profit < 15) return 'text-orange-600'
    return 'text-green-600'
  }

  return (
    <Tooltip.Provider delayDuration={200}>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="p-6 max-w-7xl mx-auto space-y-6">
          {/* Header */}
          <Card className="border-2 border-purple-500/30 bg-white/95 dark:bg-gray-900/95 backdrop-blur">
            <CardHeader className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-t-lg">
              <CardTitle className="text-3xl font-bold flex items-center gap-2">
                🧮 Vessel Calculator
                <Tooltip.Root>
                  <Tooltip.Trigger asChild>
                    <HelpCircle className="w-5 h-5 text-purple-200 hover:text-white cursor-help ml-2" />
                  </Tooltip.Trigger>
                  <Tooltip.Portal>
                    <Tooltip.Content 
                      side="right" 
                      className="bg-white text-gray-900 px-4 py-3 rounded-lg shadow-xl text-sm max-w-xs z-[9999]"
                      sideOffset={5}
                    >
                      Calculate precise wax, fragrance, and material requirements for different vessel sizes. Get accurate cost breakdowns and volume measurements for each container type.
                      <Tooltip.Arrow className="fill-white" />
                    </Tooltip.Content>
                  </Tooltip.Portal>
                </Tooltip.Root>
              </CardTitle>
              <p className="text-purple-100">Calculate material costs and volumes for your candle vessels</p>
            </CardHeader>
          </Card>

        {/* Material Prices Configuration */}
        <Card className="border-2 border-amber-500/30 bg-white dark:bg-gray-900">
          <CardHeader className="bg-gradient-to-r from-amber-500 to-orange-500 text-white">
            <CardTitle className="flex items-center gap-2">
              💰 Material Prices
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 bg-white dark:bg-gray-900">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <Label className="text-gray-900 dark:text-gray-100 font-semibold mb-2 block">Wax Type</Label>
                <select
                  value={materialPrices.waxType}
                  onChange={(e) => handleMaterialChange('waxType', e.target.value)}
                  className="w-full p-2 border-2 border-amber-300 dark:border-amber-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                >
                  <option value="soy">Soy Wax - 6-10% fragrance load</option>
                  <option value="paraffin">Paraffin Wax - 8-12% fragrance load</option>
                  <option value="beeswax">Beeswax Wax - 3-6% fragrance load</option>
                  <option value="coconut">Coconut Wax - 6-10% fragrance load</option>
                  <option value="parasoy">Parasoy Wax - 8-12% fragrance load</option>
                  <option value="blend">Blend Wax - 6-10% fragrance load</option>
                </select>
              </div>

              <div>
                <Label className="text-gray-900 dark:text-gray-100 font-semibold mb-2 block">Wax Price ($/lb)</Label>
                <Input
                  type="number"
                  step="0.01"
                  value={materialPrices.waxPricePerLb}
                  onChange={(e) => handleMaterialChange('waxPricePerLb', e.target.value)}
                  className="border-amber-300 dark:border-amber-700 text-gray-900 dark:text-white"
                />
              </div>

              <div>
                <Label className="text-gray-900 dark:text-gray-100 font-semibold mb-2 block">Fragrance Price ($/lb)</Label>
                <Input
                  type="number"
                  step="0.01"
                  value={materialPrices.fragrancePricePerLb}
                  onChange={(e) => handleMaterialChange('fragrancePricePerLb', e.target.value)}
                  className="border-amber-300 dark:border-amber-700 text-gray-900 dark:text-white"
                />
              </div>

              <div>
                <Label className="text-gray-900 dark:text-gray-100 font-semibold mb-2 block">Cement Price ($/lb)</Label>
                <Input
                  type="number"
                  step="0.01"
                  value={materialPrices.cementPricePerLb}
                  onChange={(e) => handleMaterialChange('cementPricePerLb', e.target.value)}
                  className="border-amber-300 dark:border-amber-700 text-gray-900 dark:text-white"
                />
              </div>

              <div>
                <Label className="text-gray-900 dark:text-gray-100 font-semibold mb-2 block">Wick Price ($)</Label>
                <Input
                  type="number"
                  step="0.01"
                  value={materialPrices.wickPrice}
                  onChange={(e) => handleMaterialChange('wickPrice', e.target.value)}
                  className="border-amber-300 dark:border-amber-700 text-gray-900 dark:text-white"
                />
              </div>

              <div>
                <Label className="text-gray-900 dark:text-gray-100 font-semibold mb-2 block">Paint Price ($)</Label>
                <Input
                  type="number"
                  step="0.01"
                  value={materialPrices.paintPrice}
                  onChange={(e) => handleMaterialChange('paintPrice', e.target.value)}
                  className="border-amber-300 dark:border-amber-700 text-gray-900 dark:text-white"
                />
              </div>

              <div>
                <Label className="text-gray-900 dark:text-gray-100 font-semibold mb-2 block">Fill Percent (%)</Label>
                <Input
                  type="number"
                  step="1"
                  min="1"
                  max="100"
                  value={materialPrices.fillPercent}
                  onChange={(e) => handleMaterialChange('fillPercent', e.target.value)}
                  className="border-amber-300 dark:border-amber-700 text-gray-900 dark:text-white"
                />
              </div>

              <div>
                <Label className="text-gray-900 dark:text-gray-100 font-semibold mb-2 block">Fragrance Load (%)</Label>
                <Input
                  type="number"
                  step="1"
                  min="1"
                  max="15"
                  value={materialPrices.fragranceLoad}
                  onChange={(e) => handleMaterialChange('fragranceLoad', e.target.value)}
                  className="border-amber-300 dark:border-amber-700 text-gray-900 dark:text-white"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Vessel Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
          {vesselCalculations.map((vesselCalc, idx) => {
            const { vessel, calc } = vesselCalc
            const isCustom = vessel.id >= 200

            return (
              <Card key={vessel.id} className="border-2 border-purple-500/30 hover:border-purple-500 hover:shadow-xl transition-all">
                <CardHeader className="bg-gradient-to-r from-amber-400 to-yellow-500 text-white p-4 relative">
                  <div className="flex items-center justify-between mb-2">
                    <span className="bg-white text-amber-600 px-3 py-1 rounded-full text-sm font-bold">
                      #{vessel.id}
                    </span>
                    {isCustom && (
                      <>
                        <span className="bg-purple-600 text-white px-2 py-1 rounded-full text-xs font-bold">
                          CUSTOM
                        </span>
                        <button
                          onClick={() => deleteCustomVessel(vessel.id)}
                          className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white w-6 h-6 rounded-full font-bold text-sm transition-all"
                          title="Delete Custom Vessel"
                        >
                          🗑️
                        </button>
                      </>
                    )}
                  </div>
                  <h3 className="font-bold text-lg">{vessel.name}</h3>
                </CardHeader>
                <CardContent className="p-4 space-y-3">
                  {/* Vessel Icon */}
                  <div className="relative w-full h-20 bg-gradient-to-br from-purple-100 to-indigo-100 dark:from-purple-900/30 dark:to-indigo-900/30 rounded-lg flex items-center justify-center">
                    <span className="text-6xl">🕯️</span>
                  </div>

                  {/* Remove image rendering to prevent 404 errors
                  {vessel.imageName && !isCustom && (
                    <div className="relative w-full h-40 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
                      <Image
                        src={`/${vessel.imageName}`}
                        alt={vessel.name}
                        width={160}
                        height={160}
                        className="object-contain mx-auto"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none'
                        }}
                      />
                    </div>
                  )} */}

                  {/* Dimensions */}
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg border-2 border-blue-300 dark:border-blue-700">
                    <div className="font-bold text-blue-900 dark:text-blue-100 mb-2">📏 Dimensions</div>
                    <div className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                      <div>Diameter: <span className="font-bold">{vessel.diameter} {vessel.unit}</span></div>
                      <div>Height: <span className="font-bold">{vessel.height} {vessel.unit}</span></div>
                      <div>Volume: <span className="font-bold text-blue-700 dark:text-blue-300">{calc.volumeOz.toFixed(1)} oz</span></div>
                    </div>
                  </div>

                  {/* Materials */}
                  <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg border-2 border-green-300 dark:border-green-700">
                    <div className="font-bold text-green-900 dark:text-green-100 mb-2">📦 Materials</div>
                    <div className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                      <div>🕯️ Wax: <span className="font-bold">{calc.waxWeight.toFixed(0)}g</span></div>
                      <div>🌸 Fragrance: <span className="font-bold">{calc.fragranceWeight.toFixed(0)}g</span></div>
                      <div>🏗️ Cement: <span className="font-bold">{calc.cementWeight.toFixed(0)}g</span></div>
                      <div>🧵 Wicks: <span className="font-bold">{calc.wicksNeeded}</span></div>
                    </div>
                  </div>

                  {/* Cost Breakdown */}
                  <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded-lg border-2 border-purple-300 dark:border-purple-700">
                    <div className="font-bold text-purple-900 dark:text-purple-100 mb-2">💵 Cost Breakdown</div>
                    <div className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                      <div>Wax: <span className="font-bold">${calc.waxCost.toFixed(2)}</span></div>
                      <div>Fragrance: <span className="font-bold">${calc.fragranceCost.toFixed(2)}</span></div>
                      <div>Cement: <span className="font-bold">${calc.cementCost.toFixed(2)}</span></div>
                      <div>Wick: <span className="font-bold">${calc.wickCost.toFixed(2)}</span></div>
                      <div>Paint: <span className="font-bold">${calc.paintCost.toFixed(2)}</span></div>
                    </div>
                  </div>

                  {/* Total Cost */}
                  <div className="bg-gradient-to-r from-amber-400 to-yellow-500 text-white p-3 rounded-lg text-center">
                    <div className="text-sm font-semibold mb-1">TOTAL COST</div>
                    <div className="text-2xl font-bold">${calc.totalCost.toFixed(2)}</div>
                  </div>
                </CardContent>
              </Card>
            )
          })}

          {/* Add Custom Vessel Card */}
          <Card 
            onClick={() => setShowAddVesselModal(true)}
            className="border-2 border-dashed border-purple-400 hover:border-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/20 cursor-pointer transition-all flex items-center justify-center min-h-[400px]"
          >
            <div className="text-center p-6">
              <div className="text-6xl mb-4">➕</div>
              <div className="text-xl font-bold text-purple-700 dark:text-purple-300">Add Custom Vessel</div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">Click to add your own vessel dimensions</div>
            </div>
          </Card>
        </div>

        {/* Comparison Summary */}
        <Card className="border-2 border-amber-500/30">
          <CardHeader className="bg-gradient-to-r from-amber-500 to-orange-500 text-white">
            <CardTitle className="flex items-center gap-2">
              📊 Vessel Comparison Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-amber-100 dark:bg-amber-900/40">
                  <th className="p-3 text-left font-bold text-gray-900 dark:text-gray-100">Vessel Name</th>
                  <th className="p-3 text-left font-bold text-gray-900 dark:text-gray-100">Dimensions</th>
                  <th className="p-3 text-right font-bold text-gray-900 dark:text-gray-100">Wax (g)</th>
                  <th className="p-3 text-right font-bold text-gray-900 dark:text-gray-100">Fragrance (g)</th>
                  <th className="p-3 text-right font-bold text-gray-900 dark:text-gray-100">Cement (g)</th>
                  <th className="p-3 text-right font-bold text-amber-700 dark:text-amber-300">Total Cost</th>
                </tr>
              </thead>
              <tbody>
                {vesselCalculations.map((vesselCalc, idx) => (
                  <tr key={vesselCalc.vessel.id} className={idx % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-700'}>
                    <td className="p-3 font-semibold text-gray-900 dark:text-gray-100">{vesselCalc.vessel.name}</td>
                    <td className="p-3 text-gray-700 dark:text-gray-300">
                      {vesselCalc.vessel.diameter} × {vesselCalc.vessel.height} {vesselCalc.vessel.unit}
                    </td>
                    <td className="p-3 text-right text-gray-700 dark:text-gray-300">{vesselCalc.calc.waxWeight.toFixed(0)}</td>
                    <td className="p-3 text-right text-gray-700 dark:text-gray-300">{vesselCalc.calc.fragranceWeight.toFixed(0)}</td>
                    <td className="p-3 text-right text-gray-700 dark:text-gray-300">{vesselCalc.calc.cementWeight.toFixed(0)}</td>
                    <td className="p-3 text-right font-bold text-amber-700 dark:text-amber-300">${vesselCalc.calc.totalCost.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Summary Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-4 rounded-xl border-2 border-blue-300 dark:border-blue-700">
                <div className="text-sm text-blue-700 dark:text-blue-300 mb-1">Total Vessels</div>
                <div className="text-3xl font-bold text-blue-900 dark:text-blue-100">{allVessels.length}</div>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-4 rounded-xl border-2 border-green-300 dark:border-green-700">
                <div className="text-sm text-green-700 dark:text-green-300 mb-1">Largest Vessel</div>
                <div className="text-lg font-bold text-green-900 dark:text-green-100">
                  {vesselCalculations.reduce((max, v) => v.calc.volumeOz > max.calc.volumeOz ? v : max).vessel.name}
                  <div className="text-sm text-green-700 dark:text-green-300">
                    {vesselCalculations.reduce((max, v) => v.calc.volumeOz > max.calc.volumeOz ? v : max).calc.volumeOz.toFixed(1)} oz
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-4 rounded-xl border-2 border-purple-300 dark:border-purple-700">
                <div className="text-sm text-purple-700 dark:text-purple-300 mb-1">Smallest Vessel</div>
                <div className="text-lg font-bold text-purple-900 dark:text-purple-100">
                  {vesselCalculations.reduce((min, v) => v.calc.volumeOz < min.calc.volumeOz ? v : min).vessel.name}
                  <div className="text-sm text-purple-700 dark:text-purple-300">
                    {vesselCalculations.reduce((min, v) => v.calc.volumeOz < min.calc.volumeOz ? v : min).calc.volumeOz.toFixed(1)} oz
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 p-4 rounded-xl border-2 border-amber-300 dark:border-amber-700">
                <div className="text-sm text-amber-700 dark:text-amber-300 mb-1">Average Cost</div>
                <div className="text-3xl font-bold text-amber-900 dark:text-amber-100">
                  ${(vesselCalculations.reduce((sum, v) => sum + v.calc.totalCost, 0) / vesselCalculations.length).toFixed(2)}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Profit Calculator */}
        <Card className="border-2 border-green-500/30">
          <CardHeader className="bg-gradient-to-r from-green-600 to-emerald-600 text-white">
            <CardTitle className="flex items-center gap-2">
              💰 Profit Calculator
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div>
                <Label className="text-gray-900 dark:text-gray-100 font-semibold mb-2 block">Select Vessel</Label>
                <select
                  value={profitCalc.selectedVesselIndex}
                  onChange={(e) => handleProfitChange('selectedVesselIndex', e.target.value)}
                  className="w-full p-3 border-2 border-green-300 dark:border-green-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                >
                  {vesselCalculations.map((vesselCalc, idx) => (
                    <option key={vesselCalc.vessel.id} value={idx}>
                      {vesselCalc.vessel.name} (${vesselCalc.calc.totalCost.toFixed(2)})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <Label className="text-gray-900 dark:text-gray-100 font-semibold mb-2 block">Selling Price ($)</Label>
                <Input
                  type="number"
                  step="0.01"
                  value={profitCalc.sellingPrice}
                  onChange={(e) => handleProfitChange('sellingPrice', e.target.value)}
                  className="border-green-300 dark:border-green-700 text-lg text-gray-900 dark:text-white"
                />
              </div>

              <div>
                <Label className="text-gray-900 dark:text-gray-100 font-semibold mb-2 block">Quantity</Label>
                <Input
                  type="number"
                  step="1"
                  value={profitCalc.quantity}
                  onChange={(e) => handleProfitChange('quantity', e.target.value)}
                  className="border-green-300 dark:border-green-700 text-lg text-gray-900 dark:text-white"
                />
              </div>
            </div>

            {/* Results */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-4 rounded-xl border-2 border-blue-300 dark:border-blue-700">
                <div className="text-sm text-blue-700 dark:text-blue-300 mb-1">Cost Per Unit</div>
                <div className="text-2xl font-bold text-blue-900 dark:text-blue-100">
                  ${selectedVesselCalc.totalCost.toFixed(2)}
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-4 rounded-xl border-2 border-green-300 dark:border-green-700">
                <div className="text-sm text-green-700 dark:text-green-300 mb-1">Profit Per Unit</div>
                <div className={`text-2xl font-bold ${getProfitColor(profitPerUnit)}`}>
                  ${profitPerUnit.toFixed(2)}
                  <div className="text-sm">{profitMargin.toFixed(0)}% margin</div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-4 rounded-xl border-2 border-purple-300 dark:border-purple-700">
                <div className="text-sm text-purple-700 dark:text-purple-300 mb-1">Total Profit</div>
                <div className={`text-2xl font-bold ${getProfitColor(totalProfit / profitCalc.quantity)}`}>
                  ${totalProfit.toFixed(2)}
                </div>
              </div>

              <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 p-4 rounded-xl border-2 border-amber-300 dark:border-amber-700">
                <div className="text-sm text-amber-700 dark:text-amber-300 mb-1">Total Revenue</div>
                <div className="text-2xl font-bold text-amber-900 dark:text-amber-100">
                  ${totalRevenue.toFixed(2)}
                </div>
              </div>
            </div>

            <div className="mt-6 text-sm text-gray-600 dark:text-gray-400">
              💡 <strong>Total Cost:</strong> ${totalCost.toFixed(2)} ({profitCalc.quantity} units × ${selectedVesselCalc.totalCost.toFixed(2)})
            </div>
          </CardContent>
        </Card>

        {/* Pricing Recommendations */}
        <Card className="border-2 border-yellow-500/30">
          <CardHeader className="bg-gradient-to-r from-yellow-500 to-amber-500 text-white">
            <CardTitle className="flex items-center gap-2">
              💡 Pricing Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-4 rounded-xl border-2 border-blue-300 dark:border-blue-700">
                <div className="font-bold text-blue-900 dark:text-blue-100 mb-2">🏪 Wholesale Pricing</div>
                <div className="text-sm text-blue-700 dark:text-blue-300 mb-1">Markup: 2.5x - 3.7x</div>
                <div className="text-2xl font-bold text-blue-900 dark:text-white">
                  ${(selectedVesselCalc.totalCost * 2.5).toFixed(2)} - ${(selectedVesselCalc.totalCost * 3.7).toFixed(2)}
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-4 rounded-xl border-2 border-green-300 dark:border-green-700">
                <div className="font-bold text-green-900 dark:text-green-100 mb-2">🛍️ Retail Pricing</div>
                <div className="text-sm text-green-700 dark:text-green-300 mb-1">Markup: 5x - 7x</div>
                <div className="text-2xl font-bold text-green-900 dark:text-white">
                  ${(selectedVesselCalc.totalCost * 5).toFixed(2)} - ${(selectedVesselCalc.totalCost * 7).toFixed(2)}
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-4 rounded-xl border-2 border-purple-300 dark:border-purple-700">
                <div className="font-bold text-purple-900 dark:text-purple-100 mb-2">👑 Premium Pricing</div>
                <div className="text-sm text-purple-700 dark:text-purple-300 mb-1">Markup: 8x - 12x</div>
                <div className="text-2xl font-bold text-purple-900 dark:text-white">
                  ${(selectedVesselCalc.totalCost * 8).toFixed(2)} - ${(selectedVesselCalc.totalCost * 12).toFixed(2)}
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 dark:bg-yellow-900/20 border-2 border-yellow-300 dark:border-yellow-700 rounded-lg p-4 text-sm text-gray-700 dark:text-gray-300">
              <strong>💡 Note:</strong> These recommendations are based on material costs only. Remember to account for:
              labor costs, packaging, marketing, overhead (rent, utilities), and your desired profit margin.
            </div>
          </CardContent>
        </Card>

        {/* Important Notes */}
        <Card className="border-2 border-blue-500/30 bg-white dark:bg-gray-900">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white">
            <CardTitle className="flex items-center gap-2">
              📝 Important Notes
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 bg-white dark:bg-gray-900">
            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
              <li>• <strong>Volume Calculation:</strong> Using cylindrical formula (π × r² × h) with fill percentage of {materialPrices.fillPercent}%</li>
              <li>• <strong>Fragrance Load:</strong> {materialPrices.fragranceLoad}% of wax weight</li>
              <li>• <strong>Wax Density:</strong> {
                materialPrices.waxType === 'soy' ? 'Soy wax = 0.9 g/cm³' :
                materialPrices.waxType === 'paraffin' ? 'Paraffin wax = 0.9 g/cm³' :
                materialPrices.waxType === 'beeswax' ? 'Beeswax = 0.96 g/cm³' :
                materialPrices.waxType === 'coconut' ? 'Coconut wax = 0.92 g/cm³' :
                materialPrices.waxType === 'parasoy' ? 'Parasoy wax = 0.9 g/cm³' :
                'Blend wax = 0.91 g/cm³'
              }</li>
              <li>• <strong>Cement Density:</strong> 2.4 g/cm³ (for concrete/cement vessels)</li>
              <li>• <strong>Wick Count:</strong> 1 wick for vessels ≤4" diameter, 2 wicks for vessels &gt;4" diameter</li>
              <li>• <strong>Unit Conversions:</strong> 1 inch = 2.54 cm, 1 oz = 29.5735 cm³, 1 lb = 453.6 grams</li>
              <li>• <strong>Price Updates:</strong> Remember to update material prices regularly based on your supplier costs</li>
            </ul>
          </CardContent>
        </Card>

        {/* Add Custom Vessel Modal */}
        {showAddVesselModal && (
          <div
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            onClick={() => setShowAddVesselModal(false)}
          >
            <div
              className="bg-white dark:bg-gray-900 rounded-2xl max-w-2xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-6 rounded-t-2xl">
                <h2 className="text-2xl font-bold">➕ Add Custom Vessel</h2>
                <button
                  onClick={() => setShowAddVesselModal(false)}
                  className="absolute top-4 right-4 bg-white text-purple-600 w-10 h-10 rounded-full font-bold text-xl hover:bg-gray-100 transition-all"
                >
                  ×
                </button>
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <Label className="text-gray-900 dark:text-gray-100 font-semibold mb-2 block">Vessel Name</Label>
                  <Input
                    value={newVessel.name}
                    onChange={(e) => setNewVessel({ ...newVessel, name: e.target.value })}
                    placeholder="e.g., Large Square Jar"
                    className="border-purple-300 dark:border-purple-700"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-gray-900 dark:text-gray-100 font-semibold mb-2 block">Diameter</Label>
                    <Input
                      type="number"
                      step="0.01"
                      value={newVessel.diameter || ''}
                      onChange={(e) => setNewVessel({ ...newVessel, diameter: parseFloat(e.target.value) || 0 })}
                      placeholder="0.00"
                      className="border-purple-300 dark:border-purple-700"
                    />
                  </div>

                  <div>
                    <Label className="text-gray-900 dark:text-gray-100 font-semibold mb-2 block">Height</Label>
                    <Input
                      type="number"
                      step="0.01"
                      value={newVessel.height || ''}
                      onChange={(e) => setNewVessel({ ...newVessel, height: parseFloat(e.target.value) || 0 })}
                      placeholder="0.00"
                      className="border-purple-300 dark:border-purple-700"
                    />
                  </div>
                </div>

                <div>
                  <Label className="text-gray-900 dark:text-gray-100 font-semibold mb-2 block">Unit</Label>
                  <select
                    value={newVessel.unit}
                    onChange={(e) => setNewVessel({ ...newVessel, unit: e.target.value as 'cm' | 'in' })}
                    className="w-full p-3 border-2 border-purple-300 dark:border-purple-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  >
                    <option value="cm">Centimeters (cm)</option>
                    <option value="in">Inches (in)</option>
                  </select>
                </div>

                <div className="flex gap-3 mt-6">
                  <button
                    onClick={addCustomVessel}
                    className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-xl font-bold transition-all"
                  >
                    ✅ Add Vessel
                  </button>
                  <button
                    onClick={() => setShowAddVesselModal(false)}
                    className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-3 rounded-xl font-bold transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
    </Tooltip.Provider>
  )
}
