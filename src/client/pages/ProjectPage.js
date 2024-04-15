"use client";
import { ApiCaller } from "@/ApiManager/apiCaller";
import { useEffect, useState } from "react";
import PageHeading from "@/client/components/common/PageHeading";
import CategoryBox from "@/admin/components/CategoryBox";
import Gallery from "@/commons/Gallery";
import Buffer from "../components/LoadingState/Buffer";
import Nav from "../components/Nav/Nav";

const ProjectPage = ({ projectId }) => {
  const [project, setProject] = useState(null);
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    ApiCaller.getProjectById(projectId)
      .then((data) => {
        console.log(data);
        data = data.data;
        const newCategory = {
          name: " ALL ",
          imageUrls: [], // Empty array initially
          videoUrls: []   // Empty array initially
        };
        for (const category of data.categories) {
          newCategory.imageUrls.push(...category.imageUrls);
          newCategory.videoUrls.push(...category.videoUrls);
        }
        data.categories = [newCategory,...data.categories];
        setProject(data);
        setCurrentCategoryIndex(0);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching project:", error);
        setLoading(false);
      });
  }, [projectId]);

  if (loading) {
    return <Buffer />;
  }

  if (!project) {
    return null;
  }

  return (
    <div>
      <Nav/>
      <div className=" h-[80vh] w-screen rounded-xl">
        <img
          src={project.thumbnail}
          alt="Background"
          className="carousel-image h-full w-full object-cover"
        />
      </div>
      <PageHeading heading={project.title} description={project.description} />
      <div className="my-10 p-4 w-full flex gap-4 flex-wrap items-center justify-center">
        {project.categories.map((category, i) => (
          <CategoryBox
            index={i}
            key={i}
            name={category.name}
            currentCategoryIndex={currentCategoryIndex}
            categories={category.imageUrls}
            setter={setCurrentCategoryIndex}
          />
        ))}
      </div>
      {project &&
      currentCategoryIndex !== null &&
      project.categories[currentCategoryIndex] ? (
        <div className="my-10  w-full mx-auto">
          <Gallery
            className=" mx-auto flex items-center justify-center p-4"
            imageUrlsArray={project.categories[currentCategoryIndex].imageUrls}
            videoUrlsArray={project.categories[currentCategoryIndex].videoUrls}
          />
        </div>
      ) : null}
    </div>
  );
};

export default ProjectPage;
