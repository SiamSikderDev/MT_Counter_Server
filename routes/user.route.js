import express from "express";
import { login, signup, verifyOtp } from "../controllers/user.controller.js";

const router = express.Router();

router
    .post('/signup', signup)
    .post('/login', login)
    .post('/verifyOtp', verifyOtp)

export default router