require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const session = require("express-session");
const passport = require("passport");
const passportConfig = require("./passport/passportConfig");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const debugRoutes = require("./routes/debugRoutes");
const MongoStore = require("connect-mongo");

const app = express();

// CORS
app.use(
  cors({
    origin: "https://explainmycode-mu.vercel.app",
    credentials: true,
  })
);

// Body parser
app.use(express.json());

// Session
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
      collectionName: "sessions",
    }),
    cookie: {
      httpOnly: true,
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: 'none',
    },
  })
);

// Passport
app.use(passport.initialize());
app.use(passport.session());

// Connect DB
connectDB();

// Routes
app.use("/auth", authRoutes);
app.use("/api/debug", debugRoutes);

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Not found" });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
