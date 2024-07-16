import { ApiCaller } from "@/ApiManager/apiCaller";
import { v4 as uuidv4 } from "uuid";
import Compressor from "compressorjs";

const MAX_FILE_SIZE_MB = 9; // Maximum file size in MB to trigger compression

const compressImageIfNeeded = async (file) => {
  if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
    return new Promise((resolve, reject) => {
      new Compressor(file, {
        quality: 0.8, 
        maxWidth: 1920, 
        maxHeight: 1080, 
        success(result) {
          resolve(result);
        },
        error(error) {
          reject(error);
        },
      });
    });
  } else {
    return file;
  }
};
//ADD PROJECT functions
const handleAddThumbnail = (acceptedfiles, setter) => {
  setter({
    file: acceptedfiles[0],
    src: URL.createObjectURL(acceptedfiles[0]),
  });
};

const handleAddCategory = (
  categories,
  setCategories,
  setCurrentCategoryIndex
) => {
  setCategories((prev) => [
    {
      name: `New Category`,
      dummyCatId: uuidv4(),
      unsavedImageUrls: [],
      unsavedVideoUrls: [],
    },
    ...prev,
  ]);
  setCurrentCategoryIndex(categories.length);
};

const changeCategoryName = (setCategories, catIndex, value) => {
  setCategories((prev) => {
    const updatedCategories = [...prev];
    updatedCategories[catIndex].name = value;
    return updatedCategories;
  });
};
//deletes picture(s) that have not been saved from a category
const deleteUnsavedMedia = (setCategories, catIndex, media) => {
  setCategories((prevCategories) => {
    return prevCategories.map((category, index) => {
      if (index === catIndex) {
        const updatedCategory = { ...category };
        console.log("Media being passed in delete function: ", media);
        const mediaTag = media.tag;

        if (mediaTag === "unsavedImage") {
          const imageIndex = updatedCategory.unsavedImageUrls.findIndex(
            (item) => item.src === media.src
          );
          if (imageIndex !== -1) {
            updatedCategory.unsavedImageUrls.splice(imageIndex, 1);
          }
        } else if (mediaTag === "unsavedVideo") {
          const videoIndex = updatedCategory.unsavedVideoUrls.findIndex(
            (item) => item.src === media.src
          );
          if (videoIndex !== -1) {
            updatedCategory.unsavedVideoUrls.splice(videoIndex, 1);
          }
        }

        return updatedCategory;
      }
      return category;
    });
  });
};

const deleteCategory = (setCategories, catIndex) => {
  setCategories((prev) => {
    const updatedCategories = [...prev];
    updatedCategories.splice(catIndex, 1);
    return updatedCategories;
  });
};

const handleSubmit = async (ProjectData) => {
  ProjectData.dummyId = uuidv4();

  console.log(ProjectData);

  // Upload thumbnail to Cloudinary
  const thumbnailFile = ProjectData.thumbnail.file;
  const compressedThumbnailFile = await compressImageIfNeeded(thumbnailFile);
  const thumbnailFormData = new FormData();
  thumbnailFormData.append("file", compressedThumbnailFile);
  thumbnailFormData.append("upload_preset", "photographer_portfolio");
  thumbnailFormData.append("folder", `${ProjectData.dummyId}/thumbnail`);
  const thumbnailData = await ApiCaller.UploadToCloudinary(thumbnailFormData);
  console.log("thumbnail SRC:", thumbnailData.secure_url);

  // Process categories data
  const categoriesData = await Promise.all(
    ProjectData.categories.map(async (category, catIndex) => {
      // Process image URLs
      const imageUrls = await Promise.all(
        category.unsavedImageUrls.map(async (media) => {
          const file = media.file;
          const compressedFile = await compressImageIfNeeded(file);
          const formData = new FormData();
          formData.append("file", compressedFile);
          formData.append("upload_preset", "photographer_portfolio");
          formData.append(
            "folder",
            `${ProjectData.dummyId}/${category.dummyCatId}`
          );
          const imageUrl = await ApiCaller.UploadToCloudinary(formData);
          return imageUrl.secure_url;
        })
      );

      // Extract video URLs
      const videoUrls = category.unsavedVideoUrls.map((media) => media.src);
      return {
        dummyCatId: category.dummyCatId,
        name: category.name,
        imageUrls,
        videoUrls,
      };
    })
  );

  // Upload data to database
  const data = await ApiCaller.uploadToDatabase({
    dummyId: ProjectData.dummyId,
    title: ProjectData.title,
    thumbnail: thumbnailData.secure_url,
    description: ProjectData.description,
    categories: categoriesData,
  });

  console.log("Uploaded data to database: ", data);
};

export {
  handleAddCategory,
  deleteUnsavedMedia,
  deleteCategory,
  changeCategoryName,
  handleSubmit,
  handleAddThumbnail,
};
