import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const BlogContext = createContext([]);

export const BlogContextProvider = ({ children }) => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    axios
      .get("/api/blogs")
      .then((response) => {
        const data = response.data;
        setBlogs(data.data);
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <BlogContext.Provider value={{ blogs, setBlogs }}>
      {children}
    </BlogContext.Provider>
  );
};
