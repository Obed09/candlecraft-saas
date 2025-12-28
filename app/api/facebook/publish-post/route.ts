import { NextRequest, NextResponse } from 'next/server';

// This route publishes a post to Facebook Page
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { pageId, pageAccessToken, message, scheduledTime } = body;

    if (!pageId || !pageAccessToken || !message) {
      return NextResponse.json(
        { error: 'Page ID, access token, and message required' },
        { status: 400 }
      );
    }

    // Build the post data
    const postData: any = {
      message,
      access_token: pageAccessToken,
    };

    // If scheduled time provided, add it
    if (scheduledTime) {
      // Convert to Unix timestamp
      const timestamp = Math.floor(new Date(scheduledTime).getTime() / 1000);
      postData.published = false; // Must be false for scheduled posts
      postData.scheduled_publish_time = timestamp;
    }

    // Create URL-encoded form data
    const formBody = Object.keys(postData)
      .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(postData[key]))
      .join('&');

    // Publish post to Facebook
    const publishResponse = await fetch(
      `https://graph.facebook.com/v18.0/${pageId}/feed`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formBody,
      }
    );

    const publishData = await publishResponse.json();

    if (publishData.error) {
      console.error('Facebook publish error:', publishData.error);
      return NextResponse.json(
        { 
          error: 'Failed to publish post', 
          details: publishData.error.message 
        },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      postId: publishData.id,
      scheduled: !!scheduledTime,
      message: scheduledTime 
        ? 'Post scheduled successfully' 
        : 'Post published successfully',
    });

  } catch (error) {
    console.error('Error publishing to Facebook:', error);
    return NextResponse.json(
      { error: 'Server error' },
      { status: 500 }
    );
  }
}
