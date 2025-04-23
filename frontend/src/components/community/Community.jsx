import React, { useState, useEffect, useRef } from "react";
import { Send, Star, Share2, Download, Copy, Search, Menu } from "lucide-react";
import {
  handleStarMessage,
  handleCopyMessage,
  handleDownloadMessage,
  handleShareMessage,
  formatText,
} from "../../utils/messageUtils";

function Community() {
  const [newMessage, setNewMessage] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const messagesEndRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [starredMessages, setStarredMessages] = useState([]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const fetchMessages = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/communityMessages");
      const data = await response.json();
      setMessages(data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    const message = {
      text: newMessage,
      senderId: "currentUserId", // Replace with actual user ID
    };

    try {
      const response = await fetch("http://localhost:5000/api/communityMessages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(message),
      });

      if (response.ok) {
        fetchMessages();
      } else {
        console.error("Failed to send message");
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }

    setNewMessage("");
  };

  return (
    <div className="w-full h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex justify-center items-center p-4 md:p-6">
      <div className="w-full max-w-6xl h-[700px] bg-slate-900 border border-gray-700 rounded-xl shadow-lg flex flex-col transition-all duration-300 ease-in-out transform hover:scale-105">
        {/* Header */}
        <div className="bg-slate-800 border-b border-slate-700 p-4 flex justify-between items-center">
          <button
            className="md:hidden text-gray-400 hover:text-white"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>
          <div className="flex-1 px-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search discussions..."
                className="w-full bg-slate-700 text-white rounded-full px-4 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto h-[450px] p-6 space-y-4 w-full">
          {messages.map((message) => {
            const isSentByCurrentUser = message.senderId === "currentUserId";
            return (
              <div
                key={message._id}
                className={`flex ${isSentByCurrentUser ? "justify-end" : "justify-start"} transition-all duration-300 ease-in-out transform hover:scale-[1.02]`}
              >
                <div
                  className={`p-4 rounded-lg transition-all duration-200 hover:scale-[1.02] hover:shadow-xl ${
                    isSentByCurrentUser ? "bg-blue-950 text-white" : "bg-slate-800 text-gray-300"
                  } max-w-sm md:max-w-lg lg:max-w-xl`}
                >
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">
                      {new Date(message.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                  <p
                    className="mt-2"
                    dangerouslySetInnerHTML={{ __html: formatText(message.text) }}
                  ></p>
                  <div className="mt-3 flex items-center space-x-4">
                    <button
                      className={`${
                        starredMessages.some((msg) => msg.timestamp === message.timestamp)
                          ? "text-yellow-400"
                          : "text-gray-400 hover:text-blue-400"
                      } transition-colors`}
                      onClick={() => handleStarMessage(message, starredMessages, setStarredMessages)}
                    >
                      <Star className="h-4 w-4" />
                    </button>
                    <button
                      className="text-gray-400 hover:text-blue-400 transition-colors"
                      onClick={() => handleShareMessage(message.text)}
                    >
                      <Share2 className="h-4 w-4" />
                    </button>
                    <button
                      className="text-gray-400 hover:text-blue-400 transition-colors"
                      onClick={() => handleCopyMessage(message.text)}
                    >
                      <Copy className="h-4 w-4" />
                    </button>
                    <button
                      className="text-gray-400 hover:text-blue-400 transition-colors"
                      onClick={() => handleDownloadMessage(message.text)}
                    >
                      <Download className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="bg-slate-800 border-t border-slate-700 p-4">
          <div className="flex items-center space-x-4">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Share your legal expertise..."
              className="flex-1 bg-slate-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSendMessage();
              }}
            />
            <button
              onClick={handleSendMessage}
              className="bg-blue-500 text-white rounded-lg p-2 hover:bg-blue-600 transition-colors"
            >
              <Send className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Community;
