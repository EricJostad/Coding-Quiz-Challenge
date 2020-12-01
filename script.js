var startButton=document.querySelector("#startButton");
var timerEl=document.getElementById("countdown");


startButton.onclick=()=>{
  quizTimer();
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
