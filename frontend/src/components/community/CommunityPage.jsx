import React from 'react';
import Header from '../header/Header';
import Community from './Community';

const CommunityPage = () => {
  return (
    <div>
      {/* Header Section */}
      <Header />
      <div>
        <Community />
      </div>
    </div>
  );
};

export default CommunityPage;
