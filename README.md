# SIH — Gamified Learning Platform for Rural Education

## Read first
1. docs/PROJECT.md
2. docs/API.md
3. docs/ARCHITECTURE.md
4. docs/AI_SPEC.md
5. docs/AI_RULES.md
6. docs/TEAM_WORKFLOW.md

`PROJECT.md` and `API.md` are LOCKED.

## Folders
- frontend — React + TypeScript
- backend — FastAPI
- ai — AI layer
- docs — contracts and rules

## Starter status
The frontend and backend include a minimal quiz flow for early integration testing.
The backend uses temporary in-memory sample questions. It is NOT the final 200-question PostgreSQL implementation.

## Team branches
- main
- feature/frontend
- feature/backend
- feature/ai

## First target
Frontend → POST /api/quizzes → display questions → POST /api/quizzes/{id}/submit → display score + XP.
