import { NextRequest, NextResponse } from 'next/server';

// This route initiates Facebook OAuth
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const userId = searchParams.get('userId'); // Pass user ID to track who's connecting

  if (!userId) {
    return NextResponse.json({ error: 'User ID required' }, { status: 400 });
  }

  // Facebook App credentials (you'll add these to .env)
  const fbAppId = process.env.FACEBOOK_APP_ID;
  const redirectUri = `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/facebook/callback`;
  
  if (!fbAppId) {
    return NextResponse.json({ error: 'Facebook App ID not configured' }, { status: 500 });
  }

  // Permissions we need:
  // - pages_show_list: See list of Pages user manages
  // - pages_read_engagement: Read Page posts
  // - pages_manage_posts: Publish posts to Pages
  // - pages_read_user_content: Read user's posts for AI training
  const scope = [
    'pages_show_list',
    'pages_read_engagement', 
    'pages_manage_posts',
    'pages_read_user_content',
    'public_profile'
  ].join(',');

  // Build Facebook OAuth URL
  const facebookAuthUrl = new URL('https://www.facebook.com/v18.0/dialog/oauth');
  facebookAuthUrl.searchParams.set('client_id', fbAppId);
  facebookAuthUrl.searchParams.set('redirect_uri', redirectUri);
  facebookAuthUrl.searchParams.set('scope', scope);
  facebookAuthUrl.searchParams.set('state', userId); // Pass userId through state
  facebookAuthUrl.searchParams.set('response_type', 'code');

  // Redirect user to Facebook OAuth
  return NextResponse.redirect(facebookAuthUrl.toString());
}
