import dotenv from 'dotenv';
dotenv.config();

import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

const fetchuser = (req, res, next) => {
    try {
        const token = req.header('auth-token');
        if (!token) {
            res.status(401).send({success: false, error: "please authenticate using a valid token" })
        }

        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next();

    } catch(error) {
        return res.status(500).json({success: false, message: 'Something went wrong.'});
    }
}

export default fetchuser;