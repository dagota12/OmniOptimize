"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {
  // Fetch all projects for this user
  const projects = useQuery(api.projects.getMyProjects);
  const [activeProject, setActiveProject] = useState(null);

  // Auto-select the first project when data loads
  useEffect(() => {
    if (projects && projects.length > 0 && !activeProject) {
      setActiveProject(projects[0]);
    }
  }, [projects, activeProject]);

  return (
    <ProjectContext.Provider value={{ projects, activeProject, setActiveProject, isLoading: projects === undefined }}>
      {children}
    </ProjectContext.Provider>
  );
};

export const useProject = () => useContext(ProjectContext);