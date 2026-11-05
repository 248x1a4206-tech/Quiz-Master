import React from 'react';
import { 
  Wifi, 
  BatteryMedium, 
  Sparkles, 
  Volume2, 
  VolumeX, 
  Maximize2, 
  Minimize2,
  RefreshCw,
  Smartphone
} from 'lucide-react';
import { soundService } from '../../services/sound';

interface Props {
  children: React.ReactNode;
  isFullScreenMode: boolean;
  onToggleFullScreen: () => void;
  onResetSession: () => void;
}

export const MobileDeviceFrame: React.FC<Props> = ({
  children,
  isFullScreenMode,
  onToggleFullScreen,
  onResetSession
}) => {
  const [currentTime, setCurrentTime] = React.useState('9:41');
  const [isMuted, setIsMuted] = React.useState(soundService.getMuted());

  React.useEffect(() => {
    const update = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }));
    };
    update();
    const interval = setInterval(update, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleToggleMute = () => {
    const m = soundService.toggleMute();
    setIsMuted(m);
  };

  if (isFullScreenMode) {
    return (
      <div className="w-full h-full flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 overflow-hidden relative">
        {/* Floating Controls Bar */}
        <div className="shrink-0 h-10 px-4 bg-slate-900 text-white flex items-center justify-between text-xs z-50">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="font-semibold text-xs">QuizMaster · Responsive View</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleToggleMute}
              className="p-1 hover:bg-slate-800 rounded cursor-pointer"
              title="Toggle Sound"
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
            </button>
            <button
              onClick={onResetSession}
              className="p-1 hover:bg-slate-800 rounded cursor-pointer"
              title="Restart App"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <button
              onClick={onToggleFullScreen}
              className="p-1 hover:bg-slate-800 rounded cursor-pointer flex items-center gap-1 font-semibold text-purple-300"
              title="Switch to Phone Mockup"
            >
              <Minimize2 className="w-4 h-4" />
              <span>Phone Frame</span>
            </button>
          </div>
        </div>
        <div className="flex-1 overflow-hidden relative">
          {children}
        </div>
      </div>
    );
  }

  return (
    <div className="relative mx-auto my-auto flex flex-col items-center">
      {/* Phone Hardware Mockup Outer Shell */}
      <div className="relative w-[380px] h-[750px] max-h-[calc(100vh-140px)] rounded-[44px] bg-slate-900 p-3 shadow-2xl shadow-purple-950/40 border-4 border-slate-700/80 ring-1 ring-white/10 flex flex-col overflow-hidden">
        {/* Hardware details: Speaker & Front Camera notch */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-5 rounded-full bg-black flex items-center justify-center gap-2 z-50 pointer-events-none">
          <div className="w-2.5 h-2.5 rounded-full bg-slate-900 border border-slate-800" />
          <div className="w-8 h-1 rounded-full bg-slate-800" />
        </div>

        {/* Mobile Status Bar (Android / iOS style) */}
        <div className="shrink-0 h-8 px-6 pt-1 flex items-center justify-between text-white/90 text-[11px] font-semibold z-40 bg-transparent select-none">
          <span className="font-mono tracking-tight">{currentTime}</span>
          <div className="flex items-center gap-1.5 opacity-90">
            <Wifi className="w-3.5 h-3.5" />
            <BatteryMedium className="w-4 h-4" />
          </div>
        </div>

        {/* Inner App Canvas */}
        <div className="flex-1 w-full rounded-[32px] overflow-hidden bg-slate-50 dark:bg-slate-950 flex flex-col relative">
          {children}
        </div>

        {/* Home gesture indicator bar */}
        <div className="shrink-0 h-4 flex items-center justify-center pt-1 z-40 select-none">
          <div className="w-28 h-1 rounded-full bg-white/30" />
        </div>
      </div>
    </div>
  );
};
