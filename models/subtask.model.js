const mongoose = require('mongoose');

const subtaskSchema = new mongoose.Schema({
  title: String,
  isCompleted: Boolean,
  task: { type: mongoose.Schema.Types.ObjectId, ref: 'Task' },
});

const SubtaskModel = mongoose.model('Subtask', subtaskSchema);

module.exports = {
  SubtaskModel,
};