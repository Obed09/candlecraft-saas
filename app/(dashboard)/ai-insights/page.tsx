"use client";

import { useState } from "react";
import { Sparkles, TrendingUp, Lightbulb, Package, DollarSign, AlertCircle, BarChart3, Zap, HelpCircle } from "lucide-react";
import * as Tooltip from '@radix-ui/react-tooltip';

interface Recommendation {
  id: string;
  type: 'inventory' | 'recipe' | 'pricing' | 'production';
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  confidence: number;
}

interface Insight {
  id: string;
  category: string;
  metric: string;
  value: string;
  trend: 'up' | 'down' | 'stable';
  change: string;
}

export default function AIInsightsPage() {
  const [activeTab, setActiveTab] = useState<'recommendations' | 'insights' | 'forecasts'>('recommendations');

  const recommendations: Recommendation[] = [
    {
      id: '1',
      type: 'inventory',
      title: 'Restock Lavender Essential Oil',
      description: 'Based on sales trends and current inventory levels, you\'ll run out of Lavender Essential Oil in 12 days. Consider ordering 500ml to avoid stockouts during peak season.',
      impact: 'high',
      confidence: 94
    },
    {
      id: '2',
      type: 'recipe',
      title: 'Optimize Vanilla Dream Recipe',
      description: 'Analysis shows customers prefer stronger vanilla scent. Increase fragrance load from 8% to 10% to improve satisfaction and reduce returns.',
      impact: 'medium',
      confidence: 87
    },
    {
      id: '3',
      type: 'pricing',
      title: 'Adjust Citrus Burst Pricing',
      description: 'Market analysis suggests your Citrus Burst candle is priced 15% below competitors. Consider increasing price from $22.99 to $26.49 to maximize profit.',
      impact: 'high',
      confidence: 91
    },
    {
      id: '4',
      type: 'production',
      title: 'Increase Seasonal Production',
      description: 'Historical data shows 40% sales increase in next 30 days. Recommend producing 200 additional units of top sellers to meet demand.',
      impact: 'high',
      confidence: 89
    },
    {
      id: '5',
      type: 'inventory',
      title: 'Reduce Eucalyptus Mint Stock',
      description: 'This product has slow movement. Current stock will last 90+ days. Reduce next order quantity by 30% to improve cash flow.',
      impact: 'low',
      confidence: 76
    }
  ];

  const insights: Insight[] = [
    {
      id: '1',
      category: 'Sales',
      metric: 'Revenue Growth',
      value: '$12,450',
      trend: 'up',
      change: '+23.5%'
    },
    {
      id: '2',
      category: 'Products',
      metric: 'Best Seller',
      value: 'Lavender Bliss',
      trend: 'up',
      change: '+15.2%'
    },
    {
      id: '3',
      category: 'Efficiency',
      metric: 'Production Time',
      value: '4.2 hrs/batch',
      trend: 'down',
      change: '-8.3%'
    },
    {
      id: '4',
      category: 'Inventory',
      metric: 'Turnover Rate',
      value: '6.8x/year',
      trend: 'up',
      change: '+12.1%'
    },
    {
      id: '5',
      category: 'Quality',
      metric: 'Defect Rate',
      value: '1.2%',
      trend: 'down',
      change: '-2.3%'
    },
    {
      id: '6',
      category: 'Customer',
      metric: 'Satisfaction',
      value: '4.7/5.0',
      trend: 'up',
      change: '+0.3'
    }
  ];

  const forecasts = [
    {
      month: 'January 2025',
      predictedSales: 2850,
      predictedRevenue: 38400,
      confidence: 92
    },
    {
      month: 'February 2025',
      predictedSales: 3200,
      predictedRevenue: 43200,
      confidence: 88
    },
    {
      month: 'March 2025',
      predictedSales: 2950,
      predictedRevenue: 39800,
      confidence: 85
    }
  ];

  const getImpactColor = (impact: string) => {
    const colors = {
      high: 'bg-red-100 text-red-700 border-red-200',
      medium: 'bg-yellow-100 text-yellow-700 border-yellow-200',
      low: 'bg-blue-100 text-blue-700 border-blue-200'
    };
    return colors[impact as keyof typeof colors];
  };

  const getTypeIcon = (type: string) => {
    const icons = {
      inventory: <Package className="w-5 h-5" />,
      recipe: <Lightbulb className="w-5 h-5" />,
      pricing: <DollarSign className="w-5 h-5" />,
      production: <Zap className="w-5 h-5" />
    };
    return icons[type as keyof typeof icons];
  };

  const getTrendIcon = (trend: string) => {
    if (trend === 'up') return <TrendingUp className="w-5 h-5 text-green-500" />;
    if (trend === 'down') return <TrendingUp className="w-5 h-5 text-red-500 rotate-180" />;
    return <div className="w-5 h-5 text-gray-400">—</div>;
  };

  return (
    <Tooltip.Provider delayDuration={200}>
    <div className="p-8 max-w-7xl">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <Sparkles className="w-8 h-8 text-purple-600" />
              AI Insights & Recommendations
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
                    Get intelligent analytics and AI-powered recommendations. Receive insights on inventory optimization, pricing strategies, production planning, and sales forecasting.
                    <Tooltip.Arrow className="fill-white" />
                  </Tooltip.Content>
                </Tooltip.Portal>
              </Tooltip.Root>
            </h1>
            <p className="text-gray-600 mt-2">Intelligent analytics powered by machine learning</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-4 py-2 rounded-lg font-medium text-sm shadow-lg">
              <Sparkles className="w-4 h-4 inline-block mr-2" />
              AI Powered
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-gradient-to-br from-purple-500 to-indigo-600 text-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 mb-1 text-sm">Active Recommendations</p>
                <p className="text-4xl font-bold">{recommendations.length}</p>
              </div>
              <Lightbulb className="w-12 h-12 opacity-30" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border-2 border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 mb-1 text-sm">High Impact</p>
                <p className="text-3xl font-bold text-gray-900">
                  {recommendations.filter(r => r.impact === 'high').length}
                </p>
              </div>
              <AlertCircle className="w-10 h-10 text-red-500 opacity-20" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border-2 border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 mb-1 text-sm">Avg Confidence</p>
                <p className="text-3xl font-bold text-gray-900">
                  {Math.round(recommendations.reduce((acc, r) => acc + r.confidence, 0) / recommendations.length)}%
                </p>
              </div>
              <BarChart3 className="w-10 h-10 text-purple-500 opacity-20" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border-2 border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 mb-1 text-sm">Data Analyzed</p>
                <p className="text-3xl font-bold text-gray-900">12.4K</p>
              </div>
              <Sparkles className="w-10 h-10 text-blue-500 opacity-20" />
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border-2 border-gray-200">
        <div className="flex border-b">
          <button
            onClick={() => setActiveTab('recommendations')}
            className={`flex-1 px-6 py-4 font-medium text-sm transition ${
              activeTab === 'recommendations'
                ? 'text-purple-600 border-b-2 border-purple-600 bg-purple-50'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            <Lightbulb className="w-4 h-4 inline-block mr-2" />
            Recommendations
          </button>
          <button
            onClick={() => setActiveTab('insights')}
            className={`flex-1 px-6 py-4 font-medium text-sm transition ${
              activeTab === 'insights'
                ? 'text-purple-600 border-b-2 border-purple-600 bg-purple-50'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            <TrendingUp className="w-4 h-4 inline-block mr-2" />
            Business Insights
          </button>
          <button
            onClick={() => setActiveTab('forecasts')}
            className={`flex-1 px-6 py-4 font-medium text-sm transition ${
              activeTab === 'forecasts'
                ? 'text-purple-600 border-b-2 border-purple-600 bg-purple-50'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            <BarChart3 className="w-4 h-4 inline-block mr-2" />
            Forecasts
          </button>
        </div>

        {/* Recommendations Tab */}
        {activeTab === 'recommendations' && (
          <div className="p-6">
            <div className="space-y-4">
              {recommendations.map((rec) => (
                <div key={rec.id} className="border-2 border-gray-200 rounded-xl p-6 hover:border-purple-300 transition bg-gradient-to-r from-white to-purple-50">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600 flex-shrink-0">
                      {getTypeIcon(rec.type)}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-1">{rec.title}</h3>
                          <p className="text-sm text-gray-700">{rec.description}</p>
                        </div>
                        <div className="flex flex-col items-end gap-2 ml-4">
                          <span className={`px-3 py-1 text-xs font-medium rounded-full border ${getImpactColor(rec.impact)}`}>
                            {rec.impact.charAt(0).toUpperCase() + rec.impact.slice(1)} Impact
                          </span>
                          <div className="text-sm text-gray-600">
                            <span className="font-semibold text-purple-600">{rec.confidence}%</span> confidence
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-3 mt-4">
                        <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition text-sm font-medium">
                          Apply Recommendation
                        </button>
                        <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition text-sm font-medium">
                          Learn More
                        </button>
                        <button className="px-4 py-2 text-gray-500 hover:text-gray-700 transition text-sm font-medium">
                          Dismiss
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Insights Tab */}
        {activeTab === 'insights' && (
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {insights.map((insight) => (
                <div key={insight.id} className="border-2 border-gray-200 rounded-xl p-6 hover:border-purple-300 transition">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">{insight.category}</p>
                      <p className="text-sm font-medium text-gray-900">{insight.metric}</p>
                    </div>
                    {getTrendIcon(insight.trend)}
                  </div>

                  <div className="flex items-end justify-between">
                    <p className="text-3xl font-bold text-gray-900">{insight.value}</p>
                    <span className={`text-sm font-medium ${
                      insight.trend === 'up' ? 'text-green-600' : 
                      insight.trend === 'down' ? 'text-red-600' : 
                      'text-gray-600'
                    }`}>
                      {insight.change}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Forecasts Tab */}
        {activeTab === 'forecasts' && (
          <div className="p-6">
            <div className="space-y-4">
              {forecasts.map((forecast, index) => (
                <div key={index} className="border-2 border-gray-200 rounded-xl p-6 hover:border-purple-300 transition">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">{forecast.month}</h3>
                    <span className="text-sm text-gray-600">
                      <span className="font-semibold text-purple-600">{forecast.confidence}%</span> confidence
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Predicted Sales</p>
                      <p className="text-3xl font-bold text-gray-900">{forecast.predictedSales.toLocaleString()}</p>
                      <p className="text-sm text-gray-500 mt-1">units</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Predicted Revenue</p>
                      <p className="text-3xl font-bold text-gray-900">${forecast.predictedRevenue.toLocaleString()}</p>
                      <p className="text-sm text-gray-500 mt-1">USD</p>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-purple-500 to-indigo-600 h-2 rounded-full"
                        style={{ width: `${forecast.confidence}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 bg-blue-50 border-2 border-blue-200 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-blue-900 mb-1">AI-Powered Forecasting</p>
                  <p className="text-sm text-blue-700">
                    Predictions based on historical sales data, seasonality patterns, market trends, and 
                    external factors. Updated daily with latest data.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
    </Tooltip.Provider>
  );
}
