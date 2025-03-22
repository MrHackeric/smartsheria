import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { useAuth } from "../../AuthContext";

const OtpVerificationPage = () => {
    const [otp, setOtp] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const email = sessionStorage.getItem("userEmail");
    const [errorMessage, setErrorMessage] = useState('');
    const { setCurrentUser } = useAuth(); // Import from AuthContext

    const handleVerifyOtp = async () => {
        try {
            setIsLoading(true);
    
            if (!otp) {
                alert("Please enter the OTP.");
                setIsLoading(false);
                return;
            }
    
            // Retrieve stored email
            const email = sessionStorage.getItem("userEmail");
        
            if (!email) {
                alert("No email found. Please log in again.");
                navigate("/login");
                return;
            }
    
            const response = await axiosInstance.post("/verify-otp", { email, otp });
    
            if (response.status === 200) {
                const { token, user } = response.data;
    
                sessionStorage.setItem("authToken", token);
                sessionStorage.setItem("user", JSON.stringify(user));
                sessionStorage.removeItem("userEmail"); // Clean up
    
                navigate("/community");
            } else {
                setErrorMessage("Invalid OTP. Please try again.");
            }
        } catch (error) {
            console.error("OTP Verification Error:", error.response ? error.response.data : error.message);
            alert(error.response?.data?.message || "An error occurred. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };
    

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
            <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6 space-y-4">
                <h2 className="text-2xl font-bold text-center text-gray-800">Enter OTP</h2>
                <p className="text-gray-600 text-center">We have sent an OTP to your email ({email}). Please enter it below.</p>

                <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="Enter OTP"
                    className="w-full p-3 border border-gray-300 rounded-lg text-center text-lg"
                />

                <button
                    onClick={handleVerifyOtp}
                    disabled={isLoading}
                    className={`w-full py-3 text-lg font-semibold text-white rounded-lg shadow-md transition duration-300 ease-in-out focus:outline-none
                        ${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}
                    `}
                >
                    {isLoading ? "Verifying..." : "Verify OTP"}
                </button>
            </div>
        </div>
    );
};

export default OtpVerificationPage;
