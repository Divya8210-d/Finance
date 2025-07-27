import mongoose, { Schema } from "mongoose";


const cryptosschema = new Schema({
    user:{
        type:String,
        required:true
    },

    cryptoname:{
        type:String,
        required:true,
    },
    symbol:{
        type:String,
        required:true,
    },
    purchaseDate:{
        type:Date,
        required:true
    },
    purchasePrice:{
        type:Number,
        required:true
    },
    quantity:{
        type:Number,
        required:true
    },
    currentValue:{
        type:String,
    }
})


export const Crypto = mongoose.model("Crypto",Crypto)