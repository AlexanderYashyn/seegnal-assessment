# Seegnal Assessment

A clinical drug-interaction checker. The app lets a clinician build a patient's medication list and get real-time alerts when dangerous drug interactions are detected.

## Project structure

```
seegnal-assessment/
├── nodejs-backend/   # Express + SQLite REST API (port 3011)
└── react-frontend/   # React + Vite SPA (port 5173)
```

---

## Prerequisites

- **Node.js** 18 or later
- **npm** 8 or later
- **Git Bash** (Windows) or any Unix-compatible shell

---

## Quick start

For first-time setup, a single script installs dependencies, seeds the database, and starts both servers:

```bash
bash start.sh
```

Once running:

| | URL |
|---|---|
| App | http://localhost:5173 |
| Swagger | http://localhost:3011/swagger |

Default credentials: `admin.test@seegnal.com` / `Abcd1234!`

Press `Ctrl+C` to stop both servers.

> **Note:** `start.sh` re-seeds the database on every run, resetting all data to the defaults.

---

## Manual setup

### Configure the backend environment

Create a `.env` file in `nodejs-backend/` before running anything:

```env
PORT=3011
CORS_ORIGIN=http://localhost:5173
JWT_SECRET=your_secret_here
```

---

## Backend

### 1. Install dependencies

```bash
cd nodejs-backend
npm install
```

### 2. Seed the database

Run once to create the SQLite database and populate it with sample drugs, interactions, and a test user:

```bash
npm run seed
```

Default test credentials:
- **Email:** `admin.test@seegnal.com`
- **Password:** `Abcd1234!`

### 4. Start the server

```bash
# Development (hot reload)
npm run dev

# Production
npm run build
npm start
```

The API will be available at `http://localhost:3011`.
Swagger docs: `http://localhost:3011/swagger`

---

## Frontend

### 1. Install dependencies

```bash
cd react-frontend
npm install
```

### 2. Start the dev server

```bash
npm run dev
```

Open `http://localhost:5173` in your browser.

> The frontend proxies all `/api` requests to `http://localhost:3011`, so **both servers must be running** at the same time.

### Other commands

```bash
npm run build    # Production build (outputs to dist/)
npm run preview  # Preview the production build locally
npm run lint     # Run ESLint
```

---

## Running the full app

Open two terminals:

```bash
# Terminal 1 – backend
cd nodejs-backend && npm run dev

# Terminal 2 – frontend
cd react-frontend && npm run dev
```

Then navigate to `http://localhost:5173` and log in with the seeded credentials.
