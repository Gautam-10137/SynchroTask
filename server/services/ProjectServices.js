const Project = require("../model/Project");

const ProjectServices = {
  createProject: async (detail) => {
    try {
      const { name, description, members } = detail;
      const newProject = new Project({ name, description, members });
      await newProject.save();
      return newProject;
    } catch (err) {
      console.error("Error creating a new Project: " + err.message);
      throw err;
    }
  },
  addMemberToProject: async (projectId, userId, role) => {
    try {
      const updatedProject=await Project.findByIdAndUpdate(projectId, {
        $push: { members: { userId, role } },
      },{new:true,useFindAndModify:false}
      );
      return {success:true,message:'Member added successfully',project:updatedProject};

    } catch (err) {
      console.error("Error Adding user to project :" + err.message);
      throw err;
    }
  },
};

module.exports = ProjectServices;
