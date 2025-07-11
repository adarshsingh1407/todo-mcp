# Todo MCP Service

A Model Context Protocol (MCP) server that provides todo management capabilities through a standardized interface. This service integrates with a todo REST API and AI services to offer intelligent todo management with natural language processing capabilities.

## 🚀 Features

### Resources

- **All Todos** (`todos://all`) - Get all todos from the todo service
- **Remaining Todos** (`todos://remaining`) - Get todos with status TODO
- **Completed Todos** (`todos://completed`) - Get todos with status DONE

### Tools

- **Add Todo** (`add-todo`) - Create a new todo item
- **Mark as DONE** (`mark-done`) - Mark a todo as completed
- **Mark as TODO** (`mark-todo`) - Mark a todo as pending
- **Delete Todo** (`delete-todo`) - Remove a todo item
- **Summarise Remaining** (`summarise-remaining`) - AI-powered summary of pending todos
- **Summarise Completed** (`summarise-completed`) - AI-powered summary of completed todos

## 🏗️ Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   MCP Client    │    │  Todo MCP       │    │   Todo Service  │
│   (Cursor,      │◄──►│  Server         │◄──►│   (REST API)    │
│   Inspector)    │    │                 │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                                │
                                ▼
                       ┌─────────────────┐
                       │   AI Service    │
                       │  (Ollama/       │
                       │   Claude)       │
                       └─────────────────┘
```

## 🛠️ Technology Stack

- **Runtime**: Node.js 22.17.0
- **Language**: TypeScript
- **Framework**: Express.js
- **MCP SDK**: @modelcontextprotocol/sdk
- **HTTP Transport**: Streamable HTTP
- **AI Integration**: Ollama (default) / Claude API
- **Package Manager**: pnpm
- **Containerization**: Docker
- **Validation**: Zod schema validation

## 📋 Prerequisites

- Node.js 22.17.0 (enforced via .nvmrc)
- pnpm 10+
- Docker & Docker Compose (for containerized deployment)
- Todo Service running (default: http://localhost:3000)
- Ollama running locally (default: http://localhost:11434)

## 🔧 Installation

### Local Development

1. **Clone and navigate to the project:**

   ```bash
   cd todo-mcp-service
   ```

2. **Install dependencies:**

   ```bash
   pnpm install
   ```

3. **Set up environment variables:**

   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Build the project:**
   ```bash
   pnpm build
   ```

### Docker Deployment

1. **Build and run with Docker Compose:**
   ```bash
   docker compose up --build
   ```

## ⚙️ Configuration

### Environment Variables

| Variable           | Default                  | Description                              |
| ------------------ | ------------------------ | ---------------------------------------- |
| `MCP_SERVER_PORT`  | `3001`                   | Port for the MCP server                  |
| `TODO_SERVICE_URL` | `http://localhost:3000`  | URL of the todo REST API                 |
| `LOG_LEVEL`        | `info`                   | Logging level (debug, info, warn, error) |
| `USE_CLAUDE_API`   | `false`                  | Use Claude API instead of Ollama         |
| `CLAUDE_API_KEY`   | -                        | Required when USE_CLAUDE_API=true        |
| `OLLAMA_URL`       | `http://localhost:11434` | Ollama server URL                        |
| `OLLAMA_MODEL`     | `tinyllama`              | Ollama model name                        |

**Note**: When using Docker Compose, these environment variables are automatically configured.

### Example .env file

```env
# Server Configuration
MCP_SERVER_PORT=3001
LOG_LEVEL=info

# Todo Service
TODO_SERVICE_URL=http://localhost:3000

# AI Configuration
USE_CLAUDE_API=false
OLLAMA_URL=http://localhost:11434
OLLAMA_MODEL=tinyllama

# Claude API (when USE_CLAUDE_API=true)
CLAUDE_API_KEY=your-claude-api-key
```

## 🚀 Usage

### Starting the Server

#### Local Development

```bash
# Development mode with hot reload
pnpm dev

# Production build and start
pnpm build
pnpm start
```

#### Docker

```bash
# Start with Docker Compose
docker compose up

# Or build and run individually
docker build -t todo-mcp-service .
docker run -p 3001:3001 todo-mcp-service
```

### Health Check

```bash
curl http://localhost:3001/health
```

Response:

```json
{
  "status": "ok",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

## 🔌 MCP Integration

### Connecting with MCP Clients

#### Cursor IDE

Add to your Cursor settings:

```json
{
  "mcpServers": {
    "todo-mcp": {
      "command": "docker",
      "args": ["run", "--rm", "-p", "3001:3001", "todo-mcp-service"],
      "env": {
        "TODO_SERVICE_URL": "http://host.docker.internal:3000"
      }
    }
  }
}
```

#### MCP Inspector

```bash
# Install MCP Inspector
npm install -g @modelcontextprotocol/inspector

# Connect to the server
mcp-inspector http://localhost:3001/mcp
```

### Testing with curl

```bash
# Add a todo
curl -X POST http://localhost:3001/mcp \
  -H "Content-Type: application/json" \
  -d '{
    "jsonrpc": "2.0",
    "id": 1,
    "method": "tools/call",
    "params": {
      "name": "add-todo",
      "arguments": {
        "title": "Test todo from curl"
      }
    }
  }'

# List all todos
curl -X POST http://localhost:3001/mcp \
  -H "Content-Type: application/json" \
  -d '{
    "jsonrpc": "2.0",
    "id": 2,
    "method": "resources/read",
    "params": {
      "uri": "todos://all"
    }
  }'
```

## 🧪 Testing

### Running Tests

```bash
# Run all tests
pnpm test

# Run tests with coverage
pnpm test:coverage

# Run tests in watch mode
pnpm test:watch
```

### Test Coverage

The project enforces a minimum 70% test coverage threshold. Coverage reports are generated in the `coverage/` directory.

## 📊 API Reference

### Resources

#### `todos://all`

Returns all todos from the todo service.

**Response:**

```json
[
  {
    "id": "uuid",
    "title": "string",
    "status": "TODO" | "DONE"
  }
]
```

#### `todos://remaining`

Returns todos with status "TODO".

#### `todos://completed`

Returns todos with status "DONE".

### Tools

#### `add-todo`

Creates a new todo item.

**Parameters:**

- `title` (string): The todo title

**Response:**

```json
{
  "content": [
    {
      "type": "text",
      "text": "✅ Added: Todo title"
    }
  ]
}
```

#### `mark-done`

Marks a todo as completed.

**Parameters:**

- `id` (string): The todo ID

#### `mark-todo`

Marks a todo as pending.

**Parameters:**

- `id` (string): The todo ID

#### `delete-todo`

Deletes a todo item.

**Parameters:**

- `id` (string): The todo ID

#### `summarise-remaining`

Generates an AI summary of pending todos.

**Parameters:** None

**Response:**

```json
{
  "content": [
    {
      "type": "text",
      "text": "AI-generated summary of remaining todos..."
    }
  ]
}
```

#### `summarise-completed`

Generates an AI summary of completed todos.

**Parameters:** None

## 🔍 Debugging

### Logs

The server uses structured logging with configurable levels:

```bash
# Set debug level
LOG_LEVEL=debug pnpm dev
```

### Common Issues

1. **Todo Service Connection Error**

   - Ensure the todo service is running
   - Check `TODO_SERVICE_URL` configuration
   - Verify network connectivity

2. **AI Service Connection Error**

   - For Ollama: Ensure Ollama is running locally
   - For Claude: Verify API key and network access
   - Check AI service URLs in configuration

3. **MCP Client Connection Issues**
   - Verify server is running on correct port
   - Check CORS configuration for browser clients
   - Ensure proper MCP protocol compliance

## 🏗️ Development

### Project Structure

```
todo-mcp-service/
├── src/
│   ├── api/           # API clients (todo, AI)
│   ├── config/        # Configuration management
│   ├── types/         # TypeScript type definitions
│   └── server.ts      # Main MCP server
├── tests/             # Test files
├── Dockerfile         # Docker configuration
├── docker-compose.yml # Docker Compose v2 setup
├── package.json       # Dependencies and scripts
└── tsconfig.json      # TypeScript configuration
```

### Adding New Features

1. **New Resources**: Add to `server.ts` using `server.registerResource()`
2. **New Tools**: Add to `server.ts` using `server.registerTool()`
3. **New API Clients**: Create in `src/api/` directory
4. **Configuration**: Update `src/config/` and `src/types/`

### Code Style

- Use TypeScript strict mode
- Follow ESLint configuration
- Maintain test coverage above 70%
- Use pnpm for package management

## 📦 Deployment

### Docker

```bash
# Build image
docker build -t todo-mcp-service .

# Run container
docker run -p 3001:3001 \
  -e TODO_SERVICE_URL=http://host.docker.internal:3000 \
  -e OLLAMA_URL=http://host.docker.internal:11434 \
  todo-mcp-service
```

### Docker Compose

```yaml
version: "3.8"
services:
  todo-mcp-service:
    build: .
    ports:
      - "3001:3001"
    environment:
      - TODO_SERVICE_URL=http://todo-service:3000
      - OLLAMA_URL=http://ollama:11434
    depends_on:
      - todo-service
      - ollama
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass
6. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🔗 Related Projects

- [Todo Service](../todo-service/) - REST API for todo management
- [Todo UI](../todo-ui/) - Web interface for todo management

## 📞 Support

For issues and questions:

- Check the [debugging section](#-debugging)
- Review the [MCP documentation](https://modelcontextprotocol.io)
- Open an issue in the repository
