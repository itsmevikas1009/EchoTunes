import express from "express";
import { createSong, getAllSongs, getSingleSongs, searchSong } from "../controllers/songs.controller.js";
import { adminOnly } from "../middlewares/AuthMiddleware.js";


export const songRoute = express.Router();

songRoute.post("/create", adminOnly, createSong);
songRoute.get("/get", getAllSongs);
songRoute.get("/getSingle/:id", getSingleSongs);
songRoute.get("/search", searchSong);