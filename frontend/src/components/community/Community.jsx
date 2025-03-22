import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import { FaPaperPlane, FaStar, FaCopy, FaDownload, FaShareAlt } from "react-icons/fa";
import { styled } from "@mui/material/styles";
import { Box, Paper, TextField, IconButton } from "@mui/material";
import {
  handleStarMessage,
  handleCopyMessage,
  handleDownloadMessage,
  handleShareMessage,
  formatText,
} from "../../utils/messageUtils";

const socket = io("http://localhost:5000"); // Adjust for your backend

const ChatContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  height: "90vh",
  maxWidth: "1300px",
  width: "100%",
  margin: "2rem auto",
  borderRadius: "16px",
  overflow: "hidden",
  background: "linear-gradient(to bottom, #4c1d95, #1e3a8a)",
  color: "#fff",
  boxShadow: "0 6px 15px rgba(0, 0, 0, 0.2)",
});

const ChatHeader = styled(Box)({
  padding: "16px",
  background: "#4c1d95",
  textAlign: "center",
  fontSize: "1.5rem",
  fontWeight: "bold",
});

const ChatMessages = styled(Box)({
  flex: 1,
  padding: "16px",
  overflowY: "auto",
  backgroundColor: "#1e293b",
  display: "flex",
  flexDirection: "column",
});

const MessageBubble = styled(Box)(({ sender }) => ({
  display: "flex",
  alignItems: "center",
  marginBottom: "12px",
  justifyContent: sender === "user" ? "flex-end" : "flex-start",
}));

const MessageContent = styled(Paper)(({ sender }) => ({
  maxWidth: "70%",
  padding: "12px 16px",
  borderRadius: sender === "user" ? "16px 16px 0 16px" : "16px 16px 16px 0",
  backgroundColor: sender === "user" ? "#1e40af" : "#334155",
  color: sender === "user" ? "#fff" : "#e5e7eb",
}));

const ChatInputContainer = styled(Box)({
  display: "flex",
  alignItems: "center",
  padding: "16px",
  backgroundColor: "#4c1d95",
});

const TypingIndicator = styled(Box)({
  display: "flex",
  alignItems: "center",
  padding: "6px",
  fontSize: "0.875rem",
  color: "#e5e7eb",
});

function Community() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [userId, setUserId] = useState(localStorage.getItem("userId") || Date.now());
  const [starredMessages, setStarredMessages] = useState([]);
  const messagesEndRef = useRef(null);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    localStorage.setItem("userId", userId);
    fetchMessages();

    socket.on("message", (message) => {
      setMessages((prev) => [...prev, message]);
      setIsTyping(false);
    });

    socket.on("typing", () => {
      setIsTyping(true);
      setTimeout(() => setIsTyping(false), 2000);
    });

    return () => {
      socket.off("message");
      socket.off("typing");
    };
  }, []);

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
    if (!input.trim()) return;
    const messageData = {
      text: input,
      senderId: userId,
      timestamp: new Date().toISOString(),
    };

    socket.emit("message", messageData);
    setInput("");
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <ChatContainer>
      <ChatHeader>Community Chat</ChatHeader>

      <ChatMessages>
        {messages.map((msg, index) => {
          const isUser = msg.senderId === userId;
          const isStarred = starredMessages.some((m) => m.timestamp === msg.timestamp);
          return (
            <MessageBubble key={index} sender={isUser ? "user" : "other"}>
              <MessageContent sender={isUser ? "user" : "other"}>
                <p dangerouslySetInnerHTML={{ __html: formatText(msg.text) }} />
                <small className="block text-xs mt-1 text-gray-400">
                  {new Date(msg.timestamp).toLocaleTimeString()}
                </small>

                {/* Action Buttons */}
                <Box display="flex" mt={1} gap={1} color="gray.300">
                  <IconButton size="small" onClick={() => handleStarMessage(msg, starredMessages, setStarredMessages)}>
                    <FaStar className={`${isStarred ? "text-yellow-400" : "text-gray-400"}`} />
                  </IconButton>
                  <IconButton size="small" onClick={() => handleCopyMessage(msg.text)}>
                    <FaCopy />
                  </IconButton>
                  <IconButton size="small" onClick={() => handleDownloadMessage(msg.text)}>
                    <FaDownload />
                  </IconButton>
                  <IconButton size="small" onClick={() => handleShareMessage(msg.text)}>
                    <FaShareAlt />
                  </IconButton>
                </Box>
              </MessageContent>
            </MessageBubble>
          );
        })}
        {isTyping && <TypingIndicator>Someone is typing...</TypingIndicator>}
        <div ref={messagesEndRef} />
      </ChatMessages>

      <ChatInputContainer>
        <TextField
          fullWidth
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            socket.emit("typing");
          }}
          placeholder="Type your message..."
          variant="outlined"
          sx={{
            backgroundColor: "#1e293b",
            color: "#fff",
            borderRadius: "8px",
            "& input": { color: "#fff" },
          }}
        />
        <IconButton onClick={handleSendMessage} sx={{ ml: 2, backgroundColor: "#1e40af", color: "#fff" }}>
          <FaPaperPlane />
        </IconButton>
      </ChatInputContainer>
    </ChatContainer>
  );
}

export default Community;
