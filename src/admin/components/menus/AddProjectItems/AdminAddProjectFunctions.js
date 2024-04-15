import { ApiCaller } from "@/ApiManager/apiCaller";
import { v4 as uuidv4 } from "uuid";
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

const generateProjectDummyId = () => {
  const length = 10;
  let result = "";

  for (let i = 0; i < length; i++) {
    const randomNumber = Math.floor(Math.random() * 36);
    const character =
      randomNumber < 10 ? randomNumber : String.fromCharCode(randomNumber + 87);
    result += character;
  }

  return result;
};

const handleSubmit = async (ProjectData) => {
  ProjectData.dummyId = uuidv4();

  // Upload thumbnail to Cloudinary
  const thumbnailFormData = new FormData();
  thumbnailFormData.append("file", ProjectData.thumbnail.file);
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
          const formData = new FormData();
          formData.append("file", media.file);
          formData.append("upload_preset", "photographer_portfolio");
          formData.append(
            "folder",
            `${ProjectData.dummyId}/${category.dummyCatId}`
          );
          const imageData = await ApiCaller.UploadToCloudinary(formData);
          return imageData.secure_url;
        })
      );

      // Extract video URLs
      const videoUrls = category.unsavedVideoUrls.map((media) => media.src);
      console.log(category.dummyCatId);
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

  console.log("Uploaded data to databse: ", data);
};

export {
  handleAddCategory,
  deleteUnsavedMedia,
  deleteCategory,
  changeCategoryName,
  handleSubmit,
  handleAddThumbnail,
};
