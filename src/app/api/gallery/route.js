import GalleryImage from "@/models/GalleryModel";
import { NextResponse } from "next/server";
import connectMongoDB from "@/libs/mongodb";

export async function POST(req) {
  try {
    await connectMongoDB();
    const mediaData = await req.json();
    //console.log(mediaData);
    if (mediaData.categoryId) {
      const updatedMedia = await GalleryImage.findOneAndUpdate(
        { _id: mediaData.categoryId },
        {
          dummyId: mediaData.dummyId,
          name: mediaData.name,
          imageUrls: mediaData.imageUrls,
          videoUrls: mediaData.videoUrls,
        },
        { new: true }
      );
      return NextResponse.json({ success: true, data: updatedMedia });
    } else {
      const newMedia = new GalleryImage(mediaData);
      const savedMedia = await newMedia.save();
      return NextResponse.json({ success: true, data: savedMedia });
    }
    //console.log(savedMedia);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, data: null });
  }
}

export async function GET(req) {
  try {
    await connectMongoDB();
    const media = await GalleryImage.find();
    //console.log(media);
    return NextResponse.json({ success: true, data: media });
  } catch (err) {
    console.error("Error fetching media:", err);
    return NextResponse.json({ success: false, data: null });
  }
}

