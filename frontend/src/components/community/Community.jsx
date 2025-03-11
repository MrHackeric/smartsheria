import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import { FaPaperPlane, FaStar, FaCopy, FaDownload, FaShareAlt } from 'react-icons/fa';
import {
  handleStarMessage,
  handleCopyMessage,
  handleDownloadMessage,
  handleShareMessage,
  formatText,
} from '../../utils/messageUtils'; // Ensure this file contains the utility functions

const socket = io('http://localhost:5000'); // Adjust for your backend

function Community() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [userId, setUserId] = useState(localStorage.getItem('userId') || Date.now());
  const [starredMessages, setStarredMessages] = useState([]);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    localStorage.setItem('userId', userId);
    fetchMessages();
    socket.on('message', (message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      socket.off('message');
    };
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/communityMessages');
      const data = await response.json();
      setMessages(data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;
    const messageData = {
      text: input,
      senderId: userId,
      timestamp: new Date().toISOString(),
    };

    socket.emit('message', messageData);
    setInput('');
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="h-screen w-full flex flex-col bg-gray-900 text-white">
      <div className="p-4 bg-blue-700 text-center text-2xl font-bold shadow-md">Community Chat</div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg, index) => {
          const isUser = msg.senderId === userId;
          const isStarred = starredMessages.some((m) => m.timestamp === msg.timestamp);
          return (
            <div key={index} className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-lg p-4 rounded-lg shadow-md relative ${isUser ? 'bg-blue-600' : 'bg-gray-800'}`}>
                <p dangerouslySetInnerHTML={{ __html: formatText(msg.text) }} />
                <small className="block text-xs mt-1 text-gray-400">
                  {new Date(msg.timestamp).toLocaleTimeString()}
                </small>
                
                {/* Action Buttons */}
                <div className="flex space-x-2 mt-2 text-gray-300 text-sm">
                  <button onClick={() => handleStarMessage(msg, starredMessages, setStarredMessages)}>
                    <FaStar className={`${isStarred ? 'text-yellow-400' : 'text-gray-400'}`} />
                  </button>
                  <button onClick={() => handleCopyMessage(msg.text)}><FaCopy /></button>
                  <button onClick={() => handleDownloadMessage(msg.text)}><FaDownload /></button>
                  <button onClick={() => handleShareMessage(msg.text)}><FaShareAlt /></button>
                </div>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>
      
      <div className="p-4 bg-gray-800 flex items-center rounded-b-lg shadow-md">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 p-3 rounded-lg bg-gray-700 text-white border-none outline-none"
        />
        <button onClick={handleSendMessage} className="ml-3 bg-blue-700 text-white px-5 py-3 rounded-lg flex items-center shadow-md hover:bg-blue-600">
          <FaPaperPlane className="mr-2" /> Send
        </button>
      </div>
    </div>
  );
}

export default Community;