






































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
