import asyncHandler from "../utilss/asynchandler.js";
import { Spends } from "../models/spending.model.js";
import { ApiError } from "../utilss/ApiError.js";

import { ApiResponse } from "../utilss/ApiResponse.js";



const addexpense = asyncHandler(async (req,res) => {
    

const {month,monthlyincome,cashinhand,cash,cashless,assests,Groceries,Rents,Bills,Shoppings,Chilling,Vehicles,Fees,Personal,Recharge,Others}
=req.body;
console.log("Incoming Expense Data:", req.body);

if(!monthlyincome){
    throw new ApiError(400,"Monthlyincome is required")
}

const expense = await Spends.findOne({user:req.user.email ,month})

if(expense){
    throw new ApiError(400,"Spends already created")
}


//baaki fieLd ka validation hum frontend me dekh lenge
 const add = await Spends.create({ user:req.user.email,month,cashinhand,cash,cashless,assests,
monthlyincome,Groceries,Rents,Bills,Shoppings,Chilling,Vehicles,Fees,Personal,Recharge,Others
 })


return res.status(200).json(new ApiResponse(200,{user:req.user.fullname,add},"Expenses saved"))


})


const updateexpense = asyncHandler(async (req, res) => {
  const {
    month,cashinhand,
    cash,
    cashless,
    assests,
    monthlyincome,
    Groceries,
    Rents,
    Bills,
    Shoppings,
    Chilling,
    Vehicles,
    Fees,
    Personal,
    Recharge,
    Others,
    
  } = req.body;
console.log("Incoming Expense Data:", req.body);

  const existing = await Spends.findOne({ user: req.user.email, month });

  if (!existing) {
    throw new ApiError(400, "No spendings available to update. Please add the spending sheet first.");
  }

  const allCategories = {
    Groceries,
    Rents,
    Bills,
    Shoppings,
    Chilling,
    Vehicles,
    Fees,
    Personal,
    Recharge,
    Others,

  };

  const updatePayload = {};

  for (const [category, data] of Object.entries(allCategories)) {
    if (!data || !Array.isArray(data.weekly)) continue;

    const currentWeekly = existing[category]?.weekly || [0, 0, 0, 0];
    const newWeekly = data.weekly;

    const updatedWeekly = currentWeekly.map((val, i) => val + (newWeekly[i] || 0));
    const monthlyTotal = updatedWeekly.reduce((sum, val) => sum + val, 0);

    updatePayload[`${category}.weekly`] = updatedWeekly;
    updatePayload[`${category}.monthlyTotal`] = monthlyTotal;
  }

  const updated = await Spends.findOneAndUpdate(
    { user: req.user.email, month },
    { $set: updatePayload , monthlyincome},
    { new: true }
  );

  return res.status(200).json(
    new ApiResponse(200, { updated }, "Expenses updated successfully.")
  );
});




export {addexpense,updateexpense}