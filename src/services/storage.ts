/**
 * SQLite Local Storage Manager for QuizMaster
 * Implements relational schema simulation, CRUD operations, and SQL runner
 * for B.Tech academic lab requirements and offline mobile persistence.
 */

import { INITIAL_QUESTIONS } from '../data/questions';
import { Question, QuizResult, User } from '../types/quiz';

const USERS_KEY = 'quizmaster_sqlite_users';
const QUESTIONS_KEY = 'quizmaster_sqlite_questions';
const RESULTS_KEY = 'quizmaster_sqlite_results';
const ACTIVE_USER_KEY = 'quizmaster_active_user_id';

export interface SqlQueryResult {
  columns: string[];
  rows: Record<string, unknown>[];
  affectedRows?: number;
  message?: string;
  error?: string;
}

class StorageService {
  constructor() {
    this.initDatabase();
  }

  // Initialize SQLite tables
  public initDatabase(): void {
    if (typeof window === 'undefined') return;

    // 1. Initialize Users Table
    const storedUsers = localStorage.getItem(USERS_KEY);
    if (!storedUsers) {
      const defaultUsers: User[] = [
        {
          id: 1,
          username: 'Priya Sharma',
          email: 'priya.btech@university.edu.in',
          avatar_url: '',
          created_at: new Date().toISOString()
        },
        {
          id: 2,
          username: 'Rahul Verma',
          email: 'rahul.cse@university.edu.in',
          avatar_url: '',
          created_at: new Date(Date.now() - 86400000 * 5).toISOString()
        },
        {
          id: 3,
          username: 'Ananya Rao',
          email: 'ananya.it@university.edu.in',
          avatar_url: '',
          created_at: new Date(Date.now() - 86400000 * 12).toISOString()
        }
      ];
      localStorage.setItem(USERS_KEY, JSON.stringify(defaultUsers));
      localStorage.setItem(ACTIVE_USER_KEY, '1');
    }

    // 2. Initialize Questions Table
    const storedQuestions = localStorage.getItem(QUESTIONS_KEY);
    if (!storedQuestions || JSON.parse(storedQuestions).length === 0) {
      localStorage.setItem(QUESTIONS_KEY, JSON.stringify(INITIAL_QUESTIONS));
    }

    // 3. Initialize Quiz Results Table
    const storedResults = localStorage.getItem(RESULTS_KEY);
    if (!storedResults) {
      const seededResults: QuizResult[] = [
        {
          id: 1,
          username: 'Priya Sharma',
          category: 'Programming',
          difficulty: 'Medium',
          total_questions: 10,
          correct_answers: 9,
          incorrect_answers: 1,
          unanswered: 0,
          score: 9,
          percentage: 90,
          time_spent_seconds: 145,
          date: new Date(Date.now() - 86400000).toISOString()
        },
        {
          id: 2,
          username: 'Rahul Verma',
          category: 'Computer Science',
          difficulty: 'Hard',
          total_questions: 10,
          correct_answers: 8,
          incorrect_answers: 2,
          unanswered: 0,
          score: 8,
          percentage: 80,
          time_spent_seconds: 172,
          date: new Date(Date.now() - 86400000 * 2).toISOString()
        },
        {
          id: 3,
          username: 'Ananya Rao',
          category: 'Mathematics',
          difficulty: 'Medium',
          total_questions: 10,
          correct_answers: 10,
          incorrect_answers: 0,
          unanswered: 0,
          score: 10,
          percentage: 100,
          time_spent_seconds: 130,
          date: new Date(Date.now() - 86400000 * 3).toISOString()
        },
        {
          id: 4,
          username: 'Vikram Seth',
          category: 'Science',
          difficulty: 'Easy',
          total_questions: 10,
          correct_answers: 7,
          incorrect_answers: 3,
          unanswered: 0,
          score: 7,
          percentage: 70,
          time_spent_seconds: 160,
          date: new Date(Date.now() - 86400000 * 4).toISOString()
        }
      ];
      localStorage.setItem(RESULTS_KEY, JSON.stringify(seededResults));
    }
  }

  // ----------------------------------------------------
  // USERS TABLE CRUD
  // ----------------------------------------------------
  public getUsers(): User[] {
    try {
      const data = localStorage.getItem(USERS_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  public getActiveUser(): User {
    const users = this.getUsers();
    const activeIdStr = localStorage.getItem(ACTIVE_USER_KEY);
    const activeId = activeIdStr ? parseInt(activeIdStr, 10) : 1;
    const user = users.find(u => u.id === activeId);
    return user || users[0] || {
      id: 1,
      username: 'Priya Sharma',
      email: 'priya.btech@university.edu.in',
      created_at: new Date().toISOString()
    };
  }

  public updateUser(id: number, username: string, email: string): User {
    const users = this.getUsers();
    const idx = users.findIndex(u => u.id === id);
    if (idx !== -1) {
      users[idx] = { ...users[idx], username, email };
      localStorage.setItem(USERS_KEY, JSON.stringify(users));
      return users[idx];
    }
    const newUser: User = {
      id,
      username,
      email,
      created_at: new Date().toISOString()
    };
    users.push(newUser);
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    return newUser;
  }

  // ----------------------------------------------------
  // QUESTIONS TABLE CRUD
  // ----------------------------------------------------
  public getQuestions(): Question[] {
    try {
      const data = localStorage.getItem(QUESTIONS_KEY);
      return data ? JSON.parse(data) : INITIAL_QUESTIONS;
    } catch {
      return INITIAL_QUESTIONS;
    }
  }

  public getQuestionsByCategory(category: string, difficulty?: string): Question[] {
    const all = this.getQuestions();
    return all.filter(q => {
      const catMatch = category === 'Mixed' || q.category === category;
      const diffMatch = !difficulty || difficulty === 'Mixed' || q.difficulty === difficulty;
      return catMatch && diffMatch;
    });
  }

  public addQuestion(question: Omit<Question, 'id'>): Question {
    const all = this.getQuestions();
    const nextId = all.length > 0 ? Math.max(...all.map(q => q.id)) + 1 : 1;
    const newQ: Question = { ...question, id: nextId };
    all.push(newQ);
    localStorage.setItem(QUESTIONS_KEY, JSON.stringify(all));
    return newQ;
  }

  public deleteQuestion(id: number): boolean {
    const all = this.getQuestions();
    const filtered = all.filter(q => q.id !== id);
    if (filtered.length !== all.length) {
      localStorage.setItem(QUESTIONS_KEY, JSON.stringify(filtered));
      return true;
    }
    return false;
  }

  // ----------------------------------------------------
  // QUIZ RESULTS TABLE CRUD
  // ----------------------------------------------------
  public getResults(): QuizResult[] {
    try {
      const data = localStorage.getItem(RESULTS_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  public saveResult(result: Omit<QuizResult, 'id'>): QuizResult {
    const all = this.getResults();
    const nextId = all.length > 0 ? Math.max(...all.map(r => r.id)) + 1 : 1;
    const newResult: QuizResult = { ...result, id: nextId };
    all.unshift(newResult); // newest first
    localStorage.setItem(RESULTS_KEY, JSON.stringify(all));
    return newResult;
  }

  public deleteResult(id: number): boolean {
    const all = this.getResults();
    const filtered = all.filter(r => r.id !== id);
    if (filtered.length !== all.length) {
      localStorage.setItem(RESULTS_KEY, JSON.stringify(filtered));
      return true;
    }
    return false;
  }

  public clearAllResults(): void {
    localStorage.setItem(RESULTS_KEY, JSON.stringify([]));
  }

  // ----------------------------------------------------
  // ANALYTICS & STATS
  // ----------------------------------------------------
  public getUserAnalytics(username: string) {
    const all = this.getResults().filter(r => r.username.toLowerCase() === username.toLowerCase());
    const totalAttempted = all.length;
    if (totalAttempted === 0) {
      return {
        totalQuizzes: 0,
        totalCorrect: 0,
        totalQuestions: 0,
        highestScore: 0,
        averagePercentage: 0,
        bestCategory: 'N/A'
      };
    }

    const totalCorrect = all.reduce((acc, r) => acc + r.correct_answers, 0);
    const totalQuestions = all.reduce((acc, r) => acc + r.total_questions, 0);
    const highestScore = Math.max(...all.map(r => r.score));
    const averagePercentage = Math.round(
      all.reduce((acc, r) => acc + r.percentage, 0) / totalAttempted
    );

    // Calculate best category
    const catScores: Record<string, { total: number; correct: number }> = {};
    all.forEach(r => {
      if (!catScores[r.category]) {
        catScores[r.category] = { total: 0, correct: 0 };
      }
      catScores[r.category].total += r.total_questions;
      catScores[r.category].correct += r.correct_answers;
    });

    let bestCat = 'General Knowledge';
    let highestRatio = -1;
    Object.entries(catScores).forEach(([cat, data]) => {
      const ratio = data.total > 0 ? data.correct / data.total : 0;
      if (ratio > highestRatio) {
        highestRatio = ratio;
        bestCat = cat;
      }
    });

    return {
      totalQuizzes: totalAttempted,
      totalCorrect,
      totalQuestions,
      highestScore,
      averagePercentage,
      bestCategory: bestCat
    };
  }

  // ----------------------------------------------------
  // RAW SQL EXECUTION ENGINE (For Academic Lab Demos)
  // ----------------------------------------------------
  public executeSql(sql: string): SqlQueryResult {
    const trimmed = sql.trim().replace(/;$/, '');
    const upper = trimmed.toUpperCase();

    try {
      // 1. SELECT queries
      if (upper.startsWith('SELECT')) {
        let table = '';
        if (upper.includes('FROM USERS')) table = 'users';
        else if (upper.includes('FROM QUESTIONS')) table = 'questions';
        else if (upper.includes('FROM QUIZ_RESULTS') || upper.includes('FROM RESULTS')) table = 'quiz_results';

        if (!table) {
          return {
            columns: ['error'],
            rows: [{ error: 'Unrecognized table. Available tables: users, questions, quiz_results' }],
            error: 'Unknown table'
          };
        }

        let rawRows: Record<string, unknown>[] = [];
        if (table === 'users') rawRows = this.getUsers() as unknown as Record<string, unknown>[];
        else if (table === 'questions') rawRows = this.getQuestions() as unknown as Record<string, unknown>[];
        else if (table === 'quiz_results') rawRows = this.getResults() as unknown as Record<string, unknown>[];

        // Apply basic WHERE clause
        if (upper.includes('WHERE')) {
          const parts = trimmed.split(/WHERE/i);
          const condition = parts[1].trim();
          if (condition.includes('=')) {
            const [col, rawVal] = condition.split('=').map(s => s.trim().replace(/['"]/g, ''));
            const colKey = col.toLowerCase();
            rawRows = rawRows.filter(row => String(row[colKey]).toLowerCase() === rawVal.toLowerCase());
          }
        }

        // Apply basic ORDER BY
        if (upper.includes('ORDER BY')) {
          if (upper.includes('SCORE DESC')) {
            rawRows = [...rawRows].sort((a, b) => Number(b.score || 0) - Number(a.score || 0));
          } else if (upper.includes('PERCENTAGE DESC')) {
            rawRows = [...rawRows].sort((a, b) => Number(b.percentage || 0) - Number(a.percentage || 0));
          }
        }

        // Apply LIMIT
        const limitMatch = trimmed.match(/LIMIT\s+(\d+)/i);
        if (limitMatch) {
          const limit = parseInt(limitMatch[1], 10);
          rawRows = rawRows.slice(0, limit);
        }

        if (rawRows.length === 0) {
          return {
            columns: ['status'],
            rows: [{ status: 'Query returned 0 rows' }],
            message: '0 rows returned.'
          };
        }

        const columns = Object.keys(rawRows[0]);
        return {
          columns,
          rows: rawRows,
          message: `${rawRows.length} rows returned successfully.`
        };
      }

      // 2. DELETE queries
      if (upper.startsWith('DELETE FROM QUIZ_RESULTS')) {
        const count = this.getResults().length;
        this.clearAllResults();
        return {
          columns: ['status', 'affected_rows'],
          rows: [{ status: 'SUCCESS', affected_rows: count }],
          affectedRows: count,
          message: `Query OK, ${count} rows affected.`
        };
      }

      // 3. Reset database
      if (upper === 'RESET DATABASE' || upper.includes('DROP TABLE')) {
        localStorage.removeItem(USERS_KEY);
        localStorage.removeItem(QUESTIONS_KEY);
        localStorage.removeItem(RESULTS_KEY);
        this.initDatabase();
        return {
          columns: ['status', 'message'],
          rows: [{ status: 'SUCCESS', message: 'SQLite tables refreshed to default seed state' }],
          message: 'Database reset successfully.'
        };
      }

      return {
        columns: ['status'],
        rows: [{ status: 'Command received. Supported statements: SELECT, DELETE FROM quiz_results, RESET DATABASE' }],
        message: 'Query executed.'
      };
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'SQL syntax error';
      return {
        columns: ['error'],
        rows: [{ error: msg }],
        error: msg
      };
    }
  }
}

export const storageService = new StorageService();
