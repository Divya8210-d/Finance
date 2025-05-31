

import asyncHandler from "../utilss/asynchandler.js";
import { Spends } from "../models/spending.model.js";
import { ApiError } from "../utilss/ApiError.js";

import { ApiResponse } from "../utilss/ApiResponse.js";

import parseAiResponse from "../utilss/parse.js";


const track = asyncHandler(async (req,res) => {
    const {question} = req.body
console.log("Request body:", req.body);


const data = await Spends.find({user:req.user.email}).sort({ month: 1 })//if empty returns []

if(!data || data.length === 0){
    throw new ApiError(400,"No expense data found")
}
console.log(data);


const promptdata = `
You are a helpful and knowledgeable financial advisor AI.

You will be given:
- The user's monthly income and detailed weekly + monthly expenses
- A complete history of their finances over multiple months (each document represents one month)

Your job is to:
- Analyze their financial trends across months
- Track progress, patterns, and savings behavior
- Answer user questions about budgeting, category-wise spending, and suggestions for improvement

Here is the user's full financial history:
${JSON.stringify(data, null, 2)}

Now answer this user question in detail:
${question}

Make sure to:
- Refer to specific months or categories where relevant
- Use actual numbers from the data
- Explain trends or suggestions clearly
`;


let response;
try {
  response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.GROQAPI}`,
      "Content-Type": "application/json"
    },
        body: JSON.stringify({
      model: "llama3-70b-8192",
      messages: [
        { role: "system", content: "You are a helpful and knowledgeable financial advisor AI." },
        { role: "user", content: promptdata }
      ]
    })
  });
  console.log("Headers:", {
  Authorization: `Bearer ${process.env.GROQAPI}`,
  "Content-Type": "application/json"
});
} catch (err) {
  console.error("Network or fetch error:", err);
  throw new ApiError(500, "Failed to send request to Groq API");
}


const result = await response.json();
console.log("Loaded Groq API Key:", process.env.GROQAPI);
console.log(result);



if (!result.choices || !result.choices[0]?.message?.content) {

  throw new ApiError(500, "Failed to get a  response from the AI.");
}

const aiRaw = result.choices[0].message.content;


const displayanswer = parseAiResponse(aiRaw)



return res.status(200).json(new ApiResponse(200,displayanswer,"Ai responded"))


})


export {track}