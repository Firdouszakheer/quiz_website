
const quizContainer = document.getElementById('quiz-container');
const quizQuestions = [
    {
        question: 'What is the capital of France?',
        options: ['Rome', 'London', 'Berlin', 'Paris'],
        correctAnswer: 'Paris'
    },
    {
        question: 'What is the largest planet in our solar system?',
        options: ['Earth', 'Saturn', 'Jupiter', 'Uranus'],
        correctAnswer: 'Jupiter'
    },
    {
        question: 'Who painted the Mona Lisa?',
        options: ['Leonardo da Vinci', 'Michelangelo', 'Raphael', 'Caravaggio'],
        correctAnswer: 'Leonardo da Vinci'
    },
    {
        question: 'What is the chemical symbol for gold?',
        options: ['Ag', 'Au', 'Hg', 'Pb'],
        correctAnswer: 'Au'
    },
    {
        question: 'What is the smallest country in the world?',
        options: ['Monaco', 'Nauru', 'Vatican City', 'Tuvalu'],
        correctAnswer: 'Vatican City'
    }
];

let currentQuestion = 0;
let score = 0;
let timer;

function showQuestion() {
    const question = quizQuestions[currentQuestion];
    const questionElement = document.createElement('div');
    questionElement.innerHTML = `
        <h2>${question.question}</h2>
        <p>Time remaining: <span id="timer">30</span> seconds</p>
        ${question.options.map(option => `
            <input type="radio" name="question" value="${option}">
            <label>${option}</label><br>
        `).join('')}
        <button id="submit-btn">Submit</button>
    `;
    quizContainer.innerHTML = '';
    quizContainer.appendChild(questionElement);
    startTimer();
    document.getElementById('submit-btn').addEventListener('click', checkAnswer);
}

function startTimer() {
    let timeRemaining = 30;
    timer = setInterval(() => {
        document.getElementById('timer').innerText = timeRemaining;
        timeRemaining--;
        if (timeRemaining < 0) {
            clearInterval(timer);
            checkAnswer();
        }
    }, 1000);
}

function checkAnswer() {
    clearInterval(timer);
    const selectedOption = document.querySelector('input[name="question"]:checked');
    if (selectedOption && selectedOption.value === quizQuestions[currentQuestion].correctAnswer) {
        score++;
    }
    currentQuestion++;
    if (currentQuestion < quizQuestions.length) {
        showQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    quizContainer.innerHTML = `
        <h2>You scored ${score} out of ${quizQuestions.length}</h2>
    `;
}

showQuestion();

