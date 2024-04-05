import { User } from "../models/user.model.js";

const SignUp = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(401).json({
            message: 'Missing fields'
        });
    };

    const existedUser = await User.findOne({ email });
    if (existedUser) {
        return res.status(409).json({
            message: 'Email has been used.'
        })
    }

    // Create a new user from the request data and save it to the database
    try {
        const user = await User.create({
            name,
            email: email.toLowerCase(),
            password
        })
        return res.status(200).json({ message: "Registerd Successfully!" });
    } catch (error) {
        return res.status(500).json({ message: error.message });

    }
}

export default SignUp;