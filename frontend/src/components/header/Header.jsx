import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  AiOutlineTeam,
  AiOutlineMessage,
  AiOutlineSetting,
  AiOutlineFileText,
  AiOutlineQuestionCircle,
} from "react-icons/ai";
import { FiLogOut } from "react-icons/fi";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import CloseIcon from "@mui/icons-material/Close";
import axiosInstance from "../../utils/axiosInstance";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axiosInstance.post("/logout");
      sessionStorage.clear();
      navigate("/login", { replace: true });
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="flex">
      <button
        className="fixed top-5 left-5 z-50 p-2 bg-blue-800 text-white rounded-md lg:hidden"
        onClick={() => setIsOpen(true)}
      >
        <HiOutlineMenuAlt2 size={24} />
      </button>

      <div
        className={`fixed top-0 left-0 h-full w-64 bg-gradient-to-b from-purple-900 to-blue-900 text-white shadow-lg p-5 transition-transform duration-300 ease-in-out z-40 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:w-72 flex flex-col justify-between`}
      >
        <div>
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gold">Smart Sheria</h1>
            <button className="lg:hidden text-white" onClick={() => setIsOpen(false)}>
              <CloseIcon />
            </button>
          </div>

          <nav className="flex flex-col space-y-6">
            <SidebarLink to="/community" Icon={AiOutlineTeam} label="Community" />
            <SidebarLink to="/chatbot" Icon={AiOutlineMessage} label="Chatbot" />
            <SidebarLink to="/settings" Icon={AiOutlineSetting} label="Settings" />
            <SidebarLink to="/report" Icon={AiOutlineFileText} label="Report" />

            {/* Extra spacing before Help */}
            <div className="mt-4">
              <SidebarLink to="/help" Icon={AiOutlineQuestionCircle} label="Help" />
            </div>
          </nav>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center space-x-3 text-white hover:text-red-300 transition duration-300 ease-in-out py-2 mb-6"
        >
          <FiLogOut size={22} />
          <span>Logout</span>
        </button>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </div>
  );
};

const SidebarLink = ({ to, Icon, label }) => {
  return (
    <Link
      to={to}
      className="flex items-center space-x-3 text-white hover:text-gold transition duration-300 ease-in-out py-2"
    >
      <Icon size={22} />
      <span>{label}</span>
    </Link>
  );
};

export default Header;
