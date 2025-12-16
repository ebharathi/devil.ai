#!/bin/bash

echo "🚀 Starting Devil AI Agent Landing Page..."
echo "📁 Project: /home/devil/Documents/projects/stupid-ideas/ghost/landing-page"
echo "🌐 Port: 3000"
echo ""

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

echo "🔧 Building the project..."
npm run build

echo "🚀 Starting development server..."
npm run dev