# Todo MCP Project

A comprehensive todo management system built with microservices architecture, featuring an AI-powered chat interface using the Model Context Protocol (MCP).

## 🏗️ Architecture Overview

This project demonstrates a modern microservices approach with:

- **RESTful API** for todo management
- **MCP Server** for AI-powered interactions
- **Modern React UI** with modular components
- **Docker containerization** for easy deployment

### **System Architecture Flow**

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Todo UI       │    │  Todo MCP       │    │   Todo Service  │
│   (Next.js)     │◄──►│  Server         │◄──►│   (REST API)    │
│   Port: 3002    │    │  Port: 3001     │    │   Port: 3000    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                                │                      │
                                ▼                      ▼
                       ┌─────────────────┐    ┌─────────────────┐
                       │   AI Service    │    │   PostgreSQL    │
                       │  (Ollama/       │    │   (Database)    │
                       │   Claude)       │    │   Port: 5432    │
                       └─────────────────┘    └─────────────────┘
```

## Screen Recordings



https://github.com/user-attachments/assets/24892508-99f7-4173-b05a-85835de2b7ce



https://github.com/user-attachments/assets/ac6b9274-6670-4750-a37f-744eb75d8571




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
