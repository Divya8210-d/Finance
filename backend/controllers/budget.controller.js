import { Budgets } from "../models/budgets.model";
import { ApiError } from "../utilss/ApiError";
import { ApiResponse } from "../utilss/ApiResponse";
import asyncHandler from "../utilss/asynchandler";




const setbudget = asyncHandler(async (req,res) => {

const {savingtarget , monthlybudget, description, month,Groceries,Rents,Bills,Shoppings,Chilling,Vehicles,Fees,Personal,Recharge,Others
}  = req.body;  


//validation daalna hai 

const budget = await Budgets.create({
    user:req.user.email,
    savingtarget ,
     monthlybudget,
      description,
       month,
       Groceries,
       Rents,
       Bills,
       Shoppings,
       Chilling,
       Vehicles,
       Fees,
       Personal,
       Recharge,
       Others
})

if(!budget){
    throw new ApiError(500,"Something went wrong while saving budget")
}



return res.status(200).json( new ApiResponse(200,"Budget Saved"))



})

const getBudgetmonthly = asyncHandler(async (req,res) => {
    
    const {month} =req.body

    const userbudget = await Budgets.findOne({
        user:req.user.email,
        month
    })
    
if(!userbudget){
    throw new ApiError(500,"No budgets found for this month")
}


return res.status(200).json( new ApiResponse(200,{userbudget},"Budget Fetched"))


})


const getallBudget = asyncHandler(async (req,res) => {
    
    

    const userbudget = await Budgets.find({
        user:req.user.email,
        
    })
    
if(!userbudget){
    throw new ApiError(500,"No budgets found for the user")
}


return res.status(200).json( new ApiResponse(200,{userbudget},"Budgets Fetched"))


})



export {setbudget,getBudgetmonthly,getallBudget}