const express=require('express');
const AuthController=require('../controller/AuthController');

const router=express.Router();

router.post('/user/auth/register',AuthController.register);
// router.post('user/auth/login',AuthController.login);

// router.get('/user/confirm/:token'   )


module.exports=router;
