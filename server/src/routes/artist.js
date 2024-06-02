import express from "express";
import { addArtist, getArtist } from "../controllers/artist.controller.js";

const router = express.Router();

router.post("/add", addArtist);
router.get("/get", getArtist);

export default router