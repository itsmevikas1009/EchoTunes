import { User } from "../models/user.model.js";

/**
 * Asynchronous function to handle user sign-up.
 * @param {Request} req - The request object from the client.
 * @param {Response} res - The response object to send back to the client.
 */

const SignUp = async (req, res) => {

    // Destructure the request body to get name, email, and password.
    const { name, email, password } = req.body;

    // Check if all required fields are present.
    if (!name || !email || !password) {
        return res.status(200).json({
            success: false,
            message: "All fields are required!"
        });
    };

    // Check if the email is already in use.
    const existedUser = await User.findOne({ email });
    if (existedUser) {
        return res.status(200).json({
            success: false,
            message: "Email has been used"
        });
    }

    // Create a new user from the request data and save it to the database.
    try {
        const user = await User.create({
            name,
            email: email.toLowerCase(), // Convert email to lowercase before saving.
            password
        });

        return res.status(200).json({
            success: true,
            message: "Registered Successfully!"
        });

    } catch (error) {
        console.log('Signup error', error);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export default SignUp;