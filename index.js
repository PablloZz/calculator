const expressionOutput = document.querySelector(".expression");
const expressionResultOutput = document.querySelector(".result");
const expressionButtons = document.querySelectorAll(".expression-button");
const equalsButton = document.querySelector(".equals-button");
const clearButton = document.querySelector(".clear-button");

const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

let firstOperand = "0";
let operator = "";
let secondOperand = "";

function operate(a, operator, b) {
  a = Number(a);
  b = Number(b);

  switch (operator) {
    case "+":
      return add(a, b);
    case "-":
      return subtract(a, b);
    case "*":
      return multiply(a, b);
    case "÷":
      return divide(a, b);
  }
}

const checkIfNumber = (value) => Number.isFinite(Number(value));

function updateExpressionParts(newPart) {
  const isNumber = checkIfNumber(newPart);

  if (!operator && isNumber) {
    firstOperand = firstOperand === "0" ? newPart : firstOperand + newPart;
  }

  if (operator && isNumber) {
    secondOperand = secondOperand === "0" ? newPart : secondOperand + newPart;
  }

  if (!isNumber) operator = newPart;
}

function getExpressionString(shouldCalculateResult) {
  let expression = firstOperand;

  if (operator) expression += ` ${operator} `;
  if (secondOperand) expression += secondOperand;
  if (shouldCalculateResult) expression += " =";

  return expression;
}

function populateDisplay(expression, result = "") {
  expressionOutput.textContent = expression;
  expressionResultOutput.textContent = result;
}

function startNewExpression(result, newOperator = "") {
  firstOperand = result;
  secondOperand = "";
  operator = newOperator;
}

function handleExpressionInput(event) {
  const buttonValue = event.target.textContent;
  let result = "";

  if (secondOperand && !checkIfNumber(buttonValue)) {
    result = operate(firstOperand, operator, secondOperand);
    startNewExpression(result, buttonValue);
  } else {
    updateExpressionParts(buttonValue);
  }

  const expression = getExpressionString(false);
  populateDisplay(expression);
}

function handleExpressionResult() {
  if (!secondOperand) return;

  const expression = getExpressionString(true);
  const result = operate(firstOperand, operator, secondOperand);
  populateDisplay(expression, result);
  startNewExpression(result);
}

function clearCalculator() {
  firstOperand = "0";
  secondOperand = "";
  operator = "";
  expressionOutput.textContent = firstOperand;
  expressionResultOutput.textContent = "";
}

expressionButtons.forEach((button) => {
  button.addEventListener("click", handleExpressionInput);
});

equalsButton.addEventListener("click", handleExpressionResult);
clearButton.addEventListener("click", clearCalculator);
