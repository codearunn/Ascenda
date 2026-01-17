# Ascenda 🚀
### Self-Growth & Productivity Platform

Ascenda is a full-stack MERN application designed to help users build consistency, track daily goals, and visualize personal growth over time.
Unlike traditional to-do apps, Ascenda focuses on **habit formation, progress tracking, and long-term self-improvement**.

---

## Problem Statement
Many productivity apps help users list tasks but fail to encourage consistency and growth.
Ascenda aims to solve this by combining **goal tracking**, **progress visualization**, and **user accountability** in a simple and intuitive way.

---

## Key Features (MVP)
- User authentication (Register & Login)
- Create and manage daily goals
- Mark goals as completed
- View daily progress on a dashboard
- Secure API with JWT authentication

---

## Future Enhancements
- Streak tracking and rewards
- Weekly and monthly analytics
- AI-based goal suggestions
- Social sharing & community features
- Mobile application support

---

## Tech Stack
- **Frontend:** React.js
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JWT
- **Version Control:** Git & GitHub

---

## Status
- **Backend:** Auth, JWT token generation, and basic user endpoints implemented with MongoDB.
- **Frontend:** Not implemented yet. Planned React dashboard for habits, streaks, and life stats.

---

## Getting Started

### Backend setup
1. From the project root, install backend dependencies:
   - `cd backend && npm install`
2. Create a `.env` file inside `backend/` with at least:
   - `MONGO_URI=<your MongoDB connection string>`
   - `JWT_SECRET=<a strong random string>`
   - (optional) `PORT=8000`
3. Start the backend server in development mode:
   - `cd backend && npm run dev`
4. The API will be available at `http://localhost:8000`.
   - Example endpoints:
     - `POST /api/user/signup`
     - `POST /api/user/login`
     - `GET /api/user/me` (requires JWT token)

---

## Project Structure
```text
ascenda/
├── backend/
├── frontend/
├── README.md
└── .gitignore
```

---

## Interview Line
“I built a gamified self-growth platform inspired by Gen‑Z behavior – think Duolingo + habit tracker + life stats.”
