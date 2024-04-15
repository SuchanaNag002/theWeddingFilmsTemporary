import GalleryImage from "@/models/GalleryModel";
import { NextResponse } from "next/server";
import connectMongoDB from "@/libs/mongodb";
export async function DELETE(req, { params }) {
  try {
    await connectMongoDB();
    const { gallery_id } = params;
    const deletedMedia = await GalleryImage.findByIdAndDelete(gallery_id);
    if (!deletedMedia) {
      return NextResponse.json({
        success: false,
        message: "Media not found",
        data: null,
      });
    }
    return NextResponse.json({ success: true, data: deletedMedia });
  } catch (err) {
    console.error("Error deleting media:", err);
    return NextResponse.json({ success: false, data: null });
  }
}
