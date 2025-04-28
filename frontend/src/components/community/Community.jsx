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
  const [messages, setMessages] = useState([]);
  const [filteredMessages, setFilteredMessages] = useState([]);
  const [starredMessages, setStarredMessages] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const messagesEndRef = useRef(null);

  const currentUserId = "currentUserId"; // Replace with actual user ID logic

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [filteredMessages]);

  const fetchMessages = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/communityMessages");
      const data = await response.json();
      setMessages(data);
      setFilteredMessages(data); // Initialize filtered messages
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    const message = {
      text: newMessage,
      senderId: currentUserId, // Use dynamic ID in production
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

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    if (query.trim() === "") {
      setFilteredMessages(messages);
    } else {
      const filtered = messages.filter((message) =>
        message.text.toLowerCase().includes(query)
      );
      setFilteredMessages(filtered);
    }
  };

  return (
    <div className="w-full h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex justify-center items-center p-4 md:p-6">
      <div className="w-full max-w-6xl h-[700px] bg-slate-900 border border-gray-700 rounded-xl shadow-lg flex flex-col">
        
        {/* Header */}
        <div className="bg-slate-800 border-b border-slate-700 p-4 flex items-center justify-between">
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
                value={searchQuery}
                onChange={handleSearch}
                className="w-full bg-slate-700 text-white rounded-full px-4 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {filteredMessages.map((message) => {
            const isCurrentUser = message.senderId === currentUserId;

            return (
              <div
                key={message._id}
                className={`flex ${isCurrentUser ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`p-4 rounded-lg max-w-xs md:max-w-md lg:max-w-xl transition-all duration-200 hover:scale-105 hover:shadow-xl ${
                    isCurrentUser ? "bg-blue-950 text-white" : "bg-slate-800 text-gray-300"
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-400">
                      {new Date(message.timestamp).toLocaleTimeString()}
                    </span>
                  </div>

                  <p
                    className="mt-2 break-words"
                    dangerouslySetInnerHTML={{ __html: formatText(message.text) }}
                  ></p>

                  <div className="mt-3 flex items-center space-x-3">
                    <button
                      className={`transition-colors ${
                        starredMessages.some((msg) => msg.timestamp === message.timestamp)
                          ? "text-yellow-400"
                          : "text-gray-400 hover:text-blue-400"
                      }`}
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

        {/* Input Section */}
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
