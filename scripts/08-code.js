function subscribe() {

  const buttonElement = document.querySelector('.js-subscribe-button');

  if (buttonElement.innerHTML === "Subscribe") {
    buttonElement.innerHTML = "Subscribed!";
    // creating new class to style the button by cklicking on!
    buttonElement.classList.add('is-subscribed');
  } else {
    buttonElement.innerHTML = "Subscribe";
    buttonElement.classList.remove('is-subscribed');
  }
}


function calculator() {
  const inputElement = document.querySelector('.cost-input');
  const resultElement = document.querySelector('.show_result');
  const fontColor = document.getElementById("result");

  const shipping = 10;
  let cost = Number(inputElement.value); // It is a String, that's why the Math doesn't work!
  let result = 0;                        // We need to convert the Value to number 

  // Clear any previously set inline styles
  resultElement.style.color = "";
  // or resultElement.style.removeProperty('color');

  if (cost > 0 && cost < 40) {
    result = cost + shipping;
    resultElement.innerHTML = 'Total = $' + result;
  } else if (cost < 0) {
    fontColor.style.color = "red";
    resultElement.innerHTML = "Cost cann't be minus!!";
  } else {
    result = cost;
    resultElement.innerHTML = 'Total = $' + result;
  }
}

function enter(event) {
  if (event.key === 'Enter') {
    calculator();
  }
}