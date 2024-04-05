import express from "express";
import SignUp from "../controllers/SignUp.controller.js";
import Login from "../controllers/Login.controller.js";
import { google } from "../controllers/google.controller.js";

export const apiRoute = express.Router();
export const apiProtected = express.Router();

//SignUp route
apiRoute.post('/signup', SignUp);
apiRoute.post('/google', google);

//LogIn Route
apiRoute.post("/login", Login);
