const express = require('express');
const router = express.Router();
const Task = require('../models/task');

router.post('/:projectId', async (req, res) => {
  const task = await Task.create({ ...req.body, projectId: req.params.projectId });
  res.json(task);
});

router.get('/:projectId', async (req, res) => {
  const tasks = await Task.find({ projectId: req.params.projectId }).populate('assignedUser');
  res.json(tasks);
});

router.put('/:id', async (req, res) => {
  const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(task);
});

router.delete('/:id', async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.sendStatus(204);
});

module.exports = router;
