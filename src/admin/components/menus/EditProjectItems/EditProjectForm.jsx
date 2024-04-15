"use client";
import { useState, useEffect } from "react";
import CategoryBox from "../../CategoryBox";
import CategoryDetails from "./CategoryDetailsForEdit";
import Input from "@/commons/Input";
import {
  AddCategory,
  updateCategoryName,
  handleDeleteImageFromForm,
  removeCategory,
  handleEditChanges,
} from "./AdminEditProjectFunctions";

const EditProjectForm = ({ projectId, defaultProjectData }) => {
  const [projectName, setProjectName] = useState(defaultProjectData.title);
  const [projectDescription, setProjectDescription] = useState(
    defaultProjectData.description
  );
  const [categories, setCategories] = useState(defaultProjectData.categories);
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(null);
  const [formOpen, setFormOpen] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    // Reset formOpen when a new project is selected
    setFormOpen(true);
  }, [projectId]);
  useEffect(() => {
    // Reset category.media when a new project is selected
    return () => {
      setCategories((prev) =>
        prev.map((category) => ({
          ...category,
          unsavedImageUrls: [],
          unsavedVideoUrls: [],
        }))
      );
    };
  }, [projectId]);
  const closeFormAndReloadPage = () => {
    //reload page after form has been closed
    setFormOpen(false);
    setTimeout(() => {
      window.location.reload();
    }, 300);
  };
  const handleSaveProject = async () => {
    setSaving(true);
    setShowWarning(true);
    handleEditChanges({
      projectId: projectId,
      dummyId: defaultProjectData.dummyId,
      title: projectName,
      description: projectDescription,
      categories: categories,
      thumbnail: defaultProjectData.thumbnail,
    })
      .then((status) => {
        //console.log(status);
        if (status === "success") {
          setShowWarning(false);
          setSaving(false);
        } else {
          // Reset saving status and warning message if not successful
          setSaving(false);
          setShowWarning(false);
        }
        closeFormAndReloadPage();
      })
      .catch((error) => {
        console.error("Error saving project: ", error);
        // Reset saving status and warning message
        setSaving(false);
        setShowWarning(false);
      });
  };
  return formOpen ? (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex items-start justify-center overflow-y-auto">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-3xl w-full mt-4 mb-4 relative">
        <button
          onClick={closeFormAndReloadPage}
          className="absolute top-2 right-2 text-lg cursor-pointer focus:outline-none"
        >
          &#10006;
        </button>

        <h1 className="text-xl text-black mb-4 font-black w-full text-center">
          Project Name : {projectName}
        </h1>
        <Input
          onChange={(e) => {
            setProjectName(e.target.value);
          }}
          className="p-4 w-full text-xl font-bold rounded-xl shadow-around"
          placeholder="Enter Project Name"
          type="text"
          value={projectName}
        />
        <h1 className="text-xl text-black mt-10 mb-4 font-black w-full text-center">
          Project Description(optional) :
        </h1>
        <textarea
          onChange={(e) => {
            setProjectDescription(e.target.value);
          }}
          className="p-4 w-full h-32 outline-none focus:border-2 border-solid border-blue-500 shadow-around
          bg-transparent rounded-xl text-xl font-bold  text-slate-600"
          value={projectDescription}
        />

        <h1 className="text-xl text-black mt-10 mb-4 font-black w-full text-center">
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
              AddCategory(categories, setCategories, setCurrentCategoryIndex);
            }}
            className="bg-black text-white hover:bg-white hover:text-black hover:scale-105 
            shadow-around px-4 py-2 rounded-full"
          >
            + Add Category
          </button>
        </div>

        <div className="w-full">
          {categories.length > 0 && currentCategoryIndex !== null && (
            <CategoryDetails
              category={categories[currentCategoryIndex]}
              setCategories={setCategories}
              index={currentCategoryIndex}
              deleteImageFromForm={handleDeleteImageFromForm}
              deleteCategoryFunction={removeCategory}
              setCurrentCategoryIndex={setCurrentCategoryIndex}
              currentCategoryIndex={currentCategoryIndex}
              changeCategoryName={updateCategoryName}
            />
          )}
        </div>
        <button
          onClick={handleSaveProject}
          disabled={saving}
          className="bg-blue-500 text-xl text-white mb-6 px-6 py-4 rounded-xl mx-auto block"
        >
          {saving ? "Saving Project..." : "Save Project"}
        </button>
        {showWarning && (
          <p className="text-red-500 text-center">
            Please wait while the project is being saved! Do not click anywhere
            else.
          </p>
        )}
      </div>
    </div>
  ) : null;
};

export default EditProjectForm;
