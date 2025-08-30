import jwt from 'jsonwebtoken';

export const AuthMiddleware = (req, res, next) => {
    const token = req.cookies["access-token"];

    if (!token)
        return res.status(401).send({ success: false, message: "Please login to access this route" });

    const decodedData = jwt.verify(token, process.env.JWT_SECRET);

    req.userId = decodedData.userId;

    next();
};

export const adminOnly = (req, res, next) => {
    const token = req.cookies["access-token"];

    if (!token)
        return res.status(401).send({ success: false, message: "Only Admin can access this route" });

    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    // console.log(decodedData.isAdmin);
    if (decodedData.isAdmin === false) {
        return res.status(401).send({ success: false, message: "You don't have permission for this action." });
    }

    req.isAdmin = decodedData.isAdmin;

    next();
};