
import { ApiResponse } from "../utilss/ApiResponse.js";
import asyncHandler from "../utilss/asynchandler.js";
import { Spends } from "../models/spending.model.js";
import Razorpay from "razorpay";
import crypto from "crypto";
import { Transaction } from "../models/transaction.model.js";
import { ApiError } from "../utilss/ApiError.js";
import { Budgets } from "../models/budgets.model.js";


const razorpay = new Razorpay({
  key_id:"rzp_test_W5q6dvRFx7DDty",
  key_secret:"chjX8jr5CjsvwapgeZuSYkmd"
});

const createorder = asyncHandler(async (req, res) => {
  const options = {
    amount: req.body.amount,
    currency: "INR",
    receipt: "receipt_order_" + Date.now()
  };

  try {
    const order = await razorpay.orders.create(options);
    console.log("Razorpay Order", order);
    res.status(200).json( new ApiResponse(200,order))
  } catch (err) {
    res.status(500).json( new ApiResponse(500,"Error occured"));
  }
}) 



const verifyandsavepayment = asyncHandler(async (req, res) => {
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    month,
    category,
    mode,       
    amount,
    date,       
    weekIndex       
  } = req.body;

  const expectedSignature = crypto
    .createHmac("sha256","chjX8jr5CjsvwapgeZuSYkmd")
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest("hex");

  if (expectedSignature !== razorpay_signature) {
    return res.status(400).json(new  ApiResponse(400, "Invalid signature"));
  }


  const validCategories =[
  'Groceries', 'Rents', 'Bills', 'Shoppings',
  'Chilling', 'Vehicles', 'Fees', 'Personal',
  'Recharge', 'Others'
];


  if (!validCategories.includes(category)) {
    return res.status(400).json(new ApiResponse(400, "Invalid category"));
  }

  
  if (weekIndex < 0 || weekIndex > 3) {
    return res.status(400).json(new ApiResponse(400, "Invalid week index"));
  }

  const spendingDoc = await Spends.findOne({user:req.user.email ,month})
  const transactionDoc =await Transaction.findOne({user:req.user.email ,amount,mode,category,date})
    if (transactionDoc) {
    return res.status(404).json(new ApiResponse(404, "Payment has already being done"));
  }

  if (!spendingDoc) {
    return res.status(404).json(new ApiResponse(404, "Spending record not found"));
  }

const transaction = await  Transaction.create({
    user:req.user.email,
    category:category,
    mode:mode,
    amount:amount,
    dateofpurchase:new Date(date)


})


const parsedAmount = parseFloat(amount);
if (isNaN(parsedAmount) || parsedAmount <= 0) {
  return res.status(400).json(new ApiResponse(400, "Invalid amount"));
}

  spendingDoc[category].weekly[weekIndex] += parsedAmount;
  spendingDoc[category].monthlyTotal += parsedAmount;

  await spendingDoc.save();

  res.status(200).json(new ApiResponse(200, "Payment verified and spending updated"));
});




const alltransactions   = asyncHandler(async (req,res) => {



  const transacDoc = await Transaction.find({
    user:req.user.email
  })

if(!transacDoc){
  throw new ApiError(500,"No Transactions Available for this user")
}

return res.status(200).json(new ApiResponse(200,transacDoc,"Transactions Fetched"))

  
})






const cashpayment = asyncHandler(async (req,res) => {
  
const {  month,category,mode, amount, date, weekIndex} = req.body;

if(!month||!category||!mode||!amount||!date||weekIndex){
  throw new ApiError(400,"All fields are required");
}


const validCategories =[
  'Groceries', 'Rents', 'Bills', 'Shoppings',
  'Chilling', 'Vehicles', 'Fees', 'Personal',
  'Recharge', 'Others'
];


  if (!validCategories.includes(category)) {
    return res.status(400).json(new ApiResponse(400, "Invalid category"));
  }

  
  if (weekIndex < 0 || weekIndex > 3) {
    return res.status(400).json(new ApiResponse(400, "Invalid week index"));
  }

  const spendingDoc = await Spends.findOne({user:req.user.email ,month})
  const transactionDoc =await Transaction.findOne({user:req.user.email ,amount,mode,category,date})
    if (transactionDoc) {
    return res.status(404).json(new ApiResponse(404, "Payment has already being done"));
  }

  if (!spendingDoc) {
    return res.status(404).json(new ApiResponse(404, "Spending record not found"));
  }

const transaction = await  Transaction.create({
    user:req.user.email,
    category:category,
    mode:mode,
    amount:amount,
    dateofpurchase:new Date(date)


})


const parsedAmount = parseFloat(amount);
if (isNaN(parsedAmount) || parsedAmount <= 0) {
  return res.status(400).json(new ApiResponse(400, "Invalid amount"));
}

  spendingDoc[category].weekly[weekIndex] += parsedAmount;
  spendingDoc[category].monthlyTotal += parsedAmount;

  await spendingDoc.save();




 res.status(200).json(new ApiResponse(200, "Payment verified and spending updated"));



})

//is waale api me important concepts hain

const transacsuggestion = asyncHandler(async (req, res) => {
  const userId = req.user.email;

  // Get start and end of current month
  const startOfMonth = new Date();
  startOfMonth.setDate(1);
  startOfMonth.setHours(0, 0, 0, 0);

  const endOfMonth = new Date(startOfMonth);
  endOfMonth.setMonth(endOfMonth.getMonth() + 1);

  // Get month name only (e.g., "July")
  const currentMonthName = startOfMonth.toLocaleString("default", {
    month: "long",
  });

  // Fetch current month's transactions
  const transacDoc = await Transaction.find({
    user: userId,
    dateofpurchase: { $gte: startOfMonth, $lt: endOfMonth },
  });

  if (transacDoc.length === 0) {
    throw new ApiError(500, "No transaction records found for this month.");
  }

  // Fetch budget using only the month name
  const budget = await Budgets.findOne({
    user: userId,
    month: currentMonthName, // e.g., "July"
  });

  if (!budget) {
    throw new ApiError(500, "No budget is set for the current month.");
  }

  const classifypromptdata = `
You are a highly experienced AI financial advisor.

You are given:
- A list of all the user's transactions for the current month. Each has a category, amount, and date and mode of transaction.
- A budget for the current month with category-wise spending limits (called "allocations") and their importance ("priority").
- A total monthly budget and a saving target.

Your job is to:
1. Compare actual spending in each category to the allocated budget.
2. Highlight overspending in any category.
3. Identify any unnecessary spending in low-priority areas.
4. Suggest at least 3 actionable improvements to reduce spending and increase savings.
5. Provide smart warnings about future risks or trends.
6. End with a one-line classification of their spending personality (e.g., "Disciplined", "Reckless", etc.)

--- USER TRANSACTIONS ---
${JSON.stringify(transacDoc, null, 2)}

--- USER BUDGET FOR ${currentMonthName} ---
${JSON.stringify(budget, null, 2)}
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
          {
            role: "system",
            content: "You are a helpful and knowledgeable financial advisor AI.",
          },
          {
            role: "user",
            content: classifypromptdata,
          },
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

  res.status(200).json({
    success: true,
    message: "Transaction-based financial suggestion generated.",
    aiRaw,
  });
});



export {createorder,verifyandsavepayment ,cashpayment, alltransactions,transacsuggestion}