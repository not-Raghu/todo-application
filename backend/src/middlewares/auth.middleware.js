import jwt from 'jsonwebtoken';

import signinSchema from '../lib/zod-validators.js'
import { User } from '../models/user.model.js';

export const signupMiddleware = async (req,res,next) =>{
    let { email, password, confirmPassword } = req.body;

    if(!email || !password){
        return res.status(400).json({
            success: false,
            message: "Please send required details"
        });
    }

    if(password !== confirmPassword){
        return res.status(400).json({
            success: false,
            message: "Passwords dont match"
        });
    }

    const isValid = signinSchema.safeParse({
        email: email,
        password: password
    });

    if(!isValid.success){
        return res.status(400).json({
            success: false,
            message: "Your credentials do not meet the requirement",
            error: isValid.error.errors
        });
    }

    req.body.email = email;
    req.body.password = password;

    next();
}

export const verifyToken = async (req,res,next) => {
    try{
        const token = req.cookies?.jwt;

        if(!token){
            return res.status(401).json({
                success: false,
                message: "No token provided"
            });
        }

        const decoded = jwt.verify(token,process.env.JWT_SECRET);

        const user = await User.findById(decoded.id).select("-password");
        if(!user){
            return res.status(400).json({
                success: false,
                message: "Invalid token"
            });
        }

        req.user = user;
        next();
        
    }catch(err){
        console.log("Error in verifyToken middleware " , err);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}