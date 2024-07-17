import React, { useState } from "react";
import Input from "@/commons/Input";
import { handleSubmit } from "./AddBlogFunctions"; // Adjust path as needed

const AddBlogForm = () => {
  const [formOpen, setFormOpen] = useState(true);
  const [blogName, setBlogName] = useState("");
  const [blogText, setBlogText] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  const closeFormAndReloadPage = () => {
    // Reload page after form has been closed
    setFormOpen(false);
    setTimeout(() => {
      window.location.reload();
    }, 300);
  };

  const handleSaveBlog = async () => {
    try {
      // Construct blog data to pass to handleSubmit
      const blogData = {
        name: blogName,
        description: blogText,
        thumbnail: selectedImage,
      };

      // Call handleSubmit from AddBlogFunctions.js
      await handleSubmit(blogData);

      // Optional: Handle success or navigate to a different page
      console.log("Blog saved successfully!");
      
    } catch (error) {
      console.error("Error saving blog:", error);
      // Handle error state or display error message
    }
  };

  if (formOpen) {
    return (
      <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex items-start justify-center overflow-y-auto">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-3xl w-full mt-4 mb-4 relative">
          <button
            onClick={closeFormAndReloadPage}
            className="absolute top-2 right-2 text-lg cursor-pointer focus:outline-none"
          >
            &#10006;
          </button>

          <h1 className="text-xl text-black mb-4 font-black w-full text-center">
            Blog Name: {blogName}
          </h1>
          <Input
            onChange={(e) => setBlogName(e.target.value)}
            className="p-2 w-full text-xl font-bold rounded-xl shadow-around"
            placeholder="Enter Blog Title"
            type="text"
            value={blogName}
          />

          <h1 className="text-xl text-black mt-10 mb-4 font-black w-full text-center">
            Blog Text:
          </h1>
          <textarea
            onChange={(e) => setBlogText(e.target.value)}
            className="p-2 w-full h-32 outline-none focus:border-2 border-solid border-blue-500 shadow-around
            bg-transparent rounded-xl text-xl font-bold text-slate-600"
            value={blogText}
          />

          <h1 className="text-xl text-black mt-10 mb-4 font-black w-full text-center">
            Select Blog Image:
          </h1>
          <input
            type="file"
            onChange={(e) => setSelectedImage(e.target.files[0])}
            className="p-2 w-full outline-none focus:border-2 border-solid border-blue-500 shadow-around
            bg-transparent rounded-xl text-xl font-bold text-slate-600"
          />
          <button
            onClick={handleSaveBlog}
            className="bg-blue-500 text-xl text-white mt-4 mb-2 px-4 py-2 rounded-xl mx-auto block"
          >
            Save Blog
          </button>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default AddBlogForm;
