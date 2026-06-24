import jwt from "jsonwebtoken";
import { User } from "../models/Users.js";

async function authMiddleware(req, res, next) {
    try {

        const token = req.headers.authorization;

        

        if (!token) {
            return res.status(401).json({
                message: "User is not logged in"
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const findUser = await User.findById(decoded.id);

        if (!findUser) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        req.userId = decoded.id;
        req.name = findUser.name;

        next();
    } catch (e) {
        

        return res.status(401).json({
            message: "Authentication failed"
        });
    }
}

export {
    authMiddleware
};