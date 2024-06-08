"use client"
import Image from "next/image";
import { useState } from "react";
import { MdKeyboardArrowLeft , MdKeyboardArrowRight } from "react-icons/md"

const ProjectSection = () => {
  const maxImageNumber = 6; // max number of images -> check public/homeStoryImages
  const [imageNumber,setImageNumber] = useState(1); //select image number from 1 to n

  const handlePrevClick = () => {
    setImageNumber((prev) => (prev === 0 ? maxImageNumber - 1 : prev - 1));
  };

  const handleNextClick = () => {
    setImageNumber((prev) => (prev + 1) % maxImageNumber);
  };
  
  return (
    <div className=' py-12 md:py-24 flex-center flex-col md:grid md:grid-cols-2 md:grid-rows-1 bg-[#e3e3e3] text-black min-h-[60vh] w-screen overflow-hidden'>
      <div className="flex-center min-h-full min-w-full py-10 md:py-20">
        <div className="relative">
          <a href="/stories">
            <Image 
              alt={`home_story_${imageNumber+1}`}
              src={`/homeStoryImages/home_story_${imageNumber+1}.jpeg`}
              width={500}
              height={"350"}
            />
          </a>
          
          <div className="absolute h-full w-full top-0 left-0 flex items-center justify-between p-4 pointer-events-none">
            <button
              onClick={handlePrevClick}
              className="text-5xl text-gray-100 hover:text-slate-500 hover:scale-105 active:scale-95 font-bold pointer-events-auto"
            >
              <MdKeyboardArrowLeft />
            </button>
            <button
              onClick={handleNextClick}
              className="text-5xl text-gray-100 hover:text-slate-500 hover:scale-105 active:scale-95 font-bold pointer-events-auto"
            >
              <MdKeyboardArrowRight />
            </button>
          </div>
        </div>
      </div>
      <div className="flex-center flex-col gap-6 w-full h-full py-8 px-10">
            <h1 className="text-4xl text-center md:text-left my-2 ">
              Captured Dreams: A Journey Through My Lens 
            </h1>
            <p className=" text-lg text-center md:text-left">
              Step into our gallery, a treasure trove of moments imbued with love and the enchantment of weddings. Here, tender glances convey heartfelt vows, vivid blooms burst into a symphony of colors, and joyous laughter echoes like the sweet melody of a love song. Immerse yourself in the cascade of emotions that define each unique wedding celebration. Let our artistry sweep you away into a world where every frame tells a story of love, joy, and timeless beauty.

            </p>
            <a
                className="px-6 py-4 md:self-start rounded-xl bg-white hover:bg-gray-400 hover:text-white text-black font-bold shadow-xl hover:scale-105"
                href="/stories"
            >
                My Stories
            </a>
      </div>
    </div>
  )
}

export default ProjectSection