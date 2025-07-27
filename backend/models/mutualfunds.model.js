import mongoose, { Schema } from "mongoose";


const mutualfundsschema = new Schema({
      user:{
        type:String,
        required:true
    },

    fundname:{
        type:String,
        required:true,
    },
    investmentAmount:{
        type:Number,
        required:true,
    },
    investmentDate:{
        type:Date,
        required:true
    },
    currentNavValue:{
        type:Number,
    
    }
})


export const MutualFund = mongoose.model("MutualFunds",mutualfundsschema)