import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null;
        // uploading file on cloudinary,
        const res = await cloudinary.uploader.upload(localFilePath, {
            public_id: "my local path",
            resource_type: "auto",
        });

        // file has been uploaded successfully:
        console.log(
            "file is uploaded on cloudinary and the response is: ",
            res.url
        );
        return res;
    } catch (error) {
        fs.unlinkSync(localFilePath); // removes the locally saved temporary file as the upload operation got failed.
        // we dont save failed file on local server. 
        return null;
    }
};

export { uploadOnCloudinary };
