import React, { useState } from 'react';
import axiosApi from '../../axios/api';
import { useProjects } from '../../context/ProjectContext';
import AddTaskDialog from '../DialogBox/AddTaskDialog';
import AddMemberDialog from '../DialogBox/AddMemberDialog';
import TaskDetailDialog from '../DialogBox/TaskDetailDialog';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const CreateProject = () => {
  const { addProject,setFetchTask } = useProjects();
  var { user } = useSelector((state) => state.auth);
  const _id=user.id;
  const {id,...rest}=user;
  user={_id,...rest};
  
  const [projectDetails, setProjectDetails] = useState({
    name: '',
    description: '',
    members: [{userId:user,role:'admin'}],
    tasks: [],
  });
 
  const Navigate=useNavigate();
  const [showAddMemberDialog, setShowAddMemberDialog] = useState(false);
  const [showAddTaskDialog, setShowAddTaskDialog] = useState(false);
  const [newMemberEmail, setNewMemberEmail] = useState("");
  const [newMemberRole, setNewMemberRole] = useState("member");
  const [showError,setShowError]=useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [taskDetails, setTaskDetails] = useState({
    title: "",
    description: "",
    status: "to-do",
    priority: "medium",
    assignedTo: [],
    dueDate: "",
  });
  
  const handleTaskClick = (task) => {
    setSelectedTask(task);
  };


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProjectDetails({ ...projectDetails, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("project Details");
      console.log(projectDetails);
      addProject(projectDetails); 
      Navigate('/dashboard');
      
      
    } catch (err) {
      console.error('Error creating project:', err.message);
    }
  };

  const handleAddMember = () => {
    setShowAddMemberDialog(true);
  
  };

  const handleAddMemberSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosApi.get(`user/detail/${newMemberEmail}`);
      
      const newUser = res.data.user;
      projectDetails.members.push({ userId: newUser, role: newMemberRole });
      setShowAddMemberDialog(false);
      setNewMemberEmail("");
      setNewMemberRole("member");
      
    } catch (err) {
      console.log("Error Member Adding");
      setNewMemberEmail("");
      setNewMemberRole("member");
      setShowError(true);
    }
  };

  const handleAddTask = () => {
    setShowAddTaskDialog(true);

  };

  const handleAddTaskSubmit = async (e) => {
    e.preventDefault();
    try {
      const newTask = { ...taskDetails };
      projectDetails.tasks.push(newTask);
      setShowAddTaskDialog(false);
      setTaskDetails({
        title: "",
        description: "",
        status: "to-do",
        priority: "medium",
        assignedTo: [],
        dueDate: "",
      });
    } catch (err) {
      console.error("Error adding task:", err);
    }
    
  };

  const handleCloseDialog = () => {
    setSelectedTask(null);

  };

  return (
    <div className="flex justify-center   items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-3xl p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-blue-600 mb-6 text-center">
          Create Project
        </h2>
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
          <div className="mb-6">
            <label
              htmlFor="name"
              className="block text-gray-700 font-medium mb-2"
            >
              Project Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={projectDetails.name}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-md p-3 focus:border-blue-500 focus:ring focus:ring-blue-200 transition duration-200"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="description"
              className="block text-gray-700 font-medium mb-2"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={projectDetails.description}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-md p-3 focus:border-blue-500 focus:ring focus:ring-blue-200 transition duration-200"
            />
          </div>
          {projectDetails.members.length > 0 && (
            <div className="mb-8">
              <h3 className="text-2xl font-semibold mb-4 text-blue-700">
                Members
              </h3>
              <ul className="list-disc list-inside space-y-2">
                {projectDetails.members.map((member, idx) => (
                  <li key={idx} className="text-gray-600 flex items-center">
                    <span className="font-medium">{member.userId.name}</span>
                    <span className="ml-2 text-gray-500">
                      ({member.userId.email})
                    </span>
                    <span className="ml-2 bg-yellow-200 text-yellow-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">
                      {member.role}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {projectDetails.tasks.length > 0 && (
            <div className="mb-8">
              <h3 className="text-2xl font-semibold mb-4 text-green-700">
                Tasks
              </h3>
              <ul className="space-y-4">
                {projectDetails.tasks.map((task, idx) => (
                  <li
                    key={idx}
                    className="border border-gray-300 rounded-lg p-4 cursor-pointer hover:bg-gray-50 transition duration-200"
                    onClick={() => handleTaskClick(task)}
                  >
                    <h4 className="font-semibold text-lg mb-2">{task.title}</h4>
                    <p className="text-gray-600">{task.description}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-sm text-gray-500">
                        Priority: {task.priority}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div className="flex justify-between mb-4">
            <button
              type="button"
              onClick={handleAddMember}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
            >
              Add Member
            </button>
            <button
              type="button"
              onClick={handleAddTask}
              className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition duration-200"
            >
              Add Task
            </button>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition duration-200"
            >
              Create Project
            </button>
          </div>
        </form>
        {showAddMemberDialog && (
          <AddMemberDialog
            
            showError={showError}
            handleAddMemberSubmit={handleAddMemberSubmit}
            newMemberEmail={newMemberEmail}
            setNewMemberEmail={setNewMemberEmail}
            newMemberRole={newMemberRole}
            setNewMemberRole={setNewMemberRole}
            setShowAddMemberDialog={setShowAddMemberDialog}
            setShowError={setShowError}
          />
        )}
        {showAddTaskDialog && (
          <AddTaskDialog
            project={projectDetails}
            taskDetails={taskDetails}
            setTaskDetails={setTaskDetails}
            setShowAddTaskDialog={setShowAddTaskDialog}
            handleAddTaskSubmit={handleAddTaskSubmit}
          />
        )}
        {selectedTask && (
          <TaskDetailDialog task={selectedTask} userRole="admin" onClose={handleCloseDialog} members={projectDetails.members}/>
        )}
      </div>
    </div>
  );
};

export default CreateProject;
