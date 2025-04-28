Here’s an **upgraded, polished version** of your **Frontend README** to match the new main `README.md` style — more professional, clear, and beautiful for GitHub and academic/portfolio submissions:

---

```markdown
<h1 align="center">🎨 SmartSheria Frontend</h1>

<p align="center">
Frontend client of the SmartSheria system — delivering smooth, secure, and AI-powered user experiences.  
Built with <strong>React.js</strong> ⚛️ and <strong>Tailwind CSS</strong> 🎨
</p>

<div align="center">
<img src="https://img.shields.io/badge/React.js-Frontend-blue?style=for-the-badge" />
<img src="https://img.shields.io/badge/Tailwind-CSS-06B6D4?style=for-the-badge" />
<img src="https://img.shields.io/badge/Socket.io-Real--Time-black?style=for-the-badge" />
<img src="https://img.shields.io/badge/License-MIT-lightgrey?style=for-the-badge" />
</div>

---

## 🚀 Getting Started

### 📥 Installation

```bash
git clone https://github.com/MrHackeric/smartsheria.git
cd frontend
npm install
npm run dev
```

- The frontend will be available at: `http://localhost:5173`

---

## 🧩 Key Features

- 🎯 **Responsive Design** — Tailwind CSS-powered modern layouts.
- 🤖 **AI Chatbot Integration** — Smart legal queries via Gemini API.
- 💬 **Real-Time Community Chat** — Built with Socket.io-client.
- 👤 **Profile Management** — Update personal details and change passwords.
- 🐞 **Bug Reporting** — Easy in-app feedback and issue reporting.
- 🆘 **Help Center** — User guides and navigation assistance.
- 🛡️ **Admin Panel** — Manage users and reports securely.
- 🌍 **Multilingual Support** *(Planned for future releases)*

---

## 🛠️ Tech Stack

| Technology       | Purpose                          |
|:-----------------|:---------------------------------|
| React.js (Vite)  | Frontend Framework               |
| Tailwind CSS     | Styling & Responsive Design      |
| Axios            | API Communication                |
| Socket.io-client | Real-time Messaging              |
| React Router     | Navigation and Routing           |
| Context API      | Global State Management          |

---

## 📂 Project Structure

```bash
frontend/
├── public/                # Static assets
├── src/
│   ├── css/               # Tailwind styles and static icons/images
│   ├── components/        # Reusable UI components (admin, auth, chatbot, etc.)
│   ├── utils/             # Helper functions and utilities
│   ├── projectmodules/    # Main feature modules (Chatbot, Community, Help, etc.)
│   └── App.jsx            # Root component
├── package.json
└── README.md
```

> 📌 *Note: Minor structure refinements for clarity — `projectmodules/` hosts feature modules, `utils/` holds helper utilities.*

---

## ⚙️ Environment Variables

Create a `.env` file inside `/frontend/`:

```env
MONGODB_URI=Mongo DB Backend API endpoint
PORT=Port running Mongo DB
JWT_SECRET=Your JWT Token
```

> ⚡ Environment variables must start with `VITE_` when using Vite.

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

> **SmartSheria Frontend** — Fast, Responsive, Empowering ⚡
```