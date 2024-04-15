import { MdArrowBackIos } from "react-icons/md";
import { MdArrowForwardIos } from "react-icons/md";
import { useEffect, useState } from "react";
import "@/client/styles/projects_page.css";

const ProjectCarousel = ({ projects }) => {
  const [curr, setCurr] = useState(0);
  const prev = () => {
    setCurr((curr) => (curr === 0 ? projects.length - 1 : curr - 1));
  };
  const next = () => {
    setCurr((curr) => (curr === projects.length - 1 ? 0 : curr + 1));
  };
  useEffect(() => {
    const intervalId = setInterval(() => {
      // Automatically move to the next project after 5 seconds
      setCurr((curr) => (curr === projects.length - 1 ? 0 : curr + 1));
    }, 5000);
    return () => clearInterval(intervalId);
  }, [curr, projects]);

  return (
    <div className="flex h-[80vh] w-screen overflow-hidden relative bg-black">
      {projects.map((project) => (
        <div
          className="
                        carousel-image-wrapper
                        h-full min-w-[100vw]
                        max-w-[100vw] w-[100vw] overflow-hidden
                        transition-transform ease-out duration-500"
          style={{
            transform: `translateX(-${curr * 100}%)`,
          }}
        >
          <img
            src={project.thumbnail}
            alt="Background"
            className="carousel-image absolute h-full w-full object-cover z-[0]"
          />
          <div
            className=" carousel-content z-[10] absolute top-0 left-0 h-full w-full 
                            overflow-hidden pointer-events-none p-6"
          >
            <div className="flex flex-col items-center justify-center h-full w-full gap-6">
              <h1 className="text-3xl sm:text-4xl md:text-6xl text-white font-bold text-center">
                {project.title}
              </h1>
              <a
                href={`projects/${project._id.toString()}`}
                className="px-6 py-4 cursor-pointer text-white text-bold bg-transparent border-solid border-2 border-white hover:bg-white hover:text-black pointer-events-auto"
              >
                EXPLORE
              </a>
            </div>
          </div>
        </div>
      ))}
      <div className="z-20 text-4xl absolute inset-0 text-white flex items-center justify-between p-4 pointer-events-none">
        <button className=" pointer-events-auto" onClick={prev}>
          <MdArrowBackIos />
        </button>
        <button className=" pointer-events-auto" onClick={next}>
          <MdArrowForwardIos />
        </button>
      </div>
      <div className="absolute z-[10] bottom-4 right-0 left-0 flex items-center justify-center gap-4">
        {projects.map((_, i) => (
          <div
            className={`transition-all w-3 h-3 bg-white \
                    rounded-full ${curr == i ? "p-1" : " bg-opacity-50"}`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default ProjectCarousel;
