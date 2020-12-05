// Questions & answers object
var quizQuestions = [
    {
        question: "Welcome to the QUIZ GAME!",
        choices: ["", "", "", ""],
        answer: 1
    },    {
        question: "Which of the following is not a major coding language web development?",
        choices: ["JavaScript", "CSS", "Mjolnir", "HTML"],
        answer: 2
    },
    {
        question: "Which of the following does not properly declare a variable?",
        choices: ["please", "let", "const", "var"],
        answer: 1
    },
    {
        question: "Which of the following is a usable CDN?",
        choices: ["Revenant", "Ark", "Scorpion", "Bootstrap"],
        answer: 4
    },
    {
        question: "Who were the wet bandits?",
        choices: ["Steve & Jeffrey", "Harry & Marv", "Bill & Ted", "Tom & Harry"],
        answer: 2
    },
    {
        question: "How would you make a comment in CSS?",
        choices: ["<!---->", "///", "/**/", "//"],
        answer: 3
    },
    {
        question: "You finished the Game!",
        choices: ["High Score: ", "Second Place: ", "Third Place: ", "Fourth Place: "],
        answer: 0
    }
];

//Status keeper and rules for QUIZ game (see functions list near bottom)
var quizStatus = {};
//This is used at end-of-game
resetQuizStatus();

//Get local history, then check if null (null=never played)
var localHistory = JSON.parse(localStorage.getItem('localHistory'))
//JSON Stringify to store un-set item, then get the item and un-stringify
if (localHistory === null) {
    //Default values if no local storage exists
    localHistory = [
        ['Chief', 117],
        ['Johnny', 90],
        ['Terry', 50],
        ['Dummy', 0]
    ];
    localStorage.setItem('localHistory', JSON.stringify(localHistory));    
} 
localHistory = JSON.parse(localStorage.getItem('localHistory'))
//A copy used as reference when creating a new high-score table so it can write and refer to old scores simultaneously
var oldLocalhistory = JSON.parse(localStorage.getItem('localHistory'))

//On-load page element set-ups
    //Show-last-score button
    var showLastscores = document.createElement("section")
    showLastscores.id = "last-score-button";
    document.body.appendChild(showLastscores);
    showLastscores.innerText = "Click here to show High Scores"
    showLastscores.addEventListener("click", showHighscores);

    //Set up canvas where game is played
    var quizCanvas = document.createElement("main");
    quizCanvas.id = "quiz-area";
    document.body.appendChild(quizCanvas);

    //Timer / score
    var timerCounter = document.createElement("h2");
    timerCounter.id = "timer";
    quizCanvas.appendChild(timerCounter);

    //Questions are posted here
    var quizQuestion = document.createElement("p");
    quizQuestion.id = "quiz-question";
    quizCanvas.appendChild(quizQuestion);
    //Initial "intro" text
    quizQuestion.textContent = quizQuestions[0].question;

    //Creates answer p-tags where answers are shown
    for (var i = 0; i < quizQuestions[0].choices.length; i++) {
        var answerEl = document.createElement("p")
        answerEl.id = "answer-" + (i + 1);
        answerEl.className = "quiz-answer";
        quizCanvas.appendChild(answerEl);
        answerEl.textContent = quizQuestions[0].choices[i];
        //Onclicks applied that check if answer is correct then itterates to next quizStatus
        answerEl.addEventListener('click', answerClick);    
    }    

    //Creates status reproter area, just lets user know if the last question was correct or not
    var answerResult = document.createElement("p");
    answerResult.id = "answer-result";
    quizCanvas.appendChild(answerResult);
    answerResult.style.textAlign = "center";
    answerResult.style.fontSize = "40px";
    answerResult.textContent = "";
    var startGamebutton = document.createElement("button");

    //Start-game button
    startGamebutton.id = "game-start-button";
    startGamebutton.innerText = "Begin Quiz";
    quizCanvas.appendChild(startGamebutton);
    startGamebutton.addEventListener("click", preGame);

    //Userform for name entry
    var userNameform = document.createElement("FORM");
    userNameform.id = "user-name-form";
    quizCanvas.appendChild(userNameform);  
    var userNameenter = document.createElement("INPUT");
    userNameenter.id = "user-name-text";
    userNameenter.setAttribute("type", "text");
    userNameenter.setAttribute("value", quizStatus.enteredName);
    userNameform.appendChild(userNameenter);
    var userNamebutton = document.createElement("button");
    userNamebutton.id = "user-name-button";
    userNamebutton.innerText = "Submit"
    quizCanvas.appendChild(userNamebutton);
    //User only sees this if they "win" game.
    userNamebutton.addEventListener("click", gameWin);
//Page element set-up complete

//Functions for game

//Pre-game count-down that shows the game-rules/concept to user.
function preGame() {
    //Hides game-starting button and sets it up for end-game style
    startGamebutton.style.visibility = "hidden";
    startGamebutton.id = "game-started-button";    
    startGamebutton.innerText = "Click HERE to try again!"
    //Shows user the game rules and sets the pre-game timer        
    answerResult.textContent = "You will have 60 seconds to answer all the questions in the quiz. The game will begin...";
    timerCounter.textContent = quizStatus.preGametimer;
    //This triggers for the sake of a re-initiation of the game on the same page-load
    for (var i = 0; i < 4; i++) {                
        answerEl = document.getElementById("answer-" + (i + 1));
        answerEl.textContent = "";
    }
    //Reveal counter
    document.getElementById("timer").style = "color: black;"
    //This is a var so that the interval can be stopped with clearInterval    
    var preGamegame = setInterval(function() {        
        quizStatus.preGametimer--;
        timerCounter.textContent = quizStatus.preGametimer;
        if (quizStatus.preGametimer === 1) {
            answerResult.textContent = "Now!";            
        }  else if (quizStatus.preGametimer < 1) {
            //Game is about to start
            //Stop pregame interval
            clearInterval(preGamegame);        
            //Set answer result to in-game style
            answerResult.textContent = "";
            answerResult.style.textAlign = "right";
            answerResult.style.fontSize = "20px";
            answerResult.textContent = "";
            //Set counter to start time main game
            timerCounter.textContent = quizStatus.gameLength;
            //Set first question
            questionAsked()
            //Start game
            mainGame(); 
        }
    }, 1000);
};

//Main game of page
function mainGame () {
    //Each inteval checks game status to refresh question or if game is over.
    var timerGame = setInterval(function() {
        //Quesiton updator
        questionAsked();
        //Updates timer every tick
        timerCounter.textContent--;
        //End-game checkers here.
            //Time-up event. If time ends (<1), trigger "game over" endgame.
            if (timerCounter.textContent < 1) {
                gameLose(timerGame);
            } else if (quizStatus.questionNum > quizQuestions.length - 2) {
                getUsername(timerGame);
            };
    }, 1000);
}

function questionAsked() {
     //This updates the question if the game-status is set to False (which occurs after user selects an answer)
     if (!quizStatus.questionAsked) {
        //This loop updates the question, so first thing: set "asked" = true, it's set to false when user clicks on answer
        quizStatus.questionAsked = true;
        //Update question
        quizQuestion.textContent = quizQuestions[quizStatus.questionNum].question;
        //Update answers, loop through array for each answer element. It's locked at 4 so this is not dynamic.
        for (var i = 0; i < 4; i++) {
            answerEl = document.getElementById("answer-" + (i + 1));
            answerEl.textContent = quizQuestions[quizStatus.questionNum].choices[i];
            answerEl.className = "quiz-answer";
        };
    } 
}

function gameLose(timerGame) {
    //Stops game
    clearInterval(timerGame);
    //Update play area to show high scores and sad alerts
    quizQuestion.textContent = "You're out of time!"
    answerResult.style.textAlign = "center";
    answerResult.style.fontSize = "40px";
    answerResult.textContent = "Click HERE to try again!";
    timerCounter.textContent = '';
    //Load any stored data
    for (var i = 0; i < 4; i++) {                
        answerEl = document.getElementById("answer-" + (i + 1));
        answerEl.textContent = quizQuestions[6].choices[i] + localHistory[i][0] + " " + localHistory[i][1];
    }
    //Set the game status back to default for next play
    quizCanvas.addEventListener("click", preGame);            
    resetQuizStatus();
};

function getUsername(timerGame) {
    //Stops game, gets name of User
    clearInterval(timerGame);
    for (var i = 0; i < 4; i++) {                
        answerEl = document.getElementById("answer-" + (i + 1));
        answerEl.style.visibility = "hidden";
    }
    quizQuestion.textContent = "You completed the quiz!"
    answerResult.style.textAlign = "center";
    answerResult.style.fontSize = "40px";
    answerResult.textContent = "Please enter your name below!"     
    userNameform.style.visibility = "visible";
    userNamebutton.style.visibility = "visible";
}

//Game success
function gameWin() {
    //Hides user-form
    userNameform.style.visibility = "hidden";
    userNamebutton.style.visibility = "hidden";
    quizStatus.enteredName = userNameenter.value;
    //Update status to show previous high-scores in next steps
    quizQuestion.textContent = quizQuestions[6].question;
    //Game status alert update
    answerResult.textContent = "The game is over!";
    //This variable helps maintain continuity between the old records and new records. It also prevents first "if" to fire more than once.
    var newRecord = 0;                
    //Update answers to high scores and create new local history
    for (var i = 0; i < 4; i++) {  
        answerEl.style.visibility = "visible";                             
        //Check if new record
        if (timerCounter.textContent > localHistory[i][1] && newRecord === 0) {
            //Only prompts when a high score happens. Nice work!
            answerResult.textContent = "You got a new record!";   
            answerEl = document.getElementById("answer-" + (i + 1));                 
            answerEl.textContent = quizQuestions[6].choices[i] + quizStatus.enteredName + " " + timerCounter.textContent;
            //Here's that checker to stop this path from happening twice
            newRecord++;
            //Logging new record into localHistory
            localHistory[i][0] = quizStatus.enteredName;
            localHistory[i][1] = timerCounter.textContent;
            answerEl.className = "quiz-answer quiz-answer-highscore";

        } else {
            //OldLocalhistory used as "memory" as localHistory gets overwritten in if script
            answerEl = document.getElementById("answer-" + (i + 1));
            answerEl.textContent = quizQuestions[6].choices[i] + oldLocalhistory[i - newRecord][0] + " " + oldLocalhistory[i - newRecord][1];
            localHistory[i][0] = oldLocalhistory[i - newRecord][0];
            localHistory[i][1] = oldLocalhistory[i - newRecord][1];
        }
    }
    //Show user their score
    timerCounter.textContent = quizStatus.enteredName + "'s Final Score: " + timerCounter.textContent;
    //Save to local storage high scores                
    localStorage.setItem('localHistory', JSON.stringify(localHistory));
    //Reset for next game
    resetQuizStatus();
    //Reveals game-starting button
    startGamebutton.style.visibility = "visible";
};

//Loops through and shows the current high scores
function showHighscores() {
    startGamebutton.id = "game-started-button";
    for (var i = 0; i < 4; i++) {                
        answerEl = document.getElementById("answer-" + (i + 1));
        answerEl.textContent = quizQuestions[6].choices[i] + localHistory[i][0] + " " + localHistory[i][1];
    }
}

//Default settings reset
function resetQuizStatus() {
    quizStatus =  {
        questionNum: 1,
        questionAsked: false,
        correctAnswer: 1,
        gameLength: 60,
        timerPunishment: 10,
        preGametimer: 5,
        enteredName: 'your name here'
    }
};

//Checks if clicked answer is correct then sets up mainGame for next question
function answerClick () {
    if (parseInt(this.id.charAt(this.id.length - 1)) === quizStatus.correctAnswer) {
        this.className = "quiz-answer quiz-answer-correct";
        answerResult.textContent = "Last Question: Correct!";
    } else {
        this.className = "quiz-answer quiz-answer-wrong";
        answerResult.textContent = "Last Question: Wrong!";
        timerCounter.textContent = timerCounter.textContent - quizStatus.timerPunishment;        
    }    
    //Update game status to next question for next iteration
    quizStatus.questionAsked = false;
    quizStatus.questionNum++;
    quizStatus.correctAnswer = quizQuestions[quizStatus.questionNum].answer;
}