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
}

interface VesselCalculation {
  totalCost: number
}

interface ProductionOrder {
  id: string
  customerName: string
  recipeName: string
  quantity: number
  vesselIndex: number
  dueDate: string
  status: 'pending' | 'in-progress' | 'completed'
  priority: 'low' | 'medium' | 'high' | 'urgent'
  notes: string
}

export default function ProductionPage() {
  const vessels: Vessel[] = [
    { id: 100, name: "Large Shallow", diameter: 8.2, height: 2.36, unit: "in" },
    { id: 101, name: "Medium Cylinder", diameter: 5.43, height: 2.16, unit: "in" },
    { id: 102, name: "Small Ribbed", diameter: 2.7, height: 1.4, unit: "in" },
    { id: 103, name: "Ribbed Jar Mold", diameter: 9.5, height: 8, unit: "cm" },
    { id: 104, name: "Flower Shell", diameter: 3.5, height: 4.8, unit: "cm" },
    { id: 105, name: "Bowl Vessel", diameter: 3.25, height: 2.125, unit: "in" }
  ]

  const [productionOrders, setProductionOrders] = useState<ProductionOrder[]>([
    {
      id: '1',
      customerName: 'Sarah Johnson',
      recipeName: 'Lavender Dream',
      quantity: 50,
      vesselIndex: 0,
      dueDate: '2025-12-20',
      status: 'pending',
      priority: 'high',
      notes: 'Holiday gift order'
    },
    {
      id: '2',
      customerName: 'Mike Chen',
      recipeName: 'Vanilla Bliss',
      quantity: 100,
      vesselIndex: 1,
      dueDate: '2025-12-25',
      status: 'in-progress',
      priority: 'urgent',
      notes: 'Christmas wholesale order'
    }
  ])

  const [showAddOrderModal, setShowAddOrderModal] = useState(false)
  const [newOrder, setNewOrder] = useState<Partial<ProductionOrder>>({
    customerName: '',
    recipeName: '',
    quantity: 10,
    vesselIndex: 0,
    dueDate: '',
    status: 'pending',
    priority: 'medium',
    notes: ''
  })

  // Mock vessel calculations (simplified for this page)
  const vesselCalculations = vessels.map(vessel => ({
    vessel,
    calc: { totalCost: 5.50 } as VesselCalculation
  }))

  const addProductionOrder = () => {
    if (!newOrder.customerName || !newOrder.recipeName || !newOrder.dueDate) {
      alert('Please fill in all required fields')
      return
    }

    const order: ProductionOrder = {
      id: Date.now().toString(),
      customerName: newOrder.customerName!,
      recipeName: newOrder.recipeName!,
      quantity: newOrder.quantity || 10,
      vesselIndex: newOrder.vesselIndex || 0,
      dueDate: newOrder.dueDate!,
      status: 'pending',
      priority: newOrder.priority || 'medium',
      notes: newOrder.notes || ''
    }

    setProductionOrders([...productionOrders, order])
    setShowAddOrderModal(false)
    setNewOrder({
      customerName: '',
      recipeName: '',
      quantity: 10,
      vesselIndex: 0,
      dueDate: '',
      status: 'pending',
      priority: 'medium',
      notes: ''
    })
  }

  const updateOrderStatus = (orderId: string, status: ProductionOrder['status']) => {
    setProductionOrders(productionOrders.map(order => 
      order.id === orderId ? { ...order, status } : order
    ))
  }

  const deleteOrder = (orderId: string) => {
    if (confirm('Delete this order?')) {
      setProductionOrders(productionOrders.filter(order => order.id !== orderId))
    }
  }

  const getDaysUntilDue = (dueDate: string) => {
    const due = new Date(dueDate)
    const today = new Date()
    const diff = Math.ceil((due.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
    return diff
  }

  const sortedOrders = [...productionOrders].sort((a, b) => {
    const priorityOrder = { urgent: 0, high: 1, medium: 2, low: 3 }
    const priorityDiff = priorityOrder[a.priority] - priorityOrder[b.priority]
    if (priorityDiff !== 0) return priorityDiff
    return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
  })

  const orderStats = {
    total: productionOrders.length,
    pending: productionOrders.filter(o => o.status === 'pending').length,
    inProgress: productionOrders.filter(o => o.status === 'in-progress').length,
    completed: productionOrders.filter(o => o.status === 'completed').length,
    totalUnits: productionOrders.reduce((sum, o) => sum + o.quantity, 0),
    urgent: productionOrders.filter(o => o.priority === 'urgent').length,
    overdue: productionOrders.filter(o => getDaysUntilDue(o.dueDate) < 0 && o.status !== 'completed').length
  }

  return (
    <Tooltip.Provider delayDuration={200}>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent flex items-center gap-2">
            📅 Production Scheduler
            <Tooltip.Root>
              <Tooltip.Trigger asChild>
                <HelpCircle className="w-6 h-6 text-teal-500 hover:text-teal-600 cursor-help" />
              </Tooltip.Trigger>
              <Tooltip.Portal>
                <Tooltip.Content 
                  side="right" 
                  className="bg-white text-gray-900 px-4 py-3 rounded-lg shadow-xl text-sm max-w-xs z-[9999]"
                  sideOffset={5}
                >
                  Schedule and track candle production batches and workflows. Manage production deadlines, assign priorities, and monitor batch progress from pending to completion.
                  <Tooltip.Arrow className="fill-white" />
                </Tooltip.Content>
              </Tooltip.Portal>
            </Tooltip.Root>
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Track orders • Manage deadlines • Plan production runs
          </p>
        </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3 mb-6">
        <div className="bg-gradient-to-br from-blue-50 to-cyan-100 dark:from-blue-900/20 dark:to-cyan-900/20 p-4 rounded-xl border-2 border-blue-300 dark:border-blue-700">
          <div className="text-blue-900 dark:text-blue-100 text-xs font-semibold mb-1">Total Orders</div>
          <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">{orderStats.total}</div>
        </div>

        <div className="bg-gradient-to-br from-yellow-50 to-amber-100 dark:from-yellow-900/20 dark:to-amber-900/20 p-4 rounded-xl border-2 border-yellow-300 dark:border-yellow-700">
          <div className="text-yellow-900 dark:text-yellow-100 text-xs font-semibold mb-1">⏳ Pending</div>
          <div className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">{orderStats.pending}</div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20 p-4 rounded-xl border-2 border-purple-300 dark:border-purple-700">
          <div className="text-purple-900 dark:text-purple-100 text-xs font-semibold mb-1">🔄 In Progress</div>
          <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">{orderStats.inProgress}</div>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20 p-4 rounded-xl border-2 border-green-300 dark:border-green-700">
          <div className="text-green-900 dark:text-green-100 text-xs font-semibold mb-1">✅ Completed</div>
          <div className="text-3xl font-bold text-green-600 dark:text-green-400">{orderStats.completed}</div>
        </div>

        <div className="bg-gradient-to-br from-indigo-50 to-blue-100 dark:from-indigo-900/20 dark:to-blue-900/20 p-4 rounded-xl border-2 border-indigo-300 dark:border-indigo-700">
          <div className="text-indigo-900 dark:text-indigo-100 text-xs font-semibold mb-1">📦 Total Units</div>
          <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">{orderStats.totalUnits}</div>
        </div>

        <div className="bg-gradient-to-br from-red-50 to-orange-100 dark:from-red-900/20 dark:to-orange-900/20 p-4 rounded-xl border-2 border-red-300 dark:border-red-700">
          <div className="text-red-900 dark:text-red-100 text-xs font-semibold mb-1">🚨 Urgent</div>
          <div className="text-3xl font-bold text-red-600 dark:text-red-400">{orderStats.urgent}</div>
        </div>

        <div className={`bg-gradient-to-br p-4 rounded-xl border-2 ${
          orderStats.overdue > 0 
            ? 'from-red-100 to-red-200 dark:from-red-900/40 dark:to-red-800/40 border-red-400 dark:border-red-600'
            : 'from-gray-50 to-gray-100 dark:from-gray-900/20 dark:to-gray-800/20 border-gray-300 dark:border-gray-700'
        }`}>
          <div className={`text-xs font-semibold mb-1 ${orderStats.overdue > 0 ? 'text-red-900 dark:text-red-100' : 'text-gray-900 dark:text-gray-100'}`}>
            ⚠️ Overdue
          </div>
          <div className={`text-3xl font-bold ${orderStats.overdue > 0 ? 'text-red-700 dark:text-red-300' : 'text-gray-600 dark:text-gray-400'}`}>
            {orderStats.overdue}
          </div>
        </div>
      </div>

      {/* Production Queue */}
      <Card className="border-2 border-teal-200 dark:border-teal-800">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-teal-900 dark:text-teal-100">Production Queue</CardTitle>
            <button
              onClick={() => setShowAddOrderModal(true)}
              className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg font-semibold transition-all flex items-center gap-2"
            >
              ➕ Add Order
            </button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {sortedOrders.map((order) => {
              const daysUntil = getDaysUntilDue(order.dueDate)
              const isOverdue = daysUntil < 0 && order.status !== 'completed'
              const vesselCalc = vesselCalculations[order.vesselIndex]
              const orderCost = vesselCalc ? vesselCalc.calc.totalCost * order.quantity : 0

              return (
                <div
                  key={order.id}
                  className={`bg-white dark:bg-gray-800 border-2 rounded-xl p-5 ${
                    isOverdue ? 'border-red-500 dark:border-red-600' :
                    order.priority === 'urgent' ? 'border-orange-400 dark:border-orange-600' :
                    order.priority === 'high' ? 'border-yellow-400 dark:border-yellow-600' :
                    'border-gray-300 dark:border-gray-700'
                  }`}
                >
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-bold text-lg text-gray-900 dark:text-gray-100">
                          {order.customerName}
                        </h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                          order.priority === 'urgent' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300' :
                          order.priority === 'high' ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300' :
                          order.priority === 'medium' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300' :
                          'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-300'
                        }`}>
                          {order.priority.toUpperCase()}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                          order.status === 'completed' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300' :
                          order.status === 'in-progress' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' :
                          'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-300'
                        }`}>
                          {order.status}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                        <div>
                          <span className="text-gray-600 dark:text-gray-400">Recipe:</span>
                          <span className="ml-2 font-semibold text-gray-900 dark:text-gray-100">{order.recipeName}</span>
                        </div>
                        <div>
                          <span className="text-gray-600 dark:text-gray-400">Quantity:</span>
                          <span className="ml-2 font-semibold text-gray-900 dark:text-gray-100">{order.quantity} units</span>
                        </div>
                        <div>
                          <span className="text-gray-600 dark:text-gray-400">Vessel:</span>
                          <span className="ml-2 font-semibold text-gray-900 dark:text-gray-100">
                            {vessels[order.vesselIndex].name}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-600 dark:text-gray-400">Cost:</span>
                          <span className="ml-2 font-semibold text-teal-600 dark:text-teal-400">
                            ${orderCost.toFixed(2)}
                          </span>
                        </div>
                      </div>

                      <div className="mt-2 flex items-center gap-4 text-sm">
                        <div className={`font-semibold ${
                          isOverdue ? 'text-red-600 dark:text-red-400' :
                          daysUntil <= 3 ? 'text-orange-600 dark:text-orange-400' :
                          'text-gray-700 dark:text-gray-300'
                        }`}>
                          📅 Due: {new Date(order.dueDate).toLocaleDateString()} 
                          {isOverdue ? ` (${Math.abs(daysUntil)} days overdue!)` :
                           daysUntil === 0 ? ' (DUE TODAY!)' :
                           daysUntil === 1 ? ' (Due tomorrow)' :
                           ` (${daysUntil} days)`}
                        </div>
                      </div>

                      {order.notes && (
                        <div className="mt-2 text-xs text-gray-600 dark:text-gray-400 italic">
                          📝 {order.notes}
                        </div>
                      )}
                    </div>

                    <div className="flex md:flex-col gap-2">
                      {order.status === 'pending' && (
                        <button
                          onClick={() => updateOrderStatus(order.id, 'in-progress')}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold text-sm transition-all whitespace-nowrap"
                        >
                          ▶️ Start
                        </button>
                      )}
                      {order.status === 'in-progress' && (
                        <button
                          onClick={() => updateOrderStatus(order.id, 'completed')}
                          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold text-sm transition-all whitespace-nowrap"
                        >
                          ✅ Complete
                        </button>
                      )}
                      {order.status === 'completed' && (
                        <button
                          onClick={() => updateOrderStatus(order.id, 'pending')}
                          className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-semibold text-sm transition-all whitespace-nowrap"
                        >
                          🔄 Reopen
                        </button>
                      )}
                      <button
                        onClick={() => deleteOrder(order.id)}
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold text-sm transition-all"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}

            {sortedOrders.length === 0 && (
              <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-xl">
                <div className="text-6xl mb-4">📋</div>
                <h3 className="text-xl font-bold text-gray-600 dark:text-gray-400 mb-2">
                  No Orders Scheduled
                </h3>
                <p className="text-gray-500 dark:text-gray-500">Click "Add Order" to start planning production</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Add Order Modal */}
      {showAddOrderModal && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4" onClick={() => setShowAddOrderModal(false)}>
          <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-2xl w-full p-6" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">➕ Add Production Order</h2>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-gray-900 dark:text-gray-100 font-semibold mb-2 block">Customer Name *</Label>
                  <Input
                    value={newOrder.customerName}
                    onChange={(e) => setNewOrder({ ...newOrder, customerName: e.target.value })}
                    placeholder="Enter customer name"
                  />
                </div>

                <div>
                  <Label className="text-gray-900 dark:text-gray-100 font-semibold mb-2 block">Recipe Name *</Label>
                  <Input
                    value={newOrder.recipeName}
                    onChange={(e) => setNewOrder({ ...newOrder, recipeName: e.target.value })}
                    placeholder="Enter recipe name"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label className="text-gray-900 dark:text-gray-100 font-semibold mb-2 block">Quantity</Label>
                  <Input
                    type="number"
                    value={newOrder.quantity}
                    onChange={(e) => setNewOrder({ ...newOrder, quantity: parseInt(e.target.value) || 10 })}
                    min="1"
                  />
                </div>

                <div>
                  <Label className="text-gray-900 dark:text-gray-100 font-semibold mb-2 block">Vessel Type</Label>
                  <select
                    value={newOrder.vesselIndex}
                    onChange={(e) => setNewOrder({ ...newOrder, vesselIndex: parseInt(e.target.value) })}
                    className="w-full p-2 border-2 border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  >
                    {vessels.map((vessel, idx) => (
                      <option key={vessel.id} value={idx}>{vessel.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <Label className="text-gray-900 dark:text-gray-100 font-semibold mb-2 block">Priority</Label>
                  <select
                    value={newOrder.priority}
                    onChange={(e) => setNewOrder({ ...newOrder, priority: e.target.value as any })}
                    className="w-full p-2 border-2 border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>
              </div>

              <div>
                <Label className="text-gray-900 dark:text-gray-100 font-semibold mb-2 block">Due Date *</Label>
                <Input
                  type="date"
                  value={newOrder.dueDate}
                  onChange={(e) => setNewOrder({ ...newOrder, dueDate: e.target.value })}
                />
              </div>

              <div>
                <Label className="text-gray-900 dark:text-gray-100 font-semibold mb-2 block">Notes</Label>
                <Input
                  value={newOrder.notes}
                  onChange={(e) => setNewOrder({ ...newOrder, notes: e.target.value })}
                  placeholder="Special instructions, delivery notes, etc."
                />
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <button
                onClick={addProductionOrder}
                className="flex-1 bg-teal-600 hover:bg-teal-700 text-white py-3 rounded-xl font-bold transition-all"
              >
                ✅ Add Order
              </button>
              <button
                onClick={() => setShowAddOrderModal(false)}
                className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-3 rounded-xl font-bold transition-all"
              >
                ❌ Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    </Tooltip.Provider>
  )
}
