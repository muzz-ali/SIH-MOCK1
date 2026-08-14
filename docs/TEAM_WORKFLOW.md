# TEAM WORKFLOW

## Roles
Frontend Engineer → `frontend/`
Backend Engineer → `backend/`
AI Engineer → `ai/`
Tech Lead → architecture, docs, integration, testing and deployment

## Branches
- `main` = stable
- `feature/frontend`
- `feature/backend`
- `feature/ai`

## Rule
No direct pushes to `main` once branch protection is enabled.

## Integration order
1. Health
2. User/profile
3. Question retrieval
4. Quiz creation
5. Answer submission
6. Score/XP/level
7. Leaderboard
8. Daily challenge
9. Recommendation
10. AI explanation
11. End-to-end testing

## First end-to-end test
Frontend
→ POST /api/quizzes
→ display questions
→ POST /api/quizzes/{id}/submit
→ display score + XP

Do this early rather than waiting until every feature is finished.
