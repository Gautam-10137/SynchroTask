import React from 'react';

const ProjectCard = ({ project }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg p-6 m-4 bg-white">
      <div className="font-bold text-xl mb-2">{project.name}</div>
      <p className="text-gray-700 text-base mb-4">{project.description}</p>
      <p className="text-gray-500 text-sm">Members: {project.members.length}</p>
      <p className="text-gray-500 text-sm">Tasks: {project.tasks.length}</p>
    </div>
  );
};

export default ProjectCard;
