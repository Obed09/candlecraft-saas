import { NextRequest, NextResponse } from 'next/server';

// This route handles the callback from Facebook after user authorizes
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get('code');
  const state = searchParams.get('state'); // This is the userId we passed
  const error = searchParams.get('error');

  // User denied permission
  if (error) {
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_APP_URL}/social-media?error=access_denied`
    );
  }

  if (!code || !state) {
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_APP_URL}/social-media?error=invalid_callback`
    );
  }

  const userId = state;

  try {
    // Exchange code for access token
    const tokenUrl = new URL('https://graph.facebook.com/v18.0/oauth/access_token');
    tokenUrl.searchParams.set('client_id', process.env.FACEBOOK_APP_ID!);
    tokenUrl.searchParams.set('client_secret', process.env.FACEBOOK_APP_SECRET!);
    tokenUrl.searchParams.set('redirect_uri', `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/facebook/callback`);
    tokenUrl.searchParams.set('code', code);

    const tokenResponse = await fetch(tokenUrl.toString());
    const tokenData = await tokenResponse.json();

    if (tokenData.error) {
      console.error('Facebook token error:', tokenData.error);
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_APP_URL}/social-media?error=token_failed`
      );
    }

    const accessToken = tokenData.access_token;

    // Get user's Facebook Pages
    const pagesResponse = await fetch(
      `https://graph.facebook.com/v18.0/me/accounts?access_token=${accessToken}`
    );
    const pagesData = await pagesResponse.json();

    if (pagesData.error) {
      console.error('Facebook pages error:', pagesData.error);
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_APP_URL}/social-media?error=pages_failed`
      );
    }

    // Get the first page (or let user choose later)
    const page = pagesData.data?.[0];
    
    if (!page) {
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_APP_URL}/social-media?error=no_pages`
      );
    }

    // TODO: Store in database
    // For now, we'll just redirect with success
    // In production, you'd save:
    // - userId
    // - page.id (Facebook Page ID)
    // - page.access_token (Page access token - NOT the user token!)
    // - page.name
    // Store encrypted in database

    console.log('Facebook connected:', {
      userId,
      pageId: page.id,
      pageName: page.name,
      // Don't log the actual token
    });

    // Redirect back to social media page with success
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_APP_URL}/social-media?facebook=connected&page=${encodeURIComponent(page.name)}`
    );

  } catch (error) {
    console.error('Facebook OAuth error:', error);
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_APP_URL}/social-media?error=server_error`
    );
  }
}
