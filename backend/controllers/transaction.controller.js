
import { ApiResponse } from "../utilss/ApiResponse.js";
import asyncHandler from "../utilss/asynchandler.js";
import { Spends } from "../models/spending.model.js";
import Razorpay from "razorpay";
import crypto from "crypto";


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
    amount,       
    weekIndex       
  } = req.body;

  const expectedSignature = crypto
    .createHmac("sha256","chjX8jr5CjsvwapgeZuSYkmd")
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest("hex");

  if (expectedSignature !== razorpay_signature) {
    return res.status(400).json(new  ApiResponse(400, "Invalid signature"));
  }


  const validCategories = [
    "groceries", "rents", "bills", "shoppings", "chilling",
    "vehicles", "fees", "personal", "recharge", "others"
  ];

  if (!validCategories.includes(category)) {
    return res.status(400).json(new ApiResponse(400, "Invalid category"));
  }

  
  if (weekIndex < 0 || weekIndex > 3) {
    return res.status(400).json(new ApiResponse(400, "Invalid week index"));
  }

  const spendingDoc = await Spends.findOne({user:req.user.email ,month})

  if (!spendingDoc) {
    return res.status(404).json(new ApiResponse(404, "Spending record not found"));
  }

const parsedAmount = parseFloat(amount);
if (isNaN(parsedAmount) || parsedAmount <= 0) {
  return res.status(400).json(new ApiResponse(400, "Invalid amount"));
}

  spendingDoc[category].weekly[weekIndex] += parsedAmount;
  spendingDoc[category].monthlyTotal += parsedAmount;

  await spendingDoc.save();

  res.status(200).json(new ApiResponse(200, "Payment verified and spending updated"));
});



export {createorder,verifyandsavepayment}