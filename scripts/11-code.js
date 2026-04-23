let computerMove = '';

// default operator by seting up an object, ethere default values 0,0,0 or loading it from local storage!
let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0
};


document.body.addEventListener('keydown', (event) => {
  console.log(event.key);
  if (event.key === 'r') {
    pickMove('rock');
  } else if (event.key === 'p') {
    pickMove('paper');
  } else if (event.key === 's') {
    pickMove('scissors');
  } else if (event.key === 'Backspace') {
    reset();
  } else if (event.key === 'a') {
    autoplay();
  }
});


//function operation(playerMove, randomNumber, computerMove)
pickMove = (playerMove, randomNumber = Math.random()) => {
  // randomNumber: default Parameter, everytime is this function been called, 2ed parameter will be set again as default!
  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = "rock";
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = "paper";
  } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
    computerMove = "scissors";
  }
  console.log("Computer move: " + computerMove);
  // console.log(score.losses);
  // console.log(score['wins']);
  // two ways in JS to access to properties of Object: object.<name> or object['<name>']

  let result = "";
  if (computerMove === playerMove) {
    result = "Tie!";
  } else if (
    (computerMove === "paper" && playerMove === "rock") ||
    (computerMove === "scissors" && playerMove === "paper") ||
    (computerMove === "rock" && playerMove === "scissors")
  ) {
    result = "You los!";
  } else {
    result = "You win!";
  }

  if (result === "You win!") {
    score.wins++;
  } else if (result === "You los!") {
    score.losses++;
  } else if (result === "Tie!") e
  score.ties++;

  // save data in local storage
  localStorage.setItem('score', JSON.stringify(score)); // saving score object as a string.

  pirntResult(result);
  printMessage(playerMove, computerMove);
  printScore();
}

function pirntResult(result) {
  const resultElement = document.querySelector('.show_result');
  resultElement.innerHTML = `Result: ${result}`;
}

function printMessage(playerMove, computerMove) {
  // document.getElementById("show_result").innerHTML = `You picked ${playerMove}. Computer picked ${computerMove}. ${result}`;
  const messageElement = document.querySelector('.show_moves');
  /* messageElement.innerHTML = `You picked ${playerMove}. Computer picked ${computerMove}.`; */
  messageElement.innerHTML = `You <img src="images/${playerMove}-emoji.png" class="move-icon"> <img src="images/${computerMove}-emoji.png" class="move-icon">Computer`;
}

printScore(); // to display the score befor any moves
function printScore() {
  // document.getElementById("show_score").innerHTML = `Your Wins: ${score.wins}. Your Losses: ${score.losses}. Your Ties: ${score.ties}`;
  const scoreElement = document.querySelector('.show_score');
  scoreElement.innerHTML = `Your Wins: ${score.wins}. Your Losses: ${score.losses}. Your Ties: ${score.ties}`;
}

let isAutoPlaying = false;
let intervalId;

/* function autoplay() {
  if (!isAutoPlaying) { // if it's false (not playing)
    intervalId = setInterval(function () {
      const moves = ["rock", "paper", "scissors"];
      const playerMove = moves[Math.floor(Math.random() * moves.length)];
      pickMove(playerMove);
    },
      1000
    );
    isAutoPlaying = true; // now auto play is true or running
  } else {
    clearInterval(intervalId);
    isAutoPlaying = false;
  }
} */

function autoplay() {
  if (!isAutoPlaying) { // if it's false (not playing)
    document.querySelector('.js-auto-play-button').innerHTML = 'Stop';
    intervalId = setInterval(() => {
      const moves = ["rock", "paper", "scissors"];
      const playerMove = moves[Math.floor(Math.random() * moves.length)];
      pickMove(playerMove);
    },
      1000
    );
    isAutoPlaying = true; // now auto play is true or running
  } else {
    document.querySelector('.js-auto-play-button').innerHTML = 'Auto Play';
    clearInterval(intervalId);
    isAutoPlaying = false;
  }
}

//pickMove() will return "undefine", which it doesn't work!
document.querySelector('.js-rock-button')
  .addEventListener('click', () => {
    pickMove('rock');
  });

document.querySelector('.js-paper-button')
  .addEventListener('click', () => {
    pickMove('paper');
  });

document.querySelector('.js-scissors-button')
  .addEventListener('click', () => {
    pickMove('scissors');
  });

document.querySelector('.js-auto-play-button')
  .addEventListener('click', () => {
    autoplay();
  });

function reset() {
  const text = confirm('Are you sure you want to reset the score?');
  //console.log(text);
  if (text == true) {
    score.wins = 0;
    score.losses = 0;
    score.ties = 0;
    localStorage.removeItem('score'); // reset also in local storage.
    // pirntResult('-');
    // printMessage('-', '-');
    const resultElement = document.querySelector('.show_result').innerHTML = "";
    const messageElement = document.querySelector('.show_moves').innerHTML = "";
    printScore();
  }
}

//============ alternative to confirm! =================
/*
function reset() {
  customConfirm('Are you sure you want to reset the score?').then((response) => {
    if (response) {
      score.wins = 0;
      score.losses = 0;
      score.ties = 0;
      localStorage.removeItem('score'); // Reset also in local storage.
      // Clear result and message elements
      document.querySelector('.show_result').innerHTML = "";
      document.querySelector('.show_moves').innerHTML = "";
      printScore(); // Update the displayed score
    }
  });
}

function customConfirm(message) {
  return new Promise((resolve) => {
    // Create dialog HTML
    const dialog = document.createElement('div');
    dialog.innerHTML = `
      <br>
      ${message} 
      <button class="yes">Yes</button>
      <button class="no">No</button>
    `;
    // Append dialog to the body
    document.body.appendChild(dialog);
    // Handle Yes/No button clicks
    dialog.querySelector('.yes').onclick = () => {
      resolve(true);  // Resolve with true
      dialog.remove(); // Remove dialog
    };
    dialog.querySelector('.no').onclick = () => {
      resolve(false); // Resolve with false
      dialog.remove(); // Remove dialog
    };
  });
}
*/
// ===========================================

document.querySelector('.js-reset-button')
  .addEventListener('click', () => {
    reset();
  });