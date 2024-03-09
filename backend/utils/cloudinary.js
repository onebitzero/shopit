import dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';

dotenv.config({ path: 'config/config.env' });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export function uploadFile(file, folder) {
  return cloudinary.uploader.upload(file, { folder });
}

export function deleteFile(file) {
  return cloudinary.uploader.destroy(file);
}
