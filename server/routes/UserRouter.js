const express=require('express');
const AuthController=require('../controller/AuthController');
const AuthServices = require('../services/AuthServices');
const path=require('path');
const router=express.Router();

router.post('/user/auth/register',AuthController.register);
router.post('/user/auth/login',AuthController.login);
router.post('/user/forgot-password',AuthServices.forgotPassword);
router.get('/user/confirm/:token', AuthServices.activeAccount);
router.get('/user/reset-password/view/:token',async (req,res)=>{
    try{
        const token= req.params.token;
        const viewsPath = path.join(__dirname, '../public/views');
        res.sendFile(path.join(viewsPath, 'passwordReset.html'));
    }
    catch(err){
        res.status(500).send("Error Reseting Password")
    }
});
router.post('/user/reset-password/:token',AuthServices.resetPassword);


module.exports=router;
