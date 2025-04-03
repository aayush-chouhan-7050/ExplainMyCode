const mongoose = require("mongoose");

const debugHistorySchema = new mongoose.Schema({
  code: { type: String, required: true },
  language: { type: String, required: true },
  result: {
    error_type: { type: String, default: 'None' },
    explanation: { type: String, default: 'No issues found' },
    fixed_code: { type: String, default: '' },
    optimizations: { type: String, default: 'None' }
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("DebugHistory", debugHistorySchema);
