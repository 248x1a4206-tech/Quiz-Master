import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Clock, Zap, ShieldAlert, Award, Play } from 'lucide-react';
import { Category, Difficulty } from '../../types/quiz';
import { soundService } from '../../services/sound';

interface Props {
  category: Category | 'Mixed';
  onBack: () => void;
  onConfirmStart: (difficulty: Difficulty) => void;
}

export const DifficultyScreen: React.FC<Props> = ({ category, onBack, onConfirmStart }) => {
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>('Medium');

  const options: {
    level: Difficulty;
    title: string;
    description: string;
    timePerQuestion: string;
    points: string;
    color: string;
    icon: React.ElementType;
    badge: string;
  }[] = [
    {
      level: 'Easy',
      title: 'Beginner Friendly',
      description: 'Foundational concepts and direct questions. Perfect for quick revision.',
      timePerQuestion: '30 seconds / question',
      points: '+1 pt per correct answer',
      color: 'border-emerald-500/50 bg-emerald-500/5 text-emerald-600 dark:text-emerald-400',
      icon: Zap,
      badge: 'Relaxed Pace'
    },
    {
      level: 'Medium',
      title: 'Standard Academic',
      description: 'Intermediate questions requiring conceptual understanding and analytical thinking.',
      timePerQuestion: '30 seconds / question',
      points: '+1 pt per correct answer',
      color: 'border-purple-500/50 bg-purple-500/5 text-purple-600 dark:text-purple-400',
      icon: Award,
      badge: 'Recommended'
    },
    {
      level: 'Hard',
      title: 'Challenging Master',
      description: 'Deep technical questions, edge cases, formulas, and advanced reasoning.',
      timePerQuestion: '30 seconds / question',
      points: '+1 pt per correct answer',
      color: 'border-rose-500/50 bg-rose-500/5 text-rose-600 dark:text-rose-400',
      icon: ShieldAlert,
      badge: 'High Challenge'
    }
  ];

  const handleStart = () => {
    soundService.playTap();
    onConfirmStart(selectedDifficulty);
  };

  return (
    <div className="flex flex-col h-full overflow-y-auto px-4 py-4 space-y-4 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 pb-24">
      {/* Top Bar with Back */}
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
          <span className="text-[11px] font-semibold uppercase tracking-wider text-purple-600 dark:text-purple-400">
            Selected Category
          </span>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white leading-tight">
            {category}
          </h2>
        </div>
      </div>

      <div className="pt-2">
        <h3 className="text-base font-bold text-slate-900 dark:text-white">
          Choose Difficulty Level
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
          Select the challenge intensity for this 10-question session
        </p>
      </div>

      {/* Difficulty Cards */}
      <div className="space-y-3">
        {options.map((opt) => {
          const Icon = opt.icon;
          const isSelected = selectedDifficulty === opt.level;

          return (
            <motion.div
              key={opt.level}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                soundService.playTap();
                setSelectedDifficulty(opt.level);
              }}
              className={`p-4 rounded-2xl border-2 transition-all cursor-pointer relative ${
                isSelected
                  ? 'border-purple-600 bg-purple-50/70 dark:bg-purple-950/40 shadow-md shadow-purple-900/10'
                  : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${opt.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                        {opt.level}
                      </h4>
                      <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400">
                        ({opt.title})
                      </span>
                    </div>
                    <span className="text-[11px] font-medium text-purple-600 dark:text-purple-400">
                      {opt.badge}
                    </span>
                  </div>
                </div>

                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  isSelected ? 'border-purple-600 bg-purple-600' : 'border-slate-300 dark:border-slate-700'
                }`}>
                  {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                </div>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-400 mt-2.5 leading-relaxed">
                {opt.description}
              </p>

              <div className="flex items-center gap-3 mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-800/80 text-[11px] text-slate-500 dark:text-slate-400">
                <span className="flex items-center gap-1 font-mono">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  {opt.timePerQuestion}
                </span>
                <span>·</span>
                <span className="font-mono">{opt.points}</span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Sticky Bottom Start Button */}
      <div className="pt-4">
        <button
          onClick={handleStart}
          className="w-full h-14 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 active:scale-[0.98] transition-all text-white font-bold flex items-center justify-center gap-2 shadow-xl shadow-purple-900/30 cursor-pointer"
        >
          <Play className="w-5 h-5 fill-white" />
          <span>Start {selectedDifficulty} Quiz</span>
        </button>
      </div>
    </div>
  );
};
