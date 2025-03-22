import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

// Create an authentication context
const AuthContext = createContext();

// AuthProvider component to manage authentication state
export const AuthProvider = ({ children }) => {
  // State to store the authenticated user
  const [currentUser, setCurrentUser] = useState(() => {
    try {
    // Retrieve the user from sessionStorage if it exists (persists session on reload)
    const storedUser = sessionStorage.getItem("user");
    return storedUser && storedUser !== "undefined" ? JSON.parse(storedUser) : null; //Only Parse if not null
  } catch (error) {
    console.error("Error Parsing stored user:", error);
    return null;
  }
});

  // State to track loading state while checking authentication status
  const [loading, setLoading] = useState(true);

  // Fetch authenticated user data when the component mounts
  useEffect(() => {
    const fetchUser = async () => {
      // Get authentication token from sessionStorage
      const token = sessionStorage.getItem("authToken");

      // If there's no token, stop loading and return
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        // Fetch user data using the stored token
        const response = await axios.get("/api/user", {
          headers: { Authorization: `Bearer ${token}` },
        });

        // Set the current user state and store user details in sessionStorage
        setCurrentUser(response.data.user);
        sessionStorage.setItem("user", JSON.stringify(response.data.user));
      } catch (error) {
        // If an error occurs, remove invalid session data
        console.error("Error fetching user:", error);
        sessionStorage.removeItem("authToken");
        sessionStorage.removeItem("user");
      } finally {
        // Set loading to false once the fetch attempt is complete
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  // Function to handle login
  const login = async (email, password) => {
    // Send login request to the backend
    const response = await axios.post("/auth/login", { email, password });

    if (response.status === 200) {
      const { requiresOtp, token, user } = response.data;

      // If OTP is required, store email in session and return an OTP prompt signal
      if (requiresOtp) {
        sessionStorage.setItem("userEmail", email);
        return "OTP_REQUIRED";
      }

      // Store authentication token and user data in sessionStorage
      sessionStorage.setItem("authToken", token);
      sessionStorage.setItem("user", JSON.stringify(user));

      // Update state with the logged-in user
      setCurrentUser(user);
    }
  };

  // Function to handle logout
  const logout = async () => {
    await axios.post("/auth/logout"); // Notify the backend about logout

    // Clear sessionStorage and reset the user state
    sessionStorage.removeItem("authToken");
    sessionStorage.removeItem("user");
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser, login, logout }}>
      {/* Render children only when loading is complete to avoid flickers */}
      {!loading && children}
    </AuthContext.Provider>
  );
};

// Custom hook to easily access authentication context in components
export const useAuth = () => useContext(AuthContext);
