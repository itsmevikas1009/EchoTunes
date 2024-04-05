import { User } from "../models/user.model.js";

<<<<<<< HEAD
const SignUp = async (req, res) => {
=======
const SignUp = async (req, res, next) => {
    // Extract user data from the request body
>>>>>>> e2dc643aeefbf00d8be394652e3f1b2e1bd7bdc0
    const { name, email, password } = req.body;

    // Check if all required fields are present
    if (!name || !email || !password) {
        return res.status(200).json({
            success: false,
            message: "All fields are required!"
        });
    };

    // Check if the email is already in use
    const existedUser = await User.findOne({ email });
    if (existedUser) {
<<<<<<< HEAD
        return res.status(409).json({
            message: 'Email has been used.'
        })
=======
        return res.status(200).json({
            success: false,
            message: "Email has been used"
        });
>>>>>>> e2dc643aeefbf00d8be394652e3f1b2e1bd7bdc0
    }

    // Create a new user from the request data and save it to the database
    try {
        const user = await User.create({
            name,
            email: email.toLowerCase(), // Convert email to lowercase before saving
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