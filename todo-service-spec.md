# Specification: `todo-service`

## Overview

A simple RESTful `todo-service` that manages todos in a PostgreSQL database.  
Built with **Node.js 22.17.0**, **TypeScript**, **Express 4**, **ECMAScript latest**, **pnpm 10**, and **pg** for PostgreSQL.

---

## Database Schema

- **Table:** `todo`
  - `id`: UUID, primary key
  - `title`: TEXT, required
  - `status`: ENUM('TODO', 'DONE'), default 'TODO'

---

## API Endpoints

### 1️⃣ `GET /todos`

- **Description:** Get all todos.
- **Response:**
  ```json
  [
    {
      "id": "uuid",
      "title": "string",
      "status": "TODO" | "DONE"
    }
  ]
  ```

---

### 2️⃣ `GET /todos/:id`

- **Description:** Get a single todo by `id`.
- **Response:**
  ```json
  {
    "id": "uuid",
    "title": "string",
    "status": "TODO" | "DONE"
  }
  ```

---

### 3️⃣ `POST /todos`

- **Description:** Create a new todo.
- **Request Body:**
  ```json
  {
    "title": "string"
  }
  ```
- **Response:** 201 Created
  ```json
  {
    "id": "uuid",
    "title": "string",
    "status": "TODO"
  }
  ```

---

### 4️⃣ `PUT /todos/:id`

- **Description:** Update an existing todo's title and status.
- **Request Body:**
  ```json
  {
    "title": "string",
    "status": "TODO" | "DONE"
  }
  ```
- **Response:**
  ```json
  {
    "id": "uuid",
    "title": "string",
    "status": "TODO" | "DONE"
  }
  ```

---

### 5️⃣ `DELETE /todos/:id`

- **Description:** Delete a todo by `id`.
- **Response:**
  ```json
  {
    "message": "Deleted"
  }
  ```

---

## Requirements

- Use **Node.js 22.17.0** (enforced via `.nvmrc`)
- Use **pnpm 10** latest as package manager
- Use **TypeScript** strict mode.
- Use **Express 4** with proper type safety.
- Use **pg** for Postgres connection.
- Validate `status` to allow only `TODO` or `DONE`.
- Use `dotenv` for database credentials.
- Use UUIDs for `id` (use `uuid` npm package).
- No ORMs, use raw SQL with `pg`.

---

## Extra

- Add simple error handling middleware.
- Add `scripts` in `package.json` for `dev` and `build`.
- Include a `env.example` with `DATABASE_URL`.
- Include `.nvmrc` to enforce Node.js version.
- Include `packageManager` field in `package.json`.

---

## Deliverable

A fully working `todo-service` API ready to be containerized for local Docker development.
