const { Router } = require('express');
const subTaskRouter = Router();
const { SubtaskModel } = require('../models/subtask.model');

// Create a new subtask
subTaskRouter.post('/', async (req, res) => {
    try {
        const { title, isCompleted } = req.body;
        const newSubtask = new SubtaskModel({ title, isCompleted });
        await newSubtask.save();
        res.status(201).json(newSubtask);
    } catch (error) {
        res.status(500).json({ error: 'Could not create a new subtask' });
    }
});

// Get all subtasks
subTaskRouter.get('/', async (req, res) => {
    try {
        const subtasks = await SubtaskModel.find();
        res.status(200).json(subtasks);
    } catch (error) {
        res.status(500).json({ error: 'Could not fetch subtasks' });
    }
});

// Update a subtask by ID (using PUT method)
subTaskRouter.put('/:id', async (req, res) => {
    try {
        const { title, isCompleted } = req.body;
        const updatedSubtask = await SubtaskModel.findByIdAndUpdate(
            req.params.id,
            { title, isCompleted },
            { new: true }
        );
        if (!updatedSubtask) {
            return res.status(404).json({ error: 'Subtask not found' });
        }
        res.status(200).json(updatedSubtask);
    } catch (error) {
        res.status(500).json({ error: 'Could not update subtask' });
    }
});

// Update a subtask by ID (using PATCH method)
subTaskRouter.patch('/:id', async (req, res) => {
    try {
        const { title, isCompleted } = req.body;
        const updatedSubtask = await SubtaskModel.findByIdAndUpdate(
            req.params.id,
            { title, isCompleted },
            { new: true }
        );
        if (!updatedSubtask) {
            return res.status(404).json({ error: 'Subtask not found' });
        }
        res.status(200).json(updatedSubtask);
    } catch (error) {
        res.status(500).json({ error: 'Could not update subtask' });
    }
});

// Delete a subtask by ID
subTaskRouter.delete('/:id', async (req, res) => {
    try {
        const deletedSubtask = await SubtaskModel.findByIdAndRemove(req.params.id);
        if (!deletedSubtask) {
            return res.status(404).json({ error: 'Subtask not found' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Could not delete subtask' });
    }
});

module.exports = { subTaskRouter };