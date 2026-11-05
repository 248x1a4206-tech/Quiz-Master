export interface FlutterFile {
  path: string;
  name: string;
  language: 'dart' | 'yaml' | 'markdown';
  description: string;
  code: string;
}

export const FLUTTER_PROJECT_FILES: FlutterFile[] = [
  // ----------------------------------------------------
  // 1. pubspec.yaml
  // ----------------------------------------------------
  {
    path: 'pubspec.yaml',
    name: 'pubspec.yaml',
    language: 'yaml',
    description: 'Flutter project dependencies & asset configuration for QuizMaster B.Tech lab project',
    code: `name: quizmaster
description: "A smart modern quiz mobile application built with Flutter, Dart, SQLite, and Material Design 3."
publish_to: 'none'

version: 1.0.0+1

environment:
  sdk: '>=3.0.0 <4.0.0'

dependencies:
  flutter:
    sdk: flutter

  # UI Icons & Material 3
  cupertino_icons: ^1.0.8

  # State Management
  provider: ^6.1.2

  # SQLite Relational Database
  sqflite: ^2.3.3+1
  path: ^1.9.0

  # Local Key-Value Storage
  shared_preferences: ^2.2.3

  # Audio Feedback (Sound Effects)
  audioplayers: ^6.0.0

  # Celebration Animation
  confetti: ^0.7.0

  # Analytics Charts
  fl_chart: ^0.68.0

dev_dependencies:
  flutter_test:
    sdk: flutter
  flutter_lints: ^3.0.0

flutter:
  uses-material-design: true

  # Asset declaration for custom sounds and category icons
  assets:
    - assets/sounds/
    - assets/icons/
`
  },

  // ----------------------------------------------------
  // 2. lib/main.dart
  // ----------------------------------------------------
  {
    path: 'lib/main.dart',
    name: 'main.dart',
    language: 'dart',
    description: 'Application entry point initializing SQLite database, theme provider, and Material App',
    code: `import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:provider/provider.dart';
import 'services/quiz_service.dart';
import 'database/database_helper.dart';
import 'screens/splash_screen.dart';
import 'utils/app_theme.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();

  // Set system UI overlay style
  SystemChrome.setSystemUIOverlayStyle(
    const SystemUiOverlayStyle(
      statusBarColor: Colors.transparent,
      statusBarIconBrightness: Brightness.light,
    ),
  );

  // Initialize SQLite Database
  await DatabaseHelper.instance.database;

  runApp(
    MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (_) => QuizService()..initService()),
      ],
      child: const QuizMasterApp(),
    ),
  );
}

class QuizMasterApp extends StatelessWidget {
  const QuizMasterApp({super.key});

  @override
  Widget build(BuildContext context) {
    return Consumer<QuizService>(
      builder: (context, quizService, child) {
        return MaterialApp(
          title: 'QuizMaster',
          debugShowCheckedModeBanner: false,
          themeMode: quizService.isDarkMode ? ThemeMode.dark : ThemeMode.light,
          theme: AppTheme.lightTheme,
          darkTheme: AppTheme.darkTheme,
          home: const SplashScreen(),
        );
      },
    );
  }
}
`
  },

  // ----------------------------------------------------
  // 3. lib/models/question.dart
  // ----------------------------------------------------
  {
    path: 'lib/models/question.dart',
    name: 'question.dart',
    language: 'dart',
    description: 'Question data model with JSON & SQLite map serialization',
    code: `class Question {
  final int? id;
  final String question;
  final String optionA;
  final String optionB;
  final String optionC;
  final String optionD;
  final String correctAnswer; // 'A', 'B', 'C', or 'D'
  final String category;
  final String difficulty; // 'Easy', 'Medium', 'Hard'
  final String explanation;

  Question({
    this.id,
    required this.question,
    required this.optionA,
    required this.optionB,
    required this.optionC,
    required this.optionD,
    required this.correctAnswer,
    required this.category,
    required this.difficulty,
    required this.explanation,
  });

  // Convert SQLite Map to Question object
  factory Question.fromMap(Map<String, dynamic> map) {
    return Question(
      id: map['id'] as int?,
      question: map['question'] as String,
      optionA: map['option_a'] as String,
      optionB: map['option_b'] as String,
      optionC: map['option_c'] as String,
      optionD: map['option_d'] as String,
      correctAnswer: map['correct_answer'] as String,
      category: map['category'] as String,
      difficulty: map['difficulty'] as String,
      explanation: map['explanation'] as String,
    );
  }

  // Convert Question object to SQLite Map
  Map<String, dynamic> toMap() {
    return {
      'id': id,
      'question': question,
      'option_a': optionA,
      'option_b': optionB,
      'option_c': optionC,
      'option_d': optionD,
      'correct_answer': correctAnswer,
      'category': category,
      'difficulty': difficulty,
      'explanation': explanation,
    };
  }
}
`
  },

  // ----------------------------------------------------
  // 4. lib/models/user.dart
  // ----------------------------------------------------
  {
    path: 'lib/models/user.dart',
    name: 'user.dart',
    language: 'dart',
    description: 'User profile model for student credentials and SQLite persistence',
    code: `class User {
  final int? id;
  final String username;
  final String email;

  User({
    this.id,
    required this.username,
    required this.email,
  });

  factory User.fromMap(Map<String, dynamic> map) {
    return User(
      id: map['id'] as int?,
      username: map['username'] as String,
      email: map['email'] as String,
    );
  }

  Map<String, dynamic> toMap() {
    return {
      'id': id,
      'username': username,
      'email': email,
    };
  }
}
`
  },

  // ----------------------------------------------------
  // 5. lib/models/quiz_result.dart
  // ----------------------------------------------------
  {
    path: 'lib/models/quiz_result.dart',
    name: 'quiz_result.dart',
    language: 'dart',
    description: 'Quiz session performance record with score, percentage, and timestamps',
    code: `class QuizResult {
  final int? id;
  final String username;
  final String category;
  final int totalQuestions;
  final int correctAnswers;
  final int incorrectAnswers;
  final int score;
  final double percentage;
  final String date;

  QuizResult({
    this.id,
    required this.username,
    required this.category,
    required this.totalQuestions,
    required this.correctAnswers,
    required this.incorrectAnswers,
    required this.score,
    required this.percentage,
    required this.date,
  });

  factory QuizResult.fromMap(Map<String, dynamic> map) {
    return QuizResult(
      id: map['id'] as int?,
      username: map['username'] as String,
      category: map['category'] as String,
      totalQuestions: map['total_questions'] as int,
      correctAnswers: map['correct_answers'] as int,
      incorrectAnswers: map['incorrect_answers'] as int,
      score: map['score'] as int,
      percentage: (map['percentage'] as num).toDouble(),
      date: map['date'] as String,
    );
  }

  Map<String, dynamic> toMap() {
    return {
      'id': id,
      'username': username,
      'category': category,
      'total_questions': totalQuestions,
      'correct_answers': correctAnswers,
      'incorrect_answers': incorrectAnswers,
      'score': score,
      'percentage': percentage,
      'date': date,
    };
  }
}
`
  },

  // ----------------------------------------------------
  // 6. lib/database/database_helper.dart
  // ----------------------------------------------------
  {
    path: 'lib/database/database_helper.dart',
    name: 'database_helper.dart',
    language: 'dart',
    description: 'SQLite database singleton with DDL table definitions and full CRUD queries',
    code: `import 'package:sqflite/sqflite.dart';
import 'package:path/path.dart';
import '../models/user.dart';
import '../models/question.dart';
import '../models/quiz_result.dart';

class DatabaseHelper {
  static final DatabaseHelper instance = DatabaseHelper._init();
  static Database? _database;

  DatabaseHelper._init();

  Future<Database> get database async {
    if (_database != null) return _database!;
    _database = await _initDB('quizmaster.db');
    return _database!;
  }

  Future<Database> _initDB(String filePath) async {
    final dbPath = await getDatabasesPath();
    final path = join(dbPath, filePath);

    return await openDatabase(
      path,
      version: 1,
      onCreate: _createDB,
    );
  }

  Future<void> _createDB(Database db, int version) async {
    // 1. Users Table
    await db.execute('''
      CREATE TABLE users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL,
        email TEXT NOT NULL
      )
    ''');

    // 2. Questions Table
    await db.execute('''
      CREATE TABLE questions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        question TEXT NOT NULL,
        option_a TEXT NOT NULL,
        option_b TEXT NOT NULL,
        option_c TEXT NOT NULL,
        option_d TEXT NOT NULL,
        correct_answer TEXT NOT NULL,
        category TEXT NOT NULL,
        difficulty TEXT NOT NULL,
        explanation TEXT NOT NULL
      )
    ''');

    // 3. Quiz Results Table
    await db.execute('''
      CREATE TABLE quiz_results (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL,
        category TEXT NOT NULL,
        total_questions INTEGER NOT NULL,
        correct_answers INTEGER NOT NULL,
        incorrect_answers INTEGER NOT NULL,
        score INTEGER NOT NULL,
        percentage REAL NOT NULL,
        date TEXT NOT NULL
      )
    ''');

    // Pre-seed default student
    await db.insert('users', {
      'username': 'Priya Sharma',
      'email': 'priya.btech@university.edu.in'
    });
  }

  // ================= CRUD: Users =================
  Future<int> insertUser(User user) async {
    final db = await instance.database;
    return await db.insert('users', user.toMap());
  }

  Future<User?> getUser(int id) async {
    final db = await instance.database;
    final maps = await db.query('users', where: 'id = ?', whereArgs: [id]);
    if (maps.isNotEmpty) {
      return User.fromMap(maps.first);
    }
    return null;
  }

  Future<int> updateUser(User user) async {
    final db = await instance.database;
    return await db.update(
      'users',
      user.toMap(),
      where: 'id = ?',
      whereArgs: [user.id],
    );
  }

  // ================= CRUD: Questions =================
  Future<int> insertQuestion(Question question) async {
    final db = await instance.database;
    return await db.insert('questions', question.toMap());
  }

  Future<List<Question>> getQuestionsByCategoryAndDifficulty(
    String category,
    String difficulty,
  ) async {
    final db = await instance.database;
    final result = await db.query(
      'questions',
      where: 'category = ? AND difficulty = ?',
      whereArgs: [category, difficulty],
    );
    return result.map((json) => Question.fromMap(json)).toList();
  }

  Future<List<Question>> getAllQuestions() async {
    final db = await instance.database;
    final result = await db.query('questions');
    return result.map((json) => Question.fromMap(json)).toList();
  }

  // ================= CRUD: Quiz Results =================
  Future<int> insertQuizResult(QuizResult result) async {
    final db = await instance.database;
    return await db.insert('quiz_results', result.toMap());
  }

  Future<List<QuizResult>> getAllResults() async {
    final db = await instance.database;
    final result = await db.query('quiz_results', orderBy: 'id DESC');
    return result.map((json) => QuizResult.fromMap(json)).toList();
  }

  Future<List<QuizResult>> getLeaderboard() async {
    final db = await instance.database;
    final result = await db.query(
      'quiz_results',
      orderBy: 'score DESC, percentage DESC',
    );
    return result.map((json) => QuizResult.fromMap(json)).toList();
  }

  Future<int> deleteResult(int id) async {
    final db = await instance.database;
    return await db.delete('quiz_results', where: 'id = ?', whereArgs: [id]);
  }

  Future<int> clearResults() async {
    final db = await instance.database;
    return await db.delete('quiz_results');
  }

  Future<void> close() async {
    final db = await instance.database;
    db.close();
  }
}
`
  },

  // ----------------------------------------------------
  // 7. lib/services/quiz_service.dart
  // ----------------------------------------------------
  {
    path: 'lib/services/quiz_service.dart',
    name: 'quiz_service.dart',
    language: 'dart',
    description: 'Central ChangeNotifier state manager coordinating questions, timer, score, and audio feedback',
    code: `import 'dart:async';
import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../models/question.dart';
import '../models/quiz_result.dart';
import '../models/user.dart';
import '../database/database_helper.dart';

class QuizService extends ChangeNotifier {
  User? _currentUser;
  List<Question> _questions = [];
  int _currentIndex = 0;
  String? _selectedOption;
  bool _isAnswerLocked = false;
  int _timeLeft = 30;
  Timer? _timer;
  int _score = 0;
  bool _isSoundMuted = false;
  bool _isDarkMode = true;

  // Getters
  User? get currentUser => _currentUser;
  List<Question> get questions => _questions;
  int get currentIndex => _currentIndex;
  Question? get currentQuestion => _questions.isNotEmpty ? _questions[_currentIndex] : null;
  String? get selectedOption => _selectedOption;
  bool get isAnswerLocked => _isAnswerLocked;
  int get timeLeft => _timeLeft;
  int get score => _score;
  bool get isSoundMuted => _isSoundMuted;
  bool get isDarkMode => _isDarkMode;

  Future<void> initService() async {
    final prefs = await SharedPreferences.getInstance();
    _isSoundMuted = prefs.getBool('is_muted') ?? false;
    _isDarkMode = prefs.getBool('is_dark_mode') ?? true;

    // Load active user
    _currentUser = await DatabaseHelper.instance.getUser(1) ??
        User(id: 1, username: 'Priya Sharma', email: 'priya.btech@university.edu.in');

    notifyListeners();
  }

  void toggleTheme() async {
    _isDarkMode = !_isDarkMode;
    final prefs = await SharedPreferences.getInstance();
    await prefs.setBool('is_dark_mode', _isDarkMode);
    notifyListeners();
  }

  void toggleMute() async {
    _isSoundMuted = !_isSoundMuted;
    final prefs = await SharedPreferences.getInstance();
    await prefs.setBool('is_muted', _isSoundMuted);
    notifyListeners();
  }

  void startQuiz(List<Question> fetchedQuestions) {
    _questions = fetchedQuestions;
    _currentIndex = 0;
    _score = 0;
    _selectedOption = null;
    _isAnswerLocked = false;
    _startTimer();
    notifyListeners();
  }

  void _startTimer() {
    _timer?.cancel();
    _timeLeft = 30;
    _timer = Timer.periodic(const Duration(seconds: 1), (timer) {
      if (_timeLeft > 0) {
        _timeLeft--;
        notifyListeners();
      } else {
        _timer?.cancel();
        _isAnswerLocked = true;
        notifyListeners();
      }
    });
  }

  void selectAnswer(String option) {
    if (_isAnswerLocked || currentQuestion == null) return;
    _timer?.cancel();
    _selectedOption = option;
    _isAnswerLocked = true;

    if (option == currentQuestion!.correctAnswer) {
      _score++;
    }
    notifyListeners();
  }

  bool nextQuestion() {
    if (_currentIndex + 1 < _questions.length) {
      _currentIndex++;
      _selectedOption = null;
      _isAnswerLocked = false;
      _startTimer();
      notifyListeners();
      return true;
    }
    _timer?.cancel();
    return false; // Quiz completed
  }

  Future<QuizResult> saveQuizResult(String category) async {
    final percentage = (_score / _questions.length) * 100;
    final result = QuizResult(
      username: _currentUser?.username ?? 'Student',
      category: category,
      totalQuestions: _questions.length,
      correctAnswers: _score,
      incorrectAnswers: _questions.length - _score,
      score: _score,
      percentage: percentage,
      date: DateTime.now().toIso8601String(),
    );

    await DatabaseHelper.instance.insertQuizResult(result);
    return result;
  }

  @override
  void dispose() {
    _timer?.cancel();
    super.dispose();
  }
}
`
  },

  // ----------------------------------------------------
  // 8. lib/utils/app_theme.dart
  // ----------------------------------------------------
  {
    path: 'lib/utils/app_theme.dart',
    name: 'app_theme.dart',
    language: 'dart',
    description: 'Material Design 3 custom light & dark theme specifications with purple-blue palette',
    code: `import 'package:flutter/material.dart';

class AppTheme {
  // Brand Colors
  static const Color primaryColor = Color(0xFF7C3AED); // Purple
  static const Color secondaryColor = Color(0xFF3B82F6); // Blue
  static const Color accentColor = Color(0xFFF59E0B); // Amber
  static const Color successColor = Color(0xFF10B981); // Emerald
  static const Color errorColor = Color(0xFFEF4444); // Red

  // Dark Theme
  static final ThemeData darkTheme = ThemeData(
    useMaterial3: true,
    brightness: Brightness.dark,
    scaffoldBackgroundColor: const Color(0xFF0F172A), // Deep Slate
    primaryColor: primaryColor,
    colorScheme: const ColorScheme.dark(
      primary: primaryColor,
      secondary: secondaryColor,
      surface: Color(0xFF1E293B),
      error: errorColor,
    ),
    cardTheme: CardTheme(
      color: const Color(0xFF1E293B),
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
      elevation: 0,
    ),
    appBarTheme: const AppBarTheme(
      backgroundColor: Colors.transparent,
      elevation: 0,
      centerTitle: true,
      titleTextStyle: TextStyle(
        fontSize: 18,
        fontWeight: FontWeight.bold,
        color: Colors.white,
      ),
    ),
  );

  // Light Theme
  static final ThemeData lightTheme = ThemeData(
    useMaterial3: true,
    brightness: Brightness.light,
    scaffoldBackgroundColor: const Color(0xFFF8FAFC),
    primaryColor: primaryColor,
    colorScheme: const ColorScheme.light(
      primary: primaryColor,
      secondary: secondaryColor,
      surface: Colors.white,
      error: errorColor,
    ),
    cardTheme: CardTheme(
      color: Colors.white,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
      elevation: 1,
    ),
  );
}
`
  },

  // ----------------------------------------------------
  // 9. lib/screens/quiz_screen.dart
  // ----------------------------------------------------
  {
    path: 'lib/screens/quiz_screen.dart',
    name: 'quiz_screen.dart',
    language: 'dart',
    description: 'Interactive question screen with 30s countdown, single choice lock, and auto-advance',
    code: `import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../services/quiz_service.dart';
import '../widgets/timer_widget.dart';
import '../widgets/answer_option.dart';
import 'result_screen.dart';

class QuizScreen extends StatelessWidget {
  final String category;
  final String difficulty;

  const QuizScreen({
    super.key,
    required this.category,
    required this.difficulty,
  });

  @override
  Widget build(BuildContext context) {
    return Consumer<QuizService>(
      builder: (context, service, child) {
        final currentQ = service.currentQuestion;
        if (currentQ == null) {
          return const Scaffold(
            body: Center(child: CircularProgressIndicator()),
          );
        }

        final options = [
          {'key': 'A', 'text': currentQ.optionA},
          {'key': 'B', 'text': currentQ.optionB},
          {'key': 'C', 'text': currentQ.optionC},
          {'key': 'D', 'text': currentQ.optionD},
        ];

        return Scaffold(
          appBar: AppBar(
            title: Text('\$category - \$difficulty'),
            actions: [
              IconButton(
                icon: Icon(service.isSoundMuted ? Icons.volume_off : Icons.volume_up),
                onPressed: () => service.toggleMute(),
              ),
            ],
          ),
          body: Padding(
            padding: const EdgeInsets.all(16.0),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                // Top Progress & Timer Row
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Text(
                      'Question \${service.currentIndex + 1} / \${service.questions.length}',
                      style: const TextStyle(fontWeight: FontWeight.bold),
                    ),
                    TimerWidget(timeLeft: service.timeLeft),
                  ],
                ),
                const SizedBox(height: 16),

                // Question Card
                Card(
                  child: Padding(
                    padding: const EdgeInsets.all(20.0),
                    child: Text(
                      currentQ.question,
                      style: const TextStyle(fontSize: 16, fontWeight: FontWeight.w600),
                    ),
                  ),
                ),
                const SizedBox(height: 20),

                // Options List
                ...options.map((opt) {
                  return AnswerOption(
                    optionKey: opt['key']!,
                    text: opt['text']!,
                    isSelected: service.selectedOption == opt['key'],
                    isCorrect: currentQ.correctAnswer == opt['key'],
                    isLocked: service.isAnswerLocked,
                    onTap: () => service.selectAnswer(opt['key']!),
                  );
                }),

                const Spacer(),

                // Next Button
                if (service.isAnswerLocked)
                  ElevatedButton(
                    style: ElevatedButton.styleFrom(
                      padding: const EdgeInsets.symmetric(vertical: 16),
                      backgroundColor: Theme.of(context).primaryColor,
                      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                    ),
                    onPressed: () async {
                      final hasNext = service.nextQuestion();
                      if (!hasNext) {
                        final result = await service.saveQuizResult(category);
                        if (context.mounted) {
                          Navigator.pushReplacement(
                            context,
                            MaterialPageRoute(
                              builder: (_) => ResultScreen(result: result),
                            ),
                          );
                        }
                      }
                    },
                    child: Text(
                      service.currentIndex + 1 == service.questions.length
                          ? 'Finish Quiz'
                          : 'Next Question',
                      style: const TextStyle(color: Colors.white, fontWeight: FontWeight.bold),
                    ),
                  ),
              ],
            ),
          ),
        );
      },
    );
  }
}
`
  },

  // ----------------------------------------------------
  // 10. lib/screens/result_screen.dart
  // ----------------------------------------------------
  {
    path: 'lib/screens/result_screen.dart',
    name: 'result_screen.dart',
    language: 'dart',
    description: 'Score summary screen with percentage calculation, confetti, and navigation buttons',
    code: `import 'package:flutter/material.dart';
import 'package:confetti/confetti.dart';
import '../models/quiz_result.dart';
import 'review_screen.dart';

class ResultScreen extends StatefulWidget {
  final QuizResult result;

  const ResultScreen({super.key, required this.result});

  @override
  State<ResultScreen> createState() => _ResultScreenState();
}

class _ResultScreenState extends State<ResultScreen> {
  late ConfettiController _confettiController;

  @override
  void initState() {
    super.initState();
    _confettiController = ConfettiController(duration: const Duration(seconds: 3));
    if (widget.result.percentage >= 70) {
      _confettiController.play();
    }
  }

  @override
  void dispose() {
    _confettiController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Stack(
        alignment: Alignment.topCenter,
        children: [
          ConfettiWidget(
            confettiController: _confettiController,
            blastDirectionality: BlastDirectionality.explosive,
            shouldLoop: false,
          ),
          Padding(
            padding: const EdgeInsets.all(24.0),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                const Icon(Icons.emoji_events, size: 72, color: Colors.amber),
                const SizedBox(height: 16),
                const Text(
                  'Quiz Finished!',
                  style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
                ),
                const SizedBox(height: 8),
                Text(
                  '\${widget.result.category}',
                  style: const TextStyle(color: Colors.grey),
                ),
                const SizedBox(height: 24),

                // Score Ring Card
                Card(
                  child: Padding(
                    padding: const EdgeInsets.all(24.0),
                    child: Column(
                      children: [
                        Text(
                          '\${widget.result.percentage.toInt()}%',
                          style: const TextStyle(fontSize: 48, fontWeight: FontWeight.bold),
                        ),
                        const Text('Overall Score'),
                        const Divider(height: 32),
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceAround,
                          children: [
                            _buildStat('Correct', widget.result.correctAnswers, Colors.green),
                            _buildStat('Wrong', widget.result.incorrectAnswers, Colors.red),
                            _buildStat('Score', '\${widget.result.score}/\${widget.result.totalQuestions}', Colors.purple),
                          ],
                        ),
                      ],
                    ),
                  ),
                ),
                const SizedBox(height: 32),

                // Action Buttons
                ElevatedButton.icon(
                  icon: const Icon(Icons.rule),
                  label: const Text('Review Answers & Explanations'),
                  onPressed: () {
                    Navigator.push(
                      context,
                      MaterialPageRoute(
                        builder: (_) => ReviewScreen(result: widget.result),
                      ),
                    );
                  },
                ),
                const SizedBox(height: 12),
                OutlinedButton.icon(
                  icon: const Icon(Icons.home),
                  label: const Text('Return to Home'),
                  onPressed: () => Navigator.popUntil(context, (route) => route.isFirst),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildStat(String label, dynamic value, Color color) {
    return Column(
      children: [
        Text('\$value', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: color)),
        const SizedBox(height: 4),
        Text(label, style: const TextStyle(fontSize: 12, color: Colors.grey)),
      ],
    );
  }
}
`
  }
];
