🗂️ Building Todo MCP — A Microservices Todo App with AI & MCP Protocol

✅ Intro

Can your todo app talk back to you? 🗣️✨

In this project, I combined microservices architecture with an AI-powered chat using the Model Context Protocol (MCP) to create Todo MCP — a modern, scalable todo manager that understands natural language commands.

Here’s how I built it using Node.js, Next.js, Docker, and Ollama/Claude, with best practices in microservices design, AI integration, and frontend performance.

⸻

📋 What is Todo MCP?

Todo MCP is a full-stack todo management system split into 3 microservices with a smart AI assistant via MCP.

Key Stats:
• 🧩 3 Microservices: Todo Service, MCP Service, Todo UI
• 🛠️ 4 Core Technologies: Node.js, TypeScript, PostgreSQL, Next.js
• ✅ 70%+ Test Coverage
• 🐳 Fully Dockerized
• 🤖 Natural Language AI (Ollama/Claude)

⸻

🏗️ Architecture at a Glance

┌────────────┐ ┌────────────┐ ┌────────────┐
│ Todo UI │ ⇄ │ Todo MCP │ ⇄ │ Todo Service│
│ (Next.js) │ │ (MCP Server)│ │ (REST API) │
└────────────┘ └────────────┘ └────────────┘
│ │ │
▼ ▼ ▼
┌────────────┐ ┌────────────┐ ┌────────────┐
│ AI Svc │ │ PostgreSQL │
│(Claude/Ollama)│ │ Database │
└────────────┘ └────────────┘

Highlights:
• Only Todo Service touches PostgreSQL directly
• MCP Service is the middleware for AI
• Stateless, independent scaling

⸻

⚙️ Technology Stack

Layer Tech
Backend Node.js, TypeScript, Express
Database PostgreSQL
AI Ollama / Claude via MCP SDK
Frontend Next.js 15, React Query, Tailwind, shadcn/ui
DevOps Docker, Docker Compose

⸻

🔍 How It Works

📌 Todo Service (REST API)
• CRUD with PostgreSQL (UUIDs, strict validation)
• 70%+ test coverage
• Example table:

CREATE TABLE todo (
id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
title TEXT NOT NULL,
status TEXT NOT NULL DEFAULT 'TODO' CHECK (status IN ('TODO', 'DONE')),
created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

📌 Todo MCP Service (AI Integration)
• Connects UI and AI
• Uses Anthropic MCP SDK + Zod for validation
• Modular tools:
• add-todo
• mark-done
• summarise-remaining

Folder Structure:

src/
├─ api/
├─ config/
├─ server/
│ ├─ middleware.ts
│ ├─ routes.ts
│ ├─ tools.ts
│ ├─ prompts.ts
│ └─ mcpHandler.ts
├─ types/
└─ server.ts

📌 Todo UI (Next.js)
• Split-screen: todos + AI chat
• React Query for real-time sync
• Tailwind + shadcn/ui for a dark glassy look
• Slash commands for natural language input

⸻

🏅 Technical Highlights
• 🧩 Clear microservices boundaries
• 🧠 MCP Protocol for AI integration
• 🧪 70%+ test coverage
• 🐳 Dockerized local dev & deploy
• ⚡ Modern, responsive UI

⸻

🧩 Challenges & Solutions

Challenge: MCP orchestration was complex
Solution: Modular server structure + Zod validation

Challenge: AI replies sounded robotic
Solution: Improved prompts for a conversational tone

Challenge: Keeping UI in sync
Solution: React Query + background re-fetching

Challenge: Service-to-service reliability
Solution: HTTP comms with health checks & clear error handling

⸻

🎓 What I Learned
• Microservices boundaries and scaling
• MCP Protocol usage in real projects
• Integrating AI with natural language tasks
• Next.js App Router + React Query patterns
• Docker for reproducible environments

⸻

🚀 What’s Next
• 🔒 Add authentication
• 🔄 Real-time collab with WebSockets
• 📱 Mobile app (React Native)
• 🤖 More AI-powered features

⸻

🏁 Closing Thoughts

Todo MCP was my way to connect microservices, AI, and modern web dev in one hands-on project.

I hope this inspires you to experiment with MCP and build human-like AI workflows in your own projects.

👉 Comments & questions welcome!
