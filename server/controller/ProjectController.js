const ProjectServices = require("../services/ProjectServices");

const PostController={
    createProject: async (req,res)=>{
      try{
        const detail=req.body;
        const createProjectResponse=await  ProjectServices.createProject(detail);

        if(!createProjectResponse.sucess){
            return res.status(400).json({message:"Incomplete Information provided."});
        }
        res.status(200).json({message:'Project is created successfully.'});
      }
      catch(err){
        res.status(500).send({message:'Error adding new product'});
      }
    },
    
}; 

module.exports=PostController;