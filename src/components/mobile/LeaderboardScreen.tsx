import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Trophy, Medal, Crown, Star, Filter } from 'lucide-react';
import { CATEGORIES_META } from '../../data/questions';
import { storageService } from '../../services/storage';
import { soundService } from '../../services/sound';

export const LeaderboardScreen: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const allResults = storageService.getResults();

  // Aggregate highest score per user for the selected category
  const filtered = selectedCategory === 'All'
    ? allResults
    : allResults.filter(r => r.category === selectedCategory);

  // Group by username and take highest score
  const userMap = new Map<string, { username: string; highestScore: number; bestCategory: string; percentage: number; totalQuizzes: number }>();

  filtered.forEach(r => {
    const existing = userMap.get(r.username);
    if (!existing || r.score > existing.highestScore) {
      userMap.set(r.username, {
        username: r.username,
        highestScore: r.score,
        bestCategory: r.category,
        percentage: r.percentage,
        totalQuizzes: (existing?.totalQuizzes || 0) + 1
      });
    } else {
      existing.totalQuizzes += 1;
    }
  });

  const rankedUsers = Array.from(userMap.values())
    .sort((a, b) => b.highestScore - a.highestScore || b.percentage - a.percentage);

  const top3 = rankedUsers.slice(0, 3);
  const remaining = rankedUsers.slice(3);

  return (
    <div className="flex flex-col h-full overflow-y-auto px-4 py-4 space-y-4 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 pb-20">
      {/* Title */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
            Leaderboard
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Academic rankings & high scores
          </p>
        </div>
        <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center border border-amber-500/20">
          <Trophy className="w-5 h-5" />
        </div>
      </div>

      {/* Category Filter Pills / Dropdown */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar text-xs">
        <button
          onClick={() => {
            soundService.playTap();
            setSelectedCategory('All');
          }}
          className={`px-3 py-1.5 rounded-xl font-semibold whitespace-nowrap cursor-pointer transition-all ${
            selectedCategory === 'All'
              ? 'bg-purple-600 text-white shadow-sm'
              : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
          }`}
        >
          All Categories
        </button>

        {CATEGORIES_META.map(c => (
          <button
            key={c.name}
            onClick={() => {
              soundService.playTap();
              setSelectedCategory(c.name);
            }}
            className={`px-3 py-1.5 rounded-xl font-semibold whitespace-nowrap cursor-pointer transition-all ${
              selectedCategory === c.name
                ? 'bg-purple-600 text-white shadow-sm'
                : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
            }`}
          >
            {c.name}
          </button>
        ))}
      </div>

      {/* Podium (Top 3) */}
      {top3.length > 0 && (
        <div className="pt-2 pb-1">
          <div className="grid grid-cols-3 gap-2 items-end">
            {/* Rank 2 (Silver) */}
            {top3[1] && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="flex flex-col items-center p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-center relative pt-5"
              >
                <div className="absolute -top-3 w-7 h-7 rounded-full bg-slate-300 dark:bg-slate-700 text-slate-800 dark:text-slate-200 flex items-center justify-center font-bold text-xs shadow-md border-2 border-white dark:border-slate-900">
                  2
                </div>
                <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center font-bold text-xs text-slate-700 dark:text-slate-300 mb-1.5">
                  {top3[1].username.slice(0, 2).toUpperCase()}
                </div>
                <h5 className="text-xs font-bold text-slate-900 dark:text-white truncate w-full">
                  {top3[1].username.split(' ')[0]}
                </h5>
                <span className="text-[11px] font-extrabold text-purple-600 dark:text-purple-400 tabular-nums">
                  {top3[1].highestScore} pts
                </span>
                <span className="text-[9px] text-slate-400 truncate max-w-full">
                  {top3[1].percentage}% acc
                </span>
              </motion.div>
            )}

            {/* Rank 1 (Gold) */}
            {top3[0] && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center p-3.5 rounded-2xl bg-gradient-to-b from-amber-500/15 via-white dark:via-slate-900 to-white dark:to-slate-900 border-2 border-amber-400/80 text-center relative pt-6 shadow-md shadow-amber-500/10"
              >
                <div className="absolute -top-4 w-8 h-8 rounded-full bg-gradient-to-tr from-amber-400 to-amber-600 text-white flex items-center justify-center font-black text-sm shadow-lg border-2 border-white dark:border-slate-900">
                  <Crown className="w-4 h-4 fill-white" />
                </div>
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-amber-400 to-orange-500 text-white flex items-center justify-center font-bold text-sm mb-1.5 shadow-md">
                  {top3[0].username.slice(0, 2).toUpperCase()}
                </div>
                <h5 className="text-xs font-bold text-slate-900 dark:text-white truncate w-full">
                  {top3[0].username}
                </h5>
                <span className="text-xs font-extrabold text-amber-600 dark:text-amber-400 tabular-nums">
                  {top3[0].highestScore} pts
                </span>
                <span className="text-[10px] text-slate-400">
                  {top3[0].bestCategory}
                </span>
              </motion.div>
            )}

            {/* Rank 3 (Bronze) */}
            {top3[2] && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex flex-col items-center p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-center relative pt-5"
              >
                <div className="absolute -top-3 w-7 h-7 rounded-full bg-amber-700/80 text-white flex items-center justify-center font-bold text-xs shadow-md border-2 border-white dark:border-slate-900">
                  3
                </div>
                <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center font-bold text-xs text-slate-700 dark:text-slate-300 mb-1.5">
                  {top3[2].username.slice(0, 2).toUpperCase()}
                </div>
                <h5 className="text-xs font-bold text-slate-900 dark:text-white truncate w-full">
                  {top3[2].username.split(' ')[0]}
                </h5>
                <span className="text-[11px] font-extrabold text-purple-600 dark:text-purple-400 tabular-nums">
                  {top3[2].highestScore} pts
                </span>
                <span className="text-[9px] text-slate-400 truncate max-w-full">
                  {top3[2].percentage}% acc
                </span>
              </motion.div>
            )}
          </div>
        </div>
      )}

      {/* Ranks 4+ List */}
      <div className="space-y-2">
        <h4 className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
          Student Standings ({rankedUsers.length})
        </h4>

        {rankedUsers.length === 0 ? (
          <div className="p-6 text-center text-xs text-slate-400 bg-white dark:bg-slate-900 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800">
            No quiz records found for this category.
          </div>
        ) : (
          rankedUsers.map((u, idx) => (
            <div
              key={u.username}
              className="flex items-center justify-between p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm"
            >
              <div className="flex items-center gap-3">
                <span className="w-6 text-center font-mono font-bold text-xs text-slate-400">
                  #{idx + 1}
                </span>
                <div className="w-9 h-9 rounded-xl bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 flex items-center justify-center font-bold text-xs">
                  {u.username.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <h5 className="text-xs font-bold text-slate-900 dark:text-white">
                    {u.username}
                  </h5>
                  <div className="flex items-center gap-2 text-[10px] text-slate-600 dark:text-slate-300">
                    <span>{u.bestCategory}</span>
                    <span>·</span>
                    <span>{u.percentage}% accuracy</span>
                  </div>
                </div>
              </div>

              <div className="text-right">
                <span className="text-sm font-extrabold text-purple-600 dark:text-purple-400 tabular-nums">
                  {u.highestScore}/10
                </span>
                <p className="text-[10px] text-slate-600 dark:text-slate-300">Max Score</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
