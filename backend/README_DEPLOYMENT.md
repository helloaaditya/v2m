# Backend Deployment Guide

## Quick Deploy to Railway (Easiest)

1. **Go to** [railway.app](https://railway.app) and sign up/login
2. **New Project** → **Deploy from GitHub repo**
3. **Select your repository**
4. **Settings:**
   - **Root Directory:** `backend`
   - **Build Command:** (leave empty, Railway auto-detects)
   - **Start Command:** `npm start`
5. **Environment Variables:**
   - `PORT` = `5000` (optional)
   - `JWT_SECRET` = (generate a random secure string)
   - `FRONTEND_URL` = `https://your-vercel-app.vercel.app` (your Vercel frontend URL)
6. **Deploy** - Railway will automatically build and deploy
7. **Get your URL** - Railway provides: `https://your-app.railway.app`
8. **Update Vercel** - Add environment variable:
   - `VITE_API_URL` = `https://your-app.railway.app/api`

## Quick Deploy to Render

1. **Go to** [render.com](https://render.com) and sign up
2. **New** → **Web Service**
3. **Connect GitHub** and select your repo
4. **Settings:**
   - **Name:** v2marketing-backend
   - **Root Directory:** `backend`
   - **Environment:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
5. **Environment Variables:**
   - `PORT` = `5000`
   - `JWT_SECRET` = (random secure string)
   - `FRONTEND_URL` = (your Vercel URL)
6. **Deploy** and copy the URL
7. **Update Vercel** with the Render URL

## After Deployment

1. Test backend: `https://your-backend-url.com/api/health`
2. Test products: `https://your-backend-url.com/api/products`
3. Update Vercel environment variable: `VITE_API_URL`
4. Redeploy frontend on Vercel


