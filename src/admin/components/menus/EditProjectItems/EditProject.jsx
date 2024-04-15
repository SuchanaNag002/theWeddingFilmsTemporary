"use client";
import { useState, useEffect } from "react";
import EditProjectForm from "./EditProjectForm";
import { ApiCaller } from "@/ApiManager/apiCaller";
import Buffer from "@/client/components/LoadingState/Buffer";
const EditProject = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deletingProjectId, setDeletingProjectId] = useState(null);

  useEffect(() => {
    // Simulate loading completion after 1 seconds
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const fetchProjects = async () => {
      const fetchedProjects = await ApiCaller.fetchAllProjects();
      setProjects(fetchedProjects);
    };
    fetchProjects();
  }, []);

  const handleEdit = (projectId) => {
    const projectToEdit = projects.find((project) => project._id === projectId);
    setSelectedProject(projectToEdit);
  };

  const handleDelete = async (projectId) => {
    try {
      setDeletingProjectId(projectId);

      const projectToDelete = projects.find(
        (project) => project._id === projectId
      );
      if (!projectToDelete) {
        console.error("Project not found.");
        return;
      }
      await ApiCaller.deleteImageFromCloudinary(projectToDelete.thumbnail);
      //delete project images from cloudinary
      for (const category of projectToDelete.categories) {
        if (category.imageUrls && category.imageUrls.length > 0) {
          for (const imageUrl of category.imageUrls) {
            await ApiCaller.deleteImageFromCloudinary(imageUrl);
            console.log(`Deleted image from Cloudinary: ${imageUrl}`);
          }
        }
      }
      const deletedProjectData = await ApiCaller.deleteProjectById(projectId);
      if (deletedProjectData) {
        setProjects((prevProjects) =>
          prevProjects.filter((project) => project._id !== projectId)
        );
      } else {
        console.error("Failed to delete project: " + deletedProjectData);
      }
    } catch (error) {
      console.error("Error deleting project: " + error);
    } finally {
      setDeletingProjectId(null);
    }
  };

  return loading ? (
    <Buffer />
  ) : (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {projects.length === 0 ? (
        <div className="col-span-full flex justify-center items-center h-full">
          <div className="text-center text-gray-500">No projects added</div>
        </div>
      ) : (
        projects.map((project, index) => (
          <div key={project._id} className="bg-white p-4 rounded-md shadow-md">
            <img
              src={project.thumbnail}
              alt={project.title}
              className="w-full h-32 object-cover mb-4 rounded-md"
            />
            <h2 className="text-xl font-bold mb-2">{project.title}</h2>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md flex-grow"
                onClick={() => handleEdit(project._id)}
              >
                Edit
              </button>
              {deletingProjectId === project._id ? (
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded-md mt-2 sm:mt-0 flex-grow"
                  disabled
                >
                  Deleting...
                </button>
              ) : (
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded-md mt-2 sm:mt-0 flex-grow"
                  onClick={() => handleDelete(project._id)}
                >
                  Delete
                </button>
              )}
            </div>
            {selectedProject && selectedProject._id === project._id && (
              <EditProjectForm
                projectId={selectedProject._id}
                defaultProjectData={selectedProject}
              />
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default EditProject;
