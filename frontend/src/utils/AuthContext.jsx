import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

// AuthProvider component to wrap around the app
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch authenticated user
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("/auth/user", { withCredentials: true });
        setCurrentUser(response.data.user);
      } catch (error) {
        console.error("Error fetching user:", error);
        setCurrentUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  // Login function
  const login = async (email, password) => {
    try {
      const response = await axios.post("/auth/login", { email, password }, { withCredentials: true });
      setCurrentUser(response.data.user);
    } catch (error) {
      console.error("Error logging in:", error.response?.data?.message || error.message);
      throw error;
    }
  };

  // Signup function
  const signup = async (email, password) => {
    try {
      const response = await axios.post("/auth/register", { email, password }, { withCredentials: true });
      setCurrentUser(response.data.user);
    } catch (error) {
      console.error("Error signing up:", error.response?.data?.message || error.message);
      throw error;
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await axios.post("/auth/logout", {}, { withCredentials: true });
      setCurrentUser(null);
    } catch (error) {
      console.error("Error logging out:", error.response?.data?.message || error.message);
      throw error;
    }
  };

  const value = {
    currentUser,
    login,
    signup,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};
