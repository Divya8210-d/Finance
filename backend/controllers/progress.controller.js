import asyncHandler from "../utilss/asynchandler.js";
import { Spends } from "../models/spending.model.js";
import { ApiError } from "../utilss/ApiError.js";
import { ApiResponse } from "../utilss/ApiResponse.js";
import parseAiResponse from "../utilss/parse.js";

const track = asyncHandler(async (req, res) => {
  const { messages } = req.body;

  const data = await Spends.find({ user: req.user.email }).sort({ month: 1 });

  if (!data || data.length === 0) {
    throw new ApiError(400, "No expense data found");
  }

  const financialContext = `
Here is the user's full financial history:
${JSON.stringify(data, null, 2)}

Use this data and also use the real world data to compare and answer all future questions.
`;

  const chatMessages = [
    { role: "system", content: "You are a helpful and knowledgeable financial advisor AI." },
    { role: "user", content: financialContext },
    ...messages
  ];

  let response;
  try {
    response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.GROQAPI}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "llama3-70b-8192",
        messages: chatMessages
      })
    });
  } catch (err) {
    console.error("Fetch error:", err);
    throw new ApiError(500, "Failed to connect to Groq API");
  }

  const result = await response.json();
  if (!result.choices || !result.choices[0]?.message?.content) {
    throw new ApiError(500, "No response from AI");
  }

  const aiRaw = result.choices[0].message.content;
  const displayanswer = parseAiResponse(aiRaw);

  return res.status(200).json(new ApiResponse(200, displayanswer, "AI responded"));
});

export { track };
