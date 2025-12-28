'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { HelpCircle } from 'lucide-react'
import * as Tooltip from '@radix-ui/react-tooltip'

interface TestLog {
  id: string
  recipeName: string
  testDate: string
  cureDay: number
  coldThrow: number
  hotThrow: number
  burnHours: number
  tunneling: boolean
  sooting: boolean
  mushrooming: boolean
  drowning: boolean
  frosting: boolean
  wetSpots: boolean
  sinkHoles: boolean
  status: 'PASS' | 'FAIL' | 'NEEDS ADJUSTMENT'
  notes: string
  photos: string[]
}

export default function TestingLogPage() {
  const [testLogs, setTestLogs] = useState<TestLog[]>([
    {
      id: '1',
      recipeName: 'Lavender Dreams',
      testDate: '2025-12-01',
      cureDay: 14,
      coldThrow: 8,
      hotThrow: 9,
      burnHours: 45,
      tunneling: false,
      sooting: false,
      mushrooming: false,
      drowning: false,
      frosting: true,
      wetSpots: false,
      sinkHoles: false,
      status: 'PASS',
      notes: 'Perfect scent throw. Minor frosting acceptable for soy. CD-12 wick works great.',
      photos: []
    },
    {
      id: '2',
      recipeName: 'Vanilla Bean',
      testDate: '2025-12-05',
      cureDay: 7,
      coldThrow: 6,
      hotThrow: 7,
      burnHours: 30,
      tunneling: true,
      sooting: false,
      mushrooming: true,
      drowning: false,
      frosting: false,
      wetSpots: true,
      sinkHoles: false,
      status: 'NEEDS ADJUSTMENT',
      notes: 'Tunneling issue - need to increase wick size from CD-10 to CD-12. Mushrooming at 3 hours - may need ECO wick instead.',
      photos: []
    }
  ])

  const [showAddTestModal, setShowAddTestModal] = useState(false)
  const [newTestLog, setNewTestLog] = useState<Partial<TestLog>>({
    recipeName: '',
    testDate: new Date().toISOString().split('T')[0],
    cureDay: 1,
    coldThrow: 5,
    hotThrow: 5,
    burnHours: 0,
    tunneling: false,
    sooting: false,
    mushrooming: false,
    drowning: false,
    frosting: false,
    wetSpots: false,
    sinkHoles: false,
    status: 'NEEDS ADJUSTMENT',
    notes: '',
    photos: []
  })

  const addTestLog = () => {
    if (!newTestLog.recipeName) {
      alert('Please enter a recipe name')
      return
    }

    const test: TestLog = {
      id: Date.now().toString(),
      recipeName: newTestLog.recipeName!,
      testDate: newTestLog.testDate!,
      cureDay: newTestLog.cureDay || 1,
      coldThrow: newTestLog.coldThrow || 5,
      hotThrow: newTestLog.hotThrow || 5,
      burnHours: newTestLog.burnHours || 0,
      tunneling: newTestLog.tunneling || false,
      sooting: newTestLog.sooting || false,
      mushrooming: newTestLog.mushrooming || false,
      drowning: newTestLog.drowning || false,
      frosting: newTestLog.frosting || false,
      wetSpots: newTestLog.wetSpots || false,
      sinkHoles: newTestLog.sinkHoles || false,
      status: newTestLog.status || 'NEEDS ADJUSTMENT',
      notes: newTestLog.notes || '',
      photos: []
    }

    setTestLogs([...testLogs, test])
    setShowAddTestModal(false)
    setNewTestLog({
      recipeName: '',
      testDate: new Date().toISOString().split('T')[0],
      cureDay: 1,
      coldThrow: 5,
      hotThrow: 5,
      burnHours: 0,
      tunneling: false,
      sooting: false,
      mushrooming: false,
      drowning: false,
      frosting: false,
      wetSpots: false,
      sinkHoles: false,
      status: 'NEEDS ADJUSTMENT',
      notes: '',
      photos: []
    })
  }

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
            {testLogs.filter(t => t.status === 'PASS').length}
          </div>
        </div>

        <div className="bg-gradient-to-br from-yellow-50 to-amber-100 dark:from-yellow-900/20 dark:to-amber-900/20 p-4 rounded-xl border-2 border-yellow-300 dark:border-yellow-700">
          <div className="text-yellow-900 dark:text-yellow-100 text-sm font-semibold mb-1">🔧 Needs Work</div>
          <div className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">
            {testLogs.filter(t => t.status === 'NEEDS ADJUSTMENT').length}
          </div>
        </div>

        <div className="bg-gradient-to-br from-red-50 to-orange-100 dark:from-red-900/20 dark:to-orange-900/20 p-4 rounded-xl border-2 border-red-300 dark:border-red-700">
          <div className="text-red-900 dark:text-red-100 text-sm font-semibold mb-1">❌ Failed</div>
          <div className="text-3xl font-bold text-red-600 dark:text-red-400">
            {testLogs.filter(t => t.status === 'FAIL').length}
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-cyan-100 dark:from-blue-900/20 dark:to-cyan-900/20 p-4 rounded-xl border-2 border-blue-300 dark:border-blue-700 md:col-span-2">
          <div className="text-blue-900 dark:text-blue-100 text-sm font-semibold mb-1">📊 Total Tests</div>
          <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">{testLogs.length}</div>
        </div>
      </div>

      {/* Add New Test Button */}
      <button
        onClick={() => setShowAddTestModal(true)}
        className="w-full bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 mb-6"
      >
        <span className="text-xl">➕</span> Add New Test Log
      </button>

      {/* Test Logs */}
      <div className="space-y-4">
        {testLogs.map(test => (
          <div key={test.id} className={`bg-gradient-to-br p-6 rounded-xl border-2 ${
            test.status === 'PASS' ? 'from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-300 dark:border-green-700' :
            test.status === 'FAIL' ? 'from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 border-red-300 dark:border-red-700' :
            'from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20 border-yellow-300 dark:border-yellow-700'
          }`}>
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">{test.recipeName}</h3>
                <div className="flex items-center gap-4 mt-2 text-sm text-gray-600 dark:text-gray-400">
                  <span>📅 {new Date(test.testDate).toLocaleDateString()}</span>
                  <span>🕐 Day {test.cureDay} Cure</span>
                </div>
              </div>
              <div className={`px-4 py-2 rounded-lg font-bold text-sm ${
                test.status === 'PASS' ? 'bg-green-200 dark:bg-green-800 text-green-900 dark:text-green-100' :
                test.status === 'FAIL' ? 'bg-red-200 dark:bg-red-800 text-red-900 dark:text-red-100' :
                'bg-yellow-200 dark:bg-yellow-800 text-yellow-900 dark:text-yellow-100'
              }`}>
                {test.status === 'PASS' ? '✅ PASS' : test.status === 'FAIL' ? '❌ FAIL' : '🔧 NEEDS ADJUSTMENT'}
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div className="bg-white dark:bg-gray-800 p-3 rounded-lg">
                <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">❄️ Cold Throw</div>
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{test.coldThrow}/10</div>
                <div className="flex gap-0.5 mt-1">
                  {[...Array(10)].map((_, i) => (
                    <div key={i} className={`w-2 h-2 rounded-full ${i < test.coldThrow ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'}`}></div>
                  ))}
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 p-3 rounded-lg">
                <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">🔥 Hot Throw</div>
                <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">{test.hotThrow}/10</div>
                <div className="flex gap-0.5 mt-1">
                  {[...Array(10)].map((_, i) => (
                    <div key={i} className={`w-2 h-2 rounded-full ${i < test.hotThrow ? 'bg-orange-500' : 'bg-gray-300 dark:bg-gray-600'}`}></div>
                  ))}
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 p-3 rounded-lg">
                <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">⏱️ Burn Time</div>
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{test.burnHours}h</div>
              </div>

              <div className="bg-white dark:bg-gray-800 p-3 rounded-lg">
                <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">🧵 Issues</div>
                <div className="text-lg font-bold text-gray-900 dark:text-gray-100">
                  {[test.tunneling, test.sooting, test.mushrooming, test.drowning, test.frosting, test.wetSpots, test.sinkHoles].filter(Boolean).length}
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg mb-4">
              <div className="text-sm font-bold text-gray-900 dark:text-gray-100 mb-2">🔍 Issues Detected:</div>
              <div className="flex flex-wrap gap-2">
                {test.tunneling && <span className="bg-red-200 dark:bg-red-800 text-red-900 dark:text-red-100 px-3 py-1 rounded-full text-xs font-semibold">🕳️ Tunneling</span>}
                {test.sooting && <span className="bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-gray-100 px-3 py-1 rounded-full text-xs font-semibold">💨 Sooting</span>}
                {test.mushrooming && <span className="bg-orange-200 dark:bg-orange-800 text-orange-900 dark:text-orange-100 px-3 py-1 rounded-full text-xs font-semibold">🍄 Mushrooming</span>}
                {test.drowning && <span className="bg-blue-200 dark:bg-blue-800 text-blue-900 dark:text-blue-100 px-3 py-1 rounded-full text-xs font-semibold">💧 Drowning</span>}
                {test.frosting && <span className="bg-cyan-200 dark:bg-cyan-800 text-cyan-900 dark:text-cyan-100 px-3 py-1 rounded-full text-xs font-semibold">❄️ Frosting</span>}
                {test.wetSpots && <span className="bg-purple-200 dark:bg-purple-800 text-purple-900 dark:text-purple-100 px-3 py-1 rounded-full text-xs font-semibold">💦 Wet Spots</span>}
                {test.sinkHoles && <span className="bg-yellow-200 dark:bg-yellow-800 text-yellow-900 dark:text-yellow-100 px-3 py-1 rounded-full text-xs font-semibold">🕳️ Sink Holes</span>}
                {![test.tunneling, test.sooting, test.mushrooming, test.drowning, test.frosting, test.wetSpots, test.sinkHoles].some(Boolean) && (
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

        {testLogs.length === 0 && (
          <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-xl">
            <div className="text-6xl mb-4">🧪</div>
            <h3 className="text-xl font-bold text-gray-600 dark:text-gray-400 mb-2">
              No Test Logs Yet
            </h3>
            <p className="text-gray-500 dark:text-gray-500">Click "Add New Test Log" to track your candle testing</p>
          </div>
        )}
      </div>

      {/* Add Test Modal */}
      {showAddTestModal && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4" onClick={() => setShowAddTestModal(false)}>
          <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-3xl w-full p-6 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">🧪 Add Test Log</h2>
            
            <div className="space-y-4">
              {/* Basic Info */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-gray-900 dark:text-gray-100 font-semibold mb-2 block">Recipe Name *</Label>
                  <Input
                    value={newTestLog.recipeName}
                    onChange={(e) => setNewTestLog({ ...newTestLog, recipeName: e.target.value })}
                    placeholder="Enter recipe name"
                  />
                </div>

                <div>
                  <Label className="text-gray-900 dark:text-gray-100 font-semibold mb-2 block">Test Date</Label>
                  <Input
                    type="date"
                    value={newTestLog.testDate}
                    onChange={(e) => setNewTestLog({ ...newTestLog, testDate: e.target.value })}
                  />
                </div>
              </div>

              {/* Ratings */}
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label className="text-gray-900 dark:text-gray-100 font-semibold mb-2 block">Cure Day</Label>
                  <Input
                    type="number"
                    value={newTestLog.cureDay}
                    onChange={(e) => setNewTestLog({ ...newTestLog, cureDay: parseInt(e.target.value) || 1 })}
                    min="1"
                    max="30"
                  />
                </div>

                <div>
                  <Label className="text-gray-900 dark:text-gray-100 font-semibold mb-2 block">❄️ Cold Throw (1-10)</Label>
                  <Input
                    type="number"
                    value={newTestLog.coldThrow}
                    onChange={(e) => setNewTestLog({ ...newTestLog, coldThrow: parseInt(e.target.value) || 5 })}
                    min="1"
                    max="10"
                  />
                </div>

                <div>
                  <Label className="text-gray-900 dark:text-gray-100 font-semibold mb-2 block">🔥 Hot Throw (1-10)</Label>
                  <Input
                    type="number"
                    value={newTestLog.hotThrow}
                    onChange={(e) => setNewTestLog({ ...newTestLog, hotThrow: parseInt(e.target.value) || 5 })}
                    min="1"
                    max="10"
                  />
                </div>
              </div>

              <div>
                <Label className="text-gray-900 dark:text-gray-100 font-semibold mb-2 block">⏱️ Burn Hours</Label>
                <Input
                  type="number"
                  value={newTestLog.burnHours}
                  onChange={(e) => setNewTestLog({ ...newTestLog, burnHours: parseFloat(e.target.value) || 0 })}
                  step="0.5"
                />
              </div>

              {/* Issues Checkboxes */}
              <div>
                <Label className="text-gray-900 dark:text-gray-100 font-semibold mb-2 block">🔍 Issues Detected</Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      checked={newTestLog.tunneling}
                      onCheckedChange={(checked) => setNewTestLog({ ...newTestLog, tunneling: !!checked })}
                    />
                    <label className="text-sm text-gray-900 dark:text-gray-100">🕳️ Tunneling</label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      checked={newTestLog.sooting}
                      onCheckedChange={(checked) => setNewTestLog({ ...newTestLog, sooting: !!checked })}
                    />
                    <label className="text-sm text-gray-900 dark:text-gray-100">💨 Sooting</label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      checked={newTestLog.mushrooming}
                      onCheckedChange={(checked) => setNewTestLog({ ...newTestLog, mushrooming: !!checked })}
                    />
                    <label className="text-sm text-gray-900 dark:text-gray-100">🍄 Mushrooming</label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      checked={newTestLog.drowning}
                      onCheckedChange={(checked) => setNewTestLog({ ...newTestLog, drowning: !!checked })}
                    />
                    <label className="text-sm text-gray-900 dark:text-gray-100">💧 Drowning</label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      checked={newTestLog.frosting}
                      onCheckedChange={(checked) => setNewTestLog({ ...newTestLog, frosting: !!checked })}
                    />
                    <label className="text-sm text-gray-900 dark:text-gray-100">❄️ Frosting</label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      checked={newTestLog.wetSpots}
                      onCheckedChange={(checked) => setNewTestLog({ ...newTestLog, wetSpots: !!checked })}
                    />
                    <label className="text-sm text-gray-900 dark:text-gray-100">💦 Wet Spots</label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      checked={newTestLog.sinkHoles}
                      onCheckedChange={(checked) => setNewTestLog({ ...newTestLog, sinkHoles: !!checked })}
                    />
                    <label className="text-sm text-gray-900 dark:text-gray-100">🕳️ Sink Holes</label>
                  </div>
                </div>
              </div>

              {/* Status */}
              <div>
                <Label className="text-gray-900 dark:text-gray-100 font-semibold mb-2 block">Status</Label>
                <select
                  value={newTestLog.status}
                  onChange={(e) => setNewTestLog({ ...newTestLog, status: e.target.value as any })}
                  className="w-full p-2 border-2 border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                >
                  <option value="PASS">✅ PASS</option>
                  <option value="NEEDS ADJUSTMENT">🔧 NEEDS ADJUSTMENT</option>
                  <option value="FAIL">❌ FAIL</option>
                </select>
              </div>

              {/* Notes */}
              <div>
                <Label className="text-gray-900 dark:text-gray-100 font-semibold mb-2 block">📝 Notes</Label>
                <textarea
                  value={newTestLog.notes}
                  onChange={(e) => setNewTestLog({ ...newTestLog, notes: e.target.value })}
                  placeholder="Detailed observations, wick performance, adjustments needed, etc."
                  className="w-full p-3 border-2 border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 min-h-[100px]"
                />
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <button
                onClick={addTestLog}
                className="flex-1 bg-teal-600 hover:bg-teal-700 text-white py-3 rounded-xl font-bold transition-all"
              >
                ✅ Add Test Log
              </button>
              <button
                onClick={() => setShowAddTestModal(false)}
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
