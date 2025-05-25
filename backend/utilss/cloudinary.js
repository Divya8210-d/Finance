import {v2 as cloudinary} from "cloudinary"

import fs from "fs"


cloudinary.config({ 
  cloud_name: "dad2siqxd", 
  api_key:"536451132511988", 
  api_secret:"DMVARFmi3Mbn9Z_BoyJnoPY3kmg"
});



const uploadprofile = async (profilelocalpath) => {
   try {

    if(!profilelocalpath) return null
    const profileresult = await cloudinary.uploader.upload(profilelocalpath)
fs.unlinkSync(profilelocalpath)
return profileresult

    
   } catch (error) {
    fs.unlinkSync(profilelocalpath)
    return null
   } 



}

export default uploadprofile