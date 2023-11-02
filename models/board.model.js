const mongoose = require('mongoose');

const boardSchema = new mongoose.Schema({
  name: { type: String, unique: true },
  tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }],
});

const BoardModel = mongoose.model('Board', boardSchema);


module.exports = {
  BoardModel
}