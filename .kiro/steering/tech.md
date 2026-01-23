# Technology Stack

## Architecture
Full-stack MERN application with separate frontend and backend services.

## Backend Stack
- **Runtime**: Node.js with Express.js framework
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT tokens stored in HTTP-only cookies
- **Security**: bcrypt for password hashing, CORS enabled
- **Development**: nodemon for hot reloading

## Frontend Stack
- **Framework**: React 19 with Vite build tool
- **Styling**: Tailwind CSS with PostCSS
- **UI Components**: Headless UI, Heroicons, Lucide React
- **Routing**: React Router DOM v7
- **Development**: ESLint for code quality

## Development Commands

### Backend
```bash
cd backend
npm install          # Install dependencies
npm run dev          # Start development server (nodemon)
npm start           # Start production server
```

### Frontend
```bash
cd frontend
npm install          # Install dependencies
npm run dev          # Start Vite dev server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

## Environment Setup
Backend requires `.env` file with:
- `MONGO_URI` - MongoDB connection string
- `JWT_SECRET` - Secret for JWT token signing
- `PORT` - Server port (defaults to 8000)

## API Endpoints
- Authentication: `/api/user/*`
- Goals: `/api/goals/*`
- CORS configured for `http://localhost:5173` (frontend dev server)