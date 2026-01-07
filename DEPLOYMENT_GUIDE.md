# Deployment Guide

## Frontend Deployment (Vercel) ✅

Your frontend is already deployed on Vercel. However, you need to configure the backend API URL.

### Step 1: Configure Environment Variable in Vercel

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add a new environment variable:
   - **Name:** `VITE_API_URL`
   - **Value:** Your backend API URL (see Backend Deployment below)
   - **Environment:** Production, Preview, Development (select all)

4. **Redeploy** your application after adding the environment variable

### Step 2: Get Your Backend URL

You need to deploy your backend first (see Backend Deployment section below).

---

## Backend Deployment Options

You have several options to deploy your backend:

### Option 1: Railway (Recommended - Easy)

1. **Sign up/Login** to [Railway.app](https://railway.app)
2. **Create New Project** → **Deploy from GitHub repo**
3. **Select your repository** and choose the `backend` folder
4. **Set Root Directory** to `backend`
5. **Add Environment Variables:**
   - `PORT` = `5000` (or leave default)
   - `JWT_SECRET` = (generate a secure random string)
6. **Deploy** - Railway will automatically deploy
7. **Get your URL** - Railway provides a URL like: `https://your-app.railway.app`
8. **Update Vercel** - Set `VITE_API_URL` to `https://your-app.railway.app/api`

### Option 2: Render (Free Tier Available)

1. **Sign up** at [Render.com](https://render.com)
2. **New** → **Web Service**
3. **Connect your GitHub repo**
4. **Settings:**
   - **Name:** v2marketing-backend
   - **Root Directory:** `backend`
   - **Environment:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
5. **Environment Variables:**
   - `PORT` = `5000`
   - `JWT_SECRET` = (generate a secure random string)
6. **Deploy** and get your URL
7. **Update Vercel** with the Render URL

### Option 3: Heroku

1. **Install Heroku CLI** and login
2. **Create app:** `heroku create v2marketing-backend`
3. **Set environment variables:**
   ```bash
   heroku config:set JWT_SECRET=your-secret-key
   ```
4. **Deploy:**
   ```bash
   cd backend
   git subtree push --prefix backend heroku main
   ```
5. **Get URL** and update Vercel

### Option 4: Keep Backend Local (Not Recommended for Production)

If you want to keep the backend running locally:
- Use a service like **ngrok** to expose your localhost
- Or use **Cloudflare Tunnel**
- Update `VITE_API_URL` in Vercel to the tunnel URL

---

## Quick Fix: Use Local Products (Temporary)

If you can't deploy the backend right now, the frontend will automatically use products from `src/data/products.js` as a fallback. However, the admin panel won't work without the backend.

---

## Testing After Deployment

1. **Check Backend Health:**
   - Visit: `https://your-backend-url.com/api/health`
   - Should return: `{"status":"ok","message":"Backend is running"}`

2. **Check Products API:**
   - Visit: `https://your-backend-url.com/api/products`
   - Should return JSON array of products

3. **Update Vercel Environment Variable:**
   - Set `VITE_API_URL` = `https://your-backend-url.com/api`
   - Redeploy frontend

4. **Test Admin Panel:**
   - Login at: `https://your-vercel-app.vercel.app/admin/login`
   - Should be able to see inventory and products

---

## Environment Variables Summary

### Frontend (Vercel)
- `VITE_API_URL` = `https://your-backend-url.com/api`

### Backend (Railway/Render/etc.)
- `PORT` = `5000` (optional, defaults to 5000)
- `JWT_SECRET` = (any secure random string)

---

## Troubleshooting

### Products not showing on website
- Check browser console (F12) for errors
- Verify `VITE_API_URL` is set in Vercel
- Check if backend is accessible: `https://your-backend-url.com/api/products`

### Admin panel not working
- Backend must be deployed and accessible
- Check CORS settings in backend (should allow your Vercel domain)
- Verify `VITE_API_URL` points to correct backend URL

### CORS Errors
- Make sure backend `server.js` has CORS enabled (it does)
- Add your Vercel domain to allowed origins if needed

---

## Current Status

✅ Frontend: Deployed on Vercel  
⏳ Backend: Needs to be deployed  
📝 Next Step: Deploy backend and configure `VITE_API_URL` in Vercel

