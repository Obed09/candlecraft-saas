import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { analyzeScent, ScentIngredient, SubscriptionTier } from '@/lib/aiScentAnalysis';
import { getUserSubscription } from '@/lib/subscription';
import { prisma } from '@/lib/prisma';

/**
 * POST /api/recipes/analyze
 * Analyze a scent recipe with AI
 */
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.email) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get user from database
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: {
        id: true,
        business: {
          select: {
            subscription: {
              select: {
                plan: true,
                status: true
              }
            }
          }
        }
      }
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Get subscription tier
    const tier = (user.business?.subscription?.plan || 'free') as SubscriptionTier;

    // Parse request body
    const body = await request.json();
    const { ingredients, recipeName } = body;

    if (!ingredients || !Array.isArray(ingredients)) {
      return NextResponse.json(
        { error: 'Invalid ingredients format. Expected array of {name, percentage}' },
        { status: 400 }
      );
    }

    // Convert to ScentIngredient format
    const scentIngredients: ScentIngredient[] = ingredients.map((ing: any) => ({
      name: ing.name || ing.ingredient || '',
      percentage: parseFloat(ing.percentage || ing.percent || 0)
    }));

    // Check if user has AI features
    if (tier === 'free') {
      // Free users get limited analysis
      const analysis = analyzeScent(scentIngredients, 'free');
      
      return NextResponse.json({
        success: true,
        analysis,
        tier: 'free',
        upgradeRequired: true,
        message: 'Upgrade to Starter plan for AI compatibility checks and recommendations!',
        features: {
          available: ['Basic profile analysis', 'Scent strength detection'],
          locked: [
            'Compatibility warnings',
            'Performance predictions',
            'Market analysis',
            'Business insights'
          ]
        }
      });
    }

    // Perform full AI analysis for paid users
    const analysis = analyzeScent(scentIngredients, tier);

    // TODO: Add recipe analysis tracking when RecipeAnalysis model is added to schema

    return NextResponse.json({
      success: true,
      analysis,
      tier,
      upgradeRequired: false,
      features: {
        available: getAvailableFeatures(tier),
        locked: getLockedFeatures(tier)
      }
    });

  } catch (error: any) {
    console.error('Error analyzing recipe:', error);
    return NextResponse.json(
      { error: 'Failed to analyze recipe', details: error.message },
      { status: 500 }
    );
  }
}

function getAvailableFeatures(tier: SubscriptionTier): string[] {
  const features = ['Basic profile analysis', 'Scent strength detection'];
  
  if (tier === 'starter' || tier === 'pro' || tier === 'business') {
    features.push(
      'Compatibility warnings',
      'Scent recommendations',
      'Auto test results'
    );
  }
  
  if (tier === 'pro' || tier === 'business') {
    features.push(
      'Performance predictions (throw & longevity)',
      'Market analysis',
      'Competitor comparisons',
      'Popularity scoring'
    );
  }
  
  if (tier === 'business') {
    features.push(
      'Cost optimization suggestions',
      'Scaling recommendations',
      'Market trends analysis',
      'Customer targeting insights'
    );
  }
  
  return features;
}

function getLockedFeatures(tier: SubscriptionTier): string[] {
  if (tier === 'business') {
    return []; // All features unlocked
  }
  
  if (tier === 'pro') {
    return [
      'Cost optimization suggestions',
      'Scaling recommendations',
      'Advanced customer insights'
    ];
  }
  
  if (tier === 'starter') {
    return [
      'Performance predictions',
      'Market analysis',
      'Competitor comparisons',
      'Cost optimization',
      'Business insights'
    ];
  }
  
  return [
    'Compatibility warnings',
    'Performance predictions',
    'Market analysis',
    'Business insights',
    'Cost optimization'
  ];
}
