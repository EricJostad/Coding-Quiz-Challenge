// Gathering elements that will be needed 
var questionNumber = document.querySelector(".questionNumber");
var questionText = document.querySelector(".questionText");
var choicesContainer = document.querySelector(".choicesContainer");

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
    for (var i = 0; i < totalQuestion; i++) {
        availableQuestions.push(quiz[i])
    }
}

// This will set the question number & question options
function getNewQuestion(){
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
    availableQuestions.splice(index1,1);
    questionCounter++
}

document.getElementById("nextBtn").addEventListener("click", function nextBtn(){
    if(questionCounter === quiz.length){
        alert("End of Quiz");
    } else {
        getNewQuestion();
    }
})

window.onload = function(){
    // This will set all questions in availableQuestions Array
    setAvailableQuestions();
    // Next, this calls the getNewQuestion(); function
    getNewQuestion();
}