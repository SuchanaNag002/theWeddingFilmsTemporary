"use client";
import React, { useState, useCallback, useEffect } from "react";
import Input from "@/commons/Input";
import Buffer from "@/client/components/LoadingState/Buffer";
import CategoryBox from "../../CategoryBox";
import CategoryDetails from "./CategoryDetailsForAdd";
import { useDropzone } from "react-dropzone";
import {
  handleAddCategory,
  deleteUnsavedMedia,
  deleteCategory,
  changeCategoryName,
  handleSubmit,
  handleAddThumbnail,
} from "@/admin/components/menus/AddProjectItems/AdminAddProjectFunctions";

const defaultProjectData = {
  dummyId: null,
  name: "",
  projectThumbnail: {},
  description: "",
  categories: [],
};

const AddProject = () => {
  const [projectName, setProjectName] = useState(defaultProjectData.name);
  const [projectThumbnail, setProjectThumbnail] = useState(
    defaultProjectData.projectThumbnail
  );
  const [projectDescription, setProjectDescription] = useState(
    defaultProjectData.description
  );
  const [categories, setCategories] = useState(defaultProjectData.categories);
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(null);
  const [addingProject, setAddingProject] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading completion after 0.3 seconds
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 300);
    return () => clearTimeout(timeout);
  }, []);

  const onDrop = useCallback((files) => {
    handleAddThumbnail(files, setProjectThumbnail);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
    },
  });

  const resetForm = () => {
    setProjectName(defaultProjectData.name);
    setProjectThumbnail(defaultProjectData.projectThumbnail);
    setProjectDescription(defaultProjectData.description);
    setCategories(defaultProjectData.categories);
    setCurrentCategoryIndex(null);
  };

  const handleAddProject = async () => {
    setAddingProject(true);
    handleSubmit({
      title: projectName,
      description: projectDescription,
      categories: categories,
      thumbnail: projectThumbnail,
    })
      .then(() => {
        setAddingProject(false);
        setTimeout(() => {
          resetForm();
        }, 1000);
      })
      .catch((error) => {
        console.error("Error adding project:", error);
        setAddingProject(false);
      });
  };

  return loading ? (
    <Buffer />
  ) : (
    <div className="h-full w-full">
      <div className="text-center text-2xl sm:text-4xl font-extrabold mb-16 ">
        My Projects
      </div>
      <div className="my-10 w-full md:w-4/6 flex flex-col items-center justify-center ml-auto mr-auto">
        <h1 className="text-xl text-slate-400 mt-10 mb-4 font-black w-full text-left flex items-center justify-center gap-4 flex-wrap">
          Project Thumbnail :
          <div
            {...getRootProps({
              className: " my-4",
            })}
          >
            <input {...getInputProps()} />
            <p className="cursor-pointer w-max py-2 px-4 text-lg rounded-xl bg-blue-500 text-white">
              Select Or Drag Media Here
            </p>
          </div>
        </h1>
        <img className="" src={projectThumbnail.src} />
        <h1 className="text-xl text-slate-400 mb-4 font-black w-full text-left">
          Project Name :
        </h1>
        <Input
          value={projectName}
          onChange={(e) => {
            setProjectName(e.target.value);
          }}
          className="p-4 w-full text-xl font-bold rounded-xl shadow-around"
          placeholder="Enter Project Name"
          type="text"
          required
        />

        <h1 className="text-xl text-slate-400 mt-10 mb-4 font-black w-full text-left">
          Project Description(optional) :
        </h1>
        <textarea
          value={projectDescription}
          onChange={(e) => {
            setProjectDescription(e.target.value);
          }}
          className="p-4 w-full h-32 outline-none focus:border-2 border-solid border-blue-500 shadow-around
          bg-transparent rounded-xl text-xl font-bold"
          placeholder="Enter Project Description"
        />

        <h1 className="text-xl text-slate-400 mt-10 mb-4 font-black w-full text-left">
          Categories :
        </h1>
        <div className="w-full flex flex-wrap items-center justify-center gap-4 mb-16">
          {categories.map((cat, i) => (
            <CategoryBox
              key={i}
              index={i}
              name={cat.name}
              setter={setCurrentCategoryIndex}
              currentCategoryIndex={currentCategoryIndex}
            />
          ))}
          <button
            onClick={() => {
              handleAddCategory(
                categories,
                setCategories,
                setCurrentCategoryIndex
              );
            }}
            className="bg-black text-white hover:bg-white hover:text-black hover:scale-105 
            shadow-around px-4 py-2 rounded-full"
          >
            + Add Category
          </button>
        </div>

        <div className=" w-full">
          {categories.length > 0 && currentCategoryIndex !== null && (
            <CategoryDetails
              category={categories[currentCategoryIndex]}
              setCategories={setCategories}
              index={currentCategoryIndex}
              deleteUnsavedMedia={deleteUnsavedMedia}
              deleteCategoryFunction={deleteCategory}
              setCurrentCategoryIndex={setCurrentCategoryIndex}
              currentCategoryIndex={currentCategoryIndex}
              changeCategoryName={changeCategoryName}
            />
          )}
        </div>
        <button
          onClick={handleAddProject}
          className="bg-blue-500 text-xl text-white mb-6 px-6 py-4 rounded-xl"
        >
          {addingProject ? "Saving Project..." : "Save Project"}
        </button>
      </div>
    </div>
  );
};

export default AddProject;
