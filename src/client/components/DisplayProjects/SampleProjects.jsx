import React, { useEffect, useState } from "react";
import { ApiCaller } from "@/ApiManager/apiCaller";
import Image from "next/image";
import "@/client/styles/About_Me/aboutme.css";
import Link from "next/link";

const SampleProjects = () => {
  const [topProjects, setTopProjects] = useState([]);
  const [hoveredProject, setHoveredProject] = useState(null);

  useEffect(() => {
    const fetchTopProjects = async () => {
      try {
        const projects = await ApiCaller.fetchAllProjects();
        const topThreeProjects = projects.slice(0, 3);
        setTopProjects(topThreeProjects);
      } catch (error) {
        console.error("Error fetching top projects:", error);
      }
    };

    fetchTopProjects();
  }, []);

  return (
    <div className="flex flex-wrap justify-center bg-container1">
      {topProjects.map((project) => (
        <div
          className="p-4 mt-20 w-full sm:w-1/2 md:w-1/3 lg:w-1/3 group flex flex-col items-center justify-center"
          key={project._id}
        >
          <div
            className="relative mx-auto"
            onMouseEnter={() => setHoveredProject(project._id)}
            onMouseLeave={() => setHoveredProject(null)}
          >
            <div
              className={`w-full h-60 mb-2 rounded-lg overflow-hidden relative ${
                hoveredProject === project._id ? "filter blur-sm" : ""
              }`}
              style={{ width: 300, height: 200 }}
            >
              <Image
                src={project.thumbnail}
                alt={project.title}
                layout="fill"
                objectFit="cover"
              />
            </div>

            {hoveredProject === project._id && (
              <Link href={`/projects/${project._id}`} passHref>
                <div className="absolute inset-0 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 cursor-pointer">
                  <div className="bg-black bg-opacity-50 py-2 px-4 rounded flex items-center justify-center">
                    <span className="text-center">Explore🌟</span>
                  </div>
                </div>
              </Link>
            )}
          </div>
          <h3 className="text-sm font-semibold mb-1 text-center">
            {project.title}
          </h3>
        </div>
      ))}
    </div>
  );
};

export default SampleProjects;
