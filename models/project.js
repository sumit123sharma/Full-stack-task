const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    name: String,
    description: String,
    startDate: Date,
    dueDate: Date,
    status: { type: String, enum: ['open', 'in-progress', 'completed'], default: 'open' },
    // teamMembers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    teamMembers: String,
  });
  
  module.exports = mongoose.model('Project', ProjectSchema);