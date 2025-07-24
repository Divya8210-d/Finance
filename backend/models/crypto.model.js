import mongoose, { Schema } from "mongoose";


const cryptosschema = new Schema({
    cryptoname:{
        type:String,
        required:true,
    },
    symbol:{
        type:Number,
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
    }
})


export const Crypto = mongoose.model("Crypto",Crypto)