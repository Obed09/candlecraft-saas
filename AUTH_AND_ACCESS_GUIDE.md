# Authentication & Access Control System

Complete authentication and subscription-based access control system for CandleFlow SaaS.

## ✅ Implemented Features

### 1. **Authentication**
- ✅ Email/password sign up
- ✅ Email/password sign in
- ✅ Password reset via email
- ✅ Automatic session management
- ✅ Protected routes & API endpoints
- ✅ Auto-redirect to dashboard after signup

### 2. **Subscription Tiers**

#### Free Tier
- 3 recipes maximum
- 5 orders maximum
- 10 customers maximum
- 20 products maximum
- No AI features
- No advanced analytics

#### Starter Tier ($29/month)
- 50 recipes
- 100 orders
- 100 customers
- 100 products
- ✅ AI features enabled
- Basic analytics

#### Pro Tier ($79/month)
- Unlimited recipes
- Unlimited orders
- Unlimited customers
- Unlimited products
- ✅ AI features
- ✅ Advanced analytics
- ✅ Multiple users
- ✅ Priority support

#### Enterprise Tier ($199/month)
- Everything in Pro
- ✅ API access
- Custom integrations

### 3. **Access Control**
- ✅ Real-time limit enforcement on resource creation
- ✅ Feature flags based on subscription tier
- ✅ Usage tracking and display
- ✅ Immediate feature unlock on upgrade
- ✅ API middleware for protection

## 📁 File Structure

```
app/
├── (auth)/
│   ├── sign-in/page.tsx          # Sign in page
│   ├── sign-up/page.tsx          # Sign up page
│   ├── forgot-password/page.tsx  # Password reset request
│   └── reset-password/page.tsx   # Password reset confirmation
├── api/
│   ├── auth/
│   │   ├── register/route.ts     # User registration
│   │   ├── forgot-password/route.ts  # Reset request
│   │   └── reset-password/route.ts   # Reset confirmation
│   ├── subscription/
│   │   ├── route.ts              # Get subscription info
│   │   ├── upgrade/route.ts      # Upgrade subscription
│   │   └── cancel/route.ts       # Cancel subscription
│   ├── recipes/route.ts          # Recipe CRUD with limits
│   └── orders/route.ts           # Order CRUD with limits

lib/
├── auth.ts                       # NextAuth configuration
├── subscription.ts               # Subscription utilities
├── apiMiddleware.ts             # API protection middleware
└── hooks/
    └── useSubscription.ts       # Client-side subscription hook

components/
└── SubscriptionStatus.tsx       # Usage display component

types/
└── next-auth.d.ts               # TypeScript definitions
```

## 🔧 Usage Examples

### Protecting API Routes

```typescript
import { requireAuth, requireResourceLimit } from "@/lib/apiMiddleware";

export async function POST(request: Request) {
  // Check authentication
  const auth = await requireAuth();
  if (auth.error) return auth.error;

  // Check if user can create more recipes
  const limitCheck = await requireResourceLimit(auth.userId!, "recipes");
  if (limitCheck.error) return limitCheck.error;

  // Create recipe...
  // Returns 403 if limit reached with upgrade message
}
```

### Protecting Features

```typescript
import { requireFeatureAccess } from "@/lib/apiMiddleware";

export async function POST(request: Request) {
  const auth = await requireAuth();
  if (auth.error) return auth.error;

  // Check if user has AI features
  const featureCheck = await requireFeatureAccess(auth.userId!, "hasAIFeatures");
  if (featureCheck.error) return featureCheck.error;

  // Use AI feature...
}
```

### Client-Side Usage Hook

```typescript
"use client";

import { useSubscription } from "@/lib/hooks/useSubscription";

export default function MyComponent() {
  const { plan, usage, canCreate, hasFeature, getRemainingCount } = useSubscription();

  // Check if can create more recipes
  if (!canCreate("recipes")) {
    return <UpgradePrompt />;
  }

  // Check feature access
  if (!hasFeature("hasAIFeatures")) {
    return <div>AI features not available on your plan</div>;
  }

  // Show remaining count
  const remaining = getRemainingCount("orders");

  return <div>You can create {remaining} more orders</div>;
}
```

### Display Subscription Status

```typescript
import SubscriptionStatus from "@/components/SubscriptionStatus";

export default function SettingsPage() {
  return (
    <div>
      <h1>Settings</h1>
      <SubscriptionStatus />
    </div>
  );
}
```

## 🔐 Environment Variables Required

```env
# Database
DATABASE_URL="postgresql://..."
DIRECT_URL="postgresql://..."

# NextAuth
NEXTAUTH_SECRET="your-secret-key"
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# Stripe (for subscription payments)
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_STARTER_MONTHLY_PRICE_ID="price_..."
STRIPE_STARTER_YEARLY_PRICE_ID="price_..."
STRIPE_PRO_MONTHLY_PRICE_ID="price_..."
STRIPE_PRO_YEARLY_PRICE_ID="price_..."
STRIPE_ENTERPRISE_MONTHLY_PRICE_ID="price_..."
STRIPE_ENTERPRISE_YEARLY_PRICE_ID="price_..."
```

## 🚀 How It Works

### 1. User Sign Up Flow
1. User fills sign-up form
2. API creates user with hashed password
3. API creates default Business record
4. API creates Subscription record (free tier)
5. User automatically signed in
6. Redirected to dashboard

### 2. Subscription Enforcement
1. User attempts to create resource (recipe, order, etc.)
2. API middleware checks current count vs limit
3. If at limit, returns 403 with upgrade message
4. If within limit, allows creation
5. Returns updated usage stats

### 3. Feature Access
1. User attempts to use feature
2. API checks subscription plan
3. If plan doesn't include feature, returns 403
4. If included, allows access

### 4. Upgrade Flow
1. User clicks upgrade button
2. API creates Stripe checkout session
3. User completes payment
4. Stripe webhook updates subscription
5. Session refreshed with new plan
6. Features immediately unlocked

### 5. Password Reset Flow
1. User requests password reset
2. API generates secure token
3. Token stored in database (expires in 1 hour)
4. Email sent with reset link (development: logged to console)
5. User clicks link, enters new password
6. API validates token and updates password
7. User can sign in with new password

## 🧪 Testing

### Test User Limits
```bash
# Create 3 recipes on free plan
# 4th recipe should fail with limit message

# Upgrade to starter plan
# Should be able to create up to 50 recipes
```

### Test Feature Access
```bash
# Try to access AI features on free plan
# Should be denied

# Upgrade to starter
# AI features should be accessible
```

### Test Password Reset
```bash
# Request password reset
# Check console for reset URL in development
# Use token from URL to reset password
```

## 📊 Database Schema

The system uses the following key models:

- **User** - Authentication data
- **Business** - User's business (1:1 with User)
- **Subscription** - Plan and Stripe data
- **Recipe, Order, Customer, Product** - Resources with limits

## 🎨 UI Components

- Sign in/up forms with validation
- Password reset flow
- Subscription status card with usage bars
- Upgrade prompts when limits reached
- Feature locked messages

## 🔄 Session Management

- JWT-based sessions
- Subscription data included in session
- Auto-refresh on plan change
- Session persists across tabs

## ✨ Best Practices

1. Always use middleware for API protection
2. Check limits before allowing creation
3. Display remaining counts to users
4. Show upgrade prompts proactively
5. Refresh session after plan changes
6. Use TypeScript types for type safety
7. Handle errors gracefully

## 🐛 Troubleshooting

### Users can't sign in
- Check database connection
- Verify password is hashed correctly
- Check NEXTAUTH_SECRET is set

### Limits not enforced
- Verify middleware is imported
- Check subscription record exists
- Refresh session data

### Password reset not working
- Check token hasn't expired (1 hour)
- Verify email matches user
- Check token hashing matches

## 🚀 Next Steps

1. **Add Email Service**: Integrate SendGrid/AWS SES for password resets
2. **Add Stripe Webhooks**: Handle subscription events
3. **Add Multi-tenancy**: Support for team members
4. **Add Usage Analytics**: Track feature usage
5. **Add Billing Portal**: Let users manage subscriptions
6. **Add Email Verification**: Verify email on signup
7. **Add 2FA**: Two-factor authentication
8. **Add Social Auth**: Google, Facebook login

## 📝 Notes

- Free tier limits enforced immediately
- Upgrades unlock features instantly
- Downgrades keep data but restrict creation
- Password reset tokens expire after 1 hour
- Session includes subscription data for client-side checks
- All API routes protected by default
- Usage stats updated in real-time
