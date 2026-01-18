import './App.css'
import ChatbotUI from './ChatBotUI';

const sendMessageToServer=(message)=>{

}

function App() {
  const sampleMessages = [
    {
      id: "1",
      role: "assistant",
      content: "Hello! How can I assist you today?",
      timestamp: new Date(Date.now() - 300000),
    },
    {
      id: "2",
      role: "user",
      content: "Can you help me understand how this chatbot UI works?",
      timestamp: new Date(Date.now() - 240000),
    },
    {
      id: "3",
      role: "assistant",
      content:
        "Of course! This is a modern chatbot interface designed with a clean, professional look. It features message bubbles, avatars, timestamps, and a responsive input area. The UI is built with React and Tailwind CSS for a smooth user experience.",
      timestamp: new Date(Date.now() - 180000),
    },
  ];
  
  return <ChatbotUI 
  messagesArray={sampleMessages} 
  isLoading={false}
  onSendMessage={sendMessageToServer} />;
}

export default App
