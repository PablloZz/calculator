const buttons = document.querySelectorAll("button");
const expressionOutput = document.querySelector(".expression");

const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

let operator = "";
let firstOperand = "";
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

function updateExpressionParts(newPart) {
  const isNumber = Number.isFinite(Number(newPart));

  if (!operator && isNumber) {
    firstOperand = firstOperand === "0" ? newPart : firstOperand + newPart;
  }

  if (!firstOperand && !isNumber) {
    firstOperand = "0";
  }

  if (operator && isNumber) {
    secondOperand = secondOperand === "0" ? newPart : secondOperand + newPart;
  }

  if (!isNumber) {
    operator = newPart;
  }
}

function getExpressionString(newPart) {
  updateExpressionParts(newPart);
  let expression = firstOperand;

  if (operator) expression += ` ${operator} `;
  if (secondOperand) expression += secondOperand;

  return expression;
}

function populateDisplay(event) {
  const buttonValue = event.target.textContent;
  const expression = getExpressionString(buttonValue);
  expressionOutput.textContent = expression;
}

buttons.forEach((button) => {
  button.addEventListener("click", populateDisplay);
});
