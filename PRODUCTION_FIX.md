# Fix Production Deployment - Quick Guide

## Problem
Changes work locally but not in production. This is usually a **build/cache issue**.

## Quick Fix Steps

### Option 1: Force Rebuild on Vercel (Recommended)

1. **Go to Vercel Dashboard**
   - Visit https://vercel.com
   - Login and select your project

2. **Trigger New Deployment**
   - Go to **Deployments** tab
   - Click the **three dots (⋯)** on the latest deployment
   - Click **Redeploy**
   - **IMPORTANT**: Check "Use existing Build Cache" = **OFF** (unchecked)
   - Click **Redeploy**

3. **Wait for Build to Complete**
   - Watch the build logs
   - Make sure build succeeds without errors

4. **Clear Browser Cache**
   - After deployment completes, hard refresh: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
   - Or test in **Incognito/Private mode**

### Option 2: Push Empty Commit to Trigger Build

If Vercel auto-deploy is enabled, push a commit to trigger rebuild:

```bash
git commit --allow-empty -m "Trigger production rebuild"
git push origin main
```

### Option 3: Verify Build Includes New Files

Check if the build output includes your new files:

1. **Check Build Logs in Vercel**
   - Look for any errors about missing files
   - Verify `useAnimatedCounter.js` and `stats.js` are being bundled

2. **Check Browser Console on Production**
   - Open DevTools (F12)
   - Go to Console tab
   - Look for errors like:
     - `Cannot find module '../hooks/useAnimatedCounter'`
     - `404` errors for missing files

### Option 4: Manual Cache Clear

If using Vercel:

1. Go to **Settings** → **General**
2. Scroll to **Build & Development Settings**
3. Clear build cache (if option available)
4. Redeploy

## Verify Changes Are Live

After redeploy, check:

1. ✅ **Stats Animation**: Numbers should count up from 0 on page load
2. ✅ **Mobile Layout**: No overflow, proper spacing
3. ✅ **No Red Overlays**: Images should have dark overlays, not red
4. ✅ **Dynamic Stats**: All numbers come from `stats.js` config

## If Still Not Working

1. **Check File Paths in Production**
   - Open browser DevTools → Network tab
   - Reload page
   - Look for 404 errors on:
     - `/hooks/useAnimatedCounter.js`
     - `/config/stats.js`

2. **Verify Import Statements**
   - Check that imports use correct paths:
     ```javascript
     import { useAnimatedCounter } from '../hooks/useAnimatedCounter';
     import { stats } from '../config/stats';
     ```

3. **Check Build Output**
   - In Vercel, check the build logs
   - Look for warnings about unused imports or missing files

## Common Issues

### Issue: "Module not found" error
**Solution**: Files might not be in the repository. Check:
```bash
git ls-files | grep useAnimatedCounter
git ls-files | grep stats.js
```

### Issue: Changes not reflecting
**Solution**: 
- Clear browser cache completely
- Try different browser
- Check if CDN caching is enabled (disable temporarily)

### Issue: Build succeeds but changes don't appear
**Solution**:
- Wait 1-2 minutes for CDN propagation
- Hard refresh browser
- Check if you're looking at the correct deployment URL

## Need Help?

If none of these work, check:
1. Vercel build logs for errors
2. Browser console for JavaScript errors
3. Network tab for failed file loads
