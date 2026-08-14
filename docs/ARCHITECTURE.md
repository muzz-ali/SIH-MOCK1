# Architecture

Student
  ↓
React + TypeScript Frontend
  ↓ REST/JSON
FastAPI Backend
  ↓             ↓
PostgreSQL     AI Service
  ↓             ↓
  └────── FastAPI ──────┘
              ↓
          Frontend

## Frontend owns
UI/UX, client state, API calls, loading/error states and displaying results.

## Backend owns
Business logic, database, question selection, scoring, XP, levels, streaks, leaderboard, adaptive rules, AI orchestration and validation.

## AI owns
Recommendations, performance analysis and concise educational explanations.

AI is never authoritative for score, XP, levels or rankings.
