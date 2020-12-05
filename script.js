//Necessary DOM elements
var strtBtn = document.querySelector(".startButton");
var instBox = document.querySelector(".instructionsBox");
var extBtn = instBox.querySelector(".buttons .exit");
var cntBtn = document.querySelector(".buttons .continue");
var timerEl=document.querySelector("#countdown");

//Question & answer object
var quizQuestions = [
    {
        question: "Which of the following is not a major coding language web development?",
        choices: ["JavaScript", "CSS", "Mjolnir", "HTML"],
        answer: 2
    },
    {
        question: "Which of the following does not properly declare a variable?",
        choices: ["please", "let", "const", "var"],
        answer: 0
    },
    {
        question: "Which of the following is a usable CDN?",
        choices: ["Revenant", "Ark", "Scorpion", "Bootstrap"],
        answer: 3
    },
    {
        question: "Who were the wet bandits?",
        choices: ["Steve & Jeffrey", "Harry & Marv", "Bill & Ted", "Tom & Harry"],
        answer: 1
    },
    {
        question: "How would you make a comment in CSS?",
        choices: ["<!---->", "///", "/**/", "//"],
        answer: 2
    },
    {
        question: "You finished the Game!",
        choices: ["High Score: ", "Second Place: ", "Third Place: ", "Fourth Place: "],
        answer: 0
    }
];

//Code that initiates when start button is clicked

strtBtn.addEventListener("click", function(){

    quizTimer()
    instBox.classList.add(".activeInfo")
    
  });

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



































//Previous code below. Saved for reference, for now.

// var startButton=document.querySelector("#startButton");
// var questions=document.querySelector("#quizQuestions");
// var cardText=document.querySelector(".card-text");
// var cardTitle=document.querySelector(".card-title");
// var timerEl=document.querySelector("#countdown");
// var currentIndex = 0;


// function quizTimer() {
//     var timeLeft=10;
  
//     var timeInterval=setInterval(function() {
//       timerEl.textContent=timeLeft + " seconds remain";
//       timeLeft--;
  
//       if (timeLeft===0) {
//         timerEl.textContent= "Time's up!";
//         clearInterval(timeInterval);
//       }
  
//     }, 1000);
//   }

// startButton.addEventListener("click", function(){

//   // startButton.style.display="none";
  
//   // cardText.style.display="none";

  

// });

// startButton.addEventListener("click", function(){

//   getQuestion()
//   quizTimer()

// });

// var question = [
//   {
//     question: "I am question 1.",
//     choices: ["I am answer 1", "I am answer 2", "I am answer 3", "I am answer 4"],
//     answer: "I am answer 2"
//   },
//   {
//     question: "I am question 2.",
//     choices: ["I am answer 1", "I am answer 2", "I am answer 3", "I am answer 4"],
//     answer: "I am answer 3"
//   }
// ]

// function getQuestion(){

//   var currentQuestion = question[currentIndex]
//   var questionTitle = document.getElementById("question")
//   questionTitle.textContent = currentQuestion.question

//   currentQuestion.choices.forEach(function(choice){
    
//   var createButton = document.createElement("button")

//   createButton.setAttribute("class", "buttons" )
//   createButton.setAttribute("value", choice)
//   createButton.textContent = choice
//   createButton.onclick = currentQuestion++
//   questions.append(createButton)

// });
// }
