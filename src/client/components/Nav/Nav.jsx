"use client";
import React, { useState, useEffect , useContext} from "react";
import "./nav.css";
import { AiOutlineMenu } from "react-icons/ai";
import { useRouter } from "next/navigation";
import Buffer from "../LoadingState/Buffer";
import { GalleryContext } from "@/context/Gallery_Context";
import { MdArrowDropDown, MdArrowDropUp, MdClose } from "react-icons/md";

const Nav = (props) => {
  const router = useRouter();
  const [navOn, setNavOn] = useState(false);
  const [showGalleries, setShowGalleries] = useState(false);
  
  const { categories } = useContext(GalleryContext);

  

  return (
    <div className="fixed top-0 left-0 z-[100] bg-transparent">
      <div
        className={`min-h-12 w-screen flex items-center justify-between bg-transparent px-4 md:px-8 z-[200] ${
         (navOn ? "text-white" : "text-black")
        }`}
      >
        <a href="/admin"><h1 className="nav-logo z-[100] text-rose-500 text-2xl font-bold">ANSHU</h1></a>
        <div
          className="nav-menu-button z-[100] cursor-pointer m-6"
          onClick={() => setNavOn((prev) => !prev)}
        >
          <div
            className={
              "m-2 p-4 rounded-full text-xl shadow-around " +
              (navOn ? " text-black bg-white" : " gradient-primary")
            }
          >
            {(navOn ? <MdClose/> : <AiOutlineMenu /> )}
          </div>
        </div>
      </div>
      <div
        className={
          "absolute z-[90] top-0 right-0 nav-screen bg-black text-white " +
          (navOn ? "nav-screen-on" : "nav-screen-off")
        }
      >
        <div className="relative z-[100] m-8 h-full w-full flex items-center justify-center">
          <div className="flex flex-col items-center justify-between h-8/12 w-full">
            <a
              href="/"
              className="py-2 px-4 md:text-2xl my-2 hover:text-orange-500 hover:font-bold  hover:scale-110 rounded-xl transition-all duration-300"
            >
              <h1 className="">Home</h1>
            </a>
            <a
              href="/stories"
              className="py-2 px-4 md:text-2xl my-2 hover:text-orange-500 hover:font-bold  hover:scale-110 rounded-xl transition-all duration-300"
            >
              <h1 className="">Stories</h1>
            </a>
            <button
              onClick={()=>setShowGalleries((prev)=>(!prev))}
              href="/gallery"
              className="flex-center gap-3 flex-wrap py-2 px-4 md:text-2xl my-2 hover:scale-110 hover:text-orange-500 hover:font-bold rounded-xl transition-all duration-300"
            >
              <h1 className="">Gallery</h1>
              <h1 className="text-2xl">
                {showGalleries ? <MdArrowDropUp /> : <MdArrowDropDown/>}
              </h1>
            </button>
            {
              showGalleries && (
                categories ?
                  categories.map((cat,i)=>
                  <a
                    key={i}
                    href={`/gallery/${cat.name}`}
                    className="py-2 px-4 text-base md:text-lg my-2 hover:text-orange-500 hover:font-bold  hover:scale-110 rounded-xl transition-all duration-300"
                  >
                    <h1 className="">{cat.name}</h1>
                  </a>
                ) : <Buffer />
              )
                
              
            }
            <a
              href="/videography"
              className="py-2 px-4 md:text-2xl my-2 hover:text-orange-500 hover:font-bold  hover:scale-110 rounded-xl transition-all duration-300"
            >
              <h1 className="">Videography</h1>
            </a>
            <a
              href="/booking"
              className="py-2 px-4 md:text-2xl my-2 hover:text-orange-500 hover:font-bold  hover:scale-110 rounded-xl transition-all duration-300"
            >
              <h1 className="">Get A Quote</h1>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nav;
