/**
 * AI Scent Analysis Utility
 * Provides intelligent scent blend analysis and predictions
 * Works across both AI Blender and Recipe Database
 */

export interface ScentIngredient {
  name: string;
  percentage: number;
}

export interface AIAnalysisResult {
  // Basic Analysis (Free tier)
  profile: string;
  strength: 'LIGHT' | 'MEDIUM' | 'STRONG';
  totalPercentage: number;
  valid: boolean;
  validationMessage?: string;
  
  // Starter tier features
  compatibility: {
    score: number; // 0-10
    warnings: string[];
    recommendations: string[];
  };
  
  // Pro tier features (Advanced)
  performance: {
    coldThrow: number; // 0-10
    hotThrow: number; // 0-10
    longevity: number; // hours estimate
    complexityScore: number; // 0-10
  };
  
  market: {
    popularityScore: number; // 0-10
    targetAudience: string[];
    seasonality: string;
    pricePoint: 'Budget' | 'Mid-Range' | 'Premium' | 'Luxury';
  };
  
  comparisons: {
    similarTo: string[];
    competitorMatch: string;
    uniquenessScore: number; // 0-10
  };
  
  // Business tier features (Everything)
  business: {
    costOptimization: string[];
    scalingRecommendations: string[];
    marketTrends: string[];
    customerAppeal: {
      ageGroup: string[];
      interests: string[];
      occasions: string[];
    };
  };
}

export type SubscriptionTier = 'free' | 'starter' | 'pro' | 'business';

/**
 * Analyze a scent blend with AI
 */
export function analyzeScent(
  ingredients: ScentIngredient[],
  tier: SubscriptionTier = 'free'
): AIAnalysisResult {
  
  // Validate percentages
  const totalPercentage = ingredients.reduce((sum, ing) => sum + ing.percentage, 0);
  const valid = Math.abs(totalPercentage - 100) < 0.1;
  
  if (!valid) {
    return {
      profile: '',
      strength: 'MEDIUM',
      totalPercentage,
      valid: false,
      validationMessage: `Percentages must equal 100% (currently ${totalPercentage.toFixed(1)}%)`,
      compatibility: { score: 0, warnings: [], recommendations: [] },
      performance: { coldThrow: 0, hotThrow: 0, longevity: 0, complexityScore: 0 },
      market: { popularityScore: 0, targetAudience: [], seasonality: '', pricePoint: 'Mid-Range' },
      comparisons: { similarTo: [], competitorMatch: '', uniquenessScore: 0 },
      business: { costOptimization: [], scalingRecommendations: [], marketTrends: [], customerAppeal: { ageGroup: [], interests: [], occasions: [] } }
    };
  }

  // Analyze scent profile
  const scents = ingredients.map(i => i.name.toLowerCase());
  const analysis = detectScentProfile(scents, ingredients);
  
  // Calculate strength based on dominant scent
  const dominantScent = ingredients.reduce((max, ing) => 
    ing.percentage > max.percentage ? ing : max, ingredients[0]
  );
  
  let strength: 'LIGHT' | 'MEDIUM' | 'STRONG' = 'MEDIUM';
  if (dominantScent.percentage >= 60) {
    strength = 'STRONG';
  } else if (dominantScent.percentage <= 30) {
    strength = 'LIGHT';
  }

  // Base analysis (available to all tiers)
  const result: AIAnalysisResult = {
    profile: analysis.profile,
    strength,
    totalPercentage,
    valid: true,
    compatibility: analyzeCompatibility(scents, ingredients, tier),
    performance: tier === 'free' ? 
      { coldThrow: 0, hotThrow: 0, longevity: 0, complexityScore: 0 } :
      analyzePerformance(scents, ingredients, strength),
    market: tier === 'free' ?
      { popularityScore: 0, targetAudience: [], seasonality: '', pricePoint: 'Mid-Range' } :
      analyzeMarket(analysis, scents, ingredients),
    comparisons: tier === 'free' ?
      { similarTo: [], competitorMatch: '', uniquenessScore: 0 } :
      analyzeComparisons(analysis, scents),
    business: tier === 'business' ?
      analyzeBusinessInsights(scents, ingredients, analysis) :
      { costOptimization: [], scalingRecommendations: [], marketTrends: [], customerAppeal: { ageGroup: [], interests: [], occasions: [] } }
  };

  return result;
}

/**
 * Detect the main scent profile
 */
function detectScentProfile(scents: string[], ingredients: ScentIngredient[]): { 
  profile: string; 
  category: string;
  description: string;
} {
  // Scent detection patterns
  const hasLavender = scents.some(s => s.includes('lavender'));
  const hasVanilla = scents.some(s => s.includes('vanilla'));
  const hasCitrus = scents.some(s => s.includes('citrus') || s.includes('lemon') || s.includes('orange') || s.includes('lime') || s.includes('grapefruit'));
  const hasChamomile = scents.some(s => s.includes('chamomile'));
  const hasCoffee = scents.some(s => s.includes('coffee') || s.includes('espresso'));
  const hasSandalwood = scents.some(s => s.includes('sandalwood') || s.includes('cedar'));
  const hasRose = scents.some(s => s.includes('rose'));
  const hasMint = scents.some(s => s.includes('mint') || s.includes('eucalyptus'));
  const hasCinnamon = scents.some(s => s.includes('cinnamon'));
  const hasChocolate = scents.some(s => s.includes('chocolate') || s.includes('cocoa'));
  const hasFruit = scents.some(s => s.includes('berry') || s.includes('peach') || s.includes('apple') || s.includes('mango'));
  const hasWood = scents.some(s => s.includes('wood') || s.includes('oak') || s.includes('pine') || s.includes('cedar'));

  // Complex blend detection
  if (hasLavender && hasVanilla && hasChamomile) {
    return {
      profile: 'CALMING HERBAL SWEET',
      category: 'Spa/Wellness',
      description: 'A soothing blend perfect for relaxation and sleep'
    };
  }
  
  if (hasCitrus && hasVanilla) {
    return {
      profile: 'FRESH SWEET UPLIFTING',
      category: 'Clean/Fresh',
      description: 'Bright and cheerful with a creamy base'
    };
  }
  
  if (hasCoffee && hasVanilla) {
    return {
      profile: 'GOURMAND COZY ENERGIZING',
      category: 'Gourmand',
      description: 'Rich coffee house ambiance'
    };
  }
  
  if (hasSandalwood && hasVanilla) {
    return {
      profile: 'WARM WOODSY LUXURIOUS',
      category: 'Woody/Oriental',
      description: 'Sophisticated and elegant'
    };
  }
  
  if (hasLavender && hasMint) {
    return {
      profile: 'FRESH HERBAL INVIGORATING',
      category: 'Herbal/Spa',
      description: 'Clean spa-like freshness'
    };
  }
  
  if (hasRose && hasVanilla) {
    return {
      profile: 'FLORAL ROMANTIC ELEGANT',
      category: 'Floral',
      description: 'Timeless feminine sophistication'
    };
  }
  
  if (hasCinnamon && hasVanilla) {
    return {
      profile: 'SPICY SWEET COMFORTING',
      category: 'Gourmand/Spice',
      description: 'Warm bakery indulgence'
    };
  }

  if (hasChocolate && hasCoffee) {
    return {
      profile: 'RICH DECADENT INDULGENT',
      category: 'Gourmand',
      description: 'Luxurious dessert experience'
    };
  }

  if (hasFruit && hasVanilla) {
    return {
      profile: 'FRUITY SWEET PLAYFUL',
      category: 'Fruity',
      description: 'Fun and approachable'
    };
  }

  if (hasWood && !hasVanilla) {
    return {
      profile: 'EARTHY MASCULINE GROUNDING',
      category: 'Woody',
      description: 'Natural forest ambiance'
    };
  }

  // Default profiles
  if (hasCitrus) {
    return {
      profile: 'BRIGHT ENERGIZING CLEAN',
      category: 'Citrus',
      description: 'Fresh and uplifting'
    };
  }
  
  if (hasVanilla) {
    return {
      profile: 'WARM COMFORTING SWEET',
      category: 'Gourmand',
      description: 'Classic vanilla comfort'
    };
  }

  return {
    profile: 'UNIQUE CUSTOM BLEND',
    category: 'Artisan',
    description: 'One-of-a-kind creation'
  };
}

/**
 * Analyze scent compatibility (Starter tier+)
 */
function analyzeCompatibility(
  scents: string[], 
  ingredients: ScentIngredient[],
  tier: SubscriptionTier
): { score: number; warnings: string[]; recommendations: string[] } {
  
  const warnings: string[] = [];
  const recommendations: string[] = [];
  let score = 8.0;

  // Check for problematic combinations
  const hasCitrus = scents.some(s => s.includes('citrus') || s.includes('lemon') || s.includes('orange'));
  const hasVanilla = scents.some(s => s.includes('vanilla'));
  const hasMint = scents.some(s => s.includes('mint') || s.includes('eucalyptus'));
  const hasCinnamon = scents.some(s => s.includes('cinnamon'));
  const hasRose = scents.some(s => s.includes('rose'));
  const hasLavender = scents.some(s => s.includes('lavender'));

  // Citrus + Vanilla warning
  if (hasCitrus && hasVanilla) {
    warnings.push('⚠️ Citrus and vanilla may separate during curing. Test thoroughly before production.');
    score -= 0.5;
  }

  // Too many dominant scents
  const dominantScents = ingredients.filter(i => i.percentage > 35);
  if (dominantScents.length > 2) {
    warnings.push('⚠️ Multiple dominant scents (>35%) may compete. Consider rebalancing.');
    score -= 1.0;
  }

  // Mint overpowering
  const mintScent = ingredients.find(i => i.name.toLowerCase().includes('mint') || i.name.toLowerCase().includes('eucalyptus'));
  if (mintScent && mintScent.percentage > 40) {
    warnings.push('⚠️ Mint at high concentration can overpower other notes. Consider reducing to 25-35%.');
    score -= 0.5;
  }

  // Recommendations (only for paid tiers)
  if (tier !== 'free') {
    if (hasLavender && !hasVanilla) {
      recommendations.push('💡 Add 10-15% vanilla to round out the lavender and add warmth.');
    }

    if (hasCinnamon && !hasVanilla && ingredients.length < 3) {
      recommendations.push('💡 Cinnamon pairs beautifully with vanilla or apple for a fuller profile.');
    }

    if (hasRose && ingredients.length === 1) {
      recommendations.push('💡 Pure rose can be intense. Consider adding 15-20% jasmine or peony.');
    }

    // Check for missing base notes
    const hasBaseNote = scents.some(s => 
      s.includes('vanilla') || s.includes('sandalwood') || s.includes('amber') || s.includes('musk')
    );
    
    if (!hasBaseNote && ingredients.length > 1) {
      recommendations.push('💡 Add a base note (vanilla, sandalwood, or amber) for better longevity.');
      score -= 0.3;
    }
  }

  return {
    score: Math.max(0, Math.min(10, score)),
    warnings,
    recommendations
  };
}

/**
 * Analyze performance metrics (Pro tier+)
 */
function analyzePerformance(
  scents: string[],
  ingredients: ScentIngredient[],
  strength: string
): { coldThrow: number; hotThrow: number; longevity: number; complexityScore: number } {
  
  let coldThrow = 6.0;
  let hotThrow = 7.0;
  let longevity = 35; // hours
  let complexityScore = ingredients.length * 1.5;

  // Adjust based on strength
  if (strength === 'STRONG') {
    coldThrow += 2.0;
    hotThrow += 1.5;
    longevity += 15;
  } else if (strength === 'LIGHT') {
    coldThrow -= 1.0;
    hotThrow -= 0.5;
    longevity -= 10;
  }

  // Citrus reduces longevity
  const hasCitrus = scents.some(s => s.includes('citrus') || s.includes('lemon') || s.includes('orange'));
  if (hasCitrus) {
    longevity -= 5;
    hotThrow -= 0.5;
  }

  // Vanilla/base notes increase longevity
  const hasBaseNotes = scents.some(s => 
    s.includes('vanilla') || s.includes('sandalwood') || s.includes('amber') || s.includes('musk')
  );
  if (hasBaseNotes) {
    longevity += 10;
    hotThrow += 1.0;
  }

  // Woody scents
  const hasWood = scents.some(s => s.includes('wood') || s.includes('cedar') || s.includes('pine'));
  if (hasWood) {
    longevity += 8;
    hotThrow += 0.8;
  }

  // Complexity
  complexityScore = Math.min(10, complexityScore);

  return {
    coldThrow: Math.max(0, Math.min(10, coldThrow)),
    hotThrow: Math.max(0, Math.min(10, hotThrow)),
    longevity: Math.max(20, Math.min(60, longevity)),
    complexityScore: Math.max(0, Math.min(10, complexityScore))
  };
}

/**
 * Analyze market potential (Pro tier+)
 */
function analyzeMarket(
  analysis: { profile: string; category: string; description: string },
  scents: string[],
  ingredients: ScentIngredient[]
): { popularityScore: number; targetAudience: string[]; seasonality: string; pricePoint: 'Budget' | 'Mid-Range' | 'Premium' | 'Luxury' } {
  
  let popularityScore = 7.5;
  const targetAudience: string[] = [];
  let seasonality = 'Year-Round';
  let pricePoint: 'Budget' | 'Mid-Range' | 'Premium' | 'Luxury' = 'Mid-Range';

  // Determine popularity based on profile
  if (analysis.category === 'Gourmand') {
    popularityScore = 9.0;
    targetAudience.push('Candle Enthusiasts', 'Home Decor Lovers', '25-45 Age Group');
    pricePoint = 'Mid-Range';
  } else if (analysis.category === 'Spa/Wellness') {
    popularityScore = 8.5;
    targetAudience.push('Wellness Seekers', 'Yoga Practitioners', 'Spa Lovers');
    pricePoint = 'Premium';
  } else if (analysis.category === 'Woody/Oriental') {
    popularityScore = 8.8;
    targetAudience.push('Men', 'Luxury Shoppers', 'Sophisticated Buyers');
    pricePoint = 'Luxury';
  } else if (analysis.category === 'Floral') {
    popularityScore = 8.2;
    targetAudience.push('Women', 'Romance Seekers', 'Gift Buyers');
    pricePoint = 'Mid-Range';
  } else if (analysis.category === 'Citrus' || analysis.category === 'Clean/Fresh') {
    popularityScore = 8.0;
    targetAudience.push('Young Professionals', 'Clean Living Advocates', 'Summer Lovers');
    pricePoint = 'Mid-Range';
    seasonality = 'Spring/Summer';
  }

  // Seasonal adjustments
  const hasCinnamon = scents.some(s => s.includes('cinnamon') || s.includes('spice'));
  const hasPumpkin = scents.some(s => s.includes('pumpkin'));
  const hasPine = scents.some(s => s.includes('pine') || s.includes('fir'));
  
  if (hasCinnamon || hasPumpkin) {
    seasonality = 'Fall/Winter';
    popularityScore += 0.5;
  }
  
  if (hasPine) {
    seasonality = 'Winter/Holiday';
    popularityScore += 0.3;
  }

  // Exotic ingredients increase price point
  const hasExotic = scents.some(s => 
    s.includes('oud') || s.includes('jasmine') || s.includes('tuberose') || s.includes('ylang')
  );
  if (hasExotic) {
    pricePoint = 'Luxury';
  }

  return {
    popularityScore: Math.max(0, Math.min(10, popularityScore)),
    targetAudience,
    seasonality,
    pricePoint
  };
}

/**
 * Analyze and compare to similar products (Pro tier+)
 */
function analyzeComparisons(
  analysis: { profile: string; category: string },
  scents: string[]
): { similarTo: string[]; competitorMatch: string; uniquenessScore: number } {
  
  const similarTo: string[] = [];
  let competitorMatch = '';
  let uniquenessScore = 7.0;

  // Map to known brands
  if (analysis.category === 'Spa/Wellness') {
    similarTo.push('Bath & Body Works "Stress Relief"', 'Yankee Candle "Spa Day"');
    competitorMatch = 'Premium Spa Collection';
  } else if (analysis.category === 'Gourmand') {
    similarTo.push('Yankee Candle "Vanilla Cupcake"', 'Bath & Body Works "Warm Vanilla Sugar"');
    competitorMatch = 'Sweet Indulgence Line';
  } else if (analysis.category === 'Woody/Oriental') {
    similarTo.push('Tom Ford "Santal Blush"', 'Le Labo "Santal 33"');
    competitorMatch = 'Luxury Fragrance Houses';
  } else if (analysis.category === 'Citrus') {
    similarTo.push('Jo Malone "Lime Basil & Mandarin"', 'Nest "Grapefruit"');
    competitorMatch = 'Fresh & Clean Collections';
  }

  // Calculate uniqueness
  if (scents.length >= 4) {
    uniquenessScore += 1.5;
  }
  
  const hasUncommon = scents.some(s => 
    s.includes('fig') || s.includes('cardamom') || s.includes('bergamot') || s.includes('vetiver')
  );
  if (hasUncommon) {
    uniquenessScore += 1.0;
  }

  return {
    similarTo,
    competitorMatch,
    uniquenessScore: Math.max(0, Math.min(10, uniquenessScore))
  };
}

/**
 * Advanced business insights (Business tier only)
 */
function analyzeBusinessInsights(
  scents: string[],
  ingredients: ScentIngredient[],
  analysis: { profile: string; category: string }
): { 
  costOptimization: string[];
  scalingRecommendations: string[];
  marketTrends: string[];
  customerAppeal: { ageGroup: string[]; interests: string[]; occasions: string[] };
} {
  
  const costOptimization: string[] = [];
  const scalingRecommendations: string[] = [];
  const marketTrends: string[] = [];

  // Cost optimization
  const hasVanilla = scents.some(s => s.includes('vanilla'));
  const vanillaIngredient = ingredients.find(i => i.name.toLowerCase().includes('vanilla'));
  
  if (hasVanilla && vanillaIngredient && vanillaIngredient.percentage > 40) {
    costOptimization.push('💰 Vanilla is expensive. Consider reducing to 30-35% and adding tonka bean for similar profile at lower cost.');
  }

  const hasCitrus = scents.some(s => s.includes('lemon') || s.includes('orange') || s.includes('citrus'));
  if (hasCitrus) {
    costOptimization.push('💰 Citrus oils are cost-effective. This blend has good profit margins.');
  }

  // Scaling recommendations
  if (ingredients.length <= 3) {
    scalingRecommendations.push('✅ Simple 3-ingredient blend is easy to scale and maintain consistency.');
  } else {
    scalingRecommendations.push('⚠️ 4+ ingredients require careful QC. Document exact procedures for consistency.');
  }

  scalingRecommendations.push('📦 Recommend minimum batch size of 50 units for cost efficiency.');
  scalingRecommendations.push('🏭 Source ingredients in bulk for 15-20% cost savings at scale.');

  // Market trends (2026)
  if (analysis.category === 'Spa/Wellness') {
    marketTrends.push('📈 Wellness candles up 23% YoY - strong market demand');
    marketTrends.push('🌱 Consider "clean ingredients" marketing angle');
  }
  
  if (analysis.category === 'Gourmand') {
    marketTrends.push('📈 Bakery scents remain evergreen bestsellers');
    marketTrends.push('🎁 High gift-giving potential - bundle opportunities');
  }

  marketTrends.push('🔥 Wooden wick option could boost premium appeal by 30%');
  marketTrends.push('♻️ Sustainable packaging resonates with 67% of buyers');

  // Customer appeal
  const customerAppeal = {
    ageGroup: [] as string[],
    interests: [] as string[],
    occasions: [] as string[]
  };

  if (analysis.category === 'Spa/Wellness') {
    customerAppeal.ageGroup = ['30-50', '50+'];
    customerAppeal.interests = ['Yoga', 'Meditation', 'Self-Care', 'Wellness'];
    customerAppeal.occasions = ['Bath Time', 'Bedtime', 'Meditation', 'Spa Day'];
  } else if (analysis.category === 'Gourmand') {
    customerAppeal.ageGroup = ['25-45', '18-30'];
    customerAppeal.interests = ['Baking', 'Cozy Living', 'Home Decor'];
    customerAppeal.occasions = ['Daily Use', 'Entertaining', 'Gift Giving'];
  } else if (analysis.category === 'Woody/Oriental') {
    customerAppeal.ageGroup = ['35-55', '50+'];
    customerAppeal.interests = ['Luxury', 'Sophistication', 'Men\'s Grooming'];
    customerAppeal.occasions = ['Office', 'Evening', 'Special Events'];
  }

  return {
    costOptimization,
    scalingRecommendations,
    marketTrends,
    customerAppeal
  };
}

/**
 * Get feature availability based on subscription tier
 */
export function getAIFeatureAvailability(tier: SubscriptionTier) {
  return {
    basicAnalysis: true, // All tiers
    compatibilityCheck: tier !== 'free',
    performanceMetrics: tier === 'pro' || tier === 'business',
    marketAnalysis: tier === 'pro' || tier === 'business',
    comparisons: tier === 'pro' || tier === 'business',
    businessInsights: tier === 'business',
    autoTestResults: tier !== 'free',
    costOptimization: tier === 'business'
  };
}
