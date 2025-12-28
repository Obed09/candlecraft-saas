import { NextRequest, NextResponse } from 'next/server';

// This route fetches user's Facebook posts for AI training
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { pageId, pageAccessToken, limit = 50 } = body;

    if (!pageId || !pageAccessToken) {
      return NextResponse.json(
        { error: 'Page ID and access token required' },
        { status: 400 }
      );
    }

    // Fetch posts from Facebook Page
    // We get: message (text), created_time, likes, comments, shares
    const postsResponse = await fetch(
      `https://graph.facebook.com/v18.0/${pageId}/posts?fields=message,created_time,likes.summary(true),comments.summary(true),shares&limit=${limit}&access_token=${pageAccessToken}`
    );

    const postsData = await postsResponse.json();

    if (postsData.error) {
      console.error('Facebook API error:', postsData.error);
      return NextResponse.json(
        { error: 'Failed to fetch posts', details: postsData.error },
        { status: 400 }
      );
    }

    // Transform posts for AI training
    const posts = postsData.data?.map((post: any) => ({
      id: post.id,
      text: post.message || '',
      createdTime: post.created_time,
      likes: post.likes?.summary?.total_count || 0,
      comments: post.comments?.summary?.total_count || 0,
      shares: post.shares?.count || 0,
    })) || [];

    // Filter out posts without text (images/videos only)
    const textPosts = posts.filter((p: any) => p.text.length > 0);

    return NextResponse.json({
      success: true,
      totalPosts: textPosts.length,
      posts: textPosts,
    });

  } catch (error) {
    console.error('Error fetching Facebook posts:', error);
    return NextResponse.json(
      { error: 'Server error' },
      { status: 500 }
    );
  }
}
