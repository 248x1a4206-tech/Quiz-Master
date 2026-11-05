import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Globe, 
  Atom, 
  Calculator, 
  Cpu, 
  Code, 
  BookOpen, 
  BrainCircuit, 
  Newspaper,
  Search,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { Category } from '../../types/quiz';
import { CATEGORIES_META } from '../../data/questions';
import { soundService } from '../../services/sound';

interface Props {
  onSelectCategory: (category: Category) => void;
  onSelectMixed: () => void;
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

export const CategoryScreen: React.FC<Props> = ({ onSelectCategory, onSelectMixed }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCategories = CATEGORIES_META.filter(cat => 
    cat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cat.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full overflow-y-auto px-4 py-4 space-y-4 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 pb-20">
      {/* Title & Description */}
      <div>
        <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
          Quiz Categories
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
          Choose a subject to test your domain expertise
        </p>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search categories (e.g. Science, Dart)..."
          className="w-full h-11 pl-10 pr-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/30"
        />
      </div>

      {/* Mixed Challenge Card */}
      <motion.button
        whileTap={{ scale: 0.98 }}
        onClick={() => {
          soundService.playTap();
          onSelectMixed();
        }}
        className="w-full p-4 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white text-left shadow-lg shadow-purple-900/15 flex items-center justify-between cursor-pointer"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-amber-300" />
          </div>
          <div>
            <h4 className="text-sm font-bold">All Categories (Mixed)</h4>
            <p className="text-xs text-purple-100/80">Randomized 10 questions across all subjects</p>
          </div>
        </div>
        <ChevronRight className="w-5 h-5 text-white/80" />
      </motion.button>

      {/* Categories List */}
      <div className="space-y-2.5">
        {filteredCategories.map((cat, idx) => {
          const Icon = ICON_MAP[cat.iconName] || Globe;
          return (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.04 }}
            >
              <button
                onClick={() => {
                  soundService.playTap();
                  onSelectCategory(cat.name as Category);
                }}
                className="w-full p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-purple-300 dark:hover:border-purple-700 transition-all flex items-center justify-between text-left cursor-pointer shadow-sm group"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className={`w-11 h-11 rounded-xl bg-gradient-to-tr ${cat.color} flex items-center justify-center text-white shrink-0 shadow-md`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors truncate">
                        {cat.name}
                      </h4>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5">
                      {cat.description}
                    </p>
                    <div className="flex items-center gap-2 text-[11px] text-slate-600 dark:text-slate-300 mt-1 font-medium">
                      <span>{cat.questionCount} Questions</span>
                      <span>·</span>
                      <span>Easy / Med / Hard</span>
                    </div>
                  </div>
                </div>

                <div className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 group-hover:text-purple-600 group-hover:bg-purple-50 dark:group-hover:bg-purple-950/50 transition-all shrink-0">
                  <ChevronRight className="w-4 h-4" />
                </div>
              </button>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
