"use strict";

var input = document.getElementById('input'), // input/output button
  number = document.querySelectorAll('.numbers div'), // number buttons
  operator = document.querySelectorAll('.operators div'), // operator buttons
  result = document.getElementById('result'), // equal button
  clear = document.getElementById('clear'), // clear button
  resultDisplayed = false; // flag to keep an eye on what output is displayed

// Adding click handlers to number buttons
for (var i = 0; i < number.length; i++) {
  number[i].addEventListener("click", function(e) {
    handleNumberClick(e.target.innerHTML);
  });
}

// Adding click handlers to operator buttons
for (var i = 0; i < operator.length; i++) {
  operator[i].addEventListener("click", function(e) {
    handleOperatorClick(e.target.innerHTML);
  });
}

// On click of 'equal' button
result.addEventListener("click", function() {
  handleEqualClick();
});

// Clearing the input on press of clear
clear.addEventListener("click", function() {
  clearInput();
});

// Function to handle number button click
function handleNumberClick(value) {
  var currentString = input.innerHTML;
  var lastChar = currentString[currentString.length - 1];

  if (resultDisplayed === false) {
    input.innerHTML += value;
  } else if (resultDisplayed === true && "+-×÷".indexOf(lastChar) !== -1) {
    resultDisplayed = false;
    input.innerHTML += value;
  } else {
    resultDisplayed = false;
    clearInput();
    input.innerHTML += value;
  }
}

// Function to handle operator button click
function handleOperatorClick(value) {
  var currentString = input.innerHTML;
  var lastChar = currentString[currentString.length - 1];

  if ("+-×÷".indexOf(lastChar) !== -1) {
    var newString = currentString.substring(0, currentString.length - 1) + value;
    input.innerHTML = newString;
  } else if (currentString.length === 0) {
    console.log("Enter a number first");
  } else {
    input.innerHTML += value;
  }
}

// Function to handle equal button click
function handleEqualClick() {
  var inputString = input.innerHTML;
  var numbers = inputString.split(/\+|\-|\×|\÷/g);
  var operators = inputString.replace(/[0-9]|\./g, "").split("");

  // Handle multiplication and division
  for (var i = 0; i < operators.length; i++) {
    if (operators[i] === "÷") {
      numbers[i + 1] = parseFloat(numbers[i]) / parseFloat(numbers[i + 1]);
      numbers[i] = null;
    } else if (operators[i] === "×") {
      numbers[i + 1] = parseFloat(numbers[i]) * parseFloat(numbers[i + 1]);
      numbers[i] = null;
    }
  }

  // Remove empty elements
  numbers = numbers.filter(function(num) {
    return num !== null;
  });

  // Perform addition and subtraction
  var resultValue = parseFloat(numbers[0]);
  for (var i = 1; i < numbers.length; i++) {
    if (operators[i - 1] === "+") {
      resultValue += parseFloat(numbers[i]);
    } else if (operators[i - 1] === "-") {
      resultValue -= parseFloat(numbers[i]);
    }
  }

  input.innerHTML = resultValue; // Display the output
  resultDisplayed = true;
}

// Function to clear input
function clearInput() {
  input.innerHTML = "";
  resultDisplayed = false;
}
