import React, { useEffect, useState } from "react";
import { useProjects } from "../../context/ProjectContext";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const ProjectDetail = () => {
  const { projectId } = useParams();
  const { projects } = useProjects();
  const [project, setProject] = useState(null);
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    if (projects.length > 0) {
      const foundProject = projects.find((proj) => proj._id === projectId);
      if (foundProject) {
        setProject(foundProject);
        const member = foundProject.members.find(
          (member) => member.userId._id === user.id
        );
        if (member) {
          setUserRole(member.role);
        } else {
          console.error(
            `User with id ${user.id} is not a member of project with id ${projectId}`
          );
        }
      } else {
        console.error(`Project with id ${projectId} not found.`);
      }
    }
  }, [projects, projectId]);

  const handleAddMember = () => {
    // Logic to add a member to the project
  };

  const handleAddTask = () => {
    // Logic to add a task to the project
  };

  if (!project) {
    return <p className="text-gray-700">No project selected.</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg mt-6">
      <h2 className="text-4xl font-bold mb-6 text-center text-purple-700">
        {project.name}
      </h2>
      <p className="text-gray-700 mb-6 text-center">{project.description}</p>
      <div className="mb-8">
        <h3 className="text-2xl font-semibold mb-4 text-blue-700">Members</h3>
        <ul className="list-disc list-inside space-y-2">
          {project.members.map((member, idx) => (
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
      <div className="mb-8">
        <h3 className="text-2xl font-semibold mb-4 text-green-700">Tasks</h3>
        <ul className="list-disc list-inside space-y-2">
          {project.tasks.map((task, idx) => (
            <li key={idx} className="text-gray-600">
              {task}
            </li>
          ))}
        </ul>
      </div>
      {(userRole === "admin" || userRole === "manager") && (
        <div className="flex justify-center mt-4">
          <button
            onClick={handleAddMember}
            className="btn bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 mr-4 rounded"
          >
            Add Member
          </button>
          <button
            onClick={handleAddTask}
            className="btn bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Add Task
          </button>
        </div>
      )}
    </div>
  );
};

export default ProjectDetail;
