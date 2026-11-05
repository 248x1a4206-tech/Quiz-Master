import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, 
  Volume2, 
  VolumeX, 
  XCircle, 
  HelpCircle,
  Lightbulb,
  AlertTriangle
} from 'lucide-react';
import { Category, Difficulty, Question, QuizResult } from '../../types/quiz';
import { soundService } from '../../services/sound';
import { storageService } from '../../services/storage';

interface Props {
  category: Category | 'Mixed';
  difficulty: Difficulty;
  user: { username: string; email: string };
  onFinishQuiz: (result: QuizResult, answeredQuestions: Question[]) => void;
  onQuit: () => void;
}

interface QuestionAnswerRecord {
  question_id: number;
  selected_option: 'A' | 'B' | 'C' | 'D' | null;
  is_correct: boolean;
}

export const QuizScreen: React.FC<Props> = ({
  category,
  difficulty,
  user,
  onFinishQuiz,
  onQuit
}) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<'A' | 'B' | 'C' | 'D' | null>(null);
  const [isAnswerLocked, setIsAnswerLocked] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isMuted, setIsMuted] = useState(soundService.getMuted());
  const [score, setScore] = useState(0);
  const [answersRecord, setAnswersRecord] = useState<QuestionAnswerRecord[]>([]);
  const [startTime] = useState(Date.now());
  const [isTimeout, setIsTimeout] = useState(false);

  // Initialize and randomize questions
  useEffect(() => {
    let pool = storageService.getQuestionsByCategory(category, difficulty);
    if (pool.length < 5) {
      // fallback to category pool or all questions
      pool = storageService.getQuestionsByCategory(category);
      if (pool.length === 0) pool = storageService.getQuestions();
    }

    // Shuffle questions
    const shuffled = [...pool].sort(() => 0.5 - Math.random()).slice(0, 10);
    setQuestions(shuffled);
  }, [category, difficulty]);

  const currentQ = questions[currentIndex];
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Countdown timer logic (30 seconds per question)
  useEffect(() => {
    if (!currentQ || isAnswerLocked) return;

    setTimeLeft(30);
    setIsTimeout(false);

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          return 0;
        }
        if (prev <= 5 && prev > 1) {
          soundService.playTick();
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [currentIndex, isAnswerLocked, currentQ]);

  // Handle timeout when timeLeft hits 0
  useEffect(() => {
    if (timeLeft === 0 && !isAnswerLocked && currentQ) {
      soundService.playTimeout();
      setIsAnswerLocked(true);
      setIsTimeout(true);

      // Record as unanswered
      setAnswersRecord((prev) => [
        ...prev,
        {
          question_id: currentQ.id,
          selected_option: null,
          is_correct: false
        }
      ]);
    }
  }, [timeLeft, isAnswerLocked, currentQ]);

  const handleSelectOption = (opt: 'A' | 'B' | 'C' | 'D') => {
    if (isAnswerLocked || !currentQ) return;

    if (timerRef.current) clearInterval(timerRef.current);

    setSelectedOption(opt);
    setIsAnswerLocked(true);

    const isCorrect = opt === currentQ.correct_answer;
    if (isCorrect) {
      soundService.playCorrect();
      setScore((s) => s + 1);
    } else {
      soundService.playIncorrect();
    }

    setAnswersRecord((prev) => [
      ...prev,
      {
        question_id: currentQ.id,
        selected_option: opt,
        is_correct: isCorrect
      }
    ]);
  };

  const handleNextQuestion = useCallback(() => {
    soundService.playTap();

    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((i) => i + 1);
      setSelectedOption(null);
      setIsAnswerLocked(false);
      setIsTimeout(false);
    } else {
      // Finalize quiz
      const totalQuestions = questions.length;
      const correctAnswers = answersRecord.filter((a) => a.is_correct).length;
      const unansweredCount = answersRecord.filter((a) => a.selected_option === null).length;
      const incorrectAnswers = totalQuestions - correctAnswers - unansweredCount;
      const finalScore = correctAnswers;
      const percentage = Math.round((correctAnswers / totalQuestions) * 100);
      const timeSpent = Math.max(1, Math.round((Date.now() - startTime) / 1000));

      const newResult: Omit<QuizResult, 'id'> = {
        username: user.username,
        category,
        difficulty,
        total_questions: totalQuestions,
        correct_answers: correctAnswers,
        incorrect_answers: incorrectAnswers,
        unanswered: unansweredCount,
        score: finalScore,
        percentage,
        time_spent_seconds: timeSpent,
        date: new Date().toISOString(),
        user_answers: answersRecord
      };

      const savedResult = storageService.saveResult(newResult);
      onFinishQuiz(savedResult, questions);
    }
  }, [answersRecord, category, currentIndex, difficulty, onFinishQuiz, questions, startTime, user.username]);

  const handleToggleMute = () => {
    const nextMuted = soundService.toggleMute();
    setIsMuted(nextMuted);
  };

  if (questions.length === 0 || !currentQ) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-6 text-center bg-slate-50 dark:bg-slate-950">
        <div className="w-10 h-10 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-xs text-slate-500">Preparing randomized quiz questions...</p>
      </div>
    );
  }

  // Timer color indicator
  const timerColor = 
    timeLeft > 15 ? 'text-emerald-500 stroke-emerald-500' :
    timeLeft > 5  ? 'text-amber-500 stroke-amber-500' :
                    'text-rose-500 stroke-rose-500 animate-pulse';

  const timerStrokeDash = 2 * Math.PI * 18; // radius 18
  const timerOffset = timerStrokeDash - (timeLeft / 30) * timerStrokeDash;

  const options: { key: 'A' | 'B' | 'C' | 'D'; text: string }[] = [
    { key: 'A', text: currentQ.option_a },
    { key: 'B', text: currentQ.option_b },
    { key: 'C', text: currentQ.option_c },
    { key: 'D', text: currentQ.option_d },
  ];

  return (
    <div className="flex flex-col h-full overflow-y-auto px-4 py-3 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 select-none pb-24">
      {/* 1. Header with Quit, Category, Mute Toggle */}
      <div className="flex items-center justify-between pb-2 border-b border-slate-200/80 dark:border-slate-800">
        <button
          onClick={() => {
            soundService.playTap();
            onQuit();
          }}
          className="text-xs font-semibold text-slate-500 hover:text-rose-500 flex items-center gap-1 cursor-pointer"
        >
          <XCircle className="w-4 h-4" />
          <span>Exit</span>
        </button>

        <div className="text-center">
          <span className="text-[10px] uppercase font-bold tracking-wider text-purple-600 dark:text-purple-400">
            {category}
          </span>
          <p className="text-xs font-bold text-slate-900 dark:text-white">
            Level: {difficulty}
          </p>
        </div>

        <button
          onClick={handleToggleMute}
          className="w-8 h-8 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 cursor-pointer"
        >
          {isMuted ? <VolumeX className="w-4 h-4 text-rose-500" /> : <Volume2 className="w-4 h-4 text-purple-500" />}
        </button>
      </div>

      {/* 2. Question Progress & 30s Circular Countdown Timer */}
      <div className="flex items-center justify-between my-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-purple-600 dark:text-purple-400">
              Question {currentIndex + 1}
            </span>
            <span className="text-xs text-slate-400">/ {questions.length}</span>
          </div>
          <div className="w-36 h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden mt-1.5">
            <div
              className="h-full bg-gradient-to-r from-purple-500 to-indigo-600 transition-all duration-300 rounded-full"
              style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Circular Timer SVG */}
        <div className="relative w-12 h-12 flex items-center justify-center">
          <svg className="w-12 h-12 -rotate-90">
            <circle
              cx="24"
              cy="24"
              r="18"
              className="stroke-slate-200 dark:stroke-slate-800"
              strokeWidth="3.5"
              fill="transparent"
            />
            <circle
              cx="24"
              cy="24"
              r="18"
              className={`${timerColor} transition-all duration-1000 ease-linear`}
              strokeWidth="3.5"
              fill="transparent"
              strokeDasharray={timerStrokeDash}
              strokeDashoffset={timerOffset}
              strokeLinecap="round"
            />
          </svg>
          <span className={`absolute text-xs font-mono font-bold ${timerColor} tabular-nums`}>
            {timeLeft}s
          </span>
        </div>
      </div>

      {/* 3. Question Card */}
      <motion.div
        key={currentQ.id}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm mb-4"
      >
        <div className="flex items-center gap-2 text-[10px] text-slate-400 font-semibold mb-2">
          <HelpCircle className="w-3.5 h-3.5 text-purple-500" />
          <span>Single Choice Multiple Answer</span>
        </div>
        <h3 className="text-sm font-bold text-slate-900 dark:text-white leading-relaxed">
          {currentQ.question}
        </h3>
      </motion.div>

      {/* 4. Multiple Choice Options (A, B, C, D) */}
      <div className="space-y-2.5 mb-3">
        {options.map((opt) => {
          const isSelected = selectedOption === opt.key;
          const isCorrect = currentQ.correct_answer === opt.key;

          let btnClass = 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-purple-300 dark:hover:border-purple-700';
          let badgeClass = 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300';

          if (isAnswerLocked) {
            if (isCorrect) {
              btnClass = 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-950 dark:text-emerald-100 shadow-sm shadow-emerald-900/10';
              badgeClass = 'bg-emerald-500 text-white';
            } else if (isSelected && !isCorrect) {
              btnClass = 'border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-950 dark:text-rose-100 shadow-sm shadow-rose-900/10';
              badgeClass = 'bg-rose-500 text-white';
            } else {
              btnClass = 'opacity-50 border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50';
            }
          } else if (isSelected) {
            btnClass = 'border-purple-600 bg-purple-50 dark:bg-purple-950/40';
            badgeClass = 'bg-purple-600 text-white';
          }

          return (
            <motion.button
              key={opt.key}
              whileTap={!isAnswerLocked ? { scale: 0.98 } : {}}
              onClick={() => handleSelectOption(opt.key)}
              disabled={isAnswerLocked}
              className={`w-full p-3.5 rounded-2xl border-2 transition-all flex items-center justify-between text-left cursor-pointer ${btnClass}`}
            >
              <div className="flex items-center gap-3">
                <span className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 transition-colors ${badgeClass}`}>
                  {opt.key}
                </span>
                <span className="text-xs font-semibold leading-snug">
                  {opt.text}
                </span>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* 5. Feedback & Explanation Snippet if answered */}
      <AnimatePresence>
        {isAnswerLocked && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className={`p-3.5 rounded-2xl text-xs mb-3 border ${
              isTimeout
                ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-200'
                : selectedOption === currentQ.correct_answer
                ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200'
                : 'bg-rose-50 dark:bg-rose-950/40 border-rose-300 dark:border-rose-800 text-rose-900 dark:text-rose-200'
            }`}
          >
            <div className="flex items-center gap-1.5 font-bold mb-1">
              {isTimeout ? (
                <>
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  <span>Time Expired! (Unanswered)</span>
                </>
              ) : selectedOption === currentQ.correct_answer ? (
                <>
                  <Lightbulb className="w-4 h-4 text-emerald-600" />
                  <span>Correct Answer! (+1 Point)</span>
                </>
              ) : (
                <>
                  <Lightbulb className="w-4 h-4 text-rose-600" />
                  <span>Incorrect! Correct option was ({currentQ.correct_answer})</span>
                </>
              )}
            </div>
            <p className="text-[11px] leading-relaxed opacity-90 mt-1">
              {currentQ.explanation}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 6. Next Question / Submit Button */}
      {isAnswerLocked && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="pt-1"
        >
          <button
            onClick={handleNextQuestion}
            className="w-full h-12 rounded-xl bg-purple-600 hover:bg-purple-700 active:scale-[0.98] transition-all text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-purple-900/25 cursor-pointer"
          >
            <span>
              {currentIndex + 1 === questions.length ? 'Submit & View Results' : 'Next Question'}
            </span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      )}
    </div>
  );
};
