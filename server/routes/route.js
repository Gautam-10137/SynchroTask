const express=require('express');
const userRoute=require('../routes/UserRouter');
const router=express.Router();

router.use('/user',userRoute);
// router.post('/auth/login',);


module.exports=router;

