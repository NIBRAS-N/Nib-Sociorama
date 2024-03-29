import {v2 as cloudinary} from "cloudinary"
import fs from "fs"
import { asyncHandler } from "./asyncHandler.js";
import { ApiError } from "./ApiError.js";

const connectCloudinary = async()=>{
    try {
         cloudinary.config({ 
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
            api_key: process.env.CLOUDINARY_API_KEY, 
            api_secret: process.env.CLOUDINARY_API_SECRET 
          });    
          console.log("cloudinary connected ")
    } catch (error) {
        console.log("error in connecting coludinary ",error)
        throw error
    }
    
    
}

connectCloudinary()

const uploadOnCloudinary = async (localFilePath) => {
    try {
        // console.log("localFilePath ", localFilePath)
        if (!localFilePath) return null

        //upload the file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
        // file has been uploaded successfull
        console.log("file is uploaded on cloudinary ", response.url);
        fs.unlinkSync(localFilePath)
        return response;

    } catch (error) {
        console.log("error in || src || utils || cloudinatu || catch", error);
        fs.unlinkSync(localFilePath) // remove the locally saved temporary file as the upload operation got failed
        return null;
    }
}

const deleteFromCLoudinary = async(id)=>{
    try {
        if(!id) {throw new ApiError(400,"Cloudinary image id not found");}
        const response = await cloudinary.uploader.destroy(id);
        return response;
    } catch (error) {
        console.log("error in || src || utils || cloudinary || delete || catch", error);
        return null;
    }
}

export {uploadOnCloudinary,deleteFromCLoudinary}