import bcrypt from "bcrypt";
import mongoose from "mongoose";
import { User } from "../models/user.model.js";
import {
    generateCsrfToken,
    getAuthCookieOptions,
    getCsrfCookieOptions,
    signAuthToken,
} from "../utils/auth.js";

const issueSession = async (res, user, message) => {
    const { password, ...rest } = user.toObject();
    
    // Fetch artist name if user is an artist
    let artistName = "";
    if (user.isArtist && user.artistId) {
        const artist = await mongoose.model("Artist").findById(user.artistId);
        artistName = artist?.name || "";
    }

    const token = signAuthToken({ 
        userId: user._id, 
        isAdmin: user.isAdmin,
        isArtist: user.isArtist,
        artistName: artistName
    });
    const csrfToken = generateCsrfToken();

    return res
        .status(200)
        .cookie("access-token", token, getAuthCookieOptions())
        .cookie("csrf-token", csrfToken, getCsrfCookieOptions())
        .json({
            success: true,
            rest: { ...rest, artistName },
            csrfToken,
            message,
        });
};

const verifyGoogleIdToken = async (idToken) => {
    if (!process.env.GOOGLE_CLIENT_ID) {
        throw new Error("GOOGLE_CLIENT_ID is not configured");
    }

    const response = await fetch(
        `https://oauth2.googleapis.com/tokeninfo?id_token=${encodeURIComponent(idToken)}`
    );

    if (!response.ok) {
        throw new Error("Invalid Google token");
    }

    const payload = await response.json();

    if (payload.aud !== process.env.GOOGLE_CLIENT_ID) {
        throw new Error("Google token audience mismatch");
    }

    if (payload.email_verified !== "true") {
        throw new Error("Google account email is not verified");
    }

    return {
        email: payload.email?.toLowerCase(),
        name: payload.name,
        profilePicture: payload.picture,
    };
};

export const signUp = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({
            success: false,
            message: "All fields are required!",
        });
    }

    const normalizedEmail = email.toLowerCase();
    const existedUser = await User.findOne({ email: normalizedEmail });

    if (existedUser) {
        return res.status(409).json({
            success: false,
            message: "Email has been used",
        });
    }

    try {
        await User.create({
            name,
            email: normalizedEmail,
            password,
        });

        return res.status(201).json({
            success: true,
            message: "Registered Successfully!",
        });
    } catch (error) {
        console.log("Signup error", error);
        return res.status(500).json({
            success: false,
            message: "Unable to register right now.",
        });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: "All fields are required!",
        });
    }

    try {
        const user = await User.findOne({ email: email.toLowerCase() });
        const invalidLoginMessage = "Invalid email or password.";

        if (!user) {
            return res.status(401).json({
                success: false,
                message: invalidLoginMessage,
            });
        }

        const isValidPassword = await user.isPasswordCorrect(password);

        if (!isValidPassword) {
            return res.status(401).json({
                success: false,
                message: invalidLoginMessage,
            });
        }

        return await issueSession(res, user, `Welcome Back ${user.name}`);
    } catch (err) {
        console.log("Login error", err);
        return res.status(500).json({
            success: false,
            message: "Unable to login right now.",
        });
    }
};

export const google = async (req, res) => {
    const { idToken } = req.body;

    if (!idToken) {
        return res.status(400).json({
            success: false,
            message: "Google token is required.",
        });
    }

    try {
        const googleUser = await verifyGoogleIdToken(idToken);
        let user = await User.findOne({ email: googleUser.email });

        if (!user) {
            const generatedPassword =
                Math.random().toString(36).slice(-8) +
                Math.random().toString(36).slice(-8);

            user = await User.create({
                name: googleUser.name,
                email: googleUser.email,
                password: generatedPassword,
                profilePicture: googleUser.profilePicture,
            });

            return await issueSession(
                res,
                user,
                `Registered Successfully, ${user.name}`
            );
        }

        if (googleUser.profilePicture && user.profilePicture !== googleUser.profilePicture) {
            user.profilePicture = googleUser.profilePicture;
            await user.save();
        }

        return await issueSession(res, user, `Welcome Back ${user.name}`);
    } catch (err) {
        console.log("Google auth error", err);
        const statusCode =
            err.message === "GOOGLE_CLIENT_ID is not configured" ? 500 : 401;
        console.log("Status code", res);
        return res.status(statusCode).json({
            success: false,
            message:
                statusCode === 500
                    ? "Google login is not configured on the server."
                    : "Google authentication failed.",
        });
    }
};

export const updateProfile = async (req, res) => {
    const { name, password } = req.body;

    if (req.params.id !== req.userId) {
        return res.status(403).json({
            success: false,
            message: "You are not authorized",
        });
    }

    const updateData = { name };
    if (password) {
        updateData.password = await bcrypt.hash(password, 10);
    }

    try {
        const user = await User.findByIdAndUpdate(
            req.userId,
            { $set: updateData },
            { new: true }
        );

        const { password: removedPassword, ...rest } = user.toObject();

        return res.status(200).json({
            success: true,
            message: "Profile Updated",
            rest,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Unable to update profile right now.",
        });
    }
};

export const logout = async (req, res) => {
    return res
        .status(200)
        .cookie("access-token", "", { ...getAuthCookieOptions(), maxAge: 0 })
        .cookie("csrf-token", "", { ...getCsrfCookieOptions(), maxAge: 0 })
        .json({
            success: true,
            message: "Logged out successfully",
        });
};
