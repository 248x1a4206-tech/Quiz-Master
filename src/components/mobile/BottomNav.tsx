import React from 'react';
import { Home, Grid, Trophy, User as UserIcon } from 'lucide-react';
import { ActiveScreen } from '../../types/quiz';
import { soundService } from '../../services/sound';

interface Props {
  currentScreen: ActiveScreen;
  onNavigate: (screen: ActiveScreen) => void;
}

export const BottomNav: React.FC<Props> = ({ currentScreen, onNavigate }) => {
  const tabs = [
    { id: 'home' as ActiveScreen, label: 'Home', icon: Home },
    { id: 'categories' as ActiveScreen, label: 'Categories', icon: Grid },
    { id: 'leaderboard' as ActiveScreen, label: 'Rankings', icon: Trophy },
    { id: 'profile' as ActiveScreen, label: 'Profile', icon: UserIcon },
  ];

  const handleTabClick = (tabId: ActiveScreen) => {
    soundService.playTap();
    onNavigate(tabId);
  };

  return (
    <nav className="shrink-0 h-16 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 px-4 flex items-center justify-around z-30 select-none">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = currentScreen === tab.id;

        return (
          <button
            key={tab.id}
            onClick={() => handleTabClick(tab.id)}
            className={`flex flex-col items-center justify-center flex-1 h-full py-1 transition-all cursor-pointer ${
              isActive
                ? 'text-purple-600 dark:text-purple-400 font-semibold scale-105'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <div className={`p-1 rounded-xl transition-colors ${isActive ? 'bg-purple-100 dark:bg-purple-950/60' : ''}`}>
              <Icon className="w-5 h-5" />
            </div>
            <span className="text-[11px] mt-0.5 tracking-tight">{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
};
