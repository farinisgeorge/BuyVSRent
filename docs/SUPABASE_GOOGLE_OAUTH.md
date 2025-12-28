# Configuring Google OAuth in Supabase

This guide explains how to set up Google Sign-in through Supabase for the Stealth Investor app.

## Why Supabase for Google OAuth?

Supabase handles all the OAuth complexity for you:
- ✅ Manages OAuth tokens
- ✅ Handles redirects securely
- ✅ No need to expose API keys to the frontend
- ✅ Automatic email verification
- ✅ Built-in session management

## Prerequisites

- Google Cloud Project
- Supabase project set up
- Your app's URL (e.g., `http://localhost:3000` for local development)

## Step 1: Create a Google OAuth App

### 1.1 Go to Google Cloud Console

1. Navigate to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Go to **APIs & Services** → **Library**
4. Search for and enable "Google+ API"

### 1.2 Create OAuth 2.0 Credentials

1. Go to **APIs & Services** → **Credentials**
2. Click **+ CREATE CREDENTIALS** → **OAuth client ID**
3. If prompted, configure the OAuth consent screen first:
   - Choose **External** user type
   - Fill in app name: "Stealth Investor"
   - Add your support email
   - Add developer contact
   - Save and continue through optional steps

### 1.3 Set OAuth Redirect URI

1. Back in **Credentials**, click **+ CREATE CREDENTIALS** → **OAuth client ID**
2. Select **Web application**
3. Add these Authorized redirect URIs:
   - `https://your-project.supabase.co/auth/v1/callback`
   - `http://localhost:3000/auth/callback` (for local development)

4. Click **CREATE**
5. Copy your **Client ID** and **Client Secret**

## Step 2: Configure Google OAuth in Supabase

### 2.1 Add Google OAuth Provider

1. Go to your [Supabase Dashboard](https://app.supabase.com)
2. Select your project
3. Go to **Authentication** → **Providers**
4. Find **Google** in the list
5. Toggle it **ON**

### 2.2 Enter Google Credentials

1. Paste your **Google Client ID**
2. Paste your **Google Client Secret**
3. Click **Save**

**Note:** Your redirect URL should automatically be:
```
https://your-project.supabase.co/auth/v1/callback
```

Supabase handles the OAuth flow internally - no additional code needed!

## Step 3: Update Your App Code

### 3.1 Add Google Sign-In to AuthModal

In `src/components/AuthModal.tsx`, import the function:

```tsx
const { signInWithGoogle } = useAuth();
```

Add the Google button to your form (after the existing form):

```tsx
{/* Google Sign In Button */}
<button
  onClick={async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      if (error) throw error;
    } catch (err) {
      setError(err.message || 'Failed to sign in with Google');
    }
  }}
  className="w-full flex items-center justify-center gap-2 py-2 px-4 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
>
  <svg className="w-5 h-5" viewBox="0 0 24 24">
    {/* Google logo SVG */}
  </svg>
  Continue with Google
</button>
```

### 3.2 Add signInWithGoogle to AuthContext

In `src/contexts/AuthContext.tsx`:

```tsx
interface AuthContextType {
  user: User | null;
  loading: boolean;
  signUp: (email: string, password: string) => Promise<any>;
  signIn: (email: string, password: string) => Promise<any>;
  signInWithGoogle: () => Promise<any>;  // Add this
  signOut: () => Promise<any>;
  resetPassword: (email: string) => Promise<any>;
}
```

Then in the value object:

```tsx
const value: AuthContextType = {
  user,
  loading,
  signUp,
  signIn,
  signInWithGoogle: async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${typeof window !== 'undefined' ? window.location.origin : ''}/auth/callback`,
      },
    });
    if (error) throw error;
    return data;
  },
  signOut,
  resetPassword,
};
```

## Step 4: Set Up the Auth Callback Route

### 4.1 Create Callback Handler

Create `app/auth/callback/route.ts`:

```typescript
import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');

  if (code) {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    await supabase.auth.exchangeCodeForSession(code);
  }

  // URL to redirect to after sign in process completes
  return NextResponse.redirect(new URL('/calculator', request.url));
}
```

## Step 5: Test Locally

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start your dev server:
   ```bash
   npm run dev
   ```

3. Open `http://localhost:3000`

4. Try signing in:
   - Click on a sign-in button
   - Click "Continue with Google"
   - Google OAuth flow should open
   - Sign in with a Google account
   - You should be redirected back to your app as a logged-in user

## Step 6: Deploy to Production

### 6.1 Update Redirect URI in Google Console

1. Go back to [Google Cloud Console](https://console.cloud.google.com/)
2. Go to **APIs & Services** → **Credentials**
3. Edit your OAuth 2.0 Client ID
4. Add your production URL to **Authorized redirect URIs**:
   ```
   https://yourdomain.com/auth/callback
   ```

### 6.2 Update Supabase Provider

1. In Supabase dashboard
2. Go to **Authentication** → **Providers** → **Google**
3. Verify Client ID and Secret are still correct
4. Check the redirect URL is updated if needed

### 6.3 Deploy Your App

```bash
npm run build
npm start
```

## Troubleshooting

### "Invalid redirect URI" Error

**Problem:** Google rejects the redirect during OAuth flow

**Solution:**
- Check the exact URL in Google Console matches your app
- Must be: `https://your-project.supabase.co/auth/v1/callback`
- No trailing slashes
- Case-sensitive domain

### "Auth callback failed"

**Problem:** The `/auth/callback` route isn't handling the code

**Solution:**
- Verify `app/auth/callback/route.ts` exists
- Check it imports `exchangeCodeForSession` from Supabase
- Verify environment variables are set
- Check browser console for errors

### Users not appearing in Supabase

**Problem:** Google sign-ins aren't being saved to the database

**Solution:**
- Check **Authentication** → **Users** in Supabase dashboard
- Look for entries with Google provider
- Verify email verification isn't blocking signups

### "Provider not enabled" Error

**Problem:** Google provider toggle is OFF

**Solution:**
- Go to **Authentication** → **Providers**
- Find **Google**
- Toggle it **ON**
- Ensure Client ID and Secret are filled

## Security Best Practices

1. **Never share your Client Secret** - Only use in server-side code
2. **Supabase handles tokens securely** - Never expose access tokens
3. **Use HTTPS in production** - Google requires secure connections
4. **Rotate credentials regularly** - If compromised, generate new ones
5. **Monitor authentication logs** - Check Supabase for suspicious activity

## Advanced: Customizing User Data

After successful Google sign-in, you can access user info:

```typescript
const { data: { user } } = await supabase.auth.getUser();

if (user?.user_metadata?.full_name) {
  // User name from Google profile
}

if (user?.user_metadata?.avatar_url) {
  // User avatar from Google profile
}

if (user?.email) {
  // Email address
}
```

Store this in a `profiles` table if needed:

```typescript
await supabase
  .from('profiles')
  .insert({
    id: user.id,
    full_name: user.user_metadata?.full_name,
    avatar_url: user.user_metadata?.avatar_url,
  });
```

## Resources

- [Supabase Google Auth Docs](https://supabase.com/docs/guides/auth/social-login/auth-google)
- [Google OAuth Setup](https://developers.google.com/identity/protocols/oauth2)
- [Supabase Auth Flow](https://supabase.com/docs/guides/auth/concepts)
- [Supabase Configuration](https://supabase.com/docs/guides/auth/social-login)

---

**Questions?** Check the Supabase documentation or reach out to their community Discord. Supabase auth is production-ready and handles all the complexity for you!
