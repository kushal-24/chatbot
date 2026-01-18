import Groq from "groq-sdk";
import "dotenv/config";
import asyncHandler from "../utils/asyncHandler.js";
import apiError  from "../utils/apiError.js"
import apiResponse from "../utils/apiResponse.js"

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

// system instruction stays fixed
const SYSTEM_PROMPT = {
    role: "system",
    content:
        `You are a DSA oriented chatbot. You answer questions only related to DSA. If the question is not related to DSA, reply that you 
    can't process the request right now.`,
};

const chatController = asyncHandler(async(req, res, next) => {
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
        return apiError(400, "Messages array is required");
    }
    const finalMessages = [SYSTEM_PROMPT, ...messages];

    const response = await groq.chat.completions.create({
        model: "llama-3.1-8b-instant",
        messages: finalMessages,
    });

    const aiReply = response.choices[0].message.content;
    
    const payLoad= {
        role: "assistant",
        content: aiReply,
    }
    return res
    .status(200)
    .json(
        new apiResponse(payLoad, 201, "Message is posted")
    )
}
)

export default chatController;
