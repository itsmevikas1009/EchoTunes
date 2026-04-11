import jwt from "jsonwebtoken";
import { getJwtSecret } from "../utils/auth.js";

export const AuthMiddleware = (req, res, next) => {
    const token = req.cookies?.["access-token"];

    if (!token) {
        return res.status(401).send({
            success: false,
            message: "Please login to access this route",
        });
    }

    try {
        const decodedData = jwt.verify(token, getJwtSecret());

        req.userId = decodedData.userId;
        req.isAdmin = decodedData.isAdmin;

        next();
    } catch (error) {
        return res.status(401).send({
            success: false,
            message: "Invalid or expired session. Please login again.",
        });
    }
};

export const adminOnly = (req, res, next) => {
    const token = req.cookies?.["access-token"];

    if (!token) {
        return res.status(401).send({
            success: false,
            message: "Only Admin can access this route",
        });
    }

    try {
        const decodedData = jwt.verify(token, getJwtSecret());

        if (!decodedData.isAdmin) {
            return res.status(403).send({
                success: false,
                message: "You don't have permission for this action.",
            });
        }

        req.userId = decodedData.userId;
        req.isAdmin = decodedData.isAdmin;

        next();
    } catch (error) {
        return res.status(401).send({
            success: false,
            message: "Invalid or expired session. Please login again.",
        });
    }
};

export const requireCsrf = (req, res, next) => {
    const csrfCookie = req.cookies?.["csrf-token"];
    const csrfHeader = req.get("x-csrf-token");

    if (!csrfCookie || !csrfHeader || csrfCookie !== csrfHeader) {
        return res.status(403).json({
            success: false,
            message: "CSRF validation failed.",
        });
    }

    next();
};
