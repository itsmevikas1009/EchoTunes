import { User } from '../models/user.model.js';
import bcrypt from "bcrypt";


export const updateProfile = async (req, res) => {
    const { name, password } = req.body;

    if (req.params.id !== req.userId) {
        return res.status(200).json({
            succes: false,
            message: "You are not authorized"
        });
    }

    if (!password) {
        return res.status(200).json({
            success: false,
            message: "All fields are required!"
        })
    }

    const hashedPasword = await bcrypt.hash(password, 10);

    try {
        const user = await User.findByIdAndUpdate(req.userId, { name, password: hashedPasword }, { new: true });
        const { password: pass, ...rest } = user._doc;
        return res.status(200).json({
            success: true,
            message: "Profile Updated",
            rest
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            err
        })
    }
}