import { validationResult } from "express-validator";
import bcrypt from "bcryptjs/dist/bcrypt.js";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const JWT_SECRET = process.env.JWT_SECRET;

const signup = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({success: false, errors: errors.array() });
    }

    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.json({success: false, message: "user already exists." })
        }

        const salt = await bcrypt.genSalt(10);
        const securePassword = await bcrypt.hash(req.body.password, salt);

        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: securePassword
        });

        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        res.json({success: true, authToken: authToken});

    } catch (error) {
        return res.status(500).json({success: false, message: 'Something went wrong.'});
    }
}

const login = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({success: false, errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
        let user = await User.findOne({email: email});
        if(!user) {
            return res.status(400).json({success: false, error: "Please enter valid credentials" });
        }

        const passwordCompared = await bcrypt.compare(password, user.password);
        if(!passwordCompared) {
            return res.status(400).json({success: false, error: "Please enter valid credentials" });
        }

        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        return res.json({success: true, authToken: authToken});

    } catch(error) {
        return res.status(500).json({success: false, message: 'Something went wrong.'});
    }
}

const getuser = async (req, res) => {
    try {
        const userID = req.user.id;
        const user = await User.findOne({_id: userID}).select('-password')
        return res.json({success: true, user: user})
    } catch(error) {
        console.log(error);
        return res.status(500).json({success: false, message: 'Something went wrong.'});
    }
}

export { login, signup, getuser }