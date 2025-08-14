# 🚀 Complete Deployment Guide

## Overview
This guide covers deploying your Container Shipment Tracker:
- **Backend**: Node.js API on Render
- **Frontend**: Blazor WebAssembly on Vercel
- **Database**: NeoDB/PostgreSQL on Render

## 📋 Pre-Deployment Checklist

### ✅ Code Preparation
- [ ] All code committed and pushed to GitHub
- [ ] Backend in `server/` directory
- [ ] Frontend in `client/` directory
- [ ] Environment files configured
- [ ] Database schema ready

### ✅ Account Setup
- [ ] GitHub account with repository
- [ ] Render account created
- [ ] Vercel account created
- [ ] Domain name ready (optional)

## 🎯 Deployment Order

### Step 1: Deploy Database (Render PostgreSQL)
1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click "New" → "PostgreSQL"
3. Configure:
   - **Name**: `container-tracker-db`
   - **Database**: `container_tracker`
   - **Region**: Choose closest to users
   - **Plan**: Free or paid
4. Save the **Internal Database URL** for backend

### Step 2: Deploy Backend (Render Web Service)
1. Click "New" → "Web Service"
2. Connect GitHub repository
3. Configure:
   - **Name**: `container-tracker-api`
   - **Environment**: `Node`
   - **Root Directory**: `server`
   - **Build Command**: `npm install && npm run build && npm run db:deploy`
   - **Start Command**: `npm start`
4. Add environment variables:
   ```
   DATABASE_URL=[Your PostgreSQL Internal URL]
   NODE_ENV=production
   CLIENT_URL=https://your-app.vercel.app
   ```
5. Deploy and wait for completion
6. Note your API URL: `https://your-api.onrender.com`

### Step 3: Update Frontend Configuration
Update `client/wwwroot/appsettings.Production.json`:
```json
{
  "ApiBaseUrl": "https://your-actual-render-app.onrender.com/api"
}
```

### Step 4: Deploy Frontend (Vercel)
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Import GitHub repository
4. Configure:
   - **Framework Preset**: Other
   - **Root Directory**: `client`
   - **Build Command**: `dotnet publish -c Release -o publish`
   - **Output Directory**: `publish/wwwroot`
5. Deploy and get your URL: `https://your-app.vercel.app`

### Step 5: Update CORS Configuration
Update backend environment variable:
```
CLIENT_URL=https://your-actual-vercel-app.vercel.app
```

## 🔧 Configuration Files Ready

### Backend Files ✅
- `package.json` - Build scripts configured
- `prisma/schema.prisma` - PostgreSQL provider
- `src/index.ts` - CORS and routes configured
- `.env.example` - Environment template

### Frontend Files ✅
- `client.csproj` - Project configuration
- `appsettings.json` - Development API URL
- `appsettings.Production.json` - Production API URL
- `vercel.json` - Vercel deployment config
- `.vercelignore` - Exclude unnecessary files

## 🌐 URLs After Deployment

### Development URLs
- Backend: `http://localhost:3000`
- Frontend: `http://localhost:5000`

### Production URLs
- Database: Internal Render PostgreSQL
- Backend: `https://your-api.onrender.com`
- Frontend: `https://your-app.vercel.app`

## 🧪 Testing Checklist

### After Backend Deployment
- [ ] Health check: `GET /api/health`
- [ ] Database connected: Check logs
- [ ] CORS headers present: Check network tab

### After Frontend Deployment
- [ ] App loads successfully
- [ ] API calls work (check network tab)
- [ ] Shipments page loads data
- [ ] Create shipment functionality works
- [ ] Maps display correctly (if enabled)

## 🐛 Common Issues & Solutions

### Backend Issues
| Issue | Solution |
|-------|----------|
| Build fails | Check root directory is `server` |
| Database connection fails | Verify DATABASE_URL format |
| CORS errors | Update CLIENT_URL environment variable |

### Frontend Issues
| Issue | Solution |
|-------|----------|
| Build fails | Ensure root directory is `client` |
| API calls fail | Check API URL in production config |
| 404 on refresh | Verify vercel.json SPA routing |

## 📊 Monitoring

### Render Monitoring
- Service logs: Real-time application logs
- Metrics: CPU, memory, response times
- Database: Connection count, query performance

### Vercel Monitoring
- Function logs: Build and runtime logs
- Analytics: Page views, performance metrics
- Real User Monitoring: Core web vitals

## 🚀 Going Live

### Production Readiness
- [ ] Remove sample/seed data
- [ ] Configure custom domains
- [ ] Set up monitoring alerts
- [ ] Configure backups
- [ ] Update API rate limiting
- [ ] Enable security headers

### Performance Optimization
- [ ] Enable gzip compression
- [ ] Configure CDN caching
- [ ] Optimize images
- [ ] Minimize bundle sizes
- [ ] Set up database indexing

## 📚 Additional Resources
- [Render Documentation](https://render.com/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [Blazor WebAssembly Hosting](https://docs.microsoft.com/en-us/aspnet/core/blazor/host-and-deploy/webassembly)
- [Express.js Production Best Practices](https://expressjs.com/en/advanced/best-practice-performance.html)

## 🆘 Support
If you encounter issues:
1. Check service logs in respective dashboards
2. Verify environment variables
3. Test API endpoints with Postman/curl
4. Check CORS configuration
5. Review build commands and directory structure
