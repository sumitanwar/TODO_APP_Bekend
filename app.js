const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const registerRouter = require("./src/routes/register");
const loginRouter = require("./src/routes/login");
const itemRouter = require("./src/routes/todoItem");
const jwt = require("jsonwebtoken");
const auth = require("./src/Authentication/jwtAuth");
require("dotenv").config();
const cors = require("cors");
const app = express();
const port = 8080;
mongoose.set("strictQuery", true);
app.use(bodyparser.json());
app.use(express.json());
app.use(cors());
mongoose.connect("mongodb://localhost/todoApp", (e) => {
  if (e) {
    console.log(e.message);
  } else {
    console.log("connected to DB");
  }
});

app.use("/user/register", registerRouter);
app.use("/user/login", loginRouter);
app.use("/items", auth, itemRouter);
app.get("*", (req, res) => {
  res.status(404).send("Page not Found");
});
app.listen(port, () => {
  console.log(`Server is connected to Port ${port}`);
});
