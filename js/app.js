const display = document.querySelector(".display");
const dExpression = document.querySelector(".expression");
const dResult = document.querySelector(".result");
const buttons = document.querySelectorAll("button");
let expResolved = false;
let expression = "";
buttons.forEach(function (ele) {
  ele.addEventListener("click", function (e) {
    let val = e.currentTarget.textContent;
    if (e.currentTarget.classList.contains("operator")) {
      val = getOperator(val);
    } else {
      if (expResolved) {
        expression = "";
        expResolved = false;
      }
    }
    val == "="
      ? resolveExpression(expression)
      : (expression = expression + val);

    expression.length > 1 ? (dExpression.innerText = expression) : "";
  });
});

function getOperator(val) {
  switch (val) {
    case "x":
      return "*";
    case "/":
      return "/";
    case "+":
      return "+";
    case "-":
      return "-";
    case "=":
      return "=";
  }
}
function resolveExpression(exp) {
  dResult.innerText = eval(exp);
  expResolved = true;
}

// Make the DIV element draggable:
dragElement(document.getElementById("calculator"));

function dragElement(elmnt) {
  var pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;
  document.getElementById("titleBar").onmousedown = dragMouseDown;

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = elmnt.offsetTop - pos2 + "px";
    elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}
