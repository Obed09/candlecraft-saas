# Testing Your Signup and Access Control

## Issues Found and Fixed:

### ✅ 1. Profile and Settings Links Now Work
- Created `/profile` page with user information display
- Fixed dropdown menu navigation in DashboardHeader
- Added API endpoint for profile updates (`/api/user/profile`)

### ✅ 2. Signup Flow with Plan Selection
The signup page at [/sign-up](app/(auth)/sign-up/page.tsx) HAS a two-step plan selection:
- **Step 1**: Choose from Free, Starter, Pro, or Business plans
- **Step 2**: Enter account details (name, email, password)

## Why You Might Not See the Plan Selection:

### Possible Cause 1: Browser Cache
Your browser might be caching the old signup page.

**Fix:**
1. Hard refresh the page: `Ctrl + Shift + R` (Windows) or `Cmd + Shift + R` (Mac)
2. Or clear browser cache and cookies
3. Try in an incognito/private window

### Possible Cause 2: Already Signed In
If you're already logged in, you won't see the signup page.

**Fix:**
1. Sign out completely
2. Navigate to `/sign-up` directly
3. You should see the 4 plan cards

### Possible Cause 3: Existing User Without Plan
If you created an account before the plan selection was added, your account might not have a plan set.

**Fix:** Run this command to check your database:
```bash
npx prisma studio
```
Then check:
- Users table: Does your user exist?
- Business table: Is there a business for your user?
- Subscription table: What's the plan value?

## Testing Checklist:

### Test 1: New User Signup with Free Plan
1. Navigate to http://localhost:3000/sign-up
2. You should see 4 plan cards (Free, Starter, Pro, Business)
3. Click "Select Free"
4. Fill in name, email, password
5. Click "Create Account"
6. Should redirect to `/analytics`
7. Check limits: Try to create more than 3 recipes - should show upgrade prompt

### Test 2: New User Signup with Paid Plan
1. Navigate to http://localhost:3000/sign-up
2. Click "Select Starter" (or Pro/Business)
3. Fill in account details
4. Click "Create Account"
5. Should redirect to Stripe checkout
6. **Note**: You need Stripe configured for this to work

### Test 3: Verify Access Limits
After signing up with free plan:
1. Go to `/recipes` - try to create 4th recipe (should block)
2. Go to `/orders` - try to create 6th order (should block)
3. Should see upgrade prompts throughout the system

### Test 4: Profile and Settings
1. Click your avatar in top right
2. Click "Profile" - should navigate to `/profile`
3. Click "Settings" - should navigate to `/settings`
4. Both pages should now load properly

## If Still Not Working:

### Clear Your Test Data
If you have old test accounts, clear them:

```bash
# Open Prisma Studio
npx prisma studio

# Delete test users, or reset the database:
npx prisma migrate reset
```

### Verify Environment Variables
Make sure you have these in your `.env`:

```env
DATABASE_URL="your-database-url"
NEXTAUTH_SECRET="your-secret"
NEXTAUTH_URL="http://localhost:3000"

# For paid plans to work:
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_STARTER_MONTHLY_PRICE_ID="price_..."
STRIPE_PRO_MONTHLY_PRICE_ID="price_..."
STRIPE_BUSINESS_MONTHLY_PRICE_ID="price_..."
```

### Check Current User's Plan
Add this to any dashboard page to see current plan:

```tsx
"use client";
import { useSession } from "next-auth/react";

export default function TestPage() {
  const { data: session } = useSession();
  
  return (
    <div className="p-8">
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </div>
  );
}
```

## What Changed:

### Files Modified:
1. ✅ `components/dashboard/DashboardHeader.tsx` - Navigation now works
2. ✅ `app/(dashboard)/profile/page.tsx` - New profile page created
3. ✅ `app/api/user/profile/route.ts` - Profile update endpoint
4. ✅ Signup flow already has plan selection (no changes needed)

### Files Already Working (from previous session):
1. ✅ `app/(auth)/sign-up/page.tsx` - Two-step signup with plan cards
2. ✅ `app/api/auth/register/route.ts` - Handles plan parameter
3. ✅ `lib/subscription.ts` - Enforces limits (3 recipes, 5 orders for free)
4. ✅ `lib/apiMiddleware.ts` - Protects API routes with limits

## Next Steps:

1. **Sign out** of your current account
2. **Navigate** to http://localhost:3000/sign-up
3. **Verify** you see the plan selection cards
4. **Create** a new test account with Free plan
5. **Test** that limits are enforced (3 recipes max)
6. **Try** the Profile and Settings links in the dropdown menu

If you still don't see the plan selection, please:
- Share a screenshot of what you see at `/sign-up`
- Check browser console for any JavaScript errors (F12)
- Verify you're not already logged in (check if you're redirected)
