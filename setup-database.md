# 🚀 TOOLBAY Database Setup Guide

## Step 1: Get Your API Keys ✅

1. Go to: https://supabase.com/dashboard/project/xrkfsctliwbiwomwjawg/settings/api
2. Copy these values:
   - **URL**: `https://xrkfsctliwbiwomwjawg.supabase.co`
   - **anon public key**: (starts with `eyJ...`)  
   - **service_role secret**: (starts with `eyJ...`) ⚠️ Keep secure!

## Step 2: Update Environment Files

### Backend `.env` file:
```bash
SUPABASE_URL=https://xrkfsctliwbiwomwjawg.supabase.co
SUPABASE_ANON_KEY=eyJ...your_anon_key
SUPABASE_SERVICE_ROLE_KEY=eyJ...your_service_role_key
```

### Frontend `.env` file:
```bash
VITE_SUPABASE_URL=https://xrkfsctliwbiwomwjawg.supabase.co
VITE_SUPABASE_ANON_KEY=eyJ...your_anon_key
```

## Step 3: Run Database Schema

1. Go to Supabase Dashboard → **SQL Editor**:
   https://supabase.com/dashboard/project/xrkfsctliwbiwomwjawg/sql

2. **Copy and paste the contents** of `database/schema.sql`

3. **Click "Run"** to execute the schema

4. **Verify tables were created** in the Table Editor:
   https://supabase.com/dashboard/project/xrkfsctliwbiwomwjawg/editor

## Step 4: Seed with Sample Data (Optional)

1. In the SQL Editor, copy and paste `database/seed.sql`
2. Click "Run" to populate with sample tools and data

## Step 5: Test the Setup

1. Install backend dependencies:
   ```bash
   cd backend && npm install
   ```

2. Start the backend server:
   ```bash
   npm run dev
   ```

3. Test the API:
   - Health: http://localhost:3001/health
   - API: http://localhost:3001/api
   - Tools: http://localhost:3001/api/tools

## Expected Database Tables:
- ✅ `users` - Anonymous user system
- ✅ `categories` - Tool categories  
- ✅ `tools` - Main tools table
- ✅ `opinions` - User reviews
- ✅ `votes` - Opinion voting
- ✅ `tool_ratings` - Tool ratings
- ✅ `activity_log` - User activity tracking

## Need Help?
If you encounter any issues, let me know and I'll help troubleshoot!