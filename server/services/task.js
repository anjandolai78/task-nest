const Task = require("../models/tasks");
const User = require("../models/user");

// add task
const addTask = async (req, res) => {
  try {
    const { title, description, priority, status,dueDate } = req.body;
    const { user } = req;

    if (!title || !description) {
      return res.status(400).json({ error: "All fields are required." });
    }
    if (title.length < 6) {
      return res.status(400).json({ error: "Title must have 6 characters." });
    }
    if (description.length < 6) {
      return res.status(400).json({ error: "Description must have 6 characters." });
    }

    // link the task to the user
    const newTask = new Task({
      title,
      description,
      priority,
      status,
      dueDate,
      user: user._id,  
    });

    await newTask.save();

    // push the task into user
    await User.findByIdAndUpdate(user._id, {
      $push: { tasks: newTask._id },
    });

    return res.status(200).json({ success: "Task added." });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

// edit task
const editTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, priority, status,dueDate } = req.body;
    const { user } = req;

    if (!title || !description) {
      return res.status(400).json({ error: "All fields are required." });
    }
    if (title.length < 6) {
      return res.status(400).json({ error: "Title must have 6 characters." });
    }
    if (description.length < 6) {
      return res.status(400).json({ error: "Description must have 6 characters." });
    }

    //  only update if user belong to task
    await Task.findOneAndUpdate(
      { _id: id, user: user._id },
      { title, description, priority, status,dueDate }
    );

    return res.status(200).json({ success: "Task updated." });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

// to get single task
const getTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { user } = req;

    const taskDetails = await Task.findOne({
      _id: id,
      user: user._id,   
    });

    return res.status(200).json({ taskDetails });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

// delete the task
const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { user } = req;

    // delete only user's task
    await Task.findOneAndDelete({
      _id: id,
      user: user._id,
    });

    // remove from user task array
    await User.findByIdAndUpdate(user._id, {
      $pull: { tasks: id },
    });

    return res.status(200).json({ success: "Task Deleted." });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { addTask, editTask, getTask, deleteTask };