const display = document.querySelector(".display");
const dExpression = document.querySelector(".expression");
const dResult = document.querySelector(".result");
const buttons = document.querySelectorAll("button");
const maximize = document.querySelector("#maximize");
const calculator = document.querySelector("#calculator");
let solved = false;
let expression = ["0"];
let currentInput = "0";
let previousInput = "0";
let currentInputType = "";
let previousInputType = "number";
let btnFunctionality;

function handleButtonClick(e) {
  currentInput = e.currentTarget.textContent;
  currentInputType = e.currentTarget.dataset.type;
  btnFunctionality = e.currentTarget.dataset.functionality;

  if (currentInputType === "number") {
    //number
    if (solved) {
      expression = [];
    }

    if (previousInputType === "number") {
      if (eval(expression.join("")) === 0) {
        // if empty array
        previousInput = currentInput;
        expression = [];
      } else {
        // if followed by number then combine numbers
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

    solved = false;
    if (previousInputType === "operator" && btnFunctionality != "undo") {
      expression.pop();
    }
    switch (btnFunctionality) {
      case "clearall":
        expression = [];
        currentInput = previousInput = "0";
        dResult.innerHTML = currentInput;
        break;
      case "clearexpression":
        expression.pop();
        currentInput = "0";
        dResult.innerHTML = currentInput;
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
        expression.pop();
        expression.push("Math.pow(" + previousInput + ",2)");
        break;
      case "sqrt":
        expression.pop();
        expression.push("Math.sqrt(" + previousInput + ")");
        break;
      case "negate":
        currentInput = -1 * parseInt(expression.pop());
        expression.push(currentInput);
        dResult.innerHTML = currentInput;
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

maximize.addEventListener("click", (e) => {
  calculator.style.transition = "";
  calculator.classList.toggle("maximize");
});

function log(e) {
  console.log(e);
}

function solve(exp) {
  try {
    const result = eval(exp.join("")) || 0;
    dResult.innerText = result;
    expression = [];
    expression.push(result);
    solved = true;
  } catch (err) {
    dResult.innerText = "Error";
    log(err);
  }
}

///////////////////////////
//      Dragging
///////////////////////////

dragElement(calculator);

function dragElement(ele) {
  var pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;

  document.getElementById("titleBar").onmousedown = dragMouseDown;

  function dragMouseDown(e) {
    calculator.style.transition = "none";
    if (!calculator.classList.contains("maximize")) {
      e = e || window.event;
      e.preventDefault();
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      document.onmousemove = elementDrag;
    }
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
