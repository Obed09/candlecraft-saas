'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Sparkles, TrendingUp, AlertTriangle, Lightbulb, Target, DollarSign, Users, Calendar } from 'lucide-react'
import { AIAnalysisResult } from '@/lib/aiScentAnalysis'

interface AITestResultsProps {
  analysis: AIAnalysisResult;
  tier: 'free' | 'starter' | 'pro' | 'business';
  recipeName?: string;
  onUpgrade?: () => void;
}

export function AITestResults({ analysis, tier, recipeName, onUpgrade }: AITestResultsProps) {
  
  if (!analysis.valid) {
    return (
      <div className="bg-red-50 dark:bg-red-900/20 border-2 border-red-300 dark:border-red-700 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-2">
          <AlertTriangle className="w-6 h-6 text-red-600" />
          <h3 className="font-bold text-red-900 dark:text-red-100 text-lg">Validation Error</h3>
        </div>
        <p className="text-red-700 dark:text-red-300">{analysis.validationMessage}</p>
      </div>
    );
  }

  const showUpgradePrompt = tier === 'free';
  const isProOrBetter = tier === 'pro' || tier === 'business';
  const isBusiness = tier === 'business';

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-6 text-white">
        <div className="flex items-center gap-3 mb-2">
          <Sparkles className="w-8 h-8" />
          <h2 className="text-2xl font-bold">AI Scent Analysis</h2>
          <Badge className="bg-white/20 text-white border-white/40">
            {tier.toUpperCase()} TIER
          </Badge>
        </div>
        {recipeName && (
          <p className="text-purple-100 text-lg">Analysis for: {recipeName}</p>
        )}
      </div>

      {/* Basic Analysis - Available to All */}
      <Card className="border-2 border-purple-200 dark:border-purple-800">
        <CardHeader className="bg-purple-50 dark:bg-purple-900/20">
          <CardTitle className="text-purple-900 dark:text-purple-100 flex items-center gap-2">
            <Sparkles className="w-5 h-5" />
            Scent Profile
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border-2 border-purple-200 dark:border-purple-700">
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Profile</div>
              <div className="text-xl font-bold text-purple-700 dark:text-purple-300">
                {analysis.profile}
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border-2 border-orange-200 dark:border-orange-700">
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Strength</div>
              <div className="text-xl font-bold text-orange-600 dark:text-orange-400">
                {analysis.strength}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Compatibility Check - Starter+ */}
      {tier !== 'free' && analysis.compatibility && (
        <Card className="border-2 border-blue-200 dark:border-blue-800">
          <CardHeader className="bg-blue-50 dark:bg-blue-900/20">
            <CardTitle className="text-blue-900 dark:text-blue-100 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              Compatibility Analysis
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">Compatibility Score</span>
                <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {analysis.compatibility.score.toFixed(1)}/10
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                <div
                  className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all"
                  style={{ width: `${analysis.compatibility.score * 10}%` }}
                />
              </div>
            </div>

            {analysis.compatibility.warnings.length > 0 && (
              <div className="mb-4 bg-yellow-50 dark:bg-yellow-900/20 border-2 border-yellow-300 dark:border-yellow-700 rounded-lg p-4">
                <h4 className="font-semibold text-yellow-900 dark:text-yellow-100 mb-2 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" />
                  Warnings
                </h4>
                <ul className="space-y-1">
                  {analysis.compatibility.warnings.map((warning, idx) => (
                    <li key={idx} className="text-sm text-yellow-800 dark:text-yellow-200">
                      {warning}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {analysis.compatibility.recommendations.length > 0 && (
              <div className="bg-green-50 dark:bg-green-900/20 border-2 border-green-300 dark:border-green-700 rounded-lg p-4">
                <h4 className="font-semibold text-green-900 dark:text-green-100 mb-2 flex items-center gap-2">
                  <Lightbulb className="w-4 h-4" />
                  Recommendations
                </h4>
                <ul className="space-y-1">
                  {analysis.compatibility.recommendations.map((rec, idx) => (
                    <li key={idx} className="text-sm text-green-800 dark:text-green-200">
                      {rec}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Performance Metrics - Pro+ */}
      {isProOrBetter && analysis.performance && (
        <Card className="border-2 border-indigo-200 dark:border-indigo-800">
          <CardHeader className="bg-indigo-50 dark:bg-indigo-900/20">
            <CardTitle className="text-indigo-900 dark:text-indigo-100 flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Performance Predictions
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg text-center">
                <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">Cold Throw</div>
                <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                  {analysis.performance.coldThrow.toFixed(1)}
                </div>
                <div className="text-xs text-gray-500">/10</div>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg text-center">
                <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">Hot Throw</div>
                <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                  {analysis.performance.hotThrow.toFixed(1)}
                </div>
                <div className="text-xs text-gray-500">/10</div>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg text-center">
                <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">Longevity</div>
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {analysis.performance.longevity}
                </div>
                <div className="text-xs text-gray-500">hours</div>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg text-center">
                <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">Complexity</div>
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                  {analysis.performance.complexityScore.toFixed(1)}
                </div>
                <div className="text-xs text-gray-500">/10</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Market Analysis - Pro+ */}
      {isProOrBetter && analysis.market && (
        <Card className="border-2 border-pink-200 dark:border-pink-800">
          <CardHeader className="bg-pink-50 dark:bg-pink-900/20">
            <CardTitle className="text-pink-900 dark:text-pink-100 flex items-center gap-2">
              <Target className="w-5 h-5" />
              Market Analysis
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="bg-gradient-to-br from-yellow-100 to-amber-100 dark:from-yellow-900/40 dark:to-amber-900/40 p-5 rounded-lg border-2 border-yellow-400 dark:border-yellow-600">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-semibold text-yellow-900 dark:text-yellow-100 mb-1">
                      Popularity Score
                    </div>
                    <div className="text-3xl font-bold text-yellow-700 dark:text-yellow-300">
                      {analysis.market.popularityScore.toFixed(1)}/10
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className={`w-3 h-3 rounded-full ${
                          i < analysis.market.popularityScore / 2
                            ? 'bg-yellow-500'
                            : 'bg-gray-300 dark:bg-gray-600'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 p-5 rounded-lg border-2 border-pink-200 dark:border-pink-700">
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-2 flex items-center gap-2">
                  <DollarSign className="w-4 h-4" />
                  Price Point
                </div>
                <div className="text-2xl font-bold text-pink-600 dark:text-pink-400">
                  {analysis.market.pricePoint}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-2 flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Target Audience
                </div>
                <div className="flex flex-wrap gap-2">
                  {analysis.market.targetAudience.map((audience, idx) => (
                    <Badge key={idx} variant="secondary" className="bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300">
                      {audience}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-2 flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Seasonality
                </div>
                <div className="text-lg font-semibold text-indigo-600 dark:text-indigo-400">
                  {analysis.market.seasonality}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Comparisons - Pro+ */}
      {isProOrBetter && analysis.comparisons && analysis.comparisons.similarTo.length > 0 && (
        <Card className="border-2 border-emerald-200 dark:border-emerald-800">
          <CardHeader className="bg-emerald-50 dark:bg-emerald-900/20">
            <CardTitle className="text-emerald-900 dark:text-emerald-100 flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Market Comparisons
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="mb-4">
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Similar To:</div>
              <div className="flex flex-wrap gap-2">
                {analysis.comparisons.similarTo.map((comp, idx) => (
                  <Badge key={idx} className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300">
                    {comp}
                  </Badge>
                ))}
              </div>
            </div>

            {analysis.comparisons.competitorMatch && (
              <div className="mb-4">
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Competitor Category:</div>
                <div className="text-lg font-semibold text-emerald-700 dark:text-emerald-300">
                  {analysis.comparisons.competitorMatch}
                </div>
              </div>
            )}

            <div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Uniqueness Score:</div>
              <div className="flex items-center gap-3">
                <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-emerald-500 to-emerald-600 h-3 rounded-full"
                    style={{ width: `${analysis.comparisons.uniquenessScore * 10}%` }}
                  />
                </div>
                <span className="text-xl font-bold text-emerald-600 dark:text-emerald-400">
                  {analysis.comparisons.uniquenessScore.toFixed(1)}/10
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Business Insights - Business Tier Only */}
      {isBusiness && analysis.business && (
        <Card className="border-2 border-amber-200 dark:border-amber-800">
          <CardHeader className="bg-amber-50 dark:bg-amber-900/20">
            <CardTitle className="text-amber-900 dark:text-amber-100 flex items-center gap-2">
              <DollarSign className="w-5 h-5" />
              Business Insights
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6 space-y-4">
            {analysis.business.costOptimization.length > 0 && (
              <div className="bg-green-50 dark:bg-green-900/20 border-2 border-green-300 dark:border-green-700 rounded-lg p-4">
                <h4 className="font-semibold text-green-900 dark:text-green-100 mb-2">Cost Optimization</h4>
                <ul className="space-y-1">
                  {analysis.business.costOptimization.map((tip, idx) => (
                    <li key={idx} className="text-sm text-green-800 dark:text-green-200">
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {analysis.business.scalingRecommendations.length > 0 && (
              <div className="bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-300 dark:border-blue-700 rounded-lg p-4">
                <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">Scaling Recommendations</h4>
                <ul className="space-y-1">
                  {analysis.business.scalingRecommendations.map((rec, idx) => (
                    <li key={idx} className="text-sm text-blue-800 dark:text-blue-200">
                      {rec}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {analysis.business.marketTrends.length > 0 && (
              <div className="bg-purple-50 dark:bg-purple-900/20 border-2 border-purple-300 dark:border-purple-700 rounded-lg p-4">
                <h4 className="font-semibold text-purple-900 dark:text-purple-100 mb-2">2026 Market Trends</h4>
                <ul className="space-y-1">
                  {analysis.business.marketTrends.map((trend, idx) => (
                    <li key={idx} className="text-sm text-purple-800 dark:text-purple-200">
                      {trend}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {analysis.business.customerAppeal && (
              <div className="bg-pink-50 dark:bg-pink-900/20 border-2 border-pink-300 dark:border-pink-700 rounded-lg p-4">
                <h4 className="font-semibold text-pink-900 dark:text-pink-100 mb-3">Customer Appeal Profile</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div>
                    <div className="text-xs text-pink-700 dark:text-pink-300 mb-1 font-medium">Age Groups</div>
                    <div className="flex flex-wrap gap-1">
                      {analysis.business.customerAppeal.ageGroup.map((age, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {age}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-pink-700 dark:text-pink-300 mb-1 font-medium">Interests</div>
                    <div className="flex flex-wrap gap-1">
                      {analysis.business.customerAppeal.interests.map((interest, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {interest}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-pink-700 dark:text-pink-300 mb-1 font-medium">Occasions</div>
                    <div className="flex flex-wrap gap-1">
                      {analysis.business.customerAppeal.occasions.map((occasion, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {occasion}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Upgrade Prompt for Free Users */}
      {showUpgradePrompt && (
        <Card className="border-2 border-gradient-to-r from-purple-400 to-pink-400 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
          <CardContent className="pt-6">
            <div className="text-center">
              <Sparkles className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-purple-900 dark:text-purple-100 mb-2">
                Unlock Full AI Analysis
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Upgrade to get compatibility checks, performance predictions, market analysis, and more!
              </p>
              <div className="grid grid-cols-2 gap-3 mb-6 text-left max-w-md mx-auto">
                <div className="flex items-start gap-2">
                  <div className="text-green-600 mt-1">✓</div>
                  <div className="text-sm text-gray-700 dark:text-gray-300">Compatibility warnings</div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="text-green-600 mt-1">✓</div>
                  <div className="text-sm text-gray-700 dark:text-gray-300">Performance metrics</div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="text-green-600 mt-1">✓</div>
                  <div className="text-sm text-gray-700 dark:text-gray-300">Market analysis</div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="text-green-600 mt-1">✓</div>
                  <div className="text-sm text-gray-700 dark:text-gray-300">Business insights</div>
                </div>
              </div>
              {onUpgrade && (
                <button
                  onClick={onUpgrade}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-lg hover:shadow-xl"
                >
                  Upgrade Now →
                </button>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
