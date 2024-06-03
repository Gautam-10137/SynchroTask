import React, {createContext,useState,useContext} from 'react';
import axiosApi from '../axios/api';

const ProjectContext= createContext();

export const useProjects=()=>useContext(ProjectContext);

export const ProjectProvider=({children})=>{
    const [projects,setProjects]=useState([]);

    const fetchProjects= async()=>{

    };

    const addProject= async()=>{

    };

    const updateProject= async()=>{

    };

    const removeProject = async()=>{

    };

    return (
        <ProjectContext.Provider value={{projects,fetchProjects,addProject,updateProject,removeProject}}>
          {children}
        </ProjectContext.Provider>
    )
}