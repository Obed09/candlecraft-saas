import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { analyzeScent, ScentIngredient, SubscriptionTier } from '@/lib/aiScentAnalysis';

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

    // Default to 'pro' tier for now - will be updated when subscription system is fully integrated
    const tier: SubscriptionTier = 'pro';

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

    // Perform AI analysis
    const analysis = analyzeScent(scentIngredients, tier);

    return NextResponse.json({
      success: true,
      analysis,
      tier,
      upgradeRequired: false
    });

  } catch (error: any) {
    console.error('Error analyzing recipe:', error);
    return NextResponse.json(
      { error: 'Failed to analyze recipe', details: error.message },
      { status: 500 }
    );
  }
}