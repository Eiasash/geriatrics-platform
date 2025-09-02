# Supabase Integration Setup Guide

## Overview
This guide will help you integrate Supabase database with your Geriatrics Pro application for real-time data management, authentication, and HIPAA-compliant storage.

## Why Supabase?
- **Built-in Authentication**: Role-based access for different user types
- **Real-time subscriptions**: Live updates for patient monitoring
- **Row Level Security (RLS)**: HIPAA-compliant data access control
- **PostgreSQL**: Robust database for medical records
- **Storage included**: For patient documents and imaging

## Step 1: Create Supabase Project

1. Go to [Supabase](https://supabase.com/dashboard)
2. Click "New Project"
3. Fill in project details:
   - **Name**: `geriatrics-pro`
   - **Database Password**: Choose a strong password
   - **Region**: Select closest to your users
4. Click "Create new project"
5. Wait for setup to complete (2-3 minutes)

## Step 2: Get Your API Keys

1. In your Supabase dashboard, go to **Settings → API**
2. Copy the following values:
   - **Project URL** (e.g., `https://xyz.supabase.co`)
   - **Anon/Public Key** (starts with `eyJhb...`)

## Step 3: Configure Environment Variables

1. In your project root, copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` and add your Supabase credentials:
   ```env
   VITE_SUPABASE_URL=https://your-project-ref.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key-here
   ```

## Step 4: Set Up Database Schema

1. In Supabase dashboard, go to **SQL Editor**
2. Copy the entire contents of `src/data/supabase-schema.sql`
3. Paste into the SQL Editor and click **Run**

This will create:
- **Tables**: patients, assessments, alerts, medication_records, tasks, staff, handoffs
- **Indexes**: For optimal query performance  
- **RLS Policies**: Security rules for data access
- **Functions**: Automated risk calculations and alerting
- **Triggers**: Auto-generate alerts based on assessment scores
- **Sample Data**: Demo patients and assessments

## Step 5: Verify Setup

1. Go to **Table Editor** in Supabase
2. You should see all tables created
3. Check the `patients` table - it should have 2 sample patients
4. Check the `assessments` table - it should have sample MMSE and Morse Fall scores

## Step 6: Test the Integration

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to the **Assessments** page
3. Try creating a new assessment (you'll need to add your own patient data or modify the hardcoded patient ID in the component)

## Authentication Setup (Optional)

### Enable Email Authentication
1. Go to **Authentication → Settings** in Supabase
2. Enable "Email" provider
3. Configure email templates if needed

### Set up Row Level Security Policies
The schema includes basic RLS policies. For production, you'll want to customize these based on your user roles:

```sql
-- Example: Nurses can only see patients in their ward
CREATE POLICY "nurses_ward_access" ON patients 
FOR SELECT TO authenticated 
USING (
  ward = (SELECT ward FROM staff WHERE email = auth.email())
);
```

## Real-time Features

The integration includes real-time subscriptions for:
- Patient data changes
- New alerts
- Assessment updates

These will automatically update the UI when data changes in the database.

## Production Considerations

### Security
- Review and customize RLS policies for your organization
- Set up proper user roles and permissions
- Enable SSL certificate
- Configure backup schedules

### Performance  
- Set up database indexes for your query patterns
- Consider connection pooling for high traffic
- Monitor query performance in Supabase dashboard

### Compliance
- Enable database audit logs
- Set up data retention policies
- Configure encryption at rest (enabled by default)
- Review HIPAA compliance features

## Features Enabled

With Supabase integration, your Geriatrics Pro app now supports:

### ✅ Interactive Assessments
- **MMSE** - Mini Mental State Examination
- **Morse Fall Scale** - Fall risk assessment  
- **TUG Test** - Timed Up and Go mobility test
- **Braden Scale** - Pressure ulcer risk (coming soon)

### ✅ Real-time Monitoring
- Live patient data updates
- Instant alert notifications
- Assessment score tracking

### ✅ Automated Alerts
- Cognitive decline detection (MMSE < 24)
- High fall risk alerts (Morse ≥ 45)
- Critical value notifications
- Risk level auto-updates

### ✅ Data Management
- Patient records with full medical histories
- Medication tracking with interactions
- Task management and assignments
- Shift handoff documentation

## Troubleshooting

### Connection Issues
- Verify your `.env` file has correct credentials
- Check that Supabase project is active
- Ensure you're using the correct project URL

### Authentication Problems
- Make sure RLS policies allow your queries
- Check that user has proper permissions
- Verify JWT token is valid

### Performance Issues
- Check database connection pool settings
- Monitor query performance in Supabase
- Consider adding indexes for frequent queries

## Support

For issues specific to Supabase:
- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Discord](https://discord.supabase.com)

For issues with this integration:
- Check the browser console for errors
- Verify your environment variables
- Test database connection manually

## Next Steps

1. **Deploy to Production**: Use Vercel's Supabase integration
2. **Add More Assessment Tools**: MoCA, MNA, Beers Criteria
3. **Implement User Roles**: Different access levels for nurses, doctors, etc.
4. **Set up Monitoring**: Track usage and performance metrics
5. **Add Reporting**: Generate clinical reports and analytics