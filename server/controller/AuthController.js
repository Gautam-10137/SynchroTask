const AuthServices=require('../services/AuthServices');
const AuthController={
   register: async(req,res)=>{
       try{
        const detail=req.body;
        console.log(req.body);
        const user=await AuthServices.register(detail);
        // if(user.message("exists!"))
        //     res.status(429).json({message:'A User with given email Already Exists!'});


        res.status(200).json(user);
       }
       catch(err){
        res.status(500).json({message:'Error Registering!',error:err.message});
       }
   }
}

module.exports=AuthController;