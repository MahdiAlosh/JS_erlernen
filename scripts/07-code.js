let computerMove = '';

// default operator by seting up an object, ethere default values 0,0,0 or loading it from local storage!
let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0
};

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
  console.log(computerMove);
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
  } else if (result === "Tie!")
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

function reset() {
  score.wins = 0;
  score.losses = 0;
  score.ties = 0;
  localStorage.removeItem('score'); // reset also in local storage.
  /*   pirntResult('-');
    printMessage('-', '-'); */
  const resultElement = document.querySelector('.show_result').innerHTML = "";
  const messageElement = document.querySelector('.show_moves').innerHTML = "";
  printScore();
}