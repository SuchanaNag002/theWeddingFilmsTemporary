"use client";
import React, { useState } from "react";
import AddBlogForm from "./AddBlogForm";

function AddBlog() {
  const [showForm, setShowForm] = useState(false);

  const handleClick = () => {
    setShowForm(true);
  };

  return (
    <div className="relative min-h-screen flex flex-col justify-end pb-20 sm:pb-0">
      {showForm && <AddBlogForm />}
      <button
        className="fixed bottom-16 sm:bottom-5 right-5 bg-red-500 text-white px-4 py-2 rounded-md shadow hover:bg-red-600 transition z-10"
        onClick={handleClick}
      >
        Create Blog +
      </button>
    </div>
  );
}

export default AddBlog;
