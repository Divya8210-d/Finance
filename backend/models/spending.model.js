import mongoose, { Schema } from "mongoose";
//const Model = mongoose.model('Test', schema);

//const doc = new Model();
const spendingSchema = new Schema({
    user:{
        type:String,
        required:true
    },
month:{
    type:String,
},
monthlyincome:{
    type:Number,
    required:true
},
cashinhand:{
  tyep:Number,
  required:true,
},
cash:{
    type:Number,
    required:true
},
cashless:{
    type:Number,
    required:true
},
assests:{
    type:Number,
    required:true
},




//expenses

Groceries:{
     weekly: {
    type: [Number],
    default: [0, 0, 0, 0], 
    validate: [arr => arr.length === 4, 'Weekly array must have 4 entries']
  },
    monthlyTotal: {
      type: Number,
      default: 0
    }
},
Rents:{
     weekly: {
    type: [Number],
    default: [0, 0, 0, 0], 
    validate: [arr => arr.length === 4, 'Weekly array must have 4 entries']
  },
    monthlyTotal: {
      type: Number,
      default: 0
    }
},
Bills:{
   weekly: {
    type: [Number],
    default: [0, 0, 0, 0], 
    validate: [arr => arr.length === 4, 'Weekly array must have 4 entries']
  },
    monthlyTotal: {
      type: Number,
      default: 0
    }
},
Shoppings:{
   weekly: {
    type: [Number],
    default: [0, 0, 0, 0], 
    validate: [arr => arr.length === 4, 'Weekly array must have 4 entries']
  },
    monthlyTotal: {
      type: Number,
      default: 0
    }
},
Chilling:{
 weekly: {
    type: [Number],
    default: [0, 0, 0, 0], 
    validate: [arr => arr.length === 4, 'Weekly array must have 4 entries']
  },
    monthlyTotal: {
      type: Number,
      default: 0
    }
},
Vehicles:{
  weekly: {
    type: [Number],
    default: [0, 0, 0, 0], 
    validate: [arr => arr.length === 4, 'Weekly array must have 4 entries']
  },
    monthlyTotal: {
      type: Number,
      default: 0
    }
},
Fees:{
 weekly: {
    type: [Number],
    default: [0, 0, 0, 0], 
    validate: [arr => arr.length === 4, 'Weekly array must have 4 entries']
  },
    monthlyTotal: {
      type: Number,
      default: 0
    }
},
Personal:{
   weekly: {
    type: [Number],
    default: [0, 0, 0, 0], 
    validate: [arr => arr.length === 4, 'Weekly array must have 4 entries']
  },
    monthlyTotal: {
      type: Number,
      default: 0
    }
},
Recharge:{
 weekly: {
    type: [Number],
    default: [0, 0, 0, 0], 
    validate: [arr => arr.length === 4, 'Weekly array must have 4 entries']
  },
    monthlyTotal: {
      type: Number,
      default: 0
    }
},
Others:{
   weekly: {
    type: [Number],
    default: [0, 0, 0, 0], 
    validate: [arr => arr.length === 4, 'Weekly array must have 4 entries']
  },
    monthlyTotal: {
      type: Number,
      default: 0
    }
}




})


  export const Spends = new mongoose.model("Spending",spendingSchema);