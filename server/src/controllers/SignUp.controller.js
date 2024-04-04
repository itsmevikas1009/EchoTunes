import { User } from "../models/user.model.js";

const SignUp = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.json({ status: 401, message: 'Missing fields' });
    };

    const existedUser = await User.findOne({ email });
    if (existedUser) {
        return res({ status: 403, message: 'Email has already been used' });
    }

    // Create a new user from the request data and save it to the database
    const user = await User.create({
        name,
        email: email.toLowerCase(),
        password
    })
    return res.json({ status: 200, message: "Registerd Successfully!" });
}

export default SignUp;