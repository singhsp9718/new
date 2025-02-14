const questions = {
    "ssc": [
        { question: "Who is the father of Computer?", options: ["Charles Babbage", "Alan Turing", "Bill Gates", "Steve Jobs"], correct: 0 },
        { question: "What is the capital of India?", options: ["Delhi", "Mumbai", "Kolkata", "Chennai"], correct: 0 },
        { question: "Which Mughal ruler built the Taj Mahal?", options: ["Akbar", "Shah Jahan", "Aurangzeb", "Babur"], correct: 1 },
        { question: "When did India gain independence?", options: ["1942", "1945", "1947", "1950"], correct: 2 },
        { question: "Who wrote the Indian National Anthem?", options: ["Tagore", "Bankim Chandra", "Sarojini Naidu", "Gandhi"], correct: 0 }
    ],
    "gk": [
        { question: "Which is the largest planet?", options: ["Earth", "Mars", "Jupiter", "Venus"], correct: 2 },
        { question: "Who wrote 'Hamlet'?", options: ["Shakespeare", "Tolstoy", "Hemingway", "Milton"], correct: 0 },
        { question: "What is the national currency of Japan?", options: ["Dollar", "Euro", "Yen", "Peso"], correct: 2 },
        { question: "Which continent has the most countries?", options: ["Africa", "Asia", "Europe", "South America"], correct: 0 },
        { question: "Which gas do plants use for photosynthesis?", options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"], correct: 1 }
    ],
    "maths": [
        { question: "What is 5 + 3?", options: ["5", "8", "10", "15"], correct: 1 },
        { question: "What is 12 x 2?", options: ["20", "22", "24", "26"], correct: 2 },
        { question: "What is the square root of 81?", options: ["7", "8", "9", "10"], correct: 2 },
        { question: "What is 100 ÷ 4?", options: ["20", "25", "30", "40"], correct: 1 },
        { question: "What is 15% of 200?", options: ["20", "25", "30", "35"], correct: 2 }
    ]
};

let selectedCategory = "";
let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 90;
let timerInterval;
let questionSet = [];

function startQuiz(category) {
    selectedCategory = category;
    document.getElementById("category-selection").style.display = "none";
    document.getElementById("quiz-container").style.display = "block";
    
    questionSet = [...questions[selectedCategory]].sort(() => Math.random() - 0.5).slice(0, 20);
    startTimer();
    loadQuestion();
}

function startTimer() {
    timerInterval = setInterval(() => {
        timeLeft--;
        document.getElementById("time").innerText = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            showResults();
        }
    }, 1000);
}

function loadQuestion() {
    if (currentQuestionIndex >= 20) {
        showResults();
        return;
    }
    
    let q = questionSet[currentQuestionIndex];
    document.getElementById("question").innerText = q.question;
    
    let optionsHTML = "";
    q.options.forEach((option, index) => {
        optionsHTML += `<button onclick="checkAnswer(${index})">${option}</button>`;
    });

    document.getElementById("options").innerHTML = optionsHTML;
    document.getElementById("current-question").innerText = currentQuestionIndex + 1;
}

function checkAnswer(selectedIndex) {
    let correctIndex = questionSet[currentQuestionIndex].correct;
    
    if (selectedIndex === correctIndex) {
        score++;
    }

    currentQuestionIndex++;
    loadQuestion();
}

function showResults() {
    document.getElementById("quiz-container").style.display = "none";
    document.getElementById("result-container").style.display = "block";
    document.getElementById("score").innerText = score;
    clearInterval(timerInterval);
}
