
//Coding Quiz

//Coding Quiz Challenge
//Try answer the following code related questionins within the time limit. Keep in mind that incorrect answers deduct 15 seconds! (Start Quiz)
//Commonly used data types DO NOT include: 1. Strings 2. Booleans 3. Alerts 4. Numbers
//The condition in an if/else statement is enclosed within: 1. Quotes 2. Curly Brackets 3. Parentheses 4. Square Brackets
//Arrays in JavaScript can be used to store: 1. Numbers and Strings 2. Other Arrays 3. Booleans 4. All of the Above
//When being assigned to variables, string values must be enclosed within: 1. Commas 2. Curly Brackets 3. Quotes 4. Parentheses
//Well Done! Your final score is ____ Enter Initials (Submit)

var startBtn = document.querySelector("#start");
var questionsEl = document.querySelector("#questions");
var optionsEl = document.querySelector("#options");
var gradeEl = document.querySelector("#grade")
var timerEl = document.querySelector("#time");
var submitBtn = document.querySelector("#submit");
var initialsEl = document.querySelector("#initials");

var currentQuestionIndex = 0;
var time = questions.length * 20;
var timerId;

function startMofo() {
  // Close Prompt
  var startScreenEl = document.getElementById("start-screen");
  startScreenEl.setAttribute("class", "hide");

  // Start Questions
  questionsEl.removeAttribute("class");

  // Start Timer
  timerId = setInterval(timeupdate, 1000);

  // Display time
  timerEl.textContent = time;

  displayQu();
}

function displayQu() {
  // Question loop
  var currentQuestion = questions[currentQuestionIndex];

  // Show current question in title
  var titleEl = document.getElementById("question-title");
  titleEl.textContent = currentQuestion.title;

  // Remove previous answer
  optionsEl.innerHTML = "";

  // Loop next
  currentQuestion.options.forEach(function(choice, i) {
    // Buttons for all options
    var optionsyall = document.createElement("button");
    optionsyall.setAttribute("class", "choice");
    optionsyall.setAttribute("value", choice);

    optionsyall.textContent = i + 1 + ". " + choice;

    // Event listener for click
    optionsyall.onclick = questionClick;

    // Display
    optionsEl.appendChild(optionsyall);
  });
}
//If wrong remove time
function questionClick() {
    if (this.value !== questions[currentQuestionIndex].answer) {
      time -= 15;

    if (time < 0) {
      time = 0;
    }
    //Update displayed time
    timerEl.textContent = time; gradeEl.textContent = "Hah! Wrong!"; gradeEl.style.color = "red"; gradeEl.style.fontSize = "500%";
  } else {
    gradeEl.textContent = "You are Right"; gradeEl.style.color = "green"; gradeEl.style.fontSize = "400%";
  }

  // Right/Wrong
  gradeEl.setAttribute("class", "grade");
  setTimeout(function() {
    gradeEl.setAttribute("class", "grade hide");
  }, 2500);

  // Move forward but only if enough time
  currentQuestionIndex++;
 if (currentQuestionIndex === questions.length) {
    finito();
  } else {
    getQuestion();
  }
}
//If not end it
function finito() {
    clearInterval(timerId);

  // End
  var endScreenEl = document.getElementById("end-screen");
  endScreenEl.removeAttribute("class");

  //Process Score
  var finalScoreEl = document.getElementById("final-score");
  finalScoreEl.textContent = time;
 questionsEl.setAttribute("class", "hide");
}

function timeupdate() {
   time--;
  timerEl.textContent = time;

  //Timecheck again
  if (time <= 0) {
    finito();
  }
}

function saveHighscore() {
   var initials = initialsEl.value.trim();

  if (initials !== "") {
    // Add ighscores else clear
    var highscores =
      JSON.parse(window.localStorage.getItem("highscores")) || [];
    var newScore = {
      score: time,
      initials: initials
    };
 highscores.push(newScore);
    window.localStorage.setItem("highscores", JSON.stringify(highscores));

    // redirect to next page
    window.location.href = "score.html";
  }
}

// submit initials
submitBtn.onclick = saveHighscore;

// start quiz
startBtn.onclick = startQuiz;

var questions = [
  {
    qu: "Commonly used data types DO NOT include:",
    options: ["(Adagio for) Strings", "Booleans", "Alerts", "Numbers"],
    answer: "Alerts"
  },
  {
    qu: "The condition in an if/else statement is enclosed within:",
    options: ["Quotes", "Curly Brackets (curls get the gurls)", "Parentheses", "Square Brackets (being a square keeps you from going around in circles"],
    answer: "Primitive and reference types"
  },
  {
    qu: "Arrays in JavaScript can be used to store:",
    options: ["Numbers and Strings", "Other Arrays", "Boooooooleans", "All of the Above"
    ],
    answer: "All the above"
  },
  {
    qu:
      "When being assigned to variables, string values must be enclosed within:",
    options: ["Commas", "Curly Brackets (curly hair don't care)", "Quotes", "Parentheses"
    ],
    answer: "Quotes"
  },
  {
    qu: "Why do monkeys eat ham?",
    options: [
      "hungee", "yum", "chonkers", "all of the above"],
    answer: "all of the above"
  },
  ];

  function displayHighscores() {
    //Retrieve scores from localstorage otherwise clear
    var highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];
  
       highscores.forEach(function(score) {
           var liTag = document.createElement("li");
      liTag.textContent = score.initials + " - " + score.score;
  
      // Display
      var olEl = document.getElementById("highscores");
      olEl.appendChild(liTag);
    });
  }
  
  function clearHighscores() {
    window.localStorage.removeItem("highscores");
    window.location.reload();
  }
  
  document.getElementById("clear").onclick = clearHighscores;
  
  // run function when page loads
  displayHighscores();