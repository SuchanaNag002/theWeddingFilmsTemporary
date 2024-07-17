import { ApiCaller } from "@/ApiManager/apiCaller";
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

export const handleSubmit = async (blogData) => {
  try {
    // Upload thumbnail to Cloudinary
    const thumbnailFile = blogData.thumbnail;
    const compressedThumbnailFile = await compressImageIfNeeded(thumbnailFile);

    const thumbnailFormData = new FormData();
    thumbnailFormData.append("file", compressedThumbnailFile);
    thumbnailFormData.append("upload_preset", "photographer_portfolio");
    thumbnailFormData.append("folder", `Blog_Images`);

    const thumbnailData = await ApiCaller.UploadToCloudinary(thumbnailFormData);
    console.log("Thumbnail SRC:", thumbnailData.secure_url);

    // Add the Cloudinary secure_url to blogData before saving
    blogData.imageUrl = thumbnailData.secure_url;

    console.log("At AddBlogFunctions: ", blogData);
    // Save blog data to your API
    const savedBlog = await ApiCaller.saveBlog(blogData);
    console.log("Blog saved:", savedBlog);

    return savedBlog;
  } catch (error) {
    console.error("Error handling submit:", error);
    throw error;
  }
};

export const updateBlog = async (blogId, blogData) => {
  try {
    const updatedBlog = await ApiCaller.updateBlog(blogId, blogData);
    return updatedBlog;
  } catch (error) {
    console.error("Error updating blog:", error);
    throw error;
  }
};

export const deleteBlog = async (blogId) => {
  try {
    const deletedBlog = await ApiCaller.deleteBlog(blogId);
    return deletedBlog;
  } catch (error) {
    console.error("Error deleting blog:", error);
    throw error;
  }
};

export const getBlogById = async (blogId) => {
  try {
    const blog = await ApiCaller.getBlogById(blogId);
    return blog;
  } catch (error) {
    console.error("Error getting blog by ID:", error);
    throw error;
  }
};

export const fetchAllBlogs = async () => {
  try {
    const blogs = await ApiCaller.fetchAllBlogs();
    return blogs;
  } catch (error) {
    console.error("Error fetching all blogs:", error);
    throw error;
  }
};
