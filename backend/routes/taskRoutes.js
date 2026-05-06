const express = require("express");
const router = express.Router();

const Task = require("../models/Task");

// GET ALL TASKS
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// CREATE TASK
router.post("/", async (req, res) => {
  try {
    const newTask = new Task({
      title: req.body.title,
      dueDate: req.body.dueDate,
      category: req.body.category,
    });

    const savedTask = await newTask.save();

    res.status(201).json(savedTask);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE TASK
router.delete("/:id", async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Task deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;