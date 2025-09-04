# 🚀 Supabase Setup Guide for TOOLBAY

## Step 1: Create Supabase Project

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Click "New Project"
3. Fill in project details:
   - **Organization**: Your organization
   - **Name**: `TOOLBAY`
   - **Database Password**: Generate a strong password (save it!)
   - **Region**: Choose closest to your users
   - **Pricing Plan**: Free tier is fine for development

## Step 2: Execute Database Schema

1. In your Supabase dashboard, go to **SQL Editor**
2. Copy and paste the contents of `database/schema.sql`
3. Click **Run** to execute the schema

## Step 3: Get Your Credentials

1. Go to **Settings** → **API** in your Supabase dashboard
2. Copy these values:
   - **URL**: Your unique Supabase URL
   - **anon public key**: For client-side operations
   - **service_role secret**: For server-side operations (keep secure!)

## Step 4: Environment Variables

Create `.env` files with your Supabase credentials:

### Frontend `.env` file:
```bash
VITE_SUPABASE_URL=your_supabase_url_here
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

### Backend `.env` file:
```bash
SUPABASE_URL=your_supabase_url_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
SUPABASE_ANON_KEY=your_anon_key_here
DATABASE_URL=postgresql://postgres:your_password@db.your_project_ref.supabase.co:5432/postgres
JWT_SECRET=your_jwt_secret_here
```

## Step 5: Install Supabase Client Libraries

### For Backend (Node.js):
```bash
cd backend
npm install @supabase/supabase-js
```

### For Frontend (React):
```bash
cd frontend
npm install @supabase/supabase-js
```

## Step 6: Configure Row Level Security (RLS)

The schema already includes RLS policies, but you may need to adjust them based on your requirements.

## Step 7: Seed Database with Mock Data

After the schema is created, you can run the seed script to populate with your existing mock tools data.

## Database Structure Overview

### Core Tables:
- **users**: Anonymous IP-based user system
- **categories**: Tool categories (AI, Productivity, etc.)
- **tools**: Main tools table with ratings and metadata
- **opinions**: User reviews and comments
- **votes**: Voting system for opinions
- **tool_ratings**: Direct ratings for tools
- **activity_log**: Track all user actions

### Key Features:
- ✅ **Full-text search** on tools (name, description, tags)
- ✅ **Automatic statistics updates** via triggers
- ✅ **Row Level Security** for data protection
- ✅ **IP-based user identification** (no auth required)
- ✅ **Real-time capabilities** ready
- ✅ **Comprehensive indexing** for performance
- ✅ **Trust scoring system** for users and content
- ✅ **Activity logging** for analytics

## Next Steps:
1. Create Supabase project
2. Run the schema
3. Get credentials and set up environment variables
4. We'll then create the backend API server to connect to this database

Ready to proceed? 🚀