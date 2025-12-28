# Facebook API Integration - Setup Guide

## ✅ What We Built

### API Routes Created:
1. **`/api/auth/facebook`** - Initiates OAuth flow
2. **`/api/auth/facebook/callback`** - Handles OAuth callback
3. **`/api/facebook/fetch-posts`** - Fetches user's posts for AI training
4. **`/api/facebook/publish-post`** - Publishes posts to Facebook Page

### Features:
- ✅ OAuth 2.0 flow for secure authentication
- ✅ Automatic Page access token retrieval
- ✅ Fetch up to 50 posts for AI voice training
- ✅ Publish posts immediately or schedule for later
- ✅ Error handling and user feedback

---

## 🚀 How to Set Up Facebook App

### Step 1: Create Facebook App

1. Go to: https://developers.facebook.com/apps
2. Click **"Create App"**
3. Select **"Business"** type
4. Fill in:
   - **App Name**: "CandleFlow Social"
   - **App Contact Email**: your@email.com
5. Click **"Create App"**

### Step 2: Get App ID & Secret

1. In your app dashboard, go to **Settings → Basic**
2. Copy these values:
   - **App ID** → Add to `.env` as `FACEBOOK_APP_ID`
   - **App Secret** (click "Show") → Add to `.env` as `FACEBOOK_APP_SECRET`

### Step 3: Configure OAuth Redirect URI

1. In app dashboard, go to **Facebook Login → Settings**
2. Under **Valid OAuth Redirect URIs**, add:
   ```
   http://localhost:3000/api/auth/facebook/callback
   https://yourdomain.com/api/auth/facebook/callback
   ```
3. Click **Save Changes**

### Step 4: Add Required Permissions

1. Go to **App Review → Permissions and Features**
2. Request these permissions:
   - ✅ `pages_show_list` - See user's Pages
   - ✅ `pages_read_engagement` - Read Page posts
   - ✅ `pages_manage_posts` - Publish to Pages
   - ✅ `pages_read_user_content` - Read user content for AI
3. Provide use case explanation:
   > "We help candle makers automate their Facebook marketing by learning their writing style and posting content that sounds like them. We need to read their existing posts to train AI, and publish new posts on their behalf."

### Step 5: Make App Live

1. App starts in **Development Mode** (only you can test)
2. To go live:
   - Go to **App Review → Requests**
   - Submit for review (may take 3-7 days)
   - Provide privacy policy URL
   - Provide data deletion instructions URL

---

## 🔧 Environment Variables

Add these to your `.env` file:

```env
# Facebook App Credentials
FACEBOOK_APP_ID="your_app_id_here"
FACEBOOK_APP_SECRET="your_app_secret_here"

# App URL (for OAuth callbacks)
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

**⚠️ IMPORTANT:**
- Never commit `.env` to Git
- Use different apps for development vs production
- Rotate secrets regularly

---

## 🧪 How to Test

### 1. Connect Facebook Account

```typescript
// User clicks "Connect Facebook" button
// → Redirects to /api/auth/facebook?userId=user123
// → Facebook OAuth consent screen
// → User approves
// → Redirects back to /api/auth/facebook/callback
// → Callback exchanges code for access token
// → Fetches user's Facebook Pages
// → Redirects to /social-media?facebook=connected&page=PageName
```

### 2. Fetch Posts for AI Training

```typescript
const response = await fetch('/api/facebook/fetch-posts', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    pageId: 'facebook_page_id',
    pageAccessToken: 'page_access_token',
    limit: 50 // Get last 50 posts
  })
});

const data = await response.json();
// data.posts = [{id, text, createdTime, likes, comments, shares}, ...]
```

### 3. Publish a Post

```typescript
const response = await fetch('/api/facebook/publish-post', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    pageId: 'facebook_page_id',
    pageAccessToken: 'page_access_token',
    message: '🕯️ Just dropped Lavender Dreams! ✨ Shop now! Link in bio 💜',
    scheduledTime: '2025-12-28T14:00:00Z' // Optional - for scheduling
  })
});

const data = await response.json();
// data = {success: true, postId: '...', message: 'Post published successfully'}
```

---

## 💾 Database Schema (TODO)

You'll need to store these securely:

```typescript
model SocialAccount {
  id        String   @id @default(cuid())
  userId    String
  platform  String   // 'facebook', 'instagram', 'linkedin'
  
  // Facebook-specific
  pageId          String?
  pageName        String?
  pageAccessToken String? // Encrypted!
  
  // Metadata
  connectedAt DateTime @default(now())
  lastSyncAt  DateTime?
  
  @@unique([userId, platform])
}
```

**⚠️ Security:**
- Encrypt `pageAccessToken` before storing
- Never expose tokens in API responses
- Rotate tokens periodically
- Implement token refresh logic

---

## 📊 User Flow

### Connection Flow:
1. User clicks "Connect Facebook"
2. Redirects to Facebook OAuth
3. User approves permissions
4. Callback receives code
5. Exchange code for tokens
6. Fetch user's Pages
7. Store Page ID + access token
8. Redirect back with success

### AI Training Flow:
1. Fetch last 50 posts from Page
2. Filter posts with text (skip image-only)
3. Send to OpenAI for analysis
4. Generate voice profile
5. Save voice profile to database

### Publishing Flow:
1. User creates post in content generator
2. AI generates content in their voice
3. User approves post
4. User clicks "Schedule for Facebook"
5. API publishes to Page
6. Success notification

---

## 🐛 Common Issues

### "No Facebook Pages Found"
**Problem:** User doesn't have a Facebook Page  
**Solution:** User must create a Page first at https://facebook.com/pages/create

### "Access Token Invalid"
**Problem:** Token expired or revoked  
**Solution:** Implement token refresh or re-authenticate

### "Permission Denied"
**Problem:** App doesn't have required permissions  
**Solution:** Request permissions in Facebook App Review

### "App Not Live"
**Problem:** App in development mode  
**Solution:** Make app "Live" in Facebook dashboard or add testers in "Roles" section

---

## 🔐 Security Best Practices

1. **Encrypt Access Tokens**
   ```typescript
   import crypto from 'crypto';
   
   const encrypt = (text: string) => {
     const cipher = crypto.createCipher('aes-256-cbc', process.env.ENCRYPTION_KEY!);
     return cipher.update(text, 'utf8', 'hex') + cipher.final('hex');
   };
   ```

2. **Validate OAuth State**
   - Use cryptographically random state parameter
   - Verify state matches on callback

3. **Rate Limiting**
   - Limit API calls per user
   - Implement exponential backoff

4. **Token Expiration**
   - Check token validity before use
   - Refresh expired tokens automatically

---

## 📈 Next Steps

### Phase 1 (Current): ✅ DONE
- Facebook OAuth flow
- Fetch posts API
- Publish posts API

### Phase 2 (Next):
- **AI Voice Training**: Send posts to OpenAI, generate profile
- **Database Integration**: Store tokens, profiles, posts
- **Instagram Integration**: Similar OAuth + API setup
- **LinkedIn Integration**: Similar OAuth + API setup

### Phase 3 (Future):
- Auto-scheduling engine
- Analytics tracking
- Auto-replies to comments
- Multi-account management

---

## 🎉 You're Ready!

The Facebook API integration is complete. To use it:

1. Add Facebook App ID & Secret to `.env`
2. User clicks "Connect Facebook"
3. OAuth flow handles everything
4. Start publishing posts!

**Need help?** Check Facebook's official docs: https://developers.facebook.com/docs/facebook-login

---

*Last Updated: December 27, 2025*
