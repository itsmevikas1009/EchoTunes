import express from "express";
import { createSong, deleteSong, getAllSongs, getSingleSongs, getSongsByArtistName, searchSong } from "../controllers/songs.controller.js";
import { adminOnly } from "../middlewares/AuthMiddleware.js";


export const songRoute = express.Router();

songRoute.post("/create", adminOnly, createSong);
songRoute.delete("/delete/:id", adminOnly, deleteSong);
songRoute.get("/get", getAllSongs);
songRoute.get("/getSingle/:id", getSingleSongs);
songRoute.get("/search", searchSong);
songRoute.get("/artists/:name", getSongsByArtistName);