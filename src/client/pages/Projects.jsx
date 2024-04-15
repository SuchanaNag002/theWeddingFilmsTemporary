"use client";
import { ProjectContext } from "@/context/Project_Context";
import { useContext } from "react";
import ProjectCarousel from "../components/ProjectComponents/ProjectCarousel";
import PageHeading from "../components/common/PageHeading";
import ProjectCard from "../components/ProjectComponents/ProjectCard";
import Buffer from "../components/LoadingState/Buffer";

const Projects = () => {
  const { projects } = useContext(ProjectContext);

  if (!projects.length) {
    return <Buffer />;
  }
  console.log(projects);
  return (
    <div className="h-full w-full">
      <ProjectCarousel projects={projects} />
      <PageHeading
        heading={"Stories"}
        description={
          "Embark on a journey through a symphony of light, color, and emotion as you explore our meticulously curated photoshoot albums. Each image is a masterpiece, meticulously crafted to capture the essence of every moment, every glance, and every smile. From intimate portraits bathed in soft, ethereal light to grand celebrations pulsating with energy and vibrancy, our photoshoots are a testament to the artistry and passion that infuses every frame."
        }
      />
      <div className="flex flex-wrap items-center justify-center gap-2 my-10">
        {projects.map((project, i) => (
          <ProjectCard key={i} project={project} />
        ))}
      </div>
    </div>
  );
};

export default Projects;
