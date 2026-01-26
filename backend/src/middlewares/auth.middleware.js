import { User } from "../models/user.model";
import apiError from "../utils/apiError";
import jwt from 'jsonwebtoken'
import asyncHandler from "../utils/asyncHandler";


export const verifyJWT= asyncHandler(async(req,res,next)=>{
    const token= req.cookies?.accessToken;

    if(!token){
        throw new apiError(401, "unauthorised request");
    }

    const decodedToken= await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    if(!decodedToken) {
        throw new apiError(401, "Token is invalid or expired");
    }

    const user=await User.findById(decodedToken._id).select("-password -refreshToken");

    if (!user) {
        throw new apiError(401, "User no longer exists");
    }

    req.user=user;
    next();
})