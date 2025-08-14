# Render Deployment Guide

## Backend Deployment on Render

### Prerequisites
1. GitHub account with your code repository
2. Render account (https://render.com)
3. NeoDB or PostgreSQL database ready

### Deployment Steps

1. **Connect Repository to Render**
   - Go to https://render.com and sign in
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select the repository containing your backend code

2. **Configure Build Settings**
   - **Name**: `container-tracker-backend`
   - **Environment**: `Node`
   - **Region**: `Oregon (US West)` or your preferred region
   - **Branch**: `main`
   - **Root Directory**: `server` (important!)
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`

3. **Environment Variables**
   Add these environment variables in Render dashboard:
   ```
   NODE_ENV=production
   DATABASE_URL=your_neodb_connection_string_here
   CLIENT_URL=https://your-vercel-app.vercel.app
   ```

4. **Advanced Settings**
   - **Auto-Deploy**: `Yes` (if you want automatic deployments)
   - **Instance Type**: `Starter` (free tier)

5. **Database Migration**
   After first deployment, you may need to run migrations:
   - Go to your service dashboard
   - Use the "Shell" tab to run: `npm run db:deploy`

### Important Notes

- The free tier on Render will spin down after 15 minutes of inactivity
- First request after spin-down may take 30+ seconds
- Database should be persistent (NeoDB handles this)
- Make sure your NeoDB database allows connections from Render's IP ranges

### Troubleshooting

1. **Build Failures**: Check that `server` is set as the root directory
2. **Database Connection**: Verify DATABASE_URL format and credentials
3. **CORS Issues**: Update CLIENT_URL environment variable with your actual Vercel URL

### Post-Deployment

1. Test your API endpoints: `https://your-render-app.onrender.com/api/shipments`
2. Update frontend configuration to use the Render backend URL
3. Verify CORS is working between Render and Vercel
