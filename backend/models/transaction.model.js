import mongoose, { Schema } from "mongoose";

const trnsactionSchema = new Schema(
{ user:{
    type:String,
    required:true
},

mode:{
    type:String,
    required:true


},



category:{
    type:String,
    required:true
},
amount:{
    type:String,
    required:true
},
dateofpurchase:{
    type:Date,
    required:true
}



}

)



export  const Transaction = new mongoose.model("Transaction",trnsactionSchema)