const Project = require("../model/Project");

const ProjectServices = {
  createProject: async (detail) => {
    try {
      const { name, description,members} = detail;
      const newProject = new Project({ name, description,members});
      await newProject.save();
      return newProject ;
    } catch (err) {
      console.error("Error creating a new Project: " + err.message);
      throw err;
    }
  },
  addUsers: async (user,role) => {
    try {
      

    } catch (err) {
      console.error("Error Adding user to project :" + err.message);
      throw err;
    }
  },
};

module.exports = ProjectServices;
