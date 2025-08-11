# Finanlytics
  Smart Finance Management Application
  Built on the MERN stack (MongoDB, Express, React, Node.js), Finanlytics helps users manage expenses, track transactions, gain AI-powered financial insights, and make payments securely with Razorpay.

# 📋Table of Contents
Introduction
Features
Tech Stack
Installation
Usage
Configuration
Dependencies
Examples
Troubleshooting
Contributors
License

# 💡 Introduction
 Finanlytics is a comprehensive financial management tool designed to help individuals and businesses stay in control of their money.
 It provides:

-Expense tracking
-Transaction monitoring
-AI-powered financial insights
-Integrated payment processing
-Clear analytics for better decision-making

# ✨ Features
Expense Management – Add, categorize, and track expenses in real time.
Transaction Tracking – Monitor all incoming and outgoing transactions.
AI Insights – Receive intelligent suggestions and analytics based on your spending patterns.
Payment Gateway – Make payments directly via Razorpay integration.
User Dashboard – Interactive, responsive interface for all financial data.
Secure Authentication – User login and signup with JWT-based authentication.

# 🛠 Tech Stack
Frontend: React (Node environment)
Backend: Express.js (Node.js)
Database: MongoDB
Payments: Razorpay API
AI Insights: Grok Api

# 📦Installation
--Prerequisites
Node.js (v14+ recommended)
MongoDB (local or cloud, e.g., MongoDB Atlas)
Razorpay account and API keys

Steps
bash
Copy
Edit
# Clone repository

git clone https://github.com/yourusername/finanlytics.git

# Navigate into the project folder
cd finanlytics

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
🚀 Usage
Start Backend

bash
Copy
Edit
cd backend
npm start
Start Frontend

bash
Copy
Edit
cd frontend
npm start
Open http://localhost:3000 in your browser.

⚙️ Configuration
Create a .env file in the backend folder with:

env
Copy
Edit
MONGO_URI=your_mongodb_connection_string
RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_KEY_SECRET=your_razorpay_secret
JWT_SECRET=your_jwt_secret
PORT=5000
📚 Dependencies
Backend: express, mongoose, cors, dotenv, jsonwebtoken, razorpay

Frontend: react, axios, react-router-dom, chart.js

Dev Tools: nodemon, concurrently

💻 Examples
AI Insight Example: If your food expenses exceed your monthly average, the app alerts you and suggests budget adjustments.

Payment Example: Pay your bills directly from the dashboard via Razorpay.

🛠 Troubleshooting
MongoDB not connecting: Check MONGO_URI in .env.

Razorpay payments failing: Ensure API keys are correct and account is activated.

Frontend not loading: Make sure both backend and frontend servers are running.

👥 Contributors
Your Name – Developer

📜 License
This project is licensed under the MIT License.
