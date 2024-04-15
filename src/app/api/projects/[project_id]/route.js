import Project from "@/models/ProjectModel";
import connectMongoDB from "@/libs/mongodb";
import { NextResponse } from "next/server";

//finds a project using its id
export async function GET(request, {params}){
    try {
        const { project_id } = params;
        await connectMongoDB();
        const project = await Project.findById(project_id);
        //console.log(project);
        if (project === null) {
          return NextResponse.json({success:false, data: null , message: "Project Does Not Exist"});
        }
    
        return NextResponse.json({success: true, data: project});
    } catch (error) {
        console.error(error); 
        return NextResponse.error({success: false, data: null , message: "Error: " + error.message});
    }
}

// Delete a project using its id
export async function DELETE(request, { params }) {
    try {
      const { project_id } = params;
      await connectMongoDB();
      const deletedProject = await Project.findByIdAndDelete(project_id);
  
      if (!deletedProject) {
        return NextResponse.json({ success: false, data: null, message: "Project Not Found" });
      }
  
      return NextResponse.json({ success: true, data: deletedProject, message: "Project Deleted Successfully" });
    } catch (error) {
      console.error(error);
      return NextResponse.error({ success: false, data: null, message: "Error: " + error.message });
    }
  }