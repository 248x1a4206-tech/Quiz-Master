import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, ArrowRight, BookOpen, ShieldCheck } from 'lucide-react';
import { soundService } from '../../services/sound';

interface Props {
  onStart: () => void;
}

export const SplashScreen: React.FC<Props> = ({ onStart }) => {
  const handleStart = () => {
    soundService.playTap();
    onStart();
  };

  return (
    <div className="relative flex flex-col items-center justify-between min-h-full px-6 py-10 bg-gradient-to-b from-purple-900 via-indigo-950 to-slate-950 text-white overflow-hidden select-none">
      {/* Decorative ambient background orbs */}
      <div className="absolute top-[-10%] right-[-15%] w-72 h-72 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-15%] w-72 h-72 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />

      {/* Top Academic Tag */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs text-purple-200"
      >
        <Sparkles className="w-3.5 h-3.5 text-purple-300" />
        <span>B.Tech Flutter Academic Project</span>
      </motion.div>

      {/* Center Hero & Logo */}
      <div className="flex flex-col items-center text-center my-auto">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', damping: 15, delay: 0.2 }}
          className="relative mb-6"
        >
          <div className="w-28 h-28 rounded-3xl bg-gradient-to-tr from-purple-600 to-indigo-500 flex items-center justify-center shadow-2xl shadow-purple-600/40 border border-white/20">
            <BookOpen className="w-14 h-14 text-white" />
          </div>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            className="absolute -inset-2 rounded-3xl border border-dashed border-purple-400/40 pointer-events-none"
          />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="text-3xl font-extrabold tracking-tight text-white mb-2"
        >
          QuizMaster
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="text-sm text-slate-300 max-w-xs leading-relaxed"
        >
          Smart Multi-Category Quiz Application with SQLite Persistence & Real-Time Performance Analytics
        </motion.p>

        {/* Feature Pills */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.55 }}
          className="flex items-center gap-2 mt-6 text-xs text-slate-300"
        >
          <span className="flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> 8 Categories</span>
          <span>·</span>
          <span>30s Countdown</span>
          <span>·</span>
          <span>SQLite Engine</span>
        </motion.div>
      </div>

      {/* Bottom Start Action */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.65 }}
        className="w-full flex flex-col gap-3"
      >
        <button
          onClick={handleStart}
          className="w-full h-14 rounded-2xl bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 active:scale-[0.98] transition-all text-white font-semibold flex items-center justify-center gap-2 shadow-xl shadow-purple-900/40 cursor-pointer"
        >
          <span>Get Started</span>
          <ArrowRight className="w-5 h-5" />
        </button>
        <p className="text-center text-[11px] text-slate-400">
          Flutter 3.x · Material Design 3 · Dart 3.x
        </p>
      </motion.div>
    </div>
  );
};
