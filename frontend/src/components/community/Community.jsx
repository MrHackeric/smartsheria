import React, { useState, useEffect, useRef } from "react";
import { Send, Star, Share2, Download, Copy, Reply, Search } from "lucide-react";
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
  const [replyTo, setReplyTo] = useState(null);
  const messagesEndRef = useRef(null);

  const currentUserId = "currentUserId"; // Replace with real user ID

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
      setFilteredMessages(data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    const message = {
      text: replyTo ? `Replying to "${replyTo.text}": ${newMessage}` : newMessage,
      senderId: currentUserId,
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
    setReplyTo(null);
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
    <div className="flex flex-col w-full max-w-screen-2xl h-screen mx-auto bg-slate-900 rounded-lg shadow-lg overflow-hidden space-y-4 ml-80">

      {/* Header */}
      <div className="flex items-center justify-between bg-slate-900 px-6 py-4 border-b">
        <h2 className="text-xl font-semibold text-white">Community Chat</h2>
        <div className="relative w-1/2">
          <input
            type="text"
            placeholder="Search messages..."
            value={searchQuery}
            onChange={handleSearch}
            className="w-full pl-10 pr-4 py-2 rounded-full bg-gray-200 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-500" />
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6 bg-slate-900">
        {filteredMessages.length > 0 ? (
          filteredMessages.map((message) => {
            const isCurrentUser = message.senderId === currentUserId;
            return (
              <div
                key={message._id}
                className={`flex ${isCurrentUser ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`relative p-4 rounded-2xl max-w-md shadow-sm break-words ${
                    isCurrentUser ? "bg-blue-600 text-white rounded-br-none" : "bg-gray-700 text-gray-300 rounded-bl-none"
                  }`}
                >
                  {/* Timestamp */}
                  <div className="text-xs text-gray-50 mb-2 text-right">
                    {new Date(message.timestamp).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>

                  {/* Message Text */}
                  <div
                    className="text-sm whitespace-pre-wrap break-words"
                    dangerouslySetInnerHTML={{ __html: formatText(message.text) }}
                  ></div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-3 mt-3">
                    <button
                      className={`hover:text-yellow-400 ${
                        starredMessages.some((msg) => msg.timestamp === message.timestamp)
                          ? "text-yellow-400"
                          : "text-gray-400"
                      }`}
                      onClick={() => handleStarMessage(message, starredMessages, setStarredMessages)}
                    >
                      <Star className="h-4 w-4" />
                    </button>
                    <button
                      className="text-gray-400 hover:text-white"
                      onClick={() => setReplyTo(message)}
                    >
                      <Reply className="h-4 w-4" />
                    </button>
                    <button
                      className="text-gray-400 hover:text-white"
                      onClick={() => handleShareMessage(message.text)}
                    >
                      <Share2 className="h-4 w-4" />
                    </button>
                    <button
                      className="text-gray-400 hover:text-white"
                      onClick={() => handleCopyMessage(message.text)}
                    >
                      <Copy className="h-4 w-4" />
                    </button>
                    <button
                      className="text-gray-400 hover:text-white"
                      onClick={() => handleDownloadMessage(message.text)}
                    >
                      <Download className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-gray-400 text-center mt-20">
            No messages yet. Start the conversation!
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t bg-white px-6 py-4">
        {replyTo && (
          <div className="mb-2 p-2 bg-gray-100 rounded-lg flex items-center justify-between">
            <span className="text-sm text-gray-700">
              Replying to: {replyTo.text.slice(0, 30)}...
            </span>
            <button
              className="text-gray-500 hover:text-red-500"
              onClick={() => setReplyTo(null)}
            >
              Cancel
            </button>
          </div>
        )}
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
            placeholder="Type your message..."
            className="flex-1 bg-gray-100 text-gray-800 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={handleSendMessage}
            className="bg-blue-500 hover:bg-blue-600 text-white rounded-full p-3"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Community;
