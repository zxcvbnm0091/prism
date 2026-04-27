import "dotenv/config"; // ← use this instead, it's hoisted with imports

import express, { json } from "express";
import { connectDB, disconnectDB } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import movieRoutes from "./routes/movieRoutes.js";

// console.log("DATABASE_URL:", process.env.DATABASE_URL); // should work now

connectDB();
const app = express();

app.use(json());

app.get("/health", (req, res) => res.json({ status: "ok" }));

app.use("/api/auth", authRoutes);
app.use("/api/movies", movieRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

process.on("uncaughtException", async (err) => {
  console.error("Uncaught Exception", err);
  await disconnectDB();
  process.exit(1);
});
process.on("unhandledRejection", async (err) => {
  console.error("Unhandled Rejection", err);
  await disconnectDB();
  process.exit(1);
});
process.on("SIGTERM", async (err) => {
  console.error("SIGTERM receive, shutting down gracefully", err);
  server.close(async () => {
    await disconnectDB();
    process.exit(1);
  });
});
