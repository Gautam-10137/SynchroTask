const express=require('express');
const userRoute=require('../routes/UserRouter');
const router=express.Router();
// token verification
const authenticate=(req,res,next)=>{
    
}


router.use('/user',userRoute);
// router.post('/auth/login',);


module.exports=router;

