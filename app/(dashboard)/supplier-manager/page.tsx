'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import * as Tooltip from '@radix-ui/react-tooltip'
import { HelpCircle } from 'lucide-react'

interface Supplier {
  id: string
  name: string
  contact: string
  email: string
  phone: string
  website: string
  category?: string
  paymentTerms?: string
  materials: string[]
  waxPrice: number
  fragrancePrice: number
  wickPrice: number
  rating: number
  notes: string
  lastOrderDate: string
  waxType?: string
  wickType?: string
  fragranceOilBrand?: string
  shippingCost?: number
}

export default function SupplierManagerPage() {
  const [suppliers, setSuppliers] = useState<Supplier[]>([
    {
      id: '1',
      name: 'CandleScience',
      contact: 'Sales Team',
      email: 'orders@candlescience.com',
      phone: '(866) 652-2635',
      website: 'www.candlescience.com',
      materials: ['Soy Wax', 'Coconut Wax', 'Fragrance Oils', 'Wicks', 'Containers'],
      waxPrice: 3.50,
      fragrancePrice: 18.00,
      wickPrice: 0.40,
      rating: 5,
      notes: 'Fast shipping, excellent quality. Free shipping over $100.',
      lastOrderDate: '2025-11-15'
    },
    {
      id: '2',
      name: 'Lone Star Candle Supply',
      contact: 'Customer Service',
      email: 'info@lonestarcandlesupply.com',
      phone: '(214) 800-2655',
      website: 'www.lonestarcandlesupply.com',
      materials: ['Soy Wax', 'Fragrance Oils', 'Wicks', 'Dyes'],
      waxPrice: 3.25,
      fragrancePrice: 16.50,
      wickPrice: 0.35,
      rating: 4,
      notes: 'Best prices, bulk discounts. Slower shipping.',
      lastOrderDate: '2025-10-20'
    },
    {
      id: '3',
      name: 'Bramble Berry',
      contact: 'Orders Department',
      email: 'support@brambleberry.com',
      phone: '(877) 627-7883',
      website: 'www.brambleberry.com',
      materials: ['Coconut Wax', 'Essential Oils', 'Containers', 'Labels'],
      waxPrice: 4.00,
      fragrancePrice: 20.00,
      wickPrice: 0.50,
      rating: 5,
      notes: 'Premium quality, great for luxury candles. Higher prices.',
      lastOrderDate: '2025-12-01'
    }
  ])

  const [inventory] = useState({
    waxLbs: 50,
    fragranceOilLbs: 10,
    wicks: 500
  })

  const [showAddSupplierModal, setShowAddSupplierModal] = useState(false)
  const [showMaterialDetails, setShowMaterialDetails] = useState(false)
  const [newSupplier, setNewSupplier] = useState<Partial<Supplier>>({
    name: '',
    contact: '',
    email: '',
    phone: '',
    website: '',
    category: 'Full-Service Wholesaler',
    paymentTerms: 'Net 30',
    materials: [],
    waxPrice: 0,
    fragrancePrice: 0,
    wickPrice: 0,
    rating: 4,
    notes: '',
    lastOrderDate: new Date().toISOString().split('T')[0],
    waxType: '',
    wickType: '',
    fragranceOilBrand: '',
    shippingCost: 0
  })

  const getCheapestSupplier = (material: 'wax' | 'fragrance' | 'wick') => {
    const priceKey = material === 'wax' ? 'waxPrice' : material === 'fragrance' ? 'fragrancePrice' : 'wickPrice'
    const validSuppliers = suppliers.filter(s => s[priceKey] > 0)
    if (validSuppliers.length === 0) return null
    return validSuppliers.reduce((min, s) => s[priceKey] < min[priceKey] ? s : min)
  }

  const calculatePotentialSavings = () => {
    const cheapestWax = getCheapestSupplier('wax')
    const cheapestFragrance = getCheapestSupplier('fragrance')
    const cheapestWick = getCheapestSupplier('wick')

    const currentWaxPrice = 8.50
    const currentFragrancePrice = 40.00
    const currentWickPrice = 0.25

    let savings = 0
    if (cheapestWax && cheapestWax.waxPrice < currentWaxPrice) {
      savings += (currentWaxPrice - cheapestWax.waxPrice) * inventory.waxLbs
    }
    if (cheapestFragrance && cheapestFragrance.fragrancePrice < currentFragrancePrice) {
      savings += (currentFragrancePrice - cheapestFragrance.fragrancePrice) * inventory.fragranceOilLbs
    }
    if (cheapestWick && cheapestWick.wickPrice < currentWickPrice) {
      savings += (currentWickPrice - cheapestWick.wickPrice) * inventory.wicks
    }

    return savings
  }

  const getReorderRecommendations = () => {
    const recommendations = []
    
    if (inventory.waxLbs < 20) {
      const supplier = getCheapestSupplier('wax')
      recommendations.push({
        material: 'Wax',
        currentStock: inventory.waxLbs,
        reorderAmount: 50,
        supplier: supplier?.name || 'Best available',
        estimatedCost: (supplier?.waxPrice || 8.50) * 50
      })
    }

    if (inventory.fragranceOilLbs < 5) {
      const supplier = getCheapestSupplier('fragrance')
      recommendations.push({
        material: 'Fragrance Oil',
        currentStock: inventory.fragranceOilLbs,
        reorderAmount: 10,
        supplier: supplier?.name || 'Best available',
        estimatedCost: (supplier?.fragrancePrice || 40.00) * 10
      })
    }

    if (inventory.wicks < 50) {
      const supplier = getCheapestSupplier('wick')
      recommendations.push({
        material: 'Wicks',
        currentStock: inventory.wicks,
        reorderAmount: 100,
        supplier: supplier?.name || 'Best available',
        estimatedCost: (supplier?.wickPrice || 0.25) * 100
      })
    }

    return recommendations
  }

  const updateSupplierRating = (id: string, rating: number) => {
    setSuppliers(suppliers.map(s => s.id === id ? { ...s, rating } : s))
  }

  const deleteSupplier = (id: string) => {
    if (confirm('Are you sure you want to delete this supplier?')) {
      setSuppliers(suppliers.filter(s => s.id !== id))
    }
  }

  const addSupplier = () => {
    if (!newSupplier.name || !newSupplier.email) {
      alert('Please enter supplier name and email')
      return
    }

    const supplier: Supplier = {
      id: Date.now().toString(),
      name: newSupplier.name || '',
      contact: newSupplier.contact || '',
      email: newSupplier.email || '',
      phone: newSupplier.phone || '',
      website: newSupplier.website || '',
      materials: newSupplier.materials || [],
      waxPrice: newSupplier.waxPrice || 0,
      fragrancePrice: newSupplier.fragrancePrice || 0,
      wickPrice: newSupplier.wickPrice || 0,
      rating: newSupplier.rating || 3,
      notes: newSupplier.notes || '',
      lastOrderDate: newSupplier.lastOrderDate || new Date().toISOString().split('T')[0]
    }

    setSuppliers([...suppliers, supplier])
    setShowAddSupplierModal(false)
    setNewSupplier({
      name: '',
      contact: '',
      email: '',
      phone: '',
      website: '',
      materials: [],
      waxPrice: 0,
      fragrancePrice: 0,
      wickPrice: 0,
      rating: 3,
      notes: '',
      lastOrderDate: new Date().toISOString().split('T')[0]
    })
  }

  return (
    <Tooltip.Provider delayDuration={200}>
      <div className="p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent flex items-center gap-2">
              🏪 Supplier Manager
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
                    Manage supplier contacts, compare pricing across vendors, and track purchase orders. Monitor supplier ratings and get alerts when it's time to reorder materials.
                    <Tooltip.Arrow className="fill-white" />
                  </Tooltip.Content>
                </Tooltip.Portal>
              </Tooltip.Root>
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Track vendors • Compare prices • Get reorder alerts • Manage contacts
            </p>
          </div>
        <button
          onClick={() => setShowAddSupplierModal(true)}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-bold transition-all"
        >
          ➕ Add Supplier
        </button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 p-4 rounded-xl border-2 border-blue-300 dark:border-blue-700">
          <div className="text-blue-900 dark:text-blue-100 text-sm font-semibold mb-1">👥 Total Suppliers</div>
          <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">{suppliers.length}</div>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20 p-4 rounded-xl border-2 border-green-300 dark:border-green-700">
          <div className="text-green-900 dark:text-green-100 text-sm font-semibold mb-1">💰 Potential Savings</div>
          <div className="text-3xl font-bold text-green-600 dark:text-green-400">${calculatePotentialSavings().toFixed(2)}</div>
          <div className="text-xs text-green-700 dark:text-green-300 mt-1">By switching to cheapest suppliers</div>
        </div>

        <div className="bg-gradient-to-br from-amber-50 to-yellow-100 dark:from-amber-900/20 dark:to-yellow-900/20 p-4 rounded-xl border-2 border-amber-300 dark:border-amber-700">
          <div className="text-amber-900 dark:text-amber-100 text-sm font-semibold mb-1">🔔 Reorder Alerts</div>
          <div className="text-3xl font-bold text-amber-600 dark:text-amber-400">{getReorderRecommendations().length}</div>
          <div className="text-xs text-amber-700 dark:text-amber-300 mt-1">Low stock materials</div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20 p-4 rounded-xl border-2 border-purple-300 dark:border-purple-700">
          <div className="text-purple-900 dark:text-purple-100 text-sm font-semibold mb-1">⭐ Avg Rating</div>
          <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
            {suppliers.length > 0 ? (suppliers.reduce((sum, s) => sum + s.rating, 0) / suppliers.length).toFixed(1) : '0.0'}
          </div>
          <div className="text-xs text-purple-700 dark:text-purple-300 mt-1">Supplier quality score</div>
        </div>
      </div>

      {/* Price Comparison Table */}
      <Card className="mb-6 border-2 border-orange-200 dark:border-orange-800">
        <CardHeader>
          <CardTitle className="text-orange-900 dark:text-orange-100">💵 Price Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-orange-200 dark:border-orange-800">
                  <th className="text-left py-3 px-4 text-orange-900 dark:text-orange-100 font-bold">Supplier</th>
                  <th className="text-right py-3 px-4 text-orange-900 dark:text-orange-100 font-bold">Wax (per lb)</th>
                  <th className="text-right py-3 px-4 text-orange-900 dark:text-orange-100 font-bold">Fragrance (per lb)</th>
                  <th className="text-right py-3 px-4 text-orange-900 dark:text-orange-100 font-bold">Wick (each)</th>
                  <th className="text-center py-3 px-4 text-orange-900 dark:text-orange-100 font-bold">Rating</th>
                </tr>
              </thead>
              <tbody>
                {suppliers.map(supplier => {
                  const cheapestWax = getCheapestSupplier('wax')
                  const cheapestFragrance = getCheapestSupplier('fragrance')
                  const cheapestWick = getCheapestSupplier('wick')
                  
                  return (
                    <tr key={supplier.id} className="border-b border-orange-100 dark:border-orange-900 hover:bg-orange-50 dark:hover:bg-orange-950/30">
                      <td className="py-3 px-4">
                        <div className="font-bold text-gray-900 dark:text-gray-100">{supplier.name}</div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">{supplier.contact}</div>
                      </td>
                      <td className="text-right py-3 px-4">
                        <span className={`font-bold ${supplier.id === cheapestWax?.id ? 'text-green-600 dark:text-green-400' : 'text-gray-900 dark:text-gray-100'}`}>
                          ${supplier.waxPrice.toFixed(2)}
                          {supplier.id === cheapestWax?.id && ' 🏆'}
                        </span>
                      </td>
                      <td className="text-right py-3 px-4">
                        <span className={`font-bold ${supplier.id === cheapestFragrance?.id ? 'text-green-600 dark:text-green-400' : 'text-gray-900 dark:text-gray-100'}`}>
                          ${supplier.fragrancePrice.toFixed(2)}
                          {supplier.id === cheapestFragrance?.id && ' 🏆'}
                        </span>
                      </td>
                      <td className="text-right py-3 px-4">
                        <span className={`font-bold ${supplier.id === cheapestWick?.id ? 'text-green-600 dark:text-green-400' : 'text-gray-900 dark:text-gray-100'}`}>
                          ${supplier.wickPrice.toFixed(2)}
                          {supplier.id === cheapestWick?.id && ' 🏆'}
                        </span>
                      </td>
                      <td className="text-center py-3 px-4">
                        <div className="flex justify-center gap-1">
                          {[1, 2, 3, 4, 5].map(star => (
                            <button
                              key={star}
                              onClick={() => updateSupplierRating(supplier.id, star)}
                              className="text-xl hover:scale-125 transition-transform"
                            >
                              {star <= supplier.rating ? '⭐' : '☆'}
                            </button>
                          ))}
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Reorder Recommendations */}
      {getReorderRecommendations().length > 0 && (
        <Card className="mb-6 bg-gradient-to-br from-red-50 to-orange-100 dark:from-red-900/20 dark:to-orange-900/20 border-2 border-red-300 dark:border-red-700">
          <CardHeader>
            <CardTitle className="text-red-900 dark:text-red-100 flex items-center gap-2">
              🔔 Reorder Alerts
              <span className="bg-red-600 text-white text-sm px-3 py-1 rounded-full">{getReorderRecommendations().length}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {getReorderRecommendations().map((rec, idx) => (
                <div key={idx} className="bg-white dark:bg-gray-800 p-4 rounded-lg border-2 border-red-200 dark:border-red-800">
                  <div className="flex justify-between items-start flex-wrap gap-3">
                    <div>
                      <div className="font-bold text-red-900 dark:text-red-100 text-lg">{rec.material}</div>
                      <div className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                        Current: <span className="font-bold text-red-600 dark:text-red-400">{rec.currentStock} units</span>
                      </div>
                      <div className="text-sm text-gray-700 dark:text-gray-300">
                        Recommended Order: <span className="font-bold text-green-600 dark:text-green-400">{rec.reorderAmount} units</span>
                      </div>
                      <div className="text-sm text-gray-700 dark:text-gray-300">
                        Best Supplier: <span className="font-bold text-blue-600 dark:text-blue-400">{rec.supplier}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                        ${rec.estimatedCost.toFixed(2)}
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">Estimated cost</div>
                    </div>
                  </div>
                </div>
              ))}
              <div className="mt-4 p-4 bg-gradient-to-r from-orange-100 to-amber-100 dark:from-orange-900/40 dark:to-amber-900/40 rounded-lg border-2 border-orange-300 dark:border-orange-700">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-orange-900 dark:text-orange-100">Total Reorder Cost:</span>
                  <span className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                    ${getReorderRecommendations().reduce((sum, rec) => sum + rec.estimatedCost, 0).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Supplier Directory */}
      <Card className="border-2 border-orange-200 dark:border-orange-800">
        <CardHeader>
          <CardTitle className="text-orange-900 dark:text-orange-100">📇 Complete Supplier Directory</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {suppliers.map(supplier => (
              <div key={supplier.id} className="bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 p-6 rounded-xl border-2 border-orange-200 dark:border-orange-800">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="text-2xl font-bold text-orange-900 dark:text-orange-100">{supplier.name}</h4>
                    <div className="flex gap-1 mt-2">
                      {[1, 2, 3, 4, 5].map(star => (
                        <button
                          key={star}
                          onClick={() => updateSupplierRating(supplier.id, star)}
                          className="text-2xl hover:scale-125 transition-transform"
                        >
                          {star <= supplier.rating ? '⭐' : '☆'}
                        </button>
                      ))}
                    </div>
                  </div>
                  <button
                    onClick={() => deleteSupplier(supplier.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-bold transition-all"
                  >
                    🗑️ Delete
                  </button>
                </div>

                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <div className="text-sm font-bold text-orange-800 dark:text-orange-200 mb-2">📞 Contact Information</div>
                    <div className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
                      <div><span className="font-semibold">Contact:</span> {supplier.contact}</div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">Email:</span> 
                        <a href={`mailto:${supplier.email}`} className="text-blue-600 dark:text-blue-400 hover:underline">
                          {supplier.email}
                        </a>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">Phone:</span>
                        <a href={`tel:${supplier.phone}`} className="text-blue-600 dark:text-blue-400 hover:underline">
                          {supplier.phone}
                        </a>
                      </div>
                      {supplier.website && (
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">Website:</span>
                          <a href={`https://${supplier.website}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">
                            {supplier.website}
                          </a>
                        </div>
                      )}
                      <div><span className="font-semibold">Last Order:</span> {new Date(supplier.lastOrderDate).toLocaleDateString()}</div>
                    </div>
                  </div>

                  <div>
                    <div className="text-sm font-bold text-orange-800 dark:text-orange-200 mb-2">📦 Materials & Pricing</div>
                    <div className="space-y-2">
                      <div className="bg-white dark:bg-gray-700 p-3 rounded-lg">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Wax:</span>
                          <span className="text-lg font-bold text-amber-600 dark:text-amber-400">${supplier.waxPrice}/lb</span>
                        </div>
                      </div>
                      <div className="bg-white dark:bg-gray-700 p-3 rounded-lg">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Fragrance:</span>
                          <span className="text-lg font-bold text-purple-600 dark:text-purple-400">${supplier.fragrancePrice}/lb</span>
                        </div>
                      </div>
                      <div className="bg-white dark:bg-gray-700 p-3 rounded-lg">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Wick:</span>
                          <span className="text-lg font-bold text-blue-600 dark:text-blue-400">${supplier.wickPrice} each</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="text-sm font-bold text-orange-800 dark:text-orange-200 mb-2">🏷️ Supplies</div>
                  <div className="flex flex-wrap gap-2">
                    {supplier.materials.map((material, idx) => (
                      <span key={idx} className="bg-orange-200 dark:bg-orange-800 text-orange-900 dark:text-orange-100 px-3 py-1 rounded-full text-sm font-semibold">
                        {material}
                      </span>
                    ))}
                  </div>
                </div>

                {supplier.notes && (
                  <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg border-2 border-yellow-300 dark:border-yellow-700 mb-4">
                    <div className="text-sm font-bold text-yellow-900 dark:text-yellow-100 mb-1">📝 Notes</div>
                    <div className="text-sm text-yellow-800 dark:text-yellow-200">{supplier.notes}</div>
                  </div>
                )}

                <div className="flex gap-3">
                  <a
                    href={`mailto:${supplier.email}`}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg font-bold text-center transition-all"
                  >
                    📧 Send Email
                  </a>
                  <a
                    href={`tel:${supplier.phone}`}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg font-bold text-center transition-all"
                  >
                    📞 Call Now
                  </a>
                  {supplier.website && (
                    <a
                      href={`https://${supplier.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-purple-600 hover:bg-purple-700 text-white px-4 py-3 rounded-lg font-bold text-center transition-all"
                    >
                      🌐 Visit Site
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Add Supplier Modal */}
      {showAddSupplierModal && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" onClick={() => setShowAddSupplierModal(false)}>
          <div className="bg-white dark:bg-gray-900 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-2xl font-bold text-orange-900 dark:text-orange-100 mb-4">Add New Supplier</h2>
            
            <div className="space-y-4">
              {/* Contact Information */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Supplier Name</Label>
                  <Input value={newSupplier.name} onChange={(e) => setNewSupplier({...newSupplier, name: e.target.value})} />
                </div>
                <div>
                  <Label>Contact Person</Label>
                  <Input value={newSupplier.contact} onChange={(e) => setNewSupplier({...newSupplier, contact: e.target.value})} />
                </div>
                <div>
                  <Label>Email</Label>
                  <Input type="email" value={newSupplier.email} onChange={(e) => setNewSupplier({...newSupplier, email: e.target.value})} />
                </div>
                <div>
                  <Label>Phone</Label>
                  <Input value={newSupplier.phone} onChange={(e) => setNewSupplier({...newSupplier, phone: e.target.value})} />
                </div>
                <div>
                  <Label>Website/URL</Label>
                  <Input value={newSupplier.website} onChange={(e) => setNewSupplier({...newSupplier, website: e.target.value})} placeholder="www.example.com" />
                </div>
                <div>
                  <Label>Supplier Category</Label>
                  <select 
                    value={newSupplier.category} 
                    onChange={(e) => setNewSupplier({...newSupplier, category: e.target.value})}
                    className="w-full px-3 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
                  >
                    <option value="Wax Supplier">Wax Supplier</option>
                    <option value="Fragrance Supplier">Fragrance Supplier</option>
                    <option value="Wick Supplier">Wick Supplier</option>
                    <option value="Container Supplier">Container Supplier</option>
                    <option value="Full-Service Wholesaler">Full-Service Wholesaler</option>
                  </select>
                </div>
                <div>
                  <Label>Payment Terms</Label>
                  <select 
                    value={newSupplier.paymentTerms} 
                    onChange={(e) => setNewSupplier({...newSupplier, paymentTerms: e.target.value})}
                    className="w-full px-3 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
                  >
                    <option value="Net 30">Net 30</option>
                    <option value="Credit Card">Credit Card</option>
                    <option value="Prepay">Prepay</option>
                  </select>
                </div>
                <div>
                  <Label>Quality Rating</Label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map(star => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setNewSupplier({...newSupplier, rating: star})}
                        className="text-2xl"
                      >
                        {star <= (newSupplier.rating || 0) ? '★' : '☆'}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Notes Field */}
              <div>
                <Label>Notes</Label>
                <textarea
                  value={newSupplier.notes}
                  onChange={(e) => setNewSupplier({...newSupplier, notes: e.target.value})}
                  className="w-full px-3 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
                  rows={2}
                  placeholder="Quality notes, shipping info, etc..."
                />
              </div>

              {/* Material Prices - Basic */}
              <div className="border-t pt-4 mt-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100">Material Prices (per lb or per unit)</h3>
                  <button
                    type="button"
                    onClick={() => setShowMaterialDetails(!showMaterialDetails)}
                    className="text-sm text-purple-600 dark:text-purple-400 font-semibold hover:underline"
                  >
                    {showMaterialDetails ? '− Hide Details' : '+ Add Material Details'}
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Wax Price (per lb)</Label>
                    <Input type="number" step="0.01" value={newSupplier.waxPrice} onChange={(e) => setNewSupplier({...newSupplier, waxPrice: parseFloat(e.target.value) || 0})} placeholder="0.00" />
                  </div>
                  <div>
                    <Label>Fragrance Price (per lb)</Label>
                    <Input type="number" step="0.01" value={newSupplier.fragrancePrice} onChange={(e) => setNewSupplier({...newSupplier, fragrancePrice: parseFloat(e.target.value) || 0})} placeholder="0.00" />
                  </div>
                  <div>
                    <Label>Wick Price (per unit)</Label>
                    <Input type="number" step="0.01" value={newSupplier.wickPrice} onChange={(e) => setNewSupplier({...newSupplier, wickPrice: parseFloat(e.target.value) || 0})} placeholder="0.00" />
                  </div>
                  <div>
                    <Label>Container Price (per unit)</Label>
                    <Input type="number" step="0.01" placeholder="0.00" />
                  </div>
                  <div>
                    <Label>Label Price (per unit)</Label>
                    <Input type="number" step="0.01" placeholder="0.00" />
                  </div>
                  <div>
                    <Label>Dye Price (per lb)</Label>
                    <Input type="number" step="0.01" placeholder="0.00" />
                  </div>
                  <div>
                    <Label>Essential Oil Price (per lb)</Label>
                    <Input type="number" step="0.01" placeholder="0.00" />
                  </div>
                  <div>
                    <Label>Packaging Price (per unit)</Label>
                    <Input type="number" step="0.01" placeholder="0.00" />
                  </div>
                </div>
              </div>

              {/* Material Details - Expanded Section */}
              {showMaterialDetails && (
                <div className="border-t pt-4 mt-4 bg-purple-50 dark:bg-purple-900/10 p-4 rounded-lg">
                  <h3 className="font-bold text-lg mb-3 text-purple-900 dark:text-purple-100">📦 Detailed Material Specifications</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Wax Type</Label>
                      <select 
                        value={newSupplier.waxType} 
                        onChange={(e) => setNewSupplier({...newSupplier, waxType: e.target.value})}
                        className="w-full px-3 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
                      >
                        <option value="">Select wax type...</option>
                        <option value="Soy 464">Soy 464</option>
                        <option value="Soy 415">Soy 415</option>
                        <option value="Paraffin">Paraffin</option>
                        <option value="Coconut Wax">Coconut Wax</option>
                        <option value="Beeswax">Beeswax</option>
                        <option value="Palm Wax">Palm Wax</option>
                        <option value="Blended Wax">Blended Wax</option>
                      </select>
                    </div>
                    <div>
                      <Label>Wick Type/Size</Label>
                      <select 
                        value={newSupplier.wickType} 
                        onChange={(e) => setNewSupplier({...newSupplier, wickType: e.target.value})}
                        className="w-full px-3 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
                      >
                        <option value="">Select wick type...</option>
                        <option value="ECO 4">ECO 4</option>
                        <option value="ECO 6">ECO 6</option>
                        <option value="ECO 8">ECO 8</option>
                        <option value="ECO 10">ECO 10</option>
                        <option value="CD 10">CD 10</option>
                        <option value="CD 12">CD 12</option>
                        <option value="CD 14">CD 14</option>
                        <option value="LX 16">LX 16</option>
                        <option value="LX 18">LX 18</option>
                        <option value="Wood Wick">Wood Wick</option>
                      </select>
                    </div>
                    <div>
                      <Label>Fragrance Oil Brand</Label>
                      <Input 
                        value={newSupplier.fragranceOilBrand} 
                        onChange={(e) => setNewSupplier({...newSupplier, fragranceOilBrand: e.target.value})} 
                        placeholder="e.g., CandleScience, Aztec"
                      />
                    </div>
                    <div>
                      <Label>Shipping Cost Estimate</Label>
                      <Input 
                        type="number" 
                        step="0.01" 
                        value={newSupplier.shippingCost} 
                        onChange={(e) => setNewSupplier({...newSupplier, shippingCost: parseFloat(e.target.value) || 0})} 
                        placeholder="0.00" 
                      />
                    </div>
                    <div>
                      <Label>Last Ordered Date</Label>
                      <Input 
                        type="date" 
                        value={newSupplier.lastOrderDate} 
                        onChange={(e) => setNewSupplier({...newSupplier, lastOrderDate: e.target.value})} 
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="flex gap-3 mt-6">
              <button onClick={addSupplier} className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-bold">
                Add Supplier
              </button>
              <button onClick={() => setShowAddSupplierModal(false)} className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-3 rounded-xl font-bold">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    </Tooltip.Provider>
  )
}
