import express from "express";
import SignUp from "../controllers/SignUp.controller.js";

export const apiRoute = express.Router();
export const apiProtected = express.Router();

//SignUp route
apiRoute.post('/signup', SignUp);
// apiRoute.post('/google', goo);

//LogIn Route
// apiRoute.post("/login", LogIn);
