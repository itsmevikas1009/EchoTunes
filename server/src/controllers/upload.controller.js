import { uploadBufferToCloudinary } from "../utils/cloudinary.js";

const sanitizeString = (value) => (typeof value === "string" ? value.trim() : "");

const getUploadConfig = (mediaType) => {
    if (mediaType === "image") {
        return {
            folder: "echotunes/images",
            resourceType: "image",
        };
    }

    if (mediaType === "audio") {
        return {
            folder: "echotunes/audio",
            resourceType: "video",
        };
    }

    return null;
};

export const uploadMediaToCloudinary = async (req, res) => {
    const mediaType = sanitizeString(req.body?.mediaType);
    const file = req.file;

    if (!file) {
        return res.status(400).json({
            success: false,
            message: "No file received for upload.",
        });
    }

    const uploadConfig = getUploadConfig(mediaType);

    if (!uploadConfig) {
        return res.status(400).json({
            success: false,
            message: "mediaType must be either image or audio.",
        });
    }

    try {
        const result = await uploadBufferToCloudinary({
            buffer: file.buffer,
            folder: uploadConfig.folder,
            resourceType: uploadConfig.resourceType,
            originalFilename: file.originalname,
        });

        return res.status(200).json({
            success: true,
            message: "Upload completed successfully.",
            data: {
                url: result.secure_url,
                publicId: result.public_id,
                resourceType: result.resource_type,
                bytes: result.bytes,
                format: result.format,
                duration: result.duration ?? null,
            },
        });
    } catch (error) {
        console.log("Cloudinary upload error", error);
        return res.status(500).json({
            success: false,
            message: "Upload failed. Please try again after checking Cloudinary configuration.",
        });
    }
};
