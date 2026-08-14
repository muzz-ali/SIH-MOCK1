import type {Quiz, QuizResult} from "../types/api";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8000/api";
async function request<T>(path:string, options?:RequestInit):Promise<T>{
  const response=await fetch(`${API_BASE_URL}${path}`,{
    headers:{"Content-Type":"application/json",...(options?.headers??{})},...options
  });
  if(!response.ok){
    const body=await response.json().catch(()=>null);
    throw new Error(body?.error?.message ?? `Request failed: ${response.status}`);
  }
  return response.json() as Promise<T>;
}
export const api={
  health:()=>request<{status:string}>("/health"),
  startQuiz:(userId:number,category:string,questionCount=10)=>request<Quiz>("/quizzes",{
    method:"POST",body:JSON.stringify({userId,category,questionCount})
  }),
  submitQuiz:(quizId:number,userId:number,answers:{questionId:number;selectedOption:number}[])=>
    request<QuizResult>(`/quizzes/${quizId}/submit`,{
      method:"POST",body:JSON.stringify({userId,answers})
    })
};
