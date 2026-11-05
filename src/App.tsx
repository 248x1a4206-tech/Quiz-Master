import React, { useState } from 'react';
import { 
  Sparkles, 
  Play, 
  Smartphone, 
  Maximize2, 
  Volume2, 
  VolumeX, 
  RefreshCw, 
  GraduationCap, 
  Code2, 
  Database,
  Moon,
  Sun,
  Layers,
  ChevronRight,
  Zap
} from 'lucide-react';
import { ActiveScreen, Category, Difficulty, MainTab, Question, QuizResult, User } from './types/quiz';
import { storageService } from './services/storage';
import { soundService } from './services/sound';

// Mobile Screens
import { SplashScreen } from './components/mobile/SplashScreen';
import { HomeScreen } from './components/mobile/HomeScreen';
import { CategoryScreen } from './components/mobile/CategoryScreen';
import { DifficultyScreen } from './components/mobile/DifficultyScreen';
import { QuizScreen } from './components/mobile/QuizScreen';
import { ResultScreen } from './components/mobile/ResultScreen';
import { ReviewScreen } from './components/mobile/ReviewScreen';
import { LeaderboardScreen } from './components/mobile/LeaderboardScreen';
import { ProfileScreen } from './components/mobile/ProfileScreen';
import { DailyQuizScreen } from './components/mobile/DailyQuizScreen';
import { BottomNav } from './components/mobile/BottomNav';
import { MobileDeviceFrame } from './components/mobile/MobileDeviceFrame';

// Academic Hub Views
import { FlutterCodeViewer } from './components/lab/FlutterCodeViewer';
import { LabReportViewer } from './components/lab/LabReportViewer';
import { SqliteConsole } from './components/lab/SqliteConsole';

export default function App() {
  const [mainTab, setMainTab] = useState<MainTab>('app');
  const [activeScreen, setActiveScreen] = useState<ActiveScreen>('splash');
  const [isFullScreenDevice, setIsFullScreenDevice] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | 'Mixed'>('Mixed');
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>('Medium');
  const [lastQuizResult, setLastQuizResult] = useState<QuizResult | null>(null);
  const [lastQuizQuestions, setLastQuizQuestions] = useState<Question[]>([]);
  const [currentUser, setCurrentUser] = useState<User>(() => storageService.getActiveUser());
  const [isMuted, setIsMuted] = useState(soundService.getMuted());
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Toggle Dark/Light Theme on document
  const handleToggleTheme = () => {
    const next = !isDarkMode;
    setIsDarkMode(next);
    if (next) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const handleToggleSound = () => {
    const muted = soundService.toggleMute();
    setIsMuted(muted);
  };

  // Mobile App Navigation Flows
  const handleStartFromSplash = () => {
    setActiveScreen('home');
  };

  const handleStartQuizWithCategory = (category: Category | 'Mixed') => {
    setSelectedCategory(category);
    setActiveScreen('difficulty');
  };

  const handleConfirmDifficulty = (difficulty: Difficulty) => {
    setSelectedDifficulty(difficulty);
    setActiveScreen('quiz');
  };

  const handleFinishQuiz = (result: QuizResult, answeredQuestions: Question[]) => {
    setLastQuizResult(result);
    setLastQuizQuestions(answeredQuestions);
    setActiveScreen('result');
  };

  const handlePlayAgain = () => {
    setActiveScreen('quiz');
  };

  const handleReturnHome = () => {
    setActiveScreen('home');
  };

  const handleReviewAnswers = () => {
    setActiveScreen('review');
  };

  const handleStartDailyChallenge = () => {
    setActiveScreen('daily');
  };

  const handleConfirmDailyQuestions = (questions: Question[]) => {
    setSelectedCategory('Mixed');
    setSelectedDifficulty('Medium');
    setLastQuizQuestions(questions);
    setActiveScreen('quiz');
  };

  const handleResetMobileSession = () => {
    soundService.playTap();
    setActiveScreen('splash');
  };

  // Render the current screen inside the mobile phone container
  const renderMobileScreen = () => {
    switch (activeScreen) {
      case 'splash':
        return <SplashScreen onStart={handleStartFromSplash} />;
      case 'home':
        return (
          <HomeScreen
            user={currentUser}
            onStartQuiz={handleStartQuizWithCategory}
            onNavigateToCategories={() => setActiveScreen('categories')}
            onNavigateToLeaderboard={() => setActiveScreen('leaderboard')}
            onStartDailyQuiz={handleStartDailyChallenge}
          />
        );
      case 'categories':
        return (
          <CategoryScreen
            onSelectCategory={(cat) => handleStartQuizWithCategory(cat)}
            onSelectMixed={() => handleStartQuizWithCategory('Mixed')}
          />
        );
      case 'difficulty':
        return (
          <DifficultyScreen
            category={selectedCategory}
            onBack={() => setActiveScreen('categories')}
            onConfirmStart={handleConfirmDifficulty}
          />
        );
      case 'quiz':
        return (
          <QuizScreen
            category={selectedCategory}
            difficulty={selectedDifficulty}
            user={currentUser}
            onFinishQuiz={handleFinishQuiz}
            onQuit={() => setActiveScreen('home')}
          />
        );
      case 'result':
        return lastQuizResult ? (
          <ResultScreen
            result={lastQuizResult}
            onPlayAgain={handlePlayAgain}
            onReturnHome={handleReturnHome}
            onReviewAnswers={handleReviewAnswers}
          />
        ) : (
          <HomeScreen
            user={currentUser}
            onStartQuiz={handleStartQuizWithCategory}
            onNavigateToCategories={() => setActiveScreen('categories')}
            onNavigateToLeaderboard={() => setActiveScreen('leaderboard')}
            onStartDailyQuiz={handleStartDailyChallenge}
          />
        );
      case 'review':
        return lastQuizResult ? (
          <ReviewScreen
            result={lastQuizResult}
            questions={lastQuizQuestions.length > 0 ? lastQuizQuestions : storageService.getQuestions().slice(0, 10)}
            onBack={() => setActiveScreen('result')}
          />
        ) : (
          <HomeScreen
            user={currentUser}
            onStartQuiz={handleStartQuizWithCategory}
            onNavigateToCategories={() => setActiveScreen('categories')}
            onNavigateToLeaderboard={() => setActiveScreen('leaderboard')}
            onStartDailyQuiz={handleStartDailyChallenge}
          />
        );
      case 'leaderboard':
        return <LeaderboardScreen />;
      case 'profile':
        return (
          <ProfileScreen
            user={currentUser}
            onUpdateUser={(updated) => setCurrentUser(updated)}
          />
        );
      case 'daily':
        return (
          <DailyQuizScreen
            onBack={() => setActiveScreen('home')}
            onStartDaily={handleConfirmDailyQuestions}
          />
        );
      default:
        return <SplashScreen onStart={handleStartFromSplash} />;
    }
  };

  // Determine if bottom navigation should be visible on mobile screen
  const shouldShowBottomNav = ['home', 'categories', 'leaderboard', 'profile'].includes(activeScreen);

  return (
    <div className="flex flex-col h-screen w-screen bg-slate-950 text-slate-100 overflow-hidden font-sans">
      {/* ---------------------------------------------------- */}
      {/* TOP BAR CONTRACT: Zone 1 (Brand) - Zone 2 (Nav Links) - Zone 3 (Action) */}
      {/* ---------------------------------------------------- */}
      <header className="shrink-0 h-16 border-b border-slate-800 bg-slate-900/90 backdrop-blur-md px-6 flex items-center justify-between gap-8 z-40 select-none">
        {/* Zone 1: Brand Wordmark (Single text element) */}
        <div className="flex items-center gap-3 shrink-0 whitespace-nowrap">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center font-black text-white text-sm shadow-md shadow-purple-900/30">
            QM
          </div>
          <span className="text-base font-extrabold tracking-tight text-white">
            QuizMaster
          </span>
          <span className="hidden sm:inline-block text-[11px] font-mono text-purple-400 bg-purple-950/60 px-2 py-0.5 rounded border border-purple-800/50">
            B.Tech Flutter Lab
          </span>
        </div>

        {/* Zone 2: Navigation Links (Clean single-line tabs) */}
        <nav className="flex items-center gap-1 sm:gap-2">
          <button
            onClick={() => setMainTab('app')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              mainTab === 'app'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            App Preview
          </button>
          <button
            onClick={() => setMainTab('code')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              mainTab === 'code'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            Flutter Code
          </button>
          <button
            onClick={() => setMainTab('lab_report')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              mainTab === 'lab_report'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            Lab Report
          </button>
          <button
            onClick={() => setMainTab('sqlite_console')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              mainTab === 'sqlite_console'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            SQLite DB
          </button>
        </nav>

        {/* Zone 3: Primary Action / Quick Controls */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleToggleSound}
            className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center transition-colors cursor-pointer"
            title={isMuted ? 'Unmute Sound Effects' : 'Mute Sound Effects'}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
          </button>

          <button
            onClick={handleToggleTheme}
            className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center transition-colors cursor-pointer"
            title="Toggle Light/Dark Theme"
          >
            {isDarkMode ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4 text-purple-400" />}
          </button>

          <button
            onClick={() => {
              setMainTab('app');
              handleStartQuizWithCategory('Programming');
            }}
            className="hidden md:flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold text-xs shadow-md shadow-purple-900/30 transition-all cursor-pointer active:scale-95"
          >
            <Play className="w-3.5 h-3.5 fill-white" />
            <span>Quick Quiz</span>
          </button>
        </div>
      </header>

      {/* ---------------------------------------------------- */}
      {/* MAIN VIEWPORT SWITCHER */}
      {/* ---------------------------------------------------- */}
      <main className="flex-1 overflow-hidden relative">
        {/* TAB 1: MOBILE APP RUNNER & LAB COMPANION */}
        {mainTab === 'app' && (
          <div className="w-full h-full flex flex-col lg:flex-row overflow-hidden bg-slate-950">
            {/* Center Area: The Phone Simulator */}
            <div className="flex-1 flex items-center justify-center p-2 sm:p-6 overflow-y-auto">
              <MobileDeviceFrame
                isFullScreenMode={isFullScreenDevice}
                onToggleFullScreen={() => setIsFullScreenDevice(!isFullScreenDevice)}
                onResetSession={handleResetMobileSession}
              >
                <div className="flex-1 flex flex-col h-full overflow-hidden">
                  <div className="flex-1 overflow-hidden">
                    {renderMobileScreen()}
                  </div>

                  {shouldShowBottomNav && (
                    <BottomNav
                      currentScreen={activeScreen}
                      onNavigate={(screen) => setActiveScreen(screen)}
                    />
                  )}
                </div>
              </MobileDeviceFrame>
            </div>

            {/* Right Column (Desktop Only): Lab Companion & Fast Tester Panel */}
            {!isFullScreenDevice && (
              <div className="hidden lg:flex w-96 shrink-0 border-l border-slate-800/80 bg-slate-900/40 p-5 flex-col gap-4 overflow-y-auto">
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-mono text-purple-400 uppercase tracking-wider mb-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Evaluator Test Station</span>
                  </div>
                  <h3 className="text-sm font-bold text-white">
                    Lab Examiner Quick Controls
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Jump directly to any Flutter screen or trigger audio chimes to verify app state during lab evaluation.
                  </p>
                </div>

                {/* Direct Screen Jump Matrix */}
                <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                  <span className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider block">
                    Direct Screen Jumps
                  </span>
                  <div className="grid grid-cols-2 gap-1.5 text-xs">
                    <button
                      onClick={() => setActiveScreen('splash')}
                      className={`p-2 rounded-xl text-left font-medium transition-all cursor-pointer ${
                        activeScreen === 'splash' ? 'bg-purple-600 text-white font-bold' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                      }`}
                    >
                      1. Splash Screen
                    </button>
                    <button
                      onClick={() => setActiveScreen('home')}
                      className={`p-2 rounded-xl text-left font-medium transition-all cursor-pointer ${
                        activeScreen === 'home' ? 'bg-purple-600 text-white font-bold' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                      }`}
                    >
                      2. Home Screen
                    </button>
                    <button
                      onClick={() => setActiveScreen('categories')}
                      className={`p-2 rounded-xl text-left font-medium transition-all cursor-pointer ${
                        activeScreen === 'categories' ? 'bg-purple-600 text-white font-bold' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                      }`}
                    >
                      3. Categories (8)
                    </button>
                    <button
                      onClick={() => setActiveScreen('difficulty')}
                      className={`p-2 rounded-xl text-left font-medium transition-all cursor-pointer ${
                        activeScreen === 'difficulty' ? 'bg-purple-600 text-white font-bold' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                      }`}
                    >
                      4. Difficulty Levels
                    </button>
                    <button
                      onClick={() => setActiveScreen('quiz')}
                      className={`p-2 rounded-xl text-left font-medium transition-all cursor-pointer ${
                        activeScreen === 'quiz' ? 'bg-purple-600 text-white font-bold' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                      }`}
                    >
                      5. Active Quiz
                    </button>
                    <button
                      onClick={() => {
                        // Seed dummy result if none
                        if (!lastQuizResult) {
                          const demo = storageService.getResults()[0];
                          setLastQuizResult(demo);
                        }
                        setActiveScreen('result');
                      }}
                      className={`p-2 rounded-xl text-left font-medium transition-all cursor-pointer ${
                        activeScreen === 'result' ? 'bg-purple-600 text-white font-bold' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                      }`}
                    >
                      6. Result Summary
                    </button>
                    <button
                      onClick={() => {
                        if (!lastQuizResult) {
                          const demo = storageService.getResults()[0];
                          setLastQuizResult(demo);
                        }
                        setActiveScreen('review');
                      }}
                      className={`p-2 rounded-xl text-left font-medium transition-all cursor-pointer ${
                        activeScreen === 'review' ? 'bg-purple-600 text-white font-bold' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                      }`}
                    >
                      7. Review Answers
                    </button>
                    <button
                      onClick={() => setActiveScreen('leaderboard')}
                      className={`p-2 rounded-xl text-left font-medium transition-all cursor-pointer ${
                        activeScreen === 'leaderboard' ? 'bg-purple-600 text-white font-bold' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                      }`}
                    >
                      8. Leaderboard
                    </button>
                    <button
                      onClick={() => setActiveScreen('profile')}
                      className={`p-2 rounded-xl text-left font-medium transition-all cursor-pointer ${
                        activeScreen === 'profile' ? 'bg-purple-600 text-white font-bold' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                      }`}
                    >
                      9. Student Profile
                    </button>
                    <button
                      onClick={() => setActiveScreen('daily')}
                      className={`p-2 rounded-xl text-left font-medium transition-all cursor-pointer ${
                        activeScreen === 'daily' ? 'bg-purple-600 text-white font-bold' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                      }`}
                    >
                      Daily Challenge
                    </button>
                  </div>
                </div>

                {/* Sound Effects Testing */}
                <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                  <span className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider block">
                    Synthesizer Sound Tests
                  </span>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <button
                      onClick={() => soundService.playCorrect()}
                      className="p-2 rounded-xl bg-emerald-950/60 border border-emerald-800/60 text-emerald-300 hover:bg-emerald-900/60 font-medium cursor-pointer"
                    >
                      ✓ Correct Chime
                    </button>
                    <button
                      onClick={() => soundService.playIncorrect()}
                      className="p-2 rounded-xl bg-rose-950/60 border border-rose-800/60 text-rose-300 hover:bg-rose-900/60 font-medium cursor-pointer"
                    >
                      ✗ Wrong Buzzer
                    </button>
                    <button
                      onClick={() => soundService.playVictory()}
                      className="p-2 rounded-xl bg-amber-950/60 border border-amber-800/60 text-amber-300 hover:bg-amber-900/60 font-medium cursor-pointer"
                    >
                      🏆 Victory Fanfare
                    </button>
                    <button
                      onClick={() => soundService.playTick()}
                      className="p-2 rounded-xl bg-purple-950/60 border border-purple-800/60 text-purple-300 hover:bg-purple-900/60 font-medium cursor-pointer"
                    >
                      ⏱ Timer Tick
                    </button>
                  </div>
                </div>

                {/* Current Student User Profile Info */}
                <div className="mt-auto p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-mono text-slate-400">Enrolled Student</span>
                    <h5 className="text-xs font-bold text-white">{currentUser.username}</h5>
                    <p className="text-[10px] text-slate-400 truncate">{currentUser.email}</p>
                  </div>
                  <button
                    onClick={() => {
                      setIsFullScreenDevice(!isFullScreenDevice);
                    }}
                    className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-purple-400 cursor-pointer"
                    title="Toggle Fullscreen"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: FLUTTER SOURCE CODE EXPLORER */}
        {mainTab === 'code' && <FlutterCodeViewer />}

        {/* TAB 3: B.TECH LAB EVALUATION REPORT & TEST CASES */}
        {mainTab === 'lab_report' && <LabReportViewer />}

        {/* TAB 4: SQLITE DATABASE CONSOLE */}
        {mainTab === 'sqlite_console' && <SqliteConsole />}
      </main>
    </div>
  );
}
