# AI CODING RULES

## SOURCE OF TRUTH
Before coding, read:
- PROJECT.md
- ARCHITECTURE.md
- API.md
- AI_SPEC.md
- AI_RULES.md

## LOCKED DOCUMENTS
`PROJECT.md` and `API.md` are READ-ONLY for coding agents.

Agents may read and implement them, but must not edit, rename, add endpoints,
remove endpoints or change requirements.

If a change is needed:
STOP and report it to the Tech Lead.

## NEVER
- Change architecture independently.
- Change API contract independently.
- Invent undocumented APIs.
- Expose API keys.
- Hardcode secrets.
- Delete working functionality without understanding it.
- Add unnecessary libraries.
- Create duplicate services.
- Rewrite another team's component unnecessarily.

## FRONTEND
React + TypeScript + Vite + Tailwind.
Use API.md.
Never access the database directly.
Never calculate authoritative score, XP or rankings.

## BACKEND
Python + FastAPI + PostgreSQL.
Own business logic and persistence.
Validate inputs.
Calculate authoritative score, XP, levels and rankings.
Keep AI server-side.

## AI
Follow AI_SPEC.md.
Return structured data.
Do not control authoritative application state.

## BEFORE CODING
1. Read docs.
2. Inspect existing code.
3. Explain the plan.
4. Identify dependencies.
5. Ask instead of guessing.

## AFTER CODING
1. Run the application.
2. Run tests.
3. Verify API compatibility.
4. Report changes and remaining issues.

## DEFINITION OF DONE
Frontend → Backend → Database/AI → Backend → Frontend must work for the feature.
