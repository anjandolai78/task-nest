const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  priority: {
    type: String,
    required: true,
    enum :["low","medium","high"],
    default: "low",
  },
  status: {
    type: String,
    required: true,
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
taskSchema.index({ user: 1 });
taskSchema.index({ status: 1 });
taskSchema.index({ priority: 1 });

module.exports = mongoose.model("Task", taskSchema);