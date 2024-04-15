import mongoose from "mongoose";

let Project;

try {
  // Attempt to fetch the existing model if it exists
  Project = mongoose.model("Project");
} catch (error) {
  // If the model doesn't exist, define it
  const projectSchema = new mongoose.Schema({
    dummyId: String,
    title: String,
    thumbnail: String,
    description: String,
    categories: [
      {
        dummyCatId: String,
        name: String,
        imageUrls: [String], // Array of cloudinary image URLs for this category
        videoUrls: [String], //Array of YouTube video links
      },
    ],
  });

  Project = mongoose.model("Project", projectSchema);
}

export default Project;
