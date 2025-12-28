# Supabase Integration Setup

This guide walks you through setting up Supabase for the BuyVSRent application with user authentication and report storage.

## Prerequisites

- Node.js 18+
- npm or yarn
- A Supabase account (free tier available at https://supabase.com)

## Step 1: Create Supabase Project

1. Go to [https://app.supabase.com](https://app.supabase.com)
2. Sign up or log in
3. Create a new project:
   - Organization: Create new or select existing
   - Project name: `buyvsrent` or similar
   - Database password: Create a strong password
   - Region: Choose closest to your users
   - Pricing plan: Free tier is sufficient for testing

4. Wait for the project to be created (usually 2-3 minutes)

## Step 2: Get API Credentials

1. In your Supabase project, go to **Settings > API**
2. Copy these values:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **Anon Key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **Service Role Secret** (scroll down) → `SUPABASE_SERVICE_ROLE_KEY`

## Step 3: Configure Environment Variables

1. Copy `.env.local.example` to `.env.local`:
```bash
cp .env.local.example .env.local
```

2. Paste your Supabase credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...your_anon_key...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...your_service_key...
```

## Step 4: Install Dependencies

```bash
npm install @supabase/supabase-js @supabase/auth-helpers-nextjs
```

## Step 5: Create Database Schema

Run these SQL queries in the Supabase SQL Editor (go to **SQL Editor > New Query**):

### Create Tables

```sql
-- Reports table
CREATE TABLE reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  input_data JSONB NOT NULL, -- The calculator input parameters
  result_data JSONB NOT NULL, -- The calculation results
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  is_public BOOLEAN DEFAULT FALSE, -- For sharing
  shared_token VARCHAR(255) UNIQUE, -- For generating shareable links
  view_count INTEGER DEFAULT 0
);

-- Enable RLS (Row Level Security)
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;

-- Policies: Users can see their own reports
CREATE POLICY "Users can view own reports"
  ON reports FOR SELECT
  USING (auth.uid() = user_id OR is_public = TRUE);

CREATE POLICY "Users can create reports"
  ON reports FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own reports"
  ON reports FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own reports"
  ON reports FOR DELETE
  USING (auth.uid() = user_id);

-- Public shares table
CREATE TABLE shared_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  report_id UUID NOT NULL REFERENCES reports(id) ON DELETE CASCADE,
  shared_token VARCHAR(255) UNIQUE NOT NULL,
  shared_by_email VARCHAR(255) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  expires_at TIMESTAMP WITH TIME ZONE,
  view_count INTEGER DEFAULT 0
);

ALTER TABLE shared_reports ENABLE ROW LEVEL SECURITY;

-- Anyone can view public shared reports
CREATE POLICY "Anyone can view shared reports"
  ON shared_reports FOR SELECT
  USING (true);
```

### Create Indexes for Performance

```sql
CREATE INDEX idx_reports_user_id ON reports(user_id);
CREATE INDEX idx_reports_created_at ON reports(created_at DESC);
CREATE INDEX idx_shared_reports_token ON shared_reports(shared_token);
```

## Step 6: Enable Email Authentication

1. In Supabase, go to **Authentication > Providers**
2. Enable "Email" (should be enabled by default)
3. Configure email settings:
   - Go to **Authentication > Email Templates**
   - Customize confirmation and password reset emails (optional)

## Step 7: Test the Setup

The application will now work with authentication. The implementation includes:

- ✅ First report viewing without login
- ✅ Login modal on second report access
- ✅ Report saving to database
- ✅ Detailed report generation with server-side processing
- ✅ Report sharing capabilities

## Architecture Overview

### Frontend Flow
1. User generates first report → View without login
2. User clicks "Generate Another Report" → Signup modal appears
3. After signup, user can generate unlimited reports
4. Reports are saved to Supabase database
5. User can view, share, or export saved reports

### Backend Flow
1. Report parameters sent to Supabase Edge Function
2. Function generates detailed PDF/HTML report
3. Report saved to database with results
4. Shareable link generated if user makes report public

## Troubleshooting

### Issue: "Supabase credentials not found"
- Verify `.env.local` file exists in project root
- Check that `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are set
- Restart the development server after adding env vars

### Issue: "Authentication failed"
- Clear browser cookies and local storage
- Check that Email authentication is enabled in Supabase
- Verify SMTP settings if using custom email provider

### Issue: "Reports table not found"
- Ensure you've run all SQL queries in Supabase SQL Editor
- Check RLS policies are properly configured
- Verify database user has permissions

## Next Steps

1. Users can now sign up and save reports
2. Implement report export as PDF (using a library like `jsPDF`)
3. Add report comparison feature (compare two reports side-by-side)
4. Implement team/shared reports functionality

## Security Notes

- 🔒 Supabase handles password hashing and session management
- 🔐 RLS policies ensure users can only access their own reports
- 🛡️ Service role key never exposed to client (only used in Edge Functions)
- ✅ Use HTTPS in production
- ✅ Keep Supabase keys secret - never commit `.env.local` to git

## Support

- Supabase Docs: https://supabase.com/docs
- Supabase Community: https://discord.supabase.io
- Next.js Auth Helpers: https://supabase.com/docs/guides/auth/auth-helpers/nextjs
