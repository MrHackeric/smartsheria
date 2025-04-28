import React, { useState, useEffect, useRef } from "react";
import { MessageSquare, Send, Scale, HelpCircle, Star, Share2, Copy, Download } from "lucide-react";

const QUICK_QUESTIONS = [
  { text: "What are my legal rights?" },
  { text: "Explain constitutional basics" },
  { text: "How does the court system work?" },
  { text: "Legal document assistance" },
];

function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/chatbot");
        if (!response.ok) throw new Error("Failed to fetch messages");
        const data = await response.json();
        setMessages(data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (messageText) => {
    const text = messageText || input.trim();
    if (!text) return;

    const userMessage = { text, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setTyping(true);

    try {
      const response = await fetch("http://localhost:5000/api/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, senderId: "1234" }),
      });

      if (!response.ok) throw new Error("Chatbot error");

      const data = await response.json();
      const aiMessage = { text: data.response, sender: "ai" };
      setMessages((prev) => [...prev, aiMessage]);
      setTyping(false);
    } catch (error) {
      console.error("Chatbot API Error:", error);
      setTyping(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-800 via-indigo-600 to-blue-700 text-gray-100 p-4 md:p-6">
      <div className="max-w-4xl mx-auto flex flex-col h-full">
        <div className="flex items-center gap-3 mb-8">
          <Scale className="w-8 h-8 text-blue-400" />
          <h1 className="text-2xl font-semibold">Legal Assistant</h1>
        </div>

        <div className="flex flex-col bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl shadow-xl border border-slate-700 flex-1">
          {/* Quick Questions */}
          <div className="p-4 border-b border-slate-700">
            <h2 className="text-sm font-medium text-gray-400 mb-3">Quick Questions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {QUICK_QUESTIONS.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => sendMessage(q.text)}
                  className="flex items-center gap-2 p-2 text-left text-sm rounded-lg bg-slate-700 hover:bg-slate-600 transition-transform transform hover:scale-105"
                >
                  {q.text}
                </button>
              ))}
            </div>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((message, idx) => {
              const isUser = message.sender === "user";

              return (
                <div
                  key={idx}
                  className={`flex ${isUser ? "justify-end" : "justify-start"} animate-fadeIn`}
                >
                  <div
                    className={`p-4 rounded-lg max-w-xs md:max-w-md lg:max-w-xl shadow-md ${
                      isUser
                        ? "bg-blue-600 text-white rounded-br-none"
                        : "bg-gray-700 text-gray-300 rounded-bl-none"
                    }`}
                  >
                    <div className="flex justify-between text-xs text-gray-400">
                      <span>{new Date().toLocaleTimeString()}</span>
                    </div>
                    <p className="mt-2 break-words">{message.text}</p>
                    <div className="mt-3 flex items-center space-x-3">
                      <button className="text-gray-400 hover:text-yellow-400">
                        <Star className="h-4 w-4" />
                      </button>
                      <button className="text-gray-400 hover:text-blue-400">
                        <Share2 className="h-4 w-4" />
                      </button>
                      <button className="text-gray-400 hover:text-blue-400">
                        <Copy className="h-4 w-4" />
                      </button>
                      <button className="text-gray-400 hover:text-blue-400">
                        <Download className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>

          {/* Typing indicator */}
          {typing && (
            <div className="p-4 text-sm text-gray-400 animate-pulse">
              AI is typing...
            </div>
          )}

          {/* Input Field */}
          <div className="p-4 border-t border-slate-700">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
                placeholder="Type your message..."
                className="flex-1 bg-slate-700 text-gray-100 rounded-lg px-4 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={() => sendMessage(input)}
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg p-2 transition-transform hover:scale-110"
              >
                <Send size={20} />
              </button>
            </div>
            <p className="text-xs text-gray-400 mt-2">
              <HelpCircle size={12} className="inline mr-1" />
              This AI provides general legal information, not legal advice.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chatbot;
