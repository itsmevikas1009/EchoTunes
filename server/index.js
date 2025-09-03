import 'dotenv/config'; // This is sufficient - remove duplicate imports
import express from "express";
import mongoose from "mongoose";
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { userRoute } from "./src/routes/user.js";
import { songRoute } from "./src/routes/song.js";
import artistRoute from "./src/routes/artist.js";

const PORT = process.env.PORT || 3000;
const app = express();

const localURL = "http://localhost:5173";
const remoteURL = "https://echo-tunes-client.vercel.app";

// ✅ FIXED: Proper CORS configuration with multiple origins
const corsOptions = {
    origin: [localURL, remoteURL], // Allow both local and remote
    methods: ['POST', 'GET', 'PUT', 'DELETE'],
    credentials: true,
    optionsSuccessStatus: 200 // Fixed typo
};

// ✅ FIXED: Apply middleware in correct order
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api", userRoute);
app.use("/api/song", songRoute);
app.use("/api/artist", artistRoute);

// ✅ FIXED: Proper async database connection with error handling
const connectDB = async () => {
    try {
        // Remove deprecated options - they're not needed in Mongoose 6+
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ MongoDB connected successfully');

        // Start server only after successful DB connection
        app.listen(PORT, () => {
            console.log(`🚀 Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error('❌ Database connection failed:', error.message);
        process.exit(1); // Exit if database connection fails
    }
};

// ✅ FIXED: Call the async function
connectDB();

// ✅ ADDED: Graceful shutdown handling
process.on('SIGTERM', async () => {
    console.log('SIGTERM received, shutting down gracefully');
    await mongoose.connection.close();
    process.exit(0);
});

process.on('SIGINT', async () => {
    console.log('SIGINT received, shutting down gracefully');
    await mongoose.connection.close();
    process.exit(0);
});
