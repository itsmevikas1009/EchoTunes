import { User } from '../models/user.model.js';
import jwt from 'jsonwebtoken'

// Function to handle user login
const Login = async (req, res) => {
    // Destructure email and password from request body
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
        // If not, return an error message
        return res.status(200).json({
            success: false,
            message: "All fields are required!"
        })
    }

    // Find user by email
    const user = await User.findOne({ email })

    // If user is not found, return an error message
    if (!user) {
        return res.status(200).json({
            success: false,
            message: 'User not found.'
        })
    }

    // Check if the provided password is correct
    const isValidPassword = await user.isPasswordCorrect(password)
    if (!isValidPassword) {
        // If not, return an error message
        return res.status(200).json({ success: false, message: "Invalid Email or Password." })
    }

    try {
        // Extract user ID from user object
        const userId = user._id;

        // Generate a JSON Web Token (JWT) using user ID and a secret key
        const token = jwt.sign({ userId }, "jwt-secret-key");

        // Return user data, token, and success message
        return res.status(200).json({
            success: true,
            userId: user._id,
            token: token,
            firstName: user.firstName,
            message: "Logged in successfully.",
        })
    } catch (err) {
        // Log any errors during token generation
        console.log('Login error', err)

        // Return an error message and error details
        return res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

export default Login;