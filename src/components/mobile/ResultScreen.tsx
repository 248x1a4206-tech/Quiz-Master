import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';
import { 
  Trophy, 
  RotateCcw, 
  Home, 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  Clock, 
  Share2,
  FileText
} from 'lucide-react';
import { QuizResult } from '../../types/quiz';
import { soundService } from '../../services/sound';

interface Props {
  result: QuizResult;
  onPlayAgain: () => void;
  onReturnHome: () => void;
  onReviewAnswers: () => void;
}

export const ResultScreen: React.FC<Props> = ({
  result,
  onPlayAgain,
  onReturnHome,
  onReviewAnswers
}) => {
  // Trigger confetti and victory audio if score >= 70%
  useEffect(() => {
    if (result.percentage >= 70) {
      soundService.playVictory();
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {
        // fallback if canvas not available
      }
    }
  }, [result.percentage]);

  const getPerformanceMessage = (pct: number) => {
    if (pct >= 90) return { title: 'Mastermind!', desc: 'Exceptional academic accuracy! Outstanding mastery of this domain.' };
    if (pct >= 70) return { title: 'Great Job!', desc: 'Solid performance with strong grasp of core subject concepts.' };
    if (pct >= 50) return { title: 'Good Effort!', desc: 'Satisfactory attempt, with plenty of room to review and sharpen details.' };
    return { title: 'Keep Practicing!', desc: 'Review the explanations to strengthen key fundamentals.' };
  };

  const perf = getPerformanceMessage(result.percentage);

  // SVG circular score ring
  const radius = 48;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (result.percentage / 100) * circumference;

  return (
    <div className="flex flex-col h-full overflow-y-auto px-4 py-5 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 pb-24">
      {/* 1. Header Trophy & Title */}
      <div className="flex flex-col items-center text-center">
        <motion.div
          initial={{ scale: 0.5, rotate: -20, opacity: 0 }}
          animate={{ scale: 1, rotate: 0, opacity: 1 }}
          transition={{ type: 'spring', damping: 12 }}
          className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-400 to-orange-500 text-white flex items-center justify-center shadow-lg shadow-amber-500/30 mb-3"
        >
          <Trophy className="w-9 h-9" />
        </motion.div>

        <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
          Quiz Completed!
        </h2>
        <span className="text-xs font-semibold text-purple-600 dark:text-purple-400 mt-0.5">
          {result.category} · {result.difficulty}
        </span>
      </div>

      {/* 2. Circular Score Ring Card */}
      <div className="my-5 p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col items-center text-center">
        <div className="relative w-32 h-32 flex items-center justify-center my-2">
          <svg className="w-32 h-32 -rotate-90">
            <circle
              cx="64"
              cy="64"
              r={radius}
              className="stroke-slate-100 dark:stroke-slate-800"
              strokeWidth="10"
              fill="transparent"
            />
            <circle
              cx="64"
              cy="64"
              r={radius}
              className="stroke-purple-600 transition-all duration-1000 ease-out"
              strokeWidth="10"
              fill="transparent"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute flex flex-col items-center">
            <span className="text-2xl font-black text-slate-900 dark:text-white tabular-nums">
              {result.percentage}%
            </span>
            <span className="text-[10px] text-slate-400 font-semibold uppercase">
              Accuracy
            </span>
          </div>
        </div>

        <h3 className="text-base font-bold text-slate-900 dark:text-white mt-1">
          {perf.title}
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs mt-1 leading-relaxed">
          {perf.desc}
        </p>
      </div>

      {/* 3. Detailed Stats Grid */}
      <div className="grid grid-cols-2 gap-2.5 mb-5">
        <div className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <span className="text-sm font-extrabold text-emerald-600 dark:text-emerald-400 tabular-nums">
              {result.correct_answers}
            </span>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">Correct Answers</p>
          </div>
        </div>

        <div className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0">
            <XCircle className="w-5 h-5" />
          </div>
          <div>
            <span className="text-sm font-extrabold text-rose-600 dark:text-rose-400 tabular-nums">
              {result.incorrect_answers}
            </span>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">Incorrect Answers</p>
          </div>
        </div>

        <div className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
            <HelpCircle className="w-5 h-5" />
          </div>
          <div>
            <span className="text-sm font-extrabold text-amber-600 dark:text-amber-400 tabular-nums">
              {result.unanswered}
            </span>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">Unanswered / Timeouts</p>
          </div>
        </div>

        <div className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <span className="text-sm font-extrabold text-blue-600 dark:text-blue-400 tabular-nums">
              {result.time_spent_seconds}s
            </span>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">Total Time Spent</p>
          </div>
        </div>
      </div>

      {/* 4. Action Buttons */}
      <div className="space-y-2.5">
        <button
          onClick={() => {
            soundService.playTap();
            onReviewAnswers();
          }}
          className="w-full h-12 rounded-xl bg-purple-600 hover:bg-purple-700 active:scale-[0.98] transition-all text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-purple-900/20 cursor-pointer"
        >
          <FileText className="w-4 h-4" />
          <span>Review Answers & Explanations</span>
        </button>

        <div className="grid grid-cols-2 gap-2.5">
          <button
            onClick={() => {
              soundService.playTap();
              onPlayAgain();
            }}
            className="h-12 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-900 dark:text-white font-semibold text-xs flex items-center justify-center gap-2 cursor-pointer active:scale-95 transition-transform"
          >
            <RotateCcw className="w-4 h-4 text-purple-600" />
            <span>Play Again</span>
          </button>

          <button
            onClick={() => {
              soundService.playTap();
              onReturnHome();
            }}
            className="h-12 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-900 dark:text-white font-semibold text-xs flex items-center justify-center gap-2 cursor-pointer active:scale-95 transition-transform"
          >
            <Home className="w-4 h-4 text-blue-600" />
            <span>Return Home</span>
          </button>
        </div>
      </div>
    </div>
  );
};
