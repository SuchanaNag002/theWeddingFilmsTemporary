"use client"
import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const ProjectContext = createContext([]);

export const ProjectContextProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios.get("/api/projects")
      .then((response) => {
        const data = response.data;
        setProjects(data.data); // Assuming the data is an array of projects
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <ProjectContext.Provider value={{projects,setProjects}}>
      {children}
    </ProjectContext.Provider>
  );
};