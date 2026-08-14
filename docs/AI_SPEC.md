# AI SPECIFICATION

The AI supports adaptive learning recommendations and concise answer explanations.

AI is NOT authoritative for score, correct answers, XP, levels or rankings.

## Recommendation input
```json
{
  "userId":1,
  "currentLevel":4,
  "recentPerformance":[
    {"category":"mathematics","topic":"fractions","accuracy":45}
  ]
}
```

## Recommendation output
```json
{
  "recommendedCategory":"mathematics",
  "recommendedTopic":"fractions",
  "recommendedDifficulty":"easy",
  "reason":"Student should practice fractions before moving to harder questions."
}
```

Allowed difficulty: easy, medium, hard.

## Hybrid strategy
1. Backend calculates objective performance.
2. Deterministic rules provide a safe baseline.
3. AI recommends category/topic/difficulty when useful.
4. Backend validates AI output.
5. Backend selects actual questions from the question bank.

If AI is unavailable, deterministic adaptive rules continue the quiz.

AI keys stay server-side in environment variables.
