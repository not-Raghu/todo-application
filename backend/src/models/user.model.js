import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    }
},{ timestamps:true });

export const User = mongoose.model("User", userSchema);
