import "@/client/styles/About_Me/aboutme.css";
import Footer from "../components/common/Footer";
import Nav from "../components/Nav/Nav";
import GallerySection from "../components/home_sections/GallerySection";
import AboutMe from "../components/about_me/AboutMe";
import Experience from "../components/home_sections/Experience";
import ProjectSection from "../components/home_sections/ProjectSection";
import { MdPlayCircle } from "react-icons/md";

const HomePage = () => {
  return (
    <div className="relative min-h-screen w-screen overflow-x-hidden text-white">
      <Nav />
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
        <div className="relative z-[30] my-32">
          <h1 className="text-3xl md:text-6xl text-center my-2 p-4">
            Capturing Moments, Creating Memories
          </h1>
          <h1 className=" text-2xl md:text-4xl text-center my-2 p-4">
            A Visual Symphony of Life Through the Lens
          </h1>
        </div>
      </div>

      <div id="about_me" className="w-screen">
        <AboutMe />
      </div>

      <div id="experience" className="w-screen">
        <Experience />
      </div>

      <div id="project_section" className="w-screen">
        <ProjectSection />
      </div>

      
      <div id="gallery_section" className="w-screen">
        <GallerySection />
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
          <div className="absolute slide-in-div bg-black z-[-10] w-full h-full"></div>
          <h1 className="text-3xl md:text-6xl text-center my-2 p-4">
            Professional Videography
          </h1>
          <a
            href="/videography"
            className=" flex-center gap-2 flex-wrap text-2xl hover:text-rose-500 hover:font-semibold cursor-pointer md:text-4xl text-center my-2 p-4">
            <MdPlayCircle/>
            Explore Now
          </a>
        </div>
      </div>

    </div>
  );
};

export default HomePage;
