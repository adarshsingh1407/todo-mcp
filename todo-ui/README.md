# Todo UI

A modern, responsive todo management interface built with Next.js, TypeScript, and Tailwind CSS. Features a split-screen layout with a todo list on the left and an AI chat interface on the right.

## 🚀 Features

### **Split-Screen Layout**

- **Left Panel**: Todo list with filtering capabilities
- **Right Panel**: AI chat interface with quick actions
- **Responsive Design**: Optimized for desktop and tablet use

### **Todo Management**

- **Real-time Todo List**: Display todos from the todo-service
- **Smart Filtering**: View All, View Done, View Remaining with dynamic counts
- **Status Management**: Mark todos as DONE or TODO
- **Clean Interface**: Minimalist design without card styling

### **AI Chat Interface**

- **Conversational UI**: Chat with AI assistant about todos
- **Quick Actions**: One-click buttons for common tasks
  - Summarize ToDos (Purple)
  - Summarize Done (Green)
  - Summarize Remaining (Orange)
- **Message History**: Persistent chat with timestamps
- **Responsive Input**: Auto-resizing textarea with keyboard shortcuts

### **Modern UI/UX**

- **Dark Glassy Theme**: Backdrop blur effects and transparency
- **Smooth Animations**: Framer Motion for fluid interactions
- **Accessibility**: Proper ARIA labels and keyboard navigation
- **Type Safety**: Full TypeScript support

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS with custom dark theme
- **UI Components**: shadcn/ui with custom components
- **State Management**: React Query (TanStack Query)
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Package Manager**: pnpm

## 📦 Installation

### Prerequisites

- Node.js 18+
- pnpm 8+
- Running todo-service and todo-mcp-service

### Setup

```bash
# Navigate to todo-ui directory
cd todo-ui

# Install dependencies
pnpm install

# Copy environment variables
cp .env.example .env.local

# Start development server
pnpm dev
```

### Environment Variables

```env
# .env.local
NEXT_PUBLIC_TODO_SERVICE_URL=http://localhost:3000
NEXT_PUBLIC_MCP_SERVICE_URL=http://localhost:3001
```

## 🏗️ Project Structure

```
todo-ui/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── layout.tsx         # Root layout with providers
│   │   ├── page.tsx           # Main page with split layout
│   │   └── globals.css        # Global styles and theme
│   ├── components/             # React components
│   │   ├── ui/                # shadcn/ui components
│   │   ├── TodoList.tsx       # Todo list with filtering
│   │   ├── Chat.tsx           # AI chat interface
│   │   └── Providers.tsx      # React Query provider
│   ├── lib/                   # Utility functions
│   │   ├── mcpClient.ts       # MCP server client
│   │   └── types.ts           # Shared TypeScript types
│   └── hooks/                 # Custom React hooks
│       └── useTodos.ts        # Todo data fetching hooks
├── public/                    # Static assets
├── tailwind.config.js         # Tailwind configuration
├── components.json            # shadcn/ui configuration
└── package.json              # Dependencies and scripts
```

## 🎨 UI Components

### **TodoList Component**

- **Filtering**: Select dropdown for different todo views
- **Dynamic Counts**: Real-time counts for each filter
- **Clean Layout**: Simple list without card styling
- **Status Indicators**: Visual distinction between TODO and DONE

### **Chat Component**

- **Modular Design**: Separate components for messages and input
- **Quick Actions**: Compact pill-style buttons with different colors
- **Message Bubbles**: User vs AI message styling
- **Responsive Input**: Auto-resizing textarea with send button

### **Layout**

- **Split Screen**: 50/50 division between todo list and chat
- **Glass Effect**: Backdrop blur and transparency
- **Subtle Border**: Short vertical separator between panels
- **Overflow Handling**: Proper scrolling and containment

## 🔧 Development

### Available Scripts

```bash
# Development
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm start        # Start production server

# Code Quality
pnpm lint         # Run ESLint
pnpm type-check   # Run TypeScript checks
```

### Key Dependencies

- **@tanstack/react-query**: Data fetching and caching
- **framer-motion**: Smooth animations
- **lucide-react**: Icon library
- **@radix-ui/react-select**: Accessible select component
- **@radix-ui/react-textarea**: Accessible textarea component

## 🔌 Integration

### **Todo Service Integration**

- **REST API**: Fetches todos from todo-service
- **Real-time Updates**: React Query for automatic refetching
- **Error Handling**: Graceful error states and loading indicators

### **MCP Service Integration** (Planned)

- **Chat Interface**: Connect to todo-mcp-service for AI interactions
- **Quick Actions**: Direct API calls for summarization features
- **Streaming**: Real-time chat responses

## 🎯 Roadmap

### **Phase 1: Core UI** ✅

- [x] Split-screen layout
- [x] Todo list with filtering
- [x] Chat interface with dummy data
- [x] Quick action buttons
- [x] Dark glassy theme

### **Phase 2: API Integration** 🚧

- [ ] Connect to todo-service for real data
- [ ] Integrate with todo-mcp-service for chat
- [ ] Implement quick action handlers
- [ ] Add real-time updates

### **Phase 3: Enhanced Features**

- [ ] Drag and drop todo reordering
- [ ] Keyboard shortcuts
- [ ] Todo search functionality
- [ ] Export/import capabilities
- [ ] Mobile responsive design

## 🐛 Troubleshooting

### Common Issues

1. **Build Errors**: Ensure Node.js version matches `.nvmrc`
2. **Styling Issues**: Check Tailwind CSS configuration
3. **API Connection**: Verify todo-service and todo-mcp-service are running
4. **Type Errors**: Run `pnpm type-check` for detailed TypeScript errors

### Development Tips

- Use `pnpm dev` for hot reloading during development
- Check browser console for API connection issues
- Use React Query DevTools for debugging data fetching
- Monitor network tab for API call failures

## 📄 License

This project is part of the todo-mcp ecosystem and follows the same license as the parent project.

## 🤝 Contributing

1. Follow the existing code style and TypeScript conventions
2. Add proper TypeScript types for new components
3. Test UI changes across different screen sizes
4. Ensure accessibility standards are met
5. Update documentation for new features

---

**Built with ❤️ using Next.js, TypeScript, and Tailwind CSS**
