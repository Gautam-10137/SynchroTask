const express= require('express');
const router=express();

router.post('comment/:taskId',TaskController.addComment);

module.exports=router;