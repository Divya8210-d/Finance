

import jwt from "jsonwebtoken"
import { User } from "../models/user.model.js";

import { ApiError } from "../utilss/ApiError.js";



const verify = async (req,_,next) => {
    try {
          const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")
        

if(!token){
    throw new ApiError(400,"Invalid request")
}


const decodedtoken =  jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)


const user = await User.findById(decodedtoken?._id).select("-password -refreshToken")

if(!user){
      throw new ApiError(400,"Invalid user")
}


req.user = user
next()



    } catch (error) {
         throw new ApiError(401, error?.message || "Invalid access token")
    }
}




export default verify