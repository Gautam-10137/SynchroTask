const { removeMemberFromProject } = require("../controller/ProjectController");
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
