import mongoose from "mongoose";

const OtpSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    otpCode: { type: String, required: true }, // OTP for login/reset
    otpExpiresAt: { type: Date, required: true }, // Expiry for OTP
    verificationCode: { type: String }, // Verification code for signup
    verificationExpiresAt: { type: Date }, // Expiry for verification code
  },
  { timestamps: true }
);

export default mongoose.model("Otp", OtpSchema);
