import React, { useState, useEffect, useRef } from "react";
import {
  IconButton,
  TextField,
  Paper,
  Tooltip,
  CircularProgress,
} from "@mui/material";
import { Send, Star, Share2, Copy, Download, HelpCircle, Scale } from "lucide-react";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import Picker from '@emoji-mart/react';
import emojiData from '@emoji-mart/data'; // Import the emoji data

const QUICK_QUESTIONS = [
  { text: "📜 What are my legal rights?" },
  { text: "📖 Explain constitutional basics" },
  { text: "⚖️ How does the court system work?" },
  { text: "📝 Legal document assistance" },
];

function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showCursor, setShowCursor] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    fetchInitialMessages();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Blinking cursor effect
  useEffect(() => {
    let cursorInterval;
    if (typing) {
      cursorInterval = setInterval(() => {
        setShowCursor((prev) => !prev);
      }, 500); // blink every 500ms
    }
    return () => clearInterval(cursorInterval);
  }, [typing]);

  const fetchInitialMessages = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/chatbot");
      if (!response.ok) throw new Error("Failed to fetch messages");
      const data = await response.json();
  
      // Directly set messages without simulating typing
      const loadedMessages = data.map((msg) => ({
        text: msg.text,
        sender: "ai",
      }));
      setMessages(loadedMessages);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };
  
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
  
      if (data && data.bot) {
        const botResponse = data.bot.text; // Access the 'text' property from the bot response
  
        // Check if the bot response text is a string and not empty
        if (typeof botResponse === 'string' && botResponse.trim() !== "") {
          await simulateTyping(botResponse);
        } else {
          console.error("API response bot text is not a valid string:", botResponse);
          setTyping(false);
        }
      } else {
        console.error("API response is empty or malformed:", data);
        setTyping(false);
      }
    } catch (error) {
      console.error("Chatbot API Error:", error);
      setTyping(false);
    }
  };
  
  
  
  const handleEmojiSelect = (emoji) => {
    // Handle emoji selection logic here
    console.log("Selected emoji:", emoji);
    // Optionally, send the emoji as part of the message or handle it separately
  };
  
    
  const simulateTyping = (fullText, isInitial = false) => {
    return new Promise((resolve) => {
      if (!fullText || typeof fullText !== "string") {
        console.error("simulateTyping received invalid data:", fullText);
        setTyping(false);
        resolve();
        return; // Exit early if the fullText is invalid
      }
  
      setMessages((prev) => {
        const lastMessage = prev[prev.length - 1];
        if (lastMessage?.sender === "ai_typing") {
          return [...prev.slice(0, -1), { text: fullText, sender: "ai" }];
        }
        return [...prev, { text: fullText, sender: "ai" }];
      });
  
      if (!isInitial) setTyping(false);
      resolve();
    });
  };

  
  

  const renderMessageText = (message) => {
    const isTyping = message.sender === "ai_typing";
    return (
      <>
        {message.text}
        {isTyping && showCursor && <span className="animate-blink">|</span>}
      </>
    );
  };

  return (
    <div className="flex flex-col w-full max-w-screen-2xl text-white bg-slate-900 h-screen mx-auto rounded-lg shadow-lg overflow-hidden space-y-4 ml-80 relative">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <Scale className="w-8 h-8 text-blue-300" />
        <h1 className="text-2xl font-bold tracking-tight">Legal Assistant Bot</h1>
      </div>

      {/* Quick Questions */}
      <div className="bg-slate-800 p-4 rounded-xl shadow-lg mb-6">
        <h2 className="text-gray-400 text-sm mb-3 font-semibold">Quick Questions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {QUICK_QUESTIONS.map((q, idx) => (
            <button
              key={idx}
              onClick={() => sendMessage(q.text)}
              className="bg-slate-700 hover:bg-slate-600 rounded-lg px-3 py-2 text-sm text-left transition-transform transform hover:scale-105"
            >
              {q.text}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 bg-slate-900 rounded-xl shadow-lg space-y-5">
        {messages.map((message, idx) => {
          const isUser = message.sender === "user";
          const isAiTyping = message.sender === "ai_typing";
          return (
            <div
              key={idx}
              className={`flex ${isUser ? "justify-end" : "justify-start"} ${isAiTyping ? "animate-pulse" : "animate-fadeIn"}`}
            >
              <div
                className={`p-4 rounded-2xl max-w-xs md:max-w-md lg:max-w-xl shadow-md ${
                  isUser
                    ? "bg-blue-600 text-white rounded-br-none"
                    : "bg-gray-700 text-gray-300 rounded-bl-none"
                }`}
              >
                <p className="break-words">{renderMessageText(message)}</p>
                <div className="flex gap-2 text-gray-400 text-xs mt-2">
                  <Tooltip title="Star">
                    <IconButton size="small" color="inherit">
                      <Star size={16} />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Share">
                    <IconButton size="small" color="inherit">
                      <Share2 size={16} />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Copy">
                    <IconButton size="small" color="inherit">
                      <Copy size={16} />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Download">
                    <IconButton size="small" color="inherit">
                      <Download size={16} />
                    </IconButton>
                  </Tooltip>
                </div>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Typing Indicator */}
      {typing && (
        <div className="text-center text-sm text-gray-300 mt-3">
          <CircularProgress size={20} color="inherit" />
          <span className="ml-2">AI is typing...</span>
        </div>
      )}

      {/* Input Section */}
      <Paper
        elevation={4}
        className="flex items-center gap-2 p-3 mt-5 rounded-xl bg-slate-800"
      >
        <button
          onClick={() => setShowEmojiPicker((prev) => !prev)}
          className="p-2 text-gray-400 hover:text-yellow-400 transition-colors"
        >
          <InsertEmoticonIcon fontSize="small" />
        </button>

        <TextField
          variant="standard"
          fullWidth
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
          placeholder="Type your message..."
          InputProps={{
            disableUnderline: true,
            className: "text-white placeholder-white px-2",
          }}
          className="bg-gray-200 rounded-lg"
        />

        <Tooltip title="Send">
          <IconButton
            color="primary"
            onClick={() => sendMessage(input)}
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-full"
          >
            <Send size={20} />
          </IconButton>
        </Tooltip>
      </Paper>

      {/* Emoji Picker */}
      {showEmojiPicker && (
        <div className="absolute bottom-24 left-4 z-50">
          <Picker data={data} onEmojiSelect={handleEmojiSelect} theme="dark" />
        </div>
      )}

      {/* Footer */}
      <div className="text-center text-xs text-gray-400 mt-4">
        <HelpCircle size={12} className="inline mr-1" />
        Be careful not to share personal data.
      </div>
    </div>
  );
}

export default Chatbot;
