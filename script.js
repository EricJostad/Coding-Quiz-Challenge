// Gathering elements that will be needed 
var questionNumber = document.querySelector("questionNumber");
var questionText = document.querySelector("questionText");
var choicesContainer = document.querySelector("choicesContainer");

// Array of Quiz Questions
var quiz = [
    {
        question: "Question 1",
        choices: ["Answer 1", "Answer 2", "Answer 3", "Answer 4", "Answer 5"],
        answer: 0
    },
    {
        question: "Question 2",
        choices: ["Answer 1", "Answer 2", "Answer 3", "Answer 4", "Answer 5"],
        answer: 1
    },
    {
        question: "Question 3",
        choices: ["Answer 1", "Answer 2", "Answer 3", "Answer 4", "Answer 5"],
        answer: 2
    },
    {
        question: "Question 4",
        choices: ["Answer 1", "Answer 2", "Answer 3", "Answer 4", "Answer 5"],
        answer: 3
    },
    {
        question: "Question 5",
        choices: ["Answer 1", "Answer 2", "Answer 3", "Answer 4", "Answer 5"],
        answer: 4
    },
]

var questionCounter = 0;
var currentQuestion; 
var availableQuestions = [];

// This will push the questions into the AvailableQuestions array
function setAvailableQuestions(){
    var totalQuestion = quiz.length;
    for (let i = 0; i < totalQuestion; i++) {
        availableQuestions.push(quiz[i])
    }
}

window.onload = function(){
    setAvailableQuestions();
}