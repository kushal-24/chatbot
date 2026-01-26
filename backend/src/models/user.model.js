import mongoose from 'mongoose'
import { Schema } from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const userSchema= new Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    pfp: {
        type: String,
    },
    password: {
        type: String,
        required: function () {
            return this.authProvider === "local";
        },
    },
    authProvider: {
        type: String,
        enum: ["local", "google"],
        default: "local",
    },
    googleId: {
        type: String,
    },
    history: {
        type: String,
        default: []
    },
},{timestamps: true}) 

userSchema.pre("save", async function(){
    if(!this.isModified("password")) return;

    this.password= bcrypt.hash(this.password, 10);
})

userSchema.methods.isPassCorrect= async function(password){
    return await bcrypt.compare(password, this.password);
}

userSchema.methods.generateAccessToken= async function(){
    return jwt.sign(
        {
            _id: this._id,
            fullName: this.fullName,
            email: this.email
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
        },
    )
}

userSchema.methods.generateRefreshToken= async function(){
    return jwt.sign(
        {
            _id: this._id,
            fullName: this.fullName,
            email: this.email
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
        },
    )
}

export const User= mongoose.model(User, userSchema);