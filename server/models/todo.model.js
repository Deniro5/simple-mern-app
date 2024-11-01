const mongoose = require("mongoose");

const TodoSchema = mongoose.Schema({
  name: { type: String, required: [true, "Please enter todo name"] },
  isComplete: { type: Boolean, required: true, default: false },
});

const Todo = mongoose.model("Todo", TodoSchema);

module.exports = Todo;
