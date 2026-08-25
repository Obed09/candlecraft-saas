'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { HelpCircle, Plus, Trash2 } from 'lucide-react'
import * as Tooltip from '@radix-ui/react-tooltip'
import { useSession } from 'next-auth/react'

// Matches the TestLog Prisma model + /api/testing-log contract.
interface TestLog {
  id: string
  name: string
  description?: string | null
  candleId?: string | null
  candleName?: string | null
  wickType?: string | null
  coldThrow?: number | null
  hotThrow?: number | null
  burnTime?: number | null // minutes
  tunnel: boolean
  soot: boolean
  mushroom: boolean
  notes?: string | null
  result?: string | null
  testDate: string
}

const STATUSES = ['NEEDS ADJUSTMENT', 'PASS', 'FAIL'] as const
type Status = (typeof STATUSES)[number]

const emptyForm = () => ({
  name: '',
  candleName: '',
  wickType: '',
  coldThrow: 5,
  hotThrow: 5,
  burnTime: 0,
  tunnel: false,
  soot: false,
  mushroom: false,
  result: 'NEEDS ADJUSTMENT' as Status,
  notes: '',
  testDate: new Date().toISOString().split('T')[0],
})

export default function TestingLogPage() {
  const { data: session } = useSession()
  const [testLogs, setTestLogs] = useState<TestLog[]>([])
  const [loading, setLoading] = useState(true)

  const [showModal, setShowModal] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState(emptyForm())

  // Load persisted test log entries on mount.
  useEffect(() => {
    if (!session) return
    const load = async () => {
      try {
        const res = await fetch('/api/testing-log')
        if (res.ok) {
          const data = await res.json()
          setTestLogs(data.tests || [])
        }
      } catch (err) {
        console.error('Failed to load testing log:', err)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [session])

  const openAdd = () => {
    setEditingId(null)
    setForm(emptyForm())
    setShowModal(true)
  }

  const openEdit = (test: TestLog) => {
    setEditingId(test.id)
    setForm({
      name: test.name,
      candleName: test.candleName || '',
      wickType: test.wickType || '',
      coldThrow: test.coldThrow ?? 5,
      hotThrow: test.hotThrow ?? 5,
      burnTime: test.burnTime ?? 0,
      tunnel: test.tunnel,
      soot: test.soot,
      mushroom: test.mushroom,
      result: (test.result as Status) || 'NEEDS ADJUSTMENT',
      notes: test.notes || '',
      testDate: test.testDate ? test.testDate.split('T')[0] : new Date().toISOString().split('T')[0],
    })
    setShowModal(true)
  }

  const saveTest = async () => {
    if (!form.name.trim()) {
      alert('Please enter a recipe name')
      return
    }
    const payload = {
      name: form.name,
      candleName: form.candleName || null,
      wickType: form.wickType || null,
      coldThrow: form.coldThrow,
      hotThrow: form.hotThrow,
      burnTime: form.burnTime,
      tunnel: form.tunnel,
      soot: form.soot,
      mushroom: form.mushroom,
      result: form.result,
      notes: form.notes || null,
      testDate: form.testDate,
    }

    try {
      if (editingId) {
        const res = await fetch(`/api/testing-log/${editingId}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
        if (!res.ok) {
          alert('Failed to update test entry')
          return
        }
        const data = await res.json()
        setTestLogs(prev => prev.map(t => (t.id === editingId ? data.test : t)))
      } else {
        const res = await fetch('/api/testing-log', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
        if (!res.ok) {
          alert('Failed to create test entry')
          return
        }
        const data = await res.json()
        setTestLogs(prev => [data.test, ...prev])
      }
      setShowModal(false)
    } catch (err) {
      console.error('Error saving test entry:', err)
      alert('Failed to save test entry')
    }
  }

  const deleteTest = async (id: string) => {
    if (!confirm('Are you sure you want to delete this test log entry?')) return
    try {
      const res = await fetch(`/api/testing-log/${id}`, { method: 'DELETE' })
      if (res.ok) {
        setTestLogs(prev => prev.filter(t => t.id !== id))
      } else {
        alert('Failed to delete test entry')
      }
    } catch (err) {
      console.error('Error deleting test entry:', err)
      alert('Failed to delete test entry')
    }
  }

  const issueBadge = (text: string, show: boolean, cls: string) =>
    show ? <span className={`px-3 py-1 rounded-full text-xs font-semibold ${cls}`}>{text}</span> : null

  return (
    <Tooltip.Provider delayDuration={200}>
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent flex items-center gap-2">
          🧪 Testing & Development Log
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
                Track cure times, burn tests, scent throw ratings, and wick performance. Document test results for each recipe iteration to ensure perfect candle quality.
                <Tooltip.Arrow className="fill-white" />
              </Tooltip.Content>
            </Tooltip.Portal>
          </Tooltip.Root>
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Cure tracking • Burn tests • Scent throw ratings • Wick performance • QA testing
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 md:grid-cols-5 gap-4 mb-6">
        <div className="bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20 p-4 rounded-xl border-2 border-green-300 dark:border-green-700">
          <div className="text-green-900 dark:text-green-100 text-sm font-semibold mb-1">✅ Passed</div>
          <div className="text-3xl font-bold text-green-600 dark:text-green-400">
            {testLogs.filter(t => t.result === 'PASS').length}
          </div>
        </div>

        <div className="bg-gradient-to-br from-yellow-50 to-amber-100 dark:from-yellow-900/20 dark:to-amber-900/20 p-4 rounded-xl border-2 border-yellow-300 dark:border-yellow-700">
          <div className="text-yellow-900 dark:text-yellow-100 text-sm font-semibold mb-1">🔧 Needs Work</div>
          <div className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">
            {testLogs.filter(t => t.result === 'NEEDS ADJUSTMENT').length}
          </div>
        </div>

        <div className="bg-gradient-to-br from-red-50 to-orange-100 dark:from-red-900/20 dark:to-orange-900/20 p-4 rounded-xl border-2 border-red-300 dark:border-red-700">
          <div className="text-red-900 dark:text-red-100 text-sm font-semibold mb-1">❌ Failed</div>
          <div className="text-3xl font-bold text-red-600 dark:text-red-400">
            {testLogs.filter(t => t.result === 'FAIL').length}
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-cyan-100 dark:from-blue-900/20 dark:to-cyan-900/20 p-4 rounded-xl border-2 border-blue-300 dark:border-blue-700 md:col-span-2">
          <div className="text-blue-900 dark:text-blue-100 text-sm font-semibold mb-1">📊 Total Tests</div>
          <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">{testLogs.length}</div>
        </div>
      </div>

      {/* Add New Test Button */}
      <button
        onClick={openAdd}
        className="w-full bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 mb-6"
      >
        <Plus className="h-5 w-5" /> Add New Test Log
      </button>

      {/* Test Logs */}
      <div className="space-y-4">
        {loading && (
          <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-xl text-gray-500">
            Loading test log...
          </div>
        )}

        {!loading && testLogs.map(test => (
          <div key={test.id} className={`bg-gradient-to-br p-6 rounded-xl border-2 ${
            test.result === 'PASS' ? 'from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-300 dark:border-green-700' :
            test.result === 'FAIL' ? 'from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 border-red-300 dark:border-red-700' :
            'from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20 border-yellow-300 dark:border-yellow-700'
          }`}>
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">{test.name}</h3>
                <div className="flex items-center gap-4 mt-2 text-sm text-gray-600 dark:text-gray-400">
                  <span>📅 {new Date(test.testDate).toLocaleDateString()}</span>
                  {test.candleName && <span>🕯️ {test.candleName}</span>}
                  {test.wickType && <span>🧵 Wick: {test.wickType}</span>}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`px-4 py-2 rounded-lg font-bold text-sm ${
                  test.result === 'PASS' ? 'bg-green-200 dark:bg-green-800 text-green-900 dark:text-green-100' :
                  test.result === 'FAIL' ? 'bg-red-200 dark:bg-red-800 text-red-900 dark:text-red-100' :
                  'bg-yellow-200 dark:bg-yellow-800 text-yellow-900 dark:text-yellow-100'
                }`}>
                  {test.result === 'PASS' ? '✅ PASS' : test.result === 'FAIL' ? '❌ FAIL' : '🔧 NEEDS ADJUSTMENT'}
                </span>
                <button
                  onClick={() => openEdit(test)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-sm font-semibold transition-all"
                >
                  ✏️ Edit
                </button>
                <button
                  onClick={() => deleteTest(test.id)}
                  className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg text-sm font-semibold transition-all"
                  title="Delete entry"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div className="bg-white dark:bg-gray-800 p-3 rounded-lg">
                <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">❄️ Cold Throw</div>
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{test.coldThrow ?? '—'}/10</div>
                <div className="flex gap-0.5 mt-1">
                  {[...Array(10)].map((_, i) => (
                    <div key={i} className={`w-2 h-2 rounded-full ${i < (test.coldThrow ?? 0) ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'}`}></div>
                  ))}
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 p-3 rounded-lg">
                <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">🔥 Hot Throw</div>
                <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">{test.hotThrow ?? '—'}/10</div>
                <div className="flex gap-0.5 mt-1">
                  {[...Array(10)].map((_, i) => (
                    <div key={i} className={`w-2 h-2 rounded-full ${i < (test.hotThrow ?? 0) ? 'bg-orange-500' : 'bg-gray-300 dark:bg-gray-600'}`}></div>
                  ))}
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 p-3 rounded-lg">
                <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">⏱️ Burn Time</div>
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                  {test.burnTime ? `${(test.burnTime / 60).toFixed(1)}h` : '—'}
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 p-3 rounded-lg">
                <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">🧵 Issues</div>
                <div className="text-lg font-bold text-gray-900 dark:text-gray-100">
                  {[test.tunnel, test.soot, test.mushroom].filter(Boolean).length}
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg mb-4">
              <div className="text-sm font-bold text-gray-900 dark:text-gray-100 mb-2">🔍 Issues Detected:</div>
              <div className="flex flex-wrap gap-2">
                {issueBadge('🕳️ Tunneling', test.tunnel, 'bg-red-200 dark:bg-red-800 text-red-900 dark:text-red-100')}
                {issueBadge('💨 Sooting', test.soot, 'bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-gray-100')}
                {issueBadge('🍄 Mushrooming', test.mushroom, 'bg-orange-200 dark:bg-orange-800 text-orange-900 dark:text-orange-100')}
                {!test.tunnel && !test.soot && !test.mushroom && (
                  <span className="bg-green-200 dark:bg-green-800 text-green-900 dark:text-green-100 px-3 py-1 rounded-full text-xs font-semibold">✨ No Issues!</span>
                )}
              </div>
            </div>

            {test.notes && (
              <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg border-2 border-yellow-300 dark:border-yellow-700">
                <div className="text-sm font-bold text-yellow-900 dark:text-yellow-100 mb-1">📝 Notes:</div>
                <div className="text-sm text-yellow-800 dark:text-yellow-200">{test.notes}</div>
              </div>
            )}
          </div>
        ))}

        {!loading && testLogs.length === 0 && (
          <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-xl">
            <div className="text-6xl mb-4">🧪</div>
            <h3 className="text-xl font-bold text-gray-600 dark:text-gray-400 mb-2">
              No Test Logs Yet
            </h3>
            <p className="text-gray-500 dark:text-gray-500">Click "Add New Test Log" to track your candle testing</p>
          </div>
        )}
      </div>

      {/* Add / Edit Test Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4" onClick={() => setShowModal(false)}>
          <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-3xl w-full p-6 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              {editingId ? '✏️ Edit Test Log' : '🧪 Add Test Log'}
            </h2>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-gray-900 dark:text-gray-100 font-semibold mb-2 block">Recipe Name *</Label>
                  <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Enter recipe name" />
                </div>
                <div>
                  <Label className="text-gray-900 dark:text-gray-100 font-semibold mb-2 block">Test Date</Label>
                  <Input type="date" value={form.testDate} onChange={(e) => setForm({ ...form, testDate: e.target.value })} />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label className="text-gray-900 dark:text-gray-100 font-semibold mb-2 block">Candle Name</Label>
                  <Input value={form.candleName} onChange={(e) => setForm({ ...form, candleName: e.target.value })} placeholder="Optional" />
                </div>
                <div>
                  <Label className="text-gray-900 dark:text-gray-100 font-semibold mb-2 block">Wick Type</Label>
                  <Input value={form.wickType} onChange={(e) => setForm({ ...form, wickType: e.target.value })} placeholder="e.g. CD-12" />
                </div>
                <div>
                  <Label className="text-gray-900 dark:text-gray-100 font-semibold mb-2 block">❄️ Cold Throw (1-10)</Label>
                  <Input type="number" min="1" max="10" value={form.coldThrow} onChange={(e) => setForm({ ...form, coldThrow: parseInt(e.target.value) || 0 })} />
                </div>
                <div>
                  <Label className="text-gray-900 dark:text-gray-100 font-semibold mb-2 block">🔥 Hot Throw (1-10)</Label>
                  <Input type="number" min="1" max="10" value={form.hotThrow} onChange={(e) => setForm({ ...form, hotThrow: parseInt(e.target.value) || 0 })} />
                </div>
                <div>
                  <Label className="text-gray-900 dark:text-gray-100 font-semibold mb-2 block">⏱️ Burn Time (minutes)</Label>
                  <Input type="number" min="0" step="15" value={form.burnTime} onChange={(e) => setForm({ ...form, burnTime: parseInt(e.target.value) || 0 })} />
                </div>
              </div>

              <div>
                <Label className="text-gray-900 dark:text-gray-100 font-semibold mb-2 block">🔍 Issues Detected</Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox checked={form.tunnel} onCheckedChange={(c) => setForm({ ...form, tunnel: !!c })} />
                    <label className="text-sm text-gray-900 dark:text-gray-100">🕳️ Tunneling</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox checked={form.soot} onCheckedChange={(c) => setForm({ ...form, soot: !!c })} />
                    <label className="text-sm text-gray-900 dark:text-gray-100">💨 Sooting</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox checked={form.mushroom} onCheckedChange={(c) => setForm({ ...form, mushroom: !!c })} />
                    <label className="text-sm text-gray-900 dark:text-gray-100">🍄 Mushrooming</label>
                  </div>
                </div>
              </div>

              <div>
                <Label className="text-gray-900 dark:text-gray-100 font-semibold mb-2 block">Status</Label>
                <select
                  value={form.result}
                  onChange={(e) => setForm({ ...form, result: e.target.value as Status })}
                  className="w-full p-2 border-2 border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                >
                  <option value="PASS">✅ PASS</option>
                  <option value="NEEDS ADJUSTMENT">🔧 NEEDS ADJUSTMENT</option>
                  <option value="FAIL">❌ FAIL</option>
                </select>
              </div>

              <div>
                <Label className="text-gray-900 dark:text-gray-100 font-semibold mb-2 block">📝 Notes</Label>
                <textarea
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  placeholder="Detailed observations, wick performance, adjustments needed, etc."
                  className="w-full p-3 border-2 border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 min-h-[100px]"
                />
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <button onClick={saveTest} className="flex-1 bg-teal-600 hover:bg-teal-700 text-white py-3 rounded-xl font-bold transition-all">
                ✅ {editingId ? 'Update Test Log' : 'Add Test Log'}
              </button>
              <button onClick={() => setShowModal(false)} className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-3 rounded-xl font-bold transition-all">
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
