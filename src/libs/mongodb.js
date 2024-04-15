import mongoose from "mongoose";

const connectMongoDB = async () => {
    try {
      await mongoose
        .connect(
          process.env.NEXT_PUBLIC_MONGODB_URL,
          {
            useNewUrlParser: true,
            useUnifiedTopology: true,
          }
        )
        .then(() => {
          console.log("DB connected");
        })
        .catch((error) => {
          console.error("Error connecting to MongoDB:", error);
        });
    } catch (error) {
      console.log(error);
    }
  };
  
  export default connectMongoDB;
  