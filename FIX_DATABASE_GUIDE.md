# Fix Database Connection for candlepilots.com

## Current Issue
- Email: kaylloh09@gmail.com
- Error: "Something went wrong" on password reset
- Cause: Supabase database credentials expired/invalid

## Step-by-Step Fix

### 1. Login to Supabase
Go to: https://supabase.com/dashboard

### 2. Find Your Project
Look for project: **ufnbkuvqkmlwlemkanno**
(Or the CandleCraft project)

### 3. Get New Database URLs

**Option A: If Project Still Exists**
1. Click on your project
2. Go to: **Settings** → **Database**
3. Scroll to **Connection String**
4. Copy both:
   - **Connection Pooling** (for DATABASE_URL) - Port 6543
   - **Direct Connection** (for DIRECT_URL) - Port 5432

**Option B: If Project Was Paused/Deleted**
1. Click: **"New Project"**
2. Name it: `candlecraft-production`
3. Choose region: **West EU** (same as before)
4. Set database password (save it!)
5. Wait for project to create (~2 minutes)
6. Then follow steps above to get URLs

### 4. Update Environment Variables

#### For Local Development:
Update `.env.local` file:
```env
DATABASE_URL="postgresql://postgres.[REFERENCE_ID]:[PASSWORD]@aws-1-eu-west-1.pooler.supabase.com:6543/postgres?pgbouncer=true"
DIRECT_URL="postgresql://postgres.[REFERENCE_ID]:[PASSWORD]@aws-1-eu-west-1.pooler.supabase.com:5432/postgres"
```

#### For Production (Vercel):
1. Go to: https://vercel.com/dashboard
2. Find project: **candlecraft-saas**
3. Go to: **Settings** → **Environment Variables**
4. Update:
   - `DATABASE_URL` = [Connection Pooling URL]
   - `DIRECT_URL` = [Direct Connection URL]
5. Click **Save**

### 5. Initialize Database Schema

**Local:**
```bash
cd "e:\Candle-Craft SaaS\candlecraft-saas"
npx prisma db push
```

**Production:**
- Vercel will automatically redeploy with new env vars
- Or manually: `vercel --prod`

### 6. Test the Connection

**Local test:**
```bash
node check-users.js
```

**Production test:**
- Go to: https://candlepilots.com/sign-up
- Try creating account with: kaylloh09@gmail.com
- Should work now!

## After Database is Fixed

You can then:
1. ✅ Sign up fresh with kaylloh09@gmail.com
2. ✅ Use forgot password if needed
3. ✅ Access all features
4. ✅ Local development will work

## Need Help?

If the Supabase project is completely gone:
1. We can create a fresh database
2. Migrate/export any old data if accessible
3. Set up new credentials everywhere
