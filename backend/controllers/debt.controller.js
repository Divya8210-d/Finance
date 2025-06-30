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
  const { paid, id } = req.body;

  if (typeof paid !== "boolean"  || !id) {
    throw new ApiError(400, "Paid status and name and amount are required");
  }

  const debtDoc = await Debt.findOne({ user: req.user.email });
  if (!debtDoc) {
    throw new ApiError(404," debt record not found");
  }

  const debtToUpdate = debtDoc.debts.find((d) => d._id==id);
  if (!debtToUpdate) {
    throw new ApiError(404, "Debt  not found");
  }

  debtToUpdate.paid = paid;
  await debtDoc.save();

  return res.status(200).json(new ApiResponse(200, "Debt updated"));
});


const filtereddebts = asyncHandler(async (req,res) => {

const {status}= req.body;

if(status==""){
  throw new ApiError(400,"Status of Debt is required.")

}

const debtDoc = await Debt.findOne({ user: req.user.email });

if(!debtDoc){
  throw new ApiError(500,"No debts records found")
}


if(status=="Paid"){

const paiddebts = await debtDoc.debts.filter((d)=>
  d.paid==true
)

if(paiddebts.length==0){
  throw new ApiError(500,"No paid debts found")
}


return res.status(200).json( new ApiResponse(200,paiddebts,"Fetched paid debts"))

}

else if(status=="All"){
  const debts = await debtDoc.debts

if(debts.length==0){
  throw new ApiError(500,"No  debts found")
}


return res.status(200).json( new ApiResponse(200,debts,"Fetched paid debts"))
}

else{

const unpaiddebts = await debtDoc.debts.filter((d)=>
  d.paid==false

)

if(unpaiddebts.length==0){
  throw new ApiError(500,"No unpaid debts found")
}


return res.status(200).json( new ApiResponse(200,unpaiddebts,"Fetched unpaid debts"))

}


})




const removeDebt = asyncHandler(async (req, res) => { //important concept sikhe yahan se finbyidand delete model paer lagta hai array par nhi
  const { id } = req.body;
                          // yeh bhi kar sakte hain  debt.debts = debt.debts.filter(d => d._id.toString() !== id);
  if (!id) {
    throw new ApiError(400, "Debt selection is required");
  }

  // Find the user's debt document
  const debt = await Debt.findOne({
    user: req.user.email,
  });

  if (!debt) {
    throw new ApiError(500, "No debt records of user found");
  }

  // Find the subdocument by ID and remove it
  const subDebt = debt.debts;

  subDebt =  await subDebt.filter((d)=>
  d._id!=id

)

  // Save the parent document after removing the subdocument
  await debt.save();

  return res.status(200).json(ApiResponse(200, subDebt, "Debt Deleted"));
});


export {adddebt ,getDebt,updatedebt,filtereddebts,removeDebt}