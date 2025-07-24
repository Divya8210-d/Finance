import mongoose, { Schema } from "mongoose";


const goldschema = new Schema({
    goldType:{
        type:String,
        required:true,
    },
    quantity:{
        type:Number,
        required:true,
    },
    purchaseDate:{
        type:Date,
        required:true
    },
    currentvalue:{
        type:Number,
        
    },
    Pricepergram:{
        type:Number,
        required:true
    }
})


export const Gold = mongoose.model("Gold",goldschema)