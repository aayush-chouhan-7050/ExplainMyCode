const DebugHistory = require("../models/DebugHistory");

exports.getDebugHistory = async (req, res) => {
  try {
    const history = await DebugHistory.find().sort({ createdAt: -1 });
    res.json(history);
    console.log("Debug history fetched successfully");
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch history" });
  }
};
