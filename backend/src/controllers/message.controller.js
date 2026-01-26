import { Message } from "../models/message.model.js";
import { Conversation } from "../models/conversation.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import Groq from "groq-sdk";

const SYSTEM_PROMPT = {
    role: "system",
    content:
        `You are a DSA oriented chatbot. You answer questions only related to DSA. If the question is not related to DSA, reply that you 
    can't process the request right now.`,
};

const sendChatMessage = asyncHandler(async (req, res) => {
    let { conversationId, content } = req.body;
    const userId = req.user._id;
  
    if (!content) {
      throw new apiError(400, "Message content is required");
    }

    if (!conversationId) {
      const conversation = await Conversation.create({
        user: userId,
        title: "New Chat",
      });
      conversationId = conversation._id;
    }

    const previousMessages = await Message.find({conversation: conversationId,}).sort({ createdAt: 1 }).limit(10)

  
    const finalMessages = [SYSTEM_PROMPT,
        ...previousMessages.map((msg)=>({
            role: msg.role,
            content: msg.content
        })),
        {
            role: "user",
            content,
        },
    ];
    
    const response = await Groq.chat.completions.create({
        model: "llama-3.1-8b-instant",
        messages: finalMessages,
    });
    
    const aiReply = response.choices[0].message.content;

    const [userMsg, assistantMsg]= await Message.insertMany([ //something new to learn
        {
            conversation: conversationId,
            role: "user",
            content,
        },
        {
            conversation: conversationId,
            role: "assistant",
            content: aiReply
        }
    ])

    await Conversation.findByIdAndUpdate(conversationId, {
        updatedAt: new Date(),
      });

    return res.status(200).json(
        new apiResponse(
          {
            conversationId,
            userMsg,
            assistantMsg,
          },
          200,
          "Message sent successfully"
        )
    )
});

const editMessage= asyncHandler(async(req,res,next)=>{
  const{msgId}= req.params;

  const{content}= req.body;

  const message= Message.findById(msgId);

  if(!content){
    throw new apiError(400, "no input content recieved");
  }

  if(!message){
    throw new apiError(403, "coudnt find message with this id")
  }

  message.content=content;
  await message.save();

  return res.status(200).json(
    new apiResponse(
        {
            newMessage: message.content,
        },
        200,
        "message edited successfully"
    )
);

})
  
  export { 
    sendChatMessage,
    editMessage,
  };
  