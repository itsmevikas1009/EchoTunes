import express from "express";
import { google, login, logout, signUp, updateProfile } from "../controllers/user.controller.js";
import { AuthMiddleware } from "../middlewares/AuthMiddleware.js";

export const userRoute = express.Router();

//Public route
userRoute.post('/signup', signUp);
userRoute.post('/google', google);
userRoute.post("/login", login);
userRoute.get("/logout", logout);

// Private route
userRoute.put("/updateProfile/:id", AuthMiddleware, updateProfile);