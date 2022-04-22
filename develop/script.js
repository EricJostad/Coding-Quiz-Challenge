// Gathering elements that will be needed 
var questionNumber = document.querySelector(".questionNumber");
var questionText = document.querySelector(".questionText");
var choicesContainer = document.querySelector(".choicesContainer");
var beginButton = document.querySelector("#beginBtn");
var timerEl = document.querySelector("#countdown");
var instructBox = document.querySelector(".instructionsBox");
var hsBox = document.querySelector(".hsBox");
var quizBox = document.querySelector(".quizBox");
var scoreBox = document.querySelector(".scoreBox");
var timerBox = document.querySelector(".timerBox");

// Declaring variables that will be used further down in script
var questionCounter = 0;
var correctAnswers = 0;
var attempted = 0;
var currentQuestion;
var availableQuestions = [];
var availableChoices = [];

// Array of Quiz Questions
var quiz = [
    {
        question: "Which of the following is not a common web development programming language?",
        choices: ["HTML", "Mjolnir", "JavaScript", "CSS"],
        answer: 1
    },
    {
        question: "Of the following, which is not a common data-type in JavaScript?",
        choices: ["Hooligan", "Boolean", "Number", "String"],
        answer: 0
    },
    {
        question: "In which decade was the first computer code ever written?",
        choices: ["1940's", "1980's", "1970's", "1950's", "1960's"],
        answer: 3
    },
    {
        question: "Which of the following is an example of an Array structure?",
        choices: ["var = {}", "var = ()", "var = []", "var = ||"],
        answer: 2
    },
    {
        question: "What was the name of the planet that the Death Star destroyed in StarWars: A New Hope?",
        choices: ["Coruscant", "Taris", "Tatooine", "Dantooine", "Alderaan"],
        answer: 4
    },
]

// This line allows the countdown timer to initiate when the user clicks the Begin Quiz button
beginButton.onclick = () => {
    quizTimer();
}

// This function allows the countdown timer to start at a set time and decrement 1 every second until 0, then will display "Time's Up!"
function quizTimer() {
    var timeLeft = 60;
    var timeInterval = setInterval(function () {
        timerEl.textContent = timeLeft + " seconds remain";
        timeLeft--;

        // This code will stop the timer and display the "Time's Up!" message upon reaching 0
        if (timeLeft === 0) {
            timerEl.textContent = "Time's up!";
            clearInterval(timeInterval);
        }
    }, 1000);
}

// This function is responsible for hiding the instructionsBox and showing the quizBox/Timer when the user clicks on begin Quiz
document.getElementById("hsBtn").addEventListener("click", function hsBtn() {
    instructBox.classList.add("hide");
    hsBox.classList.remove("hide");
}
);

// This function is responsible for hiding the instructionsBox and showing the quizBox/Timer when the user clicks on begin Quiz
document.getElementById("beginBtn").addEventListener("click", function beginBtn() {
    instructBox.classList.add("hide");
    quizBox.classList.remove("hide");
    timerBox.classList.remove("hide");
}
);

function startQuiz() {
    scoreBox.classList.add("hide");
    hsBox.classList.add("hide");
    quizBox.classList.remove("hide");

    setAvailableQuestions();
    getNewQuestion();
}

// This will push the questions into the AvailableQuestions array
function setAvailableQuestions() {
    var totalQuestion = quiz.length;
    for (var i = 0; i < totalQuestion; i++) {
        availableQuestions.push(quiz[i])
    }
}

// This will set the question number & question choices
function getNewQuestion() {
    // This will set the question number
    questionNumber.innerHTML = "Question " + (questionCounter + 1) + " of " + quiz.length;

    // This line will set the question text and grab a random question
    var questionIndex = availableQuestions[Math.floor(Math.random() * availableQuestions.length)]
    currentQuestion = questionIndex;
    questionText.innerHTML = currentQuestion.question;

    // This line will get the position of "questionIndex" from the availableQuestions array
    var index1 = availableQuestions.indexOf(questionIndex);

    // This will be responsible for removing "questionIndex" from the availableQuestion Array
    // to avoid repeating questions
    availableQuestions.splice(index1, 1);

    // This line will set & get the length of answer choices
    var choiceLength = currentQuestion.choices.length

    // This will push answer choices into the availableChoices Array
    for (var i = 0; i < choiceLength; i++) {
        availableChoices.push(i)
    }

    // This line pushes the quizBox forward to the next question upon clicking the Next button
    choicesContainer.innerHTML = "";

    // Append choices from quiz array of objects to html
    for (var i = 0; i < choiceLength; i++) {

        // Will get a random choice and get the positions of choiceIndex from availableOptions
        var choiceIndex = availableChoices[Math.floor(Math.random() * availableChoices.length)]
        var index2 = availableChoices.indexOf(choiceIndex);

        // This will be responsible for removing "choiceIndex" from the availableChoices
        // so that the choice does not repeat 
        availableChoices.splice(index2, 1);

        var choice = document.createElement("div");
        choice.innerHTML = currentQuestion.choices[choiceIndex];
        choice.id = choiceIndex;
        choice.className = "choice";
        choicesContainer.appendChild(choice)
        choice.setAttribute("onclick", "getResult(this)");
    }

    questionCounter++
}
// This function is responsible for marking the answer as correct or incorrect
function getResult(choiceEl) {
    var id = parseInt(choiceEl.id);

    // The function compares the id of the clicked choice to the answer key in the quiz array    
    if (id === currentQuestion.answer) {
        console.log("correct");
        choiceEl.classList.add("correct");
        correctAnswers++;

        // Else if statement to subtract 10 seconds from timer when wrong answer chosen
    } 
    else if (id ==! currentQuestion.answer) {
        console.log("incorrect");
        choiceEl.classList.add("incorrect");
        attempted++;
        quizTimer = timeLeft - 10;

        var choiceLength = choicesContainer.children.length;
        for (var i = 0; i < choiceLength; i++) {
            if (parseInt(choicesContainer.children[i].id) === currentQuestion.answer) {
                choicesContainer.children[i].classList.add("correct")
            }
        }
    } 
    oneChoice();
}

// This function will make all other choices unclickable after the user has selected an answer
function oneChoice() {
    var choiceLength = choicesContainer.children.length;
    for (var i = 0; i < choiceLength; i++) {
        choicesContainer.children[i].classList.add("answered");
    }
}

// Allows the Next button to function as intended and cycle through random questions until exhausted
document.getElementById("nextBtn").addEventListener("click", function nextBtn() {
    if (questionCounter === quiz.length) {
        endQuiz();
    } else {
        getNewQuestion();
    }

    // This function is responsible for hiding the quizBox/Timer and showing the scoreBox upon quiz completion
    function endQuiz() {
        quizBox.classList.add("hide");
        timerBox.classList.add("hide");
        scoreBox.classList.remove("hide");
    }
});

function resetQuiz() {
    questionCounter = 0;
    correctAnswers = 0;
    attempted = 0;
}

// This function will allow the user to reset the quiz without refreshing the page
function restart() {
    scoreBox.classList.add("hide");
    quizBox.classList.remove("hide");
    resetQuiz();
    startQuiz();
}

// This function will allow the user to go to the main quiz page without refreshing the page
function home() {
    scoreBox.classList.add("hide");
    quizBox.classList.add("hide");
    hsBox.classList.add("hide");
    instructBox.classList.remove("hide");
    resetQuiz();
}

// Commented out below due to code not working as intended. Will circle back at a later date.
// The below function will pull user quiz data into score table 
function quizResult() {
    scoreBox.querySelector(".totalQuestion").innerHTML = quiz.length;
    scoreBox.querySelector(".totalAttempt").innerHTML = attempted;
    scoreBox.querySelector(".totalRight").innerHTML = correctAnswers;
    scoreBox.querySelector(".totalWrong").innerHTML = attempted - correctAnswers;
    scoreBox.querySelector(".timeRemain").innerHTML = quizTimer;
    scoreBox.querySelector(".totalScore").innerHTML = correctAnswers + timeLeft;
}

window.onload = function () {
    // This will set all questions in availableQuestions Array
    setAvailableQuestions();
    // Next, this calls the getNewQuestion(); function
    getNewQuestion();
}