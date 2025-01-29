import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineTeam, AiOutlineMessage, AiOutlineBell, AiOutlineSetting, AiOutlineFileText } from 'react-icons/ai'; // Community, Chatbot, Notifications, Settings, Report
import MenuIcon from '@mui/icons-material/Menu'; // Hamburger menu for mobile
import CloseIcon from '@mui/icons-material/Close'; // Close icon for mobile menu
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';


const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false); // State for mobile menu
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // Make API call to logout the user
      const response = await axios.post("http://localhost:3000/api/users/logout");
  
      if (response.status === 200) {
        // Successfully logged out, clear client-side state
        console.log('Logged out successfully');
  
        // Redirect the user to the login or home page
        navigate("/login");
      }
    } catch (error) {
      console.error("Logout failed", error);
    }
  };
  

  return (
    <header className="bg-gradient-to-r from-purple-900 to-blue-900 text-white shadow-md py-4 fixed w-full z-50">
      <div className="container mx-auto flex justify-between items-center px-4">
        {/* Logo/Title */}
        <div className="text-3xl font-bold text-gold">
          Smart Sheria
        </div>

        {/* Mobile Hamburger Icon */}
        <button
          className="lg:hidden text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <CloseIcon /> : <MenuIcon />}
        </button>

        {/* Navigation Links */}
        <nav className={`lg:flex space-x-10 items-center transition-all duration-300 ease-in-out ${menuOpen ? 'flex-col space-y-6 absolute top-16 left-0 right-0 bg-blue-800 py-4 px-6' : 'hidden lg:flex'}`}>
          <Link to="/community" className="flex flex-col items-center text-white hover:text-gold transition duration-300 ease-in-out">
            <AiOutlineTeam size={20} />
            <span className="text-sm mt-1">Community</span>
          </Link>

          <Link to="/chatbot" className="flex flex-col items-center text-white hover:text-gold transition duration-300 ease-in-out">
            <AiOutlineMessage size={20} />
            <span className="text-sm mt-1">Chatbot</span>
          </Link>

          <Link to="/notifications" className="flex flex-col items-center text-white hover:text-gold transition duration-300 ease-in-out">
            <AiOutlineBell size={20} />
            <span className="text-sm mt-1">Notifications</span>
          </Link>

          <Link to="/settings" className="flex flex-col items-center text-white hover:text-gold transition duration-300 ease-in-out">
            <AiOutlineSetting size={20} />
            <span className="text-sm mt-1">Settings</span>
          </Link>

          <Link to="/report" className="flex flex-col items-center text-white hover:text-gold transition duration-300 ease-in-out">
            <AiOutlineFileText size={20} />
            <span className="text-sm mt-1">Report</span>
          </Link>

          <Link to="#" className="flex flex-col items-center text-white hover:text-red-300 transition duration-300 ease-in-out" onClick={handleLogout}>
            <ExitToAppIcon size={"20"} />
            <span className="text-sm mt-1">Logout</span>
          </Link>

        </nav>
      </div>
    </header>
  );
};

export default Header;
