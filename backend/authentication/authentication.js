import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import admin from "firebase-admin";
import crypto from "crypto";
import fs from "fs";
import dotenv from "dotenv";
import bcrypt from "bcrypt"; // For password hashing

// Load environment variables
dotenv.config();

// Firebase initialization
let serviceAccount;
try {
  serviceAccount = JSON.parse(fs.readFileSync("./serviceAccountKey.json", "utf8"));
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
} catch (error) {
  console.error("Error loading Firebase credentials:", error);
  process.exit(1);
}

const db = admin.firestore();

// Express app setup
const app = express();
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173 "}));
app.use(bodyParser.json());

// Encryption key configuration
const encryptionKey = Buffer.from(process.env.ENCRYPTION_KEY, "utf-8"); // Load encryption key from environment variables

if (encryptionKey.length !== 32) {
  console.error("Invalid encryption key length. It must be exactly 32 bytes.");
  process.exit(1);
}

const algorithm = "aes-256-cbc";
const ivLength = 16;

// Encrypt data with AES-256-CBC
const encryptData = (data) => {
  const iv = crypto.randomBytes(ivLength);
  const cipher = crypto.createCipheriv(algorithm, encryptionKey, iv);
  let encrypted = cipher.update(data, "utf8", "hex");
  encrypted += cipher.final("hex");
  return { encryptedData: encrypted, iv: iv.toString("hex") };
};

// Decrypt data
const decryptData = (encryptedData, ivHex) => {
  try {
    const iv = Buffer.from(ivHex, "hex");
    const decipher = crypto.createDecipheriv(algorithm, encryptionKey, iv);
    let decrypted = decipher.update(encryptedData, "hex", "utf8");
    decrypted += decipher.final("utf8");
    return decrypted;
  } catch (error) {
    console.error("Decryption failed:", error);
    throw new Error("Decryption failed.");
  }
};

// User Registration Endpoint
app.post("/api/user/register", async (req, res) => {
  const { fullName, userName, email, phoneNumber, password } = req.body;

  try {
    // Check if the email or username already exists
    const userQuery = await db.collection("users").where("email", "==", email).get();
    if (!userQuery.empty) return res.status(400).json({ error: "Email already exists." });

    const usernameQuery = await db.collection("users").where("userName", "==", userName).get();
    if (!usernameQuery.empty) return res.status(400).json({ error: "Username already exists." });

    // Encrypt sensitive fields
    const encryptedFullName = encryptData(fullName);
    const encryptedEmail = encryptData(email);
    const encryptedPhoneNumber = encryptData(phoneNumber);

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Store the user data
    const newUser = {
      fullName: encryptedFullName.encryptedData,
      email: encryptedEmail.encryptedData,
      phoneNumber: encryptedPhoneNumber.encryptedData,
      userName,
      password: hashedPassword, // Store hashed password
      iv: encryptedFullName.iv, // IV for decrypting sensitive fields
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    };

    const docRef = await db.collection("users").add(newUser);

    res.status(201).json({ message: "User registered successfully!", userId: docRef.id });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

// User Login Endpoint
app.post("/api/user/login", async (req, res) => {
  const { email, password } = req.body;
  console.log('Request Payload:', req.body);
  res.status(200).send('Payload received'); // Temporary response for debugging


  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required." });
  }

  try {
    // Fetch user data from Firestore
    const usersSnapshot = await db.collection("users").get();
    let user = null;

    // Compare the encrypted input email with stored emails
    for (const doc of usersSnapshot.docs) {
      const userData = doc.data();
      const decryptedEmail = decryptData(userData.email, userData.iv);

      if (decryptedEmail === email) {
        user = { ...userData, id: doc.id };
        break;
      }
    }

    if (!email || !password) {
      return res.status(400).json({ error: "Email and Password are required." });
    }

    // Verify the hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({ error: "Invalid email or password." });
    }

    res.status(200).json({ message: "Login successful", userId: user.id });
  } catch (error) {
    console.error('Login error:', error.response?.data || error.message);
    if (error.response) {
      // Server responded with a status other than 2xx
      console.log(error.response.data.message || 'Login failed.');
    } else if (error.request) {
      // No response received
      console.log('No response from the server. Please try again later.');
    } else {
      // Error setting up the request
      console.log('An unexpected error occurred.');
    }
  }
});

// Server setup
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
