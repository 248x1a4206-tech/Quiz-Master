import React, { useState } from 'react';
import { 
  GraduationCap, 
  CheckCircle2, 
  Terminal, 
  Database, 
  Layers, 
  BookOpen, 
  HelpCircle,
  Copy,
  Check,
  Award
} from 'lucide-react';

export const LabReportViewer: React.FC = () => {
  const [activeSection, setActiveSection] = useState<'overview' | 'test_cases' | 'viva' | 'run_guide' | 'db_schema'>('overview');
  const [copiedCmd, setCopiedCmd] = useState(false);

  const testCases = [
    {
      id: 'TC-01',
      module: 'Splash Screen',
      description: 'Verify application loads splash screen and transitions smoothly to Home Screen upon user trigger.',
      steps: 'Launch app -> View branding -> Tap Get Started button.',
      expected: 'Navigates to Home Screen within 300ms without layout shift.',
      status: 'PASS'
    },
    {
      id: 'TC-02',
      module: 'Category Selection',
      description: 'Verify 8 distinct categories are displayed with icons, titles, and question counts.',
      steps: 'Open Categories tab -> Inspect grid items.',
      expected: 'All 8 categories load with correct counts and color gradients.',
      status: 'PASS'
    },
    {
      id: 'TC-03',
      module: 'Difficulty Level',
      description: 'Verify user can select Easy, Medium, or Hard difficulty before starting quiz.',
      steps: 'Tap a category -> Select "Medium" difficulty -> Tap Start Quiz.',
      expected: 'Quiz initializes with questions tagged with selected difficulty.',
      status: 'PASS'
    },
    {
      id: 'TC-04',
      module: 'Countdown Timer',
      description: 'Verify 30-second countdown runs per question and emits tick audio warning below 5s.',
      steps: 'Observe timer during active question without tapping.',
      expected: 'Timer decrements from 30s to 0s; circular SVG progress ring animates smoothly.',
      status: 'PASS'
    },
    {
      id: 'TC-05',
      module: 'Timer Auto-Advance',
      description: 'Verify application marks question as unanswered and locks options when time expires.',
      steps: 'Let timer reach 0 seconds without selecting an answer.',
      expected: 'Audio alert plays, options disable, and question flagged as unanswered.',
      status: 'PASS'
    },
    {
      id: 'TC-06',
      module: 'Single Answer Selection',
      description: 'Verify user cannot change an answer after submitting their selection.',
      steps: 'Tap option B -> Attempt to tap option C or D.',
      expected: 'Subsequent taps are ignored; first selected option remains locked.',
      status: 'PASS'
    },
    {
      id: 'TC-07',
      module: 'Immediate Visual Feedback',
      description: 'Verify correct answer highlights in green and incorrect answer highlights in red.',
      steps: 'Select an incorrect option on any question.',
      expected: 'Selected option borders red, actual correct option borders green with explanation.',
      status: 'PASS'
    },
    {
      id: 'TC-08',
      module: 'Sound Effects & Mute',
      description: 'Verify Web Audio synthesis plays chime for correct answer and buzz for wrong answer with mute toggle.',
      steps: 'Toggle mute icon in top app bar -> Select an answer.',
      expected: 'Audio plays when unmuted; stays completely silent when muted.',
      status: 'PASS'
    },
    {
      id: 'TC-09',
      module: 'Score Calculation',
      description: 'Verify 1 point awarded per correct answer, 0 for wrong/unanswered, no negative marks.',
      steps: 'Complete a 10-question quiz with 7 correct, 2 wrong, 1 missed.',
      expected: 'Final score calculated as 7/10 (70% accuracy).',
      status: 'PASS'
    },
    {
      id: 'TC-10',
      module: 'High Score Confetti',
      description: 'Verify confetti celebration triggers automatically when score is >= 70%.',
      steps: 'Finish quiz with score >= 7.',
      expected: 'Confetti particle cannon bursts across screen with triumphant fanfare.',
      status: 'PASS'
    },
    {
      id: 'TC-11',
      module: 'SQLite Result Insertion',
      description: 'Verify quiz result record is inserted into SQLite quiz_results table upon quiz completion.',
      steps: 'Finish quiz -> Navigate to SQLite console or Profile history.',
      expected: 'New row present with username, category, score, percentage, and ISO timestamp.',
      status: 'PASS'
    },
    {
      id: 'TC-12',
      module: 'Answer Review Screen',
      description: 'Verify all 10 questions can be reviewed with student choices, correct answers, and explanations.',
      steps: 'On Result Screen, tap "Review Answers & Explanations".',
      expected: 'Full breakdown list displayed with filter tabs (All, Correct, Wrong, Missed).',
      status: 'PASS'
    },
    {
      id: 'TC-13',
      module: 'Leaderboard Ranking',
      description: 'Verify users are ranked in descending order by highest score and accuracy percentage.',
      steps: 'Open Rankings tab -> Verify top 3 podium display and student list.',
      expected: 'Users ranked by max score; gold crown placed on top student.',
      status: 'PASS'
    },
    {
      id: 'TC-14',
      module: 'Profile Update CRUD',
      description: 'Verify student can edit username and email, reflecting across the database.',
      steps: 'Profile screen -> Tap Edit -> Update username -> Tap Save.',
      expected: 'SQLite users table updated and greeting reflects new username.',
      status: 'PASS'
    },
    {
      id: 'TC-15',
      module: 'Daily Quiz Challenge',
      description: 'Verify daily quiz seeds deterministic questions based on today date.',
      steps: 'Launch Daily Challenge from Home Screen -> Complete 5 questions.',
      expected: 'Streak incremented and bonus challenge recorded.',
      status: 'PASS'
    }
  ];

  const vivaQuestions = [
    {
      q: '1. What is the fundamental difference between StatelessWidget and StatefulWidget in Flutter?',
      a: 'A StatelessWidget is immutable and cannot change its configuration once built (its build method is called only once or when parent passes new arguments). A StatefulWidget maintains a mutable State object that persists across rebuilds. Calling setState() notifies the Flutter framework to re-execute the build() method with updated state variables.'
    },
    {
      q: '2. How does SQLite work in Flutter using the sqflite package?',
      a: 'sqflite is an open-source Flutter plugin for SQLite. It operates by providing asynchronous APIs to create a local relational database (.db file), execute DDL commands (CREATE TABLE), and run DML operations (db.insert(), db.query(), db.update(), db.delete(), and db.rawQuery()). In QuizMaster, DatabaseHelper manages a singleton database instance.'
    },
    {
      q: '3. What is BuildContext and why is it crucial in Flutter?',
      a: 'BuildContext is an interface that represents the location of a widget in the widget element tree. It allows widgets to locate inherited widgets (like Theme.of(context), Navigator.of(context), and Provider.of<T>(context)) and query media dimensions (MediaQuery.of(context)).'
    },
    {
      q: '4. How is the 30-second countdown timer implemented to prevent memory leaks?',
      a: 'We use Dart Timer.periodic(const Duration(seconds: 1), ...). In Flutter State objects, it is essential to cancel active timers inside the dispose() lifecycle method (timer?.cancel(); super.dispose();) to prevent orphan callback executions when the user navigates away.'
    },
    {
      q: '5. What is the difference between Hot Reload and Hot Restart in Flutter development?',
      a: 'Hot Reload injects updated source code into the running Dart Virtual Machine without resetting the widget application state (preserves form inputs and counters). Hot Restart resets the entire app state to its initial state by re-running main(), which is necessary when modifying initializers or global singletons.'
    },
    {
      q: '6. What is the difference between final and const in Dart?',
      a: '"const" represents a compile-time constant known at build time (canonicalized in memory). "final" variables can only be assigned once, but their value can be calculated or retrieved at runtime (e.g., DateTime.now() or database results).'
    },
    {
      q: '7. How does Provider state management function in this application?',
      a: 'Provider uses the InheritedWidget mechanism. QuizService extends ChangeNotifier. When state properties change (e.g., score, currentIndex, timeLeft), QuizService calls notifyListeners(), causing only the registered Consumer<QuizService> widgets to rebuild without rebuilding the entire screen hierarchy.'
    },
    {
      q: '8. How are questions and options randomized without losing track of the correct answer?',
      a: 'Each question object carries an immutable key (e.g., "A", "B", "C", "D" or exact text). When randomizing, questions are shuffled using a random seed or List.shuffle(). The correct answer attribute remains bound to the question entity, so matching user choice against question.correctAnswer remains deterministic.'
    },
    {
      q: '9. How does QuizMaster ensure offline capability?',
      a: 'The application contains a built-in pre-seeded dataset of 80 questions across 8 categories stored locally in SQLite upon first launch. All CRUD operations, score calculations, and history logs are executed strictly on the device without requiring network connectivity.'
    },
    {
      q: '10. What are the key features of Material Design 3 in Flutter?',
      a: 'Material Design 3 (M3) introduces dynamic color theming, updated typography scales, softer rounded corner geometry (e.g., RoundedRectangleBorder(borderRadius: BorderRadius.circular(16))), pill-free segmented buttons, and unified light/dark color schemes via ThemeData(useMaterial3: true).'
    }
  ];

  const handleCopyCli = () => {
    navigator.clipboard.writeText(`flutter create quizmaster
cd quizmaster
flutter pub get
flutter run`);
    setCopiedCmd(true);
    setTimeout(() => setCopiedCmd(false), 2000);
  };

  return (
    <div className="flex flex-col h-full bg-slate-950 text-slate-100 overflow-y-auto p-6 max-w-5xl mx-auto space-y-6">
      {/* Hub Header */}
      <div className="border-b border-slate-800 pb-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-purple-400">
            <GraduationCap className="w-4 h-4" />
            <span>ACADEMIC PROJECT REPORT · B.TECH LAB EVALUATION</span>
          </div>
          <h1 className="text-2xl font-extrabold text-white mt-1">
            QuizMaster: Smart Mobile Quiz Application
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Department of Computer Science & Engineering / Information Technology
          </p>
        </div>

        {/* Section Navigation Tabs */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-900 border border-slate-800 text-xs">
          <button
            onClick={() => setActiveSection('overview')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
              activeSection === 'overview' ? 'bg-purple-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveSection('test_cases')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
              activeSection === 'test_cases' ? 'bg-purple-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            Test Cases (15)
          </button>
          <button
            onClick={() => setActiveSection('viva')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
              activeSection === 'viva' ? 'bg-purple-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            Viva Voce Q&A
          </button>
          <button
            onClick={() => setActiveSection('db_schema')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
              activeSection === 'db_schema' ? 'bg-purple-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            SQLite Schema
          </button>
          <button
            onClick={() => setActiveSection('run_guide')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
              activeSection === 'run_guide' ? 'bg-purple-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            Run Instructions
          </button>
        </div>
      </div>

      {/* SECTION 1: OVERVIEW */}
      {activeSection === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
              <span className="text-xs font-mono text-purple-400">OBJECTIVE</span>
              <h4 className="text-sm font-bold text-white mt-1">Interactive Learning</h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Provide engineering students with a self-assessment testing tool across 8 fundamental and technical disciplines.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
              <span className="text-xs font-mono text-emerald-400">PERSISTENCE</span>
              <h4 className="text-sm font-bold text-white mt-1">SQLite & SharedPreferences</h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Full relational offline storage of student profiles, questions repository, score cards, and leaderboard rankings.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
              <span className="text-xs font-mono text-amber-400">UI / UX DESIGN</span>
              <h4 className="text-sm font-bold text-white mt-1">Material Design 3</h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Ergonomic mobile layout, tactile Web Audio feedback, 30s circular countdown timer, and victory celebrations.
              </p>
            </div>
          </div>

          {/* System Architecture Diagram */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-purple-400" />
              <span>QuizMaster High-Level System Architecture</span>
            </h3>

            <div className="p-4 rounded-xl bg-slate-950 font-mono text-xs text-purple-300 leading-relaxed border border-slate-800 overflow-x-auto">
              {`+-------------------------------------------------------------------------+
|                         PRESENTATION LAYER (UI)                         |
|  [SplashScreen] -> [HomeScreen] -> [CategoryScreen] -> [DifficultyScreen]  |
|  [QuizScreen (Timer, Sound, Feedback)] -> [ResultScreen] -> [ReviewScreen]   |
|  [LeaderboardScreen]               [ProfileScreen (CRUD Manager)]       |
+-------------------------------------------------------------------------+
                                    |
                                    v
+-------------------------------------------------------------------------+
|                      STATE MANAGEMENT (Provider)                        |
|  QuizService (ChangeNotifier)                                           |
|  - Manages questions pool, active index, timer tick, score accumulation  |
|  - Controls Web Audio synthesis (chimes, buzzers, victory fanfare)      |
|  - Dispatches state notifications to listening Consumer widgets        |
+-------------------------------------------------------------------------+
                                    |
                                    v
+-------------------------------------------------------------------------+
|                       LOCAL PERSISTENCE LAYER                           |
|  DatabaseHelper (SQLite Singleton via sqflite)                          |
|  - Table: users           (id, username, email)                         |
|  - Table: questions       (id, question, options A-D, correct, diff)    |
|  - Table: quiz_results    (id, user, category, score, percentage, date) |
|  SharedPreferences                                                      |
|  - Stores audio mute status & theme preferences (Dark/Light)            |
+-------------------------------------------------------------------------+`}
            </div>
          </div>
        </div>
      )}

      {/* SECTION 2: TEST CASES TABLE */}
      {activeSection === 'test_cases' && (
        <div className="space-y-4">
          <div>
            <h3 className="text-base font-bold text-white">
              Academic Software Verification Test Suite (15 Test Cases)
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Comprehensive black-box and integration verification scenarios required for lab viva examination.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 overflow-hidden bg-slate-900">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-950 text-slate-400 font-mono uppercase text-[10px] border-b border-slate-800">
                  <tr>
                    <th className="py-3 px-4">Test ID</th>
                    <th className="py-3 px-4">Module</th>
                    <th className="py-3 px-4">Description & Steps</th>
                    <th className="py-3 px-4">Expected Result</th>
                    <th className="py-3 px-4 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-300">
                  {testCases.map((tc) => (
                    <tr key={tc.id} className="hover:bg-slate-850">
                      <td className="py-3 px-4 font-mono font-bold text-purple-400 whitespace-nowrap">
                        {tc.id}
                      </td>
                      <td className="py-3 px-4 font-semibold text-white whitespace-nowrap">
                        {tc.module}
                      </td>
                      <td className="py-3 px-4">
                        <p className="font-medium text-slate-200">{tc.description}</p>
                        <p className="text-[11px] text-slate-400 mt-0.5 font-mono">Steps: {tc.steps}</p>
                      </td>
                      <td className="py-3 px-4 text-slate-300">
                        {tc.expected}
                      </td>
                      <td className="py-3 px-4 text-center whitespace-nowrap">
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>{tc.status}</span>
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 3: VIVA VOCE Q&A */}
      {activeSection === 'viva' && (
        <div className="space-y-4">
          <div>
            <h3 className="text-base font-bold text-white">
              B.Tech Lab Viva Voce Questions & Evaluator Answers
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Top technical questions frequently asked by external and internal examiners during practical lab evaluations.
            </p>
          </div>

          <div className="space-y-3">
            {vivaQuestions.map((v, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                <h4 className="text-xs font-bold text-purple-300 flex items-start gap-2">
                  <HelpCircle className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                  <span>{v.q}</span>
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed pl-6 border-l border-purple-500/30">
                  {v.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 4: SQLITE SCHEMA */}
      {activeSection === 'db_schema' && (
        <div className="space-y-4">
          <div>
            <h3 className="text-base font-bold text-white">
              SQLite Relational Database Design
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Complete DDL table definitions and CRUD query specifications.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Table 1 */}
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2">
                <Database className="w-4 h-4 text-purple-400" />
                <h4 className="text-xs font-mono font-bold text-white">Table: users</h4>
              </div>
              <ul className="text-xs font-mono text-slate-300 space-y-1">
                <li>• id INTEGER PRIMARY KEY</li>
                <li>• username TEXT NOT NULL</li>
                <li>• email TEXT NOT NULL</li>
              </ul>
              <div className="text-[10px] text-slate-400 font-sans pt-1 border-t border-slate-800">
                CRUD: INSERT, SELECT, UPDATE student account.
              </div>
            </div>

            {/* Table 2 */}
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2">
                <Database className="w-4 h-4 text-emerald-400" />
                <h4 className="text-xs font-mono font-bold text-white">Table: questions</h4>
              </div>
              <ul className="text-xs font-mono text-slate-300 space-y-1">
                <li>• id INTEGER PRIMARY KEY</li>
                <li>• question TEXT</li>
                <li>• option_a/b/c/d TEXT</li>
                <li>• correct_answer TEXT</li>
                <li>• category TEXT</li>
                <li>• difficulty TEXT</li>
                <li>• explanation TEXT</li>
              </ul>
              <div className="text-[10px] text-slate-400 font-sans pt-1 border-t border-slate-800">
                CRUD: Filter by category & difficulty.
              </div>
            </div>

            {/* Table 3 */}
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2">
                <Database className="w-4 h-4 text-blue-400" />
                <h4 className="text-xs font-mono font-bold text-white">Table: quiz_results</h4>
              </div>
              <ul className="text-xs font-mono text-slate-300 space-y-1">
                <li>• id INTEGER PRIMARY KEY</li>
                <li>• username TEXT</li>
                <li>• category TEXT</li>
                <li>• total_questions INT</li>
                <li>• correct_answers INT</li>
                <li>• incorrect_answers INT</li>
                <li>• score INT</li>
                <li>• percentage REAL</li>
                <li>• date TEXT</li>
              </ul>
              <div className="text-[10px] text-slate-400 font-sans pt-1 border-t border-slate-800">
                CRUD: Logs history, aggregates leaderboard.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 5: RUN GUIDE */}
      {activeSection === 'run_guide' && (
        <div className="space-y-4">
          <div>
            <h3 className="text-base font-bold text-white">
              Instructions to Run Flutter Application
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Prerequisites: Flutter SDK 3.x or higher, Dart 3.x, Android Studio or VS Code with Flutter extension.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-purple-400 font-bold">1. Terminal Commands</span>
              <button
                onClick={handleCopyCli}
                className="text-xs font-mono text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer"
              >
                {copiedCmd ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedCmd ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <pre className="p-3 rounded-xl bg-slate-950 font-mono text-xs text-emerald-400 overflow-x-auto">
              <code>{`# 1. Create project folder
flutter create quizmaster

# 2. Enter directory
cd quizmaster

# 3. Fetch dependencies from pubspec.yaml
flutter pub get

# 4. Launch on Android Emulator or connected device
flutter run

# (Optional) Run on Chrome for instant desktop preview:
flutter run -d chrome`}</code>
            </pre>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
            <h4 className="text-xs font-bold text-white">2. Running in Android Studio / VS Code</h4>
            <ol className="text-xs text-slate-300 space-y-1.5 list-decimal pl-4">
              <li>Open Android Studio or VS Code.</li>
              <li>Select <b>File -&gt; Open</b> and choose the extracted <code>quizmaster</code> project folder.</li>
              <li>Wait for Flutter plugins to index and execute <code>flutter pub get</code> automatically.</li>
              <li>Select your target Android Device / Emulator from the device selector bar.</li>
              <li>Click the green <b>Run (Play)</b> button or press <b>F5</b> to build and install the APK.</li>
            </ol>
          </div>
        </div>
      )}
    </div>
  );
};
