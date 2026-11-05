import React from 'react';
import { motion } from 'motion/react';
import { 
  Play, 
  Sparkles, 
  TrendingUp, 
  Clock, 
  Award, 
  ArrowRight,
  Globe,
  Atom,
  Calculator,
  Cpu,
  Code,
  BookOpen,
  BrainCircuit,
  Newspaper,
  Flame
} from 'lucide-react';
import { Category, User } from '../../types/quiz';
import { CATEGORIES_META } from '../../data/questions';
import { storageService } from '../../services/storage';
import { soundService } from '../../services/sound';

interface Props {
  user: User;
  onStartQuiz: (category: Category | 'Mixed') => void;
  onNavigateToCategories: () => void;
  onNavigateToLeaderboard: () => void;
  onStartDailyQuiz: () => void;
}

const ICON_MAP: Record<string, React.ElementType> = {
  Globe,
  Atom,
  Calculator,
  Cpu,
  Code,
  BookOpen,
  BrainCircuit,
  Newspaper
};

export const HomeScreen: React.FC<Props> = ({
  user,
  onStartQuiz,
  onNavigateToCategories,
  onNavigateToLeaderboard,
  onStartDailyQuiz
}) => {
  const analytics = storageService.getUserAnalytics(user.username);
  const recentResults = storageService.getResults()
    .filter(r => r.username.toLowerCase() === user.username.toLowerCase())
    .slice(0, 3);

  const handleStartQuick = () => {
    soundService.playTap();
    onStartQuiz('Mixed');
  };

  return (
    <div className="flex flex-col h-full overflow-y-auto px-4 py-4 space-y-5 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 pb-20">
      {/* 1. Header & User Greeting */}
      <div className="flex items-center justify-between pt-1">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-purple-600 dark:text-purple-400">
            Welcome back
          </span>
          <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
            {user.username} 👋
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 text-xs font-semibold">
            <Flame className="w-4 h-4 fill-amber-500 text-amber-500" />
            <span>3 Day Streak</span>
          </div>
        </div>
      </div>

      {/* 2. Primary Hero Banner: Start Quick Quiz */}
      <motion.div
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-700 via-indigo-700 to-purple-900 text-white p-5 shadow-xl shadow-purple-900/20 border border-purple-500/30"
      >
        <div className="absolute -right-8 -bottom-8 w-36 h-36 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        <div className="relative z-10">
          <div className="flex items-center gap-2 text-xs font-semibold text-purple-200 mb-1.5">
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Smart Adaptive Challenge</span>
          </div>
          <h3 className="text-lg font-bold text-white mb-1">
            Master Today&apos;s Mixed Challenge
          </h3>
          <p className="text-xs text-purple-200/90 mb-4 max-w-xs leading-relaxed">
            Test yourself with 10 questions randomized across all 8 academic categories.
          </p>
          <div className="flex items-center gap-3">
            <button
              onClick={handleStartQuick}
              className="px-5 py-2.5 rounded-xl bg-white text-purple-950 font-bold text-xs flex items-center gap-2 shadow-lg hover:bg-purple-50 transition-all cursor-pointer active:scale-95"
            >
              <Play className="w-4 h-4 fill-purple-950" />
              <span>Start Quiz Now</span>
            </button>
            <button
              onClick={() => {
                soundService.playTap();
                onStartDailyQuiz();
              }}
              className="px-3.5 py-2.5 rounded-xl bg-purple-900/60 border border-purple-400/30 text-purple-100 font-semibold text-xs hover:bg-purple-800/80 transition-all cursor-pointer"
            >
              Daily Quiz
            </button>
          </div>
        </div>
      </motion.div>

      {/* 3. Performance Summary Cards */}
      <div>
        <div className="flex items-center justify-between mb-2.5">
          <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">
            Performance Overview
          </h4>
          <span className="text-xs text-slate-500 dark:text-slate-400">SQLite Synced</span>
        </div>
        <div className="grid grid-cols-3 gap-2.5">
          <div className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-center">
            <div className="w-8 h-8 mx-auto rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-1.5">
              <TrendingUp className="w-4 h-4" />
            </div>
            <span className="text-base font-extrabold text-slate-900 dark:text-white tabular-nums">
              {analytics.totalQuizzes}
            </span>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">Attempted</p>
          </div>

          <div className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-center">
            <div className="w-8 h-8 mx-auto rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-1.5">
              <Award className="w-4 h-4" />
            </div>
            <span className="text-base font-extrabold text-emerald-600 dark:text-emerald-400 tabular-nums">
              {analytics.highestScore}/10
            </span>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">High Score</p>
          </div>

          <div className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-center">
            <div className="w-8 h-8 mx-auto rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-1.5">
              <Clock className="w-4 h-4" />
            </div>
            <span className="text-base font-extrabold text-blue-600 dark:text-blue-400 tabular-nums">
              {analytics.averagePercentage}%
            </span>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">Avg Accuracy</p>
          </div>
        </div>
      </div>

      {/* 4. Quiz Categories Carousel/Grid */}
      <div>
        <div className="flex items-center justify-between mb-2.5">
          <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">
            Select Category
          </h4>
          <button
            onClick={() => {
              soundService.playTap();
              onNavigateToCategories();
            }}
            className="text-xs font-semibold text-purple-600 dark:text-purple-400 flex items-center gap-1 hover:underline cursor-pointer"
          >
            <span>See All (8)</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          {CATEGORIES_META.slice(0, 4).map((cat) => {
            const Icon = ICON_MAP[cat.iconName] || Globe;
            return (
              <motion.button
                key={cat.name}
                whileTap={{ scale: 0.97 }}
                onClick={() => {
                  soundService.playTap();
                  onStartQuiz(cat.name as Category);
                }}
                className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-left hover:border-purple-300 dark:hover:border-purple-700 transition-all flex flex-col justify-between cursor-pointer shadow-sm group"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className={`w-9 h-9 rounded-xl bg-gradient-to-tr ${cat.color} flex items-center justify-center text-white shadow-md`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-[11px] font-semibold text-slate-600 dark:text-slate-300">
                    {cat.questionCount} Qs
                  </span>
                </div>
                <div>
                  <h5 className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                    {cat.name}
                  </h5>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
                    {cat.description}
                  </p>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* 5. Previous Quiz Performance (Recent History) */}
      <div>
        <div className="flex items-center justify-between mb-2.5">
          <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">
            Recent Activity
          </h4>
          <button
            onClick={() => {
              soundService.playTap();
              onNavigateToLeaderboard();
            }}
            className="text-xs font-semibold text-purple-600 dark:text-purple-400 hover:underline cursor-pointer"
          >
            Rankings
          </button>
        </div>

        {recentResults.length === 0 ? (
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-dashed border-slate-200 dark:border-slate-800 text-center text-xs text-slate-500">
            No quizzes completed yet. Start your first quiz above!
          </div>
        ) : (
          <div className="space-y-2">
            {recentResults.map((res) => (
              <div
                key={res.id}
                className="flex items-center justify-between p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs ${
                    res.percentage >= 70
                      ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400'
                      : 'bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400'
                  }`}>
                    {res.percentage}%
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-slate-900 dark:text-white">
                      {res.category}
                    </h5>
                    <div className="flex items-center gap-2 text-[10px] text-slate-600 dark:text-slate-300 mt-0.5">
                      <span>{res.correct_answers}/{res.total_questions} Correct</span>
                      <span>·</span>
                      <span>{res.difficulty}</span>
                    </div>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-slate-600 dark:text-slate-300">
                  {new Date(res.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
