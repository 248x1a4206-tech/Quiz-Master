import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowLeft, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  Lightbulb, 
  HelpCircle 
} from 'lucide-react';
import { Question, QuizResult } from '../../types/quiz';
import { soundService } from '../../services/sound';

interface Props {
  result: QuizResult;
  questions: Question[];
  onBack: () => void;
}

export const ReviewScreen: React.FC<Props> = ({ result, questions, onBack }) => {
  const [filter, setFilter] = useState<'all' | 'correct' | 'incorrect' | 'unanswered'>('all');

  const answerMap = new Map<number, { selected: 'A' | 'B' | 'C' | 'D' | null; isCorrect: boolean }>();
  if (result.user_answers) {
    result.user_answers.forEach((ans) => {
      answerMap.set(ans.question_id, {
        selected: ans.selected_option,
        isCorrect: ans.is_correct
      });
    });
  }

  const filteredQuestions = questions.filter((q) => {
    const userAns = answerMap.get(q.id);
    if (!userAns) return filter === 'all';
    if (filter === 'correct') return userAns.isCorrect;
    if (filter === 'incorrect') return !userAns.isCorrect && userAns.selected !== null;
    if (filter === 'unanswered') return userAns.selected === null;
    return true;
  });

  return (
    <div className="flex flex-col h-full overflow-y-auto px-4 py-4 space-y-4 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 pb-24">
      {/* Header */}
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
          <h2 className="text-lg font-bold text-slate-900 dark:text-white leading-tight">
            Answer Review
          </h2>
          <span className="text-xs text-slate-500 dark:text-slate-400">
            {result.score}/{result.total_questions} Questions Correct ({result.percentage}%)
          </span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-200/70 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs">
        <button
          onClick={() => {
            soundService.playTap();
            setFilter('all');
          }}
          className={`flex-1 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
            filter === 'all'
              ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          All ({questions.length})
        </button>
        <button
          onClick={() => {
            soundService.playTap();
            setFilter('correct');
          }}
          className={`flex-1 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
            filter === 'correct'
              ? 'bg-emerald-500 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          Correct ({result.correct_answers})
        </button>
        <button
          onClick={() => {
            soundService.playTap();
            setFilter('incorrect');
          }}
          className={`flex-1 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
            filter === 'incorrect'
              ? 'bg-rose-500 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          Wrong ({result.incorrect_answers})
        </button>
        <button
          onClick={() => {
            soundService.playTap();
            setFilter('unanswered');
          }}
          className={`flex-1 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
            filter === 'unanswered'
              ? 'bg-amber-500 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          Missed ({result.unanswered})
        </button>
      </div>

      {/* Question Cards List */}
      <div className="space-y-4">
        {filteredQuestions.map((q, idx) => {
          const userAns = answerMap.get(q.id);
          const isCorrect = userAns?.isCorrect;
          const isUnanswered = !userAns || userAns.selected === null;

          const options: { key: 'A' | 'B' | 'C' | 'D'; text: string }[] = [
            { key: 'A', text: q.option_a },
            { key: 'B', text: q.option_b },
            { key: 'C', text: q.option_c },
            { key: 'D', text: q.option_d },
          ];

          return (
            <motion.div
              key={q.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm"
            >
              {/* Card Header Status */}
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400">
                  Question {idx + 1}
                </span>

                <div className="flex items-center gap-1.5 text-xs font-semibold">
                  {isCorrect ? (
                    <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Correct (+1)</span>
                    </span>
                  ) : isUnanswered ? (
                    <span className="flex items-center gap-1 text-amber-600 dark:text-amber-400">
                      <AlertCircle className="w-4 h-4" />
                      <span>Unanswered</span>
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-rose-600 dark:text-rose-400">
                      <XCircle className="w-4 h-4" />
                      <span>Incorrect</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Question Text */}
              <h4 className="text-xs font-bold text-slate-900 dark:text-white leading-relaxed mb-3">
                {q.question}
              </h4>

              {/* Options breakdown */}
              <div className="space-y-1.5 mb-3">
                {options.map((opt) => {
                  const isUserSelection = userAns?.selected === opt.key;
                  const isTheCorrectOption = q.correct_answer === opt.key;

                  let rowStyle = 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 text-slate-700 dark:text-slate-300';

                  if (isTheCorrectOption) {
                    rowStyle = 'border-emerald-500/80 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-950 dark:text-emerald-200 font-semibold';
                  } else if (isUserSelection && !isTheCorrectOption) {
                    rowStyle = 'border-rose-500/80 bg-rose-50 dark:bg-rose-950/40 text-rose-950 dark:text-rose-200';
                  }

                  return (
                    <div
                      key={opt.key}
                      className={`p-2.5 rounded-xl border text-xs flex items-center justify-between ${rowStyle}`}
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="w-5 h-5 rounded-md bg-white/70 dark:bg-slate-800 flex items-center justify-center font-bold text-[10px] shrink-0">
                          {opt.key}
                        </span>
                        <span className="truncate">{opt.text}</span>
                      </div>

                      <div className="shrink-0 text-[10px] font-semibold pl-2">
                        {isTheCorrectOption && (
                          <span className="text-emerald-600 dark:text-emerald-400">✓ Correct</span>
                        )}
                        {isUserSelection && !isTheCorrectOption && (
                          <span className="text-rose-600 dark:text-rose-400">✗ Your Choice</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Explanation Card */}
              <div className="p-3 rounded-xl bg-purple-50 dark:bg-purple-950/30 border border-purple-200/80 dark:border-purple-900/40 text-purple-950 dark:text-purple-200 text-xs">
                <div className="flex items-center gap-1.5 font-bold mb-1 text-[11px] text-purple-700 dark:text-purple-300">
                  <Lightbulb className="w-3.5 h-3.5" />
                  <span>Explanation:</span>
                </div>
                <p className="text-[11px] leading-relaxed opacity-90">
                  {q.explanation}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
