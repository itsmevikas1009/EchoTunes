import { User } from "../models/user.model.js";
// import  bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

const cookieOptions = {
    maxAge: 3 * 24 * 60 * 60 * 1000,
    sameSite: "none",
    httpOnly: true,
    secure: true,
};

export const google = async (req, res) => {
    const { name, email, googlePhotoUrl } = req.body;

    try {
        const user = await User.findOne({ email });

        if (user) {
            const { password: pass, ...rest } = user._doc;

            // Return user data, token, and success message
            const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

            return res.status(200).cookie("access-token", token, cookieOptions).json({
                success: true,
                rest,
                message: `Welcome Back ${user.name}`,
            });
        } else {
            const password = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);

            const newUser = await User.create({
                name,
                email,
                password,
                profilePicture: googlePhotoUrl
            })

            const { password: pass, ...rest } = newUser._doc;



            // Return user data, token, and success message
            const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

            return res.status(200).cookie("access-token", token, cookieOptions).json({
                success: true,
                rest,
                message: `Registered Successfully, ${user.name}`,
            });
        }

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Something  went wrong",
            data: err
        });
    }
}