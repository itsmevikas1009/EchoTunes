import express from "express";
import { uploadMediaToCloudinary } from "../controllers/upload.controller.js";
import { adminOnly, requireCsrf } from "../middlewares/AuthMiddleware.js";
import { handleUploadMulterError, uploadMedia } from "../middlewares/upload.js";

const uploadRoute = express.Router();

uploadRoute.post("/media", adminOnly, requireCsrf, (req, res, next) => {
    uploadMedia(req, res, (error) => handleUploadMulterError(error, req, res, next));
}, uploadMediaToCloudinary);

export default uploadRoute;
