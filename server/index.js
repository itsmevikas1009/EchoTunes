import 'dotenv/config';
import express from "express";
import mongoose from "mongoose";
import cors from 'cors';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { userRoute } from "./src/routes/user.js";
import { songRoute } from "./src/routes/song.js";
import artistRoute from "./src/routes/artist.js";

const PORT = process.env.PORT || 3000;
const app = express();

// Environment-based origins
const getAllowedOrigins = () => {
    const origins = [
        "http://localhost:5173",
        "http://localhost:3000",
        "https://echo-tunes-client.vercel.app"
    ];

    // Add custom domains from environment variable
    if (process.env.CORS_ORIGIN) {
        origins.push(...process.env.CORS_ORIGIN.split(','));
    }

    return origins;
};

// Security middleware
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

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: process.env.API_RATE_LIMIT || 100,
    message: {
        error: 'Too many requests from this IP, please try again later.'
    },
    standardHeaders: true,
    legacyHeaders: false,
});

app.use('/api/', limiter);

// ✅ ONLY CHANGE: Enhanced CORS configuration to fix the error
const corsOptions = {
    origin: function (origin, callback) {
        const allowedOrigins = getAllowedOrigins();

        // Allow requests with no origin (mobile apps, Postman, etc.)
        if (!origin) return callback(null, true);

        if (allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            console.log(`❌ CORS blocked origin: ${origin}`);
            callback(new Error(`Origin ${origin} not allowed by CORS policy`));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    credentials: true,
    optionsSuccessStatus: 200,
    allowedHeaders: [
        'Origin',
        'X-Requested-With',
        'Content-Type',
        'Accept',
        'Authorization',
        'Cache-Control'
    ]
};

// Apply middleware in correct order
app.use(cors(corsOptions));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());

// Trust proxy (important for deployment platforms like Vercel)
app.set('trust proxy', 1);

// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        environment: process.env.NODE_ENV || 'development'
    });
});

// API Routes
app.use("/api", userRoute);
app.use("/api/song", songRoute);
app.use("/api/artist", artistRoute);

// Global error handler
app.use((err, req, res, next) => {
    console.error(`[${new Date().toISOString()}] Error:`, err.message);

    if (process.env.NODE_ENV === 'production') {
        res.status(err.status || 500).json({
            success: false,
            message: 'Internal Server Error'
        });
    } else {
        res.status(err.status || 500).json({
            success: false,
            message: err.message,
            stack: err.stack
        });
    }
});

// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({
        success: false,
        message: `Route ${req.originalUrl} not found`,
        availableRoutes: [
            'GET /health',
            'GET /api/users',
            'POST /api/users',
            'GET /api/song/get',
            'GET /api/artist/get'
        ]
    });
});

// Database connection with retry logic
const connectDB = async (retries = 5) => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
        });
        console.log('✅ MongoDB connected successfully');

        // Start server only after successful DB connection
        const server = app.listen(PORT, '0.0.0.0', () => {
            console.log(`🚀 Server running on port ${PORT}`);
            console.log(`📊 Health check: http://localhost:${PORT}/health`);
            console.log(`🔧 Environment: ${process.env.NODE_ENV || 'development'}`);
            console.log(`🌍 Allowed origins:`, getAllowedOrigins());
        });

        // Graceful shutdown handler
        const gracefulShutdown = async (signal) => {
            console.log(`${signal} received, shutting down gracefully`);

            server.close(() => {
                console.log('HTTP server closed');
            });

            await mongoose.connection.close();
            console.log('MongoDB connection closed');
            process.exit(0);
        };

        process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
        process.on('SIGINT', () => gracefulShutdown('SIGINT'));

    } catch (error) {
        console.error('❌ Database connection failed:', error.message);

        if (retries > 0) {
            console.log(`⏳ Retrying connection... (${retries} attempts left)`);
            setTimeout(() => connectDB(retries - 1), 5000);
        } else {
            console.error('❌ All connection attempts failed');
            process.exit(1);
        }
    }
};

// Start the application
connectDB();
