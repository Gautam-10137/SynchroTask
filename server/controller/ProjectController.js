const ProjectServices = require("../services/ProjectServices");

const PostController={
    createProject: async (req,res)=>{
      try{
        const detail=req.body;
        const newProject=await  ProjectServices.createProject(detail);
        res.status(201).json({newProject});
      }catch(err){
        console.error('Error adding new Project: '+err.message);
        res.status(500).send({message:'Error adding new project'});
      }
    },
    addMemberToProject: async(req,res)=>{
      try{
        const {projectId,userId,role}=req.body;
        const response=await ProjectServices.addMemberToProject(projectId,userId,role);
        res.status(200).send({project:response.project}); 
      }catch(err){
        console.error('Error adding member to project:'+err.message);
        res.status(500).send({message:'Error adding member to project'});
      }

    }
      
    
}; 

module.exports=PostController;