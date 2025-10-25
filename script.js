const quizData = [
    {
        question: "Which language runs in a browser?",
        options: ["Java", "C", "Python", "JavaScript"],
        answer: "JavaScript"
    },
    {
        question: "What does CSS stand for?",
        options: ["Central Style Sheets", "Cascading Style Sheets", "Cascading Simple Sheets", "Creative Style Sheets"],
        answer: "Cascading Style Sheets"
    },
    {
        question: "What does HTML stand for?",
        options: ["Hyper Text Markup Language", "Hyperlinks Text Mark Language", "Hyper Text Machine Language", "Hyper Tool Multi Language"],
        answer: "Hyper Text Markup Language"
    },
    {
        question: "Which one is a JavaScript framework?",
        options: ["React", "Laravel", "Django", "Spring"],
        answer: "React"
    }
];

let currentQuestion = 0;
let score = 0;
let timer;
let timeLeft = 30;

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("nextBtn");
const resultEl = document.getElementById("result");
const timerEl = document.getElementById("timer");

function startQuiz() {
    showQuestion();
    startTimer();
}

function showQuestion() {
    resetState();
    const q = quizData[currentQuestion];
    questionEl.innerText = q.question;
    q.options.forEach(option => {
        const li = document.createElement("li");
        li.innerText = option;
        li.addEventListener("click", selectOption);
        optionsEl.appendChild(li);
    });
}

function resetState() {
    clearInterval(timer);
    timeLeft = 30;
    timerEl.innerText = `Time Left: ${timeLeft}s`;
    while(optionsEl.firstChild) {
        optionsEl.removeChild(optionsEl.firstChild);
    }
}

function selectOption(e) {
    const selected = e.target.innerText;
    const correct = quizData[currentQuestion].answer;
    if(selected === correct) {
        score++;
        e.target.style.backgroundColor = "#28a745";
    } else {
        e.target.style.backgroundColor = "#dc3545";
        // Show correct answer
        Array.from(optionsEl.children).forEach(li => {
            if(li.innerText === correct) li.style.backgroundColor = "#28a745";
        });
    }
    clearInterval(timer);
    Array.from(optionsEl.children).forEach(li => li.style.pointerEvents = "none");
}

nextBtn.addEventListener("click", () => {
    currentQuestion++;
    if(currentQuestion < quizData.length) {
        showQuestion();
        startTimer();
    } else {
        showResult();
    }
});

function showResult() {
    questionEl.innerText = "Quiz Completed!";
    optionsEl.style.display = "none";
    nextBtn.style.display = "none";
    timerEl.style.display = "none";
    resultEl.innerText = `Your Score: ${score} / ${quizData.length}`;
}

function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        timerEl.innerText = `Time Left: ${timeLeft}s`;
        if(timeLeft <= 0) {
            clearInterval(timer);
            selectOption({target: {innerText: ""}}); // Force end for this question
        }
    }, 1000);
}

startQuiz();
