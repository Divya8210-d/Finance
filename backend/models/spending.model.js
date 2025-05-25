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
//expenses

groceries:{
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
rents:{
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
bills:{
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
shoppings:{
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
chilling:{
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
vehicles:{
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
fees:{
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
personal:{
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
recharge:{
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
others:{
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