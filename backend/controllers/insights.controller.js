import asyncHandler from "../utilss/asynchandler.js";
import { Spends } from "../models/spending.model.js";
import { ApiError } from "../utilss/ApiError.js";
import { ApiResponse } from "../utilss/ApiResponse.js";
import { Budgets } from "../models/budgets.model.js";

function cleanAIResponse(text = "") {
  return text
    .replace(/[*_`~#>-]/g, "")
    .replace(/\n+/g, " ")
    .trim();
}

const saving = asyncHandler(async (req, res) => {
  const { month } = req.body;

  const spending = await Spends.findOne({
    user: req.user.email,
    month,
  });

  if (!spending) {
    throw new ApiError(400, "No Spending for this month is available");
  }

  const totalexpense =
    spending.Groceries.monthlyTotal +
    spending.Rents.monthlyTotal +
    spending.Bills.monthlyTotal +
    spending.Shoppings.monthlyTotal +
    spending.Chilling.monthlyTotal +
    spending.Vehicles.monthlyTotal +
    spending.Fees.monthlyTotal +
    spending.Personal.monthlyTotal +
    spending.Recharge.monthlyTotal +
    spending.Others.monthlyTotal;

  const income = spending.cashinhand;
  const savingAmount = income - totalexpense;

  const promptdata = `
You are a helpful and knowledgeable financial advisor AI.

You will be given:
- The user's monthly income and detailed  totalexpenses for each month and savings details 
- A complete history of their finances over multiple months (each document represents one month)

Your job is to:
- Track progress, patterns, and savings behavior and warn user what could be the future situation if this trend continues.

Here is the user's full financial history of month ${month}:
${JSON.stringify(spending, null, 2)}

Here is the user's saving for this month :
${JSON.stringify(savingAmount, null, 2)}

Here is the user's totalexpense for this month :
${JSON.stringify(totalexpense, null, 2)}

Make sure to:
- Refer to specific months and categories 
- Use actual numbers from the data
- Give a brief suggestion regarding the saving behaviour in 2-3 lines 
 - Give tips to increase saving .


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







  return res.status(200).json(new ApiResponse(200, { totalexpense, saving: savingAmount, aiRaw }, "Savings Fetched"));
});




const spendingtrends = asyncHandler(async (req, res) => {
  const spendingDoc = await Spends.find({
    user: req.user.email,
  });

  if (!spendingDoc) {
    throw new ApiError(400, "No spendingDoc for you exists");
  }

  const promptdata = `
You are a helpful and knowledgeable financial advisor AI.

You will be given:
- The user's monthly income and detailed  monthly expenses
- A complete history of their finances over multiple months (each document represents one month)

Your job is to:
- Analyze their financial trends across months
- Track progress, patterns

Here is the user's full financial history:
${JSON.stringify(spendingDoc, null, 2)}

Make sure to:
- Refer to specific months or categories where relevant
- Use actual numbers from the data
- Explain trends or suggestions clearly and briefly in not more than 2-3 lines
-explain briefly only not more than 2-3 lines
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

  return res.status(200).json(new ApiResponse(200, { spendingDoc, aiRaw }, "Spends Fetched"));
});

const weeklytrend = asyncHandler(async (req, res) => {
  const { month } = req.body;

  const spendingDoc = await Spends.find({
    user: req.user.email,
    month,
  });

  if (!spendingDoc) {
    throw new ApiError(400, "No spendingDoc for you exists");
  }

  const promptdata = `
You are a helpful and knowledgeable financial advisor AI.

You will be given:
- The user's monthly income and detailed  weekly expenses for a each months
- A complete history of their finances over multiple months (each document represents one month)

Your job is to:
- Analyze their financial trends across weeks in a specific month given by user
- Track progress, patterns

Here is the user's full financial history:
${JSON.stringify(spendingDoc, null, 2)}

Here is the month given by the user to analyize
${JSON.stringify(month, null, 2)}

Make sure to:
- Refer to specific week of that month or categories where relevant
- Use actual numbers from the data
- Explain trends or suggestions clearly and briefly in not more than 2-3 lines
-explain briefly only not more than 2-3 lines

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

  return res.status(200).json(new ApiResponse(200, { spendingDoc, aiRaw }, "Spends Fetched"));
});

const cashflow = asyncHandler(async (req,res) => {

const {month} = req.body;  

const expense = await Spends.findOne({user:req.user.email ,month})

if(expense){
    throw new ApiError(400,"Spends already created")
}

const result ={
  monthlyincome:expense.monthlyincome,
  cashinhand:expense.cashinhand,
  cash:expense.cash,
  cashless:expense.cashless

}

const promptdata = `
You are a helpful and knowledgeable financial advisor AI.

You will be given:
- The user's monthly income bifurcation of  the user.
- A complete detail of income like cashinhand ,income in cash and income that is cashless and other relevant details.

Your job is to:
- Analyze their distribution pattern of income
- Track progress, patterns and give advise and warning regarding the distribution so that it will help them grow financially.



Here is the month given by the user to analyize
${JSON.stringify(month, null, 2)}

Here is the user's full income bifurcation
${JSON.stringify(result, null, 2)}


Make sure to:
- Use actual numbers from the data
- Explain trends or suggestions clearly and briefly in not more than 2-3 lines
-explain briefly only not more than 2-3 lines 
- give the best advise to reach the become more financially stable.

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










return res.status(200).json( new ApiResponse(200,{  monthlyincome:expense.monthlyincome,
  cashinhand:expense.cashinhand,
  cash:expense.cash,
  cashless:expense.cashless
,aiRaw},"Cashflow fetched"))

  
})

const budgetinsight = asyncHandler(async (req,res) => {

const {month} = req.body


const budget = await Budgets.findOne({
  user:req.user.email,
  month
})

if(!budget){
  throw new ApiError(500,"No Budget found for the month")
}

  const spendingDoc = await Spends.find({
    user: req.user.email,
    month,
  });

  if (!spendingDoc) {
    throw new ApiError(400, "No spendingDoc for you exists");
  }




  const promptdata = `
You are a helpful and knowledgeable financial advisor AI.

You will be given:
- The user's monthly budget set by the user  and detailed  weekly expenses for a each months
- A complete history of their finances over multiple months (each document represents one month)

Your job is to:

- Analyze their financial trends across weeks in a specific month given by user
- Compare it with budget set by the user
- Track progress, patterns and give advise and warning regarding the spending

Here is the user's full financial history:
${JSON.stringify(spendingDoc, null, 2)}


Here is the month given by the user to analyize
${JSON.stringify(month, null, 2)}

Here is the user's Budget set for the above given month:
${JSON.stringify(budget, null, 2)}


Make sure to:

- Refer to specific week of that month or categories where relevant
- Use actual numbers from the data
- Explain trends or suggestions clearly and briefly in not more than 2-3 lines
-explain briefly only not more than 2-3 lines 
- give the best advise to reach the budget goal

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


return res.status(200).json( new ApiResponse(200,{aiRaw},"Budget fetched"))
  
})


const budgetprediction = asyncHandler(async (req,res) => {




const budget = await Budgets.findOne({
  user:req.user.email,
  
})

if(!budget){
  throw new ApiError(500,"No Budget found for the month")
}

  const spendingDoc = await Spends.find({
    user: req.user.email,
    
  });

  if (!spendingDoc) {
    throw new ApiError(400, "No spendingDoc for you exists");
  }




  const promptdata = `
You are a helpful and knowledgeable financial advisor AI.

You will be given:
- The user's monthly budget set by the user  and detailed  weekly expenses for a each months
- A complete history of their finances over multiple months (each document represents one month)
- Also you will be given a the previous budget set buy the user monthly

Your job is to:
- Analyze their financial trends across weeks in a specific month given by user
- Compare it with budget set by the user
- Track progress, patterns between the spendings and budgets
- Give a prediction of budget for the upcoming month.

Here is the user's full financial history:
${JSON.stringify(spendingDoc, null, 2)}


Here is the user's full budget history:
${JSON.stringify(budget, null, 2)}


Make sure to:
- Refer to specific week of that month or categories where relevant
- Use actual numbers from the data
- Explain trends or suggestions clearly and briefly in not more than 2-3 lines
-explain briefly only not more than 2-3 lines 
- Give the prediction of budget for the upcoming month

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





  const classifypromptdata = `
You are a helpful and knowledgeable financial advisor AI.

You will be given:
- The user's monthly budget set by the user  and detailed  weekly expenses for a each months
- A complete history of their finances over multiple months (each document represents one month)
- Also you will be given a the previous budget set buy the user monthly

Your job is to:
- Analyze their financial trends across weeks in a specific month given by user
- Compare it with budget set by the user
- classify the user's personality in one or two line

Here is the user's full financial history:
${JSON.stringify(spendingDoc, null, 2)}


Here is the user's full budget history:
${JSON.stringify(budget, null, 2)}


Make sure to:
- Refer to specific week of that month or categories where relevant
- Describe the user's spending personality in one line.

`;

  let classifyaiRaw = "AI response not available.";

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



return res.status(200).json( new ApiResponse(200,{aiRaw,classifyaiRaw},"Budget fetched"))
    
})


export { saving, spendingtrends, weeklytrend ,cashflow,budgetinsight,budgetprediction};