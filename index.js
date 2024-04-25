const expressionOutput = document.querySelector(".expression");
const expressionResultOutput = document.querySelector(".result");
const expressionButtons = document.querySelectorAll(".expression-button");
const equalsButton = document.querySelector(".equals-button");
const clearButton = document.querySelector(".clear-button");
const backspaceButton = document.querySelector(".backspace-button");

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
      return String(add(a, b));
    case "-":
      return String(subtract(a, b));
    case "x":
      return String(multiply(a, b));
    case "÷":
      return String(divide(a, b));
  }
}

const checkIfNumber = (value) => !Number.isNaN(Number.parseFloat(value));
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

function handleExpressionInput(newValue) {
  let result = "";

  if (secondOperand && checkIfOperator(newValue)) {
    result = operate(firstOperand, operator, secondOperand);
    startNewExpression(result, newValue);
  } else {
    updateExpressionParts(newValue);
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

function removeCharacter() {
  const expression = expressionOutput.textContent;
  const slicedExpression = expression.trimEnd().slice(0, -1);
  const updatedExpression = slicedExpression === "" ? "0" : slicedExpression;
  const expressionParts = updatedExpression.trimEnd().split(" ");
  [firstOperand, operator = "", secondOperand = ""] = expressionParts;
  expressionOutput.textContent = expressionParts.join(" ");
}

function handleKeyInput(event) {
  const { key } = event;

  switch (true) {
    case checkIfNumber(key):
    case key === ".":
    case key === "+":
    case key === "-":
      return handleExpressionInput(key);
    case key === "/" || key === "÷":
      return handleExpressionInput("÷");
    case key === "x" || key === "*":
      return handleExpressionInput("x");
    case key === "Backspace":
      return removeCharacter();
    case (key === "=" || key === "Enter") && event.target.nodeName !== "BUTTON":
      return handleExpressionResult();
  }
}

expressionButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    handleExpressionInput(event.target.textContent);
  });
});

equalsButton.addEventListener("click", handleExpressionResult);
clearButton.addEventListener("click", clearCalculator);
backspaceButton.addEventListener("click", removeCharacter);
window.addEventListener("keydown", handleKeyInput);
