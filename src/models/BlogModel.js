import mongoose from "mongoose";

let Blog;
try {
  // Attempt to fetch the existing model if it exists
  Blog = mongoose.model("Blog");
} catch (error) {
  // If the model doesn't exist, define it
  const BlogSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  });

  Blog = mongoose.model("Blog", BlogSchema);
}

export default Blog;
