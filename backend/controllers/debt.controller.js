import asyncHandler from "../utilss/asynchandler.js";
import { Debt } from "../models/debt.model.js";
import { ApiError } from "../utilss/ApiError.js";

import { ApiResponse } from "../utilss/ApiResponse.js";




const adddebt = asyncHandler(async (req,res) => {
    

const {name,amount,takenOn,returnOn} = req.body



if(!name){
    throw new ApiError(400,"Name is required")
}

if(!amount){
    throw new ApiError(400,"Amount is required")
}

if(!takenOn){
    throw new ApiError(400,"Date is required")
}

if(!returnOn){
    throw new ApiError(400,"Return date is required")
}


  const newDebt = {
    name,
    amount,
    takenOn: takenOn,
    returnOn: returnOn,
  };


const alreadydebt = await Debt.findOne({user:req.user.email})
if(!alreadydebt){


const debt = await Debt.create({
    user:req.user.email,
    debt:[newDebt]
})


}
else{ await alreadydebt.debts.push(newDebt)
   await alreadydebt.save()
}


return res.status(200).json(new ApiResponse(200,"Debt Added"))




})

const getDebt = asyncHandler(async (req, res) => {
  const debts = await Debt.findOne({ user: req.user.email });

  if (!debts) {
    throw new ApiError(404, "No debt record found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, debts.debts, "Debts fetched")); 
});





const updatedebt = asyncHandler(async (req, res) => {
  const { paid, name,amount } = req.body;

  if (typeof paid !== "boolean" || !name || !amount) {
    throw new ApiError(400, "Paid status and name and amount are required");
  }

  const debtDoc = await Debt.findOne({ user: req.user.email });
  if (!debtDoc) {
    throw new ApiError(404, "No1111`    q    debt record not found");
  }

  const debtToUpdate = debtDoc.debts.find((d) => d.name === name&&d.amount==amount);
  if (!debtToUpdate) {
    throw new ApiError(404, "Debt with provided name not found");
  }

  debtToUpdate.paid = paid;
  await debtDoc.save();

  return res.status(200).json(new ApiResponse(200, "Debt updated"));
});


export {adddebt ,getDebt,updatedebt}