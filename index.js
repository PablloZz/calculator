const expressionOutput = document.querySelector(".expression");
const expressionResultOutput = document.querySelector(".result");
const expressionButtons = document.querySelectorAll(".expression-button");
const equalButton = document.querySelector(".equals-button");

const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

let operator = "";
let firstOperand = "";
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

function updateExpressionParts(newPart) {
  const isNumber = Number.isFinite(Number(newPart));

  if (!operator && isNumber) {
    firstOperand = firstOperand === "0" ? newPart : firstOperand + newPart;
  }

  if (!firstOperand && !isNumber) firstOperand = "0";

  if (operator && isNumber) {
    secondOperand = secondOperand === "0" ? newPart : secondOperand + newPart;
  }

  if (!isNumber && newPart !== "=") operator = newPart;
  if (newPart === "=" && !secondOperand) shouldCalculateResult = false;
  if (newPart === "=" && secondOperand) shouldCalculateResult = true;
}

function getExpressionString() {
  let expression = firstOperand;

  if (operator) expression += ` ${operator} `;
  if (secondOperand) expression += secondOperand;
  if (shouldCalculateResult) expression += " =";

  return expression;
}

function populateExpression() {
  const expression = getExpressionString();
  expressionOutput.textContent = expression;
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

function populateExpressionResult() {
  const result = handleExpressionResult();
  expressionResultOutput.textContent = result;
}

function populateDisplay() {
  populateExpression();
  populateExpressionResult();
}

function handleExpression(event) {
  const buttonValue = event.target.textContent;
  updateExpressionParts(buttonValue);
  populateDisplay();
}

expressionButtons.forEach((button) => {
  button.addEventListener("click", handleExpression);
});

equalButton.addEventListener("click", handleExpression);
