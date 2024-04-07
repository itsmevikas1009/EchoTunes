import express from "express";
import { createSong } from "../controllers/songs.controller.js";
import { adminOnly } from "../middlewares/AuthMiddleware.js";


export const songRoute = express.Router();

songRoute.post("/create", adminOnly, createSong);