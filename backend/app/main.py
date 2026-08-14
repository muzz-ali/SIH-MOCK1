from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.quiz import router as quiz_router

app=FastAPI(title="SIH Gamified Learning API",version="1.0")
app.add_middleware(CORSMiddleware,allow_origins=["http://localhost:5173"],allow_credentials=True,allow_methods=["*"],allow_headers=["*"])
app.include_router(quiz_router,prefix="/api")

@app.get("/api/health")
def health(): return {"status":"ok"}
