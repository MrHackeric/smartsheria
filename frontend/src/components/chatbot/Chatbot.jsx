import React, { useState, useEffect } from "react";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    const fetchChatHistory = async () => {
      try {
        const response = await fetch("http://localhost:5000/chat/history");
        const data = await response.json();
        setMessages(data.messages);
      } catch (error) {
        console.error("Error fetching chat history:", error);
      }
    };

    fetchChatHistory();
  }, []);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { text: input, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setTyping(true);

    try {
      const response = await fetch("http://localhost:5000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      const data = await response.json();
      setTyping(false);

      if (data.response) {
        simulateTyping(data.response);
      }
    } catch (error) {
      console.error("Error fetching response:", error);
      setTyping(false);
    }
  };

  const simulateTyping = (text) => {
    let index = 0;
    setMessages((prev) => [...prev, { text: "", sender: "ai" }]);

    const interval = setInterval(() => {
      setMessages((prev) => {
        const newMessages = [...prev];
        const lastIndex = newMessages.length - 1;

        if (newMessages[lastIndex].sender === "ai") {
          newMessages[lastIndex] = {
            ...newMessages[lastIndex],
            text: text.slice(0, index + 1),
          };
        }

        return newMessages;
      });

      index++;
      if (index === text.length) clearInterval(interval);
    }, 100);
  };

  return (
    <div className="max-w-lg mx-auto bg-gray-100 p-4 rounded-lg shadow-md">
      <div className="h-96 overflow-y-auto p-2">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`mb-2 p-2 rounded-lg ${
              msg.sender === "user" ? "bg-blue-500 text-white" : "bg-gray-300 text-black"
            }`}
          >
            {msg.text}
          </div>
        ))}
        {typing && <div className="text-gray-500">AI is typing...</div>}
      </div>
      <div className="flex mt-2">
        <input
          className="flex-1 p-2 border rounded-l-lg"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded-r-lg" onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
