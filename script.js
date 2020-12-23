// Gathering elements that will be needed 
var questionNumber = document.querySelector(".questionNumber");
var questionText = document.querySelector(".questionText");
var choicesContainer = document.querySelector(".choicesContainer");
var beginButton = document.querySelector("#beginBtn");
var timerEl = document.querySelector("#countdown");

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

var questionCounter = 0;
var currentQuestion;
var availableQuestions = [];
var availableChoices = [];

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
    } else {
        console.log("incorrect");
    }

    oneChoice();
}

// This function will make all other choices unclickable ater the user has selected an answer
function oneChoice() {
    var choiceLength = choicesContainer.children.length;
    for (var i = 0; i < choiceLength; i++) {
        choicesContainer.children[i].classList.add("answered");
    }
}

// Allows the Next button to function as intended and cycle through random questions until exhausted
document.getElementById("nextBtn").addEventListener("click", function nextBtn() {
    if (questionCounter === quiz.length) {
        alert("End of Quiz");
    } else {
        getNewQuestion();
    }
})

window.onload = function () {
    // This will set all questions in availableQuestions Array
    setAvailableQuestions();
    // Next, this calls the getNewQuestion(); function
    getNewQuestion();
}