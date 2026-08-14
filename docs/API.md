# API CONTRACT — LOCKED

STATUS: LOCKED
VERSION: v1.0

This is the single source of truth for frontend/backend communication.

DO NOT independently change endpoint paths, HTTP methods, request fields,
response fields, data types, required/optional fields or status codes.

Changes require Tech Lead approval, an update to this document, and testing.

## Common Error
```json
{"error":{"code":"ERROR_CODE","message":"Human-readable message"}}
```

## GET /api/health
Response:
```json
{"status":"ok"}
```

## GET /api/users/{user_id}
```json
{
  "id":1,
  "displayName":"Student",
  "school":"Example School",
  "grade":8,
  "xp":420,
  "level":4,
  "streakDays":5
}
```

## GET /api/subjects
```json
{
  "subjects":[
    {"id":"science","name":"Science"},
    {"id":"mathematics","name":"Mathematics"},
    {"id":"general_knowledge","name":"General Knowledge"}
  ]
}
```

## POST /api/quizzes
Request:
```json
{"userId":1,"category":"general_knowledge","questionCount":10}
```

Response 201:
```json
{
  "quizId":101,
  "category":"general_knowledge",
  "questions":[
    {
      "id":25,
      "question":"Example question?",
      "options":["Option A","Option B","Option C","Option D"],
      "category":"general_knowledge",
      "topic":"Geography",
      "difficulty":"easy"
    }
  ]
}
```

Never return `correctAnswer` when starting a quiz.

## POST /api/quizzes/{quiz_id}/submit
Request:
```json
{
  "userId":1,
  "answers":[{"questionId":25,"selectedOption":1}]
}
```

`selectedOption` is zero-based.

Response:
```json
{
  "quizId":101,
  "score":8,
  "totalQuestions":10,
  "correctAnswers":8,
  "xpEarned":90,
  "level":4,
  "previousLevel":4,
  "levelUp":false,
  "streakDays":6,
  "topicPerformance":[
    {"topic":"Geography","correct":4,"total":5,"percentage":80}
  ]
}
```

## GET /api/quizzes/{quiz_id}/result
Response:
```json
{
  "quizId":101,
  "score":8,
  "totalQuestions":10,
  "correctAnswers":8,
  "xpEarned":90,
  "level":4,
  "levelUp":false,
  "topicPerformance":[
    {"topic":"Geography","correct":4,"total":5,"percentage":80}
  ]
}
```

## GET /api/users/{user_id}/progress
```json
{
  "userId":1,
  "xp":420,
  "level":4,
  "streakDays":5,
  "quizzesCompleted":12,
  "questionsAnswered":120,
  "accuracy":76.7,
  "strongTopics":["Geography"],
  "weakTopics":["Fractions"]
}
```

## GET /api/leaderboard?period=weekly&limit=20
```json
{
  "period":"weekly",
  "entries":[
    {"rank":1,"userId":5,"displayName":"Student A","xp":1240,"level":7},
    {"rank":2,"userId":1,"displayName":"Student B","xp":1180,"level":6}
  ]
}
```

## GET /api/daily-challenge?userId=1
```json
{
  "challengeId":50,
  "title":"Daily Challenge",
  "questionCount":10,
  "xpReward":100,
  "completed":false,
  "streakDays":5
}
```

## GET /api/users/{user_id}/recommendation
```json
{
  "userId":1,
  "recommendedCategory":"mathematics",
  "recommendedTopic":"fractions",
  "recommendedDifficulty":"easy",
  "reason":"Recent performance indicates this topic needs more practice."
}
```

## POST /api/ai/explain
Request:
```json
{"userId":1,"questionId":25,"selectedOption":2}
```

Response:
```json
{
  "questionId":25,
  "explanation":"The correct answer is ...",
  "correct":false
}
```

## Status Codes
200 success
201 created
400 bad request
401 unauthorized
403 forbidden
404 not found
422 validation error
500 server error
503 dependent service unavailable
