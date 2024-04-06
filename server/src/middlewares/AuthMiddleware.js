import jwt from 'jsonwebtoken';

const AuthMiddleware = (req, res, next) => {
    const token = req.cookies["access-token"];

    if (!token)
        return res.status(401).send({ success: false, message: "Please login to access this route" });

    const decodedData = jwt.verify(token, process.env.JWT_SECRET);

    req.userId = decodedData.userId;

    next();
};

export default AuthMiddleware;