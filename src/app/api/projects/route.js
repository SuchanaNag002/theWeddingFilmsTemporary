import connectMongoDB from "@/libs/mongodb";
import Project from "@/models/ProjectModel";
import { NextResponse } from "next/server";

//creates new project or updates existing project
export async function POST(request) {
  try {
    // Destructure data from the JSON payload
    const { projectId, dummyId, title, description, categories, thumbnail } =
      await request.json();
    await connectMongoDB();
    const existingProject = await Project.findById(projectId);
    if (existingProject) {
      // Update the existing project with new data
      //console.log("existing Project: ", existingProject);
      const updatedProject = await Project.findOneAndUpdate(
        { _id: projectId }, // Query to find the existing project
        {
          dummyId: dummyId,
          title: title,
          description: description,
          categories: categories,
          thumbnail: thumbnail,
        }, // Fields to update
        { new: true } // Return the modified document
      );
      //console.log("updated Project in function: ", updatedProject);
      // Return a JSON response indicating success and the updated project data
      return NextResponse.json({
        success: true,
        data: updatedProject,
        message: `Existing Project with new title "${title}" updated`,
      });
    }
    // If no existing project is found, create a new project
    const newProject = new Project({
      dummyId,
      title,
      thumbnail,
      description,
      categories,
    });
    // Save the new project to the database
    const savedProject = await newProject.save();
    //console.log(savedProject);
    return NextResponse.json({
      success: true,
      data: savedProject,
      replace: false,
      message: "New Project Added Successfully! ",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      success: false,
      data: null,
      message:
        "Server Error! Check Network or Uploaded Files, Cloudinary Account, or Contact Developer.",
    });
  }
}

//gets all the projects
export async function GET(request) {
  try {
    await connectMongoDB();
    const projects = await Project.find();
    return NextResponse.json({ success: true, data: projects });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, data: [] });
  }
}
