"use client"
import Image from "next/image"
import { useContext } from "react";
import { GalleryContext } from "@/context/Gallery_Context";
import Buffer from "../LoadingState/Buffer";



const GallerySection = () => {

  const { categories } = useContext(GalleryContext);

  
  return (
    <div className=' py-24 grid grid-cols-1 grid-rows-2 md:grid-cols-2 md:grid-rows-1 bg-black text-white min-h-[60vh] w-screen overflow-hidden'>
      <div className="flex-center flex-col gap-6 w-full h-full py-8 px-10">
            <h1 className="text-5xl text-center my-2 ">
              My Gallery
            </h1>
            <div className="my-8 flex-center flex-wrap gap-6">
              {
                (categories) ?
                categories.map((cat, i) => (
                  <div key={i} className="px-4 py-2 md:px-6 md:py-3 md:text-lg rounded-full border-solid border-2 border-white text-white hover:text-rose-500 hover:border-rose-500">
                    <a
                      className=""
                      href={`/gallery/${cat.name}`}
                    >
                      <h1>{cat.name}</h1>
                    </a>
                  </div>
                ))
                :
                <Buffer />
              }
            </div>
        </div>
        <div className="flex-center h-full w-full">
            <div className=" relative rotate-12">
                <Image 
                className=" hover:rotate-12 transition-all -rotate-12 ease-linear duration-200"
                src="/indian_bride.jpg"
                height={400}
                width={250}
                />
                <div className="absolute -rotate-12 transition-all ease-linear duration-200 h-full w-[150%] blur-3xl bg-rose-500 top-0 -left-1/4 -z-10"></div>
            </div>
        </div>
    </div>
  )
}

export default GallerySection