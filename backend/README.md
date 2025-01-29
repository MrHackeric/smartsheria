# **CyberPolicy Pro - Backend**

This repository contains the backend for **CyberPolicy Pro**, a compliance management platform that provides regulatory tracking, risk scoring, document drafting, and compliance notifications via RESTful APIs.

### **Setup Instructions**

1. **Navigate to the backend directory**:
   ```bash
   cd backend
   ```

2. **Install dependencies**:
   Use the following command to install all required packages:
   ```bash
   npm install
   ```

3. **Run the Backend Server**:
   Start the server using:
   ```bash
   node server.js
   ```
   This will start the backend server at `http://localhost:5000` (or the port specified in the configuration).

---

## **Folder Structure**

```
backend/
├── config/               # Configuration files (e.g., database, environment variables)
├── controllers/          # Request handlers and business logic for each endpoint
├── models/               # Data models and schemas
├── routes/               # API routes
├── services/             # Core services, such as AI-powered analysis, document generation
├── utils/                # Helper functions and utilities
└── server.js             # Main server file to initialize and run the backend
```

## **Configuration**

1. **Environment Variables**: Create a `.env` file in the backend root to set up necessary environment variables:
   ```
   PORT=5000
   DATABASE_URL=mongodb://localhost:27017/cyberpolicypro
   AI_API_KEY=your_ai_service_key_here
   ```

2. **Database**: Ensure MongoDB or the relevant database service is running and accessible.