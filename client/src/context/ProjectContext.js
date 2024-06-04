import React, {createContext,useState,useContext} from 'react';
import axiosApi from '../axios/api';
import { getUser } from '../utils/utils';

const ProjectContext= createContext();

export const useProjects=()=>useContext(ProjectContext);

export const ProjectProvider=({children})=>{
    const [projects,setProjects]=useState([]);
    const [loading,setLoading]=useState(false);
    const fetchProjects= async()=>{
      setLoading(true);
      try{
        const user=getUser();
        const res=await axiosApi(`project/get/${user._id}`);
        setProjects(res.data);
      }catch(err){
        console.error('Error fetching projects.');
      }finally{
        setLoading(false);
      }
    };

    const addProject= async(project)=>{
      try{
        const res=await axiosApi('project/create',project);
        setProjects([...projects,res.data]);
      }catch(err){
        console.error('Error adding project:'+err.message);
      }
    };

    const updateProject= async(updatedProject)=>{
      try{
        const projectId=updatedProject._id;
        const res=await axiosApi.put(`project/update/${projectId}`,updatedProject);
        setProjects(projects.map((project)=>(
           project._id===projectId?res.data.updatedProject:project
        )));
      }catch(err){
        console.error('Error updating project');
      }
    };

    const removeProject = async(projectId)=>{
      try{
        const res=await axiosApi.delete(`project/remove/${projectId}`);
        setProjects(projects.filter((project)=>project._id!==projectId));
      }catch(err){
        console.error('Error removing project');
      }
    };

    return (
        <ProjectContext.Provider value={{projects,fetchProjects,addProject,updateProject,removeProject}}>
          {children}
        </ProjectContext.Provider>
    )
}