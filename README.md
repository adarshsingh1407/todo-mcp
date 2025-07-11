# Todo MCP Project

A comprehensive todo management system built with microservices architecture, featuring an AI-powered chat interface using the Model Context Protocol (MCP).

<svg width="800" height="600" xmlns="http://www.w3.org/2000/svg">
  <!-- Background -->
  <rect width="800" height="600" fill="#0f172a" stroke="#334155" stroke-width="2"/>
  
  <!-- Title -->
  <text x="400" y="30" text-anchor="middle" fill="#f8fafc" font-family="Arial, sans-serif" font-size="20" font-weight="bold">Todo MCP System Architecture</text>
  
  <!-- Todo UI Service -->
  <rect x="50" y="80" width="150" height="80" rx="8" fill="#1e40af" stroke="#3b82f6" stroke-width="2"/>
  <text x="125" y="105" text-anchor="middle" fill="#ffffff" font-family="Arial, sans-serif" font-size="12" font-weight="bold">Todo UI</text>
  <text x="125" y="120" text-anchor="middle" fill="#93c5fd" font-family="Arial, sans-serif" font-size="10">Next.js 15</text>
  <text x="125" y="135" text-anchor="middle" fill="#93c5fd" font-family="Arial, sans-serif" font-size="10">React Query</text>
  <text x="125" y="150" text-anchor="middle" fill="#93c5fd" font-family="Arial, sans-serif" font-size="10">Port: 3002</text>
  
  <!-- Todo MCP Service -->
  <rect x="300" y="80" width="150" height="80" rx="8" fill="#7c3aed" stroke="#8b5cf6" stroke-width="2"/>
  <text x="375" y="105" text-anchor="middle" fill="#ffffff" font-family="Arial, sans-serif" font-size="12" font-weight="bold">Todo MCP Server</text>
  <text x="375" y="120" text-anchor="middle" fill="#c4b5fd" font-family="Arial, sans-serif" font-size="10">MCP Protocol</text>
  <text x="375" y="135" text-anchor="middle" fill="#c4b5fd" font-family="Arial, sans-serif" font-size="10">Express.js</text>
  <text x="375" y="150" text-anchor="middle" fill="#c4b5fd" font-family="Arial, sans-serif" font-size="10">Port: 3001</text>
  
  <!-- Todo Service -->
  <rect x="550" y="80" width="150" height="80" rx="8" fill="#059669" stroke="#10b981" stroke-width="2"/>
  <text x="625" y="105" text-anchor="middle" fill="#ffffff" font-family="Arial, sans-serif" font-size="12" font-weight="bold">Todo Service</text>
  <text x="625" y="120" text-anchor="middle" fill="#6ee7b7" font-family="Arial, sans-serif" font-size="10">REST API</text>
  <text x="625" y="135" text-anchor="middle" fill="#6ee7b7" font-family="Arial, sans-serif" font-size="10">Express.js</text>
  <text x="625" y="150" text-anchor="middle" fill="#6ee7b7" font-family="Arial, sans-serif" font-size="10">Port: 3000</text>
  
  <!-- PostgreSQL Database -->
  <rect x="300" y="220" width="150" height="80" rx="8" fill="#dc2626" stroke="#ef4444" stroke-width="2"/>
  <text x="375" y="245" text-anchor="middle" fill="#ffffff" font-family="Arial, sans-serif" font-size="12" font-weight="bold">PostgreSQL</text>
  <text x="375" y="260" text-anchor="middle" fill="#fca5a5" font-family="Arial, sans-serif" font-size="10">Database</text>
  <text x="375" y="275" text-anchor="middle" fill="#fca5a5" font-family="Arial, sans-serif" font-size="10">Port: 5432</text>
  <text x="375" y="290" text-anchor="middle" fill="#fca5a5" font-family="Arial, sans-serif" font-size="10">todo_db</text>
  
  <!-- AI Service -->
  <rect x="550" y="220" width="150" height="80" rx="8" fill="#ea580c" stroke="#f97316" stroke-width="2"/>
  <text x="625" y="245" text-anchor="middle" fill="#ffffff" font-family="Arial, sans-serif" font-size="12" font-weight="bold">AI Service</text>
  <text x="625" y="260" text-anchor="middle" fill="#fed7aa" font-family="Arial, sans-serif" font-size="10">Ollama/Claude</text>
  <text x="625" y="275" text-anchor="middle" fill="#fed7aa" font-family="Arial, sans-serif" font-size="10">Port: 11434</text>
  <text x="625" y="290" text-anchor="middle" fill="#fed7aa" font-family="Arial, sans-serif" font-size="10">tinyllama</text>
  
  <!-- Connection arrows -->
  <!-- UI to MCP -->
  <line x1="200" y1="120" x2="300" y2="120" stroke="#3b82f6" stroke-width="3" marker-end="url(#arrowhead)"/>
  <text x="250" y="115" text-anchor="middle" fill="#93c5fd" font-family="Arial, sans-serif" font-size="10">HTTP/SSE</text>
  
  <!-- MCP to Todo Service -->
  <line x1="450" y1="120" x2="550" y2="120" stroke="#8b5cf6" stroke-width="3" marker-end="url(#arrowhead)"/>
  <text x="500" y="115" text-anchor="middle" fill="#c4b5fd" font-family="Arial, sans-serif" font-size="10">REST API</text>
  
  <!-- Todo Service to Database -->
  <line x1="625" y1="160" x2="375" y2="220" stroke="#10b981" stroke-width="3" marker-end="url(#arrowhead)"/>
  <text x="500" y="190" text-anchor="middle" fill="#6ee7b7" font-family="Arial, sans-serif" font-size="10">SQL Queries</text>
  
  <!-- MCP to AI Service -->
  <line x1="450" y1="160" x2="550" y2="260" stroke="#f97316" stroke-width="3" marker-end="url(#arrowhead)"/>
  <text x="500" y="210" text-anchor="middle" fill="#fed7aa" font-family="Arial, sans-serif" font-size="10">AI API</text>
  
  <!-- Data flow labels -->
  <text x="400" y="350" text-anchor="middle" fill="#f8fafc" font-family="Arial, sans-serif" font-size="14" font-weight="bold">Data Flow</text>
  
  <!-- Flow examples -->
  <rect x="50" y="370" width="700" height="120" rx="8" fill="#1e293b" stroke="#475569" stroke-width="1"/>
  
  <text x="400" y="390" text-anchor="middle" fill="#f8fafc" font-family="Arial, sans-serif" font-size="12" font-weight="bold">User Interactions</text>
  
  <text x="100" y="410" text-anchor="start" fill="#93c5fd" font-family="Arial, sans-serif" font-size="10">• Create Todo: UI → MCP → Todo Service → Database</text>
  <text x="100" y="425" text-anchor="start" fill="#93c5fd" font-family="Arial, sans-serif" font-size="10">• List Todos: UI → MCP → Todo Service → Database</text>
  <text x="100" y="440" text-anchor="start" fill="#93c5fd" font-family="Arial, sans-serif" font-size="10">• AI Summary: UI → MCP → AI Service → MCP → Todo Service → Database</text>
  <text x="100" y="455" text-anchor="start" fill="#93c5fd" font-family="Arial, sans-serif" font-size="10">• Chat Commands: UI → MCP → Todo Service → Database</text>
  
  <!-- Protocol labels -->
  <text x="400" y="480" text-anchor="middle" fill="#f8fafc" font-family="Arial, sans-serif" font-size="12" font-weight="bold">Protocols & Technologies</text>
  
  <text x="100" y="500" text-anchor="start" fill="#c4b5fd" font-family="Arial, sans-serif" font-size="10">• MCP (Model Context Protocol): Standardized AI interaction protocol</text>
  <text x="100" y="515" text-anchor="start" fill="#c4b5fd" font-family="Arial, sans-serif" font-size="10">• REST API: Todo CRUD operations</text>
  <text x="100" y="530" text-anchor="start" fill="#c4b5fd" font-family="Arial, sans-serif" font-size="10">• PostgreSQL: Raw SQL with connection pooling</text>
  <text x="100" y="545" text-anchor="start" fill="#c4b5fd" font-family="Arial, sans-serif" font-size="10">• Docker Compose: Multi-service orchestration</text>
  
  <!-- Arrow marker definition -->
  <defs>
    <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
      <polygon points="0 0, 10 3.5, 0 7" fill="#3b82f6"/>
    </marker>
  </defs>
</svg>

## 🏗️ Architecture Overview

This project demonstrates a modern microservices approach with:

- **RESTful API** for todo management
- **MCP Server** for AI-powered interactions
- **Modern React UI** with modular components
- **Docker containerization** for easy deployment

## 📦 Components

### ✅ **Completed Components**

#### **1. Todo Service** (`todo-service/`)

- **Status**: ✅ Complete
- **Description**: RESTful API for todo CRUD operations
- **Tech Stack**: Node.js, TypeScript, Express, PostgreSQL
- **Features**:
  - Full CRUD operations for todos
  - PostgreSQL database with raw SQL
  - Comprehensive test coverage (70%+)
  - Docker containerization
  - Health check endpoints
- **API**: `http://localhost:3000`
- **Documentation**: [todo-service/README.md](todo-service/README.md)

#### **2. MCP Service** (`todo-mcp-service/`)

- **Status**: ✅ Complete
- **Description**: Model Context Protocol server for AI interactions
- **Tech Stack**: Node.js, TypeScript, Express, Anthropic MCP SDK
- **Features**:
  - MCP-compliant server with Streamable HTTP transport
  - AI integration (Ollama/Claude API)
  - Todo management tools and resources
  - AI-powered summaries and analysis
  - Comprehensive error handling
- **API**: `http://localhost:3001`
- **Documentation**: [todo-mcp-service/README.md](todo-mcp-service/README.md)

#### **3. Todo UI** (`todo-ui/`)

- **Status**: ✅ Complete
- **Description**: Modern React application with AI chat interface
- **Tech Stack**: Next.js, TypeScript, React Query, Tailwind CSS, shadcn/ui
- **Features**:
  - Modular component architecture
  - Split-screen layout (todos + chat)
  - Real-time todo management
  - AI-powered chat interface
  - Smart suggestions and slash commands
  - Dark glassy theme with animations
- **UI**: `http://localhost:3002`
- **Documentation**: [todo-ui/README.md](todo-ui/README.md)

## 🚀 Quick Start

### **Prerequisites**

- Node.js 18+
- pnpm
- Docker and Docker Compose
- PostgreSQL (or use Docker)

### **1. Clone and Setup**

```bash
git clone <repository-url>
cd todo-mcp
```

### **2. Start All Services**

#### **Option A: Docker Compose (Recommended)**

```bash
# Start all services with Docker Compose
docker compose up

# Or run in background
docker compose up -d
```

#### **Option B: Individual Services**

```bash
# Start todo-service and PostgreSQL
cd todo-service
pnpm install
pnpm dev

# Start MCP service (in new terminal)
cd ../todo-mcp-service
pnpm install
pnpm dev

# Start UI (in new terminal)
cd ../todo-ui
pnpm install
pnpm dev
```

### **3. Access the Application**

- **Todo UI**: http://localhost:3002
- **Todo API**: http://localhost:3000
- **MCP Server**: http://localhost:3001
- **PostgreSQL**: localhost:5432 (user: todo_user, db: todo_db)

## 🏗️ Project Structure

```
todo-mcp/
├── todo-service/          # RESTful API for todos
│   ├── src/
│   │   ├── controllers/   # API endpoints
│   │   ├── middleware/    # Express middleware
│   │   ├── routes/        # Route definitions
│   │   └── database/      # Database operations
│   ├── tests/             # Unit and integration tests
│   └── Dockerfile         # Container configuration
├── todo-mcp-service/      # MCP server for AI interactions
│   ├── src/
│   │   ├── api/           # API clients
│   │   ├── config/        # Configuration management
│   │   └── server.ts      # MCP server implementation
│   └── Dockerfile         # Container configuration
├── todo-ui/               # React application
│   ├── src/
│   │   ├── components/    # Modular React components
│   │   │   ├── chat/      # Chat-related components
│   │   │   ├── todo/      # Todo-related components
│   │   │   └── ui/        # shadcn/ui components
│   │   ├── lib/           # Utilities and hooks
│   │   │   ├── hooks/     # Custom React hooks
│   │   │   └── constants.ts
│   │   └── app/           # Next.js app router
│   └── Dockerfile         # Container configuration
├── docker-compose.yml     # Multi-service orchestration (Docker Compose v2)
└── README.md             # This file
```

## 🔧 Development

### **Technology Stack**

#### **Backend Services**

- **Node.js 22** with TypeScript
- **Express 4** for REST APIs
- **PostgreSQL** with raw SQL queries
- **Docker** for containerization
- **Jest** for testing

#### **MCP Integration**

- **Anthropic MCP SDK** for protocol implementation
- **Streamable HTTP** transport
- **AI Integration** (Ollama/Claude API)
- **Tool and Resource** management

#### **Frontend**

- **Next.js 15** with App Router
- **React Query** for state management
- **Tailwind CSS** for styling
- **shadcn/ui** for components
- **TypeScript** for type safety

### **Key Features**

#### **Todo Management**

- ✅ Create, read, update, delete todos
- ✅ Status tracking (TODO/DONE)
- ✅ Real-time updates
- ✅ Filtering and search
- ✅ Bulk operations

#### **AI Integration**

- 🤖 Natural language todo management
- 📝 Slash commands for quick actions
- 📊 AI-powered summaries
- 💬 Conversational interface
- 🔄 Auto-complete suggestions

#### **Modern UI/UX**

- 🌙 Dark glassy theme
- 📱 Responsive design
- ⚡ Fast interactions
- 🎨 Smooth animations
- 🔍 Intuitive navigation

## 📊 Architecture Benefits

### **Microservices Design**

- **Separation of Concerns**: Each service has a specific responsibility
- **Scalability**: Services can be scaled independently
- **Technology Flexibility**: Different tech stacks per service
- **Fault Isolation**: Service failures don't cascade

### **MCP Integration**

- **Standardized Protocol**: Interoperable with other MCP clients
- **AI Capabilities**: Natural language processing
- **Extensible**: Easy to add new tools and resources
- **Secure**: Proper authentication and authorization

### **Modern Frontend**

- **Modular Components**: Reusable, testable components
- **Type Safety**: Full TypeScript coverage
- **Performance**: React Query for efficient data fetching
- **Accessibility**: WCAG compliant components

## 🚀 Deployment

### **Local Development**

```bash
# Start all services
docker compose up -d

# Or run individually
cd todo-service && pnpm dev
cd todo-mcp-service && pnpm dev
cd todo-ui && pnpm dev
```

### **Production Deployment**

```bash
# Build and run with Docker
docker compose -f docker-compose.yml up --build
```

## 🧪 Testing

### **Test Coverage**

- **Todo Service**: 70%+ coverage with unit and integration tests
- **MCP Service**: Comprehensive error handling and validation
- **UI Components**: Modular design for easy testing

### **Running Tests**

```bash
# Todo Service
cd todo-service && pnpm test

# MCP Service
cd todo-mcp-service && pnpm test

# UI (if tests are added)
cd todo-ui && pnpm test
```

## 📚 Documentation

Each component has detailed documentation:

- [Todo Service README](todo-service/README.md)
- [MCP Service README](todo-mcp-service/README.md)
- [Todo UI README](todo-ui/README.md)

## 🤝 Contributing

1. **Fork** the repository
2. **Create** a feature branch
3. **Follow** the existing code patterns
4. **Test** your changes thoroughly
5. **Submit** a pull request

### **Development Guidelines**

- Use TypeScript for type safety
- Follow the modular component structure
- Write comprehensive tests
- Update documentation for new features
- Use conventional commit messages

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Anthropic** for the MCP specification and SDK
- **Vercel** for Next.js framework
- **TanStack** for React Query
- **shadcn** for the UI component library

---

**Built with ❤️ using modern web technologies and microservices architecture**
