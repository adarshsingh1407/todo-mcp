import express, { Application } from "express";
import cors from "cors";
import dotenv from "dotenv";
import todoRoutes from "./routes/todoRoutes";
import { errorHandler, notFoundHandler } from "./middleware/errorHandler";

// Load environment variables
dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() });
});

// API routes
app.use("/", todoRoutes);

// Error handling middleware
app.use(notFoundHandler);
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Todo service running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
  console.log(`📝 API docs: http://localhost:${PORT}/todos`);
});

export default app;
