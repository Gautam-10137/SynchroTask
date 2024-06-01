const express=require('express');
const ProjectController = require('../controller/ProjectController');
const TaskController=require('../controller/TaskController');
const router=express.Router();


router.post('/create',ProjectController.createProject);
router.post('/:projectId/member',ProjectController.addMemberToProject);
// router.delete('/:projectId/members/:userId',ProjectController.removeMemberFromProject);
router.post('/:projectId/task',TaskController.createTask);
module.exports=router;