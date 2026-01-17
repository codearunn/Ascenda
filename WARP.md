# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project overview

Ascenda is a full-stack MERN application focused on self-growth and productivity. The goal is to help users build consistency, track daily goals, and visualize personal growth over time, with features like goal tracking, daily progress views, and secure authenticated APIs.

Planned enhancements (per `README.md`) include streak tracking, analytics, AI-based goal suggestions, social/community features, and mobile support.

## Repository layout

- `backend/` – Node.js + Express API server with MongoDB (Mongoose) for persistence.
- `frontend/` – Intended React frontend (per README); currently only a basic `package.json` scaffold with no application code.
- `README.md` – High-level product description, tech stack, and project structure.

## Backend architecture (`backend/`)

### Runtime and environment

- Node.js CommonJS app using:
  - `express` for HTTP routing.
  - `mongoose` for MongoDB access.
  - `dotenv` for environment variable loading.
- Environment variables (expected in a `.env` file or process environment):
  - `MONGO_URI` – MongoDB connection string.
  - `PORT` – Optional HTTP port; defaults to `8000`.

### Entry point and server wiring

- `backend/src/index.js`
  - Loads environment variables via `dotenv`.
  - Imports and invokes `connectionToDB` from `src/config/connectDB.js` with `process.env.MONGO_URI`.
  - On successful connection, logs `"DB connected"`; otherwise logs the error.
  - Creates an Express app and mounts routes from `src/routes/user.js` under the `/api` prefix.
  - Starts the HTTP server on `PORT` (or `8000` by default).

This file is the main place to:
- Add global middleware (e.g. JSON parsing, logging, CORS) before mounting routes.
- Mount additional route modules under new prefixes (e.g. `/api/auth`, `/api/goals`).

### Configuration

- `backend/src/config/connectDB.js`
  - Small wrapper around `mongoose.connect(url)`.
  - Any future Mongo connection options (e.g. pool size, timeouts) should be centralized here.

- `backend/src/config/env.js`
  - Currently empty placeholder; can be used to centralize environment variable loading/validation if desired.

### Data model layer

- `backend/src/models/user.js`
  - Declares a `User` Mongoose model with a `userSchema` that includes:
    - `name` – Required `String`, trimmed, length 2–50.
    - `email` – Required unique `String`, trimmed, lowercased.
    - `password` – Required `String`, `select: false` (omitted from query results by default), min length 6.
  - Schema has `{ timestamps: true }`, so `createdAt` and `updatedAt` are automatically managed by Mongoose.

All user-related persistence should go through this `User` model. New fields for user profile, settings, etc., should be added here.

### Controllers and routing

- `backend/src/controllers/user.js`
  - Exposes `testUserController(req, res)` – a simple health-check style endpoint.
  - Returns a JSON payload `{ success: true, message: "User controller is working" }` with HTTP 200.
  - On unexpected errors, responds with HTTP 500 and a generic error payload.

- `backend/src/routes/user.js`
  - Creates an Express router and wires `GET /test` to `testUserController`.
  - This router is mounted in `src/index.js` under `/api`, so the full path is `GET /api/test`.

Pattern for future endpoints:
- Add new handler functions in an appropriate controller file under `src/controllers/`.
- Wire them in a router module in `src/routes/`.
- Mount that router from `src/index.js` under a suitable prefix.

## Frontend (`frontend/`)

- `frontend/package.json` defines a minimal Node entrypoint with `start` and `dev` scripts, but there is currently no application code (no `index.js` / React app structure checked in at this time).
- The README states the intent is a React.js frontend; once implemented, update this section to describe the component structure and build tooling.

## Development workflow and commands

All commands below are run from the repository root unless otherwise noted.

### Dependency installation

- Install backend dependencies:
  - `cd backend && npm install`
- Install frontend dependencies (scaffold only at present):
  - `cd frontend && npm install`

### Running the backend API server

From the repo root:

- Start backend in development mode with auto-reload via `nodemon`:
  - `cd backend && npm run dev`
- Start backend with plain Node (no auto-reload), suitable for simple production-like runs:
  - `cd backend && npm start`

Before starting the server, ensure the `MONGO_URI` environment variable is set to a valid MongoDB connection string and that the target database is reachable.

### Frontend dev server

- `frontend/package.json` defines `start` and `dev` scripts that invoke `node index.js`, but there is currently no frontend implementation in this repository. Once a real frontend (e.g. React app) is added, adjust these scripts and augment this section with the actual dev/build commands.

### Linting, testing, and single-test runs

At the time of writing:
- Neither `backend/package.json` nor `frontend/package.json` defines scripts for linting or testing.

When linting and test tooling is introduced (e.g. ESLint, Jest, Vitest, Playwright):
- Add appropriate `"lint"`, `"test"`, and single-test scripts to the respective `package.json` files.
- Update this section with exact commands, including how to run a single test file or test case.
