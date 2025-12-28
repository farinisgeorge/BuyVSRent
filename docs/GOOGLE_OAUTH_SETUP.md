# Google OAuth Setup Guide for Stealth Investor

This guide walks you through setting up Google Sign-in for your Stealth Investor app.

## Prerequisites

- Google account (personal or business)
- Access to Google Cloud Console
- Your app's redirect URL (e.g., `http://localhost:3000/auth/callback` for local, `https://yourdomain.com/auth/callback` for production)

## Step 1: Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click the **Project** dropdown at the top
3. Click **NEW PROJECT**
4. Enter project name: `Stealth Investor` (or your preference)
5. Click **CREATE**
6. Wait for the project to be created (2-3 minutes)

## Step 2: Enable Google+ API

1. In the left sidebar, click **APIs & Services** → **Library**
2. Search for **"Google+ API"** (or just "Google API")
3. Click **Google+ API** from results
4. Click **ENABLE**

## Step 3: Create OAuth 2.0 Credentials

1. Go to **APIs & Services** → **Credentials** (left sidebar)
2. Click **+ CREATE CREDENTIALS** (blue button)
3. Select **OAuth client ID**
4. If prompted: Click **CONFIGURE CONSENT SCREEN** first

### 3a. Configure OAuth Consent Screen

1. Choose **External** for User Type
2. Click **CREATE**
3. Fill in required fields:
   - **App name:** `Stealth Investor`
   - **User support email:** Your email
   - **Developer contact info:** Your email
4. Click **SAVE AND CONTINUE**
5. Skip optional scopes (click **SAVE AND CONTINUE**)
6. Skip test users (click **SAVE AND CONTINUE**)
7. Click **BACK TO DASHBOARD**

### 3b. Create OAuth Client ID

1. Go back to **APIs & Services** → **Credentials**
2. Click **+ CREATE CREDENTIALS**
3. Select **OAuth client ID**
4. Choose **Web application**
5. Fill in:
   - **Name:** `Stealth Investor Web`
6. Under **Authorized redirect URIs**, click **+ ADD URI**
7. Add these URIs:
   - Local development: `http://localhost:3000/auth/callback`
   - Production: `https://yourdomain.com/auth/callback`
8. Click **CREATE**

## Step 4: Copy Your Client ID

1. A modal will appear with your **Client ID** and **Client Secret**
2. **Copy the Client ID** (you'll need this immediately)
3. Click **OK** to close the modal

## Step 5: Add Client ID to Your App

1. Open `.env.local` in your project root
2. Add or update this line:
   ```
   NEXT_PUBLIC_GOOGLE_CLIENT_ID=paste_your_client_id_here
   ```
3. Replace `paste_your_client_id_here` with your actual Client ID
4. Save the file

**Example:**
```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_key
NEXT_PUBLIC_GOOGLE_CLIENT_ID=123456789-abc123def456.apps.googleusercontent.com
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Step 6: Verify Supabase Configuration

Google OAuth requires proper Supabase configuration:

1. Go to your [Supabase Project](https://app.supabase.com)
2. Click **Authentication** → **Providers**
3. Find **Google** in the list
4. Toggle it **ON**
5. You don't need to enter credentials (Supabase handles this with OAuth providers)

## Step 7: Test Locally

1. Make sure your app is running:
   ```bash
   npm run dev
   ```

2. Open your browser to `http://localhost:3000`

3. Click on a CTA button that triggers authentication (e.g., on second report)

4. The AuthModal should appear with a **"Continue with Google"** button

5. Click the Google button and sign in

6. You should be redirected back and logged in

## Step 8: Deploy to Production

Before deploying:

1. **Add production redirect URI to Google Console:**
   - Go back to [Google Cloud Console](https://console.cloud.google.com/)
   - Click **APIs & Services** → **Credentials**
   - Find your OAuth 2.0 Client ID
   - Click the **edit icon** (pencil)
   - Add your production domain: `https://yourdomain.com/auth/callback`
   - Click **SAVE**

2. **Update `.env.local` on production server:**
   ```
   NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_client_id
   NEXT_PUBLIC_APP_URL=https://yourdomain.com
   ```

3. **Deploy your app:**
   ```bash
   npm run build
   npm start
   ```

## Troubleshooting

### "Invalid redirect URI"
- Verify the redirect URI matches exactly in Google Console
- Include `/auth/callback` in the URL
- Use `http://` for localhost, `https://` for production
- No trailing slashes

### Google button doesn't appear
- Check `.env.local` has `NEXT_PUBLIC_GOOGLE_CLIENT_ID`
- Check the Client ID is not empty in console: `console.log(process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID)`
- Restart dev server after changing .env.local

### "OAuth error" when clicking button
- Check browser console for specific error message
- Verify Google provider is enabled in Supabase
- Clear browser cookies/cache
- Try in incognito mode

### Client ID shows as undefined
- Ensure `.env.local` file exists in project root (not `.env.local.example`)
- Check file has no typos: `NEXT_PUBLIC_GOOGLE_CLIENT_ID=...`
- Restart dev server: `npm run dev`
- Rebuild after changes: `npm run build`

### "Redirect mismatch" error
- The exact URL must match Google Console settings
- Check protocol (http vs https)
- Check domain spelling exactly
- Check `/auth/callback` is included

## Next Steps

After Google OAuth is working:

1. ✅ Test email/password signup still works
2. ✅ Test Google signup works
3. ✅ Verify users are created in Supabase `auth.users` table
4. ✅ Verify email verification emails are sent
5. ✅ Test saving reports as authenticated user
6. ✅ Test on mobile devices
7. ✅ Deploy to production
8. ✅ Test production Google sign-in

## Security Best Practices

1. **Never share your Client ID** (it's public-safe for frontend)
2. **Never commit `.env.local` to git** (use `.env.local.example` as template)
3. **Client Secret** (if needed) should never be in frontend code
4. **Rotate credentials** if you suspect compromise
5. **Monitor** [Google Cloud Console Activity Logs](https://console.cloud.google.com/logs)

## Advanced Configuration

### Custom Scopes (Optional)

If you need additional user data, you can configure scopes in `src/lib/supabase.ts`:

```typescript
await supabase.auth.signInWithOAuth({
  provider: 'google',
  options: {
    redirectTo: `${window.location.origin}/auth/callback`,
    scopes: 'openid profile email', // Customize if needed
  },
});
```

Common scopes:
- `openid` - User identity
- `profile` - Name, picture, gender
- `email` - Email address (always requested)

### Auto-Profile Population

After Google signup, you can populate user profile:

```typescript
// In AuthContext or after successful Google signin
const { data: { user } } = await supabase.auth.getUser();
if (user?.user_metadata?.avatar_url) {
  // User has a Google profile picture
  // Store in your profiles table if needed
}
```

## Resources

- [Google OAuth Documentation](https://developers.google.com/identity/protocols/oauth2)
- [Supabase Google Auth](https://supabase.com/docs/guides/auth/social-login/auth-google)
- [Next.js Environment Variables](https://nextjs.org/docs/basic-features/environment-variables)
- [OAuth 2.0 Explained](https://oauth.net/2/)

---

**Stuck?** Check the browser console (F12) for error messages - they usually tell you exactly what's wrong!

Need help? [Contact Support](https://support.google.com/cloud/answer/11129855?hl=en)
