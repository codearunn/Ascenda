# Ascenda 🚀
### Self-Growth & Productivity Platform

Ascenda is a full-stack MERN application designed to help users build consistency, track daily goals, and visualize personal growth over time.
Unlike traditional to-do apps, Ascenda focuses on **habit formation, streak tracking, and gamified progress visualization** to encourage long-term self-improvement.

---

## Problem Statement
Many productivity apps help users list tasks but fail to encourage consistency and growth.
Ascenda solves this by combining **intelligent streak tracking**, **dynamic progress analytics**, and **gamified user engagement** in a beautifully designed interface that motivates users to build lasting habits.

---

## Key Features ✨

### 🔐 Authentication & Security
- Secure user registration and login
- JWT-based authentication with HTTP-only cookies
- Protected routes and middleware
- Session management with automatic logout

### 🎯 Goal Management
- Create and manage daily goals
- Real-time goal completion tracking
- Goal deletion with confirmation
- Date-based goal organization

### 📊 Dynamic Dashboard Analytics
- **Smart Streak Tracking**: Automatic calculation of current and longest streaks
- **Dynamic Focus Score**: AI-powered scoring based on completion rate, consistency, and streak performance
- **Habits Overview**: Real-time analytics showing consistency patterns and active days
- **Progress Visualization**: Interactive progress bars and completion statistics
- **Weekly & Daily Stats**: Comprehensive goal completion tracking

### 🎮 Gamification Features
- Streak-based motivation system
- Focus score with status indicators (Excellent, Good, Stable, Needs Focus)
- Visual progress indicators
- Achievement-style feedback

### 🎨 Modern UI/UX
- Responsive design with Tailwind CSS
- Dark theme optimized for focus
- Smooth animations and transitions
- Mobile-friendly interface
- Intuitive navigation with profile dropdown

---

## Tech Stack
- **Frontend:** React 19, Vite, Tailwind CSS, Headless UI, Heroicons
- **Backend:** Node.js, Express.js, MongoDB, Mongoose
- **Authentication:** JWT with HTTP-only cookies
- **Styling:** Tailwind CSS with custom components
- **Development:** Hot reloading, ESLint, modern ES6+

---

## Current Status

### ✅ Completed Features

#### Backend Implementation
- **Authentication System**
  - User registration and login with bcrypt password hashing
  - JWT token generation and validation
  - HTTP-only cookie-based session management
  - Protected route middleware (`requireAuth`)
  
- **Goal Management API**
  - `POST /api/goals` - Create new goals
  - `GET /api/goals/today` - Get today's goals
  - `PATCH /api/goals/:id/toggle` - Toggle goal completion
  - `DELETE /api/goals/:id` - Delete goals
  
- **Analytics & Streak System**
  - `GET /api/goals/stats` - Comprehensive dashboard statistics
  - Smart streak calculation algorithm
  - Focus score calculation (0-10 scale)
  - Habits overview analytics
  - User streak tracking (current, longest, last completion date)

- **Data Models**
  - Enhanced User model with streak tracking fields
  - Goal model with completion tracking
  - Proper MongoDB indexing and relationships

#### Frontend Implementation
- **Authentication Flow**
  - Responsive signup/login forms with Tailwind styling
  - Protected routing with automatic redirects
  - Profile dropdown with logout functionality
  - Auth state management across components

- **Dynamic Dashboard**
  - Real-time streak display (current and longest)
  - Dynamic focus score with status indicators
  - Interactive habits overview with progress bars
  - Live goal completion tracking
  - Responsive grid layouts for all screen sizes

- **Goal Management Interface**
  - Today's goals timeline view
  - One-click goal completion toggle
  - Goal deletion with confirmation dialogs
  - Visual feedback for completed goals
  - Real-time stats updates

- **UI/UX Excellence**
  - Fully responsive design (mobile, tablet, desktop)
  - Dark theme with carefully chosen color palette
  - Smooth hover effects and transitions
  - Loading states and error handling
  - Accessibility-friendly components

### 🚧 In Progress (Based on Spec)
- Goal categories and priority levels
- Goal templates system
- Advanced analytics with charts
- Achievement badges and milestones
- Mobile-optimized interactions

### 📋 Planned Features
- Data visualization with interactive charts
- Goal categories and tagging
- Weekly/monthly analytics views
- Achievement system with badges
- Data export functionality
- Progressive web app features
- Social sharing capabilities

---

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn package manager

### Backend Setup
1. Navigate to backend directory and install dependencies:
   ```bash
   cd backend
   npm install
   ```

2. Create environment configuration:
   ```bash
   # Create .env file in backend/ directory
   MONGO_URI=mongodb://localhost:27017/ascenda
   # Or use MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net/ascenda
   JWT_SECRET=your-super-secret-jwt-key-here
   PORT=8000
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```
   
   The API will be available at `http://localhost:8000`

### Frontend Setup
1. Navigate to frontend directory and install dependencies:
   ```bash
   cd frontend
   npm install
   ```

2. Start the Vite development server:
   ```bash
   npm run dev
   ```
   
   The app will be available at `http://localhost:5173`

### Quick Start Guide
1. **Create Account**: Visit `/signup` to create your account
2. **Login**: Use `/login` to access your dashboard
3. **Add Goals**: Click "Add Goal" to create your first daily goal
4. **Track Progress**: Complete goals and watch your streak build
5. **Monitor Analytics**: View your focus score and habits overview

---

## API Endpoints

### Authentication
- `POST /api/user/signup` - User registration
- `POST /api/user/login` - User login
- `GET /api/user/me` - Get current user (protected)
- `POST /api/user/logout` - Logout user

### Goals
- `POST /api/goals` - Create new goal
- `GET /api/goals/today` - Get today's goals
- `PATCH /api/goals/:id/toggle` - Toggle goal completion
- `DELETE /api/goals/:id` - Delete goal
- `GET /api/goals/stats` - Get comprehensive dashboard statistics

### Statistics Response Example
```json
{
  "status": true,
  "data": {
    "today": { "total": 3, "completed": 2 },
    "week": { "total": 15, "completed": 12 },
    "weekCompletionPercentage": 80,
    "streak": { "current": 5, "longest": 12 },
    "focusScore": { "score": 7.8, "status": "Good" },
    "habitsOverview": {
      "consistency": 85,
      "daysActive": 6,
      "totalDays": 7
    }
  }
}
```

---

## Project Structure
```
ascenda/
├── backend/
│   ├── src/
│   │   ├── config/          # Database and environment config
│   │   ├── controllers/     # Route handlers (user, goal)
│   │   ├── middlewares/     # Auth middleware
│   │   ├── models/          # MongoDB schemas (User, Goal)
│   │   ├── routes/          # Express route definitions
│   │   ├── util/            # Helper functions (JWT)
│   │   └── index.js         # Server entry point
│   ├── public/images/       # Static assets
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/      # React components
│   │   │   ├── Dashboard.jsx    # Main dashboard with analytics
│   │   │   ├── AddGoals.jsx     # Goal creation form
│   │   │   ├── Login.jsx        # Authentication forms
│   │   │   ├── Signup.jsx
│   │   │   ├── Profile.jsx      # User profile
│   │   │   ├── Navbar.jsx       # Navigation
│   │   │   └── protectedRoute.jsx # Auth wrapper
│   │   ├── App.jsx          # Main app with routing
│   │   ├── main.jsx         # React entry point
│   │   └── index.css        # Global styles
│   ├── public/images/       # Static assets
│   └── package.json
└── README.md
```

---

## Development Highlights

### Smart Streak Algorithm
The streak calculation system intelligently tracks consecutive days of goal completion:
- Handles timezone differences and date boundaries
- Maintains streak continuity across goal completions
- Automatically updates longest streak records
- Provides grace period for streak continuation

### Dynamic Focus Score
Advanced scoring algorithm that considers:
- **Completion Rate (40%)**: Goals completed vs. goals created
- **Streak Performance (30%)**: Current streak contribution
- **Consistency (30%)**: Active days in the last 7 days

### Real-time Updates
Dashboard metrics update automatically when goals are completed, providing immediate feedback and motivation.

---

## Interview Talking Points
"I built Ascenda, a gamified self-growth platform that combines habit tracking with intelligent analytics. The app features a sophisticated streak calculation system, dynamic focus scoring, and real-time progress visualization. Built with the MERN stack, it demonstrates advanced React patterns, MongoDB aggregation pipelines, and secure JWT authentication. The UI is crafted with Tailwind CSS for a modern, responsive experience that motivates users through data-driven insights and gamification elements."

---

## Contributing
This project is part of a learning journey in full-stack development. Feel free to explore the code and suggest improvements!

---

## License
This project is for educational purposes and personal use.