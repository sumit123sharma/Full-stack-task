const express = require('express');
const router = express.Router();
const Project = require('../models/project');
const { authMiddleware, authorizeRoles } = require('../middlewares/auth');

router.use(authMiddleware);

router.post('/', authorizeRoles('Admin'), async (req, res) => {
  try {
    const project = await Project.create(req.body);
    res.json(project);
  } catch (error) {
    console.log("error ++++", error)
    return res.json({error : error})
  }
});

router.get('/', async (req, res) => {
  const { status, teamMember } = req.query;
  const filter = {};
  if (status) filter.status = status;
  if (teamMember) filter.teamMembers = teamMember;
  const projects = await Project.find(filter).populate('teamMembers');
  res.json(projects);
});

router.put('/:id', authorizeRoles('Admin'), async (req, res) => {
  const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(project);
});

router.delete('/:id', authorizeRoles('Admin'), async (req, res) => {
  await Project.findByIdAndDelete(req.params.id);
  res.sendStatus(204);
});

module.exports = router;