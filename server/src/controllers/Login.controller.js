import { User } from '../models/user.model.js';
import jwt from 'jsonwebtoken';

const Login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.json({ status: 401, message: "Email or Password missing." })
    }
    const user = await User.findOne({ email });

    if (!user) {
        return res.json({ status: 403, message: 'User not found.' });
    }

    const isValidPassword = await user.isPasswordCorrect(password);
    if (!isValidPassword) {
        return res.json({ status: 402, message: "Invalid Email or Password." });
    }

    const userId = user._id;
    const token = jwt.sign({ userId }, "jwt-secret-key");
    // res.cookie('token', token);
    return res.json({
        status: 200,
        userId: user._id,
        token: token,
        firstName: user.firstName,
        message: "Logged in successfully.",
    })
}

export default Login;