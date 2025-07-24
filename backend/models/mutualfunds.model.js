import mongoose, { Schema } from "mongoose";


const mutualfundsschema = new Schema({
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
    currentvalue:{
        type:Number,
    
    }
})


export const MutualFund = mongoose.model("MutualFunds",mutualfundsschema)