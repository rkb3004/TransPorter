# NeoDB Setup Guide

This guide will help you set up NeoDB (PostgreSQL-compatible database) for the Container Shipment Tracker.

## Option 1: Local NeoDB Setup

### Prerequisites
- NeoDB installed locally
- PostgreSQL client tools (optional, for management)

### Steps

1. **Install NeoDB** (if not already installed):
   ```bash
   # Follow NeoDB installation instructions for your platform
   # Usually involves downloading and running the NeoDB server
   ```

2. **Start NeoDB Server**:
   ```bash
   # Start your NeoDB instance (commands vary by installation method)
   neodb-server start
   ```

3. **Create Database**:
   ```bash
   # Connect to NeoDB and create the database
   createdb container_tracker
   ```

4. **Update Environment Variables**:
   Edit the `.env` file with your NeoDB connection details:
   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/container_tracker?schema=public"
   ```

## Option 2: NeoDB Cloud Service

1. **Create NeoDB Cloud Account**:
   - Sign up for NeoDB cloud service
   - Create a new database instance

2. **Get Connection String**:
   - Copy the connection string from your NeoDB dashboard
   - It should look like: `postgresql://username:password@your-host:5432/database_name`

3. **Update Environment Variables**:
   ```env
   DATABASE_URL="postgresql://username:password@your-neodb-host:5432/database_name?schema=public"
   ```

## Option 3: Local PostgreSQL (Compatible Alternative)

If you prefer to use standard PostgreSQL locally:

1. **Install PostgreSQL**:
   ```bash
   # Ubuntu/Debian
   sudo apt update
   sudo apt install postgresql postgresql-contrib
   
   # macOS with Homebrew
   brew install postgresql
   
   # Windows - Download from postgresql.org
   ```

2. **Start PostgreSQL Service**:
   ```bash
   # Ubuntu/Debian
   sudo systemctl start postgresql
   sudo systemctl enable postgresql
   
   # macOS
   brew services start postgresql
   ```

3. **Create Database and User**:
   ```bash
   sudo -u postgres psql
   ```
   
   In PostgreSQL prompt:
   ```sql
   CREATE DATABASE container_tracker;
   CREATE USER tracker_user WITH ENCRYPTED PASSWORD 'your_password';
   GRANT ALL PRIVILEGES ON DATABASE container_tracker TO tracker_user;
   \q
   ```

4. **Update Environment Variables**:
   ```env
   DATABASE_URL="postgresql://tracker_user:your_password@localhost:5432/container_tracker?schema=public"
   ```

## Database Migration

Once you have your NeoDB/PostgreSQL instance running:

1. **Generate Prisma Client**:
   ```bash
   npm run db:generate
   ```

2. **Run Database Migration**:
   ```bash
   npm run db:migrate
   ```

3. **Seed Database with Sample Data**:
   ```bash
   npm run db:seed
   ```

## Verification

Test your connection:
```bash
# Test database connection
npx prisma studio
```

This will open Prisma Studio in your browser where you can view and manage your data.

## Troubleshooting

### Connection Issues
- Verify NeoDB/PostgreSQL is running
- Check connection string format
- Ensure database exists
- Verify user permissions

### Migration Issues
- Clear old migrations: `npm run db:reset`
- Regenerate client: `npm run db:generate`
- Run migration again: `npm run db:migrate`

### Performance Tips
- NeoDB is optimized for analytical workloads
- Consider connection pooling for production
- Monitor query performance with built-in tools

## Production Deployment

For production deployment:
1. Use NeoDB cloud service or hosted PostgreSQL
2. Set up proper connection pooling
3. Configure SSL connections
4. Set up database backups
5. Monitor database performance
