const ProjectServices = require("../services/ProjectServices");

const PostController={
    createProject: async (req,res)=>{
      try{
        const detail=req.body;
        const newProject=await  ProjectServices.createProject(detail);
        res.status(201).json({newProject});
      }
      catch(err){
        console.error('Error adding new Project: '+err.message);
        res.status(500).send({message:'Error adding new product'});
      }
    },
    addUsersToProject: async()
      
    
}; 

module.exports=PostController;