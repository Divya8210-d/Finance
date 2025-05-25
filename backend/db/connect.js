import mongoose from "mongoose";



const connectDB=    async function connect(params) {
    
try {
   await mongoose.connect(`${process.env.MONGODB_URI}`)
    console.log("DB CONNECTED");
    
    
} catch (error) {
    console.log("Something went wrong",error);
    
}



}


export default connectDB