import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Calendar, Flame, Play, Sparkles } from 'lucide-react';
import { Question } from '../../types/quiz';
import { storageService } from '../../services/storage';
import { soundService } from '../../services/sound';

interface Props {
  onBack: () => void;
  onStartDaily: (questions: Question[]) => void;
}

export const DailyQuizScreen: React.FC<Props> = ({ onBack, onStartDaily }) => {
  const [dailyQuestions, setDailyQuestions] = useState<Question[]>([]);

  useEffect(() => {
    // Generate deterministic daily questions based on current date
    const all = storageService.getQuestions();
    const todayStr = new Date().toISOString().split('T')[0];
    let seed = 0;
    for (let i = 0; i < todayStr.length; i++) {
      seed = (seed * 31 + todayStr.charCodeAt(i)) % all.length;
    }

    const selected: Question[] = [];
    for (let i = 0; i < 5; i++) {
      const idx = (seed + i * 7) % all.length;
      selected.push(all[idx]);
    }
    setDailyQuestions(selected);
  }, []);

  const handleStart = () => {
    soundService.playTap();
    onStartDaily(dailyQuestions);
  };

  const todayFormatted = new Date().toLocaleDateString(undefined, {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <div className="flex flex-col h-full overflow-y-auto px-4 py-4 space-y-4 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 pb-20">
      {/* Back button */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => {
            soundService.playTap();
            onBack();
          }}
          className="w-9 h-9 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-slate-900 cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-wider text-amber-500">
            Special Event
          </span>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white leading-tight">
            Daily Academic Challenge
          </h2>
        </div>
      </div>

      {/* Hero Banner */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="p-5 rounded-3xl bg-gradient-to-br from-amber-500 via-orange-500 to-rose-600 text-white shadow-xl shadow-orange-900/20"
      >
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-semibold">
            <Flame className="w-4 h-4 fill-white" />
            <span>Bonus Streak Active</span>
          </div>
          <Calendar className="w-5 h-5 text-white/80" />
        </div>

        <h3 className="text-xl font-extrabold mt-1">
          {todayFormatted}
        </h3>
        <p className="text-xs text-amber-100 mt-1 leading-relaxed">
          5 cross-disciplinary questions picked fresh today. Finish within the 30-second timer to boost your streak!
        </p>

        <div className="flex items-center gap-4 mt-4 pt-3 border-t border-white/20 text-xs font-semibold">
          <span>5 Questions</span>
          <span>·</span>
          <span>Mixed Domain</span>
          <span>·</span>
          <span>+200 XP Bonus</span>
        </div>
      </motion.div>

      {/* Question Preview List */}
      <div>
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-2">
          Today&apos;s Syllabus Topics
        </h4>
        <div className="space-y-2">
          {dailyQuestions.map((q, idx) => (
            <div
              key={q.id}
              className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-lg bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center text-xs font-bold">
                  {idx + 1}
                </span>
                <div>
                  <h5 className="text-xs font-bold text-slate-900 dark:text-white">
                    {q.category}
                  </h5>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">
                    Difficulty: {q.difficulty}
                  </span>
                </div>
              </div>
              <Sparkles className="w-4 h-4 text-amber-500" />
            </div>
          ))}
        </div>
      </div>

      {/* Start Button */}
      <div className="pt-2">
        <button
          onClick={handleStart}
          className="w-full h-14 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 active:scale-[0.98] transition-all text-white font-bold flex items-center justify-center gap-2 shadow-xl shadow-orange-900/30 cursor-pointer"
        >
          <Play className="w-5 h-5 fill-white" />
          <span>Start Daily Challenge</span>
        </button>
      </div>
    </div>
  );
};
