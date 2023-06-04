"use strict";

let buffer = [];
let operation;
let operand;
let answer;
const operations = {
  plus: (a, b) => (a + b),
  minus: (a, b) => (a - b),
  times: (a, b) => (a * b),
  divide: (a, b) => (a / b),
}

const digitKeys = document.querySelectorAll(".numeric");
const opKeys = document.querySelectorAll(".op");
const display = document.querySelector("#display");
const equals = document.querySelector("#equals");
const plusminus = document.querySelector("#pm");
const DISPLAY_SIZE = 8;

function processDigitKey(event) {
  answer = null;
  if (buffer.length < DISPLAY_SIZE) {
    buffer.push(event.target.id);
  }
  renderDisplay();
}

function parseBuffer() {
  return parseInt(buffer.join(""));
}

function processOpKey(event) {
  if (operand && operation) {
    operate(operation);
  }
  operation = event.target.id;
  operand = answer || parseBuffer();
  buffer = []
}


function operate() {
  let rightOperand = parseBuffer();
  if (operation === "divide" && rightOperand === 0) {
    renderDisplay("");
    operation = null;
    buffer = [];
    return;
  }
  let evaluation = operations[operation](operand, rightOperand);
  if (Math.abs(evaluation) >= 10 ** DISPLAY_SIZE) {
    renderDisplay("Too big!")
  }
  else {
    answer = evaluation;
    renderDisplay();
    operand = null;
  }
  operation = null;
  buffer = [];
}

function toggleNegative() {
  if (buffer[0] === "-") {
    buffer.shift();
  }
  else {
    buffer.unshift("-")
  }
  renderDisplay();
}


function renderDisplay(optionalText) {
  if (optionalText) {
    display.textContent = optionalText;
    return;
  }
  if (answer) {
    if (Number.isInteger(answer)) {
      display.textContent = answer;
    }
    else {
      display.textContent = parseFloat(answer.toPrecision(DISPLAY_SIZE - 1));
    }
    return;
  }
  if (buffer.length > 0) {
    display.textContent = buffer.join("");
    return;
  }
}

digitKeys.forEach((elem) =>
  elem.addEventListener("click", (e) => processDigitKey(e))
)

opKeys.forEach((elem) =>
  elem.addEventListener("click", (e) => processOpKey(e))
)

equals.addEventListener("click", operate)

pm.addEventListener("click", toggleNegative)
