import asyncHandler from "../utilss/asynchandler.js";

import { ApiError } from "../utilss/ApiError.js";

import { ApiResponse } from "../utilss/ApiResponse.js";





const gst = asyncHandler(async (req,res) => {
    
const {amount ,gstrate,type} = req.body
//validation checking
if(!amount){
    throw new ApiError(400,"Amount is Required")
}
if(!gstrate){
    throw new ApiError(400,"Required a standard gst rate ")
}
if(!type){
    throw new ApiError(400,"Type of gst is required")
}

if(type=="Exclusive"){const gstamount = (gstrate/100)*amount
    return res.status(200).json(new ApiResponse(200,gstamount,"Fetched gst"))
    
}

if(type=="Inclusive"){const gstamount = (gstrate/(100+gstrate))*amount
    return res.status(200).json(new ApiResponse(200,gstamount,"Fetched gst"))
    
}




})




const emi = asyncHandler(async (req,res) => {
    
const {loanamount , rate, tenure} =req.body
//validation checking
if(!loanamount){
    throw new ApiError(400,"Amount is Required")
}
if(!rate){
    throw new ApiError(400,"Required a interest rate ")
}
if(!tenure){
    throw new ApiError(400,"Tenure of loan is required")
}

const r = rate/1200;

//power chadane ke liye Math.pow ka use kar sakte hain
 const emi = (loanamount * r * Math.pow(1 + r, tenure)) /
              (Math.pow(1 + r, tenure) - 1);



//SAME FOR HOME AND  LOAN BIUS FRONTEND SE TENURE YR ME LENGE CAHA LAGEGA
//Same for Gold loan bus loanamount =(Weight × Rate × Purity %) × LTV%
//same for carloan bas loan amount = roadside amount - downpayment





return res.status(200).json(new ApiResponse(200,emi,"Fetched EMI"))


})





const fdmatureamount = asyncHandler(async (req, res) => {
  const { principalamount, rate, tenure, compounded } = req.body;

  if (!principalamount) {
    throw new ApiError(400, "Amount is Required");
  }
  if (!compounded) {
    throw new ApiError(400, "Frequency is Required");
  }
  if (!rate) {
    throw new ApiError(400, "Interest rate is required");
  }
  if (!tenure) {
    throw new ApiError(400, "Tenure of loan is required");
  }

  // Define compounding frequencies per year
  const compoundingMap = {
    yearly: 1,
    halfyearly: 2,
    quarterly: 4,
    monthly: 12,
    weekly: 52,
    daily: 365,
  };

  const n = compoundingMap[compounded.toLowerCase()];
  if (!n) {
    throw new ApiError(400, "Invalid compounding frequency");
  }

  const principal = parseFloat(principalamount);
  const r = parseFloat(rate) / 100;
  const t = parseFloat(tenure);

  const maturityAmount = principal * Math.pow(1 + r / n, n * t);

  return res
    .status(200)
    .json(new ApiResponse(200, { maturedAmount: maturityAmount.toFixed(2) }, "Fetched Maturity Amount"));
});



const creditCardPayoff = asyncHandler(async (req, res) => {
  const {
    outstandingBalance,
    annualInterestRate,
    minimumMonthlyPayment,
    fixedMonthlyPayment,
    monthlyPaymentType // "Minimum" or "Fixed"
  } = req.body;

  // Validation
  if (outstandingBalance == null || outstandingBalance <= 0) {
    throw new ApiError(400, "Outstanding Balance is required and must be positive");
  }
  if (annualInterestRate == null || annualInterestRate <= 0) {
    throw new ApiError(400, "Annual Interest Rate is required and must be positive");
  }
  if (!monthlyPaymentType || !["Minimum", "Fixed"].includes(monthlyPaymentType)) {
    throw new ApiError(400, "Monthly Payment Type is required: 'Minimum' or 'Fixed'");
  }

  // Determine monthly payment amount
  let monthlyPayment;
  if (monthlyPaymentType === "Minimum") {
    if (minimumMonthlyPayment == null || minimumMonthlyPayment <= 0) {
      throw new ApiError(400, "Minimum Monthly Payment is required and must be positive");
    }
    monthlyPayment = minimumMonthlyPayment;
  } else if (monthlyPaymentType === "Fixed") {
    if (fixedMonthlyPayment == null || fixedMonthlyPayment <= 0) {
      throw new ApiError(400, "Fixed Monthly Payment is required and must be positive");
    }
    monthlyPayment = fixedMonthlyPayment;
  }

  // Monthly interest rate decimal
  const monthlyRate = annualInterestRate / 12 / 100;

  let balance = outstandingBalance;
  let totalInterestPaid = 0;
  let months = 0;

  // Safety to avoid infinite loop if payment <= interest
  if (monthlyPayment <= balance * monthlyRate) {
    throw new ApiError(400, "Monthly payment is too low to cover interest. Debt will never be paid off.");
  }

  // Loop until balance is paid off
  while (balance > 0) {
    // Interest for the month
    const interestForMonth = balance * monthlyRate;
    totalInterestPaid += interestForMonth;

    // Principal payment this month
    const principalPayment = monthlyPayment - interestForMonth;

    // Reduce balance
    balance = balance - principalPayment;

    // If balance falls below 0, set to zero
    if (balance < 0) balance = 0;

    months++;

    // Safety break: max 600 months (50 years)
    if (months > 600) {
      throw new ApiError(400, "Calculation took too long, please check input values.");
    }
  }

  // Return result
  return res.status(200).json(new ApiResponse(200, {
    monthsToPayoff: months,
    totalInterestPaid: totalInterestPaid.toFixed(2),
    totalAmountPaid: (outstandingBalance + totalInterestPaid).toFixed(2),
    monthlyPayment: monthlyPayment
  }, "Credit Card Debt Payoff Calculated"));
});




export {gst,emi,fdmatureamount,creditCardPayoff}

