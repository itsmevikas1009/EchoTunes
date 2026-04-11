import multer from "multer";

const FIFTEEN_MB = 15 * 1024 * 1024;

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
    const mediaType = req.body?.mediaType;
    const isImage = file.mimetype.startsWith("image/");
    const isAudio = file.mimetype.startsWith("audio/") || file.mimetype.startsWith("video/");

    if (!mediaType) {
        if (isImage || isAudio) {
            cb(null, true);
            return;
        }
    }

    if (mediaType === "image" && isImage) {
        cb(null, true);
        return;
    }

    if (mediaType === "audio" && isAudio) {
        cb(null, true);
        return;
    }

    cb(new multer.MulterError("LIMIT_UNEXPECTED_FILE", "file"));
};

export const uploadMedia = multer({
    storage,
    limits: {
        fileSize: FIFTEEN_MB,
    },
    fileFilter,
}).single("file");

export const handleUploadMulterError = (error, req, res, next) => {
    if (!error) {
        next();
        return;
    }

    if (error instanceof multer.MulterError) {
        if (error.code === "LIMIT_FILE_SIZE") {
            return res.status(413).json({
                success: false,
                message: "File is too large. Keep images under 5MB and audio under 15MB.",
            });
        }

        return res.status(400).json({
            success: false,
            message: "Invalid upload. Use an image for cover art or an audio file for songs.",
        });
    }

    next(error);
};
