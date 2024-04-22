const expressionOutput = document.querySelector(".expression");
const expressionResultOutput = document.querySelector(".result");
const expressionButtons = document.querySelectorAll(".expression-button");
const equalButton = document.querySelector(".equals-button");

const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

let firstOperand = "0";
let operator = "";
let secondOperand = "";
let shouldCalculateResult = false;

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

function updateExpressionInfo(newPart) {
  const isNumber = checkIfNumber(newPart);

  if ((newPart === "=" && secondOperand) || (secondOperand && !isNumber)) {
    shouldCalculateResult = true;
    return;
  }

  if (!operator && isNumber) {
    firstOperand = firstOperand === "0" ? newPart : firstOperand + newPart;
  }

  if (operator && isNumber) {
    secondOperand = secondOperand === "0" ? newPart : secondOperand + newPart;
  }

  if (!isNumber && newPart !== "=") operator = newPart;
  if (newPart === "=" && !secondOperand) shouldCalculateResult = false;
}

function getExpressionString() {
  let expression = firstOperand;

  if (operator) expression += ` ${operator} `;
  if (secondOperand) expression += secondOperand;
  if (shouldCalculateResult) expression += " =";

  return expression;
}

function handleExpressionResult() {
  let expressionResult = "";

  if (shouldCalculateResult) {
    expressionResult = operate(firstOperand, operator, secondOperand);
    firstOperand = expressionResult;
    operator = "";
    secondOperand = "";
    shouldCalculateResult = false;
  }

  return expressionResult;
}

function populateDisplay(expression, result = "") {
  expressionOutput.textContent = expression;
  expressionResultOutput.textContent = result;
}

function startNewExpression(result, value) {
  firstOperand = result;
  secondOperand = "";
  operator = value;
  const expression = getExpressionString();
  populateDisplay(expression);
}

function resetExpressionParts() {
  firstOperand = "0";
  secondOperand = "";
  operator = "";
}

function handleExpression(event) {
  const buttonValue = event.target.textContent;
  updateExpressionInfo(buttonValue);
  const expression = getExpressionString();
  const result = handleExpressionResult();
  populateDisplay(expression, result);

  if (result && !checkIfNumber(buttonValue) && buttonValue !== "=") {
    startNewExpression(result, buttonValue);
  }

  if (result && buttonValue === "=") resetExpressionParts();
}

expressionButtons.forEach((button) => {
  button.addEventListener("click", handleExpression);
});

equalButton.addEventListener("click", handleExpression);
