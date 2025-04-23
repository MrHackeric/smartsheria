import React from 'react';
import Header from '../header/Header';
import Chatbot from './Chatbot';

const ChatbotPage = () => {
  return (
    <div>
      {/* Header Section */}
      <Header />
      <div>
        <Chatbot />
      </div>
    </div>
  );
};

export default ChatbotPage;