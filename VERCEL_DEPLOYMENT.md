# Vercel Deployment Guide

## 🚀 Quick Deployment Steps

### Option 1: Deploy via Vercel CLI (Recommended)

1. **Install Vercel CLI** (if not already installed):
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy from your project directory**:
   ```bash
   vercel
   ```

4. **Follow the prompts**:
   - Set up and deploy? **Yes**
   - Which scope? **Your account**
   - Link to existing project? **No** (for first deployment)
   - Project name: **portfolio** (or your preferred name)
   - Directory: **./** (current directory)
   - Override settings? **No**

### Option 2: Deploy via Vercel Dashboard

1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Vercel will auto-detect it's a Vite project
5. Click "Deploy"

## 🔧 Environment Variables Setup

After deployment, configure these environment variables in your Vercel dashboard:

### Required Variables:
- `VITE_API_URL` - Your backend API URL (optional, defaults to localhost)
- `VITE_EMAILJS_SERVICE_ID` - EmailJS Service ID
- `VITE_EMAILJS_TEMPLATE_ID` - EmailJS Template ID  
- `VITE_EMAILJS_PUBLIC_KEY` - EmailJS Public Key

### How to Set Environment Variables:

1. Go to your project dashboard on Vercel
2. Click on "Settings" tab
3. Click on "Environment Variables"
4. Add each variable:
   - **Name**: `VITE_EMAILJS_SERVICE_ID`
   - **Value**: `your_service_id_here`
   - **Environment**: Production, Preview, Development (check all)
5. Click "Save"

## 📁 Project Structure

```
portfolio/
├── src/                    # Frontend React code
├── public/                 # Static assets
├── dist/                   # Build output (auto-generated)
├── vercel.json             # Vercel configuration
├── .vercelignore           # Files to ignore during deployment
└── package.json            # Dependencies and scripts
```

## 🔄 Automatic Deployments

Once connected to GitHub:
- **Production**: Deploys automatically when you push to `main` branch
- **Preview**: Deploys automatically when you push to any other branch
- **Manual**: You can trigger deployments from the Vercel dashboard

## 🌐 Custom Domain (Optional)

1. Go to your project settings
2. Click "Domains"
3. Add your custom domain
4. Follow DNS configuration instructions

## 📊 Performance Optimization

Vercel automatically provides:
- ✅ Global CDN
- ✅ Automatic HTTPS
- ✅ Edge functions
- ✅ Image optimization
- ✅ Automatic builds

## 🚨 Troubleshooting

### Build Fails
- Check build logs in Vercel dashboard
- Ensure all dependencies are in `package.json`
- Verify TypeScript compilation passes locally

### Environment Variables Not Working
- Ensure variables start with `VITE_` prefix
- Redeploy after adding new variables
- Check variable names match exactly

### 404 Errors on Refresh
- The `vercel.json` configuration handles this with SPA routing
- All routes redirect to `index.html`

## 🔍 Monitoring

Vercel provides:
- Real-time deployment logs
- Performance metrics
- Error tracking
- Analytics (with Vercel Analytics)

## 📞 Support

- Vercel Documentation: [vercel.com/docs](https://vercel.com/docs)
- Vercel Community: [github.com/vercel/vercel/discussions](https://github.com/vercel/vercel/discussions)
