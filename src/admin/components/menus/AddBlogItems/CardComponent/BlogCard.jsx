import React, { useContext } from "react";
import { BlogContext } from "@/context/Blog_Context";

const BlogCard = ({ blog, onDelete, onEdit }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4">
      {blog.thumbnail && (
        <img
          src={blog.thumbnail}
          alt={blog.name}
          className="w-full h-48 object-cover rounded-t-lg"
        />
      )}
      <div className="p-4">
        <h2 className="text-xl font-bold mb-2">{blog.name}</h2>
        <p className="text-gray-700">{blog.text}</p>
        <div className="flex justify-between mt-4">
          <button
            onClick={() => onEdit(blog)}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(blog._id)}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

const BlogList = () => {
  const { blogs } = useContext(BlogContext);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/blogs/${id}`); // Adjust the URL as needed
      // Update state after deletion
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  const handleEdit = (blog) => {
    // Handle edit logic here
  };

  return (
    <div className="container mx-auto p-4">
      {blogs.map((blog) => (
        <BlogCard
          key={blog._id}
          blog={blog}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      ))}
    </div>
  );
};

export default BlogList;
