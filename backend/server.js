require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth");
const debugRoutes = require("./routes/debugRoutes");
const auth = require("./middleware/auth"); 

const app = express();

// CORS
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

// Body parser
app.use(express.json());

// Connect DB
connectDB();

// Public routes
app.use("/auth", authRoutes);

// Protected routes (using JWT authentication middleware)
app.use("/api/debug", auth, debugRoutes);

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Not found" });
});

// Start server
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});