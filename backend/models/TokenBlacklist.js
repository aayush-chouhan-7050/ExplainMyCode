const mongoose = require("mongoose");

const tokenBlacklistSchema = new mongoose.Schema({
  token: { type: String, required: true },
  expiry: { type: Date, required: true, expires: 0 } 
});

module.exports = mongoose.model("TokenBlacklist", tokenBlacklistSchema);