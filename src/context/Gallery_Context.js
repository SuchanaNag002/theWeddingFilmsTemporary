"use client"
import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const GalleryContext = createContext([]);

export const GalleryContextProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get("/api/gallery")
      .then((response) => {
        const data = response.data;
        setCategories(data.data); // Assuming the data is an array of projects
        //console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <GalleryContext.Provider value={{categories,setCategories}}>
      {children}
    </GalleryContext.Provider>
  );
};