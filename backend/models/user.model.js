import mongoose, { Schema ,model} from "mongoose";
import  bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const userSchema = new Schema({
    fullname:{
        type:String,
        required:true,
        

    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true

    },
    profile:{
        type:String
    },
    refreshToken: {
  type: String
}

})



userSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next();
  
    this.password = await bcrypt.hash(this.password, 10)
    next()
  })

  userSchema.methods.isPasswordCorrect =async function (password) {
   return await bcrypt.compare(password,this.password)

  }




userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            fullName: this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}






  export const User = new mongoose.model("User",userSchema);