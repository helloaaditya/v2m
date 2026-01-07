# Deploy Backend to Render - Step by Step

## Fix the Build Error

The error shows Render is trying to run `npm run build` which doesn't exist. Here's how to fix it:

## Option 1: Update Render Settings (Recommended)

1. **Go to your Render Dashboard**
   - Visit [dashboard.render.com](https://dashboard.render.com)
   - Find your service

2. **Go to Settings**
   - Click on your service
   - Scroll to **Build & Deploy**

3. **Update Build Command:**
   - Change from: `npm install; npm run build`
   - Change to: `npm install`
   - (Remove the `npm run build` part)

4. **Verify Start Command:**
   - Should be: `npm start`

5. **Save and Redeploy**

## Option 2: Use render.yaml (Alternative)

I've created a `render.yaml` file in the `backend` folder. If you're deploying from the root:

1. **Create render.yaml in root** (or use the one in backend folder)
2. **Deploy using the YAML file**

## Render Configuration

### Build Settings:
- **Build Command:** `npm install`
- **Start Command:** `npm start`
- **Root Directory:** `backend` (if deploying from root repo)

### Environment Variables:
Add these in Render dashboard:

1. **PORT** = `5000` (optional, Render auto-assigns)
2. **JWT_SECRET** = (any secure random string, e.g., `my-super-secret-jwt-key-12345`)
3. **FRONTEND_URL** = `https://your-vercel-app.vercel.app` (your Vercel frontend URL)

### After Deployment:

1. **Get your Render URL:**
   - Render provides: `https://your-service.onrender.com`
   - Your API will be at: `https://your-service.onrender.com/api`

2. **Test the backend:**
   - Health: `https://your-service.onrender.com/api/health`
   - Products: `https://your-service.onrender.com/api/products`

3. **Update Vercel:**
   - Go to Vercel → Settings → Environment Variables
   - Add: `VITE_API_URL` = `https://your-service.onrender.com/api`
   - Redeploy frontend

## Quick Fix Right Now

1. In Render dashboard, go to your service
2. Settings → Build & Deploy
3. Change **Build Command** to just: `npm install`
4. Click **Save Changes**
5. Click **Manual Deploy** → **Deploy latest commit**

This should fix the build error!

