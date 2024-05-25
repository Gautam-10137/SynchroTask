const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description:{
    type:String
  },
  members: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  }],
  tasks: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Task",
  }],
},{
    timestamps:true    // auto add the created_at and updated_at
});

const project = mongoose.model("Project", projectSchema);

module.exports = project;
