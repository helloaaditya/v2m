# Fix CORS Error on Render

## Problem
CORS error: `Access-Control-Allow-Origin` header is missing when frontend (Vercel) tries to access backend (Render).

## Solution

### Step 1: Update Environment Variables in Render

1. Go to your Render dashboard
2. Select your service
3. Go to **Environment** tab
4. Add/Update these variables:

   **FRONTEND_URL:**
   - Value: `https://v2m-rho.vercel.app`
   - (Or use comma-separated for multiple: `https://v2m-rho.vercel.app,https://v2m.vercel.app`)

   **JWT_SECRET:**
   - Value: (any secure random string)

### Step 2: Redeploy Backend

After updating environment variables:
1. Go to **Manual Deploy** in Render
2. Click **Deploy latest commit**
3. Wait for deployment to complete

### Step 3: Test

1. Test backend health:
   ```
   https://v2m.onrender.com/api/health
   ```

2. Test products endpoint:
   ```
   https://v2m.onrender.com/api/products
   ```

3. Test from browser console (on your Vercel site):
   ```javascript
   fetch('https://v2m.onrender.com/api/health')
     .then(r => r.json())
     .then(console.log)
   ```

### Step 4: Update Vercel (if not done)

1. Go to Vercel → Settings → Environment Variables
2. Add: `VITE_API_URL` = `https://v2m.onrender.com/api`
3. Redeploy frontend

## What I Fixed

✅ Updated CORS configuration to:
- Allow your Vercel domain specifically
- Handle preflight OPTIONS requests
- Allow proper HTTP methods (GET, POST, PUT, DELETE)
- Allow Authorization header for JWT tokens

## After Fix

Once you:
1. Set `FRONTEND_URL` in Render
2. Redeploy backend
3. Set `VITE_API_URL` in Vercel
4. Redeploy frontend

Everything should work! 🎉

