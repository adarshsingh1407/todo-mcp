# Todo MCP (Model Context Protocol) Project

A comprehensive todo management system built with modern technologies and microservices architecture.

## 🚀 Project Overview

This project implements a complete todo management system with multiple components:

- **✅ Todo Service**: RESTful API with TypeScript, Express, PostgreSQL
- **✅ Todo MCP Service**: Model Context Protocol service with AI integration
- **✅ Todo UI**: Modern frontend application with split-screen layout

## 📁 Project Structure

```
todo-mcp/
├── ✅ todo-service/           # RESTful API (Complete)
├── ✅ todo-mcp-service/      # MCP service (Complete)
├── ✅ todo-ui/               # Frontend application (Complete)
├── ✅ docker-compose.yml     # Docker orchestration
├── ✅ todo-service-spec.md   # API specification
└── 📄 README.md             # This file
```

## ✅ Completed Components

### Todo Service (`todo-service/`)

A fully functional RESTful API with comprehensive features:

- **✅ RESTful API**: Complete CRUD operations for todos
- **✅ TypeScript**: Strict mode with full type safety
- **✅ PostgreSQL**: Raw SQL queries with `pg` library
- **✅ Testing**: 55 tests with 70%+ coverage enforcement
- **✅ Docker**: Containerized with docker-compose
- **✅ Documentation**: Comprehensive README and API docs
- **✅ Quality Gates**: Enforced test coverage and build checks

**Repository**: [https://github.com/adarshsingh1407/todo-mcp](https://github.com/adarshsingh1407/todo-mcp)

**API Endpoints**:

- `GET /todos` - List all todos
- `GET /todos/:id` - Get specific todo
- `POST /todos` - Create new todo
- `PUT /todos/:id` - Update todo
- `DELETE /todos/:id` - Delete todo

**Quick Start**:

```bash
# Using Docker Compose (recommended)
docker-compose up

# Or local development
cd todo-service
pnpm install
cp env.example .env
pnpm dev
```

### Todo MCP Service (`todo-mcp-service/`)

A Model Context Protocol server with AI-powered todo management:

- **✅ MCP Protocol**: Full Model Context Protocol implementation
- **✅ AI Integration**: Support for Ollama (local) and Claude API
- **✅ Todo Management**: Complete CRUD operations via MCP
- **✅ Resources**: All todos, remaining todos, completed todos
- **✅ Tools**: Add, mark done/todo, delete, AI summaries
- **✅ Streamable HTTP**: Modern MCP transport
- **✅ Docker Ready**: Containerized with docker-compose
- **✅ Documentation**: Comprehensive README and API docs

**Features**:

- **Resources**: `todos://all`, `todos://remaining`, `todos://completed`
- **Tools**: `add-todo`, `mark-done`, `mark-todo`, `delete-todo`, `summarise-remaining`, `summarise-completed`
- **AI Integration**: Natural language summaries of todo lists
- **Client Support**: Cursor IDE, MCP Inspector, custom clients

**Quick Start**:

```bash
# Using Docker Compose (includes todo-service)
docker-compose up

# Or local development
cd todo-mcp-service
pnpm install
cp .env.example .env
pnpm dev
```

**MCP Integration**:

```bash
# Health check
curl http://localhost:3001/health

# Add todo via MCP
curl -X POST http://localhost:3001/mcp \
  -H "Content-Type: application/json" \
  -d '{
    "jsonrpc": "2.0",
    "id": 1,
    "method": "tools/call",
    "params": {
      "name": "add-todo",
      "arguments": {
        "title": "Test todo"
      }
    }
  }'
```

### Todo UI (`todo-ui/`)

A modern, responsive frontend application with split-screen layout:

- **✅ Next.js 15**: Latest framework with App Router
- **✅ TypeScript**: Strict mode with full type safety
- **✅ Tailwind CSS**: Custom dark glassy theme
- **✅ shadcn/ui**: Modern component library
- **✅ React Query**: Data fetching and caching
- **✅ Framer Motion**: Smooth animations
- **✅ Split Layout**: Todo list + AI chat interface
- **✅ Quick Actions**: One-click AI-powered features

**Features**:

- **Left Panel**: Todo list with smart filtering (All/Done/Remaining)
- **Right Panel**: AI chat interface with quick action buttons
- **Dark Glassy Theme**: Backdrop blur effects and transparency
- **Responsive Design**: Optimized for desktop and tablet
- **Real-time Updates**: React Query for automatic data synchronization

**Quick Start**:

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

**Environment Variables**:

```env
# .env.local
NEXT_PUBLIC_TODO_SERVICE_URL=http://localhost:3000
NEXT_PUBLIC_MCP_SERVICE_URL=http://localhost:3001
```

**UI Components**:

- **TodoList**: Filtering dropdown with dynamic counts
- **Chat**: Modular chat interface with message history
- **Quick Actions**: Compact pill-style buttons for AI features
- **Layout**: Split-screen with subtle vertical separator

## 🎯 Project Roadmap

### Completed Features ✅

- **✅ Todo Service**: Full RESTful API with PostgreSQL
- **✅ Todo MCP Service**: AI-powered MCP server with Ollama/Claude
- **✅ Todo UI**: Modern split-screen frontend with chat interface

### Future Enhancements 🚀

**Phase 1: API Integration**

- [ ] Connect todo-ui to todo-service for real data
- [ ] Integrate todo-ui with todo-mcp-service for AI chat
- [ ] Implement quick action handlers for AI features
- [ ] Add real-time updates and notifications

**Phase 2: Enhanced Features**

- [ ] Drag and drop todo reordering
- [ ] Keyboard shortcuts and accessibility
- [ ] Todo search and filtering
- [ ] Export/import capabilities
- [ ] Mobile responsive design

**Phase 3: Advanced Features**

- [ ] User authentication and authorization
- [ ] Multi-user todo sharing
- [ ] Advanced AI features (prioritization, scheduling)
- [ ] PWA capabilities for offline use
- [ ] Analytics and insights dashboard

## 🛠️ Development Setup

### Prerequisites

- **Node.js**: 22.17.0 (enforced via .nvmrc)
- **pnpm**: 10.0.0 or higher
- **Docker**: 20.10+ (for containerized development)
- **PostgreSQL**: 12+ (for local development)

### Quick Start

1. **Clone the repository**:

   ```bash
   git clone https://github.com/adarshsingh1407/todo-mcp.git
   cd todo-mcp
   ```

2. **Start the todo service**:

   ```bash
   # Using Docker Compose (recommended)
   docker-compose up

   # Or local development
   cd todo-service
   pnpm install
   cp env.example .env
   pnpm dev
   ```

3. **Access the API**:
   - API: http://localhost:3000
   - Health Check: http://localhost:3000/health
   - PostgreSQL: localhost:5432

## 📊 Project Status

| Component        | Status      | Progress | Priority |
| ---------------- | ----------- | -------- | -------- |
| todo-service     | ✅ Complete | 100%     | High     |
| todo-mcp-service | ✅ Complete | 100%     | Medium   |
| todo-ui          | ✅ Complete | 100%     | High     |

## 🧪 Testing

### Todo Service Testing

The todo service includes comprehensive testing:

```bash
cd todo-service

# Run all tests
pnpm test

# Run with coverage
pnpm test:coverage

# Run in watch mode
pnpm test:watch
```

**Coverage Requirements**: 70% minimum for all metrics

- Statements: 93.45% ✅
- Branches: 82.85% ✅
- Functions: 72.22% ✅
- Lines: 93.33% ✅

## 🐳 Docker Support

### Complete Stack

```bash
# Start all services
docker-compose up

# Start in background
docker-compose up -d

# View logs
docker-compose logs -f

# Stop all services
docker-compose down
```

### Individual Services

```bash
# Build todo service
cd todo-service
docker build -t todo-service .

# Run todo service
docker run -p 3000:3000 -e DATABASE_URL=your_db_url todo-service
```

## 📚 Documentation

- **API Specification**: [todo-service-spec.md](todo-service-spec.md)
- **Todo Service**: [todo-service/README.md](todo-service/README.md)
- **Todo MCP Service**: [todo-mcp-service/README.md](todo-mcp-service/README.md)
- **Docker Setup**: [docker-compose.yml](docker-compose.yml)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📋 Development Roadmap

### Phase 1: Core Infrastructure ✅

- [x] Todo Service API
- [x] Database setup
- [x] Testing framework
- [x] Docker configuration
- [x] Documentation

### Phase 2: AI Integration ✅

- [x] Todo MCP Service
- [x] AI-powered features
- [x] Natural language processing
- [x] Smart suggestions
- [x] MCP protocol implementation

### Phase 3: Frontend Development 🔄

- [ ] Todo UI application
- [ ] User interface design
- [ ] API integration
- [ ] State management
- [ ] Responsive design

## 🐛 Issues & Support

- **Repository**: [https://github.com/adarshsingh1407/todo-mcp](https://github.com/adarshsingh1407/todo-mcp)
- **Issues**: [GitHub Issues](https://github.com/adarshsingh1407/todo-mcp/issues)
- **Discussions**: [GitHub Discussions](https://github.com/adarshsingh1407/todo-mcp/discussions)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Built with ❤️ using modern web technologies**
