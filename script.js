"use strict";

let buffer = [];
let operation;
let leftOperand;
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
const decimalPoint = document.querySelector("#point");
const plusminus = document.querySelector("#pm");
const sqrt = document.querySelector("#sqrt");
const clear = document.querySelector("#clear");
const DISPLAY_SIZE = 9;

function processDigitKey(event) {
  answer = null;
  if (buffer.length < DISPLAY_SIZE) {
    buffer.push(event.target.id);
  }
  renderDisplay();
}


function parseBuffer() {
  if (buffer.length === 0) {
    return 0;
  }
  return parseInt(buffer.join(""));
}


function processOpKey(event) {
  if (leftOperand && operation) {
    operate();
  }
  leftOperand = answer || parseBuffer();
  readyNextInput();
  operation = event.target.id;
}


function readyNextInput() {
  decimalPoint.classList.remove("greyed-out");
  operation = null;
  buffer = [];
}


function resetAll() {
  readyNextInput();
  leftOperand = null;
  answer = null;
  renderDisplay();
}


function operate() {
  if (!operation) {
    leftOperand = answer || parseBuffer();
    readyNextInput();
    return;
  }

  let rightOperand = parseBuffer();
  if (operation === "divide" && rightOperand === 0) {
    renderDisplay("No can do");
    readyNextInput();
    return;
  }

  let evaluation = operations[operation](leftOperand, rightOperand);
  if (Math.abs(evaluation) >= 10 ** DISPLAY_SIZE) {
    renderDisplay("Too big!")
  }
  else {
    answer = evaluation;
    leftOperand = null;
    renderDisplay();
  }
  readyNextInput();
}

function sqrtOperation() {
  let radicand = parseBuffer() || leftOperand || answer;
  answer = Math.sqrt(radicand);
  renderDisplay();
  leftOperand = null;
  readyNextInput();
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
      // We need DISPLAY_SIZE - 1 as there will be a decimal point
      display.textContent = parseFloat(answer.toPrecision(DISPLAY_SIZE - 1));
    }
    return;
  }
  if (buffer.length > 0) {
    display.textContent = buffer.join("");
    return;
  }
  display.textContent = 0;
}

function insertDecimal() {
  if (buffer.includes(".")) {
    return;
  }
  if (buffer.length === 0) {
    buffer.push("0");
  }
  buffer.push(".");
  renderDisplay();
  decimalPoint.classList.add("greyed-out");
}

digitKeys.forEach((elem) =>
  elem.addEventListener("click", (e) => processDigitKey(e))
)

opKeys.forEach((elem) =>
  elem.addEventListener("click", (e) => processOpKey(e))
)

equals.addEventListener("click", operate);
pm.addEventListener("click", toggleNegative);
decimalPoint.addEventListener("click", insertDecimal);
clear.addEventListener("click", resetAll);
sqrt.addEventListener("click", sqrtOperation);
