# Todo Service

A simple RESTful todo service built with Node.js, TypeScript, Express, and PostgreSQL.

**Repository**: [https://github.com/adarshsingh1407/todo-mcp](https://github.com/adarshsingh1407/todo-mcp)

## Prerequisites

- **Node.js**: 22.17.0 (enforced via .nvmrc)
- **pnpm**: 10.0.0 or higher
- **PostgreSQL**: 12 or higher

## Features

- ✅ Full CRUD operations for todos
- ✅ PostgreSQL database with raw SQL queries
- ✅ TypeScript with strict mode
- ✅ UUID-based IDs
- ✅ Input validation
- ✅ Error handling middleware
- ✅ CORS enabled
- ✅ Health check endpoint
- ✅ Comprehensive testing with Jest
- ✅ Docker support with Docker Compose v2

## Quick Start

### Option 1: Docker Compose (Recommended for local development)

```bash
# Clone the repository
git clone <repository-url>
cd todo-mcp

# Start the entire stack (PostgreSQL + Todo Service)
docker compose up

# The service will be available at http://localhost:3000
# PostgreSQL will be available at localhost:5432
# Database credentials: todo_user/todo_password
```

### Option 2: Local Development

```bash
# Install dependencies
pnpm install

# Set up environment
cp env.example .env
# Edit .env with your database configuration

# Start PostgreSQL (if not already running)
# Option A: Using Docker
docker run --name postgres-todo \
  -e POSTGRES_DB=todo_db \
  -e POSTGRES_USER=todo_user \
  -e POSTGRES_PASSWORD=todo_password \
  -p 5432:5432 -d postgres:15

# Option B: Using local PostgreSQL
createdb todo_db

# Run the database schema
psql -d todo_db -f src/database/schema.sql

# Start development server
pnpm dev
```

## Environment Configuration

The service uses the following environment variables:

| Variable       | Description                  | Default       | Required |
| -------------- | ---------------------------- | ------------- | -------- |
| `DATABASE_URL` | PostgreSQL connection string | -             | ✅       |
| `PORT`         | Server port                  | `3000`        | ❌       |
| `NODE_ENV`     | Node environment             | `development` | ❌       |

**Note**: When using Docker Compose, these environment variables are automatically configured.

### Environment Setup

1. **Copy the example file:**

   ```bash
   cp env.example .env
   ```

2. **Configure your database:**

   ```bash
   # For local development
   DATABASE_URL=postgresql://todo_user:todo_password@localhost:5432/todo_db

   # For Docker Compose (automatic)
   DATABASE_URL=postgresql://todo_user:todo_password@postgres:5432/todo_db
   ```

3. **Optional settings:**
   ```bash
   PORT=3000
   NODE_ENV=development
   ```

## API Endpoints

### GET /todos

Get all todos

```json
[
  {
    "id": "uuid",
    "title": "string",
    "status": "TODO" | "DONE"
  }
]
```

### GET /todos/:id

Get a single todo by id

```json
{
  "id": "uuid",
  "title": "string",
  "status": "TODO" | "DONE"
}
```

### POST /todos

Create a new todo

```json
{
  "title": "string"
}
```

### PUT /todos/:id

Update an existing todo

```json
{
  "title": "string",
  "status": "TODO" | "DONE"
}
```

### DELETE /todos/:id

Delete a todo

```json
{
  "message": "Deleted"
}
```

## Development

### Prerequisites

1. **Install Node.js 22.17.0:**

   ```bash
   # Using nvm (recommended)
   nvm install 22.17.0
   nvm use 22.17.0

   # Or the version will be automatically used via .nvmrc
   nvm use
   ```

2. **Install pnpm:**

   ```bash
   npm install -g pnpm@10.0.0
   ```

### Setup

1. **Install dependencies:**

   ```bash
   pnpm install
   ```

2. **Environment setup:**

   ```bash
   cp env.example .env
   ```

   Edit `.env` with your PostgreSQL connection details:

   ```
   DATABASE_URL=postgresql://username:password@localhost:5432/todo_db
   PORT=3000
   ```

3. **Database setup:**

   ```bash
   # Create the database
   createdb todo_db

   # Run the schema
   psql -d todo_db -f src/database/schema.sql
   ```

4. **Development:**

   ```bash
   pnpm dev
   ```

5. **Production build:**
   ```bash
   pnpm build
   pnpm start
   ```

## Testing

The project includes comprehensive tests with Jest:

```bash
# Run all tests
pnpm test

# Run tests with coverage
pnpm test:coverage

# Run tests in watch mode
pnpm test:watch
```

### Test Coverage

The project enforces a minimum 70% coverage threshold for:

- Statements
- Branches
- Functions
- Lines

Builds will fail if coverage drops below these thresholds.

## Docker

### Single Container

```bash
# Build the image
docker build -t todo-service .

# Run with environment variables
docker run -p 3000:3000 -e DATABASE_URL=your_db_url todo-service
```

### Docker Compose (Recommended)

The project includes a `docker-compose.yml` file that sets up both the todo service and PostgreSQL database:

```bash
# Start the entire stack
docker compose up

# Start in background
docker compose up -d

# Stop the stack
docker compose down

# View logs
docker compose logs -f
```

## Health Check

Visit `http://localhost:3000/health` to check if the service is running.

## Error Handling

The service includes comprehensive error handling:

- 400: Bad Request (invalid input)
- 404: Not Found (todo not found)
- 500: Internal Server Error

All errors return JSON responses with descriptive messages.

## Project Structure

```
todo-service/
├── src/
│   ├── controllers/     # Request handlers
│   ├── database/        # Database connection and schema
│   ├── middleware/      # Express middleware
│   ├── repositories/    # Data access layer
│   ├── routes/          # API route definitions
│   ├── types/           # TypeScript type definitions
│   └── index.ts         # Application entry point
├── src/__tests__/       # Test files
├── docker-compose.yml   # Docker Compose v2 configuration
├── Dockerfile           # Docker image definition
├── env.example          # Environment variables template
├── jest.config.js       # Jest configuration
├── package.json         # Dependencies and scripts
├── tsconfig.json        # TypeScript configuration
└── README.md           # This file
```
