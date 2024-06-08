"use client";
import React, { useState, useEffect , useContext} from "react";
import "./nav.css";
import Buffer from "../LoadingState/Buffer";
import { GalleryContext } from "@/context/Gallery_Context";
import { MdArrowDropDown, MdArrowDropUp, MdClose } from "react-icons/md";
import { MdMenu } from "react-icons/md";


const Nav = (props) => {

  const [navOn, setNavOn] = useState(false);
  const [showGalleries, setShowGalleries] = useState(false);
  const { categories } = useContext(GalleryContext);

  

  return (
    <div className={`fixed top-0 left-0 z-[100] w-screen min-h-[4rem] bg-secondary `}>
      
      { 
        /* 
          This is the is nav section for the desktops and larger devices 
        */
      }
      <div className="hidden md:flex items-center justify-center flex-wrap gap-3 h-full w-full text-white">
        <a
                  href="/stories"
                  className="py-2 px-4 text-base my-2  hover:font-bold  hover:scale-110 rounded-xl transition-all duration-300"
                >
                  <h1 className="">Stories</h1>
          
        </a>
        <button
                  onClick={()=>setShowGalleries((prev)=>(!prev))}
                  href="/gallery"
                  className="relative flex-center gap-3 flex-wrap py-2 px-4 text-base my-2 hover:scale-110  hover:font-bold rounded-xl transition-all duration-300"
            >
                  <h1 className="">Gallery</h1>
                  <h1 className="text-base">
                    {showGalleries ? <MdArrowDropUp /> : <MdArrowDropDown/>}
                  </h1>
                  <div className="absolute top-full left-0">
                    
                    {
                      showGalleries && (
                        <div className="p-4 bg-secondary flex-center flex-col rounded-lg">
                          {
                            categories ?
                              categories.map((cat,i)=>
                              <a
                                key={i}
                                href={`/gallery/${cat.name}`}
                                className="py-2 px-4 text-sm my-2  hover:font-bold  hover:scale-110 rounded-xl transition-all duration-300"
                              >
                                <h1 className="">{cat.name}</h1>
                              </a>
                            ) : <Buffer />
                          }
                          </div>
                    )
                  }
                  </div>
        </button>
        <a
               href="/"
               className="py-2 px-4 text-xl md:text-2xl my-2  hover:font-bold  hover:scale-110 transition-all duration-300"
             >
               <h1 className="text-white">Logo</h1>
        </a>
        <a
                href="/videography"
                className="py-2 px-4 text-base my-2  hover:font-bold  hover:scale-110 rounded-xl transition-all duration-300"
              >
                <h1 className="">Videography</h1>
        </a>
        <a
                href="/booking"
                className="py-2 px-4 text-base my-2  hover:font-bold  hover:scale-110 rounded-xl transition-all duration-300"
              >
                <h1 className="">Get A Quote</h1>
        </a>
      </div>

      { 
        /* 
          This is the is nav section for the smaller devices or mobiles 
        */
      }
      <div className=" md:hidden flex items-center justify-between px-4 py-2 h-full w-full">
        
        <a
               href="/"
               className="py-2 px-4 text-xl md:text-2xl my-2 hover:underline hover:font-bold  hover:scale-110 transition-all duration-300"
             >
               <h1 className="text-white">Logo</h1>
        </a>
        <button
              onClick={()=>{setNavOn((prev)=>(!prev))}}
              href="/"
              className="py-2 px-4 text-xl md:text-2xl my-2 hover:underline hover:font-bold  hover:scale-110 transition-all duration-300"
             >
               <h1 className="text-white"><MdMenu /></h1>
        </button>
      </div>

      <div className={` h-screen w-screen text-black absolute flex-center flex-col
              nav-screen ${(navOn?"nav-screen-on":"nav-screen-off")}
            `}>
              <a
                href="/"
                className="py-2 px-4 text-2xl my-2 hover:underline hover:font-bold  hover:scale-110 rounded-xl transition-all duration-300"
              >
                <h1 className="">Home</h1>
              </a>
              <a
                href="/stories"
                className="py-2 px-4 text-2xl my-2 hover:underline hover:font-bold  hover:scale-110 rounded-xl transition-all duration-300"
              >
                <h1 className="">Stories</h1>
              </a>
              <button
                onClick={()=>setShowGalleries((prev)=>(!prev))}
                href="/gallery"
                className="flex-center gap-3 flex-wrap py-2 px-4 text-2xl my-2 hover:scale-110 hover:underline hover:font-bold rounded-xl transition-all duration-300"
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
                      className="py-2 px-4 text-xl md:text-lg my-2 hover:underline hover:font-bold  hover:scale-110 rounded-xl transition-all duration-300"
                    >
                      <h1 className="">{cat.name}</h1>
                    </a>
                  ) : <Buffer />
                )
                  
                
              }
              <a
                href="/videography"
                className="py-2 px-4 text-2xl my-2 hover:underline hover:font-bold  hover:scale-110 rounded-xl transition-all duration-300"
              >
                <h1 className="">Videography</h1>
              </a>
              <a
                href="/booking"
                className="py-2 px-4 text-2xl my-2 hover:underline hover:font-bold  hover:scale-110 rounded-xl transition-all duration-300"
              >
                <h1 className="">Get A Quote</h1>
              </a>
      </div>

    </div>
  );
};

export default Nav;


// <a
//               href="/"
//               className="py-2 px-4 md:text-2xl my-2 hover:text-orange-500 hover:font-bold  hover:scale-110 rounded-xl transition-all duration-300"
//             >
//               <h1 className="">Home</h1>
//             </a>
//             <a
//               href="/stories"
//               className="py-2 px-4 md:text-2xl my-2 hover:text-orange-500 hover:font-bold  hover:scale-110 rounded-xl transition-all duration-300"
//             >
//               <h1 className="">Stories</h1>
//             </a>
//             <button
//               onClick={()=>setShowGalleries((prev)=>(!prev))}
//               href="/gallery"
//               className="flex-center gap-3 flex-wrap py-2 px-4 md:text-2xl my-2 hover:scale-110 hover:text-orange-500 hover:font-bold rounded-xl transition-all duration-300"
//             >
//               <h1 className="">Gallery</h1>
//               <h1 className="text-2xl">
//                 {showGalleries ? <MdArrowDropUp /> : <MdArrowDropDown/>}
//               </h1>
//             </button>
//             {
//               showGalleries && (
//                 categories ?
//                   categories.map((cat,i)=>
//                   <a
//                     key={i}
//                     href={`/gallery/${cat.name}`}
//                     className="py-2 px-4 text-base md:text-lg my-2 hover:text-orange-500 hover:font-bold  hover:scale-110 rounded-xl transition-all duration-300"
//                   >
//                     <h1 className="">{cat.name}</h1>
//                   </a>
//                 ) : <Buffer />
//               )
                
              
//             }
//             <a
//               href="/videography"
//               className="py-2 px-4 md:text-2xl my-2 hover:text-orange-500 hover:font-bold  hover:scale-110 rounded-xl transition-all duration-300"
//             >
//               <h1 className="">Videography</h1>
//             </a>
//             <a
//               href="/booking"
//               className="py-2 px-4 md:text-2xl my-2 hover:text-orange-500 hover:font-bold  hover:scale-110 rounded-xl transition-all duration-300"
//             >
//               <h1 className="">Get A Quote</h1>
//             </a>
