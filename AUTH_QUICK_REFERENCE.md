# 🎯 Authentication System - Quick Reference

## 🔑 Core Utilities

### Check Authentication (Server-Side)
```typescript
import { requireAuth } from "@/lib/apiMiddleware";

export async function GET() {
  const auth = await requireAuth();
  if (auth.error) return auth.error; // Returns 401
  
  const userId = auth.userId; // Use this ID
  // Your logic...
}
```

### Check Resource Limits (Server-Side)
```typescript
import { requireResourceLimit } from "@/lib/apiMiddleware";

export async function POST(request: Request) {
  const auth = await requireAuth();
  if (auth.error) return auth.error;

  // Check if user can create more recipes
  const limit = await requireResourceLimit(auth.userId!, "recipes");
  if (limit.error) return limit.error; // Returns 403 with upgrade message
  
  // Create recipe...
}
```

### Check Feature Access (Server-Side)
```typescript
import { requireFeatureAccess } from "@/lib/apiMiddleware";

export async function POST(request: Request) {
  const auth = await requireAuth();
  if (auth.error) return auth.error;

  // Check if user has AI features
  const feature = await requireFeatureAccess(auth.userId!, "hasAIFeatures");
  if (feature.error) return feature.error; // Returns 403
  
  // Use AI feature...
}
```

### Combined Middleware (Server-Side)
```typescript
import { withAuthAndLimit } from "@/lib/apiMiddleware";

export async function POST(request: Request) {
  // Check auth AND limit in one call
  const check = await withAuthAndLimit("recipes");
  if (check.error) return check.error;
  
  // Both checks passed, create recipe
}
```

## 📊 Client-Side Usage

### Use Subscription Hook
```typescript
import { useSubscription } from "@/lib/hooks/useSubscription";

function MyComponent() {
  const {
    plan,              // "free", "starter", "pro", "enterprise"
    status,            // "active", "canceled", "past_due"
    usage,             // { recipes: { current: 2, limit: 3, percentage: 66.7 } }
    limits,            // All limits and features for current plan
    loading,           // Loading state
    canCreate,         // Function: canCreate("recipes") => true/false
    hasFeature,        // Function: hasFeature("hasAIFeatures") => true/false
    getRemainingCount, // Function: getRemainingCount("recipes") => 1
    refreshUsage,      // Function: refreshUsage() => void
  } = useSubscription();

  if (loading) return <Loading />;
  
  if (!canCreate("recipes")) {
    return <UpgradePrompt resourceType="recipes" currentLimit={limits?.recipes} />;
  }

  if (!hasFeature("hasAIFeatures")) {
    return <UpgradePrompt feature="AI Features" />;
  }

  return (
    <div>
      <p>You have {getRemainingCount("recipes")} recipes remaining</p>
      {/* Your component */}
    </div>
  );
}
```

### Display Subscription Status
```typescript
import SubscriptionStatus from "@/components/SubscriptionStatus";

function SettingsPage() {
  return (
    <div>
      <h1>Account Settings</h1>
      <SubscriptionStatus /> {/* Shows usage bars, upgrade CTA */}
    </div>
  );
}
```

### Show Upgrade Prompt
```typescript
import UpgradePrompt from "@/components/UpgradePrompt";

function LimitReached() {
  return (
    <UpgradePrompt 
      resourceType="recipes" 
      currentLimit={3}
    />
  );
}

function FeatureLocked() {
  return (
    <UpgradePrompt 
      feature="AI-powered features"
    />
  );
}
```

## 🔐 API Endpoints

### Authentication
```bash
# Sign up
POST /api/auth/register
Body: { name, email, password }

# Forgot password
POST /api/auth/forgot-password
Body: { email }

# Reset password
POST /api/auth/reset-password
Body: { token, email, password }
```

### Subscription Management
```bash
# Get subscription & usage
GET /api/subscription
Response: { plan, status, limits, usage }

# Upgrade plan
POST /api/subscription/upgrade
Body: { plan, billingCycle }
Response: { checkoutUrl } or { message }

# Cancel subscription
POST /api/subscription/cancel
Response: { message }
```

### Protected Resources
```bash
# Get recipes
GET /api/recipes
Response: { recipes }

# Create recipe (checks limit)
POST /api/recipes
Body: { name, batchSize, unit, ingredients, ... }
Response: { recipe, usage } or { error: "limit reached", upgradeRequired: true }

# Get orders
GET /api/orders
Response: { orders }

# Create order (checks limit)
POST /api/orders
Body: { customerId, items, total, ... }
Response: { order, usage } or { error: "limit reached", upgradeRequired: true }
```

## 📋 Subscription Plans

| Plan | Recipes | Orders | Customers | Products | AI | Analytics | Price |
|------|---------|--------|-----------|----------|----|-----------| ------|
| **Free** | 3 | 5 | 10 | 20 | ❌ | ❌ | $0 |
| **Starter** | 50 | 100 | 100 | 100 | ✅ | ❌ | $29/mo |
| **Pro** | ∞ | ∞ | ∞ | ∞ | ✅ | ✅ | $79/mo |
| **Enterprise** | ∞ | ∞ | ∞ | ∞ | ✅ | ✅ | $199/mo |

## 🛣️ Page Routes

```
/sign-in              # Sign in page
/sign-up              # Sign up page
/forgot-password      # Request password reset
/reset-password       # Confirm password reset (with token)
/subscription-plans   # View and select plans
/settings             # Account settings
```

## 🎨 UI Components

### SubscriptionStatus
Displays current plan, usage bars, upgrade CTA
```tsx
<SubscriptionStatus />
```

### UpgradePrompt
Shows upgrade message when limits reached
```tsx
<UpgradePrompt resourceType="recipes" currentLimit={3} />
<UpgradePrompt feature="AI Features" />
```

## 🔍 Useful Queries

### Get User's Business & Subscription
```typescript
import { getUserSubscription } from "@/lib/subscription";

const data = await getUserSubscription(userId);
// Returns: { business, subscription, plan, limits }
```

### Get Usage Statistics
```typescript
import { getUsageStats } from "@/lib/subscription";

const stats = await getUsageStats(userId);
// Returns: { recipes: { current, limit, percentage }, ... }
```

### Check If Can Create
```typescript
import { canCreateResource } from "@/lib/subscription";

const check = await canCreateResource(userId, "recipes");
// Returns: { allowed, current, limit, message }
```

### Check Feature Access
```typescript
import { hasFeatureAccess } from "@/lib/subscription";

const hasAI = await hasFeatureAccess(userId, "hasAIFeatures");
// Returns: boolean
```

## ⚡ Quick Checks

### Is User Authenticated?
```typescript
// Server-side
const session = await getServerSession(authOptions);
if (!session) redirect("/sign-in");

// Client-side
const { data: session } = useSession();
if (!session) router.push("/sign-in");
```

### What Plan is User On?
```typescript
// Server-side
const userId = (session.user as any).id;
const data = await getUserSubscription(userId);
console.log(data.plan); // "free", "starter", "pro", "enterprise"

// Client-side
const { plan } = useSubscription();
console.log(plan); // "free", "starter", "pro", "enterprise"
```

### Can User Create More?
```typescript
// Server-side (in API route)
const limit = await requireResourceLimit(userId, "recipes");
if (limit.error) return limit.error; // Returns 403

// Client-side
const { canCreate } = useSubscription();
if (!canCreate("recipes")) {
  return <UpgradePrompt />;
}
```

## 🚨 Error Responses

### 401 Unauthorized
```json
{ "error": "Unauthorized" }
```
User not signed in

### 403 Limit Reached
```json
{
  "error": "You've reached your recipes limit (3). Please upgrade your plan.",
  "limit": 3,
  "current": 3,
  "upgradeRequired": true
}
```

### 403 Feature Not Available
```json
{
  "error": "This feature is not available on your current plan",
  "feature": "hasAIFeatures",
  "upgradeRequired": true
}
```

## 📝 Environment Variables

```env
DATABASE_URL="postgresql://..."
NEXTAUTH_SECRET="your-secret"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
```

## 🔄 Session Data

```typescript
// Access in server components
const session = await getServerSession(authOptions);
session.user.id
session.user.email
session.user.name
session.user.businessId
session.user.subscriptionPlan
session.user.subscriptionStatus

// Access in client components
const { data: session } = useSession();
// Same properties available
```

## 💡 Best Practices

1. ✅ Always use middleware for API protection
2. ✅ Check limits before allowing creation
3. ✅ Display remaining counts to users
4. ✅ Show upgrade prompts proactively
5. ✅ Refresh usage after operations
6. ✅ Handle errors gracefully
7. ✅ Use TypeScript types

## 🆘 Common Issues

**Can't sign in**: Check NEXTAUTH_SECRET is set  
**Limits not enforcing**: Verify subscription exists  
**Features not unlocking**: Refresh session after upgrade  
**Password reset not working**: Check token not expired (1 hour)

---

**Need more details?** See [AUTH_AND_ACCESS_GUIDE.md](./AUTH_AND_ACCESS_GUIDE.md)  
**Testing?** See [TESTING_AUTH_GUIDE.md](./TESTING_AUTH_GUIDE.md)
