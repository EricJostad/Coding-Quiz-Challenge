var timerEl=document.getElementById("countdown")

function quizTimer() {
    var timeLeft = 30;
  
    var timeInterval = setInterval(function() {
      timerEl.textContent = timeLeft + " seconds remain";
      timeLeft--;
  
      if (timeLeft === 0) {
        timerEl.textContent = "Time's up!";
        clearInterval(timeInterval);
      }
  
    }, 1000);
  }

  quizTimer();