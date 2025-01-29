import React, { useState, useEffect, useRef } from 'react';
import { socket } from './socket';
import { fetchMessages, sendMessage } from '../../services/messageService';
import { requestAiResponse } from '../../services/aiService';
import { FaCopy, FaPaperPlane, FaDownload, FaShareAlt, FaReply, FaRobot } from 'react-icons/fa';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { handleCopyMessage, handleDownloadMessage, handleShareMessage } from '../../utils/messageUtils';
import { db } from '../../utils/firebase-config';
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

function Community() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [replyTo, setReplyTo] = useState(null);
  const messagesEndRef = useRef(null);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
        fetchMessages(setMessages);
      }
    });
    return () => unsubscribeAuth();
  }, []);

  const handleSendMessage = async () => {
    if (input.trim() && currentUser) {
      try {
        // Construct the message object
        const message = {
          sender: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            email: currentUser.email,
          },
          text: input.trim(),
          timestamp: serverTimestamp(),
          likes: 0,
          replyTo: replyTo ? replyTo.text : null,
        };

        // Save message to Firestore
        await addDoc(collection(db, "messages"), message);

        // Emit the message via socket.io
        socket.emit("newMessage", message);

        // Update local state
        setMessages((prevMessages) => [...prevMessages, message]);
        setInput('');
        setReplyTo(null);
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="col-span-full xl:col-span-6 bg-gradient-to-r from-blue-100 via-blue-200 to-blue-300 shadow-lg rounded-2xl flex flex-col h-[90vh]">
      <div className="p-4 flex flex-col flex-1 overflow-y-auto relative">
        <h2 className="font-semibold text-blue-700 text-center mb-4 text-2xl">
          Join the Conversation! 🌍
        </h2>

        {messages.map((msg, index) => (
          <div key={index} className={`my-3 flex ${msg.sender.uid === currentUser?.uid ? 'justify-end' : 'justify-start'}`}>
            <div className="relative max-w-lg w-full">
              <div className={`p-4 rounded-xl shadow-md ${msg.sender.uid === currentUser?.uid ? 'bg-white text-black' : 'bg-blue-500 text-white'}`}>
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold">{msg.sender.displayName || 'User'}</span>
                  <span className="text-gray-400">{msg.timestamp?.toDate().toLocaleTimeString()}</span>
                </div>
                <p className="mt-2 break-words">{msg.text}</p>
                <div className="flex justify-between mt-3 text-xs text-gray-800">
                  <button onClick={() => handleCopyMessage(msg.text)} className="flex items-center text-blue-600 hover:text-blue-700">
                    <FaCopy />
                  </button>
                  <button onClick={() => handleDownloadMessage(msg.text)} className="flex items-center text-blue-600 hover:text-blue-700">
                    <FaDownload />
                  </button>
                  <button onClick={() => handleShareMessage(msg.text)} className="flex items-center text-blue-600 hover:text-blue-700">
                    <FaShareAlt />
                  </button>
                  <button onClick={() => setReplyTo(msg)} className="flex items-center text-blue-600 hover:text-blue-700">
                    <FaReply />
                  </button>
                  <button onClick={() => requestAiResponse(msg.text, setMessages)} className="flex items-center text-blue-600 hover:text-blue-700">
                    <FaRobot />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 flex items-center border-t bg-gradient-to-r from-blue-100 via-blue-200 to-blue-300 rounded-b-2xl">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
        <button
          onClick={handleSendMessage}
          className="ml-3 px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-all flex items-center"
        >
          <FaPaperPlane className="mr-2" /> Send
        </button>
      </div>
    </div>
  );
}

export default Community;
