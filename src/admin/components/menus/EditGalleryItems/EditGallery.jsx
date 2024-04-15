"use client";
import { useState, useEffect } from "react";
import { ApiCaller } from "@/ApiManager/apiCaller";
import CategoryBox from "../../CategoryBox";
import CategoryDetails from "./CategoryDetailsForGallery";
import Buffer from "@/client/components/LoadingState/Buffer";
import {
  handleAddCategory,
  updateCategoryName,
  removeCategory,
  handleDeleteImageFromForm,
} from "../EditGalleryItems/AdminEditGalleryFunctions";

const EditGallery = () => {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [galleryLoading, setGalleryLoading] = useState(true);
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);

  useEffect(() => {
    // Simulate loading completion after 0.3 seconds
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 300);

    // Simulate gallery loading completion after 4 seconds
    const galleryTimeout = setTimeout(() => {
      setGalleryLoading(false);
    }, 4000);

    return () => {
      clearTimeout(timeout);
      clearTimeout(galleryTimeout);
    };
  }, []);

  useEffect(() => {
    ApiCaller.getGalleryMedia().then((imageRes) => {
      if (imageRes && Array.isArray(imageRes)) {
        const categoriesData = imageRes.map((item) => ({
          categoryId: item._id,
          dummyId: item.dummyId,
          name: item.name,
          imageUrls: item.imageUrls || [],
          videoUrls: item.videoUrls || [],
        }));
        setCategories(categoriesData);
      } else {
      }
    });
  }, []);

  return loading ? (
    <Buffer />
  ) : (
    <div className="h-full w-full">
      <div className="text-center text-2xl sm:text-4xl font-extrabold mb-16">
        My Gallery
      </div>

      <h1 className="text-xl text-black mt-10 mb-4 font-black w-full text-center">
        Categories :
      </h1>
      <div className="w-full flex flex-wrap items-center justify-center gap-4 mb-16">
        {categories &&
          categories.length > 0 &&
          categories.map((cat, i) => (
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
          className="bg-black text-white hover:bg-white hover:text-black hover:scale-105 shadow-around px-4 py-2 rounded-full"
        >
          + Add Category
        </button>
      </div>
      <div className="w-full">
        {categories &&
          categories.length > 0 &&
          currentCategoryIndex !== null && (
            <CategoryDetails
              category={categories[currentCategoryIndex]}
              setCategories={setCategories}
              index={currentCategoryIndex}
              deleteUnsavedMedia={handleDeleteImageFromForm}
              deleteCategoryFunction={removeCategory}
              setCurrentCategoryIndex={setCurrentCategoryIndex}
              currentCategoryIndex={currentCategoryIndex}
              changeCategoryName={updateCategoryName}
            />
          )}
      </div>
    </div>
  );
};

export default EditGallery;
