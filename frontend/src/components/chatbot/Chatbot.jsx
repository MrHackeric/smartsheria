import React, { useState, useRef } from 'react';
import { TextField, IconButton, CircularProgress } from '@mui/material';
import { Send as SendIcon } from '@mui/icons-material';

function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = () => {
    if (!input.trim()) return;

    const userMessage = { text: input, sender: 'user' };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInput('');
    setLoading(true);

    // Simulate chatbot response
    setTimeout(() => {
      const botMessage = {
        text: `You said: "${userMessage.text}"`,
        sender: 'bot',
      };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
      setLoading(false);
      scrollToBottom();
    }, 1000);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="mx-auto shadow-lg rounded-lg mt-8 w-full h-[600px] flex flex-col">
      {/* Header */}
      <header className="p-4 bg-gradient-to-r from-purple-900 to-blue-900 text-white text-center font-bold rounded-t-xl">
        <h1>💬 Modern Chatbot</h1>
      </header>

      {/* Messages Section */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-100 h-[calc(100%-72px-72px)]">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.sender === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`px-4 py-2 rounded-lg max-w-xs shadow-md ${
                msg.sender === 'user'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-black'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-center">
            <CircularProgress size={20} color="primary" />
          </div>
        )}
        <div ref={messagesEndRef}></div>
      </div>

      {/* Input Section */}
      <div className="p-3 bg-white border-t flex items-center space-x-2">
        <TextField
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          fullWidth
          placeholder="Type your message..."
          variant="outlined"
          size="small"
          className="flex-1"
        />
        <IconButton
          color="primary"
          onClick={handleSendMessage}
          disabled={loading || !input.trim()}
        >
          <SendIcon />
        </IconButton>
      </div>
    </div>
  );
}

export default Chatbot;
