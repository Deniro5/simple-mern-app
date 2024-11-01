const express = require("express");
const todoRoute = require("./routes/todo.route");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

mongoose
  .connect(
    `mongodb+srv://admin:${process.env.mongoKey}@cluster0.8hyh8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
  )
  .then(() => {
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch(() => console.log("connection to mongo failed"));

app.use("/api/todos", todoRoute);
