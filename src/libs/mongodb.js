import mongoose from "mongoose";

const connectImagesDB = async () => {
  try {
    await mongoose
      .connect(process.env.NEXT_PUBLIC_MONGODB_URL_IMAGES, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log("Images DB connected");
      })
      .catch((error) => {
        console.error("Error connecting to Images MongoDB:", error);
      });
  } catch (error) {
    console.log(error);
  }
};

const connectBlogsDB = async () => {
  try {
    await mongoose
      .connect(process.env.NEXT_PUBLIC_MONGODB_URL_TEXT, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log("Blogs DB connected");
      })
      .catch((error) => {
        console.error("Error connecting to Blogs MongoDB:", error);
      });
  } catch (error) {
    console.log(error);
  }
};

export { connectImagesDB, connectBlogsDB };
