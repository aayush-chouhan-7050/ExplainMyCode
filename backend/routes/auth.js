const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const auth = require("../middleware/auth");
const jwt = require("jsonwebtoken");
const TokenBlacklist = require("../models/TokenBlacklist");

const router = express.Router();

// Register (local)
router.post("/register", async (req, res) => {
  try {
    const { email, password, username } = req.body;
    
    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }
    
    const hash = bcrypt.hashSync(password, 10);
    const user = await User.create({ email, password: hash, username });
    
    // Generate token
    const token = user.generateAuthToken();
    
    // Return user data and token
    res.status(201).json({
      message: "Registration successful",
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      },
      token
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// Login (local)
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    
    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    
    // Generate token
    const token = user.generateAuthToken();
    
    res.json({
      message: "Login successful",
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      },
      token
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// Get current user
router.get("/me", auth, (req, res) => {
  res.json({
    user: {
      id: req.user._id,
      username: req.user.username,
      email: req.user.email
    }
  });
});

// Logout route
router.post("/logout", auth, async (req, res) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    // Get token expiry from decoded payload
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const expiryDate = new Date(decoded.exp * 1000);
    
    // Add to blacklist
    await TokenBlacklist.create({
      token,
      expiry: expiryDate
    });
    
    res.json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ error: "Logout failed" });
  }
});

// Profile update route
router.put("/update-profile", auth, async (req, res) => {
  try {
    const { username, email } = req.body;
    
    // Update user
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { username, email },
      { new: true }
    );
    
    res.json({
      message: "Profile updated successfully",
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    });
  } catch (error) {
    console.error("Profile update error:", error);
    res.status(500).json({ error: "Profile update failed" });
  }
});

module.exports = router;