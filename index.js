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
const clearButton = document.querySelector(".clear-button");
const backspaceButton = document.querySelector(".backspace-button");

let firstOperand = INITIAL_VALUES.zero;
let operator = INITIAL_VALUES.empty;
let secondOperand = INITIAL_VALUES.empty;

const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => {
  if (b === 0) return ERROR_MESSAGE;

  return a / b;
};

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

function startNewExpression(result, newOperator) {
  firstOperand = result === ERROR_MESSAGE ? INITIAL_VALUES.zero : result;
  secondOperand = INITIAL_VALUES.empty;
  operator = newOperator;
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

function handleOperatorInput(newOperator) {
  operator = newOperator;
  let result = "";

  if (secondOperand) {
    result = operate(firstOperand, operator, secondOperand);
    startNewExpression(result, newOperator);
  }

  const expression = getExpressionString(false);
  populateDisplay(expression, result);
}

function calculateExpression() {
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
  const expression = expressionOutput.textContent.trimEnd();
  const slicedExpression = expression.slice(0, -1);
  let updatedExpression;

  if (slicedExpression === "" || expression === "Infinity") {
    updatedExpression = INITIAL_VALUES.zero;
  } else {
    updatedExpression = slicedExpression;
  }

  const expressionParts = updatedExpression.trimEnd().split(" ");
  [
    firstOperand,
    operator = INITIAL_VALUES.empty,
    secondOperand = INITIAL_VALUES.empty,
  ] = expressionParts;
  populateDisplay(expressionParts.join(" "));
}

const checkIfNumber = (value) => !Number.isNaN(Number.parseFloat(value));

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

function updateOperands(newPart) {
  if (!operator) {
    firstOperand = getUpdatedOperand(firstOperand, newPart);
    return;
  }

  if (operator) {
    secondOperand = getUpdatedOperand(secondOperand, newPart);
    return;
  }
}

function handleOperandInput(newPart) {
  updateOperands(newPart);
  const expression = getExpressionString(false);
  populateDisplay(expression);
}

function handleKeyInput(event) {
  const BUTTON_NAME = "BUTTON";
  const Keys = {
    BACKSPACE: "Backspace",
    ENTER: "Enter",
  };
  const { key } = event;

  switch (true) {
    case checkIfNumber(key):
    case key === Signs.DOT:
      return handleOperandInput(key);
    case key === Signs.PLUS:
    case key === Signs.MINUS:
      return handleOperatorInput(key);
    case key === Signs.DIVIDE_BACKSLASH || key === Signs.DIVIDE:
      return handleOperatorInput(Signs.DIVIDE);
    case key === Signs.MULTIPLY_X || key === Signs.MULTIPLY:
      return handleOperatorInput(Signs.MULTIPLY_X);
    case key === Keys.BACKSPACE:
      return removeCharacter();
    case (key === Signs.EQUAL || key === Keys.ENTER) &&
      event.target.nodeName !== BUTTON_NAME:
      return calculateExpression();
  }
}

function handleButtonClick(event) {
  const { target } = event;
  const value = target.textContent;

  if (target.classList.contains("operand")) handleOperandInput(value);
  if (target.classList.contains("operator")) handleOperatorInput(value);
  if (target.classList.contains("equals")) calculateExpression();
}

buttons.addEventListener("click", handleButtonClick);
clearButton.addEventListener("click", clearCalculator);
backspaceButton.addEventListener("click", removeCharacter);
window.addEventListener("keydown", handleKeyInput);
