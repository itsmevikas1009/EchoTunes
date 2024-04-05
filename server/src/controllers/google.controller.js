import { User } from "../models/user.model.js";
// import  bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";


export const google = async (req, res) => {
    const { name, email, googlePhotoUrl } = req.body;

    try {
        const user = await User.findOne({ email });

        if (user) {
            const token = jwt.sign({
                id: user._id
            }, process.env.JWTSECRET);

            const { password: pass, ...rest } = user._doc;

            return res.status(200)
                .cookie('access_token', token, {
                    httpOnly: true
                })
                .json({
                    success: true,
                    message: "Login Successfully !",
                    rest
                });
        } else {
            const password = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);

            const newUser = await User.create({
                name,
                email,
                password
                // profilePicture: googlePhotoUrl
            })


            const token = jwt.sign({
                id: newUser._id,
            }, process.env.JWTSECRET);

            const { password: pass, ...rest } = newUser._doc;

            return res.status(200)
                .cookie('access_token', token, {
                    httpOnly: true
                })
                .json({
                    success: true,
                    message: "Login Successfully !",
                    rest
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