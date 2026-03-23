const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskSchema = new Schema({
  title: {
    type: String,
    require: true
  },
  description: {
    type: String,
    require: true
  },
  priority: {
    type: String,
    require: true,
    enum :["low","medium","high"],
    default: "low",
  },
  status: {
    type: String,
    require: true,
    enum :["yetToStart","inProgress","completed"],
    default: "yetToStart",
  },
  dueDate: { type: Date, required: true },
  user: {                      
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
},{ timestamps: true });

module.exports = mongoose.model("Task", taskSchema);