# Todo Service

A simple RESTful todo service built with Node.js, TypeScript, Express, and PostgreSQL.

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

## Setup

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

3. **Install dependencies:**

   ```bash
   pnpm install
   ```

4. **Environment setup:**

   ```bash
   cp env.example .env
   ```

   Edit `.env` with your PostgreSQL connection details:

   ```
   DATABASE_URL=postgresql://username:password@localhost:5432/todo_db
   PORT=3000
   ```

5. **Database setup:**

   ```bash
   # Create the database
   createdb todo_db

   # Run the schema
   psql -d todo_db -f src/database/schema.sql
   ```

6. **Development:**

   ```bash
   pnpm dev
   ```

7. **Production build:**
   ```bash
   pnpm build
   pnpm start
   ```

## Docker

```bash
# Build the image
docker build -t todo-service .

# Run with environment variables
docker run -p 3000:3000 -e DATABASE_URL=your_db_url todo-service
```

## Health Check

Visit `http://localhost:3000/health` to check if the service is running.

## Error Handling

The service includes comprehensive error handling:

- 400: Bad Request (invalid input)
- 404: Not Found (todo not found)
- 500: Internal Server Error

All errors return JSON responses with descriptive messages.
