import { Question } from '../types/quiz';

export const INITIAL_QUESTIONS: Question[] = [
  // ==========================================
  // 1. GENERAL KNOWLEDGE (10 Questions)
  // ==========================================
  {
    id: 1,
    category: 'General Knowledge',
    difficulty: 'Easy',
    question: 'Which is the largest ocean on Earth?',
    option_a: 'Atlantic Ocean',
    option_b: 'Indian Ocean',
    option_c: 'Pacific Ocean',
    option_d: 'Arctic Ocean',
    correct_answer: 'C',
    explanation: 'The Pacific Ocean is the largest and deepest ocean basin on Earth, covering more than 60 million square miles.'
  },
  {
    id: 2,
    category: 'General Knowledge',
    difficulty: 'Easy',
    question: 'Who wrote the play "Romeo and Juliet"?',
    option_a: 'William Shakespeare',
    option_b: 'Charles Dickens',
    option_c: 'Jane Austen',
    option_d: 'Mark Twain',
    correct_answer: 'A',
    explanation: 'Romeo and Juliet is an iconic tragedy written early in the career of playwright William Shakespeare around 1595.'
  },
  {
    id: 3,
    category: 'General Knowledge',
    difficulty: 'Easy',
    question: 'What is the capital city of Japan?',
    option_a: 'Kyoto',
    option_b: 'Osaka',
    option_c: 'Tokyo',
    option_d: 'Hiroshima',
    correct_answer: 'C',
    explanation: 'Tokyo has served as the capital and seat of government of Japan since the Meiji Restoration in 1868.'
  },
  {
    id: 4,
    category: 'General Knowledge',
    difficulty: 'Medium',
    question: 'Which country is known as the "Land of the Midnight Sun"?',
    option_a: 'Sweden',
    option_b: 'Norway',
    option_c: 'Iceland',
    option_d: 'Finland',
    correct_answer: 'B',
    explanation: 'Norway is called the Land of the Midnight Sun because parts of it experience continuous daylight from late May to late July.'
  },
  {
    id: 5,
    category: 'General Knowledge',
    difficulty: 'Medium',
    question: 'Which desert is the largest hot desert in the world?',
    option_a: 'Gobi Desert',
    option_b: 'Kalahari Desert',
    option_c: 'Sahara Desert',
    option_d: 'Thar Desert',
    correct_answer: 'C',
    explanation: 'The Sahara Desert in Northern Africa is the largest hot desert on Earth, covering approximately 9.2 million square kilometers.'
  },
  {
    id: 6,
    category: 'General Knowledge',
    difficulty: 'Medium',
    question: 'In which year did the United Nations officially come into existence?',
    option_a: '1919',
    option_b: '1945',
    option_c: '1948',
    option_d: '1950',
    correct_answer: 'B',
    explanation: 'The United Nations officially came into existence on October 24, 1945, after the Charter was ratified by the five permanent members of the Security Council.'
  },
  {
    id: 7,
    category: 'General Knowledge',
    difficulty: 'Hard',
    question: 'Which ancient wonder was located in the city of Babylon?',
    option_a: 'Colossus of Rhodes',
    option_b: 'Hanging Gardens',
    option_c: 'Lighthouse of Alexandria',
    option_d: 'Temple of Artemis',
    correct_answer: 'B',
    explanation: 'The Hanging Gardens of Babylon were one of the Seven Wonders of the Ancient World, famously described as an ascending series of tiered gardens.'
  },
  {
    id: 8,
    category: 'General Knowledge',
    difficulty: 'Hard',
    question: 'What is the deepest natural trench in the world?',
    option_a: 'Java Trench',
    option_b: 'Puerto Rico Trench',
    option_c: 'Mariana Trench',
    option_d: 'Tonga Trench',
    correct_answer: 'C',
    explanation: 'The Mariana Trench in the western Pacific Ocean reaches a maximum known depth of approximately 10,994 meters (Challenger Deep).'
  },
  {
    id: 9,
    category: 'General Knowledge',
    difficulty: 'Hard',
    question: 'Who was the first female Prime Minister in the world?',
    option_a: 'Indira Gandhi',
    option_b: 'Sirimavo Bandaranaike',
    option_c: 'Margaret Thatcher',
    option_d: 'Golda Meir',
    correct_answer: 'B',
    explanation: 'Sirimavo Bandaranaike of Sri Lanka (then Ceylon) became the world first elected female head of government in July 1960.'
  },
  {
    id: 10,
    category: 'General Knowledge',
    difficulty: 'Easy',
    question: 'What is the currency of the United Kingdom?',
    option_a: 'Euro',
    option_b: 'Pound Sterling',
    option_c: 'Dollar',
    option_d: 'Franc',
    correct_answer: 'B',
    explanation: 'The Pound Sterling (£) is the official currency of the United Kingdom and is the oldest currency in continuous use.'
  },

  // ==========================================
  // 2. SCIENCE (10 Questions)
  // ==========================================
  {
    id: 11,
    category: 'Science',
    difficulty: 'Easy',
    question: 'What gas do plants absorb from the atmosphere for photosynthesis?',
    option_a: 'Oxygen',
    option_b: 'Nitrogen',
    option_c: 'Carbon Dioxide',
    option_d: 'Hydrogen',
    correct_answer: 'C',
    explanation: 'During photosynthesis, green plants absorb carbon dioxide (CO2) and water in the presence of sunlight to synthesize glucose and release oxygen.'
  },
  {
    id: 12,
    category: 'Science',
    difficulty: 'Easy',
    question: 'What is the chemical formula for water?',
    option_a: 'CO2',
    option_b: 'H2O',
    option_c: 'NaCl',
    option_d: 'CH4',
    correct_answer: 'B',
    explanation: 'Water is formed by covalent bonding between two hydrogen atoms and one oxygen atom (H2O).'
  },
  {
    id: 13,
    category: 'Science',
    difficulty: 'Easy',
    question: 'Which planet is known as the "Red Planet"?',
    option_a: 'Venus',
    option_b: 'Jupiter',
    option_c: 'Mars',
    option_d: 'Mercury',
    correct_answer: 'C',
    explanation: 'Mars appears reddish because of widespread iron oxide (rust) covering its rocky surface and thin atmosphere.'
  },
  {
    id: 14,
    category: 'Science',
    difficulty: 'Medium',
    question: 'What is the powerhouse organelle of eukaryotic cells?',
    option_a: 'Ribosome',
    option_b: 'Mitochondria',
    option_c: 'Endoplasmic Reticulum',
    option_d: 'Golgi Apparatus',
    correct_answer: 'B',
    explanation: 'Mitochondria generate most of the chemical energy needed to power cellular reactions via adenosine triphosphate (ATP) production.'
  },
  {
    id: 15,
    category: 'Science',
    difficulty: 'Medium',
    question: 'What is the speed of light in a vacuum (approx)?',
    option_a: '300,000 km/s',
    option_b: '150,000 km/s',
    option_c: '3,000 km/s',
    option_d: '30,000 km/s',
    correct_answer: 'A',
    explanation: 'The speed of light in vacuum is defined as exactly 299,792,458 meters per second, which rounds to approximately 300,000 km/s.'
  },
  {
    id: 16,
    category: 'Science',
    difficulty: 'Medium',
    question: 'Which blood cells are primarily responsible for fighting infections?',
    option_a: 'Erythrocytes (Red blood cells)',
    option_b: 'Leukocytes (White blood cells)',
    option_c: 'Thrombocytes (Platelets)',
    option_d: 'Plasma',
    correct_answer: 'B',
    explanation: 'White blood cells (leukocytes) form a crucial part of the immune system by identifying, neutralizing, and engulfing pathogens.'
  },
  {
    id: 17,
    category: 'Science',
    difficulty: 'Hard',
    question: 'What phenomenon causes light to bend when moving between media of different optical densities?',
    option_a: 'Diffraction',
    option_b: 'Refraction',
    option_c: 'Dispersion',
    option_d: 'Polarization',
    correct_answer: 'B',
    explanation: 'Refraction is the change in direction and phase velocity of a wave due to a change in transmission medium.'
  },
  {
    id: 18,
    category: 'Science',
    difficulty: 'Hard',
    question: 'Which subatomic particle carries a negative electrical charge?',
    option_a: 'Proton',
    option_b: 'Neutron',
    option_c: 'Electron',
    option_d: 'Positron',
    correct_answer: 'C',
    explanation: 'Electrons are elementary particles with a negative electric charge of approximately -1.602 × 10^-19 coulombs.'
  },
  {
    id: 19,
    category: 'Science',
    difficulty: 'Hard',
    question: 'What is the main compound responsible for acid rain?',
    option_a: 'Sulfur dioxide and Nitrogen oxides',
    option_b: 'Carbon monoxide and Methane',
    option_c: 'Ozone and Chlorofluorocarbons',
    option_d: 'Hydrogen peroxide and Ammonia',
    correct_answer: 'A',
    explanation: 'Emissions of sulfur dioxide (SO2) and nitrogen oxides (NOx) react with water molecules in the atmosphere to produce sulfuric and nitric acids.'
  },
  {
    id: 20,
    category: 'Science',
    difficulty: 'Easy',
    question: 'What is the boiling point of pure water at standard atmospheric pressure?',
    option_a: '90°C',
    option_b: '100°C',
    option_c: '110°C',
    option_d: '120°C',
    correct_answer: 'B',
    explanation: 'At 1 atm (101.325 kPa), the boiling point of pure water is calibrated as 100 degrees Celsius (212 degrees Fahrenheit).'
  },

  // ==========================================
  // 3. MATHEMATICS (10 Questions)
  // ==========================================
  {
    id: 21,
    category: 'Mathematics',
    difficulty: 'Easy',
    question: 'What is the square root of 144?',
    option_a: '10',
    option_b: '11',
    option_c: '12',
    option_d: '14',
    correct_answer: 'C',
    explanation: '12 × 12 = 144, hence the principal square root of 144 is 12.'
  },
  {
    id: 22,
    category: 'Mathematics',
    difficulty: 'Easy',
    question: 'What is the value of 15% of 200?',
    option_a: '20',
    option_b: '25',
    option_c: '30',
    option_d: '35',
    correct_answer: 'C',
    explanation: '15% of 200 = (15 / 100) × 200 = 15 × 2 = 30.'
  },
  {
    id: 23,
    category: 'Mathematics',
    difficulty: 'Easy',
    question: 'How many degrees are in the interior angles of a triangle?',
    option_a: '90°',
    option_b: '180°',
    option_c: '270°',
    option_d: '360°',
    correct_answer: 'B',
    explanation: 'In Euclidean geometry, the sum of all three interior angles in any triangle is always 180 degrees.'
  },
  {
    id: 24,
    category: 'Mathematics',
    difficulty: 'Medium',
    question: 'If 3x + 5 = 20, what is the value of x?',
    option_a: '3',
    option_b: '5',
    option_c: '7',
    option_d: '9',
    correct_answer: 'B',
    explanation: 'Subtracting 5 gives 3x = 15. Dividing both sides by 3 yields x = 5.'
  },
  {
    id: 25,
    category: 'Mathematics',
    difficulty: 'Medium',
    question: 'What is the median of the following set: {3, 7, 9, 12, 18}?',
    option_a: '7',
    option_b: '9',
    option_c: '10',
    option_d: '12',
    correct_answer: 'B',
    explanation: 'The data is already sorted: 3, 7, 9, 12, 18. The middle (3rd) value is 9.'
  },
  {
    id: 26,
    category: 'Mathematics',
    difficulty: 'Medium',
    question: 'What is the derivative of f(x) = x^3 with respect to x?',
    option_a: '3x',
    option_b: '3x^2',
    option_c: 'x^2',
    option_d: '2x^3',
    correct_answer: 'B',
    explanation: 'Using the power rule of differentiation: d/dx(x^n) = n * x^(n-1). For x^3, the derivative is 3x^2.'
  },
  {
    id: 27,
    category: 'Mathematics',
    difficulty: 'Hard',
    question: 'What is the sum of the first 20 natural numbers?',
    option_a: '190',
    option_b: '200',
    option_c: '210',
    option_d: '220',
    correct_answer: 'C',
    explanation: 'Formula S = n(n + 1) / 2. For n = 20: S = 20 × 21 / 2 = 10 × 21 = 210.'
  },
  {
    id: 28,
    category: 'Mathematics',
    difficulty: 'Hard',
    question: 'What is the probability of rolling a sum of 7 with two fair 6-sided dice?',
    option_a: '1/12',
    option_b: '1/6',
    option_c: '5/36',
    option_d: '7/36',
    correct_answer: 'B',
    explanation: 'There are 6 winning combinations: (1,6), (2,5), (3,4), (4,3), (5,2), (6,1) out of 36 total outcomes. 6/36 = 1/6.'
  },
  {
    id: 29,
    category: 'Mathematics',
    difficulty: 'Hard',
    question: 'What is the determinant of matrix [[2, 3], [1, 4]]?',
    option_a: '5',
    option_b: '8',
    option_c: '11',
    option_d: '6',
    correct_answer: 'A',
    explanation: 'For matrix [[a, b], [c, d]], det = ad - bc = (2 × 4) - (3 × 1) = 8 - 3 = 5.'
  },
  {
    id: 30,
    category: 'Mathematics',
    difficulty: 'Easy',
    question: 'What is the value of 2 raised to the power 5 (2^5)?',
    option_a: '16',
    option_b: '32',
    option_c: '64',
    option_d: '25',
    correct_answer: 'B',
    explanation: '2^5 = 2 × 2 × 2 × 2 × 2 = 32.'
  },

  // ==========================================
  // 4. COMPUTER SCIENCE (10 Questions)
  // ==========================================
  {
    id: 31,
    category: 'Computer Science',
    difficulty: 'Easy',
    question: 'What does CPU stand for in computer systems?',
    option_a: 'Central Processing Unit',
    option_b: 'Central Power Unit',
    option_c: 'Computer Program Utility',
    option_d: 'Central Performance Union',
    correct_answer: 'A',
    explanation: 'CPU stands for Central Processing Unit, the primary component that executes computer program instructions.'
  },
  {
    id: 32,
    category: 'Computer Science',
    difficulty: 'Easy',
    question: 'Which of the following is volatile primary memory?',
    option_a: 'ROM',
    option_b: 'Hard Disk',
    option_c: 'RAM',
    option_d: 'SSD',
    correct_answer: 'C',
    explanation: 'RAM (Random Access Memory) is volatile; its stored data is immediately lost when power is disconnected.'
  },
  {
    id: 33,
    category: 'Computer Science',
    difficulty: 'Easy',
    question: 'How many bits make up one byte?',
    option_a: '4',
    option_b: '8',
    option_c: '16',
    option_d: '32',
    correct_answer: 'B',
    explanation: 'A byte is a unit of digital information that most commonly consists of eight bits.'
  },
  {
    id: 34,
    category: 'Computer Science',
    difficulty: 'Medium',
    question: 'What data structure operates on a Last-In, First-Out (LIFO) basis?',
    option_a: 'Queue',
    option_b: 'Array',
    option_c: 'Stack',
    option_d: 'Tree',
    correct_answer: 'C',
    explanation: 'A Stack stores items in LIFO order; the last element pushed is the first element popped.'
  },
  {
    id: 35,
    category: 'Computer Science',
    difficulty: 'Medium',
    question: 'What is the average time complexity of searching in a balanced Binary Search Tree?',
    option_a: 'O(1)',
    option_b: 'O(n)',
    option_c: 'O(log n)',
    option_d: 'O(n log n)',
    correct_answer: 'C',
    explanation: 'A balanced BST eliminates half the search space at each level, achieving O(log n) average lookup time.'
  },
  {
    id: 36,
    category: 'Computer Science',
    difficulty: 'Medium',
    question: 'Which OSI model layer is responsible for end-to-end reliability and port addressing?',
    option_a: 'Network Layer',
    option_b: 'Transport Layer',
    option_c: 'Data Link Layer',
    option_d: 'Session Layer',
    correct_answer: 'B',
    explanation: 'The Transport Layer (Layer 4, including TCP and UDP) manages end-to-end communication, flow control, and port numbers.'
  },
  {
    id: 37,
    category: 'Computer Science',
    difficulty: 'Hard',
    question: 'What condition is NOT one of the Coffman conditions required for a Deadlock in an OS?',
    option_a: 'Mutual Exclusion',
    option_b: 'Hold and Wait',
    option_c: 'Preemption Allowed',
    option_d: 'Circular Wait',
    correct_answer: 'C',
    explanation: 'The four Coffman conditions are Mutual Exclusion, Hold and Wait, No Preemption, and Circular Wait. "Preemption Allowed" prevents deadlocks.'
  },
  {
    id: 38,
    category: 'Computer Science',
    difficulty: 'Hard',
    question: 'What database normalization form ensures that every non-prime attribute is non-transitively dependent on the primary key?',
    option_a: '1NF',
    option_b: '2NF',
    option_c: '3NF',
    option_d: 'BCNF',
    correct_answer: 'C',
    explanation: 'Third Normal Form (3NF) requires 2NF and mandates that no non-prime attribute has a transitive dependency on candidate keys.'
  },
  {
    id: 39,
    category: 'Computer Science',
    difficulty: 'Hard',
    question: 'Which scheduling algorithm is provably optimal for minimizing average waiting time in batch systems?',
    option_a: 'First-Come First-Served (FCFS)',
    option_b: 'Shortest Job First (SJF)',
    option_c: 'Round Robin (RR)',
    option_d: 'Priority Scheduling',
    correct_answer: 'B',
    explanation: 'Shortest Job First (SJF) is mathematically optimal because moving a short job before a long one decreases waiting time more than it increases others.'
  },
  {
    id: 40,
    category: 'Computer Science',
    difficulty: 'Easy',
    question: 'What protocol is used to secure browsing communications over the World Wide Web?',
    option_a: 'HTTP',
    option_b: 'HTTPS',
    option_c: 'FTP',
    option_d: 'SMTP',
    correct_answer: 'B',
    explanation: 'HTTPS (Hypertext Transfer Protocol Secure) encrypts communication using Transport Layer Security (TLS).'
  },

  // ==========================================
  // 5. PROGRAMMING (10 Questions)
  // ==========================================
  {
    id: 41,
    category: 'Programming',
    difficulty: 'Easy',
    question: 'Which programming language is primarily used for building Flutter apps?',
    option_a: 'Kotlin',
    option_b: 'Swift',
    option_c: 'Dart',
    option_d: 'Java',
    correct_answer: 'C',
    explanation: 'Dart is a client-optimized language created by Google that powers Flutter cross-platform applications.'
  },
  {
    id: 42,
    category: 'Programming',
    difficulty: 'Easy',
    question: 'What symbol is used for single-line comments in Dart and JavaScript?',
    option_a: '#',
    option_b: '<!--',
    option_c: '//',
    option_d: ';;',
    correct_answer: 'C',
    explanation: 'In C-family languages including Dart, JavaScript, C++, and Java, double forward slashes (//) denote single-line comments.'
  },
  {
    id: 43,
    category: 'Programming',
    difficulty: 'Easy',
    question: 'Which keyword in Dart declares a compile-time immutable constant?',
    option_a: 'var',
    option_b: 'final',
    option_c: 'const',
    option_d: 'static',
    correct_answer: 'C',
    explanation: 'In Dart, "const" creates a compile-time constant, whereas "final" can only be set once at runtime.'
  },
  {
    id: 44,
    category: 'Programming',
    difficulty: 'Medium',
    question: 'In Flutter, what is the primary difference between StatelessWidget and StatefulWidget?',
    option_a: 'StatelessWidget cannot have child widgets',
    option_b: 'StatefulWidget maintains mutable internal state across rebuilds',
    option_c: 'StatelessWidget runs only on iOS devices',
    option_d: 'StatefulWidget cannot accept constructor parameters',
    correct_answer: 'B',
    explanation: 'StatefulWidget creates a State object that persists mutable state across rebuild cycles, while StatelessWidget is immutable once instantiated.'
  },
  {
    id: 45,
    category: 'Programming',
    difficulty: 'Medium',
    question: 'What method must be called to notify the Flutter framework that a widget internal state has changed?',
    option_a: 'notifyListeners()',
    option_b: 'setState()',
    option_c: 'updateState()',
    option_d: 'build()',
    correct_answer: 'B',
    explanation: 'Calling setState() schedules the State object build method to rerun with updated data.'
  },
  {
    id: 46,
    category: 'Programming',
    difficulty: 'Medium',
    question: 'What does the "?." operator represent in Dart?',
    option_a: 'Ternary condition',
    option_b: 'Null-aware member access',
    option_c: 'Bitwise exclusive OR',
    option_d: 'Type casting operator',
    correct_answer: 'B',
    explanation: 'The null-aware member access operator (?.) accesses a property or method only if the target object is not null, preventing null pointer crashes.'
  },
  {
    id: 47,
    category: 'Programming',
    difficulty: 'Hard',
    question: 'Which package is commonly used in Flutter for local relational SQLite database operations?',
    option_a: 'shared_preferences',
    option_b: 'sqflite',
    option_c: 'http',
    option_d: 'provider',
    correct_answer: 'B',
    explanation: 'sqflite is the premier SQLite plugin for Flutter, supporting transactions, batching, schema migrations, and raw SQL queries.'
  },
  {
    id: 48,
    category: 'Programming',
    difficulty: 'Hard',
    question: 'In Dart asynchronous programming, what does a Future represent?',
    option_a: 'A continuous stream of asynchronous events',
    option_b: 'A computation that delivers a single value or error at a future time',
    option_c: 'A background OS daemon thread',
    option_d: 'A persistent key-value storage engine',
    correct_answer: 'B',
    explanation: 'A Future represents a computation that does not complete immediately. It yields either a completed value of type T or an error.'
  },
  {
    id: 49,
    category: 'Programming',
    difficulty: 'Hard',
    question: 'What is the role of BuildContext in Flutter?',
    option_a: 'It compiles Dart source code into native machine code',
    option_b: 'It identifies the location of a widget in the element tree',
    option_c: 'It acts as the SQLite database schema manager',
    option_d: 'It renders GPU shaders on screen',
    correct_answer: 'B',
    explanation: 'BuildContext is a handle to the location of a widget in the widget tree, allowing lookup of themes, media queries, and inherited widgets.'
  },
  {
    id: 50,
    category: 'Programming',
    difficulty: 'Easy',
    question: 'What is the output of print(5 == "5") in a strictly typed language like Dart?',
    option_a: 'true',
    option_b: 'false (or compile error)',
    option_c: 'undefined',
    option_d: 'NaN',
    correct_answer: 'B',
    explanation: 'Dart is strongly and soundly typed; an int cannot equal a String, evaluating to false or raising a type error.'
  },

  // ==========================================
  // 6. ENGLISH (10 Questions)
  // ==========================================
  {
    id: 51,
    category: 'English',
    difficulty: 'Easy',
    question: 'What is the antonym of the word "Generous"?',
    option_a: 'Kind',
    option_b: 'Selfish',
    option_c: 'Gentle',
    option_d: 'Brave',
    correct_answer: 'B',
    explanation: 'Generous means willing to give and share freely; its direct opposite is selfish or stingy.'
  },
  {
    id: 52,
    category: 'English',
    difficulty: 'Easy',
    question: 'Identify the noun in the sentence: "The quick cat ran across the garden."',
    option_a: 'quick',
    option_b: 'ran',
    option_c: 'garden',
    option_d: 'across',
    correct_answer: 'C',
    explanation: '"Garden" is a noun (naming a place). "Cat" is also a noun; "quick" is an adjective, and "ran" is a verb.'
  },
  {
    id: 53,
    category: 'English',
    difficulty: 'Easy',
    question: 'Choose the correctly spelled word:',
    option_a: 'Accomodation',
    option_b: 'Accommodation',
    option_c: 'Acommodation',
    option_d: 'Acomodation',
    correct_answer: 'B',
    explanation: 'Accommodation is spelled with double "c" and double "m".'
  },
  {
    id: 54,
    category: 'English',
    difficulty: 'Medium',
    question: 'What figure of speech compares two things using "like" or "as"?',
    option_a: 'Metaphor',
    option_b: 'Simile',
    option_c: 'Personification',
    option_d: 'Hyperbole',
    correct_answer: 'B',
    explanation: 'A simile directly compares two entities using connecting words such as "like" or "as" (e.g., "brave as a lion").'
  },
  {
    id: 55,
    category: 'English',
    difficulty: 'Medium',
    question: 'Choose the appropriate preposition: "She has been living in London ___ 2018."',
    option_a: 'for',
    option_b: 'since',
    option_c: 'from',
    option_d: 'during',
    correct_answer: 'B',
    explanation: '"Since" is used when referring to a specific starting point in time in the past continuing to the present.'
  },
  {
    id: 56,
    category: 'English',
    difficulty: 'Medium',
    question: 'What does the idiom "Bite the bullet" mean?',
    option_a: 'To eat something very hard',
    option_b: 'To face a painful situation with courage',
    option_c: 'To start a quarrel',
    option_d: 'To give up completely',
    correct_answer: 'B',
    explanation: '"Bite the bullet" means accepting an unavoidable, unpleasant, or difficult task with courage.'
  },
  {
    id: 57,
    category: 'English',
    difficulty: 'Hard',
    question: 'What is the meaning of the word "Ephemeral"?',
    option_a: 'Long-lasting and durable',
    option_b: 'Lasting for a very short time',
    option_c: 'Vast and incomprehensible',
    option_d: 'Mysterious and dark',
    correct_answer: 'B',
    explanation: 'Ephemeral originates from the Greek word ephemeros, meaning lasting only for a day or a transient moment.'
  },
  {
    id: 58,
    category: 'English',
    difficulty: 'Hard',
    question: 'Which of the following sentences exhibits subjunctive mood?',
    option_a: 'If I was you, I would study.',
    option_b: 'If I were you, I would study.',
    option_c: 'I will study if you do.',
    option_d: 'I am studying now.',
    correct_answer: 'B',
    explanation: 'The past subjunctive "were" is used in hypothetical or contrary-to-fact conditional clauses ("If I were you").'
  },
  {
    id: 59,
    category: 'English',
    difficulty: 'Hard',
    question: 'Identify the synonym of "Sycophant":',
    option_a: 'Rebel',
    option_b: 'Flatterer',
    option_c: 'Critic',
    option_d: 'Scholar',
    correct_answer: 'B',
    explanation: 'A sycophant is a person who acts obsequiously toward someone important in order to gain advantage (a servile flatterer).'
  },
  {
    id: 60,
    category: 'English',
    difficulty: 'Easy',
    question: 'What is the plural form of "Analysis"?',
    option_a: 'Analysises',
    option_b: 'Analyses',
    option_c: 'Analysi',
    option_d: 'Analyzes',
    correct_answer: 'B',
    explanation: 'Like many words borrowed from Greek ending in -is (crisis, thesis), the plural of analysis is analyses.'
  },

  // ==========================================
  // 7. LOGICAL REASONING (10 Questions)
  // ==========================================
  {
    id: 61,
    category: 'Logical Reasoning',
    difficulty: 'Easy',
    question: 'Find the missing number in the sequence: 2, 4, 8, 16, ?',
    option_a: '24',
    option_b: '30',
    option_c: '32',
    option_d: '36',
    correct_answer: 'C',
    explanation: 'Each term is multiplied by 2 (geometric progression with ratio 2): 16 × 2 = 32.'
  },
  {
    id: 62,
    category: 'Logical Reasoning',
    difficulty: 'Easy',
    question: 'Look at the series: 36, 34, 30, 28, 24, ... What number comes next?',
    option_a: '20',
    option_b: '22',
    option_c: '23',
    option_d: '26',
    correct_answer: 'B',
    explanation: 'The alternating subtraction pattern is -2, -4, -2, -4... Following 24 (-2) gives 22.'
  },
  {
    id: 63,
    category: 'Logical Reasoning',
    difficulty: 'Easy',
    question: 'Cup is to Coffee as Bowl is to:',
    option_a: 'Dish',
    option_b: 'Soup',
    option_c: 'Spoon',
    option_d: 'Food',
    correct_answer: 'B',
    explanation: 'A cup is a container used to serve coffee; a bowl is a container used to serve soup.'
  },
  {
    id: 64,
    category: 'Logical Reasoning',
    difficulty: 'Medium',
    question: 'Pointing to a photograph, a man said, "I have no brother or sister, but that man father is my father son." Who is in the photo?',
    option_a: 'His father',
    option_b: 'His son',
    option_c: 'His nephew',
    option_d: 'Himself',
    correct_answer: 'B',
    explanation: 'Since the man has no siblings, "my father son" must be himself. Therefore, "that man father is myself", which means the photograph is of his son.'
  },
  {
    id: 65,
    category: 'Logical Reasoning',
    difficulty: 'Medium',
    question: 'If CAT is coded as 3120 in a numerical cipher, how is DOG coded?',
    option_a: '4157',
    option_b: '4167',
    option_c: '3157',
    option_d: '4158',
    correct_answer: 'A',
    explanation: 'The code reflects alphabetical position: C=3, A=1, T=20 -> 3120. Similarly, D=4, O=15, G=7 -> 4157.'
  },
  {
    id: 66,
    category: 'Logical Reasoning',
    difficulty: 'Medium',
    question: 'Which word does NOT belong with the others?',
    option_a: 'Tulip',
    option_b: 'Rose',
    option_c: 'Bud',
    option_d: 'Daisy',
    correct_answer: 'C',
    explanation: 'Tulip, Rose, and Daisy are specific kinds of flowers; a bud is an undeveloped shoot or stage of a flower.'
  },
  {
    id: 67,
    category: 'Logical Reasoning',
    difficulty: 'Hard',
    question: 'Statement: All mangoes are golden. Some golden things are expensive.\nConclusion I: Some mangoes are expensive.\nConclusion II: No mango is expensive.',
    option_a: 'Only conclusion I follows',
    option_b: 'Only conclusion II follows',
    option_c: 'Either conclusion I or II follows',
    option_d: 'Neither follows',
    correct_answer: 'C',
    explanation: 'Because "Some" and "No" form a complementary pair for the same subject and predicate with indeterminate relation, either I or II must hold true.'
  },
  {
    id: 68,
    category: 'Logical Reasoning',
    difficulty: 'Hard',
    question: 'A clock shows 3:15. What is the acute angle between the hour hand and the minute hand?',
    option_a: '0°',
    option_b: '7.5°',
    option_c: '15°',
    option_d: '22.5°',
    correct_answer: 'B',
    explanation: 'At 3:15, the minute hand is at 90°. The hour hand moves 0.5° per minute, so at 15 minutes it is at (3 × 30°) + (15 × 0.5°) = 97.5°. Angle = 97.5° - 90° = 7.5°.'
  },
  {
    id: 69,
    category: 'Logical Reasoning',
    difficulty: 'Hard',
    question: 'Six friends A, B, C, D, E, and F sit around a circular table facing center. A is opposite D. B is right of A and opposite E. Where does C sit?',
    option_a: 'Between A and E',
    option_b: 'Between D and E',
    option_c: 'Opposite F',
    option_d: 'Between B and D',
    correct_answer: 'C',
    explanation: 'With A and D opposite, and B and E opposite, the remaining pair C and F must sit opposite each other across the circle.'
  },
  {
    id: 70,
    category: 'Logical Reasoning',
    difficulty: 'Easy',
    question: 'Which number replaces the question mark: 5, 10, 15, 20, ?',
    option_a: '22',
    option_b: '25',
    option_c: '30',
    option_d: '35',
    correct_answer: 'B',
    explanation: 'The sequence increases by 5 at each step (arithmetic progression): 20 + 5 = 25.'
  },

  // ==========================================
  // 8. CURRENT AFFAIRS (10 Questions)
  // ==========================================
  {
    id: 71,
    category: 'Current Affairs',
    difficulty: 'Easy',
    question: 'Which organization awards the prestigious Nobel Peace Prize?',
    option_a: 'The United Nations',
    option_b: 'The Norwegian Nobel Committee',
    option_c: 'The International Court of Justice',
    option_d: 'The Swedish Academy',
    correct_answer: 'B',
    explanation: 'Unlike the other Nobel Prizes awarded in Stockholm, Sweden, the Nobel Peace Prize is awarded by the Norwegian Nobel Committee in Oslo.'
  },
  {
    id: 72,
    category: 'Current Affairs',
    difficulty: 'Easy',
    question: 'Which space agency successfully landed the Chandrayaan-3 mission near the Moon south pole?',
    option_a: 'NASA',
    option_b: 'ESA',
    option_c: 'ISRO',
    option_d: 'JAXA',
    correct_answer: 'C',
    explanation: 'India ISRO (Indian Space Research Organisation) achieved historic soft landing near the lunar south pole in August 2023.'
  },
  {
    id: 73,
    category: 'Current Affairs',
    difficulty: 'Easy',
    question: 'Which international sports tournament is held every four years by FIFA?',
    option_a: 'Cricket World Cup',
    option_b: 'FIFA World Cup',
    option_c: 'Olympic Games',
    option_d: 'Super Bowl',
    correct_answer: 'B',
    explanation: 'The FIFA World Cup is the quadrennial men association football world championship organized by FIFA.'
  },
  {
    id: 74,
    category: 'Current Affairs',
    difficulty: 'Medium',
    question: 'Which intergovernmental forum recently inducted the African Union as a permanent member?',
    option_a: 'G7',
    option_b: 'G20',
    option_c: 'BRICS',
    option_d: 'NATO',
    correct_answer: 'B',
    explanation: 'The African Union was granted permanent membership in the G20 forum during the New Delhi Summit.'
  },
  {
    id: 75,
    category: 'Current Affairs',
    difficulty: 'Medium',
    question: 'What is COP (e.g., COP28, COP29) an abbreviation for in UN environmental conferences?',
    option_a: 'Council of Planetary Protection',
    option_b: 'Conference of the Parties',
    option_c: 'Committee on Pollution Control',
    option_d: 'Commission of Paris Accord',
    correct_answer: 'B',
    explanation: 'COP stands for Conference of the Parties, the supreme decision-making body of the UN Framework Convention on Climate Change (UNFCCC).'
  },
  {
    id: 76,
    category: 'Current Affairs',
    difficulty: 'Medium',
    question: 'Which country hosted the 2024 Summer Olympic Games?',
    option_a: 'Tokyo, Japan',
    option_b: 'Paris, France',
    option_c: 'Los Angeles, USA',
    option_d: 'Brisbane, Australia',
    correct_answer: 'B',
    explanation: 'The Games of the XXXIII Olympiad were held in Paris, France during July and August 2024.'
  },
  {
    id: 77,
    category: 'Current Affairs',
    difficulty: 'Hard',
    question: 'What is the primary objective of the James Webb Space Telescope (JWST)?',
    option_a: 'Monitoring Earth climate and ocean currents',
    option_b: 'Observing the earliest galaxies and star formation in infrared',
    option_c: 'Mining water ice from Mars polar caps',
    option_d: 'Serving as a GPS navigation beacon for deep space probes',
    correct_answer: 'B',
    explanation: 'JWST is an infrared space observatory optimized to detect the light from the first stars and galaxies that formed after the Big Bang.'
  },
  {
    id: 78,
    category: 'Current Affairs',
    difficulty: 'Hard',
    question: 'Which international economic grouping expanded in 2024 to include Egypt, Ethiopia, Iran, and the UAE?',
    option_a: 'ASEAN',
    option_b: 'BRICS',
    option_c: 'OECD',
    option_d: 'OPEC+',
    correct_answer: 'B',
    explanation: 'BRICS officially admitted new member nations including Egypt, Ethiopia, Iran, and the United Arab Emirates as of January 2024.'
  },
  {
    id: 79,
    category: 'Current Affairs',
    difficulty: 'Hard',
    question: 'What is the name of the international agreement adopted in 1987 to phase out ozone-depleting substances?',
    option_a: 'Kyoto Protocol',
    option_b: 'Paris Agreement',
    option_c: 'Montreal Protocol',
    option_d: 'Geneva Convention',
    correct_answer: 'C',
    explanation: 'The Montreal Protocol on Substances that Deplete the Ozone Layer is an international treaty designed to protect the ozone layer.'
  },
  {
    id: 80,
    category: 'Current Affairs',
    difficulty: 'Easy',
    question: 'What does "AI" commonly stand for in modern technology discussions?',
    option_a: 'Automated Internet',
    option_b: 'Artificial Intelligence',
    option_c: 'Advanced Integration',
    option_d: 'Algorithmic Interface',
    correct_answer: 'B',
    explanation: 'Artificial Intelligence (AI) refers to the simulation of human intelligence processes by machines and computer systems.'
  }
];

export const CATEGORIES_META = [
  {
    name: 'General Knowledge',
    description: 'World history, geography, monuments, and global facts',
    iconName: 'Globe',
    color: 'from-amber-500 to-orange-500',
    accentBg: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
    questionCount: 10
  },
  {
    name: 'Science',
    description: 'Physics, chemistry, biology, astronomy, and nature',
    iconName: 'Atom',
    color: 'from-emerald-500 to-teal-500',
    accentBg: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
    questionCount: 10
  },
  {
    name: 'Mathematics',
    description: 'Algebra, arithmetic, geometry, calculus, and statistics',
    iconName: 'Calculator',
    color: 'from-blue-500 to-cyan-500',
    accentBg: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
    questionCount: 10
  },
  {
    name: 'Computer Science',
    description: 'Data structures, algorithms, operating systems, and networks',
    iconName: 'Cpu',
    color: 'from-indigo-500 to-purple-500',
    accentBg: 'bg-indigo-500/10 text-indigo-500 border-indigo-500/20',
    questionCount: 10
  },
  {
    name: 'Programming',
    description: 'Dart, Flutter widgets, OOP, mobile architecture, and async code',
    iconName: 'Code',
    color: 'from-violet-500 to-fuchsia-500',
    accentBg: 'bg-violet-500/10 text-violet-500 border-violet-500/20',
    questionCount: 10
  },
  {
    name: 'English',
    description: 'Grammar, vocabulary, idioms, antonyms, and comprehension',
    iconName: 'BookOpen',
    color: 'from-rose-500 to-pink-500',
    accentBg: 'bg-rose-500/10 text-rose-500 border-rose-500/20',
    questionCount: 10
  },
  {
    name: 'Logical Reasoning',
    description: 'Puzzles, number series, analogies, syllogisms, and deduction',
    iconName: 'BrainCircuit',
    color: 'from-purple-500 to-blue-500',
    accentBg: 'bg-purple-500/10 text-purple-500 border-purple-500/20',
    questionCount: 10
  },
  {
    name: 'Current Affairs',
    description: 'Global summits, space exploration, awards, and contemporary news',
    iconName: 'Newspaper',
    color: 'from-sky-500 to-indigo-500',
    accentBg: 'bg-sky-500/10 text-sky-500 border-sky-500/20',
    questionCount: 10
  }
] as const;
