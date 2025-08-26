import { User } from "../models/user.model.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'

export const signup = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) return res.status(404).json({
            success: false,
            message: 'All fields are required!'
        })

        const existingUser = await User.findOne({
            $or: [{ username }, { email }]
        });
        if (existingUser) return res.status(400).json({
            success: false,
            message: 'User already exists!'
        })

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            username,
            email,
            password: hashedPassword
        })

        const userData = {
            id: user._id,
            username: user.username,
            email: user.email,
        };

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' })

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        })

        return res.status(201).json({
            success: true,
            message: 'User created successlly!',
            userData
        })
    } catch (e) {
        console.error(e.message)
    }
}

export const login = async (req, res) => {
    try {
        const { usernameOrEmail, password } = req.body;
        console.log({
            usernameOrEmail, password
        })

        if (!usernameOrEmail || !password) return res.status(404).json({
            success: false,
            message: 'All fields are required!'
        })

        const user = await User.findOne({
            $or: [{
                username: usernameOrEmail
            }, {
                email: usernameOrEmail
            }]
        });
        if (!user) return res.status(404).json({
            success: false,
            message: 'User not exists!'
        })

        const userData = {
            id: user._id,
            username: user.username,
            email: user.email,
        };

        return res.status(201).json({
            success: true,
            message: 'User logged in successlly!',
            userData
        })
    } catch (e) {
        console.error(e.message)
    }
}