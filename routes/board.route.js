const { Router } = require('express');
const boardRouter = Router();
const { BoardModel } = require('../models/board.model');

// Create a new board
boardRouter.post('/', async (req, res) => {
    try {
        const { name } = req.body;
        const newBoard = new BoardModel({ name });
        await newBoard.save();
        res.status(201).json({message:"New Board Created",newBoard});
    } catch (error) {
        res.status(500).json({ error: 'Could not create a new board' });
    }
});

// Get all boards
boardRouter.get('/', async (req, res) => {
    try {
        const boards = await BoardModel.find();
        res.status(200).json(boards);
    } catch (error) {
        res.status(500).json({ error: 'Could not fetch boards' });
    }
});

// Update a board by ID (using PATCH method)
boardRouter.patch('/:id', async (req, res) => {
    try {
      const { name } = req.body;
      const updatedBoard = await BoardModel.findByIdAndUpdate(
        req.params.id,
        { name },
        { new: true }
      );
      if (!updatedBoard) {
        return res.status(404).json({ error: 'Board not found' });
      }
      res.status(200).json({message:"Board Updated",updatedBoard});
    } catch (error) {
      res.status(500).json({ error: 'Could not update board' });
    }
  });

// Delete a board by ID
boardRouter.delete('/:id', async (req, res) => {
    try {
        const deletedBoard = await BoardModel.findByIdAndRemove(req.params.id);
        if (!deletedBoard) {
            return res.status(404).json({ error: 'Board not found' });
        }
        res.status(204).json({message:"Board Deleted Successfully"});
    } catch (error) {
        res.status(500).json({ error: 'Could not delete board' });
    }
});

module.exports = { boardRouter };