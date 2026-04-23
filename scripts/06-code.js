let computerMove = '';
//function operation(playerMove, randomNumber, computerMove)
pickMove = (playerMove, randomNumber = Math.random()) => {
  // randomNumber: default Parameter, everytime is this function been called, 2ed parameter will be set again as default!
  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = "Rock";
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = "Paper";
  } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
    computerMove = "Scissors";
  }
  console.log(computerMove);

  let result = "";
  if (computerMove === playerMove) {
    result = "Tie!";
  } else if (
    (computerMove === "Paper" && playerMove === "Rock") ||
    (computerMove === "Scissors" && playerMove === "Paper") ||
    (computerMove === "Rock" && playerMove === "Scissors")
  ) {
    result = "You los!";
  } else {
    result = "You win!";
  }
  // alert(
  //   "You picked " + playerMove + ". Computer picked " + computerMove + ". " + result);
  document.getElementById("show_result").innerHTML = `You picked ${playerMove}. Computer picked ${computerMove}. ${result}`;
}