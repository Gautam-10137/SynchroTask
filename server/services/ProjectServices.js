const { fetchProjects } = require("../controller/ProjectController");
const Project = require("../model/Project");
const Task = require("../model/Task");
const User = require("../model/User");
const { $where } = require("../model/User");
const { sendMail } = require("./AuthServices");


const ProjectServices = {
  createProject: async (detail) => {
    try {
      const { name, description, members } = detail;
      const newProject = new Project({ name, description, members });
      await newProject.save();
      
      for(const idx in members){
        const msg = `
        <p>You are added to the Project:</p>
        <p><strong>Project Name:</strong> ${name}</p>
        <p><strong>Description:</strong> ${description}</p>
        <p><strong>Role:</strong> ${members[idx].role}</p>
      `;
        sendMail(members[idx].userId.email,"New Project",msg);
       
      }
      return newProject;
    } catch (err) {
      console.error("Error creating a new Project: " + err.message);
      throw err;
    }
  },
  fetchProjectFromDB: async (userId) => {
    try {
      const projects = await Project.find({ "members.userId": userId })
        .populate({
          path:"members.userId",
          model:"User"
         })
        .populate({
          path: "tasks",
          populate: [
          {
            path: "assignedTo",
            model: "User",
          },
          {
            path: "comments",
            model: "Comment",
            populate: {
              path: "author",
              model: "User",
            }
          }
        ]
        });
        
      return projects;
    } catch (err) {
      console.error("Error fetching projects :" + err.message);
    }
  },
  updateProjectFromDB: async (projectId, updateDetails) => {
    try {
      const updatedProject = await Project.findByIdAndUpdate(
        projectId,
        {
          $set: updateDetails,
        },
        { new: true, runValidators: true }
      );

      if (!updatedProject) {
        throw new Error("Project not found!");
      }
      return updatedProject;
    } catch (err) {
      console.error("Error updating project :" + err.message);
    }
  },
  removeProjectFromDB: async (projectId) => {
    try {
      const p=await Project.findById(projectId);

      p.tasks.forEach(async (taskId)=>{
         const task=await Task.findByIdAndDelete(taskId);
      });
      const project = await Project.findByIdAndDelete(projectId);
      if (!project) {
        throw new Error("Project not found");
      }
      return project;
    } catch (err) {
      console.error("Error removing project");
    }
  },
  addMemberToProject: async (projectId, userId, role) => {
    try {
      const updatedProject = await Project.findByIdAndUpdate(
        projectId,
        {
          $push: { members: { userId, role } },
        },
        { new: true, useFindAndModify: false }
      );
      
      return {
        success: true,
        message: "Member added successfully",
        project: updatedProject,
      };
    } catch (err) {
      console.error("Error Adding user to project :" + err.message);
      throw err;
    }
  },
  sendProjectMailToUser:async(req,res)=>{
     try{
          const {email}=req.params;
          const {project,role}=req.body;
          const msg = `
          <p>You are added to the Project:</p>
          <p><strong>Project Name:</strong> ${project.name}</p>
          <p><strong>Description:</strong> ${project.description}</p>
          <p><strong>Role:</strong> ${role}</p>
        `;
          sendMail(email,"New Project",msg);    
          res.status(200).send({message:'mail sent successfully'});

     }catch(err){
      console.log(err.message)
     }
  },
  removeMemberFromProject: async (projectId, userId) => {
    try {
      const project = await Project.findByIdAndUpdate(
        projectId,
        {
          $pull: { members: { userId: userId } },
        },
        { new: true }
      );
      if (!project) {
        throw new Error("Project not found");
      }
      return project;
    } catch (err) {
      console.error("Error removing the user");
      throw err;
    }
  },
};

module.exports = ProjectServices;
