const express = require("express");
const app = express();
app.set("trust proxy", 1);

const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
require("./connection/conn");

const userApis = require("./controllers/user");
const taskApis = require("./controllers/task");

// Middleware
app.use(express.json());

app.use(cors({
  origin: "https://task-nest-frontend.onrender.com",
  credentials: true
}));

app.use(cookieParser());

// Test route
app.get("/", (req, res) => {
  res.send("Hello from backend");
});
app.get("/test", (req, res) => {
  res.json({ message: "Test route working" });
});

// Routes
app.use("/api/v1", userApis);
app.use("/api/v1", taskApis);

// Server
const PORT = process.env.PORT || 1000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server started at PORT = ${PORT}`);
});