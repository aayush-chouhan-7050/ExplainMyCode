require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const session = require("express-session");
const passport = require("passport");
const passportConfig = require("./passport/passportConfig");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const debugRoutes = require("./routes/debugRoutes");
const MongoStore = require("connect-mongo");



const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL ,
    credentials: true,
  })
);

app.use(express.json());
app.use(bodyParser.json()); // optional here since express.json handles it

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

app.use(passport.initialize());
app.use(passport.session());



const PORT = process.env.PORT|| 5000;

// Connect to MongoDB
connectDB();


// Routes
app.use("/auth", authRoutes);
app.use("/api/debug", debugRoutes);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});
