const { Router } = require('express');
const taskRouter = Router();
const { TaskModel } = require('../models/task.model');
const { SubtaskModel } = require('../models/subtask.model')
const { BoardModel } = require("../models/board.model");

// Create a new task
taskRouter.post('/', async (req, res) => {
    try {
        const { title, description, status, subtasks, boardId } = req.body;

        const newTask = new TaskModel({ title, description, status, subtasks });

        // Create associated subtasks
        const subtaskIds = [];
        for (const subtaskData of subtasks) {
            const newSubtask = new SubtaskModel(subtaskData);
            await newSubtask.save();
            subtaskIds.push(newSubtask._id);
        }

        newTask.subtasks = subtaskIds;
        await newTask.save();

        // Update the associated board by pushing the task ID into its tasks array
        const updatedBoard = await BoardModel.findByIdAndUpdate(
            boardId,
            { $push: { tasks: newTask._id } },
            { new: true }
        );

        res.status(201).json({ message: "Task Created", newTask, updatedBoard });
    } catch (error) {
        res.status(500).json({ error: 'Could not create a new task with subtasks and associate with board' });
    }
});



// Get all tasks
taskRouter.get('/', async (req, res) => {
    try {
      const tasks = await TaskModel.find().populate('subtasks');
      res.status(200).json(tasks);
    } catch (error) {
      res.status(500).json({ error: 'Could not fetch tasks' });
    }
  });

// Update a task by ID (using PATCH method)
taskRouter.patch('/:id', async (req, res) => {
    try {
        const { title, description, status, subtasks } = req.body;
        const updatedTask = await TaskModel.findByIdAndUpdate(
            req.params.id,
            { title, description, status, subtasks },
            { new: true }
        );
        if (!updatedTask) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.status(200).json(updatedTask);
    } catch (error) {
        res.status(500).json({ error: 'Could not update task' });
    }
});

// Update a task by ID
taskRouter.put('/:id', async (req, res) => {
    try {
        const { title, description, status, subtasks } = req.body;
        const updatedTask = await TaskModel.findByIdAndUpdate(
            req.params.id,
            { title, description, status, subtasks },
            { new: true }
        );
        if (!updatedTask) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.status(200).json(updatedTask);
    } catch (error) {
        res.status(500).json({ error: 'Could not update task' });
    }
});

// Delete a task by ID
taskRouter.delete('/:id', async (req, res) => {
    try {
        const deletedTask = await TaskModel.findByIdAndRemove(req.params.id);
        if (!deletedTask) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Could not delete task' });
    }
});

module.exports = { taskRouter };