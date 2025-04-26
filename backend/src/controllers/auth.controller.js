
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from "../models/user.model.js";


export const signup = async (req,res) =>{   
    const { email,password } = req.body;

    const isExisting = await User.findOne({ email });
    try {

        if(isExisting){
            return res.status(400).json({
                success: false,
                message: "email already exists"
            });
        }
    
    
        const hashedPassword = await bcrypt.hash(password,10);
        const newUser = new User({
            email: email,
            password: hashedPassword
        });
    
        await newUser.save();
    
        return res.status(201).json({
            success: true,
            message: "User created successfully"
        });
        
    } catch (err) {
        console.log("error in auth controller")
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}

export const login = async (req,res)=>{
    const { email,password } = req.body;

    if(!email || !password){
        return res.status(400).json({
            success: false,
            message: "Enter all the details"
        });
    }

    try{
        const user = await User.findOne({ email });
        if(!user){
            return res.status(400).json({
                success: false,
                message: "User not registered"
            });
        }

        const isVerified = await bcrypt.compare(password,user.password);
        
        //verifying user
        if(!isVerified){
            return res.status(400).json({
                success: false,
                message: "Invalid credentials"
            });
        }


        const token = jwt.sign({ id: user._id },process.env.JWT_SECRET, {
            expiresIn: '7d'
        });
        res.cookie('jwt', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', 
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000 
        });

        return res.status(200).json({
            success: true,
            email: user.email,
            message: "Logged in successfully"
        });

        
    }catch(err){
        console.log("Internal server error" , err);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}



export const logout = async (req,res) =>{
    try{
        res.clearCookie('jwt',{
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict'
        });
        res.status(200).json({
            success: true,
            message: "Logged out succesfully",
            user: req.user.email
        });
    }catch(err){
        console.log("Error in logging out" , err);
        return res.status(500).json({
            success: false,
            message: "Internal server error" 
        });
    }
}
