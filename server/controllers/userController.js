import jwt from 'jsonwebtoken'
import User from "../models/users.js";
import bcrypt from 'bcryptjs'
import mongoose from 'mongoose';
//user/register
const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.json({ success: false, message: "Missing Details" })
        }
        const existUser = await User.findOne({ email })
        if (existUser) {
            return res.json({ success: false, message: "User Already Exists" })
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, password: hashedPassword })
        console.log('JWT_SECRET in controller:', process.env.JWT_SECRET);
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' })
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV == "production",
            sameSite: process.env.NODE_ENV == "production" ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        })
        return res.json({ success: true, user: { email: user.email, name: user.name } })
    }
    catch (error) {
        console.log(error.message)
        return res.json({ success: false, message: error.message })
    }
}

//user/login
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.json({ success: false, message: "Email and Password are required" })
        }
        const user = await User.findOne({ email })
        if (!user) {
            res.json({ success: false, message: "Enter valid email and password" })
        }
        const match = await bcrypt.compare(password, user.password)
        if (!match) {
            res.json({ success: false, message: "Enter valid email and password" })
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' })
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV == "production",
            sameSite: process.env.NODE_ENV == "production" ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        })
        return res.json({ success: true, user: { email: user.email, name: user.name } })
    }
    catch (error) {
        console.log(error.message)
        return res.json({ success: false, message: error.message })
    }
}
export default register
//user lived=>user/isAuth
export const userAuth = async (req, res) => {
    try {
        const userId  = req.userId
        const user = await User.findById(userId).select("-password")
        return res.json({ success: true, user })
    }
    catch (error) {
        console.log(error.message)
        return res.json({ success: false, message: error.message })
    }
}
//logout api=>user/logout
export const logout=async(req,res)=>{
    try{
        res.clearCookie('token',{
            httpOnly: true,
            secure: process.env.NODE_ENV == "production",
            sameSite: process.env.NODE_ENV == "production"?"none":"strict"
        })
        return res.json({success:true,message:"Logged Out"})
    }
    catch(error){
        console.log(error.message)
        return res.json({ success: false, message: error.message })
    }
}