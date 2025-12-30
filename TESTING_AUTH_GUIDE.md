# Authentication & Access Control - Testing Guide

## Prerequisites

1. **Database Setup**
```bash
# Run migrations
npx prisma migrate dev

# Generate Prisma client
npx prisma generate
```

2. **Environment Variables**
```env
DATABASE_URL="postgresql://user:password@localhost:5432/candleflow"
DIRECT_URL="postgresql://user:password@localhost:5432/candleflow"
NEXTAUTH_SECRET="generate-with-openssl-rand-base64-32"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

## Test Scenarios

### 1. Sign Up Flow ✅

```bash
# Test creating a new account
1. Navigate to http://localhost:3000/sign-up
2. Fill in:
   - Name: Test User
   - Email: test@example.com
   - Password: password123
   - Confirm Password: password123
3. Click "Create Account"
4. Should auto-login and redirect to /analytics
5. Check database - user, business, and subscription (free) created
```

**Expected Result:**
- User created with hashed password
- Business record created with user's name
- Subscription record created with plan: "free", status: "active"
- User redirected to dashboard
- Session active

### 2. Sign In Flow ✅

```bash
# Test logging in
1. Navigate to http://localhost:3000/sign-in
2. Enter email and password
3. Click "Sign In"
4. Should redirect to /analytics

# Test invalid credentials
1. Try wrong password
2. Should show "Invalid email or password" error
3. Should not redirect
```

### 3. Password Reset Flow ✅

```bash
# Test forgot password
1. Navigate to http://localhost:3000/forgot-password
2. Enter email: test@example.com
3. Click "Send Reset Link"
4. Check console for reset URL (development mode)
5. Copy the URL and open it

# Test reset password
1. On reset page, enter new password twice
2. Click "Reset Password"
3. Should show success message
4. Auto-redirect to sign-in after 2 seconds
5. Sign in with new password - should work
```

**Expected Result:**
- Reset token created in VerificationToken table
- Token expires in 1 hour
- Can reset password once with token
- Token deleted after use

### 4. Free Tier Limits ✅

```bash
# Test recipe limit (3 max on free tier)
1. Sign in as free user
2. Create recipe 1 - should succeed
3. Create recipe 2 - should succeed
4. Create recipe 3 - should succeed
5. Create recipe 4 - should fail with:
   {
     "error": "You've reached your recipes limit (3). Please upgrade your plan.",
     "limit": 3,
     "current": 3,
     "upgradeRequired": true
   }

# Test order limit (5 max on free tier)
1. Create orders 1-5 - should succeed
2. Create order 6 - should fail with limit message
```

**Test with curl:**
```bash
# Get session token first (sign in via browser, check cookies)
# Create recipe
curl -X POST http://localhost:3000/api/recipes \
  -H "Content-Type: application/json" \
  -H "Cookie: next-auth.session-token=YOUR_TOKEN" \
  -d '{
    "name": "Test Recipe",
    "batchSize": 16,
    "unit": "oz"
  }'
```

### 5. Feature Access Control ✅

```bash
# Test AI features (not available on free)
1. Try to access /ai-blender as free user
2. Check if AI features are disabled

# Check with API:
curl -X POST http://localhost:3000/api/ai/blend \
  -H "Content-Type: application/json" \
  -H "Cookie: next-auth.session-token=YOUR_TOKEN" \
  -d '{"ingredients": ["lavender", "vanilla"]}'

# Expected: 403 with "This feature is not available on your current plan"
```

### 6. Subscription Status Display ✅

```bash
# Test usage display
1. Sign in as free user
2. Navigate to settings or dashboard
3. Add <SubscriptionStatus /> component to page
4. Should show:
   - Current plan badge (FREE)
   - Usage bars for recipes (0/3), orders (0/5), etc.
   - Upgrade CTA
   - Feature list with checkmarks
```

### 7. Plan Upgrade ✅

```bash
# Test upgrade flow (requires Stripe test keys)
1. Click "Upgrade" or "View Plans"
2. Select a plan (e.g., Starter)
3. Should redirect to Stripe checkout
4. Complete test payment (use test card 4242 4242 4242 4242)
5. Webhook updates subscription in database
6. Return to app - features unlocked immediately
7. Usage limits increased
```

### 8. Dashboard Access ✅

```bash
# Test protected routes
1. Sign out
2. Try to access /analytics
3. Should redirect to /sign-in
4. Sign in
5. Should redirect back to /analytics

# Test unauthenticated API access
curl http://localhost:3000/api/recipes
# Expected: 401 Unauthorized
```

## Database Checks

```sql
-- Check user was created
SELECT * FROM "User" WHERE email = 'test@example.com';

-- Check business was created
SELECT * FROM "Business" WHERE "userId" = 'user_id_here';

-- Check subscription
SELECT * FROM "Subscription" WHERE "businessId" = 'business_id_here';

-- Check recipe count for business
SELECT COUNT(*) FROM "Recipe" WHERE "businessId" = 'business_id_here';

-- Check verification tokens (password reset)
SELECT * FROM "VerificationToken" WHERE identifier = 'test@example.com';
```

## Client-Side Hook Testing

```typescript
// In any component
import { useSubscription } from "@/lib/hooks/useSubscription";

function TestComponent() {
  const {
    plan,
    usage,
    canCreate,
    hasFeature,
    getRemainingCount,
    loading
  } = useSubscription();

  console.log("Plan:", plan); // "free"
  console.log("Can create recipe:", canCreate("recipes")); // true/false
  console.log("Has AI:", hasFeature("hasAIFeatures")); // false on free
  console.log("Recipes remaining:", getRemainingCount("recipes")); // 3, 2, 1, 0
  console.log("Usage:", usage); // { recipes: { current: 0, limit: 3, percentage: 0 } }

  return <div>Check console</div>;
}
```

## Error Scenarios

### 1. Duplicate Email
```bash
# Try to sign up with existing email
Expected: "User already exists" error
```

### 2. Password Too Short
```bash
# Try password < 6 characters
Expected: "Password must be at least 6 characters"
```

### 3. Passwords Don't Match
```bash
# Enter different passwords
Expected: "Passwords do not match"
```

### 4. Expired Reset Token
```bash
# Wait 1 hour after requesting reset
# Try to use token
Expected: "Reset token has expired"
```

### 5. Invalid Reset Token
```bash
# Modify token in URL
Expected: "Invalid or expired reset token"
```

## Performance Tests

```bash
# Test concurrent requests
# Create multiple recipes simultaneously
# Should properly enforce limits

# Test session refresh
# Upgrade plan in one tab
# Other tabs should see new limits after refresh
```

## Stripe Webhook Testing

```bash
# Install Stripe CLI
stripe login

# Forward webhooks to local
stripe listen --forward-to localhost:3000/api/stripe/webhook

# Trigger test events
stripe trigger checkout.session.completed
stripe trigger customer.subscription.updated
stripe trigger invoice.payment_succeeded
```

## Environment-Specific Tests

### Development
- Reset URLs logged to console
- Stripe test mode
- Detailed error messages

### Production
- Reset URLs sent via email
- Stripe live mode
- Generic error messages for security

## Success Criteria

✅ Users can sign up and create account  
✅ Users can sign in consistently  
✅ Password reset works end-to-end  
✅ Dashboard requires authentication  
✅ Free tier limits enforced (3 recipes, 5 orders)  
✅ Attempting to exceed limits shows upgrade message  
✅ Feature flags work (AI disabled on free)  
✅ Upgrade unlocks features immediately  
✅ Usage stats display correctly  
✅ Session includes subscription data  
✅ API routes protected with middleware  
✅ Client-side hook provides subscription info  

## Common Issues & Solutions

### Issue: Can't sign in after creating account
**Solution:** Check password hashing, verify NEXTAUTH_SECRET is set

### Issue: Limits not enforced
**Solution:** Check middleware is called, subscription exists, refresh session

### Issue: Password reset email not sending
**Solution:** In development, check console for URL. In production, configure email service.

### Issue: Upgrade doesn't unlock features
**Solution:** Verify webhook is processing, check session refresh, look at subscription status

### Issue: Session not persisting
**Solution:** Check NEXTAUTH_SECRET matches, cookies enabled, domain settings

## Next Steps After Testing

1. ✅ All tests passing
2. Configure email service for password resets
3. Set up Stripe production keys
4. Add billing portal
5. Implement email verification
6. Add team member invitations
7. Set up monitoring and analytics
