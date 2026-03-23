const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
require("./connection/conn");
const userApis = require("./controllers/user");
 const taskApis = require("./controllers/task")

app.use(express.json());
app.use(
  cors({
  origin:["https://task-nest-frontend.onrender.com"],
  credentials: true,
})
);
app.use(cookieParser());
app.get("/", (req, res) => {
  res.send("Hello from backend");
});

// Mount the router
app.use("/api/v1", userApis);
app.use("/api/v1", taskApis);

app.listen(process.env.PORT, () => {
  console.log(`Server started at PORT = ${process.env.PORT}`);
});