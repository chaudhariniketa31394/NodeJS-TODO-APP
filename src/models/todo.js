const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  todo: {
    type: String,
    required: true 
  },
  status: ['Completed', 'Incomplete'],
  email:  {
    type: String,
    required: true 
  },
  date:{
    type: Date,
    required : true
  }
});

module.exports = mongoose.model('Todo', todoSchema);