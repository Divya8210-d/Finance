import asyncHandler from "../utilss/asynchandler.js";
import { Spends } from "../models/spending.model.js";
import { ApiError } from "../utilss/ApiError.js";
import { ApiResponse } from "../utilss/ApiResponse.js";

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
- Track progress, patterns, and savings behavior

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

export { saving, spendingtrends, weeklytrend };