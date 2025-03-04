// Updated question data with 10 questions per category
const questions = [
  {
    category: "programming",
    questions: [
      {
        question: "What symbol is used to comment a single line in JavaScript?",
        options: ["/* */", "//", "#", "$"],
        correctAnswer: 1,
      },
      {
        question: "Which of the following is NOT a JavaScript data type?",
        options: ["String", "Boolean", "Integer", "Object"],
        correctAnswer: 2,
      },
      {
        question: "Which CSS property is used to change the text color?",
        options: ["text-color", "font-color", "color", "text-style"],
        correctAnswer: 2,
      },
      {
        question: "In programming, what does the acronym 'DOM' stand for?",
        options: [
          "Document Object Model",
          "Data Object Management",
          "Digital Ordinance Method",
          "Display Order Mechanism",
        ],
        correctAnswer: 0,
      },
      {
        question: "Which of these is NOT a JavaScript framework/library?",
        options: ["React", "Vue", "Django", "Angular"],
        correctAnswer: 2,
      },
      {
        question:
          "Which operator is used for strict equality comparison in JavaScript?",
        options: ["==", "===", "=", "!="],
        correctAnswer: 1,
      },
      {
        question: "What does the 'json' acronym stand for?",
        options: [
          "JavaScript Object Notation",
          "Java Standard Object Naming",
          "JavaScript Oriented Network",
          "Java Object Navigation",
        ],
        correctAnswer: 0,
      },
      {
        question: "Which of these is used to declare a variable in JavaScript?",
        options: ["var", "int", "string", "declare"],
        correctAnswer: 0,
      },
      {
        question:
          "What method is used to add an element at the end of an array in JavaScript?",
        options: ["push()", "append()", "add()", "insert()"],
        correctAnswer: 0,
      },
      {
        question:
          "Which programming paradigm is JavaScript primarily based on?",
        options: [
          "Object-Oriented Programming",
          "Functional Programming",
          "Procedural Programming",
          "Logic Programming",
        ],
        correctAnswer: 0,
      },
    ],
  },
  {
    category: "geography",
    questions: [
      {
        question: "Which country is home to the Great Barrier Reef?",
        options: ["New Zealand", "Indonesia", "Australia", "Thailand"],
        correctAnswer: 2,
      },
      {
        question: "What is the capital city of France?",
        options: ["Berlin", "London", "Rome", "Paris"],
        correctAnswer: 3,
      },
      {
        question: "Which of these is the largest ocean on Earth?",
        options: [
          "Pacific Ocean",
          "Atlantic Ocean",
          "Indian Ocean",
          "Arctic Ocean",
        ],
        correctAnswer: 0,
      },
      {
        question: "The Amazon River is located on which continent?",
        options: ["Africa", "Asia", "South America", "North America"],
        correctAnswer: 2,
      },
      {
        question:
          "Which mountain range runs along the border between Spain and France?",
        options: ["The Alps", "The Andes", "The Pyrenees", "The Himalayas"],
        correctAnswer: 2,
      },
      {
        question: "Which is the smallest continent by land area?",
        options: ["Europe", "Australia", "Antarctica", "South America"],
        correctAnswer: 1,
      },
      {
        question: "The Nile River flows through which country?",
        options: ["Kenya", "Nigeria", "Egypt", "Morocco"],
        correctAnswer: 2,
      },
      {
        question: "What is the capital city of Japan?",
        options: ["Seoul", "Beijing", "Tokyo", "Bangkok"],
        correctAnswer: 2,
      },
      {
        question: "Which desert is the largest in the world?",
        options: [
          "Gobi Desert",
          "Kalahari Desert",
          "Arabian Desert",
          "Sahara Desert",
        ],
        correctAnswer: 3,
      },
      {
        question: "Which of these countries is NOT in Europe?",
        options: ["Portugal", "Turkey", "Mongolia", "Croatia"],
        correctAnswer: 2,
      },
    ],
  },
];

// DOM Elements
const configContainer = document.querySelector(".config-container");
const quizContainer = document.querySelector(".quiz-container");
const resultContainer = document.querySelector(".result-container");
const categoryButtons = document.querySelectorAll(".category-option-button");
const questionButtons = document.querySelectorAll(".question-option-button");
const startQuizButton = document.querySelector(".start-quiz-button");
const nextQuestionButton = document.querySelector(".next-question-button");
const tryAgainButton = document.querySelector(".try-again-button");
const quizQuestion = document.querySelector(".quiz-question");
const answerOptions = document.querySelector(".answer-options");
const questionStatus = document.querySelector(".question-status");
const timeDisplay = document.querySelector(".time-duration");
const resultMessage = document.querySelector(".result-message");

// Quiz variables
let selectedCategory = "";
let numberOfQuestions = 0;
let currentQuestionIndex = 0;
let quizQuestions = [];
let score = 0;
let timer;
let timeLeft = 15;

// Initially hide quiz and result containers
quizContainer.style.display = "none";
resultContainer.style.display = "none";

// Setup category selection
categoryButtons.forEach((button) => {
  button.addEventListener("click", () => {
    // Remove selected class from all buttons in the same group
    categoryButtons.forEach((btn) => btn.classList.remove("selected"));
    // Add selected class to the clicked button
    button.classList.add("selected");
    selectedCategory = button.textContent.toLowerCase();
  });
});

// Setup question number selection
questionButtons.forEach((button) => {
  button.addEventListener("click", () => {
    // Remove selected class from all buttons in the same group
    questionButtons.forEach((btn) => btn.classList.remove("selected"));
    // Add selected class to the clicked button
    button.classList.add("selected");
    numberOfQuestions = parseInt(button.textContent);
  });
});

// Start Quiz button event
startQuizButton.addEventListener("click", () => {
  if (!selectedCategory) {
    alert("Please select a category");
    return;
  }

  if (!numberOfQuestions) {
    alert("Please select number of questions");
    return;
  }

  // Get questions for selected category
  const categoryData = questions.find(
    (cat) => cat.category.toLowerCase() === selectedCategory
  );

  if (!categoryData) {
    alert("Category not found!");
    return;
  }

  // Shuffle and select the specified number of questions
  quizQuestions = shuffleArray([...categoryData.questions]).slice(
    0,
    numberOfQuestions
  );

  if (quizQuestions.length === 0) {
    alert("No questions found for this category!");
    return;
  }

  // Reset quiz state
  currentQuestionIndex = 0;
  score = 0;

  // Hide config screen and show quiz
  configContainer.style.display = "none";
  quizContainer.style.display = "block";
  resultContainer.style.display = "none";

  // Display first question
  displayQuestion();
});

// Next Question button event
nextQuestionButton.addEventListener("click", () => {
  clearInterval(timer);

  // Move to next question or finish quiz
  currentQuestionIndex++;

  if (currentQuestionIndex < quizQuestions.length) {
    displayQuestion();
  } else {
    showResult();
  }
});

// Try Again button event
tryAgainButton.addEventListener("click", () => {
  // Reset to configuration screen
  resultContainer.style.display = "none";
  configContainer.style.display = "block";

  // Clear selections
  categoryButtons.forEach((btn) => btn.classList.remove("selected"));
  questionButtons.forEach((btn) => btn.classList.remove("selected"));
  selectedCategory = "";
  numberOfQuestions = 0;
});

// Function to display the current question
function displayQuestion() {
  const question = quizQuestions[currentQuestionIndex];
  quizQuestion.textContent = question.question;

  // Update question status
  questionStatus.innerHTML = `<b>${currentQuestionIndex + 1}</b> of <b>${
    quizQuestions.length
  }</b> Questions`;

  // Reset answer options
  answerOptions.innerHTML = "";

  // Disable next button until answer is selected
  nextQuestionButton.disabled = true;
  nextQuestionButton.style.opacity = "0.7";
  nextQuestionButton.style.cursor = "not-allowed";

  // Create answer options
  question.options.forEach((option, index) => {
    const li = document.createElement("li");
    li.className = "answer-option";
    li.innerHTML = `<p>${option}</p>`;

    // Add click event to check answer
    li.addEventListener("click", () => {
      // Clear timer
      clearInterval(timer);

      // Check if answer is already selected
      if (
        answerOptions.querySelector(".correct") ||
        answerOptions.querySelector(".incorrect")
      ) {
        return;
      }

      // Add appropriate class for correct/incorrect
      if (index === question.correctAnswer) {
        li.classList.add("correct");
        li.innerHTML +=
          '<span class="material-symbols-rounded">check_circle</span>';
        score++;
      } else {
        li.classList.add("incorrect");
        li.innerHTML += '<span class="material-symbols-rounded">cancel</span>';

        // Show correct answer
        answerOptions.children[question.correctAnswer].classList.add("correct");
        answerOptions.children[question.correctAnswer].innerHTML +=
          '<span class="material-symbols-rounded">check_circle</span>';
      }

      // Enable next button
      nextQuestionButton.disabled = false;
      nextQuestionButton.style.opacity = "1";
      nextQuestionButton.style.cursor = "pointer";

      // Disable clicking on other options
      document.querySelectorAll(".answer-option").forEach((option) => {
        option.style.pointerEvents = "none";
      });
    });

    answerOptions.appendChild(li);
  });

  // Reset and start timer
  timeLeft = 15;
  timeDisplay.textContent = timeLeft + "s";
  startTimer();
}

// Function to show the final result
function showResult() {
  quizContainer.style.display = "none";
  resultContainer.style.display = "block";

  resultMessage.innerHTML = `You answered <b>${score}</b> out of <b>${quizQuestions.length}</b> questions correctly.`;
}

// Timer function
function startTimer() {
  clearInterval(timer);
  timer = setInterval(() => {
    timeLeft--;
    timeDisplay.textContent = timeLeft + "s";

    if (timeLeft <= 0) {
      clearInterval(timer);

      // Auto-select incorrect if time runs out
      const correctIndex = quizQuestions[currentQuestionIndex].correctAnswer;

      // If no answer selected yet
      if (
        !answerOptions.querySelector(".correct") &&
        !answerOptions.querySelector(".incorrect")
      ) {
        // Show correct answer
        answerOptions.children[correctIndex].classList.add("correct");
        answerOptions.children[correctIndex].innerHTML +=
          '<span class="material-symbols-rounded">check_circle</span>';

        // Disable clicking on options
        document.querySelectorAll(".answer-option").forEach((option) => {
          option.style.pointerEvents = "none";
        });

        // Enable next button
        nextQuestionButton.disabled = false;
        nextQuestionButton.style.opacity = "1";
        nextQuestionButton.style.cursor = "pointer";
      }
    }
  }, 1000);
}

// Helper function to shuffle array (Fisher-Yates algorithm)
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
