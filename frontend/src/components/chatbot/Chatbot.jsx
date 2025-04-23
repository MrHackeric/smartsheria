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
  const [starredMessages, setStarredMessages] = useState([]);
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

    const messageData = { text, sender: "user" };
    setMessages((prev) => [...prev, messageData]);
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
      setMessages((prev) => [...prev, { text: data.response, sender: "ai" }]);
      setTyping(false);
    } catch (error) {
      console.error("Chatbot API Error:", error);
      setTyping(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-800 via-indigo-600 to-blue-700 text-gray-100 p-4 md:p-6 transition-all duration-300 ease-in-out">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-8 animate__animated animate__fadeIn">
          <Scale className="w-8 h-8 text-blue-400 animate__animated animate__fadeIn" />
          <h1 className="text-2xl font-semibold">Legal Assistant</h1>
        </div>

        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl shadow-xl border border-slate-700">
          <div className="p-4 border-b border-slate-700">
            <h2 className="text-sm font-medium text-gray-400 mb-3">Quick Questions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 animate__animated animate__fadeIn">
              {QUICK_QUESTIONS.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => sendMessage(q.text)}
                  className="flex items-center gap-2 p-2 text-left text-sm rounded-lg bg-slate-700 hover:bg-slate-600 transition-all duration-300 ease-in-out transform hover:scale-105"
                >
                  {q.text}
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto h-[450px] p-6 space-y-4 w-full">
            {messages.map((message) => {
              const isSentByCurrentUser = message.sender === "user";
              return (
                <div
                  key={message._id || message.text}
                  className={`flex ${isSentByCurrentUser ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`p-4 rounded-lg transition-all duration-200 hover:scale-[1.02] hover:shadow-xl ${
                      isSentByCurrentUser ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-300"
                    } max-w-sm md:max-w-lg lg:max-w-xl animate__animated animate__fadeIn`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">
                        {new Date().toLocaleTimeString()}
                      </span>
                    </div>
                    <p className="mt-2">{message.text}</p>
                    <div className="mt-3 flex items-center space-x-4">
                      <button className="text-gray-400 hover:text-yellow-400 transition-colors">
                        <Star className="h-4 w-4" />
                      </button>
                      <button className="text-gray-400 hover:text-blue-400 transition-colors">
                        <Share2 className="h-4 w-4" />
                      </button>
                      <button className="text-gray-400 hover:text-blue-400 transition-colors">
                        <Copy className="h-4 w-4" />
                      </button>
                      <button className="text-gray-400 hover:text-blue-400 transition-colors">
                        <Download className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 border-t border-slate-700">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
                placeholder="Type your message..."
                className="flex-1 bg-slate-700 text-gray-100 rounded-lg px-4 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ease-in-out"
              />
              <button
                onClick={() => sendMessage(input)}
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg p-2 transition-colors duration-200 flex items-center justify-center transform hover:scale-110"
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
