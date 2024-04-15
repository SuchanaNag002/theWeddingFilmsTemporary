import { ApiCaller } from "@/ApiManager/apiCaller";
//EDIT PROJECT functions

const generateCategoryDummyId = () => {
  const length = 4;
  let result = "";

  for (let i = 0; i < length; i++) {
    const randomNumber = Math.floor(Math.random() * 36);
    const character =
      randomNumber < 10 ? randomNumber : String.fromCharCode(randomNumber + 87);
    result += character;
  }

  return result;
};

const AddCategory = (categories, setCategories, setCurrentCategoryIndex) => {
  setCategories((prev) => [
    {
      name: `New Category`,
      dummyCatId: generateCategoryDummyId(),
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
//delete picture
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

//remove category from existing project
const removeCategory = (setCategories, catIndex) => {
  setCategories((prev) => {
    const updatedCategories = [...prev];
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
      updatedCategories.splice(catIndex, 1);

      deletedCategoryImageUrls.forEach(async (imageUrl) => {
        try {
          await ApiCaller.deleteImageFromCloudinary(imageUrl);
          console.log(`Image deleted from cloudinary: ${imageUrl}`);
        } catch (error) {
          console.error(`Error deleting image from Cloudinary: ${error}`);
        }
      });
    }
    return updatedCategories;
  });
};

const handleEditChanges = async (existingProjectData) => {
  console.log("Received project: ", existingProjectData);
  try {
    const updatedCategories = [];
    for (const [
      catIndex,
      category,
    ] of existingProjectData.categories.entries()) {
      const updatedImageUrls = [];
      const updatedVideoUrls = [];
      // Upload unsaved media files to Cloudinary for the category
      if (category.unsavedImageUrls && category.unsavedImageUrls.length > 0) {
        const uploadedImageUrls = await Promise.all(
          category.unsavedImageUrls.map(async (media) => {
            console.log(`Uploading new media for category: ${category.name}`);
            const mediaFormData = new FormData();
            mediaFormData.append("file", media.file);
            mediaFormData.append("upload_preset", "photographer_portfolio");
            mediaFormData.append(
              "folder",
              `${existingProjectData.dummyId}/${category.dummyCatId}`
            );
            const mediaData = await ApiCaller.UploadToCloudinary(mediaFormData);
            return mediaData.secure_url;
          })
        );
        // Append uploaded image URLs to existing imageUrls array
        updatedImageUrls.push(
          ...uploadedImageUrls,
          ...(category.imageUrls || [])
        );
      } else {
        // If no unsaved image URLs, simply append existing image URLs
        updatedImageUrls.push(...(category.imageUrls || []));
      }
      // Append unsaved video URLs
      category.unsavedVideoUrls?.forEach((media) => {
        updatedVideoUrls.push(media.src);
      });

      // Append existing video URLs
      updatedVideoUrls.push(...(category.videoUrls || []));

      // Create updated category object with appended image and video URLs
      const updatedCategory = {
        dummyCatId: category.dummyCatId,
        name: category.name,
        imageUrls: updatedImageUrls,
        videoUrls: updatedVideoUrls,
      };

      // Push updated category to updatedCategories array
      updatedCategories.push(updatedCategory);
    }

    // Call the API to update the project with the updated categories
    const updatedData = await ApiCaller.updateExistingProject({
      projectId: existingProjectData.projectId,
      dummyId: existingProjectData.dummyId,
      title: existingProjectData.title,
      description: existingProjectData.description,
      categories: updatedCategories,
      thumbnail: existingProjectData.thumbnail,
    });

    console.log("Uploaded data: ", updatedData.data);
    if (updatedData.data && updatedData.success) {
      return Promise.resolve("sucess");
    } else {
      return Promise.reject("error");
    }
  } catch (error) {
    console.error("Error during handleEditChanges:", error);
    return Promise.reject(error);
  }
};

export {
  AddCategory,
  updateCategoryName,
  removeCategory,
  handleDeleteImageFromForm,
  handleEditChanges,
};
