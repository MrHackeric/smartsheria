```markdown

### ⚡ SmartSheria

A smart, AI-powered legal assistance platform built for real-world impact.  
Final Year Computer Science Project (COMP 493) | Class of 2025 🎓


## 🧠 Overview

SmartSheria is a modern AI-driven legal assistance system designed to:

- Help users access quick legal guidance via AI chatbot.
- Foster real-time community discussions.
- Report issues and manage legal-related interactions.
- Enable administrators to manage users and oversee reports securely.

It demonstrates mastery of AI integration, real-time communication, secure authentication, and scalable cloud technologies.

---

## 🚀 Features

- **🧠 AI Chatbot**: Powered by Google Gemini API for legal queries.
- **💬 Community Chat**: Real-time group messaging with Socket.io.
- **⚙️ User Settings**: Manage your profile, password, and preferences.
- **🐛 Bug Reporting**: Submit bugs, feedback, or improvements.
- **🆘 Help Center**: Quick user guides and platform assistance.
- **🛡️ Admin Dashboard**: User management, report tracking, and moderation.

---

## 📦 Project Structure

```bash
smartsheria/
├── backend/        # Node.js + Express.js server, MongoDB integration
├── frontend/       # React.js client, Tailwind CSS, Socket.io integration
└── README.md       # Project documentation
```

---

## 🛠️ Tech Stack

| Frontend | Backend | Database | Real-Time | Authentication |
|:--------:|:-------:|:--------:|:---------:|:---------------:|
| React.js + Vite | Node.js + Express.js | MongoDB Atlas | Socket.io | JWT (JSON Web Token) |
| Tailwind CSS | REST APIs |  |  | Planned 2FA & CAPTCHA |

- **Hosting**: AWS, Vercel, or DigitalOcean *(deployment-ready)*

---

## 🏃‍♂️ Getting Started

### 📥 Clone the Repository

```bash
git clone https://github.com/MrHackeric/smartsheria.git
```

---

### ➡️ Running the Frontend

```bash
cd frontend
npm install
npm run dev
```

- Access Frontend at: `http://localhost:5173`

---

### ➡️ Running the Backend

```bash
cd backend
npm install
nodemon server.js
# or
node server.js
```

- Backend runs at: `http://localhost:5000`

---

## 🔒 Security & Compliance

- 🔐 JWT-based authentication and authorization
- 🔐 Planned CAPTCHA and two-factor authentication (2FA)
- 📜 GDPR-compliant data processing
- 🛡️ Role-Based Access Control (RBAC) for Admin privileges
- 📶 API validation and sanitization

---

## 📚 Documentation

- Full developer and module documentation will be available under `/docs/` (coming soon).
- System architecture diagrams included for project grading and submission.
- Clean and modular code structure for easy scaling.

---

## 👨‍💻 Developer

| Name  | GitHub |
|:-----:|:------:|
| **Eric (MrHackeric)** | [@MrHackeric](https://github.com/MrHackeric) |

Bachelor of Computer Science, University XYZ  
Final Year Project (COMP 493) | 2025

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

The above copyright notice and this permission notice shall be included in  
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR  
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,  
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE  
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER  
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,  
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN  
THE SOFTWARE.
```

---

> **SmartSheria**: Bridging Technology and Justice ⚡
```