import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

// Load env vars specifically for this file to handle import hoisting
dotenv.config();

// Debugging: Check if keys are loaded (Remove this after fixing)
if (!process.env.CLOUDINARY_API_KEY) {
  console.error("❌ Cloudinary API Key is missing! Check your .env file.");
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary;
