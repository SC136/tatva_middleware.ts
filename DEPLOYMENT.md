# Deploying Tatva Business to Vercel

This guide will help you deploy the Tatva Business application to Vercel.

## Prerequisites

- A [Vercel account](https://vercel.com/signup) (free tier works)
- A Supabase account with your project set up
- Git repository (GitHub, GitLab, or Bitbucket)

## Quick Start

### Option 1: Deploy via Vercel Dashboard (Recommended)

1. **Push your code to a Git repository**
   ```bash
   git add .
   git commit -m "Prepare for Vercel deployment"
   git push origin main
   ```

2. **Import to Vercel**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "Add New" → "Project"
   - Import your Git repository
   - Vercel will auto-detect Vite configuration

3. **Configure Environment Variables**
   - In the project settings, add the following environment variables:
     - `VITE_SUPABASE_URL`: Your Supabase project URL
     - `VITE_SUPABASE_ANON_KEY`: Your Supabase anonymous key
   
   Get these from your [Supabase Dashboard](https://app.supabase.com) → Project Settings → API

4. **Deploy**
   - Click "Deploy"
   - Wait for the build to complete (usually 1-2 minutes)
   - Your app will be live at `https://your-project.vercel.app`

### Option 2: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```
   
   Follow the prompts:
   - Set up and deploy: Yes
   - Scope: Your account
   - Link to existing project: No
   - Project name: tatva-business (or your choice)
   - Directory: `./`
   - Override settings: No

4. **Set Environment Variables**
   ```bash
   vercel env add VITE_SUPABASE_URL
   vercel env add VITE_SUPABASE_ANON_KEY
   ```
   
   Enter the values when prompted, and select all environments (production, preview, development).

5. **Deploy to Production**
   ```bash
   vercel --prod
   ```

## Environment Variables

The following environment variables are **required**:

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_SUPABASE_URL` | Your Supabase project URL | `https://xxxxx.supabase.co` |
| `VITE_SUPABASE_ANON_KEY` | Your Supabase anonymous/public key | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` |

### How to Add Environment Variables in Vercel Dashboard

1. Go to your project in Vercel Dashboard
2. Click "Settings" → "Environment Variables"
3. Add each variable with its value
4. Select which environments (Production, Preview, Development)
5. Click "Save"
6. Redeploy your project for changes to take effect

## Build Configuration

The project is configured with:
- **Framework**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Node Version**: 18.x or higher

These settings are automatically detected by Vercel from your `package.json` and `vite.config.ts`.

## Custom Domain Setup (Optional)

1. Go to your project in Vercel Dashboard
2. Click "Settings" → "Domains"
3. Add your custom domain
4. Follow the DNS configuration instructions provided by Vercel
5. Wait for DNS propagation (usually a few minutes to a few hours)

## Continuous Deployment

Once connected to your Git repository:
- **Every push** to your main branch triggers a production deployment
- **Pull requests** automatically create preview deployments
- **Rollbacks** are instant through the Vercel dashboard

## Troubleshooting

### Build Failures

If your build fails:

1. **Check build logs** in Vercel dashboard for specific errors
2. **Verify environment variables** are correctly set
3. **Test build locally**:
   ```bash
   npm run build
   npm run preview
   ```

### Environment Variable Issues

If you see "Missing Supabase environment variables" error:
1. Double-check variable names match exactly: `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`
2. Ensure variables are set for the correct environment (Production)
3. Redeploy after adding variables

### Routing Issues (404 on Refresh)

The `vercel.json` file is configured to handle SPA routing. If you still get 404 errors:
1. Verify `vercel.json` exists in your root directory
2. Check that the rewrites section is configured correctly
3. Redeploy your project

### Performance Optimization

For better performance:
1. Enable Edge Network caching in Vercel settings
2. Use Vercel Analytics to monitor performance
3. Consider enabling Web Vitals monitoring
4. Optimize images using Vercel Image Optimization

## Monitoring

### Analytics
- Enable Vercel Analytics in project settings for visitor insights
- Track Web Vitals for performance metrics

### Logs
- View deployment logs in Vercel Dashboard
- Check runtime logs under "Deployments" → Select deployment → "Logs"

## Security Best Practices

1. **Never commit `.env` files** to your repository
2. **Use Vercel Environment Variables** for sensitive data
3. **Enable Vercel's security headers** (already configured in `vercel.json`)
4. **Regularly update dependencies**: `npm update`
5. **Keep Supabase Row Level Security (RLS)** enabled

## Supabase Configuration

Ensure your Supabase project is properly configured:

1. **Database Setup**: Run the migrations in `supabase/` directory
2. **Authentication**: Enable your preferred auth providers
3. **Row Level Security**: Review and enable RLS policies
4. **API Settings**: Verify CORS settings allow your Vercel domain

## Deployment Checklist

Before deploying, ensure:

- [ ] All environment variables are set in Vercel
- [ ] Supabase database is set up with required tables
- [ ] Local build succeeds: `npm run build`
- [ ] Git repository is up to date
- [ ] `vercel.json` is committed to repository
- [ ] `.env` is in `.gitignore`
- [ ] Dependencies are up to date

## Post-Deployment

After successful deployment:

1. **Test all features** on your live site
2. **Verify authentication** works correctly
3. **Test voice recording** functionality
4. **Check analytics** and reports generation
5. **Test on mobile devices**
6. **Monitor error logs** for any issues

## Support & Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html#vercel)
- [Supabase Documentation](https://supabase.com/docs)
- [Project README](./README.md)

## Updating Your Deployment

To update your deployed application:

### Via Git (Automatic)
```bash
git add .
git commit -m "Your update message"
git push origin main
```
Vercel will automatically build and deploy.

### Via Vercel CLI
```bash
vercel --prod
```

### Manual Redeploy
1. Go to Vercel Dashboard
2. Navigate to your project
3. Go to "Deployments" tab
4. Click "..." menu on any deployment
5. Select "Redeploy"

## Cost Considerations

**Free Tier Includes:**
- Unlimited deployments
- 100GB bandwidth per month
- Automatic HTTPS
- Preview deployments
- Edge Network

**Upgrade if you need:**
- More bandwidth
- Advanced analytics
- Team collaboration features
- Priority support

---

## Need Help?

If you encounter any issues:
1. Check the Vercel deployment logs
2. Review the troubleshooting section above
3. Consult [Vercel Support](https://vercel.com/support)
4. Check [Supabase Community](https://github.com/supabase/supabase/discussions)

Happy deploying! 🚀
