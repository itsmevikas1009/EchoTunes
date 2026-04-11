import crypto from "crypto";
import jwt from "jsonwebtoken";

const SESSION_DURATION_MS = 3 * 24 * 60 * 60 * 1000;

const isProduction = process.env.NODE_ENV === "production";

export const getJwtSecret = () => {
    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET is not configured");
    }

    return process.env.JWT_SECRET;
};

export const signAuthToken = (payload) =>
    jwt.sign(payload, getJwtSecret(), { expiresIn: "3d" });

export const generateCsrfToken = () => crypto.randomBytes(32).toString("hex");

export const getAuthCookieOptions = () => ({
    maxAge: SESSION_DURATION_MS,
    sameSite: isProduction ? "none" : "lax",
    httpOnly: true,
    secure: isProduction,
    path: "/",
});

export const getCsrfCookieOptions = () => ({
    maxAge: SESSION_DURATION_MS,
    sameSite: isProduction ? "none" : "lax",
    httpOnly: false,
    secure: isProduction,
    path: "/",
});
