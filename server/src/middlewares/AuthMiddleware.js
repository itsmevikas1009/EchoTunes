import jwt from 'jsonwebtoken';

const AuthMiddleware = (req, res, next) => {
    // Check if the authorization header is present
    if (req.headers["auth"] === undefined) {
        return res.json({
            status: 401,
            message: "Authorization header is missing!"
        });
    };

    // Extract the token from the authorization header
    const token = req.headers["auth"];

    try {
        // Verify the token and extract the user id
        const decoded = jwt.verify(token, "jwt-secret-key");
        req.userId = decoded.userId;

        // If the token is valid, continue to the next middleware
        return next();

    } catch (err) {
        // If the token is invalid, send back an authentication failure message
        return res.json({
            status: 403,
            auth: false,
            message: "Failed to authenticate token."
        });
    }
};

export default AuthMiddleware;