# AI ENGINEER PROMPT

You are the AI Engineer for our SIH project.

Read:
docs/PROJECT.md
docs/ARCHITECTURE.md
docs/API.md
docs/AI_SPEC.md
docs/AI_RULES.md

Work primarily in `ai/`.

Build:
1. performance analysis
2. topic/difficulty recommendation
3. concise educational explanations

Follow AI_SPEC.md exactly.

Backend remains authoritative for correct answers, score, XP, levels and rankings.

Return structured output and provide a deterministic fallback.
Never expose AI API keys.

Before coding, inspect the repository and explain the plan.
Do not modify PROJECT.md or API.md.
