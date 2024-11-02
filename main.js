// declaring all variables:
let display = document.querySelector(".display");
let equals = document.querySelector(".equals");
let numbers = document.querySelector(".numbers");
let operations = document.querySelectorAll(".op");
let numbersList = [9, 8, 7, 6, 5, 4, 3, 2, 1, ".", 0, "dele"];
let operationsUsed = 0;
let curOp = "";

// make all Numbers 0-9 + . + delete
function makeNumbers() {
  // loop on numbersList
  numbersList.forEach((number) => {
    let button = document.createElement("button");
    button.classList.add("number");
    button.innerText = number;

    // add event on each button
    button.addEventListener("click", whinClick);

    // append all to numbers area
    numbers.appendChild(button);
  });

  // add event on each operator
  Array.from(operations).forEach((op) => {
    op.addEventListener("click", whinClick);
  });
}

// make numbers onload
window.onload = makeNumbers();

// add buttons events
function whinClick() {
  // check if display is empty
  if (display.innerText == 0) {
    display.innerText = "";
  }

  // check if the button clicked is a operator
  if (["+", "-", "*", "/"].includes(this.innerText)) {
    // check if there is operations Used
    if (operationsUsed == 0) {
      display.innerText += this.innerText;
      operationsUsed = 1;
      curOp = this.innerText;
    }

    // check if the button clicked is delete
  } else if (this.innerText == "dele") {
    // check if the last character is a operator
    if (["+", "-", "*", "/"].includes([...display.innerHTML].pop())) {
      curOp = "";
      operationsUsed = 0;
    }
    // delete the last number
    display.innerHTML = [...display.innerHTML].slice(0, -1).join("");

    // check if display is empty
    if (display.innerText == "") {
      display.innerText = 0;
    }
  } else {
    // add the number to display
    display.innerText += this.innerText;
  }
}

// make equals function and show result
equals.addEventListener("click", result);
function result() {
  // check if there is a operator
  if (operationsUsed == 1) {
    let theNums = String(display.innerText).split(curOp);

    // check what is the operator and do the calculation and add it to display
    if (curOp == "+") {
      display.innerText = Number(theNums[0]) + Number(theNums[1]);
    } else if (curOp == "-") {
      display.innerText = Number(theNums[0]) - Number(theNums[1]);
    } else if (curOp == "*") {
      display.innerText = Number(theNums[0]) * Number(theNums[1]);
    } else if (curOp == "/") {
      display.innerText = Number(theNums[0]) / Number(theNums[1]);
    }
    // reset the operationsUsed
    operationsUsed = 0;
  }
}

// make the application keyboard friendly
document.addEventListener("keydown", (key) => {
  // check if the key pressed is a number
  if (numbersList.includes(Number(key.key))) {
    if (display.innerText == 0) {
      display.innerText = "";
    }
    display.innerText += key.key;
    // check if the key pressed is a operator
  } else if (["+", "-", "*", "/"].includes(key.key)) {
    if (display.innerText == 0) {
      display.innerText = "";
    }
    if (operationsUsed == 0) {
      display.innerText += key.key;
      operationsUsed = 1;
      curOp = key.key;
    }
    // check if the key pressed is  Enter
  } else if (key.key === "Enter") {
    key.preventDefault();
    result();

    // check if the key pressed is  " . "
  } else if (key.key === ".") {
    display.innerText += key.key;
    // check if the key pressed is  Backspace
  } else if (key.key === "Backspace") {
    // delete the last number
    key.preventDefault();
    // check if the button clicked is a operator
    if (["+", "-", "*", "/"].includes([...display.innerHTML].pop())) {
      curOp = "";
      operationsUsed = 0;
    }
    display.innerHTML = [...display.innerHTML].slice(0, -1).join("");

    if (display.innerText == "") {
      display.innerText = 0;
    }
  }
});
