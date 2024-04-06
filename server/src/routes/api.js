import express from "express";
import SignUp from "../controllers/SignUp.controller.js";
import Login from "../controllers/Login.controller.js";
import { google } from "../controllers/google.controller.js";
import { logout } from "../controllers/logout.controller.js";
import { updateProfile } from "../controllers/updateProfile.controller.js";
import AuthMiddleware from "../middlewares/AuthMiddleware.js";

export const apiRoute = express.Router();

//SignUp route
apiRoute.post('/signup', SignUp);
apiRoute.post('/google', google);

//LogIn Route
apiRoute.post("/login", Login);
apiRoute.get("/logout", logout);


apiRoute.put("/updateProfile/:id", AuthMiddleware, updateProfile);
