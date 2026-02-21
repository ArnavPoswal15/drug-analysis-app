# Deployment Guide

## Environment Variables

### Development
```bash
# .env
NEXT_PUBLIC_API_URL=http://localhost:5001
```

### Production
```bash
# .env (production)
NEXT_PUBLIC_API_URL=https://your-backend-domain.com
```

## Deployment Steps

### 1. Frontend Deployment (Next.js)

#### Vercel (Recommended)
1. Push code to GitHub
2. Connect repository to Vercel
3. Set environment variable in Vercel dashboard:
   - `NEXT_PUBLIC_API_URL` = `https://your-backend-domain.com`
4. Deploy

#### Netlify
1. Build command: `npm run build`
2. Publish directory: `out`
3. Set environment variable in Netlify dashboard

#### Custom Hosting
1. Build: `npm run build`
2. Start: `npm start`
3. Set environment variables on server

### 2. Backend Deployment

#### Environment Variables for Backend
```bash
# backend/.env
PORT=5001
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/drug-analysis
JWT_SECRET=your-jwt-secret
NODE_ENV=production
```

#### Deployment Options
- **Heroku**: Connect GitHub repo, set config vars
- **Railway**: Auto-deploy from GitHub
- **AWS EC2**: Manual deployment with PM2
- **DigitalOcean**: App Platform or Droplet

### 3. Database Setup
- **MongoDB Atlas**: Create free cluster
- Get connection string
- Add to backend environment variables

### 4. CORS Configuration
Update backend CORS to allow production domains:
```javascript
app.use(cors({
  origin: [
    'https://your-frontend-domain.com',
    'https://vercel.app',
    'http://localhost:3000'
  ]
}));
```

## Pre-Deployment Checklist

- [ ] Update all environment variables
- [ ] Test production build: `npm run build`
- [ ] Verify API endpoints work
- [ ] Check CORS configuration
- [ ] Test error handling
- [ ] Monitor console for errors

## Common Issues

1. **API calls failing**: Check environment variables
2. **CORS errors**: Update backend CORS settings
3. **Build failures**: Check for missing dependencies
4. **Database connection**: Verify MongoDB URI

## Monitoring

- Use Vercel Analytics for frontend
- Set up logging for backend
- Monitor API response times
- Check error rates regularly
