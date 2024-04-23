const expressionOutput = document.querySelector(".expression");
const expressionResultOutput = document.querySelector(".result");
const expressionButtons = document.querySelectorAll(".expression-button");
const equalsButton = document.querySelector(".equals-button");
const clearButton = document.querySelector(".clear-button");

const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => {
  if (b === 0) return "ERROR";

  return a / b;
};

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

const checkIfNumber = (value) => Number.isFinite(Number.parseFloat(value));
const checkIfOperator = (value) => !checkIfNumber(value) && value !== ".";

function getUpdatedOperand(operand, newPart) {
  const isDot = newPart === ".";

  if (isDot && operand.includes(".")) return operand;
  if (checkIfNumber(operand) && isDot) return `${operand}.`;
  if (!checkIfNumber(operand) && isDot) return "0.";
  if (operand === "0" && !isDot) return newPart;
  if (operand !== "0" && !isDot) return operand + newPart;
}

function updateExpressionParts(newPart) {
  const isOperator = checkIfOperator(newPart);

  if (!operator && !isOperator) {
    firstOperand = getUpdatedOperand(firstOperand, newPart);
    return;
  }

  if (operator && !isOperator) {
    secondOperand = getUpdatedOperand(secondOperand, newPart);
    return;
  }

  if (isOperator) operator = newPart;
}

function getExpressionString(shouldCalculateResult) {
  let expression = firstOperand;

  if (operator) expression += ` ${operator} `;
  if (secondOperand) expression += secondOperand;
  if (shouldCalculateResult) expression += " =";

  return expression;
}

function populateDisplay(expression, result) {
  expressionOutput.textContent = expression;
  if (result) expressionResultOutput.textContent = result;
}

function startNewExpression(result, newOperator = "") {
  firstOperand = result === "ERROR" ? "0" : result;
  secondOperand = "";
  operator = newOperator;
}

function handleExpressionInput(event) {
  const buttonValue = event.target.textContent;
  let result = "";

  if (secondOperand && checkIfOperator(buttonValue)) {
    result = operate(firstOperand, operator, secondOperand);
    startNewExpression(result, buttonValue);
  } else {
    updateExpressionParts(buttonValue);
  }

  const expression = getExpressionString(false);
  populateDisplay(expression, result);
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
