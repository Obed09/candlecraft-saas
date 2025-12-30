# CandlePilots Domain Setup Guide

## ✅ Custom Domain: www.candlepilots.com

Your custom domain has been integrated throughout the entire application. Here's what was updated and what you need to configure:

---

## 🎨 Branding Updates Completed

### Application-Wide Changes:
- ✅ **App Title**: "CandlePilots - All-in-One Candle Business Platform"
- ✅ **Logo Alt Text**: Updated to "CandlePilots Logo"
- ✅ **Sidebar Branding**: "CandlePilots" heading
- ✅ **Navigation**: All "CandleFlow" references → "CandlePilots"
- ✅ **Sign-in Page**: "Sign in to your CandlePilots account"
- ✅ **Analytics Dashboard**: "Welcome to CandlePilots Pro"
- ✅ **Chat Widget**: All knowledge base references updated
- ✅ **Invoice Templates**: Default business name and email
- ✅ **Team Page**: Email examples (@candlepilots.com)
- ✅ **Barcodes/QR Codes**: URLs point to www.candlepilots.com
- ✅ **Local Storage Keys**: Updated to 'candlepilots_business_settings'

---

## 🔧 Required Configuration Steps

### 1. Update Environment Variables

#### For Production (Vercel Dashboard):
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Add/Update these variables:

```env
NEXT_PUBLIC_APP_URL=https://www.candlepilots.com
NEXTAUTH_URL=https://www.candlepilots.com
```

#### For Local Development:
1. Copy `.env.local.template` to `.env.local`
2. For local testing, use:
```env
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXTAUTH_URL=http://localhost:3000
```

### 2. Update Stripe Configuration

Your Stripe redirect URLs need to be updated:

#### In Stripe Dashboard:
1. Go to [Stripe Dashboard](https://dashboard.stripe.com/)
2. Navigate to **Settings** → **Checkout Settings**
3. Update success/cancel URLs to:
   - Success: `https://www.candlepilots.com/analytics?success=true`
   - Cancel: `https://www.candlepilots.com/sign-up?canceled=true`

#### Webhook Configuration:
1. In Stripe Dashboard → **Developers** → **Webhooks**
2. Add endpoint: `https://www.candlepilots.com/api/stripe/webhook`
3. Select these events:
   - `checkout.session.completed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
4. Copy the webhook secret and add to Vercel:
   ```
   STRIPE_WEBHOOK_SECRET=whsec_your_secret_here
   ```

### 3. Configure OAuth Providers (if applicable)

#### NextAuth Configuration:
Already configured in code, but verify:
- File: `lib/auth.ts`
- Uses `NEXTAUTH_URL` from environment variables
- Callbacks and redirects will use your custom domain

#### Facebook Login (if using):
1. Go to [Facebook Developers](https://developers.facebook.com/)
2. Select your app
3. Go to **Settings** → **Basic**
4. Update **App Domains**: `candlepilots.com`
5. Add **Website URL**: `https://www.candlepilots.com`
6. In **Facebook Login** → **Settings**:
   - Valid OAuth Redirect URIs: `https://www.candlepilots.com/api/auth/callback/facebook`

### 4. DNS Verification (Should Already Be Done)

Verify your domain is properly pointed to Vercel:
```bash
# Check DNS resolution
nslookup www.candlepilots.com

# Should show Vercel's IP: 76.76.21.21
# Or CNAME: cname.vercel-dns.com
```

### 5. SSL Certificate

Vercel automatically provisions SSL certificates. Verify:
1. Visit https://www.candlepilots.com
2. Check for 🔒 padlock icon in browser
3. Certificate should be valid and issued by Let's Encrypt

---

## 📧 Email Configuration (Optional but Recommended)

For password reset emails and notifications:

### Option 1: SendGrid (Recommended)
```env
SENDGRID_API_KEY=SG.your_key_here
EMAIL_FROM=noreply@candlepilots.com
```

### Option 2: AWS SES
```env
AWS_ACCESS_KEY_ID=your_key
AWS_SECRET_ACCESS_KEY=your_secret
AWS_REGION=us-east-1
EMAIL_FROM=noreply@candlepilots.com
```

### Option 3: Resend
```env
RESEND_API_KEY=re_your_key
EMAIL_FROM=noreply@candlepilots.com
```

**Note**: You'll need to verify your domain with the email provider and set up SPF/DKIM records.

---

## 🚀 Deployment Checklist

### Pre-Deployment:
- [ ] Environment variables set in Vercel dashboard
- [ ] Stripe configuration updated
- [ ] Database connection string added
- [ ] NEXTAUTH_SECRET generated and added
- [ ] Domain DNS verified and propagated

### Post-Deployment:
- [ ] Test signup flow at `www.candlepilots.com/sign-up`
- [ ] Test sign-in at `www.candlepilots.com/sign-in`
- [ ] Verify plan selection works correctly
- [ ] Test Stripe checkout (use test mode first)
- [ ] Check all navigation links work
- [ ] Verify invoice generation shows correct domain
- [ ] Test QR codes point to correct URLs
- [ ] Check email notifications (if configured)

---

## 🧪 Testing Your Domain Integration

### 1. Test Signup Flow
```
1. Visit https://www.candlepilots.com/sign-up
2. Select a plan (Free, Starter, Pro, or Business)
3. Enter account details
4. For paid plans: verify Stripe checkout URL is correct
5. After signup: check you're redirected to correct dashboard URL
```

### 2. Test Authentication
```
1. Sign in at https://www.candlepilots.com/sign-in
2. Check session persists across page navigation
3. Test sign out redirects properly
4. Verify password reset email (if configured)
```

### 3. Test Branding
```
1. Check sidebar shows "CandlePilots"
2. Verify page title in browser tab
3. Check chat widget mentions "CandlePilots"
4. Generate an invoice - should show www.candlepilots.com
5. Create a barcode/QR code - should link to your domain
```

### 4. Test API Endpoints
```
# Test subscription endpoint
curl https://www.candlepilots.com/api/subscription

# Should return proper response (may need auth)
```

---

## 🔍 Troubleshooting

### Issue: URLs still show localhost
**Solution**: 
- Clear browser cache (Ctrl + Shift + R)
- Restart your development server
- Redeploy on Vercel

### Issue: Stripe checkout fails
**Solution**:
- Verify NEXT_PUBLIC_APP_URL is set correctly
- Check Stripe redirect URLs match exactly
- Ensure using correct Stripe API keys (test vs live)

### Issue: Authentication redirects fail
**Solution**:
- Verify NEXTAUTH_URL matches your domain exactly
- Check NEXTAUTH_SECRET is set
- Clear browser cookies and try again

### Issue: Email links broken
**Solution**:
- Update email templates to use NEXT_PUBLIC_APP_URL
- Verify email service has correct domain configured
- Check SPF/DKIM records if emails not sending

---

## 📝 Files Modified

The following files were updated with CandlePilots branding:

### Core Files:
- `app/layout.tsx` - Metadata and title
- `components/dashboard/DashboardSidebar.tsx` - Logo and branding
- `components/dashboard/DashboardNav.tsx` - Navigation branding
- `components/ChatWidget.tsx` - Assistant knowledge base

### Page Files:
- `app/(auth)/sign-in/page.tsx` - Sign-in branding
- `app/(dashboard)/analytics/page.tsx` - Dashboard welcome
- `app/(dashboard)/guide/page.tsx` - Guide title
- `app/(dashboard)/invoices/page.tsx` - Invoice defaults
- `app/(dashboard)/barcodes/page.tsx` - QR code URLs
- `app/(dashboard)/team/page.tsx` - Email examples

### Utility Files:
- `lib/businessSettings.ts` - Storage key
- `components/dashboard/InvoiceForm.tsx` - Settings key

---

## 🎯 Next Steps

1. **Immediate**: Update Vercel environment variables
2. **Before Launch**: Configure Stripe production mode
3. **Optional**: Set up email service for password resets
4. **Recommended**: Add Google Analytics or other analytics
5. **Marketing**: Update all external links to www.candlepilots.com

---

## 📞 Support Resources

- **Vercel Support**: https://vercel.com/support
- **Stripe Support**: https://support.stripe.com/
- **NextAuth Docs**: https://next-auth.js.org/

Your custom domain integration is complete! Just update the environment variables and test thoroughly before going live. 🚀
