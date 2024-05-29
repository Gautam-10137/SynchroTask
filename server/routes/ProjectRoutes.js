const express=require('express');
const PostController = require('../controller/ProjectController');
const router=express.Router();

router.post('/createProject',PostController.createProject);

module.exports=router;