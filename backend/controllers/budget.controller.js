import { Budgets } from "../models/budgets.model.js";
import { Spends } from "../models/spending.model.js";
import { ApiError } from "../utilss/ApiError.js";
import { ApiResponse } from "../utilss/ApiResponse.js";
import asyncHandler from "../utilss/asynchandler.js";




const setbudget = asyncHandler(async (req,res) => {

const {savingtarget , monthlybudget, description, month,Groceries,Rents,Bills,Shoppings,Chilling,Vehicles,Fees,Personal,Recharge,Others
}  = req.body;  

const spends = await Spends.findOne({
  user:req.user.email,
  month
})

const cashinhand = spends.cashinhand;

if(monthlybudget>cashinhand){
  throw new ApiError(400,"The monthly budget is exceeding your available balance for the month")
}

if(savingtarget>monthlybudget){
  throw new ApiError(400,"Your savings can not be more than your budget")
}



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



 const promptdata = `
You are a helpful and knowledgeable financial advisor AI.

You will be given:
- The user's monthly budget set by the user  and  for a each months


Your job is to:

- Analyze each document given for each  specific month given by user
- Prepare a nice notes of it and provide it to the user to show him his plans
- The note should have each point covered like the monthly budget amount category wise distribution and there priority and etc.



Here is the month given by the user to analyize
${JSON.stringify(month, null, 2)}

Here is the user's Budget set for the above given month:
${JSON.stringify(userbudget, null, 2)}


Make sure to:

- Refer to specific week of that month or categories where relevant
- Use actual numbers from the data
- give the best notes of budget to the user

`;

  let aiRaw = "AI response not available.";

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.GROQAPI}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama3-70b-8192",
        messages: [
          { role: "system", content: "You are a helpful and knowledgeable financial advisor AI." },
          { role: "user", content: promptdata },
        ],
      }),
    });

    const result = await response.json();
    if (result?.choices?.[0]?.message?.content) {
      aiRaw = cleanAIResponse(result.choices[0].message.content);
    }
  } catch (error) {
    console.error("AI call failed:", error.message);
  }




return res.status(200).json( new ApiResponse(200,{aiRaw},"Budget Fetched"))


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