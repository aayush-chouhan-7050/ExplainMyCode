const DebugHistory = require("../models/DebugHistory");

exports.getDebugHistory = async (req, res) => {
  if (!req.user) return res.status(401).json({ message: "Unauthorized" });
  try {
    const history = await DebugHistory.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.json(history);
    console.log("Debug history fetched successfully");
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch history" });
  }
};
