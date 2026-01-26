import { useState } from 'react';
import './App.css'
import ChatbotUI from './ChatBotUI';
import { msgApi } from './api/api';

/**
 res
 └── data        ← Axios puts response body here
     ├── statusCode
     ├── message
     └── data    ← your apiResponse payload
         ├── role
         └── content
 */

function App() {
const[messages, setMessages]=useState([])
const [loading, setLoading] = useState(false);

const sendMessageToServer= async(message)=>{

  if(!message.content.trim() || loading) return;

  const updatedMsgs=[...messages, message];
  setMessages(updatedMsgs);

  try {
    setLoading(true)
    const apiMessages = updatedMsgs.map(({ role, content }) => ({
      role,
      content
    }));
    const res= await msgApi(apiMessages);
    const aiReply= res.data.data;
    const finalReply = {
      role: aiReply.role,      // "assistant"
      content: aiReply.content,
      timestamp: Date.now()
    };
    
    setMessages((prev)=>[...prev, finalReply]);
  } catch (error) {
    setMessages((prev) => [
      ...prev,
      { role: "assistant", content: "Something went wrong. Please try again." }
    ]);
  }
  finally{
    setLoading(false)
  }
} 
  return <ChatbotUI 
  messagesArray={messages} 
  isLoading={false}
  onSendMessage={sendMessageToServer} />;
}

export default App
