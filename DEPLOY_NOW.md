# 🚀 Deploy to Vercel NOW

Your Convex backend is deployed and ready!

**Production Convex URL:** `https://cautious-falcon-743.convex.cloud`

## Quick Deploy via Dashboard (2 minutes)

### Step 1: Import Project
1. Open: https://vercel.com/new
2. Click "Import Git Repository"
3. Select: `mrpajzl/partex-website`
4. Click "Import"

### Step 2: Configure
**Framework Preset:** Next.js (auto-detected)

**Environment Variables:**
```
NEXT_PUBLIC_CONVEX_URL=https://cautious-falcon-743.convex.cloud
```

Click "Add" after entering the variable.

### Step 3: Deploy
Click "Deploy" button

**That's it!** ✨

Your site will be live at:
- `https://partex-website-xxx.vercel.app` (preview)
- Custom domain can be added after deployment

---

## Alternative: CLI Deploy

If you prefer CLI:

```bash
cd /Users/ondrejzraly/clawd/partex-website
npx vercel login
npx vercel --prod
```

Follow prompts and paste the Convex URL when asked for environment variables.

---

## After Deployment

1. ✅ Visit your live site
2. ✅ Test the admin panel at `/admin`
3. ✅ Add custom domain in Vercel settings
4. ✅ Run Lighthouse audit

## Status Check

- ✅ Code pushed to GitHub
- ✅ Convex deployed to production
- ✅ Database seeded with content
- ⏳ Waiting for Vercel deployment

**Next:** Import project on Vercel dashboard!
