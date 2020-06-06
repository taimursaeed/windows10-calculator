const display = document.querySelector(".display");
const dExpression = document.querySelector(".expression");
const dResult = document.querySelector(".result");
const buttons = document.querySelectorAll("button");
let expResolved = false;
let expression = ["0"];
let currentInput = "0";
let previousInput = "0";
let currentInputType = "";
let previousInputType = "number";
let validExpression = false;
let btnFunctionality;

function handleButtonClick(e) {
  currentInput = e.currentTarget.textContent;
  currentInputType = e.currentTarget.dataset.type;
  btnFunctionality = e.currentTarget.dataset.functionality;

  if (currentInputType === "number") {
    //number

    if (previousInputType === "number") {
      if (eval(expression.join("")) === 0) {
        previousInput = currentInput;
        expression = [];
      } else {
        previousInput += currentInput;
        expression.pop();
      }
      expression.push(previousInput);
      dResult.innerHTML = previousInput;
    } else {
      previousInput = currentInput;
      expression.push(currentInput);
      dResult.innerHTML = currentInput;
    }
    previousInputType = currentInputType;

    log(expression);
    dExpression.innerHTML = expression.join("");
  } else {
    //operator

    if (previousInputType === "operator" && btnFunctionality != "undo") {
      expression.pop();
    }
    switch (btnFunctionality) {
      case "clearall":
        expression = [];
        currentInput = previousInput = "";
        break;
      case "clearexpression":
        expression = [];
        currentInput = "";
        break;
      case "undo":
        expression.length > 1 ? expression.pop() : (expression = []);
        break;
      case "decimal":
        expression.push("/100");
        break;
      case "fraction":
        expression.unshift("1/");
        break;
      case "power":
        expression.push(
          "Math.pow(" +
            eval(expression.join("")) +
            "," +
            eval(expression.join("")) +
            ")"
        );
        break;
      case "sqrt":
        expression.pop();
        expression.push("Math.sqrt(" + previousInput + ")");
        solve(expression);

        break;
      case "add":
        expression.push("+");
        break;
      case "subtract":
        expression.push("-");
        break;
      case "multiply":
        expression.push("*");
        break;
      case "divide":
        expression.push("/");
        break;
      case "solve":
        solve(expression);
        break;
    }
    log(expression);
    dExpression.innerHTML = expression.join("");
    previousInputType = currentInputType;
  }
}

buttons.forEach(function (ele) {
  ele.addEventListener("click", (e) => handleButtonClick(e));
});

function log(e) {
  console.log(e);
}

function solve(exp) {
  try {
    dResult.innerText = eval(exp.join("")) || 0;
    expResolved = true;
  } catch (err) {
    dResult.innerText = "Error";
    log(err);
  }
}

// Dragging
dragElement(document.getElementById("calculator"));

function dragElement(ele) {
  var pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;

  document.getElementById("titleBar").onmousedown = dragMouseDown;

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    ele.style.top = ele.offsetTop - pos2 + "px";
    ele.style.left = ele.offsetLeft - pos1 + "px";
  }

  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}
