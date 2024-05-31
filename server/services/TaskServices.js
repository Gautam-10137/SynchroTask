const Project = require("../model/Project");
const Task = require("../model/Task");
const TaskServices = {
  createTask: async (detail, projectId) => {
    try {
      const newTask = new Task({ ...detail, projectId: projectId });
      await newTask.save();
      await Project.findByIdAndUpdate(projectId, {
        $push: { tasks: newTask._id },
      });
      return newTask;
    } catch (err) {
      console.error("Error Creating Task:" + err.message());
      throw err;
    }
  },
  addComment: async (taskId, detail) => {
    try {
      const { author, content } = detail;
      const newComment = new Comment({ taskId, author, content });
      await newComment.save();
      const updatedTask = await Task.findByIdAndUpdate(taskId, {
        $push: {comments:newComment._id},
      },{new:true});
      return updatedTask;
    } catch (err) {
      console.error("Error adding comment.");
      throw err;
    }
  },
  addAssignee: async(taskId,userId)=>{
    try{
        const task= await Task.findByIdAndUpdate(taskId,{
            $addToSet:{assignedTo:userId}
        },{new:true}).populate('assignedTo');
        return task;
    }catch(err){
        console.error('Error adding assignee');
        throw err;
    }
  },
  removeAssignee: async(taskId,userId)=>{
    try{
      const task=await Task.findByIdAndUpdate(taskId,{
        $pull:{assignedTo:userId}
      },{new:true}).populate('assignedTo');
      return task;
    }catch(err){
        console.error('Error removing assignee.');
        throw err;
    }
  }
};

module.exports = TaskServices;
