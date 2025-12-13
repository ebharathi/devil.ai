# Devil Agent Frontend

A modern Next.js chat interface for the Devil Agent backend.

## Features

- 🎨 **Modern UI** - ChatGPT-like interface with dark theme
- 📱 **Responsive** - Works on desktop and mobile
- 💬 **Real-time Chat** - Connect to Devil Agent backend
- 📋 **Sidebar** - Conversation history and session management
- 🚀 **No Auth** - Runs locally, no authentication needed

## Getting Started

### Prerequisites

- Node.js 18+ installed
- Devil Agent backend running on `http://localhost:5000`

### Installation

```bash
cd frontend
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
npm run build
npm start
```

## Configuration

The frontend connects to the backend API at `http://localhost:5000/api/v1/chat`. 

To change the backend URL, update the fetch URL in `app/page.tsx`:

```typescript
const response = await fetch('http://localhost:5000/api/v1/chat', {
  // ...
})
```

## Project Structure

```
frontend/
├── app/
│   ├── page.tsx          # Main chat page
│   └── globals.css        # Global styles
├── components/
│   ├── Sidebar.tsx        # Sidebar component
│   ├── ChatMessage.tsx    # Message component
│   └── ChatInput.tsx      # Input component
└── types/
    └── index.ts           # TypeScript types
```

## Tech Stack

- **Next.js 16** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **React Hooks** - State management
