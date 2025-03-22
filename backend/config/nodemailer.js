import nodemailer from "nodemailer";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Create reusable transporter object using SMTP
const transporter = nodemailer.createTransport({
    service: "Gmail", // Change this if using a different email provider
    auth: {
        user: process.env.EMAIL_USER, // Your email address
        pass: process.env.EMAIL_PASS, // App password (not regular email password)
    },
});

// Verify connection to email server
transporter.verify((error, success) => {
    if (error) {
        console.error("Nodemailer Configuration Error:", error);
    } else {
        console.log("✅ Nodemailer is ready to send emails.");
    }
});

export default transporter;
