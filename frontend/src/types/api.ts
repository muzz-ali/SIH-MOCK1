export interface Question {
  id:number; question:string; options:string[];
  category:string; topic:string; difficulty:"easy"|"medium"|"hard";
}
export interface Quiz { quizId:number; category:string; questions:Question[]; }
export interface QuizResult {
  quizId:number; score:number; totalQuestions:number; correctAnswers:number;
  xpEarned:number; level:number; previousLevel:number; levelUp:boolean; streakDays:number;
  topicPerformance:{topic:string;correct:number;total:number;percentage:number}[];
}
