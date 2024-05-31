const express=require('express');
const PostController = require('../controller/ProjectController');
const router=express.Router();


router.post('/create',PostController.createProject);
router.post('/:projectId/members/:userId',PostController.addMemberToProject);
router.delete('/:projectId/members/:userId',PostController.removeMemberFromProject);
router.post('/:projectId/task',TaskController.createTask);
module.exports=router;