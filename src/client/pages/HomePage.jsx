"use client"
import "@/client/styles/home/home.css"
import Nav from "../components/Nav/Nav";
import AboutMe from "../components/home_sections/AboutMe";
import HomeGallerySection from "../components/home_sections/HomeGallerySection";
import ProjectSection from "../components/home_sections/ProjectSection";
import { MdPlayCircle } from "react-icons/md";
import { MdKeyboardArrowDown } from "react-icons/md";
import React, { useState, useEffect , useContext} from "react";
import {motion,useMotionValueEvent, useScroll } from "framer-motion";


const HomePage = () => {
  const [showNav, setShowNav] = useState(false);
  const {scrollY} = useScroll();
  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > window.innerHeight - 40) {
      setShowNav(true);
    } else {
      setShowNav(false);
    }
  });

  const handleScrollToSection = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  return (
    <div className="relative min-h-screen w-screen overflow-x-hidden text-white">
      <motion.div 
        variants={{
          hidden: {
            y: "-100%" ,
            opacity: 0},
          visible: { 
            y: 0,
            opacity: 1 },
        }}
        animate={(showNav)?"visible":"hidden"}
        transition={{duration: 0.25, ease: "easeInOut"}}
        className="fixed z-[10000] top-0 left-0"
        >
        <Nav />
      </motion.div> 
      <div className="relative h-screen w-screen flex items-end justify-center">
        <video
          autoPlay
          muted
          loop={true}
          controls={false}
          src="HomeVideo.mp4"
          alt="Background"
          className="BACKGROUND_IMAGE absolute h-full w-full object-cover"
        />
        <div className="absolute w-full min-h-40 bottom-0 left-0 bg-transparent flex-center p-2">
          <button
            className="py-2 px-4 text-2xl rounded-full text-white shadow-around"
            onClick={()=>handleScrollToSection()}
          >
            <div className="flex-center">
              <p>Scroll Down</p>
              <MdKeyboardArrowDown
                className="scroll_down_button text-6xl"
              />
            </div>
            
          </button>
        </div>
      </div>

      <div id="welcome_section" className="w-screen py-12 md:py-24">
        <AboutMe/>
      </div>

      <div id="project_section" className="w-screen">
        <ProjectSection />
      </div>

      <div id="home_gallery_section" className="w-screen py-12 md:py-24">
        <HomeGallerySection/>
      </div>

      <div className="relative h-screen w-screen flex items-end justify-center pt-16">
        <video
          autoPlay
          muted
          loop={true}
          controls={false}
          src="videography_demo.mp4"
          alt="Background"
          className="BACKGROUND_IMAGE absolute h-full w-full object-cover"
        />
        <div className="relative slide-in-container z-[30] my-32 w-full">
          <div className="absolute slide-in-div bg-secondary z-[-10] w-full h-full"></div>

          <a
            href="/videography"
            className=" flex-center gap-2 flex-wrap text-2xl hover:font-semibold cursor-pointer md:text-4xl text-center my-2 p-4">
            <MdPlayCircle/>
            Explore Now
          </a>
        </div>
      </div>

    </div>
  );
};

export default HomePage;
