import express from "express";
import mongoose from "mongoose";
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { userRoute } from "./src/routes/user.js";
import { songRoute } from "./src/routes/song.js";
import artistRoute from "./src/routes/artist.js"

import dotenv from "dotenv"

const connectDB = mongoose.connect('mongodb+srv://spotify-sms:3wEP40zDugishYwG@cluster0.fcgapxd.mongodb.net/spotify', { useNewUrlParser: true });
const PORT = 3000;
const app = express();

// Load environment variables from .env file
dotenv.config();

const localURL = "http://localhost:5173";

const remoteURL = "https://echo-tunes-client.vercel.app";

const corsOption = {
    origin: remoteURL,
    methods: ['POST', 'GET', 'PUT', 'DELETE'],
    credentials: true,
    optionSuccessStatus: 200
}

app.use(cors(corsOption));
app.use(express.json());
app.use(cookieParser());

// Use the AuthMiddleware to protect the /api/ route
app.use("/api", userRoute);
app.use("/api/song", songRoute);
app.use("/api/artist", artistRoute);

// Connect the database
connectDB.then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch((err) => console.error(err));