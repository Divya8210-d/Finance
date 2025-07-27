import mongoose, { Schema } from "mongoose";


const stocksschema = new Schema({
      user:{
        type:String,
        required:true
    },

    stocksymbol:{
        type:String,
        required:true,
    },
    numberofShares:{
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
    buyPrice:{
        type:Number,
        required:true
    }
})


export const Stocks = mongoose.model("Stocks",stocksschema)