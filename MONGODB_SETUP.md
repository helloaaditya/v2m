# MongoDB Setup Guide - Fix Data Loss Issue

## Problem

Your admin data (inventory, products, activities) is getting deleted because:
- **Render's filesystem is ephemeral** - Data in JSON files gets wiped when:
  - Service restarts
  - Service redeploys
  - Service goes to sleep (free tier)
  - Container/instance is replaced

## Solution: Use MongoDB Atlas (Free & Persistent)

MongoDB Atlas provides free cloud database storage that persists your data permanently.

---

## Step 1: Create MongoDB Atlas Account

1. **Go to** [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. **Sign up** for a free account (or login if you have one)
3. **Create a free cluster** (M0 - Free tier)

---

## Step 2: Create Database & Get Connection String

1. **Click "Connect"** on your cluster
2. **Choose "Connect your application"**
3. **Copy the connection string** - It looks like:
   ```
   mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
4. **Replace `<password>`** with your database password
5. **Add database name** - Replace `?retryWrites=true&w=majority` with:
   ```
   /v2marketing?retryWrites=true&w=majority
   ```
   Final string should look like:
   ```
   mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/v2marketing?retryWrites=true&w=majority
   ```

---

## Step 3: Configure Network Access

1. In MongoDB Atlas dashboard, go to **Network Access**
2. **Add IP Address**
3. **Allow Access from Anywhere** (for Render deployment):
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere"
   - Or add Render's IP ranges if you prefer

---

## Step 4: Add Environment Variable in Render

1. **Go to Render Dashboard**
   - Visit [dashboard.render.com](https://dashboard.render.com)
   - Find your backend service

2. **Go to Environment Variables**
   - Click on your service
   - Go to **Environment** tab
   - Click **Add Environment Variable**

3. **Add MongoDB URI:**
   - **Key:** `MONGODB_URI`
   - **Value:** Your connection string from Step 2
   - Example: `mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/v2marketing?retryWrites=true&w=majority`

4. **Optional - Database Name:**
   - **Key:** `DB_NAME`
   - **Value:** `v2marketing` (or your preferred name)

5. **Save Changes**

---

## Step 5: Install Dependencies & Redeploy

The code already includes MongoDB support! Just:

1. **Install MongoDB package** (if not already done):
   ```bash
   cd backend
   npm install
   ```

2. **Commit and push** to trigger Render redeploy:
   ```bash
   git add .
   git commit -m "Add MongoDB support for persistent storage"
   git push
   ```

3. **Or manually redeploy** in Render dashboard

---

## Step 6: Verify It's Working

1. **Check Render logs** - You should see:
   ```
   ✅ Connected to MongoDB
   ✅ Default admin user created
   ```

2. **Test your admin panel:**
   - Login to admin panel
   - Add some inventory items
   - Restart your Render service
   - **Data should still be there!** ✅

---

## How It Works

- **With MongoDB:** Data is stored in cloud database (persistent)
- **Without MongoDB:** Falls back to JSON files (ephemeral on Render)

The code automatically detects if `MONGODB_URI` is set:
- ✅ **If set:** Uses MongoDB (persistent)
- ⚠️ **If not set:** Uses JSON files (temporary, will be lost)

---

## Troubleshooting

### "MongoDB connection error"
- Check your connection string is correct
- Verify network access allows Render's IPs
- Make sure password doesn't have special characters (URL encode if needed)

### "Database not connected"
- Check `MONGODB_URI` environment variable is set in Render
- Check Render logs for connection errors
- Verify MongoDB Atlas cluster is running

### Data still getting deleted
- Make sure `MONGODB_URI` is set in Render
- Check Render logs to confirm MongoDB connection
- Verify you see "✅ Connected to MongoDB" in logs

---

## Benefits

✅ **Persistent Storage** - Data survives restarts, redeploys, and sleep  
✅ **Free Tier** - 512MB storage (plenty for most apps)  
✅ **Automatic Backups** - MongoDB Atlas handles backups  
✅ **Scalable** - Easy to upgrade when needed  
✅ **Secure** - Encrypted connections, IP whitelisting  

---

## Next Steps

After setup:
1. Your existing data in JSON files will be migrated automatically on first use
2. All new data will be stored in MongoDB
3. Data will persist across all deployments and restarts

**Your data loss problem is now solved!** 🎉

