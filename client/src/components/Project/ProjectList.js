import React, { useEffect } from 'react';
import { useProjects } from '../../context/ProjectContext';
import ProjectCard from './ProjectCard';

const ProjectList = () => {
  const { projects, fetchProjects, loading } = useProjects();

  useEffect(() => {
    fetchProjects();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Projects</h1>
      <div className="flex flex-wrap justify-around">
        {projects.length>0 && projects.map((project) => (
          <ProjectCard key={project._id} project={project} />
        ))}
      </div>
    </div>
  );
};

export default ProjectList;
