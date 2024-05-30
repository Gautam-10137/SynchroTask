const express=require('express');
const PostController = require('../controller/ProjectController');
const router=express.Router();

router.post('/createProject',PostController.createProject);
router.post('/addMember',PostController.addMemberToProject);
module.exports=router;