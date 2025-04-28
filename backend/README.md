```markdown

### ⚡ SmartSheria Backend

Backend server for SmartSheria — providing secure user management, AI chatbot integration, real-time communication, and report handling.  
Built with **Node.js** 🟩 and **Express.js** ⚡.

## 🚀 Getting Started

### 📥 Installation

Clone the repository, install dependencies, and run the backend:

```bash
git clone https://github.com/MrHackeric/smartsheria.git
cd backend
npm install
npm run dev   # or
npm run start
```

- The backend API will be available at: `http://localhost:5000`

---

## 🧩 Key Features

- 🌐 **RESTful API** Architecture for easy integration with the frontend
- 🔐 **Secure Authentication** via JWT tokens
- 🛡️ **Role-Based Access Control (RBAC)** for different user privileges
- 💬 **Real-Time Chat** using Socket.io for community interaction
- 🤖 **Chatbot Integration** with Gemini API for smart legal responses
- 📋 **Report Management** — Handle bug reports and user feedback
- 🧑‍💻 **Admin Dashboard** APIs for user management and report viewing
- ☁️ **MongoDB Atlas** for cloud database storage

---

## 🛠️ Technologies Used

| Technology       | Purpose                          |
|:-----------------|:---------------------------------|
| Node.js          | Backend server                   |
| Express.js       | Web framework for APIs           |
| MongoDB + Mongoose | NoSQL Database & ORM            |
| Socket.io        | Real-time communication          |
| bcrypt.js        | Password hashing & salting       |
| JWT              | JSON Web Tokens for authentication |
| Helmet.js        | Web security middleware          |
| CORS             | Cross-origin request handling    |
| Nodemailer       | Email notifications (if required) |
| dotenv           | Environment variables management |

---

## 📂 Project Structure

```bash
backend/
├── controllers/        # Business logic for handling routes (user, report, chat, etc.)
├── models/             # Mongoose models (User, Report, Chat, etc.)
├── routes/             # API route definitions
├── middleware/         # JWT, error handling, and RBAC middleware
├── config/             # Database connection and configuration setup
├── utils/              # Helper functions and utilities
├── server.js           # Entry point for the backend server
├── package.json        # Project metadata and dependencies
└── README.md           # Backend project documentation
```

---

## ⚙️ Environment Variables

Create a `.env` file in the `/backend` folder:

```env
MONGODB_URI=your-mongodb-uri
PORT=5000
JWT_SECRET=your-secret-key
GEMINI_API_KEY=your-gemini-api-key
EMAIL_USER=your-email@example.com
EMAIL_PASS=your-email-password
```

Make sure to replace the placeholder values with your actual credentials and settings.

---

## 📜 License

This project is licensed under the **MIT License**.

```
MIT License

Copyright (c) 2025 MrHackeric

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell  
copies of the Software, and to permit persons to whom the Software is  
furnished to do so, subject to the following conditions:

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR  
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,  
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
```

---

> **SmartSheria Backend** — Secure, Scalable, and Ready for Production ⚡  
```