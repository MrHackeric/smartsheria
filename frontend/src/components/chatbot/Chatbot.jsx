import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { TextField, IconButton, CircularProgress, Avatar, Typography } from '@mui/material';
import { Send as SendIcon } from '@mui/icons-material';
import { styled } from '@mui/system';

const API_URL = 'http://localhost:5000/api/messages'; // Update with your backend URL

// Custom styled components for modern design
const ChatContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  height: '100vh',
  maxWidth: '800px',
  margin: '0 auto',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  borderRadius: '12px',
  overflow: 'hidden',
  backgroundColor: '#f9fafb',
});

const ChatHeader = styled('div')({
  padding: '16px',
  backgroundColor: '#4f46e5',
  color: '#fff',
  textAlign: 'center',
  fontSize: '1.25rem',
  fontWeight: 'bold',
  borderBottom: '1px solid #e5e7eb',
});

const ChatMessages = styled('div')({
  flex: 1,
  padding: '16px',
  overflowY: 'auto',
  backgroundColor: '#fff',
});

const MessageBubble = styled('div')(({ sender }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: '12px',
  justifyContent: sender === 'user' ? 'flex-end' : 'flex-start',
}));

const MessageContent = styled('div')(({ sender }) => ({
  maxWidth: '70%',
  padding: '12px 16px',
  borderRadius: sender === 'user' ? '12px 12px 0 12px' : '12px 12px 12px 0',
  backgroundColor: sender === 'user' ? '#4f46e5' : '#e5e7eb',
  color: sender === 'user' ? '#fff' : '#000',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
}));

const ChatInputContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
  padding: '16px',
  backgroundColor: '#fff',
  borderTop: '1px solid #e5e7eb',
});

const TypingIndicator = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '8px',
  fontSize: '0.875rem',
  color: '#6b7280',
});

function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await axios.get(API_URL);
      setMessages(response.data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { text: input, sender: 'user' };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await axios.post(API_URL, { text: input });
      const botMessage = response.data;
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setLoading(false);
      scrollToBottom();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <ChatContainer>
      <ChatHeader>
        <Typography variant="h6">💬 SmartSheria Chatbot</Typography>
      </ChatHeader>

      <ChatMessages>
        {messages.map((msg, index) => (
          <MessageBubble key={index} sender={msg.sender}>
            {msg.sender === 'bot' && (
              <Avatar sx={{ bgcolor: '#4f46e5', marginRight: '8px' }}>🤖</Avatar>
            )}
            <MessageContent sender={msg.sender}>
              <Typography variant="body1">{msg.text}</Typography>
            </MessageContent>
            {msg.sender === 'user' && (
              <Avatar sx={{ bgcolor: '#10b981', marginLeft: '8px' }}>👤</Avatar>
            )}
          </MessageBubble>
        ))}
        {loading && (
          <TypingIndicator>
            <CircularProgress size={16} color="inherit" />
            <Typography variant="body2" sx={{ marginLeft: '8px' }}>
              SmartSheria is typing...
            </Typography>
          </TypingIndicator>
        )}
        <div ref={messagesEndRef}></div>
      </ChatMessages>

      <ChatInputContainer>
        <TextField
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          fullWidth
          placeholder="Type your message..."
          variant="outlined"
          size="small"
          sx={{ marginRight: '8px' }}
        />
        <IconButton
          color="primary"
          onClick={handleSendMessage}
          disabled={loading || !input.trim()}
        >
          <SendIcon />
        </IconButton>
      </ChatInputContainer>
    </ChatContainer>
  );
}

export default Chatbot;