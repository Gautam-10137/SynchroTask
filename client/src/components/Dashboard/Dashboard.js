import React from "react";
import ProjectList from "../Project/ProjectList";
import { Link } from "react-router-dom";
import TaskList from "../Task/TaskList";
import DashNavigator from "./DashNavigator";

const Dashboard = () => {

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center items-center">
      <div className="container mx-auto">
       <DashNavigator/>
       <div>
        <Link
          to="/createProject"
          className="bg-blue-600 text-white float-end mr-8   px-4 py-2 rounded hover:bg-blue-700"
        >
          Create Project
        </Link> 
       </div>
        <div className="py-8 px-4 sm:px-6 lg:px-8">
          
          <ProjectList />
        </div>
        <div className="py-8 px-4 sm:px-6 lg:px-8">
          <TaskList />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
