# MongoDB Collections Setup

## ✅ Automatic Collection Creation

**Good News!** You don't need to run any migration script manually. 

When your server starts on **Render** (where `MONGODB_URI` is set), it will **automatically create all collections**:

- ✅ `users` - User accounts
- ✅ `inventory` - Inventory items  
- ✅ `activities` - Activity history
- ✅ `products` - Product catalog

## How It Works

1. **Server starts** on Render
2. **Connects to MongoDB** (using `MONGODB_URI` environment variable)
3. **Automatically initializes all collections** - even if they're empty
4. **Collections appear in MongoDB Atlas** immediately

## Check Your Collections

1. Go to **MongoDB Atlas Dashboard**
2. Click on your **database** (`v2marketing`)
3. Click **Browse Collections**
4. You should see all 4 collections:
   - `users` (with default admin user)
   - `inventory` (empty, ready for data)
   - `activities` (empty, ready for data)
   - `products` (empty, ready for data)

## Local Testing (Optional)

If you want to test locally, create a `.env` file in the `backend` folder:

```bash
# Copy the example file
cp .env.example .env

# Edit .env and add your MONGODB_URI
```

Then run:
```bash
npm run migrate
```

**But this is optional!** Collections will be created automatically on Render.

## Migration Script (Optional)

The migration script (`migrate-to-mongodb.js`) is only needed if you want to:
- Move existing JSON file data to MongoDB
- Test locally with MongoDB

**You don't need it for Render deployment** - collections are created automatically!

---

## Summary

✅ **Collections are created automatically** when server starts on Render  
✅ **No manual migration needed**  
✅ **All 4 collections will appear** in MongoDB Atlas  
✅ **Data persists** across restarts and redeploys  

Just make sure `MONGODB_URI` is set in Render's environment variables!


