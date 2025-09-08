#!/bin/bash

echo "🚀 Deploying Portfolio API..."

# Navigate to server directory
cd server

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build and start the server
echo "🔨 Starting server..."
npm start &

# Wait for server to start
echo "⏳ Waiting for server to start..."
sleep 5

# Check if server is running
if curl -f http://localhost:3001/health > /dev/null 2>&1; then
    echo "✅ Server is running successfully!"
    echo "🌐 API available at: http://localhost:3001/api"
    echo "🔍 Health check: http://localhost:3001/health"
else
    echo "❌ Server failed to start"
    exit 1
fi

echo "🎉 Deployment complete!"
echo "💡 To stop the server, use: pkill -f 'node index.js'"
