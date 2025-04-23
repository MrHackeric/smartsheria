import React from 'react';
import Header from '../header/Header';
import Help from './Help';

const HelpPage = () => {
  return (
    <div>
      {/* Header Section */}
      <Header />
      <div>
        <Help />
      </div>
    </div>
  );
};

export default HelpPage;
