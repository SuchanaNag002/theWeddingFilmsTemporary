import Blog from "@/models/BlogModel";
import { connectDB } from "@/libs/mongodb";
import { NextResponse } from "next/server";

// Create a new blog post
export async function POST(request) {
  try {
    await connectDB();
    const { name, text, imageUrl } = await request.json();
    const date = new Date();

    const newBlog = new Blog({
      name,
      text,
      imageUrl,
      date,
    });

    const savedBlog = await newBlog.save();

    return NextResponse.json({
      success: true,
      data: savedBlog,
      message: "Blog Created Successfully",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json({
      success: false,
      data: null,
      message: `Error: ${error.message}`,
    });
  }
}

// Get all blog posts
export async function GET(request) {
  try {
    await connectDB();
    const blogs = await Blog.find();

    return NextResponse.json({
      success: true,
      data: blogs,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json({
      success: false,
      data: [],
      message: `Error: ${error.message}`,
    });
  }
}
