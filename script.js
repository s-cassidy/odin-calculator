"use strict";

let buffer = [];
const digitKeys = document.querySelectorAll(".numeric");
const display = document.querySelector("#display");

function processDigitKey(event) {
  buffer.push(event.target.id);
  renderDisplay();
}


function renderDisplay() {
  if (buffer.length > 0) {
    display.textContent = buffer.join("");
  }
}

digitKeys.forEach((elem) =>
  elem.addEventListener("click", (e) => processDigitKey(e))
)

