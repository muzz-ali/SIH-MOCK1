from fastapi import APIRouter,HTTPException
from pydantic import BaseModel
from typing import List

router=APIRouter()
# DEVELOPMENT ONLY: replace with PostgreSQL + seed data.
QUESTIONS=[
{"id":1,"question":"Which planet is known as the Red Planet?","options":["Earth","Mars","Jupiter","Venus"],"correctAnswer":1,"category":"general_knowledge","topic":"Space","difficulty":"easy"},
{"id":2,"question":"How many continents are there?","options":["5","6","7","8"],"correctAnswer":2,"category":"general_knowledge","topic":"Geography","difficulty":"easy"},
]
QUIZZES={}

class StartQuiz(BaseModel):
    userId:int
    category:str
    questionCount:int=10
class Answer(BaseModel):
    questionId:int
    selectedOption:int
class SubmitQuiz(BaseModel):
    userId:int
    answers:List[Answer]

@router.post("/quizzes",status_code=201)
def create_quiz(payload:StartQuiz):
    if not 1<=payload.questionCount<=50: raise HTTPException(400,"questionCount must be between 1 and 50")
    pool=[q for q in QUESTIONS if q["category"]==payload.category] or QUESTIONS
    selected=(pool*((payload.questionCount//len(pool))+1))[:payload.questionCount]
    quiz_id=max(QUIZZES.keys(),default=100)+1
    QUIZZES[quiz_id]={"userId":payload.userId,"questions":selected}
    public=[{k:v for k,v in q.items() if k!="correctAnswer"} for q in selected]
    return {"quizId":quiz_id,"category":payload.category,"questions":public}

@router.post("/quizzes/{quiz_id}/submit")
def submit_quiz(quiz_id:int,payload:SubmitQuiz):
    quiz=QUIZZES.get(quiz_id)
    if not quiz: raise HTTPException(404,"Quiz not found")
    correct=0; stats={}
    for a in payload.answers:
        q=next((q for q in quiz["questions"] if q["id"]==a.questionId),None)
        if not q: continue
        s=stats.setdefault(q["topic"],{"correct":0,"total":0}); s["total"]+=1
        if a.selectedOption==q["correctAnswer"]:
            correct+=1; s["correct"]+=1
    total=len(quiz["questions"]); xp=correct*10; level=1+xp//100
    performance=[{"topic":t,"correct":s["correct"],"total":s["total"],"percentage":round(s["correct"]/s["total"]*100,1)} for t,s in stats.items()]
    return {"quizId":quiz_id,"score":correct,"totalQuestions":total,"correctAnswers":correct,"xpEarned":xp,
            "level":level,"previousLevel":max(1,level),"levelUp":False,"streakDays":1,"topicPerformance":performance}

@router.get("/quizzes/{quiz_id}/result")
def quiz_result(quiz_id:int):
    if quiz_id not in QUIZZES: raise HTTPException(404,"Quiz not found")
    return {"quizId":quiz_id,"message":"Result endpoint placeholder"}
