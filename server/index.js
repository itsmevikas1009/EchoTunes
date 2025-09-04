import 'dotenv/config';
import express from "express";
import mongoose from "mongoose";
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { userRoute } from "./src/routes/user.js";
import { songRoute } from "./src/routes/song.js";
import artistRoute from "./src/routes/artist.js";

const PORT = process.env.PORT || 3000;
const app = express();

const getAllowedOrigins = () => {
    const origins = [
        "http://localhost:5173",
        "http://localhost:3000",
        "https://echo-tunes-client.vercel.app"
    ];
    if (process.env.CORS_ORIGIN) {
        origins.push(...process.env.CORS_ORIGIN.split(','));
    }
    return origins;
};

const corsOptions = {
    origin: (origin, callback) => {
        if (!origin) return callback(null, true);
        if (getAllowedOrigins().includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error(`Origin ${origin} not allowed by CORS policy`));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    credentials: true,
    optionsSuccessStatus: 200,
    allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization', 'Cache-Control']
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

app.use(helmet({
    crossOriginEmbedderPolicy: false,
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'"],
            scriptSrc: ["'self'"],
            imgSrc: ["'self'", "data:", "https:"],
        },
    },
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: (req) => (req.method === 'OPTIONS' ? 0 : (process.env.API_RATE_LIMIT || 100)),
    message: { error: 'Too many requests from this IP, please try again later.' },
    standardHeaders: true,
    legacyHeaders: false,
});
app.use('/api/', limiter);

app.set('trust proxy', 1);

app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        environment: process.env.NODE_ENV || 'development'
    });
});

app.use("/api", userRoute);
app.use("/api/song", songRoute);
app.use("/api/artist", artistRoute);

app.use((err, req, res, next) => {
    if (process.env.NODE_ENV === 'production') {
        res.status(err.status || 500).json({ success: false, message: 'Internal Server Error' });
    } else {
        res.status(err.status || 500).json({ success: false, message: err.message, stack: err.stack });
    }
});

app.use('*', (req, res) => {
    res.status(404).json({
        success: false,
        message: `Route ${req.originalUrl} not found`,
    });
});

const connectDB = async (retries = 5) => {
    try {
        await mongoose.connect(process.env.MONGO_URI, { serverSelectionTimeoutMS: 5000, socketTimeoutMS: 45000 });
        console.log('✅ MongoDB connected successfully');
        app.listen(PORT, () => {
            console.log(`🚀 Server running on port ${PORT}`);
            console.log(`🌍 Allowed origins:`, getAllowedOrigins());
        });
    } catch (error) {
        if (retries > 0) {
            setTimeout(() => connectDB(retries - 1), 5000);
        } else {
            process.exit(1);
        }
    }
};

connectDB();
