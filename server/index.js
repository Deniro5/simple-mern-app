const express = require("express");
const todoRoute = require("./routes/todo.route");
const authRoute = require("./routes/auth.route");
const cookieParser = require("cookie-parser");

const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser()); //parse incoming cookies

mongoose
  .connect(
    `mongodb+srv://admin:${process.env.mongoKey}@cluster0.8hyh8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
  )
  .then(() => {
    app.listen(8000, () => {
      console.log("Server is running on port 8000");
    });
  })
  .catch(() => console.log("connection to mongo failed"));

app.use("/api/todos", todoRoute);
app.use("/api/users", authRoute);
