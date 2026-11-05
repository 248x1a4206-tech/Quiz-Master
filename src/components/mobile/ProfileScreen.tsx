import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  User as UserIcon, 
  Mail, 
  Edit3, 
  Save, 
  Trash2, 
  Award, 
  CheckCircle2, 
  TrendingUp, 
  Database,
  History,
  RotateCcw
} from 'lucide-react';
import { User } from '../../types/quiz';
import { storageService } from '../../services/storage';
import { soundService } from '../../services/sound';

interface Props {
  user: User;
  onUpdateUser: (updated: User) => void;
}

export const ProfileScreen: React.FC<Props> = ({ user, onUpdateUser }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [showHistory, setShowHistory] = useState(false);

  const analytics = storageService.getUserAnalytics(user.username);
  const history = storageService.getResults().filter(
    r => r.username.toLowerCase() === user.username.toLowerCase()
  );

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    soundService.playTap();
    const updated = storageService.updateUser(user.id, username, email);
    onUpdateUser(updated);
    setIsEditing(false);
  };

  const handleDeleteResult = (id: number) => {
    soundService.playTap();
    storageService.deleteResult(id);
    // trigger state update by forcing update
    onUpdateUser({ ...user });
  };

  const handleResetHistory = () => {
    if (confirm('Are you sure you want to reset your quiz history? This cannot be undone.')) {
      soundService.playTap();
      storageService.clearAllResults();
      onUpdateUser({ ...user });
    }
  };

  return (
    <div className="flex flex-col h-full overflow-y-auto px-4 py-4 space-y-4 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 pb-20">
      {/* Title */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
            Student Profile
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Local SQLite user records & statistics
          </p>
        </div>
        <button
          onClick={() => {
            soundService.playTap();
            setIsEditing(!isEditing);
          }}
          className="px-3 py-1.5 rounded-xl bg-purple-50 dark:bg-purple-950/60 border border-purple-200 dark:border-purple-800 text-purple-600 dark:text-purple-400 text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
        >
          <Edit3 className="w-3.5 h-3.5" />
          <span>{isEditing ? 'Cancel' : 'Edit'}</span>
        </button>
      </div>

      {/* User Information Card */}
      <div className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
        {isEditing ? (
          <form onSubmit={handleSaveProfile} className="space-y-3">
            <div>
              <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                Student Name
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full h-10 px-3 mt-1 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                Institutional Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-10 px-3 mt-1 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full h-10 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              <Save className="w-4 h-4" />
              <span>Save Changes</span>
            </button>
          </form>
        ) : (
          <div className="flex items-center gap-3.5">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 text-white flex items-center justify-center font-bold text-lg shadow-md shadow-purple-900/20">
              {user.username.slice(0, 2).toUpperCase()}
            </div>
            <div className="min-w-0">
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white truncate">
                {user.username}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 truncate flex items-center gap-1.5 mt-0.5">
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                <span>{user.email}</span>
              </p>
              <span className="text-[10px] text-purple-600 dark:text-purple-400 font-medium">
                Student ID: #{user.id} · B.Tech Lab Enrolled
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Comprehensive Academic Statistics */}
      <div>
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-2">
          Academic Quiz Metrics
        </h4>

        <div className="grid grid-cols-2 gap-2.5">
          <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Total Attempted</span>
              <div className="w-7 h-7 rounded-lg bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center">
                <TrendingUp className="w-4 h-4" />
              </div>
            </div>
            <span className="text-xl font-extrabold text-slate-900 dark:text-white tabular-nums">
              {analytics.totalQuizzes}
            </span>
            <p className="text-[10px] text-slate-400 mt-0.5">Finished sessions</p>
          </div>

          <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Total Correct</span>
              <div className="w-7 h-7 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4" />
              </div>
            </div>
            <span className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400 tabular-nums">
              {analytics.totalCorrect}
            </span>
            <p className="text-[10px] text-slate-400 mt-0.5">out of {analytics.totalQuestions} questions</p>
          </div>

          <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Highest Score</span>
              <div className="w-7 h-7 rounded-lg bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                <Award className="w-4 h-4" />
              </div>
            </div>
            <span className="text-xl font-extrabold text-amber-600 dark:text-amber-400 tabular-nums">
              {analytics.highestScore} pts
            </span>
            <p className="text-[10px] text-slate-400 mt-0.5">Single quiz record</p>
          </div>

          <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Average Score</span>
              <div className="w-7 h-7 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                <Database className="w-4 h-4" />
              </div>
            </div>
            <span className="text-xl font-extrabold text-blue-600 dark:text-blue-400 tabular-nums">
              {analytics.averagePercentage}%
            </span>
            <p className="text-[10px] text-slate-400 mt-0.5">Best: {analytics.bestCategory}</p>
          </div>
        </div>
      </div>

      {/* Quiz History Drawer / List */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <button
            onClick={() => {
              soundService.playTap();
              setShowHistory(!showHistory);
            }}
            className="text-xs font-bold text-purple-600 dark:text-purple-400 flex items-center gap-1.5 cursor-pointer hover:underline"
          >
            <History className="w-4 h-4" />
            <span>{showHistory ? 'Hide Quiz History' : `View Full History (${history.length})`}</span>
          </button>

          {history.length > 0 && (
            <button
              onClick={handleResetHistory}
              className="text-[11px] font-semibold text-rose-500 hover:text-rose-600 flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset History</span>
            </button>
          )}
        </div>

        {showHistory && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="space-y-2 mt-2"
          >
            {history.length === 0 ? (
              <p className="text-xs text-slate-400 text-center py-4">No past records in SQLite database.</p>
            ) : (
              history.map((h) => (
                <div
                  key={h.id}
                  className="flex items-center justify-between p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800"
                >
                  <div>
                    <h5 className="text-xs font-bold text-slate-900 dark:text-white">
                      {h.category} · {h.difficulty}
                    </h5>
                    <div className="flex items-center gap-2 text-[10px] text-slate-600 dark:text-slate-300 mt-0.5 font-medium">
                      <span>{h.correct_answers}/{h.total_questions} Correct ({h.percentage}%)</span>
                      <span>·</span>
                      <span>{h.time_spent_seconds}s</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-slate-600 dark:text-slate-300">
                      {new Date(h.date).toLocaleDateString()}
                    </span>
                    <button
                      onClick={() => handleDeleteResult(h.id)}
                      className="p-1 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};
