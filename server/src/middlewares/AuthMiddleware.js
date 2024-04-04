import jwt from 'jsonwebtoken';

const AuthMiddleware = (req, res, next) => {
    if (req.headers["auth"] === undefined) {
        return res.json({ status: 401, message: "Authorization header is missing!" });
    }

    const token = req.headers["auth"];
    try {
        const decoded = jwt.verify(token, "jwt-secret-key");
        req.userId = decoded.userId;
        return next();
    } catch (err) {
        return res.json({ status: 403, auth: false, message: "Failed to authenticate token." }); // Send back authentication failure + message.
    }
}

export default AuthMiddleware;