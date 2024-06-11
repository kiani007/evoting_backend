import jwt from "jsonwebtoken";

const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ status: 401, message: 'Authorization header is missing' });
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ status: 401, message: 'No token provided' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ status: 403, message: 'Invalid token' });
        }

        req.user = decoded; 
        // console.log(decoded ,"JWT Middleware")
        next();
    });
};

export default authenticateJWT;