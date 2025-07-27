import mongoose, { Schema } from "mongoose";


const goldschema = new Schema({
      user:{
        type:String,
        required:true
    },

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
    currentValue:{
        type:Number,
        
    },
    Pricepergram:{
        type:Number,
        required:true
    }
})


export const Gold = mongoose.model("Gold",goldschema)