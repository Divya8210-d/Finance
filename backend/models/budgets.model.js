import mongoose, { Schema } from "mongoose";


const budgetSchema = new Schema(
    {

 user:{
    type:String,
    required:true,
 },
 month:{
    type:String,
    required:true
 },
 monthlybudget:{
    type:Number,
    required:true,
 },
 savingtarget:{
    type:Number,
    required:true,
 },
 Groceries:{
   allocation: {
    type: Number,
  
  },
    priority: {
      type: Number,
      default: 0
    }

},
Rents:{
    allocation: {
    type: Number,
  
  },
    priority: {
      type: Number,
      default: 0
    }

},
Bills:{
   allocation: {
    type: Number,
  
  },
    priority: {
      type: Number,
      default: 0
    }

},
Shoppings:{
   allocation: {
    type: Number,
  
  },
    priority: {
      type: Number,
      default: 0
    }

},
Chilling:{
   allocation: {
    type: Number,
  
  },
    priority: {
      type: Number,
      default: 0
    }

},
Vehicles:{
   allocation: {
    type: Number,
  
  },
    priority: {
      type: Number,
      default: 0
    }

},
Fees:{
   allocation: {
    type: Number,
  
  },
    priority: {
      type: Number,
      default: 0
    }

},
Personal:{
    allocation: {
    type: Number,
  
  },
    priority: {
      type: Number,
      default: 0
    }

},
Recharge:{
   allocation: {
    type: Number,
  
  },
    priority: {
      type: Number,
      default: 0
    }
}
,
Others:{
   allocation: {
    type: Number,
  
  },
    priority: {
      type: Number,
      default: 0
    }
},
description:{
    type:String,
    required:true
}} 
)

 export const Budgets = new mongoose.model("Budget",budgetSchema);