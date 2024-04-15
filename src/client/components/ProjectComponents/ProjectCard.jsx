import React from "react";

const ProjectCard = ({ project }) => {
  return (
    <div className="w-52 md:w-[30rem] lg:w-[40rem] shadow-around m-2 rounded-xl overflow-hidden">
      <div className=" w-full rounded-xl">
        <img
          src={project.thumbnail}
          alt="Background"
          className="carousel-image h-full w-full object-cover"
        />
      </div>
      <div className="flex flex-col items-center justify-center my-4 gap-4">
        <h1 className="my-4 font-bold text-xl text-center">{project.title}</h1>
        <a
          href={`stories/${project._id.toString()}`}
          className="px-4 py-2 cursor-pointer text-black bg-transparent border-solid border-2 border-black hover:bg-black hover:scale-105 hover:text-white pointer-events-auto"
        >
          EXPLORE
        </a>
        <p className=" text-slate-400 p-2 text-sm">{project.description}</p>
      </div>
    </div>
  );
};

export default ProjectCard;
