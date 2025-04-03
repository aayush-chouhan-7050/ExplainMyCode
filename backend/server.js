require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");

const app = express();
const PORT = process.env.PORT|| 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(bodyParser.json());


// Routes
const debugRoutes = require("./routes/debugRoutes");
app.use("/api/debug", debugRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});
