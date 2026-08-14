import {useState} from "react";
import {api} from "./services/api";
import type {Quiz,QuizResult} from "./types/api";

export default function App(){
  const [quiz,setQuiz]=useState<Quiz|null>(null);
  const [result,setResult]=useState<QuizResult|null>(null);
  const [error,setError]=useState("");
  async function startQuiz(){
    setError(""); setResult(null);
    try{setQuiz(await api.startQuiz(1,"general_knowledge",10))}
    catch(e){setError(e instanceof Error?e.message:"Could not start quiz")}
  }
  if(result) return <main className="page"><section className="card">
    <p className="eyebrow">QUIZ COMPLETE</p><h1>{result.score}/{result.totalQuestions}</h1>
    <p>You earned {result.xpEarned} XP.</p><p>Level {result.level} · Streak {result.streakDays} days</p>
    <button onClick={()=>{setQuiz(null);setResult(null)}}>Back to home</button>
  </section></main>;
  return <main className="page"><section className="hero">
    <p className="eyebrow">SMART INDIA HACKATHON</p><h1>Learn. Play. Level Up.</h1>
    <p>Gamified learning built for students.</p><button onClick={startQuiz}>Start a Quiz</button>
    {error&&<p className="error">{error}</p>}
  </section>{quiz&&<QuizView quiz={quiz} onResult={setResult} onError={setError}/>}</main>
}

function QuizView({quiz,onResult,onError}:{quiz:Quiz;onResult:(r:QuizResult)=>void;onError:(e:string)=>void}){
  const [index,setIndex]=useState(0);
  const [answers,setAnswers]=useState<{questionId:number;selectedOption:number}[]>([]);
  const q=quiz.questions[index];
  function choose(option:number){
    setAnswers(prev=>[...prev.filter(a=>a.questionId!==q.id),{questionId:q.id,selectedOption:option}]);
  }
  async function submit(){
    try{onResult(await api.submitQuiz(quiz.quizId,1,answers))}
    catch(e){onError(e instanceof Error?e.message:"Could not submit quiz")}
  }
  return <section className="card quiz"><div className="progress">{index+1} / {quiz.questions.length}</div>
    <h2>{q.question}</h2><div className="options">
      {q.options.map((o,i)=><button key={o} onClick={()=>choose(i)}>{o}</button>)}
    </div><div className="actions">
      {index>0&&<button onClick={()=>setIndex(index-1)}>Previous</button>}
      {index<quiz.questions.length-1?<button onClick={()=>setIndex(index+1)}>Next</button>:<button onClick={submit}>Submit Quiz</button>}
    </div>
  </section>
}
