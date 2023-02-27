const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  todo: {
    type: String,
    required: true 
  },
  status: ['Pending', 'InProgress', 'Completed'],
  username:  {
    type: String,
    required: true 
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "Account"
  }
});

module.exports = mongoose.model('Todo', todoSchema);