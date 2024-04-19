const add = (firstNumber, secondNumber) => firstNumber + secondNumber;
const subtract = (firstNumber, secondNumber) => firstNumber - secondNumber;
const multiply = (firstNumber, secondNumber) => firstNumber * secondNumber;
const divide = (firstNumber, secondNumber) => firstNumber / secondNumber;
let operator;
let firstNumber;
let secondNumber;

function operate(firstNumber, operator, secondNumber) {
  firstNumber = Number(firstNumber);
  secondNumber = Number(secondNumber);

  switch (operator) {
    case "+":
      return add(firstNumber, secondNumber);
    case "-":
      return subtract(firstNumber, secondNumber);
    case "*":
      return multiply(firstNumber, secondNumber);
    case "/":
      return divide(firstNumber, secondNumber);
  }
}
