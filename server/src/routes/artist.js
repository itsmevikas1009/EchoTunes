import express from "express";
import { addArtist, getArtist } from "../controllers/artist.controller.js";
import { adminOnly, requireCsrf } from "../middlewares/AuthMiddleware.js";

const router = express.Router();

router.post("/add", adminOnly, requireCsrf, addArtist);
router.get("/get", getArtist);

export default router
