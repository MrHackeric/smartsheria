import React from 'react';
import Header from '../header/Header';
import EditProfile from './EditProfile';

const EditReportPage = () => {
  return (
    <div>
      {/* Header Section */}
      <Header />
      <div>
          <EditProfile />
      </div>
    </div>
  );
};

export default EditReportPage;
