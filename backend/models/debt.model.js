import mongoose, { Schema } from "mongoose";


const debtSchema = new Schema({

    user:{
        type:String
    },
  debts: [
    {  
        paid:{type:Boolean,default:false},
      name: { type: String, required: true },     
      amount: { type: Number, required: true },
      takenOn: { type: Date, required: true },
      returnOn: { type: Date, required: true },
    },
  ],




})


export  const Debt = new mongoose.model("Debt",debtSchema)