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

function processDigitKey(event) {
  answer = null;
  buffer.push(event.target.id);
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
  answer = operations[operation](operand, rightOperand);
  renderDisplay();
  operand = null;
  operation = null;
  buffer = [];
}


function renderDisplay() {
  if (answer) {
    display.textContent = answer;
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

