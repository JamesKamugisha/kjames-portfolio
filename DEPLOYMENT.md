# Portfolio API Deployment Guide

This guide explains how to deploy the portfolio availability API so your status persists across deployments and reloads.

## 🚀 Quick Start

### Option 1: Local Development

```bash
# Install server dependencies
cd server
npm install

# Start the server
npm run dev

# In another terminal, start the frontend
npm run dev
```

### Option 2: Docker (Recommended)

```bash
# Start both services
docker-compose up -d

# Check status
docker-compose ps
```

### Option 3: Manual Deployment

```bash
# Make deploy script executable
chmod +x deploy.sh

# Run deployment
./deploy.sh
```

## 🌐 Production Deployment

### 1. Vercel/Netlify (Frontend)

- Deploy your React app normally
- Set environment variable: `REACT_APP_API_URL=https://your-api-domain.com/api`

### 2. Backend API Options

#### Option A: Railway

1. Connect your GitHub repo
2. Set environment variables
3. Deploy automatically

#### Option B: Render

1. Create new Web Service
2. Connect your repo
3. Set build command: `npm install && npm start`
4. Set start command: `npm start`

#### Option C: DigitalOcean App Platform

1. Create new app
2. Connect your repo
3. Set environment variables
4. Deploy

#### Option D: Heroku

1. Create new app
2. Connect your repo
3. Set environment variables
4. Deploy

## 🔧 Environment Variables

### Frontend (.env)

```env
REACT_APP_API_URL=https://your-api-domain.com/api
```

### Backend (.env)

```env
NODE_ENV=production
PORT=3001
```

## 📁 File Structure

```
portfolio/
├── src/                    # Frontend React code
├── server/                 # Backend API
│   ├── index.js           # Express server
│   ├── package.json       # Server dependencies
│   ├── Dockerfile         # Docker configuration
│   └── ecosystem.config.js # PM2 configuration
├── docker-compose.yml      # Local development
├── deploy.sh              # Deployment script
└── DEPLOYMENT.md          # This file
```

## 🔍 API Endpoints

- `GET /api/availability` - Get current availability status
- `PUT /api/availability` - Update availability status
- `GET /health` - Health check

## 📊 Data Persistence

The API stores data in a JSON file (`server/data/portfolio.json`) that persists across:

- Server restarts
- Deployments
- Container recreations

## 🚨 Troubleshooting

### Server won't start

```bash
# Check if port is in use
lsof -i :3001

# Kill process using port
kill -9 <PID>
```

### API connection failed

```bash
# Check server health
curl http://localhost:3001/health

# Check environment variables
echo $REACT_APP_API_URL
```

### Data not persisting

```bash
# Check data directory permissions
ls -la server/data/

# Ensure data directory exists
mkdir -p server/data
```

## 🔄 Updating Availability

Once deployed, your availability status will:

1. ✅ Save to the server database
2. ✅ Persist across page reloads
3. ✅ Persist across deployments
4. ✅ Be available from any device
5. ✅ Have a fallback to localStorage if API is down

## 🌟 Benefits of This Approach

- **Persistent**: Status survives deployments and server restarts
- **Reliable**: Fallback to localStorage if API is unavailable
- **Scalable**: Easy to add more portfolio data
- **Professional**: Real backend API instead of just localStorage
- **Deployable**: Works on any hosting platform

## 📞 Support

If you encounter issues:

1. Check the server logs
2. Verify environment variables
3. Test API endpoints manually
4. Check network connectivity
