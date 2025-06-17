
import { ApiResponse } from "../utilss/ApiResponse.js";
import asyncHandler from "../utilss/asynchandler.js";
import { Spends } from "../models/spending.model.js";
import Razorpay from "razorpay";
import crypto from "crypto";
import { Transaction } from "../models/transaction.model.js";
import { ApiError } from "../utilss/ApiError.js";


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



const recenttransactions = asyncHandler(async (req, res) => {
  const { date } = req.body;

  if (!date) {
    throw new ApiError(400, "Date is required");
  }

  // Create start and end date for the full day
  const start = new Date(date);
  start.setHours(0, 0, 0, 0);

  const end = new Date(date);
  end.setHours(23, 59, 59, 999);

  const transactions = await Transaction.find({
    user: req.user.email,
    dateofpurchase: {
      $gte: start,
      $lte: end,
    },
  });

  return res.status(200).json(new ApiResponse(200, transactions, "Transactions Fetched"));
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



export {createorder,verifyandsavepayment ,recenttransactions, alltransactions}