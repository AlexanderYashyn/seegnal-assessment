#!/usr/bin/env bash
set -e

ROOT="$(cd "$(dirname "$0")" && pwd)"

echo ""
echo "=== Seegnal Assessment – Quick Start ==="
echo ""

echo "[1/4] Installing backend dependencies..."
cd "$ROOT/nodejs-backend" && npm install --silent

echo "[2/4] Seeding database..."
npm run seed

echo "[3/4] Installing frontend dependencies..."
cd "$ROOT/react-frontend" && npm install --silent

echo "[4/4] Starting servers..."

cd "$ROOT/nodejs-backend" && npm run dev &
BACKEND_PID=$!

cd "$ROOT/react-frontend" && npm run dev &
FRONTEND_PID=$!

trap 'echo ""; echo "Shutting down..."; kill $BACKEND_PID $FRONTEND_PID 2>/dev/null; exit' INT TERM

sleep 4

echo ""
echo "============================================"
echo "  App:     http://localhost:5173"
echo "  Swagger: http://localhost:3011/swagger"
echo "============================================"
echo ""
echo "  Login:    admin.test@seegnal.com"
echo "  Password: Abcd1234!"
echo ""
echo "Press Ctrl+C to stop both servers."

wait $BACKEND_PID $FRONTEND_PID
