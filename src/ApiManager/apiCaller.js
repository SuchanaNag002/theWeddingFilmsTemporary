"use client";
import axios from "axios";
import crypto from "crypto";

const generateSHA1 = (data) => {
  const hash = crypto.createHash("sha1");
  hash.update(data);
  return hash.digest("hex");
};

const generateSignature = (publicId, apiSecret, timestamp) => {
  return generateSHA1(
    `public_id=${publicId}&timestamp=${timestamp}${apiSecret}`
  );
};

export class ApiCaller {
  static async UploadToCloudinary(mediaData) {
    try {
      const response = await axios.post(
        process.env.NEXT_PUBLIC_CLOUDINARY_URL,
        mediaData
      );
      //console.log(response);
      if (response.status === 200) {
        console.log("Image inserted: ", response.data);
        return response.data;
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error uploading to Cloudinary:", error);
      return null;
    }
  }
  static async deleteImageFromCloudinary(imageUrl) {
    try {
      const publicId = imageUrl.split("/").slice(-3).join("/").split(".")[0];

      if (!publicId) {
        console.error(
          "Error: Could not extract public ID from the provided URL."
        );
        return;
      }
      console.log("Public id of image deleted: ", publicId);
      const timestamp = new Date().getTime();
      const signature = generateSignature(
        publicId,
        process.env.NEXT_PUBLIC_API_SECRET,
        timestamp
      );
      const response = await axios.post(
        process.env.NEXT_PUBLIC_CLOUDINARY_DELETE_URL,
        {
          public_id: publicId,
          signature: signature,
          api_key: process.env.NEXT_PUBLIC_API_KEY,
          timestamp: timestamp,
        }
      );

      console.log(response.data);
    } catch (error) {
      console.error("Error deleting asset from Cloudinary:", error);
      throw error;
    }
  }

  static async uploadToDatabase(projectData) {
    console.log(projectData);
    try {
      const response = await axios.post("/api/projects", projectData);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Error uploading to database:", error);
    }
  }
  static async updateExistingProject(projectData) {
    try {
      const response = await axios.post("/api/projects", projectData);
      //console.log(response);
      if (response.data.success) {
        return response.data;
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error updating project:", error);
      return null;
    }
  }
  static async getProjectById(id) {
    try {
      const response = await axios.get("/api/projects/" + id);
      console.log(response.data);
      return response.data.success ? response.data : null;
    } catch (error) {
      console.error("Error getting project by ID:", error);
      return null;
    }
  }
  static async deleteProjectById(id) {
    try {
      const response = await axios.delete("/api/projects/" + id);
      console.log(response.data);
      return response.data.success ? response.data : null;
    } catch (error) {
      console.error("Error deleting project by ID:", error);
      return null;
    }
  }

  static async postGalleryMedia(mediaData) {
    try {
      //console.log("Media sent: ", mediaData);
      const response = await axios.post("/api/gallery", mediaData);
      //console.log("Media received: ", response.data);
      return response.data;
    } catch (error) {
      console.error("Error posting gallery media:", error);
      return null;
    }
  }
  static async deleteGalleryMediaById(id) {
    try {
      const response = await axios.delete("/api/gallery/" + id);
      return response.data;
    } catch (error) {
      console.error("Error deleting media by ID:", error);
      return null;
    }
  }

  static async getGalleryMedia(mediaData) {
    try {
      const response = await axios.get("/api/gallery", mediaData);
      return response.data.success ? response.data.data : [];
    } catch (error) {
      console.error("Error getting gallery media:", error);
      return [];
    }
  }

  static async getAllGalleryMedia() {
    try {
      const response = await axios.get("/api/gallery");
      return response.data.success ? response.data.data : [];
    } catch (error) {
      console.error("Error getting all tha gallery media images: ", error);
      return [];
    }
  }

  static async SendEmail(data) {
    try {
      const response = await axios.post("/api/Booking", data);
      return response.data.success;
    } catch (error) {
      console.error("Error sending email:", error);
      return false;
    }
  }

  static async fetchAllProjects() {
    try {
      const response = await axios.get("/api/projects");
      // console.log(response.data);
      return response.data.success ? response.data.data : [];
    } catch (error) {
      console.error("Error fetching projects:", error);
      return [];
    }
  }
}
