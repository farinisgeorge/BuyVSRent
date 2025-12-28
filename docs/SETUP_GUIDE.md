# Stealth Investor - Updated Setup Guide

## What Changed

Google OAuth has been removed from the frontend and will instead be configured through Supabase. This is more secure and easier to manage.

### Changes Made

1. ✅ **AuthModal.tsx** - Removed Google sign-in button and handler
2. ✅ **AuthContext.tsx** - Removed `signInWithGoogle` method
3. ✅ **package.json** - Removed `@react-oauth/google` dependency  
4. ✅ **.env.local.example** - Removed `NEXT_PUBLIC_GOOGLE_CLIENT_ID`
5. ✅ **Created SUPABASE_GOOGLE_OAUTH.md** - Complete setup guide for Supabase OAuth

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Environment Variables

Copy `.env.local.example` to `.env.local`:

```bash
cp .env.local.example .env.local
```

Fill in your Supabase credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Set Up Supabase Database

Run the SQL schema from `docs/SUPABASE_SETUP.md` in your Supabase SQL Editor

### 4. Configure Google OAuth (Optional)

When ready to add Google sign-in:

1. Follow the step-by-step guide in `docs/SUPABASE_GOOGLE_OAUTH.md`
2. It will show you how to:
   - Create a Google OAuth app
   - Add credentials to Supabase
   - Update your AuthModal and AuthContext
   - Set up the auth callback route

### 5. Run the App

```bash
npm run dev
```

Visit `http://localhost:3000`

## Project Name: "Stealth Investor"

The project is branded as **Stealth Investor** throughout:

- **App Title:** "Stealth Investor" (no issues with the space)
- **Tool Name:** "The Stealth Buy-vs-Rent Index"
- **Package Name:** `stealth-investor` (npm naming convention uses hyphens)
- **Code:** Uses quoted strings "Stealth Investor" where needed

The space in the name is handled correctly because:
- npm package.json uses `stealth-investor` (hyphens required)
- All user-facing text uses "Stealth Investor" (with space)
- No environment variables or code identifiers use the space

## Current Authentication Flow

1. **First Report:** Free, no signup required
2. **Second+ Reports:** Requires signup/login
3. **Email/Password:** Built-in Supabase auth
4. **Google OAuth:** Coming soon (configure via Supabase when ready)

## File Structure

```
BuyVSRent/
├── app/
│   ├── page.tsx                           # Home page
│   ├── calculator/page.tsx                # Calculator page
│   ├── calculator-content.tsx             # Calculator logic
│   ├── tools/page.tsx                     # Tools hub
│   ├── about/page.tsx                     # About (placeholder)
│   ├── pricing/page.tsx                   # Pricing (placeholder)
│   ├── blog/page.tsx                      # Blog (placeholder)
│   ├── contact/page.tsx                   # Contact (placeholder)
│   └── layout.tsx                         # App layout + metadata
├── src/
│   ├── components/
│   │   ├── AuthModal.tsx                  # Login/Signup modal
│   │   ├── DetailedReport.tsx             # Financial breakdown
│   │   └── ...
│   ├── contexts/
│   │   └── AuthContext.tsx                # Auth state management
│   ├── lib/
│   │   ├── supabase.ts                    # Supabase client
│   │   ├── reportStorage.ts               # Report CRUD
│   │   └── ...
│   └── ...
├── docs/
│   ├── SUPABASE_SETUP.md                  # Database setup
│   ├── SUPABASE_GOOGLE_OAUTH.md           # Google OAuth guide
│   ├── SEO_GUIDE.md                       # SEO optimization
│   ├── PROJECT_TRANSFORMATION.md          # Project overview
│   └── ...
├── .env.local.example                     # Environment template
└── package.json                           # Dependencies
```

## Key Features

- ✅ Multi-step calculator with detailed financial analysis
- ✅ Year-by-year comparison tables
- ✅ Amortization schedule with tax analysis
- ✅ Supabase authentication (email/password)
- ✅ Report saving and sharing
- ✅ Responsive design (mobile-friendly)
- ✅ SEO optimized
- ✅ Google OAuth ready (configure via Supabase)

## Next Steps

1. **Test locally:**
   ```bash
   npm install
   npm run dev
   ```

2. **Complete placeholder content:**
   - `/about` - Your story
   - `/pricing` - Pricing tiers
   - `/blog` - Articles
   - `/contact` - Contact info

3. **When ready - Add Google OAuth:**
   - Follow `docs/SUPABASE_GOOGLE_OAUTH.md`
   - Takes ~30 minutes

4. **Deploy:**
   - Build: `npm run build`
   - Deploy to Vercel, Netlify, or your hosting

## Support

- **Supabase Docs:** https://supabase.com/docs
- **Next.js Docs:** https://nextjs.org/docs
- **Google OAuth:** https://developers.google.com/identity/protocols/oauth2

---

**Ready to launch?** Your Stealth Investor platform is production-ready! 🚀
