var startButton=document.querySelector("#startButton");
var questions=document.querySelector("#quizQuestions");
var cardText=document.querySelector(".card-text");
var cardTitle=document.querySelector(".card-title");
var choices=Array.from(document.querySelectorAll("#question"));
var timerEl=document.querySelector("#countdown");

startButton.onclick=()=>{
  quizTimer() 
}

function quizTimer() {
    var timeLeft=10;
  
    var timeInterval=setInterval(function() {
      timerEl.textContent=timeLeft + " seconds remain";
      timeLeft--;
  
      if (timeLeft===0) {
        timerEl.textContent= "Time's up!";
        clearInterval(timeInterval);
      }
  
    }, 1000);
  }

startButton.addEventListener("click", function(){

  startButton.style.display="none";
  
  cardText.style.display="none";


});

startButton.addEventListener("click", function(){
  cardTitle.innerHTML= (question[0].question);


});




var currentQuestion = {}
var correctAnswers = true
var score = 0
var questionCounter = 0
var availableQuestions = []

var question = [
  {
    question: "I am question 1.",
    choice1: "I am answer 1",
    choice2: "I am answer 2",
    choice3: "I am answer 3",
    choice4: "I am answer 4",
    answer: 2
  }]
//   {
//     question: "I am question 1.",
//     choice1: "I am answer 1",
//     choice2: "I am answer 2",
//     choice3: "I am answer 3",
//     choice4: "I am answer 4",
//     answer: 2
//   }
// ]

