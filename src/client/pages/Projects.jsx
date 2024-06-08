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
          "Step into a world where every frame tells a story, and every moment is captured with breathtaking artistry. Our wedding videography and photography portfolio is a blend of light, color, and emotion, showcasing the best wedding photography and cinematic wedding videography in India. Each image is thoughtfully crafted to preserve the essence of your special day, from intimate, tender moments to the vibrant energy of grand celebrations. Trust our team of best wedding videographers and photographers to turn your wedding into a timeless masterpiece, filled with beauty and emotion in every shot."
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
