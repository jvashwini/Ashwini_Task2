# Ashwini_Task2
# Notes App (React + Node.js + JWT Auth – Without Database)

A simple full-stack **Notes App** built using **React (frontend)** and **Node.js + Express (backend)** with **JWT authentication**.  
--> This project is designed for learning purposes and **does not use any database** — all data is stored temporarily in arrays (`data.js` file).  

---

## Features

✅ User Registration and Login (with JWT token)  
✅ Add Notes with **Name**, **Topic**, and **Text**  
✅ Delete Notes  
✅ View Notes for the Logged-in User  
✅ Token-based Authentication (JWT)  
✅ Fully Responsive Frontend (Tailwind CSS)  
✅ In-memory data storage (No database used)

---

## 🧩 Tech Stack

**Frontend:**  
- React.js  
- Axios  
- Tailwind CSS  
- React Router DOM  

**Backend:**  
- Node.js  
- Express.js  
- JWT (jsonwebtoken)  
- dotenv  
- cors  

**Storage:**  
- In-memory arrays (`data.js`) instead of a database  

---

## Folder Structure

task/
├── backend/
│ ├── server.js
│ ├── .env
│ ├── data.js
│ ├── middleware/
│ │ └── authMiddleware.js
│ ├── routes/
│ │ ├── authroutes.js
│ │ └── noteroutes.js
│ └── package.json
└── frontend/
├── src/
│ ├── pages/
│ │ ├── Register.jsx
│ │ ├── Login.jsx
│ │ └── Notes.jsx
│ ├── App.jsx
│ ├── index.js
└── package.json

backend
cd backend
npm install
node server.js

frontend
cd frontend
npm install
npm start

database
Data Storage
Instead of using a database like MongoDB or MySQL,
data is stored in memory using arrays defined in data.js.

How to Use
Register a new user on the Register page.
Log in using the same credentials.
After logging in, you’ll be redirected to the Notes page.
Add a new note by filling in your name, topic, and text.
View your notes instantly after adding.
Delete any note by clicking the DELETE icon on the note card.

Example Test User:
1.user:test12@gmail.com
  psswd: Anu@123 
2.user:test@gmail.com
  psswd: test123


Project Flow Summary

Frontend Flow
Register → Login → Get JWT → Save in localStorage → Access Notes → Add/Delete Notes

Backend Flow
/register → create user  
/login → generate JWT  
/notes → verify token → perform CRUD operations


Developer: Ashwini J V
Role: Frontend Developer |Web developer
Tech Focus: React, Node.js, JavaScript, Tailwind, and APIs
