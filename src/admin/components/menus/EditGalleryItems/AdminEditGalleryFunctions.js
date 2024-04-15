import { ApiCaller } from "@/ApiManager/apiCaller";
import { v4 as uuidv4 } from "uuid";

const handleAddCategory = (
  categories,
  setCategories,
  setCurrentCategoryIndex
) => {
  setCategories((prev) => [
    {
      dummyId: uuidv4(),
      name: `New Category`,
      unsavedImageUrls: [],
      unsavedVideoUrls: [],
    },
    ...prev,
  ]);
  setCurrentCategoryIndex(categories.length);
};

const updateCategoryName = (setCategories, catIndex, newName) => {
  setCategories((prev) => {
    const updatedCategories = [...prev];
    if (catIndex !== null && catIndex < updatedCategories.length) {
      const updatedCategory = { ...updatedCategories[catIndex] };
      updatedCategory.name = newName;
      updatedCategories[catIndex] = updatedCategory;
    }
    return updatedCategories;
  });
};

const removeCategory = (setCategories, catIndex) => {
  setCategories((prev) => {
    const updatedCategories = [...prev];
    console.log(updatedCategories[catIndex]);
    if (catIndex !== null && catIndex < updatedCategories.length) {
      if (
        updatedCategories[catIndex].unsavedImageUrls &&
        updatedCategories[catIndex].unsavedImageUrls.length > 0
      ) {
        updatedCategories[catIndex].unsavedImageUrls = [];
      }
      if (
        updatedCategories[catIndex].unsavedVideoUrls &&
        updatedCategories[catIndex].unsavedVideoUrls.length > 0
      ) {
        updatedCategories[catIndex].unsavedVideoUrls = [];
      }
      const deletedCategoryImageUrls =
        updatedCategories[catIndex].imageUrls || [];
      //remove existing category at its index
      deletedCategoryImageUrls.forEach(async (imageUrl) => {
        try {
          await ApiCaller.deleteImageFromCloudinary(imageUrl);
          console.log(`Image deleted from cloudinary: ${imageUrl}`);
        } catch (error) {
          console.error(`Error deleting image from Cloudinary: ${error}`);
        }
      });
    }
    if (updatedCategories[catIndex].categoryId) {
      ApiCaller.deleteGalleryMediaById(updatedCategories[catIndex].categoryId);
    }
    updatedCategories.splice(catIndex, 1);
    return updatedCategories;
  });
};

const handleDeleteImageFromForm = (categoryIndex, setCategories, media) => {
  setCategories((prevCategories) => {
    const updatedCategories = prevCategories.map((category, index) => {
      if (index !== categoryIndex) return category;

      const updatedCategory = { ...category };
      console.log("Catgeory: ", updatedCategory);
      if (media.tag === "unsavedImage") {
        // Delete unsaved images
        updatedCategory.unsavedImageUrls =
          updatedCategory.unsavedImageUrls.filter(
            (item) => item.src !== media.src
          );
      } else if (media.tag === "unsavedVideo") {
        // Delete unsaved videos
        updatedCategory.unsavedVideoUrls =
          updatedCategory.unsavedVideoUrls.filter(
            (item) => item.src !== media.src
          );
      } else if (media.tag === "savedImage") {
        // Delete saved images
        updatedCategory.imageUrls = updatedCategory.imageUrls.filter(
          (url) => url !== media.src
        );
        ApiCaller.deleteImageFromCloudinary(media.src);
      } else if (media.tag === "savedVideo") {
        // Delete saved video links
        updatedCategory.videoUrls = updatedCategory.videoUrls.filter(
          (url) => url !== media.src
        );
      }

      return updatedCategory;
    });

    return updatedCategories;
  });
};

const handleAddToGallery = async (categoryData) => {
  console.log("Received Category at Submit function: ", categoryData);
  const { category } = categoryData;
  // Initialize imageUrls and videoUrls arrays if they don't exist
  category.imageUrls = category.imageUrls || [];
  category.videoUrls = category.videoUrls || [];

  // Check if unsavedImageUrls array has some length
  if (category.unsavedImageUrls && category.unsavedImageUrls.length > 0) {
    // Iterate through unsavedImageUrls
    for (const media of category.unsavedImageUrls) {
      try {
        // Upload image to Cloudinary
        const formData = new FormData();
        formData.append("file", media.file);
        formData.append("upload_preset", "photographer_portfolio");
        formData.append("folder", `Gallery_Images/${category.dummyId}`);
        const cloudinaryResponse = await ApiCaller.UploadToCloudinary(formData);

        // Append secure_url to imageUrls array
        if (cloudinaryResponse.secure_url) {
          category.imageUrls.push(cloudinaryResponse.secure_url);
        }
      } catch (error) {
        console.error("Error uploading image to Cloudinary:", error);
      }
    }
    category.unsavedImageUrls = [];
  }

  // Check if unsavedVideoUrls array has some length
  if (category.unsavedVideoUrls && category.unsavedVideoUrls.length > 0) {
    // Iterate through unsavedVideoUrls
    for (const media of category.unsavedVideoUrls) {
      category.videoUrls.push(media.src);
    }
    category.unsavedVideoUrls = [];
  }
  const newCategoryData = {
    categoryId: category.categoryId,
    dummyId: category.dummyId,
    name: category.name,
    imageUrls: category.imageUrls,
    videoUrls: category.videoUrls,
  };
  // Update gallery data in the database
  try {
    console.log("Before sending: ", newCategoryData);
    const catData = await ApiCaller.postGalleryMedia(newCategoryData);
    console.log("After submission: ", catData);
  } catch (error) {
    console.error("Error posting gallery media:", error);
  }
};

export {
  handleAddCategory,
  updateCategoryName,
  removeCategory,
  handleDeleteImageFromForm,
  handleAddToGallery,
};
