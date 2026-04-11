import express from "express";
import { createSong, deleteSong, getAllSongs, getSingleSongs, getSongsByArtistName, searchSong, updateSong } from "../controllers/songs.controller.js";
import { adminOnly, requireCsrf } from "../middlewares/AuthMiddleware.js";

export const songRoute = express.Router();

songRoute.post("/create", adminOnly, requireCsrf, createSong);
songRoute.put("/update/:id", adminOnly, requireCsrf, updateSong);
songRoute.delete("/delete/:id", adminOnly, requireCsrf, deleteSong);
songRoute.get("/get", getAllSongs);
songRoute.get("/getSingle/:id", getSingleSongs);
songRoute.get("/search", searchSong);
songRoute.get("/artists/:name", getSongsByArtistName);
