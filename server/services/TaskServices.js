const Project = require("../model/Project");
const Task = require("../model/Task");
const Comment = require("../model/Comment");
const TaskServices = {
  createTask: async (detail, projectId) => {
    try {
      const newTask = new Task({ ...detail, projectId: projectId });
      if (!newTask) {
        throw new Error("Incorrect Task Deatils ");
      }
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
  fetchTaskFromDB: async (userId) => {
    try {
      const tasks = await Task.find({assignedTo:userId}).populate('assignedTo', 'name email').populate('projectId');
      if (!tasks) {
        return null;
      }
      return tasks;
    } catch (err) {
      console.error("Error fetching tasks");
    }
  },
  updateTaskStatusInDB: async (taskId, updatedStatus) => {
    try {
      const task = await Task.findByIdAndUpdate(taskId, 
        { $set :{status: updatedStatus} },{new:true});
      console.log(task);
      return task;
    } catch (err) {
      console.error("Error Updating Tasks");
    }
  },
  addComment: async (taskId, detail) => {
    try {
      const { author, content } = detail;
      if (!author || !content || !taskId) {
        throw new Error("taskId, author and content are required");
      }
      const newComment = new Comment({ taskId, author, content });
      if (!newComment) {
        throw new Error("Incorrect Details provided.");
      }
      await newComment.save();
      const updatedTask = await Task.findByIdAndUpdate(
        taskId,
        {
          $push: { comments: newComment._id },
        },
        { new: true }
      );
      const comment= await Comment.findOne({_id:newComment._id}).populate('author');

    
      return comment;
    } catch (err) {
      console.error("Error adding comment.");
    }
  },
  addAssignee: async (taskId, userId) => {
    try {
      const task = await Task.findByIdAndUpdate(
        taskId,
        {
          $addToSet: { assignedTo: userId },
        },
        { new: true }
      ).populate("assignedTo");
      if (!task) {
        throw new Error("Incorrect Info provided.");
      }
      return task;
    } catch (err) {
      console.error("Error adding assignee");
      throw err;
    }
  },
  removeAssignee: async (taskId, userId) => {
    try {
      const task = await Task.findByIdAndUpdate(
        taskId,
        {
          $pull: { assignedTo: userId },
        },
        { new: true }
      ).populate("assignedTo");
      if (!task) {
        throw new Error("Incorrect Info provided.");
      }
      return task;
    } catch (err) {
      console.error("Error removing assignee.");
      throw err;
    }
  },
  updateTaskFromDB: async(taskId,updatedDetails)=>{
    try{
      
        const updatedTask= await Task.findByIdAndUpdate(taskId,{
          $set:updatedDetails
        },{new:true,runValidators:true});
      
       if(!updatedTask){
        return res.status(400).send({message:'Invalid task details'});
       }
       return updatedTask;
         
       
    }catch(err){
      console.error("Error task updating");
      throw err;
    }

  },
  removeTaskFromDB:async(taskId)=>{
    try{
        const task=await Task.findByIdAndDelete(taskId);
        if(!task){
          console.error("No task found");
        }
        return task;
    }
    catch(err){
      console.error("Error removing task from DB");
    }
  }
};

module.exports = TaskServices;
