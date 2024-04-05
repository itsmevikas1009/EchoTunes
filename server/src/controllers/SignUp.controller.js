import { User } from "../models/user.model.js";

const SignUp = async (req, res, next) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(200).json({
            success: false,
            message: "All fields are required!"
        })
    };

    const existedUser = await User.findOne({ email });
    if (existedUser) {
        return res.status(200).json({
            success: false,
            message: "Email has been used"
        })
    }

    // Create a new user from the request data and save it to the database
    try {
        const user = await User.create({
            name,
            email: email.toLowerCase(),
            password
        })
        return res.status(200).json({
            success: true,
            message: "Registerd Successfully!"
        });

    } catch (error) {
        console.log('Signup error', error);
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export default SignUp;