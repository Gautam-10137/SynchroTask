import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import axiosApi from '../axios/api';
import { getUser } from '../utils/utils';
import { useSelector } from 'react-redux';

const ProjectContext = createContext();

export const useProjects = () => useContext(ProjectContext);

export const ProjectProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const { user } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);

  const saveProjectsToLocalStorage = (projects) => {
    localStorage.setItem('projects', JSON.stringify(projects));
  };

  const loadProjectsFromLocalStorage = () => {
    const storedProjects = localStorage.getItem('projects');
    return storedProjects ? JSON.parse(storedProjects) : [];
  };

  const fetchProjects = useCallback(async () => {
    setLoading(true);
    try {
      const user = getUser();
      const res = await axiosApi.get(`project/get/${user.id}`);
      setProjects(res.data.projects);
      saveProjectsToLocalStorage(res.data.projects);
    } catch (err) {
      console.error('Error fetching projects.');
      const localProjects = loadProjectsFromLocalStorage();
      setProjects(localProjects);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const addProject = async (project) => {
    try {
      const res = await axiosApi.post('project/create', project);
      fetchProjects();
    } catch (err) {
      console.error('Error adding project: ' + err.message);
    }
  };

  const updateProject = async (updatedProject) => {
    try {
      const projectId = updatedProject._id;
      const res = await axiosApi.put(`project/update/${projectId}`, updatedProject);
      setProjects((prevProjects) =>
        prevProjects.map((project) => (project._id === projectId ? updatedProject : project))
      );
      saveProjectsToLocalStorage(projects);
    } catch (err) {
      console.error('Error updating project');
    }
  };

  const removeProject = async (projectId) => {
    try {
      await axiosApi.delete(`project/remove/${projectId}`);
      setProjects((prevProjects) => prevProjects.filter((project) => project._id !== projectId));
      saveProjectsToLocalStorage(projects);
    } catch (err) {
      console.error('Error removing project');
    }
  };

  return (
    <ProjectContext.Provider value={{ projects, fetchProjects, addProject, updateProject, removeProject }}>
      {children}
    </ProjectContext.Provider>
  );
};
