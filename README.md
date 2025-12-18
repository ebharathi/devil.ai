# Devil AI Agent - Complete Setup Guide

## 📋 Overview
Devil AI is a powerful agent with full system access capabilities. This guide provides step-by-step instructions to set up the complete system with Redis, the AI agent, and frontend.

## 🚀 Quick Start Options

### **Option 1: Docker Setup (Recommended for Beginners)**
Everything runs in containers - easiest to set up and manage with no write access.

### **Option 2: Local Setup**
Run everything directly on your machine - best for utilizing full power.

---

## 📁 Project Structure
```
devil/
├── .env                    # Environment variables(must be added by you)
├── example.env            # Template for environment variables
├── main.py               # FastAPI application entry point
├── requirements.txt      # Python dependencies
├── Dockerfile           # Docker configuration
├── README.md           # This file
├── agents/             # Agent Prompt
├── controllers/        # API controllers
├── middleware/         # FastAPI middleware
├── models/            # LLM models
├── routes/           # API routes
├── storage/          # Agent Memory storage
├── tools/           # Tool implementations
└── utils/           # Utility functions
```

---

## ⚙️ Environment Variables Setup

### **Step 1: Copy Environment Template**
```bash
cd devil && cp example.env .env
```

### **Step 2: Configure Your .env File**
Open `.env` in a text editor and fill in these values:

```env
# LLM API Configuration 
LLM_MODEL=''
LLM_API_KEY='' 
LLM_BASE_URL=''

# Redis Configuration
REDIS_HOST=localhost      # Use 'redis' for Docker setup
REDIS_PORT=6379

# Security Settings
SAFE_MODE=false     (Optional)                 
```

---

## 🐳 Option 1: Docker Setup (Easiest & No Write Access)

### **Prerequisites**
- [Docker](https://docs.docker.com/get-docker/) installed
- [Docker Compose](https://docs.docker.com/compose/install/) installed

### **Step 1: Start All Services**
```bash

cd docker
# Start everything with one command
docker-compose up -d

# Check if everything is running
docker-compose ps

# View logs
docker-compose logs -f
```

### **Step 3: Verify Services**
- **Frontend**: Running on `http://localhost:56789`
- **AI Agent**: Running on `http://localhost:5000`
- **Redis**: Running on `localhost:6379`

---

## 💻 Option 2: Local Setup (For Devil Mode)

### **Prerequisites**
- Agent : Python 3.10+ installed
- Memory: Redis installed/run redis via docker
- UI    : Node.js 18+ (for frontend)

### **Step 1: Install Redis**

####  **Run Redis via docker**
```bash
docker run -d \
  --name redis \
  -p 6379:6379 \
  -v redis_data:/data \
  redis:7-alpine \
  redis-server --appendonly yes
```

#### **On Ubuntu/Debian:**
```bash
sudo apt update
sudo apt install redis-server
sudo systemctl start redis
sudo systemctl enable redis
```

#### **On macOS:**
```bash
brew install redis
brew services start redis
```

#### **On Windows:**
1. Download Redis from [redis.io/download](https://redis.io/download)
2. Extract and run `redis-server.exe`

### **Step 2: Start Agent**
```bash
cd devil

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Linux/macOS:
source venv/bin/activate

# On Windows:
venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Start the agent
python main.py
```

### **Step 3: Serve Frontend**
```bash
cd frontend

npm i

npm run dev
```

---
