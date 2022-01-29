import express from "express";
import { body } from "express-validator";
import { login, signup, getuser } from "../controllers/auth-controller.js";
import fetchuser from "../middlewares/fetchuser.js";

const router = express.Router();

router.post('/api/signup', [
    body('name', 'Enter the valid name').isLength({min: 3}),
    body('email', 'Enter the valid email').isEmail(),
    body('password', 'Password should be minimum 6 characters').isLength({min: 6})
], signup); // creating user

router.post('/api/login', [
    body('email', 'Enter the valid email').isEmail(),
    body('password', 'Password should be minimum 6 characters').isLength({min: 6})
], login); // login user

router.post('/api/getuser', fetchuser, getuser); // get user

export default router;