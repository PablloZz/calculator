const ERROR_MESSAGE = "ERROR";
const INITIAL_VALUES = {
  zero: "0",
  empty: "",
};
const Signs = {
  DOT: ".",
  MINUS: "-",
  PLUS: "+",
  DIVIDE: "÷",
  DIVIDE_BACKSLASH: "/",
  MULTIPLY: "*",
  MULTIPLY_X: "x",
  EQUAL: "=",
};
const expressionOutput = document.querySelector(".expression");
const expressionResultOutput = document.querySelector(".result");
const buttons = document.querySelector(".buttons");
const equalsButton = document.querySelector(".equals-button");
const clearButton = document.querySelector(".clear-button");
const backspaceButton = document.querySelector(".backspace-button");

const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => {
  if (b === 0) return ERROR_MESSAGE;

  return a / b;
};

let firstOperand = INITIAL_VALUES.zero;
let operator = INITIAL_VALUES.empty;
let secondOperand = INITIAL_VALUES.empty;

function operate(a, operator, b) {
  a = Number(a);
  b = Number(b);

  switch (operator) {
    case Signs.PLUS:
      return String(add(a, b));
    case Signs.MINUS:
      return String(subtract(a, b));
    case Signs.MULTIPLY_X:
      return String(multiply(a, b));
    case Signs.DIVIDE:
      return String(divide(a, b));
  }
}

const checkIfNumber = (value) => !Number.isNaN(Number.parseFloat(value));
const checkIfOperator = (value) => !checkIfNumber(value) && value !== Signs.DOT;

function getUpdatedOperand(operand, newPart) {
  const isDot = newPart === Signs.DOT;

  if (isDot && operand.includes(Signs.DOT)) return operand;
  if (checkIfNumber(operand) && isDot) return `${operand}${Signs.DOT}`;
  if (operand === INITIAL_VALUES.zero && !isDot) return newPart;

  if (!checkIfNumber(operand) && isDot) {
    return `${INITIAL_VALUES.zero}${Signs.DOT}`;
  }

  if (operand !== INITIAL_VALUES.zero && !isDot) {
    return operand + newPart;
  }
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
  if (shouldCalculateResult) expression += ` ${Signs.EQUAL}`;

  return expression;
}

function populateDisplay(expression, result) {
  expressionOutput.textContent = expression;
  if (result) expressionResultOutput.textContent = result;
}

function startNewExpression(result, newOperator) {
  firstOperand = result === ERROR_MESSAGE ? INITIAL_VALUES.zero : result;
  secondOperand = INITIAL_VALUES.empty;
  operator = newOperator;
}

function handleExpressionResult() {
  if (!secondOperand) return;

  const expression = getExpressionString(true);
  const result = operate(firstOperand, operator, secondOperand);
  populateDisplay(expression, result);
  startNewExpression(result);
}

function clearCalculator() {
  firstOperand = INITIAL_VALUES.zero;
  secondOperand = INITIAL_VALUES.empty;
  operator = INITIAL_VALUES.empty;
  expressionOutput.textContent = firstOperand;
  expressionResultOutput.textContent = "";
}

function removeCharacter() {
  const expression = expressionOutput.textContent;
  const slicedExpression = expression.trimEnd().slice(0, -1);
  const updatedExpression =
    slicedExpression === "" ? INITIAL_VALUES.zero : slicedExpression;
  const expressionParts = updatedExpression.trimEnd().split(" ");
  [
    firstOperand,
    operator = INITIAL_VALUES.empty,
    secondOperand = INITIAL_VALUES.empty,
  ] = expressionParts;
  expressionOutput.textContent = expressionParts.join(" ");
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

function handleKeyInput(event) {
  const { key } = event;
  const BUTTON_NAME = "BUTTON";
  const Keys = {
    BACKSPACE: "Backspace",
    ENTER: "Enter",
  };

  switch (true) {
    case checkIfNumber(key):
    case key === Signs.DOT:
    case key === Signs.PLUS:
    case key === Signs.MINUS:
      return handleExpressionInput(key);
    case key === Signs.DIVIDE_BACKSLASH || key === Signs.DIVIDE:
      return handleExpressionInput(Signs.DIVIDE);
    case key === Signs.MULTIPLY_X || key === Signs.MULTIPLY:
      return handleExpressionInput(Signs.MULTIPLY_X);
    case key === Keys.BACKSPACE:
      return removeCharacter();
    case (key === Signs.EQUAL || key === Keys.ENTER) &&
      event.target.nodeName !== BUTTON_NAME:
      return handleExpressionResult();
  }
}

function handleExpressionButtonsClick(event) {
  const { target } = event;

  if (target.classList.contains("expression-button")) {
    handleExpressionInput(target.textContent);
  }
}

buttons.addEventListener("click", handleExpressionButtonsClick);
equalsButton.addEventListener("click", handleExpressionResult);
clearButton.addEventListener("click", clearCalculator);
backspaceButton.addEventListener("click", removeCharacter);
window.addEventListener("keydown", handleKeyInput);
