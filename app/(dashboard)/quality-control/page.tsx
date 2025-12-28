"use client";

import { useState } from "react";
import { ClipboardCheck, CheckCircle, XCircle, AlertTriangle, Clock, Download, Eye, HelpCircle } from "lucide-react";
import * as Tooltip from '@radix-ui/react-tooltip';

interface QualityCheck {
  id: string;
  name: string;
  required: boolean;
  status: 'pass' | 'fail' | 'pending';
}

interface Batch {
  id: string;
  batchNumber: string;
  product: string;
  productionDate: Date;
  quantity: number;
  status: 'pending' | 'in-testing' | 'approved' | 'rejected';
  checklist: QualityCheck[];
  inspector?: string;
  notes?: string;
}

export default function QualityControlPage() {
  const [batches, setBatches] = useState<Batch[]>([
    {
      id: '1',
      batchNumber: 'PB-147',
      product: 'Lavender Bliss',
      productionDate: new Date(2025, 11, 20),
      quantity: 120,
      status: 'approved',
      inspector: 'John Smith',
      checklist: [
        { id: '1', name: 'Visual appearance check', required: true, status: 'pass' },
        { id: '2', name: 'Scent strength verification', required: true, status: 'pass' },
        { id: '3', name: 'Burn test (2 hours)', required: true, status: 'pass' },
        { id: '4', name: 'Wick centering', required: true, status: 'pass' },
        { id: '5', name: 'Container integrity', required: true, status: 'pass' },
        { id: '6', name: 'Label placement', required: false, status: 'pass' }
      ]
    },
    {
      id: '2',
      batchNumber: 'PB-148',
      product: 'Vanilla Dream',
      productionDate: new Date(2025, 11, 21),
      quantity: 80,
      status: 'in-testing',
      inspector: 'Emily Rodriguez',
      checklist: [
        { id: '1', name: 'Visual appearance check', required: true, status: 'pass' },
        { id: '2', name: 'Scent strength verification', required: true, status: 'pass' },
        { id: '3', name: 'Burn test (2 hours)', required: true, status: 'pending' },
        { id: '4', name: 'Wick centering', required: true, status: 'pending' },
        { id: '5', name: 'Container integrity', required: true, status: 'pending' },
        { id: '6', name: 'Label placement', required: false, status: 'pending' }
      ]
    },
    {
      id: '3',
      batchNumber: 'PB-149',
      product: 'Citrus Burst',
      productionDate: new Date(2025, 11, 22),
      quantity: 100,
      status: 'rejected',
      inspector: 'John Smith',
      notes: 'Burn test failed - uneven wax pool. Needs wick size adjustment.',
      checklist: [
        { id: '1', name: 'Visual appearance check', required: true, status: 'pass' },
        { id: '2', name: 'Scent strength verification', required: true, status: 'pass' },
        { id: '3', name: 'Burn test (2 hours)', required: true, status: 'fail' },
        { id: '4', name: 'Wick centering', required: true, status: 'pass' },
        { id: '5', name: 'Container integrity', required: true, status: 'pass' },
        { id: '6', name: 'Label placement', required: false, status: 'pass' }
      ]
    }
  ]);

  const [selectedBatch, setSelectedBatch] = useState<string | null>(null);

  const getStatusColor = (status: string) => {
    const colors = {
      'pending': 'bg-gray-100 text-gray-700 border-gray-200',
      'in-testing': 'bg-blue-100 text-blue-700 border-blue-200',
      'approved': 'bg-green-100 text-green-700 border-green-200',
      'rejected': 'bg-red-100 text-red-700 border-red-200'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-700';
  };

  const getCheckStatusIcon = (status: string) => {
    if (status === 'pass') return <CheckCircle className="w-5 h-5 text-green-500" />;
    if (status === 'fail') return <XCircle className="w-5 h-5 text-red-500" />;
    return <Clock className="w-5 h-5 text-gray-400" />;
  };

  const calculatePassRate = (batch: Batch) => {
    const completed = batch.checklist.filter(c => c.status !== 'pending').length;
    const passed = batch.checklist.filter(c => c.status === 'pass').length;
    return completed > 0 ? Math.round((passed / completed) * 100) : 0;
  };

  const stats = {
    totalBatches: batches.length,
    approved: batches.filter(b => b.status === 'approved').length,
    inTesting: batches.filter(b => b.status === 'in-testing').length,
    rejected: batches.filter(b => b.status === 'rejected').length,
    passRate: Math.round((batches.filter(b => b.status === 'approved').length / batches.length) * 100)
  };

  return (
    <Tooltip.Provider delayDuration={200}>
    <div className="p-8 max-w-7xl">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <ClipboardCheck className="w-8 h-8 text-purple-600" />
              Quality Control
              <Tooltip.Root>
                <Tooltip.Trigger asChild>
                  <HelpCircle className="w-6 h-6 text-purple-500 hover:text-purple-600 cursor-help" />
                </Tooltip.Trigger>
                <Tooltip.Portal>
                  <Tooltip.Content 
                    side="right" 
                    className="bg-white text-gray-900 px-4 py-3 rounded-lg shadow-xl text-sm max-w-xs z-[9999]"
                    sideOffset={5}
                  >
                    Manage batch testing, compliance tracking, and quality assurance. Inspect production batches, document test results, and ensure products meet quality standards.
                    <Tooltip.Arrow className="fill-white" />
                  </Tooltip.Content>
                </Tooltip.Portal>
              </Tooltip.Root>
            </h1>
            <p className="text-gray-600 mt-2">Batch testing, compliance tracking, and quality assurance</p>
          </div>
          <button className="flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition shadow-lg font-medium">
            <ClipboardCheck className="w-5 h-5" />
            New QA Test
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border-2 border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Batches</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalBatches}</p>
              </div>
              <ClipboardCheck className="w-10 h-10 text-gray-500 opacity-20" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border-2 border-green-200 bg-green-50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-700 mb-1">Approved</p>
                <p className="text-3xl font-bold text-green-600">{stats.approved}</p>
              </div>
              <CheckCircle className="w-10 h-10 text-green-500 opacity-30" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border-2 border-blue-200 bg-blue-50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-700 mb-1">In Testing</p>
                <p className="text-3xl font-bold text-blue-600">{stats.inTesting}</p>
              </div>
              <Clock className="w-10 h-10 text-blue-500 opacity-30" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border-2 border-red-200 bg-red-50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-red-700 mb-1">Rejected</p>
                <p className="text-3xl font-bold text-red-600">{stats.rejected}</p>
              </div>
              <XCircle className="w-10 h-10 text-red-500 opacity-30" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border-2 border-purple-200 bg-purple-50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-700 mb-1">Pass Rate</p>
                <p className="text-3xl font-bold text-purple-600">{stats.passRate}%</p>
              </div>
              <AlertTriangle className="w-10 h-10 text-purple-500 opacity-30" />
            </div>
          </div>
        </div>
      </div>

      {/* Batch List */}
      <div className="bg-white rounded-xl shadow-sm border-2 border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Quality Control Tests</h2>
        
        <div className="space-y-4">
          {batches.map((batch) => (
            <div key={batch.id} className="border-2 border-gray-200 rounded-xl p-6 hover:border-purple-300 transition">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{batch.batchNumber}</h3>
                    <span className={`px-3 py-1 text-xs font-medium rounded-full border ${getStatusColor(batch.status)}`}>
                      {batch.status.replace('-', ' ').charAt(0).toUpperCase() + batch.status.slice(1)}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-4">
                    <div>
                      <span className="font-medium">Product:</span> {batch.product}
                    </div>
                    <div>
                      <span className="font-medium">Quantity:</span> {batch.quantity} units
                    </div>
                    <div>
                      <span className="font-medium">Production Date:</span> {batch.productionDate.toLocaleDateString()}
                    </div>
                    {batch.inspector && (
                      <div>
                        <span className="font-medium">Inspector:</span> {batch.inspector}
                      </div>
                    )}
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-gray-600">Quality Check Progress</span>
                      <span className="font-medium text-gray-900">{calculatePassRate(batch)}% Complete</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-purple-600 h-2 rounded-full transition-all"
                        style={{ width: `${calculatePassRate(batch)}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Checklist Preview */}
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-4">
                    {batch.checklist.map((check) => (
                      <div key={check.id} className="flex items-center gap-2 text-sm">
                        {getCheckStatusIcon(check.status)}
                        <span className={check.required ? 'font-medium' : ''}>
                          {check.name}
                        </span>
                      </div>
                    ))}
                  </div>

                  {batch.notes && (
                    <div className="bg-red-50 border-2 border-red-200 rounded-lg p-3 mb-4">
                      <div className="flex items-start gap-2">
                        <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-red-900 mb-1">Quality Issues</p>
                          <p className="text-sm text-red-700">{batch.notes}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t">
                <button className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition text-sm font-medium">
                  <Eye className="w-4 h-4" />
                  View Details
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition text-sm font-medium">
                  <Download className="w-4 h-4" />
                  Export Report
                </button>
                {batch.status === 'in-testing' && (
                  <>
                    <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-sm font-medium ml-auto">
                      <CheckCircle className="w-4 h-4" />
                      Approve Batch
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition text-sm font-medium">
                      <XCircle className="w-4 h-4" />
                      Reject Batch
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quality Standards Section */}
      <div className="mt-6 bg-white rounded-xl shadow-sm border-2 border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Quality Standards & Compliance</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border-2 border-gray-200 rounded-xl p-4">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              Testing Requirements
            </h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• Visual inspection for defects</li>
              <li>• Scent throw strength verification</li>
              <li>• 2-hour burn test for evenness</li>
              <li>• Wick centering accuracy check</li>
              <li>• Container integrity assessment</li>
              <li>• Label accuracy and placement</li>
            </ul>
          </div>

          <div className="border-2 border-gray-200 rounded-xl p-4">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-yellow-500" />
              Compliance Checklist
            </h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                ASTM F2058 flammability standards
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                IFRA fragrance guidelines
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                Warning label requirements
              </li>
              <li className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-gray-400" />
                California Prop 65 compliance
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    </Tooltip.Provider>
  );
}
