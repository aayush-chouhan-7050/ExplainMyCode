require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT;

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());


// Routes
const debugRoutes = require("./routes/debugRoutes");
app.use("/api/debug", debugRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
