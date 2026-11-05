export type Category = 
  | 'General Knowledge'
  | 'Science'
  | 'Mathematics'
  | 'Computer Science'
  | 'Programming'
  | 'English'
  | 'Logical Reasoning'
  | 'Current Affairs';

export type Difficulty = 'Easy' | 'Medium' | 'Hard';

export interface Question {
  id: number;
  question: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  correct_answer: 'A' | 'B' | 'C' | 'D';
  category: Category;
  difficulty: Difficulty;
  explanation: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
  avatar_url?: string;
  created_at: string;
}

export interface QuizResult {
  id: number;
  username: string;
  category: Category | 'Mixed' | 'Daily Challenge';
  difficulty: Difficulty | 'Mixed';
  total_questions: number;
  correct_answers: number;
  incorrect_answers: number;
  unanswered: number;
  score: number;
  percentage: number;
  time_spent_seconds: number;
  date: string;
  user_answers?: {
    question_id: number;
    selected_option: 'A' | 'B' | 'C' | 'D' | null;
    is_correct: boolean;
  }[];
}

export interface CategoryMeta {
  name: Category;
  description: string;
  iconName: string;
  color: string;
  accentBg: string;
  questionCount: number;
}

export type ActiveScreen = 
  | 'splash'
  | 'home'
  | 'categories'
  | 'difficulty'
  | 'quiz'
  | 'result'
  | 'review'
  | 'leaderboard'
  | 'profile'
  | 'daily';

export type MainTab = 'app' | 'code' | 'lab_report' | 'sqlite_console';
