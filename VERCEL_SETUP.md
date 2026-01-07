# Vercel Setup - Fix Connection Error

## Problem
Your frontend on Vercel is trying to connect to `localhost:5000` which doesn't work in production.

## Solution: Configure Backend API URL

### Step 1: Deploy Your Backend

You need to deploy your backend first. Choose one:

**Option A: Railway (Easiest)**
1. Go to [railway.app](https://railway.app)
2. New Project → Deploy from GitHub
3. Select your repo, set Root Directory to `backend`
4. Get your URL: `https://your-app.railway.app`

**Option B: Render**
1. Go to [render.com](https://render.com)
2. New Web Service → Connect GitHub
3. Root Directory: `backend`
4. Get your URL: `https://your-app.onrender.com`

### Step 2: Configure Vercel Environment Variable

1. **Go to Vercel Dashboard**
   - Visit [vercel.com](https://vercel.com)
   - Select your project

2. **Navigate to Settings**
   - Click on your project
   - Go to **Settings** tab
   - Click **Environment Variables** in the left sidebar

3. **Add Environment Variable**
   - **Key:** `VITE_API_URL`
   - **Value:** `https://your-backend-url.com/api` (replace with your actual backend URL)
   - **Environment:** Select all (Production, Preview, Development)

4. **Redeploy**
   - Go to **Deployments** tab
   - Click the three dots (⋯) on the latest deployment
   - Click **Redeploy**

### Step 3: Verify

After redeploy, test:
- Website products page should load products from backend
- Admin login should work
- Admin panel should show inventory and products

## Quick Test

1. Check backend is running: `https://your-backend-url.com/api/health`
2. Check products: `https://your-backend-url.com/api/products`
3. If both work, your backend is deployed correctly!

## Current Status

- ✅ Frontend: Deployed on Vercel
- ⏳ Backend: Needs deployment
- ⏳ Environment Variable: Needs to be set in Vercel

## Temporary Workaround

Until you deploy the backend:
- Website products page will show products from `src/data/products.js` (24 products)
- Admin panel won't work (needs backend)

