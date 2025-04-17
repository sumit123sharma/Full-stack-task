const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    title: String,
    description: String,
    projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
    assignedUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    priority: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
    status: { type: String, enum: ['to-do', 'in-progress', 'done'], default: 'to-do' },
    dueDate: Date,
  });
  
  module.exports = mongoose.model('Task', TaskSchema);