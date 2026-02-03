# Deployment Guide

This guide will walk you through deploying the Partex website to Vercel with Convex backend.

## Prerequisites

- GitHub account (repository already set up at https://github.com/mrpajzl/partex-website)
- Vercel account (sign up at https://vercel.com)
- Convex project (already created during development)

## Step 1: Deploy Convex to Production

1. Deploy your Convex functions to production:
```bash
npx convex deploy
```

2. This will give you a production URL like `https://your-deployment.convex.cloud`

3. Copy the `CONVEX_DEPLOY_KEY` from your Convex dashboard if you need it for CI/CD

## Step 2: Deploy to Vercel

### Option A: Via Vercel Dashboard (Recommended)

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "Add New Project"
3. Import your GitHub repository: `mrpajzl/partex-website`
4. Configure the project:
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: `./`
   - **Build Command**: `npm run build` (default)
   - **Output Directory**: `.next` (default)

5. Add Environment Variables:
   - `NEXT_PUBLIC_CONVEX_URL`: Get from Convex dashboard (production deployment)
   - `NEXT_PUBLIC_SITE_URL`: Your production domain (e.g., `https://partex.com`)

6. Click "Deploy"

7. Your site will be live at `https://your-project.vercel.app` in ~2 minutes!

### Option B: Via Vercel CLI

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy:
```bash
vercel
```

4. Follow the prompts to link to your project

5. Deploy to production:
```bash
vercel --prod
```

## Step 3: Configure Custom Domain

1. In Vercel Dashboard, go to your project
2. Navigate to "Settings" → "Domains"
3. Add your custom domain (e.g., `partex.cz`, `www.partex.cz`)
4. Follow DNS configuration instructions:
   - Add `A` record pointing to `76.76.21.21`
   - Or add `CNAME` record pointing to `cname.vercel-dns.com`
5. SSL certificate will be automatically provisioned

## Step 4: Set Up Continuous Deployment

Vercel automatically deploys:
- **Production**: When you push to `main` branch
- **Preview**: When you create pull requests

To customize:
1. Go to Project Settings → Git
2. Configure branch patterns and deployment settings

## Step 5: Verify Deployment

1. Visit your deployed site
2. Check that all sections load correctly:
   - ✅ Hero section with gradient background
   - ✅ Services section with cards
   - ✅ Newsletter subscription form
   - ✅ Service details
   - ✅ Pricing packages
   - ✅ About section
   - ✅ Contact information

3. Test the admin panel at `/admin`:
   - ✅ Services management
   - ✅ Pricing management
   - ✅ Contact management
   - ✅ Content editing

## Performance Optimization

After deployment, verify performance:

1. Run Lighthouse audit:
   - Performance: Should be 90+
   - SEO: Should be 100
   - Accessibility: Should be 90+
   - Best Practices: Should be 90+

2. Check Core Web Vitals in Vercel Analytics:
   - Go to Project → Analytics
   - Monitor LCP, FID, CLS scores

3. If needed, optimize:
   - Images: Use Next.js Image component
   - Fonts: Ensure proper font loading
   - JavaScript: Code split large components

## Monitoring

### Vercel Analytics
- Enabled by default for all deployments
- View traffic, performance, and user metrics
- Access at: Project → Analytics

### Error Tracking
- Check deployment logs in Vercel dashboard
- Monitor function logs for errors
- Set up notifications for failed deployments

### Convex Dashboard
- Monitor database queries
- View function logs
- Check storage usage

## Environment Variables

Make sure these are set in Vercel:

| Variable | Value | Description |
|----------|-------|-------------|
| `NEXT_PUBLIC_CONVEX_URL` | `https://xxx.convex.cloud` | Production Convex deployment URL |
| `NEXT_PUBLIC_SITE_URL` | `https://your-domain.com` | Your production domain |

## Troubleshooting

### Build Fails

1. Check build logs in Vercel dashboard
2. Common issues:
   - Missing environment variables
   - TypeScript errors
   - Missing dependencies

### Convex Connection Issues

1. Verify `NEXT_PUBLIC_CONVEX_URL` is correct
2. Check Convex deployment is active
3. Ensure functions are deployed: `npx convex deploy`

### 404 Errors

1. Check Next.js routing configuration
2. Verify all pages are in the `app/` directory
3. Clear Vercel cache and redeploy

## Rollback

If you need to rollback:

1. Go to Vercel Dashboard → Deployments
2. Find the previous working deployment
3. Click "..." → "Promote to Production"

## CI/CD Integration

For advanced workflows:

1. Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
      - run: npm install
      - run: npx convex deploy --cmd 'npm run build'
      - uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
```

2. Add secrets to GitHub:
   - `VERCEL_TOKEN`
   - `VERCEL_ORG_ID`
   - `VERCEL_PROJECT_ID`

## Post-Deployment

### SEO Setup
- [ ] Submit sitemap to Google Search Console
- [ ] Verify site with Google Analytics
- [ ] Set up Facebook Pixel (if needed)
- [ ] Configure Open Graph images

### Security
- [ ] Enable Vercel's DDoS protection
- [ ] Set up rate limiting for API routes
- [ ] Configure CORS if needed

### Monitoring
- [ ] Set up uptime monitoring (e.g., UptimeRobot)
- [ ] Configure error tracking (e.g., Sentry)
- [ ] Set up Slack notifications for deployments

---

## Quick Deploy Checklist

- [ ] Code pushed to GitHub
- [ ] Convex deployed to production (`npx convex deploy`)
- [ ] Environment variables set in Vercel
- [ ] Project imported and deployed on Vercel
- [ ] Custom domain configured (if applicable)
- [ ] SSL certificate verified
- [ ] Admin panel tested
- [ ] Newsletter subscription tested
- [ ] Lighthouse audit passed
- [ ] Analytics enabled

**🎉 Your site is now live!**

For questions or issues, contact: info@partex.cz
