import Blog from "@/models/BlogModel";
import { connectDB } from "@/libs/mongodb";
import { NextResponse } from "next/server";

// Get a blog post by ID
export async function GET(request, { params }) {
  try {
    await connectDB(); // Ensure database connection
    const { blog_id } = params;
    const blog = await Blog.findById(blog_id);

    if (!blog) {
      return NextResponse.json({
        success: false,
        data: null,
        message: "Blog Not Found",
      });
    }

    return NextResponse.json({
      success: true,
      data: blog,
      message: "Blog Found Successfully",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.error({
      success: false,
      data: null,
      message: "Error: " + error.message,
    });
  }
}

// Update a blog post by ID
export async function PUT(request, { params }) {
  try {
    await connectDB(); // Ensure database connection
    const { blog_id } = params;
    const { name, text, imageUrl, date } = request.json();
    const updatedBlog = await Blog.findByIdAndUpdate(
      blog_id,
      {
        name,
        text,
        imageUrl,
        date,
      },
      { new: true }
    );

    if (!updatedBlog) {
      return NextResponse.json({
        success: false,
        data: null,
        message: "Blog Not Found",
      });
    }

    return NextResponse.json({
      success: true,
      data: updatedBlog,
      message: "Blog Updated Successfully",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.error({
      success: false,
      data: null,
      message: "Error: " + error.message,
    });
  }
}

// Delete a blog post by ID
export async function DELETE(request, { params }) {
  try {
    await connectDB(); // Ensure database connection
    const { blog_id } = params;
    const deletedBlog = await Blog.findByIdAndDelete(blog_id);

    if (!deletedBlog) {
      return NextResponse.json({
        success: false,
        data: null,
        message: "Blog Not Found",
      });
    }

    return NextResponse.json({
      success: true,
      data: deletedBlog,
      message: "Blog Deleted Successfully",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.error({
      success: false,
      data: null,
      message: "Error: " + error.message,
    });
  }
}
