"use client";
import { ApiCaller } from "@/ApiManager/apiCaller";
import { useEffect, useState,useContext } from "react";
import CategoryBox from "@/admin/components/CategoryBox";
import Gallery from "@/commons/Gallery";
import { TfiGallery } from "react-icons/tfi";
import Buffer from "../components/LoadingState/Buffer";
import Nav from "../components/Nav/Nav";
import { GalleryContext } from "@/context/Gallery_Context";


const GalleryPage = ({name}) => {
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(true);

  const { categories } = useContext(GalleryContext);

  useEffect(()=>{
    setLoading(true);
    if (categories && categories.length){
      for (const cat of categories) {
        console.log(cat,name)
        // Check if the category's name matches the given name
        if (cat.name === name) {
          // Return the matching category object
          setCategory(cat);
          setLoading(false);
        }
      }
    
      
    }

  },[categories]);
  
  if (loading) {
    return <Buffer />;
  }

  return (
    <div>
      <Nav />
      <div className="mt-8 flex flex-col items-center mb-8">
        <p className="text-center text-2xl mt-4 mb-4 md:text-3xl flex items-center justify-center">
          {category.name}
          <TfiGallery className="ml-2" />
        </p>
        <hr className="border-black w-full max-w-[40%] mx-auto border-t-2" />
      </div>

      
      {category? (
        <div className="my-10  w-full mx-auto">
          <Gallery
            className=" mx-auto flex items-center justify-center p-4"
            imageUrlsArray={category.imageUrls}
            videoUrlsArray={category.videoUrls}
          />
        </div>
      ) : null}
    </div>
  );
};

export default GalleryPage;
