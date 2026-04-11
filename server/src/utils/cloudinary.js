import { v2 as cloudinary } from "cloudinary";

let isConfigured = false;

const getCloudinaryConfig = () => {
    const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
    const apiKey = process.env.CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;

    if (!cloudName || !apiKey || !apiSecret) {
        throw new Error(
            "Cloudinary is not configured. Set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET."
        );
    }

    return { cloud_name: cloudName, api_key: apiKey, api_secret: apiSecret };
};

export const ensureCloudinary = () => {
    if (!isConfigured) {
        cloudinary.config(getCloudinaryConfig());
        isConfigured = true;
    }

    return cloudinary;
};

export const uploadBufferToCloudinary = ({
    buffer,
    folder,
    resourceType,
    publicId,
    originalFilename,
}) =>
    new Promise((resolve, reject) => {
        const cloudinaryClient = ensureCloudinary();

        const uploadStream = cloudinaryClient.uploader.upload_stream(
            {
                folder,
                resource_type: resourceType,
                public_id: publicId,
                use_filename: true,
                unique_filename: true,
                overwrite: false,
                filename_override: originalFilename,
            },
            (error, result) => {
                if (error) {
                    reject(error);
                    return;
                }

                resolve(result);
            }
        );

        uploadStream.end(buffer);
    });
