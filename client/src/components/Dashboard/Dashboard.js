import React, { useState } from 'react';
import ProjectList from '../Project/ProjectList';
import { Link } from 'react-router-dom';
// import CreateProject from '../Project/CreateProject';

const Dashboard = () => {
  


  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Link to="/createProject" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700" >
          Create Project
        </Link>
      </div>
      <ProjectList />
      
    </div>
  );
};

export default Dashboard;
