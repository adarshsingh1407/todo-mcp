# Todo UI

A modern, modular React application for managing todos with an AI-powered chat interface. Built with Next.js, TypeScript, and the Model Context Protocol (MCP).

## 🚀 Features

### **Todo Management**

- ✅ Create, read, update, and delete todos
- ✅ Visual status indicators (checkmarks for completed todos)
- ✅ Filter todos by status (All, Done, Remaining)
- ✅ Copy todo IDs to chat with one click
- ✅ Delete todos directly from the table
- ✅ Real-time updates via React Query
- ✅ Responsive table design with glassy theme
- ✅ Loading states and error handling

### **AI Chat Interface**

- 💬 Natural language todo management
- 🤖 Slash commands for quick actions
- 📝 Smart suggestions for common tasks
- 🔄 Auto-complete for commands
- 📊 AI-powered summaries of todo lists

### **Modern UI/UX**

- 🌙 Dark glassy theme with backdrop blur
- 📱 Responsive design for all screen sizes
- ⚡ Fast interactions with React Query
- 🎨 Beautiful animations and transitions
- 🔍 Intuitive command suggestions
- 🎯 Smart suggestions for quick actions
- ⌨️ Keyboard navigation support

## 🏗️ Architecture

### **Modular Component Structure**

```
src/
├── components/
│   ├── chat/           # Chat-related components
│   │   ├── ChatHeader.tsx
│   │   ├── ChatMessage.tsx
│   │   ├── ChatMessages.tsx
│   │   └── SmartSuggestions.tsx
│   ├── todo/           # Todo-related components
│   │   ├── TodoHeader.tsx
│   │   ├── TodoFilter.tsx
│   │   └── TodoTable.tsx
│   ├── ui/             # shadcn/ui components
│   ├── Chat.tsx        # Main chat container
│   ├── ChatInput.tsx   # Chat input with commands
│   ├── TodoList.tsx    # Main todo container
│   └── Providers.tsx   # React Query provider
├── lib/
│   ├── hooks/          # Custom React hooks
│   │   ├── useChat.ts  # Chat state management
│   │   └── useTodos.ts # Todo data fetching
│   ├── constants.ts    # Shared constants
│   ├── mcpClient.ts    # MCP server communication
│   ├── types.ts        # TypeScript types
│   └── utils.ts        # Utility functions
└── app/
    └── page.tsx        # Main application page
```

### **Custom Hooks**

- **`useTodos`** - Manages todo data fetching with React Query
- **`useChat`** - Handles chat state, messages, and command processing

### **Key Components**

- **`TodoTable`** - Displays todos in a clean table format
- **`ChatMessages`** - Renders chat conversation
- **`SmartSuggestions`** - Quick action buttons
- **`TodoFilter`** - Filter dropdown with counts

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui with Radix UI
- **State Management**: React Query (TanStack Query)
- **Icons**: Lucide React
- **Package Manager**: pnpm
- **Form Handling**: React Hook Form with Zod validation

## 🚀 Getting Started

### **Prerequisites**

- Node.js 18+
- pnpm
- Running todo-service and todo-mcp-service

### **Installation**

```bash
# Install dependencies
pnpm install

# Start the development server
pnpm dev
```

### **Environment Variables**

Create a `.env.local` file:

```env
NEXT_PUBLIC_MCP_SERVER_URL=http://localhost:3001
```

## 📖 Usage

### **Todo Management**

1. **View Todos**: Todos are displayed in a clean table format
2. **Filter**: Use the dropdown to filter by status (All, Done, Remaining)
3. **Copy ID**: Click the copy icon to copy a todo ID to the chat
4. **Delete**: Click the trash icon to delete a todo

### **Chat Commands**

- `/add-todo <title>` - Create a new todo
- `/mark-done <id>` - Mark a todo as completed
- `/mark-todo <id>` - Mark a todo as pending
- `/delete-todo <id>` - Delete a todo
- `/summarise-remaining` - Get AI summary of pending todos
- `/summarise-completed` - Get AI summary of completed todos

### **Smart Suggestions**

Click the quick action buttons to:

- Add a new todo
- Summarize remaining todos
- Summarize completed todos

## 🔧 Development

### **Available Scripts**

```bash
pnpm dev          # Start development server with Turbopack
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Run ESLint
```

### **Project Structure**

- **Components**: Modular, reusable UI components
- **Hooks**: Custom React hooks for business logic
- **Types**: TypeScript type definitions
- **Constants**: Shared constants and configurations

### **Adding New Features**

1. Create new components in appropriate directories
2. Add custom hooks for business logic
3. Update types as needed
4. Follow the existing patterns for consistency

## 🎨 Design System

### **Theme**

- **Dark glassy theme** with backdrop blur effects
- **Consistent color palette** with blue, purple, and indigo accents
- **Smooth transitions** and hover effects
- **Responsive design** for all screen sizes

### **Components**

- **shadcn/ui** for consistent, accessible components
- **Custom styling** with Tailwind CSS
- **Icon integration** with Lucide React

## 🔗 Integration

### **MCP Server**

- Communicates with todo-mcp-service via HTTP
- Supports all MCP tools and resources
- Real-time todo updates

### **Todo Service**

- RESTful API for todo CRUD operations
- PostgreSQL database backend
- Docker containerization

## 📝 Contributing

1. Follow the existing code structure and patterns
2. Use TypeScript for type safety
3. Write modular, reusable components
4. Update documentation as needed
5. Test your changes thoroughly

## 📄 License

This project is part of the todo-mcp project and follows the same license terms.
