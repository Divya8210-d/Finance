import asyncHandler from "../utilss/asynchandler.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utilss/ApiError.js";
import uploadprofile from "../utilss/cloudinary.js";
import { ApiResponse } from "../utilss/ApiResponse.js";
import { Spends } from "../models/spending.model.js";






const register = asyncHandler(async (req, res) => {



    const { fullname, email, password } = req.body

    if (fullname == "") {
        throw new ApiError(400, "Your name is required")
    }
    if (email == "") {
        throw new ApiError(400, "Your email is required")
    }
    if (password == "") {
        throw new ApiError(400, "Your password is required")
    }

    const alreadyuser = await User.findOne({ email: email })

    if (alreadyuser) {
        return res.status(400).json({message:"USER alreday exists"})
    }

    const profilelocalpath = req.files?.profile[0]?.path;

    console.log("Profile Path:", profilelocalpath);

    if (!profilelocalpath) {
        throw new ApiError(400, "Profile file is required")
    }



    const uploading = await uploadprofile(profilelocalpath)
    console.log("Uploading to Cloudinary:", uploading);
    if (!uploading) {
        throw new ApiError(400, "Profile Required")
    }




    const userDetail = await User.create({
        fullname,
        email,
        password,
        profile: uploading.url
    })


    const createdUser = await User.findById(userDetail._id).select(
        "-password"
    )


    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user")
    }



    return res.status(200).json(
        new ApiResponse(200, createdUser, "User registered Successfully")

    )



})




const generateAccessAndRefereshTokens = async (user_id) => {
    
const user = await User.findById(user_id)
if(!user){
    throw new ApiError(400,"Invalid User")
}

const accessToken= await user.generateAccessToken()
const refreshToken = await user.generateRefreshToken()


return {accessToken,refreshToken}






}





















const login = asyncHandler(async (req, res) => {


   const {email,  password} = req.body
   console.log(email)

    if (email == "") {
        throw new ApiError(400, "Your email is required")
    }
    if (password == "") {
        throw new ApiError(400, "Your password is required")
    }

    const user = await User.findOne({ email: email })// $or: [{username}, {email}]


    if (!user) {
        throw new ApiError(400, "No User Found")
    }

    const checkpassword = user.isPasswordCorrect(password)


    if (!checkpassword) {
        throw new ApiError(400, "Invalid Password")
    }

    const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(user._id) //curley bracket use karke jo return karega wo hum log aise lesakte hain .karke bhi lesakte hain lekin isko destructuing bolte hain

    const loggedUser = await User.findById(user._id).select("-password -refreshToken")

    const options = {      //jab bhi cookie bhejna ho yeh important hai or fixed hai format
        httpOnly: true,
            secure: true,        
    sameSite: "None" 
    }


 return res.status(200)
 .cookie("accessToken", accessToken, options)
 .cookie("refreshToken", refreshToken, options)
 .json( new ApiResponse(200,{

      user: loggedUser, accessToken, refreshToken
 },"User logged in successfully"))


}
)

const logout = asyncHandler(async (req,res) => {
    
      await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset: {
                refreshToken: 1 // this removes the field from document
            }
        },
        {
            new: true
        }
    )

    const options = {
        httpOnly: true,
        secure: true,        
    sameSite: "None" 
    }

    return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged Out"))


})


const deleteaccount =asyncHandler(async (req ,res) => {
    


    const deleted =    await User.findOneAndDelete({email:req.user.email})//return deleted document
    const deletespend = await Spends.findOneAndDelete({user:req.user.email})

if(!deleted&&!deletespend){
    throw new ApiError(400,"Something went wrong while deleting account")
}
    const options = {
        httpOnly: true,
        secure: false
    }


return res.status(200)
.clearCookie("accessToken", options)
.clearCookie("refreshToken", options)
.json(new ApiResponse(200,{},"Account deleted"))



})



const profilefetch = asyncHandler(async (req,res) => {
    

const user = await  User.findOne({email:req.user.email})

if(!user){
    throw new ApiError(400,"Error fetching user")
}



res.status(200).json(new ApiResponse(200,{
    fullname:user.fullname,
    profile:user.profile

},"Profile fetched successfully"))


})


const edit = asyncHandler(async (req,res) => {
    
const {fullname} = req.body
if(fullname==""){ throw new ApiError(400, "Your name is required")

}

    const profilelocalpath = req.files?.profile[0]?.path;

    

    if (!profilelocalpath) {
        throw new ApiError(400, "Profile file is required")
    }



    const uploading = await uploadprofile(profilelocalpath)

    if (!uploading) {
        throw new ApiError(400, "Profile Required")
    }




const update = await User.findOneAndUpdate({email:req.user.email},{
    fullname ,
    profile:uploading.url
})


return res.status(200).json(new ApiResponse(200,"User updated"))


})



export {register,login,logout ,deleteaccount,profilefetch,edit}