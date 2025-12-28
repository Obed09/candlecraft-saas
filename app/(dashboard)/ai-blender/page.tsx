'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { HelpCircle } from 'lucide-react'
import * as Tooltip from '@radix-ui/react-tooltip'

interface ScentBlend {
  name: string
  percentage: number
}

export default function AIBlenderPage() {
  const [scentBlends, setScentBlends] = useState<ScentBlend[]>([
    { name: 'Lavender', percentage: 40 },
    { name: 'Vanilla', percentage: 30 },
    { name: 'Chamomile', percentage: 30 }
  ])

  const [blendPrediction, setBlendPrediction] = useState({
    profile: '',
    strength: '',
    similar: '',
    bestFor: '',
    popularity: 0,
    warning: ''
  })

  const predictScentBlend = () => {
    const totalPercent = scentBlends.reduce((sum, blend) => sum + blend.percentage, 0)
    
    if (Math.abs(totalPercent - 100) > 0.1) {
      setBlendPrediction({
        profile: '',
        strength: '',
        similar: '',
        bestFor: '',
        popularity: 0,
        warning: `⚠️ Percentages must equal 100% (currently ${totalPercent.toFixed(1)}%)`
      })
      return
    }

    // AI-powered prediction logic
    const scents = scentBlends.map(b => b.name.toLowerCase())
    const hasLavender = scents.some(s => s.includes('lavender'))
    const hasVanilla = scents.some(s => s.includes('vanilla'))
    const hasCitrus = scents.some(s => s.includes('citrus') || s.includes('lemon') || s.includes('orange'))
    const hasChamomile = scents.some(s => s.includes('chamomile'))
    const hasCoffee = scents.some(s => s.includes('coffee'))
    const hasSandalwood = scents.some(s => s.includes('sandalwood') || s.includes('cedar'))
    const hasRose = scents.some(s => s.includes('rose'))
    const hasMint = scents.some(s => s.includes('mint') || s.includes('eucalyptus'))

    let profile = ''
    let strength = 'MEDIUM'
    let similar = ''
    let bestFor = ''
    let popularity = 7.5
    let warning = ''

    // Determine blend profile
    if (hasLavender && hasVanilla && hasChamomile) {
      profile = 'CALMING, SWEET, HERBAL'
      similar = 'Bath & Body Works "Stress Relief"'
      bestFor = 'Bedroom, Spa, Relaxation'
      popularity = 8.7
    } else if (hasCitrus && hasVanilla) {
      profile = 'FRESH, SWEET, UPLIFTING'
      similar = 'Yankee Candle "Vanilla Lime"'
      bestFor = 'Kitchen, Living Room, Morning'
      popularity = 8.2
      warning = '⚠️ Warning: Citrus + Vanilla may separate - test thoroughly'
    } else if (hasCoffee && hasVanilla) {
      profile = 'GOURMAND, COZY, ENERGIZING'
      similar = 'Starbucks Cafe Scent'
      bestFor = 'Kitchen, Office, Morning'
      popularity = 9.1
    } else if (hasSandalwood && hasVanilla) {
      profile = 'WARM, WOODSY, LUXURIOUS'
      similar = 'Tom Ford "Santal Blush"'
      bestFor = 'Bedroom, Office, Evening'
      popularity = 8.9
    } else if (hasLavender && hasMint) {
      profile = 'FRESH, HERBAL, INVIGORATING'
      similar = 'Spa Collection Aromatherapy'
      bestFor = 'Bathroom, Spa, Wellness'
      popularity = 7.8
    } else if (hasRose && hasVanilla) {
      profile = 'FLORAL, ROMANTIC, ELEGANT'
      similar = 'Designer Perfume Inspired'
      bestFor = 'Bedroom, Bathroom, Special Occasions'
      popularity = 8.5
    } else if (hasCitrus) {
      profile = 'BRIGHT, ENERGIZING, CLEAN'
      similar = 'Summer Refresh Collection'
      bestFor = 'Kitchen, Bathroom, Daytime'
      popularity = 8.0
    } else if (hasVanilla) {
      profile = 'WARM, COMFORTING, SWEET'
      similar = 'Classic Bakery Vanilla'
      bestFor = 'Living Room, Bedroom, All Seasons'
      popularity = 9.0
    } else {
      profile = 'UNIQUE CUSTOM BLEND'
      similar = 'Custom Artisan Creation'
      bestFor = 'Experimental, Niche Market'
      popularity = 7.0
    }

    // Determine strength based on percentages
    const dominantScent = scentBlends.reduce((max, blend) => 
      blend.percentage > max.percentage ? blend : max, scentBlends[0]
    )
    
    if (dominantScent.percentage >= 60) {
      strength = 'STRONG'
    } else if (dominantScent.percentage <= 25) {
      strength = 'LIGHT'
    }

    setBlendPrediction({
      profile,
      strength,
      similar,
      bestFor,
      popularity,
      warning
    })
  }

  const totalPercentage = scentBlends.reduce((sum, b) => sum + b.percentage, 0)

  return (
    <Tooltip.Provider delayDuration={200}>
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent flex items-center gap-2">
          🌸 AI Scent Blending Simulator
          <Tooltip.Root>
            <Tooltip.Trigger asChild>
              <HelpCircle className="w-6 h-6 text-pink-500 hover:text-pink-600 cursor-help" />
            </Tooltip.Trigger>
            <Tooltip.Portal>
              <Tooltip.Content 
                side="right" 
                className="bg-white text-gray-900 px-4 py-3 rounded-lg shadow-xl text-sm max-w-xs z-[9999]"
                sideOffset={5}
              >
                Create custom scent blends with AI-powered predictions. Get scent profile analysis, compatibility checks, popularity scores, and recommendations for similar commercial fragrances.
                <Tooltip.Arrow className="fill-white" />
              </Tooltip.Content>
            </Tooltip.Portal>
          </Tooltip.Root>
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          AI predictions • Scent profiles • Compatibility check • Popularity scoring
        </p>
      </div>

      {/* Scent Blend Inputs */}
      <Card className="mb-6 border-2 border-pink-200 dark:border-pink-800">
        <CardHeader>
          <CardTitle className="text-pink-900 dark:text-pink-100">🧪 Your Blend Formula</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {scentBlends.map((blend, index) => (
              <div key={index} className="flex gap-4 items-center">
                <Input
                  placeholder="Scent name (e.g., Lavender)"
                  value={blend.name}
                  onChange={(e) => {
                    const newBlends = [...scentBlends]
                    newBlends[index].name = e.target.value
                    setScentBlends(newBlends)
                  }}
                  className="flex-1"
                />
                <div className="w-32">
                  <Input
                    type="number"
                    min="0"
                    max="100"
                    step="0.1"
                    value={blend.percentage}
                    onChange={(e) => {
                      const newBlends = [...scentBlends]
                      newBlends[index].percentage = parseFloat(e.target.value) || 0
                      setScentBlends(newBlends)
                    }}
                    className="text-center"
                  />
                </div>
                <span className="text-gray-600 dark:text-gray-400 font-bold">%</span>
                {scentBlends.length > 1 && (
                  <button
                    onClick={() => setScentBlends(scentBlends.filter((_, i) => i !== index))}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg font-bold transition-all"
                  >
                    🗑️
                  </button>
                )}
              </div>
            ))}

            <div className="flex gap-3">
              <button
                onClick={() => setScentBlends([...scentBlends, { name: '', percentage: 0 }])}
                className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-lg font-semibold transition-all"
              >
                ➕ Add Scent
              </button>
              <button
                onClick={predictScentBlend}
                className="flex-1 bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 text-white px-6 py-3 rounded-xl font-bold transition-all"
              >
                🔮 Predict Blend
              </button>
            </div>

            <div className="text-center text-sm">
              <span className="text-gray-600 dark:text-gray-400">Total: </span>
              <span className={`font-bold text-lg ${
                Math.abs(totalPercentage - 100) < 0.1 
                  ? 'text-green-600 dark:text-green-400' 
                  : 'text-red-600 dark:text-red-400'
              }`}>
                {totalPercentage.toFixed(1)}%
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* AI Prediction Results */}
      {blendPrediction.profile && (
        <Card className="border-2 border-purple-300 dark:border-purple-700">
          <CardHeader className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
            <CardTitle className="text-purple-900 dark:text-purple-100">🔮 AI Prediction Results</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-gray-800 p-5 rounded-xl">
                <div className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">🌺 Scent Profile</div>
                <div className="text-xl font-bold text-purple-700 dark:text-purple-300">{blendPrediction.profile}</div>
              </div>

              <div className="bg-white dark:bg-gray-800 p-5 rounded-xl">
                <div className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">💪 Scent Strength</div>
                <div className="text-xl font-bold text-orange-600 dark:text-orange-400">{blendPrediction.strength}</div>
              </div>

              <div className="bg-white dark:bg-gray-800 p-5 rounded-xl">
                <div className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">🏷️ Similar To</div>
                <div className="text-lg font-bold text-blue-700 dark:text-blue-300">{blendPrediction.similar}</div>
              </div>

              <div className="bg-white dark:bg-gray-800 p-5 rounded-xl">
                <div className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">🏠 Best For</div>
                <div className="text-lg font-bold text-green-700 dark:text-green-300">{blendPrediction.bestFor}</div>
              </div>

              <div className="bg-gradient-to-br from-yellow-100 to-amber-100 dark:from-yellow-900/40 dark:to-amber-900/40 p-5 rounded-xl border-2 border-yellow-400 dark:border-yellow-600 md:col-span-2">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-semibold text-yellow-900 dark:text-yellow-100 mb-2">⭐ Predicted Popularity</div>
                    <div className="text-4xl font-bold text-yellow-700 dark:text-yellow-300">{blendPrediction.popularity}/10</div>
                  </div>
                  <div className="flex gap-1">
                    {[...Array(10)].map((_, i) => (
                      <div key={i} className={`w-4 h-4 rounded-full ${i < blendPrediction.popularity ? 'bg-yellow-500' : 'bg-gray-300 dark:bg-gray-600'}`}></div>
                    ))}
                  </div>
                </div>
              </div>

              {blendPrediction.warning && (
                <div className="bg-red-100 dark:bg-red-900/40 p-5 rounded-xl border-2 border-red-400 dark:border-red-600 md:col-span-2">
                  <div className="text-sm font-bold text-red-900 dark:text-red-100 mb-2">⚠️ Compatibility Warning</div>
                  <div className="text-sm text-red-800 dark:text-red-200">{blendPrediction.warning}</div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Scent Inspiration */}
      <Card className="mt-6 border-2 border-pink-200 dark:border-pink-800">
        <CardHeader className="bg-gradient-to-r from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20">
          <CardTitle className="text-pink-900 dark:text-pink-100">💡 Scent Blend Inspiration</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-xl border-2 border-purple-200 dark:border-purple-700">
              <h4 className="font-bold text-purple-900 dark:text-purple-100 mb-2">🌙 Relaxation Blend</h4>
              <p className="text-sm text-purple-700 dark:text-purple-300 mb-2">Lavender 40% + Chamomile 30% + Vanilla 30%</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">Perfect for bedtime & meditation</p>
            </div>

            <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-xl border-2 border-yellow-200 dark:border-yellow-700">
              <h4 className="font-bold text-yellow-900 dark:text-yellow-100 mb-2">☕ Cozy Morning</h4>
              <p className="text-sm text-yellow-700 dark:text-yellow-300 mb-2">Coffee 50% + Vanilla 30% + Cinnamon 20%</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">Energizing breakfast ambiance</p>
            </div>

            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-xl border-2 border-green-200 dark:border-green-700">
              <h4 className="font-bold text-green-900 dark:text-green-100 mb-2">🌿 Fresh Spa</h4>
              <p className="text-sm text-green-700 dark:text-green-300 mb-2">Eucalyptus 45% + Mint 30% + Lavender 25%</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">Invigorating & refreshing</p>
            </div>

            <div className="bg-rose-50 dark:bg-rose-900/20 p-4 rounded-xl border-2 border-rose-200 dark:border-rose-700">
              <h4 className="font-bold text-rose-900 dark:text-rose-100 mb-2">💕 Romantic Evening</h4>
              <p className="text-sm text-rose-700 dark:text-rose-300 mb-2">Rose 40% + Vanilla 35% + Sandalwood 25%</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">Elegant & sophisticated</p>
            </div>

            <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-xl border-2 border-orange-200 dark:border-orange-700">
              <h4 className="font-bold text-orange-900 dark:text-orange-100 mb-2">🍊 Citrus Burst</h4>
              <p className="text-sm text-orange-700 dark:text-orange-300 mb-2">Orange 50% + Lemon 30% + Grapefruit 20%</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">Bright & uplifting</p>
            </div>

            <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-xl border-2 border-amber-200 dark:border-amber-700">
              <h4 className="font-bold text-amber-900 dark:text-amber-100 mb-2">🍂 Autumn Spice</h4>
              <p className="text-sm text-amber-700 dark:text-amber-300 mb-2">Cinnamon 40% + Apple 35% + Clove 25%</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">Seasonal & cozy</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
    </Tooltip.Provider>
  )
}
