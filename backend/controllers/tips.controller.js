import asyncHandler from "../utilss/asynchandler.js";
import { Spends } from "../models/spending.model.js";
import { ApiError } from "../utilss/ApiError.js";

import { ApiResponse } from "../utilss/ApiResponse.js";



const givetips = asyncHandler(async (req,res) => {
    
const {ques1,ques2,ques3,ques4,ques5,ques6,ques7,ques8,ques9,ques10} =req.body;

const spends = await Spends.findOne({user:req.user.email})



const userAnswers={
age:`${ques1}`,
dependents:`${ques2}`,
monthlyincome:`${400000}`,
goal:`${ques3}`,
risktolerance:`${ques4}`,
monthlyInvestmentCapacity:`${ques5}`,
pastinvestments:`${ques6}`,
longTermLockInComfort:`${ques7}`,
importance:`${ques8}`,
returnpreference:`${ques9}`,
investmentHorizon:`${ques10}`



}


const prompt = `
You are a financial advisor AI. Given the user's answers below, first classify them into one of the following investment types:
- Conservative
- Moderate
- Aggressive

Then, based on their classification, give 15 personalized investment tips.
And please always give tips.


User data:
${JSON.stringify(userAnswers, null, 2)}


Respond in this format:
Classification: <category>

Tips:
1. ...
2. ...
3. ...

`;




const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
  method: "POST",
  headers: {
    "Authorization": `Bearer ${process.env.GROQAPI}`,
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
model: "llama3-70b-8192",
    messages: [
      { role: "system", content: "You are a smart financial advisor AI." },
      { role: "user", content: prompt }
    ]
  })
});



const result = await response.json();


if (!result.choices || !result.choices[0]?.message?.content) {

  throw new ApiError(500, "Failed to get a  response from the AI.");
}

const aiRaw = result.choices[0].message.content;

//parsing

let classification = aiRaw.match(/\*\*(Conservative|Moderate|Aggressive)\*\*/i);


if (!classification) {
  classification = aiRaw.match(/(Conservative|Moderate|Aggressive)/i);
}


classification = classification ? classification[1] : "Unknown";


const tips = [];
const tipMatches = aiRaw.match(/\d\.\s\*\*(.*?)\*\*:(.*?)\n/g);

if (tipMatches) {
  for (const match of tipMatches) {

    let cleaned = match
      .replace(/\d\.\s\*\*/, '')    
      .replace(/\*\*:/, ':')        
      .replace(/\n/g, ' ')         
      .trim();                     
    tips.push(cleaned);
  }
}

const parsed = {
  classification,
  tips
};





return res.status(200).json(new ApiResponse(
  200,
  parsed,
  "AI responded successfully"
));









})
export {givetips}