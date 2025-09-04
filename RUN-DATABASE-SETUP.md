# 🚀 Quick Database Setup

## Step 1: Run Database Schema

1. **Go to Supabase SQL Editor:**
   https://supabase.com/dashboard/project/xrkfsctliwbiwomwjawg/sql

2. **Copy the entire contents of `database/schema.sql`** (it's a long file - make sure to copy ALL of it)

3. **Paste into the SQL Editor and click "Run"**

## Step 2: Add Sample Data (Optional)

1. **Copy the entire contents of `database/seed.sql`**
2. **Paste into the SQL Editor and click "Run"**

## Step 3: Verify Setup

Check your tables were created:
https://supabase.com/dashboard/project/xrkfsctliwbiwomwjawg/editor

You should see:
- ✅ users
- ✅ categories  
- ✅ tools
- ✅ opinions
- ✅ votes
- ✅ tool_ratings
- ✅ activity_log

## Step 4: Test Backend

```bash
cd backend && npm run dev
```

Then visit: http://localhost:3001/health

## ✅ Environment Files Ready:
- `backend/.env` - ✅ Configured with your keys
- `frontend/.env` - ✅ Configured with your keys

## 🎯 After Database Setup:
Once you run the schema, we can:
1. Test the API endpoints
2. Connect the frontend 
3. See live data in action!

Ready to run the database schema? 🚀