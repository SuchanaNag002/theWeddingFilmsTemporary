"use client"
import React, { useState } from "react";
import AddBlogForm from "./AddBlogForm";

function AddBlog() {
  const [showForm, setShowForm] = useState(false);

  const handleClick = () => {
    setShowForm(true);
  };

  return (
    <div className="">
      {showForm && <AddBlogForm />}
      <button
        className="absolute bottom-5 right-5 bg-red-500 text-white px-4 py-2 rounded-md shadow hover:bg-red-600 transition"
        onClick={handleClick}
      >
        Create Blog +
      </button>
    </div>
  );
}

export default AddBlog;
