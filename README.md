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
- Protected routes for authenticated pages
- Create and manage daily goals *(planned)*
- Mark goals as completed *(planned)*
- Dashboard to view daily and weekly progress
- Secure API with JWT authentication (cookie-based)

---

## Future Enhancements
- Streak tracking and rewards
- Weekly and monthly analytics
- AI-based goal suggestions
- Social sharing & community features
- Mobile application support

---

## Tech Stack
- **Frontend:** React, Vite, Tailwind CSS, Headless UI
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JWT (HTTP-only cookie)
- **Version Control:** Git & GitHub

---

## Current Status

### Backend
- ✅ Node.js + Express + MongoDB (Mongoose)
- ✅ User model and basic auth flows
  - `POST /api/user/signup`
  - `POST /api/user/login`
  - `GET /api/user/me` (requires auth cookie)
  - `POST /api/user/logout` (clears auth cookie)
- ✅ JWT token generation stored in an HTTP-only cookie
- ✅ `requireAuth` middleware to protect `/me` and other private routes
- ✅ `PATCH /api/goals/:id/toggle` - Toggle goal completion
- ✅ `DELETE /api/goals/:id` - Delete a goal
- ✅ `GET /api/goals/stats` - Get user's goal statistics

### Frontend
- ✅ React + Vite + Tailwind CSS
- ✅ Auth pages:
  - `/signup` – Tailwind-styled signup form that calls `POST /api/user/signup`
  - `/login` – Tailwind-styled login form that calls `POST /api/user/login`
- ✅ Auth state:
  - Cookie from backend (`token`)
  - Simple `localStorage.isLoggedIn` flag used by UI
- ✅ Protected routing:
  - `ProtectedRoute` component calls `/api/user/me` with `credentials: "include"`
  - Redirects unauthenticated users to `/login`
- ✅ Navigation:
  - Navbar changes based on login state
  - Profile avatar with dropdown (using `@headlessui/react`) and **Sign out** button
- ✅ Dashboard UI (`/dashboard`):
  - Welcome panel with streak summary
  - Stats row (today’s goals, weekly progress, focus score)
  - “Today’s plan” timeline section
  - “Habits overview” with simple progress bars
- ✅ Goal completion toggle with checkboxes
- ✅ Goal deletion with confirmation
- ✅ Dynamic dashboard stats from real data
- ✅ Visual feedback for completed goals

> Note: Dashboard numbers and goals are currently static placeholders. They will be wired to real data (e.g. `/goals` endpoints) in future iterations.

---

## Getting Started

### Backend setup
1. From the project root, install backend dependencies:
   ```bash
   cd backend
   npm install
   ```
2. Create a `.env` file inside `backend/` with at least:
   ```bash
   MONGO_URI=<your MongoDB connection string>
   JWT_SECRET=<a strong random string>
   PORT=8000        # optional, defaults to 8000
   ```
3. Start the backend server in development mode:
   ```bash
   cd backend
   npm run dev
   ```
4. The API will be available at `http://localhost:8000`.
   Example endpoints:
   - `POST /api/user/signup`
   - `POST /api/user/login`
   - `GET /api/user/me` (requires auth cookie)
   - `POST /api/user/logout`

### Frontend setup
1. From the project root, install frontend dependencies:
   ```bash
   cd frontend
   npm install
   ```
2. Start the Vite dev server:
   ```bash
   cd frontend
   npm run dev
   ```
3. Open the URL printed in the terminal (usually `http://localhost:5173`).
4. Auth flow (current):
   - Go to `/signup` to create an account.
   - Then log in via `/login`.
   - On success, you’ll be redirected to `/dashboard`.
   - `/dashboard` and the profile dropdown are protected by `ProtectedRoute` (they call `/api/user/me`).

---

## Project Structure
```text
ascenda/
├── backend/       # Express API, MongoDB models, auth controllers
├── frontend/      # React + Vite + Tailwind app
├── README.md
└── .gitignore
```

---

## Interview Line
“I built a gamified self-growth platform inspired by Gen‑Z behavior – think Duolingo + habit tracker + life stats. It has a secure Node/Express API with JWT cookies and a protected React/Tailwind dashboard with profile dropdown and auth-aware navigation.”
