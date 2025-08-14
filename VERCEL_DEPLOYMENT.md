# Frontend Deployment on Vercel

## Prerequisites
1. A Vercel account (free tier available)
2. A GitHub repository with your frontend code
3. .NET 8 SDK for local builds (Vercel handles this automatically)

## Deployment Steps

### 1. Prepare Your Repository
Ensure your frontend code is pushed to GitHub with all the files we've configured.

### 2. Update API Configuration
Before deploying, update the production API URL in `appsettings.Production.json`:

```json
{
  "ApiBaseUrl": "https://your-render-app.onrender.com/api"
}
```

Replace `your-render-app` with your actual Render service name.

### 3. Deploy to Vercel
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Import your GitHub repository
4. Configure the project:
   - **Framework Preset**: Select "Other" or "Blazor"
   - **Root Directory**: `client` (important!)
   - **Build Command**: `dotnet publish -c Release -o publish`
   - **Output Directory**: `publish/wwwroot`
   - **Install Command**: Leave empty (Vercel auto-detects .NET)

### 4. Environment Variables (Optional)
If you need environment-specific settings:

```
ASPNETCORE_ENVIRONMENT=Production
```

### 5. Domain Configuration
After deployment, your app will be available at:
```
https://your-project-name.vercel.app
```

### 6. Update Backend CORS
Don't forget to update your backend's CORS configuration with your Vercel URL!

## Vercel Configuration Files

The following files are already configured in your project:

### `vercel.json`
```json
{
  "version": 2,
  "builds": [
    {
      "src": "client.csproj",
      "use": "@vercel/dotnet"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ]
}
```

### `.vercelignore`
```
bin/
obj/
*.user
*.tmp
.vs/
.vscode/
```

## Important Notes

- **Build Time**: First deployment may take 3-5 minutes
- **Automatic Deployments**: Every push to main branch triggers a new deployment
- **Preview Deployments**: Pull requests create preview deployments
- **SSL**: Vercel provides SSL certificates automatically
- **CDN**: Global CDN for fast loading worldwide

## Post-Deployment Checklist

1. **Test the application**: Visit your Vercel URL
2. **Verify API connectivity**: Check that data loads from your Render backend
3. **Test CORS**: Ensure cross-origin requests work
4. **Update backend**: Add your Vercel URL to CORS whitelist
5. **Domain setup** (optional): Configure custom domain in Vercel

## Custom Domain (Optional)

1. Go to your project in Vercel dashboard
2. Click "Settings" → "Domains"
3. Add your custom domain
4. Update DNS records as instructed
5. SSL certificate is automatically provisioned

## Environment-Specific Configuration

### Development
- Uses `appsettings.json`
- API URL: `http://localhost:3000/api`

### Production
- Uses `appsettings.Production.json`
- API URL: Your Render service URL

## Troubleshooting

### Build Fails
- Ensure `client` is set as root directory
- Check .NET version compatibility
- Review build logs in Vercel dashboard

### API Connection Issues
- Verify API URL in `appsettings.Production.json`
- Check CORS configuration on backend
- Ensure backend is deployed and running

### Routing Issues
- Check `vercel.json` configuration
- Ensure SPA routing is properly configured

### Performance Issues
- Enable compression in backend
- Optimize images and assets
- Use Vercel Analytics for insights

## Monitoring and Analytics

1. **Vercel Analytics**: Enable in project settings
2. **Function Logs**: Monitor serverless function execution
3. **Real User Monitoring**: Track performance metrics
4. **Error Tracking**: Set up error monitoring

## Deployment Commands Reference

```bash
# Manual deployment (if needed)
vercel --prod

# Preview deployment
vercel

# Check deployment status
vercel ls

# View logs
vercel logs [deployment-url]
```
