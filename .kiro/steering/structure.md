# Project Structure

## Root Level
```
ascenda/
├── backend/           # Express API server
├── frontend/          # React application
├── node_modules/      # Root dependencies (cookie-parser)
├── package.json       # Root package config
└── README.md          # Project documentation
```

## Backend Structure (`/backend`)
```
backend/
├── src/
│   ├── config/        # Database and environment configuration
│   ├── controllers/   # Route handlers (user.js, goal.js)
│   ├── middlewares/   # Auth middleware and request processing
│   ├── models/        # Mongoose schemas (user.js, goal.js)
│   ├── routes/        # Express route definitions
│   ├── util/          # Helper functions (JWT token creation)
│   └── index.js       # Main server entry point
├── public/images/     # Static assets (default profile pics)
├── .env               # Environment variables (not in git)
└── package.json       # Backend dependencies
```

## Frontend Structure (`/frontend`)
```
frontend/
├── src/
│   ├── components/    # React components
│   │   ├── Home.jsx           # Landing page
│   │   ├── Login.jsx          # Authentication forms
│   │   ├── Signup.jsx
│   │   ├── Dashboard.jsx      # Main user interface
│   │   ├── AddGoals.jsx       # Goal creation
│   │   ├── Profile.jsx        # User profile
│   │   ├── Navbar.jsx         # Navigation component
│   │   └── protectedRoute.jsx # Auth wrapper
│   ├── App.jsx        # Main app component with routing
│   ├── main.jsx       # React entry point
│   └── index.css      # Global styles
├── public/images/     # Static assets
└── package.json       # Frontend dependencies
```

## Code Organization Patterns
- **Controllers**: Handle business logic and API responses
- **Models**: Define data schemas with validation and middleware
- **Routes**: Define API endpoints and middleware chains
- **Components**: Functional React components with hooks
- **Protected Routes**: Authentication wrapper for secure pages
- **Middleware**: JWT verification and request processing

## File Naming Conventions
- Backend: lowercase with extensions (.js)
- Frontend: PascalCase for components (.jsx)
- Configuration: lowercase (package.json, .env)
- Static assets: descriptive names in /public/images/