import { useState, useSyncExternalStore } from "react";
import { Send, Bot, User, Moon, Sun } from "lucide-react";

function ChatbotUI({
  messagesArray,
  onSendMessage,
  isLoading = false,
}) {
  const [isDark, setIsDark] = useState(false);
  const [message,setMessage]=useState("")

  const handleSubmit = (e) => {
    e.preventDefault();
    //const formData = new FormData(e.currentTarget); //store all form's data inside form with input;'s name attrobute as key
    const payload= {
      role: "user",
      content: message,
      timestamp: Date.now()
    }
    if (message.trim() && onSendMessage) {
      onSendMessage(payload);
    }
    setMessage("");
  };

  return (
    <div
      className={`flex flex-col h-screen max-h-screen transition-colors duration-300 ${
        isDark
          ? "bg-linear-to-br from-slate-950 to-slate-900"
          : "bg-linear-to-br from-slate-50 to-slate-100"
      }`}>
      {/* Header */}
      <div
        className={`border-b px-6 py-4 shadow-sm transition-colors duration-300 ${
          isDark
            ? "bg-slate-900 border-slate-800"
            : "bg-white border-slate-200"
        }`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-linear-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1
                className={`text-xl font-semibold ${
                  isDark ? "text-white" : "text-slate-800"
                }`}
              >
                AI Assistant
              </h1>
              <p
                className={`text-sm ${
                  isDark ? "text-slate-400" : "text-slate-500"
                }`}
              >
                Always here to help
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsDark(!isDark)}
            className={`p-2 rounded-lg ${
              isDark
                ? "bg-slate-800 hover:bg-slate-700 text-yellow-400"
                : "bg-slate-200 hover:bg-slate-300 text-slate-600"
            }`}
          >
            {isDark ? <Sun className="w-5 h-5 cursor-pointer" /> : <Moon className="w-5 h-5 cursor-pointer" />}
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
        {messagesArray.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center px-4">
            <div
              className={`w-20 h-20 rounded-full flex items-center justify-center mb-4 ${
                isDark
                  ? "bg-linear-to-br from-blue-900 to-cyan-900"
                  : "bg-linear-to-br from-blue-100 to-cyan-100"
              }`}
            >
              <Bot
                className={`w-10 h-10 ${
                  isDark ? "text-cyan-400" : "text-blue-600"
                }`}
              />
            </div>
            <h2
              className={`text-2xl font-semibold mb-2 ${
                isDark ? "text-white" : "text-slate-800"
              }`}
            >
              Welcome!
            </h2>
            <p
              className={`max-w-md ${
                isDark ? "text-slate-400" : "text-slate-600"
              }`}
            >
              Start a conversation by typing your message below.
            </p>
          </div>
        ) : (
          messagesArray.map((message) => (
            <div
              key={message._id}
              className={`flex gap-3 ${
                message.role === "user" ? "flex-row-reverse" : ""
              }`}
            >
              {/* Avatar */}
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  message.role === "user"
                    ? "bg-linear-to-br from-emerald-500 to-teal-500"
                    : "bg-linear-to-br from-blue-500 to-cyan-500"
                }`}>
                {message.role === "user" ? (
                  <User className="w-5 h-5 text-white" />
                ) : (
                  <Bot className="w-5 h-5 text-white" />
                )}
              </div>

              {/* Bubble */}
              <div
                className={`flex flex-col max-w-[75%] ${
                  message.role === "user" ? "items-end" : "items-start"
                }`}>
                <div
                  className={`px-4 py-3 rounded-2xl ${
                    message.role === "user"
                      ? "bg-linear-to-br from-emerald-500 to-teal-500 text-white"
                      : isDark
                      ? "bg-slate-800 text-slate-100 border border-slate-700"
                      : "bg-white text-slate-800 border border-slate-200"
                  }`}>
                  <p className="text-sm whitespace-pre-wrap">
                    {message.content}
                  </p>
                </div>
                <span
                  className={`text-xs mt-1 ${
                    isDark ? "text-slate-500" : "text-slate-400"
                  }`}>
                  {new Date(message.timestamp).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            </div>
          ))
        )}

        {isLoading && (
          <div className="flex gap-3">
            <Bot className="w-8 h-8 text-blue-500" />
            <div className="flex gap-1">
              <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" />
              <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-150" />
              <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-300" />
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div
        className={`border-t px-4 py-4 ${
          isDark
            ? "bg-slate-900 border-slate-800"
            : "bg-white border-slate-200"
        }`}
      >
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto flex gap-3">
          <textarea
            name="message"
            value={message}
            placeholder="Type your message..."
            onChange={(e)=>setMessage(e.target.value)}
            className={`flex-1 px-4 py-3 rounded-xl resize-none outline-none transition
              ${isDark
                ? "bg-slate-800 text-slate-100 placeholder-slate-400 border border-slate-700 focus:border-blue-500"
                : "bg-white text-slate-900 placeholder-slate-500 border border-slate-300 focus:border-blue-500"
              }`}          />
          <button
            type="submit"
            disabled={isLoading}
            className="w-12 h-12 hover:bg-blue-500/90 cursor-pointer bg-blue-500 text-white rounded-xl flex items-center justify-center">
            <Send />
          </button>
        </form>
      </div>
    </div>
  );
}

export default ChatbotUI;